'use client';

import React from 'react';
import { useDriver } from '@/hooks/use-driver';
import { StatsCard } from '@/components/dashboard/stats-card';
import { AvailabilityToggle } from '@/components/dashboard/availability-toggle';
import { ActiveRideCard } from '@/components/dashboard/active-ride-card';
import { EarningsChart } from '@/components/dashboard/earnings-chart';
import { RequestCard } from '@/components/requests/request-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { ShieldCheck, IndianRupee, Car, Star, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function DriverDashboardPage() {
  const {
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
  } = useDriver();

  return (
    <div className="space-y-6">
      {/* Driver Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5 rounded-2xl border border-primary/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-foreground">
              Hello, {driver.name} 👋
            </h1>
            {driver.verified && (
              <Badge className="bg-emerald-600 hover:bg-emerald-600 gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Captain
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Vehicle: <span className="font-semibold text-foreground">{driver.vehicle}</span> ({driver.regNo}) • Pune Hub
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isDemoMode && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-700 dark:text-amber-300">
              <AlertCircle className="w-3.5 h-3.5" />
              Demo Mode Active
            </div>
          )}
          {/* Availability Toggle */}
          <AvailabilityToggle
            isOnline={isOnline}
            onToggle={toggleOnline}
            loading={loading}
          />
        </div>
      </div>

      {/* Online / Offline Status Warning */}
      {!isOnline && (
        <Card className="p-4 bg-muted/50 border border-border/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
            <div>
              <p className="text-sm font-semibold text-foreground">You are currently Offline</p>
              <p className="text-xs text-muted-foreground">
                Turn your status Online to receive ride requests from women riders in Pune.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={toggleOnline}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-8"
          >
            Go Online Now
          </Button>
        </Card>
      )}

      {/* Active Ride Section (If accepted) */}
      {activeRide && (
        <div className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Current Active Journey
          </h2>
          <ActiveRideCard
            ride={activeRide}
            onAdvance={advanceRideStatus}
          />
        </div>
      )}

      {/* Incoming Requests Section (If online and not currently on a trip) */}
      {isOnline && !activeRide && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              Incoming Requests ({pendingRequests.length})
            </h2>
            <span className="text-xs text-muted-foreground">Auto-refreshes in real time</span>
          </div>

          {pendingRequests.length === 0 ? (
            <Card className="p-8 text-center border-dashed border-border/80 space-y-2">
              <Clock className="w-8 h-8 text-muted-foreground/50 mx-auto animate-pulse" />
              <p className="text-sm font-semibold text-foreground">Searching for nearby requests...</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                You will receive real-time audio and visual notifications as soon as a women rider books in your area.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingRequests.map((req) => (
                <RequestCard
                  key={req.id}
                  request={req}
                  onAccept={acceptRequest}
                  onReject={rejectRequest}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Today's Earnings"
          value={formatCurrency(driver.todayEarnings)}
          icon="money"
          highlight
        />
        <StatsCard
          label="Today's Rides"
          value={`${driver.todayRides} trips`}
          icon="rides"
        />
        <StatsCard
          label="Captain Rating"
          value={`${driver.rating} ★`}
          icon="star"
        />
        <StatsCard
          label="Lifetime Rides"
          value={`${driver.totalRides}`}
          icon="total"
        />
      </div>

      {/* Weekly Earnings Chart & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <EarningsChart />
        </div>

        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5 border-border/70 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
              Captain Support & Quick Links
            </h3>
            <div className="space-y-2 text-xs">
              <Link
                href="/documents"
                className="flex items-center justify-between p-2.5 rounded-xl border bg-muted/30 hover:bg-muted/60 transition-colors"
              >
                <span>Document Status</span>
                <span className="font-semibold text-emerald-600">All Approved</span>
              </Link>
              <Link
                href="/earnings"
                className="flex items-center justify-between p-2.5 rounded-xl border bg-muted/30 hover:bg-muted/60 transition-colors"
              >
                <span>Payout Account</span>
                <span className="font-mono text-muted-foreground">UPI Linked</span>
              </Link>
              <Link
                href="/vehicle"
                className="flex items-center justify-between p-2.5 rounded-xl border bg-muted/30 hover:bg-muted/60 transition-colors"
              >
                <span>Vehicle Inspection</span>
                <span className="font-semibold text-primary">Valid till 2027</span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
