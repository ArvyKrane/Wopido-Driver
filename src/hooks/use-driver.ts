'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { DEMO_DRIVER_PROFILE, DEMO_PENDING_REQUESTS } from '@/lib/demo-data';
import { calculateFare } from '@/lib/fare';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export type RideStatus = 'accepted' | 'driver_arrived' | 'in_progress' | 'completed';

export interface ActiveRide {
  id: string;
  riderName: string;
  pickup: string;
  destination: string;
  distance: number;
  duration: number;
  category: string;
  status: RideStatus;
  fare: number;
  driverEarnings: number;
  acceptedAt: string;
}

export function useDriver() {
  const [isOnline, setIsOnlineState] = useState(true);
  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null);
  const [pendingRequests, setPendingRequests] = useState(DEMO_PENDING_REQUESTS);
  const [loading, setLoading] = useState(false);
  const driver = DEMO_DRIVER_PROFILE;
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const supabase = getSupabaseBrowserClient();

  const toggleOnline = useCallback(async () => {
    setLoading(true);
    const nextState = !isOnline;
    setIsOnlineState(nextState);

    if (supabase) {
      const clientAny = supabase as any;
      await clientAny
        .from('driver_profiles')
        .update({ is_online: nextState })
        .eq('driver_id', driver.id);
    }

    setLoading(false);
  }, [isOnline, supabase, driver.id]);

  // Sync incoming rides from Supabase in realtime
  useEffect(() => {
    if (!supabase || !isOnline) return;
    const clientAny = supabase as any;

    const fetchPendingRides = async () => {
      const { data } = await clientAny
        .from('rides')
        .select('*')
        .eq('status', 'searching')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        const liveRequests = data.map((r: any) => ({
          id: r.id,
          riderId: r.rider_id || 'rider-demo-1',
          riderName: 'Ananya S.',
          pickup: r.pickup_address,
          destination: r.drop_address,
          pickupCoords: { lat: Number(r.pickup_lat), lng: Number(r.pickup_lng) },
          destCoords: { lat: Number(r.drop_lat), lng: Number(r.drop_lng) },
          distance: Number(r.distance_km) || 5.0,
          duration: Math.round(Number(r.distance_km) * 2.5) || 15,
          category: r.category || 'bike',
          status: 'searching',
          createdAt: r.created_at || new Date().toISOString(),
        }));
        setPendingRequests(liveRequests);
      }
    };

    fetchPendingRides();

    // Listen to Supabase Realtime inserts on rides
    const channel = clientAny
      .channel('driver-rides-feed')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'rides',
      }, (payload: any) => {
        const r = payload.new;
        if (r && r.status === 'searching') {
          setPendingRequests((prev) => [
            {
              id: r.id,
              riderId: r.rider_id || 'rider-demo-1',
              riderName: 'Ananya S.',
              pickup: r.pickup_address,
              destination: r.drop_address,
              pickupCoords: { lat: Number(r.pickup_lat), lng: Number(r.pickup_lng) },
              destCoords: { lat: Number(r.drop_lat), lng: Number(r.drop_lng) },
              distance: Number(r.distance_km) || 5.0,
              duration: Math.round(Number(r.distance_km) * 2.5) || 15,
              category: r.category || 'bike',
              status: 'searching',
              createdAt: r.created_at || new Date().toISOString(),
            },
            ...prev,
          ]);
        }
      })
      .subscribe();

    pollingRef.current = setInterval(fetchPendingRides, 4000);

    return () => {
      clientAny.removeChannel(channel);
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [supabase, isOnline]);

  const acceptRequest = useCallback(
    async (requestId: string) => {
      const req = pendingRequests.find((r) => r.id === requestId);
      if (!req) return;
      const fareData = calculateFare(req.distance);
      const ride: ActiveRide = {
        id: req.id,
        riderName: req.riderName,
        pickup: req.pickup,
        destination: req.destination,
        distance: req.distance,
        duration: req.duration,
        category: req.category,
        status: 'accepted',
        fare: fareData.total,
        driverEarnings: fareData.driverEarnings,
        acceptedAt: new Date().toISOString(),
      };
      setActiveRide(ride);
      setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));

      if (supabase) {
        const clientAny = supabase as any;
        await clientAny
          .from('rides')
          .update({
            driver_id: driver.id,
            status: 'accepted',
            driver_earnings: fareData.driverEarnings,
            accepted_at: new Date().toISOString(),
          })
          .eq('id', requestId);
      }
    },
    [pendingRequests, supabase, driver.id]
  );

  const rejectRequest = useCallback((requestId: string) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
  }, []);

  const advanceRideStatus = useCallback(async () => {
    if (!activeRide) return;
    const flow: RideStatus[] = ['accepted', 'driver_arrived', 'in_progress', 'completed'];
    const idx = flow.indexOf(activeRide.status);
    if (idx < flow.length - 1) {
      const nextStatus = flow[idx + 1];

      if (supabase) {
        const clientAny = supabase as any;
        await clientAny
          .from('rides')
          .update({ status: nextStatus })
          .eq('id', activeRide.id);
      }

      if (nextStatus === 'completed') {
        setActiveRide(null);
      } else {
        setActiveRide((prev) => prev ? { ...prev, status: nextStatus } : null);
      }
    }
  }, [activeRide, supabase]);

  return {
    driver,
    isOnline,
    toggleOnline,
    activeRide,
    pendingRequests,
    acceptRequest,
    rejectRequest,
    advanceRideStatus,
    loading,
    isDemoMode: !supabase,
  };
}
