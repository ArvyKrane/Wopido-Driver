'use client';

import { useState, useCallback } from 'react';
import { DEMO_DRIVER_PROFILE, DEMO_PENDING_REQUESTS } from '@/lib/demo-data';
import { calculateFare } from '@/lib/fare';

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

const isDemoMode =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project') ||
  process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export function useDriver() {
  const [isOnline, setIsOnlineState] = useState(false);
  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null);
  const [pendingRequests, setPendingRequests] = useState(DEMO_PENDING_REQUESTS);
  const [loading, setLoading] = useState(false);
  const driver = DEMO_DRIVER_PROFILE;

  const toggleOnline = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setIsOnlineState((prev) => !prev);
    setLoading(false);
  }, []);

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
    },
    [pendingRequests]
  );

  const rejectRequest = useCallback((requestId: string) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
  }, []);

  const advanceRideStatus = useCallback(() => {
    if (!activeRide) return;
    const flow: RideStatus[] = ['accepted', 'driver_arrived', 'in_progress', 'completed'];
    const idx = flow.indexOf(activeRide.status);
    if (idx < flow.length - 1) {
      const nextStatus = flow[idx + 1];
      if (nextStatus === 'completed') {
        setActiveRide(null);
      } else {
        setActiveRide((prev) => prev ? { ...prev, status: nextStatus } : null);
      }
    }
  }, [activeRide]);

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
    isDemoMode,
  };
}
