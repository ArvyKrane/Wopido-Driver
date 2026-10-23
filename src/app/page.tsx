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
import {
  ShieldCheck,
  Sparkles,
  Radio,
  FileCheck2,
  Wallet,
  Car,
  ChevronRight,
  Headphones,
} from 'lucide-react';
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
    <div className="space-y-6 md:space-y-8">
      {/* Executive Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-r from-white/95 via-purple-50/50 to-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_12px_36px_rgba(74,28,106,0.06)]">
        {/* Subtle ambient gradient sheen */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br from-[#4A1C6A]/10 to-[#E8637A]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl md:text-3xl font-black text-[#1A1025] tracking-tight">
                Namaste, {driver.name}
              </h1>
              {driver.verified && (
                <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/15 border-emerald-500/30 gap-1.5 text-xs font-bold px-3 py-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified Captain
                </Badge>
              )}
            </div>

            <p className="text-xs md:text-sm text-muted-foreground flex flex-wrap items-center gap-2 font-medium">
              <span>Vehicle:</span>
              <span className="font-bold text-foreground bg-purple-100/60 px-2 py-0.5 rounded-lg">
                {driver.vehicle} ({driver.regNo})
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Rourkela City Hub
              </span>
            </p>
          </div>

          {/* Right Action: Demo Chip + Tactile Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {isDemoMode && (
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Rourkela Simulation Live</span>
              </div>
            )}

            <AvailabilityToggle
              isOnline={isOnline}
              onToggle={toggleOnline}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Offline Alert Prompt */}
      {!isOnline && (
        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-white/90 border border-amber-200/80 backdrop-blur-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Radio className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-950">You are currently Offline</p>
              <p className="text-xs text-amber-800/80 mt-0.5">
                Switch your status to Online to begin receiving ride requests from verified women passengers across Rourkela.
              </p>
            </div>
          </div>

          <Button
            onClick={toggleOnline}
            className="clay-btn-success text-white font-bold text-xs h-10 px-5 rounded-xl self-start sm:self-auto shrink-0"
          >
            Go Online Now
          </Button>
        </div>
      )}

      {/* Current Active Trip (Hero Banner if active) */}
      {activeRide && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-xs font-black uppercase tracking-wider text-[#4A1C6A]">
              Ongoing Ride in Progress
            </h2>
          </div>
          <ActiveRideCard ride={activeRide} onAdvance={advanceRideStatus} />
        </div>
      )}

      {/* Incoming Requests Queue (If online and not currently on a trip) */}
      {isOnline && !activeRide && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <h2 className="text-xs font-black uppercase tracking-wider text-foreground">
                Nearby Ride Requests ({pendingRequests.length})
              </h2>
            </div>
            <span className="text-xs font-bold text-muted-foreground">
              Realtime Supabase Sync
            </span>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="rounded-3xl p-8 md:p-12 text-center bg-white/70 backdrop-blur-xl border border-dashed border-purple-200/80 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto text-[#4A1C6A]">
                <Radio className="w-7 h-7 animate-pulse" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold text-foreground">
                  Scanning for Nearby Women Riders in Rourkela...
                </p>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  You are live on the radar. When a passenger books nearby, you’ll receive an instant 30-second priority alert right here.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatsCard
          label="Today's Earnings"
          value={formatCurrency(driver.todayEarnings)}
          icon="money"
          subtitle="Direct UPI transfer"
          highlight
        />
        <StatsCard
          label="Trips Today"
          value={`${driver.todayRides} rides`}
          icon="rides"
          subtitle="100% completion rate"
        />
        <StatsCard
          label="Captain Rating"
          value={`${driver.rating} ★`}
          icon="star"
          subtitle="Top 5% in Rourkela"
        />
        <StatsCard
          label="Lifetime Trips"
          value={`${driver.totalRides}`}
          icon="total"
          subtitle="Zero safety incidents"
        />
      </div>

      {/* Weekly Earnings Chart & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <EarningsChart />
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl p-5 md:p-6 bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(74,28,106,0.06)] space-y-4">
            <h3 className="font-black text-xs uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>Captain Quick Portal</span>
              <Sparkles className="w-3.5 h-3.5 text-[#E8637A]" />
            </h3>

            <div className="space-y-2.5">
              <Link
                href="/documents"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50/40 hover:bg-purple-100/60 border border-purple-100/80 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-purple-100 flex items-center justify-center text-[#4A1C6A] group-hover:scale-105 transition-transform">
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Verified Documents</p>
                    <p className="text-[10px] text-emerald-600 font-semibold">100% KYC Approved</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/earnings"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50/40 hover:bg-purple-100/60 border border-purple-100/80 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-purple-100 flex items-center justify-center text-[#4A1C6A] group-hover:scale-105 transition-transform">
                    <Wallet className="w-4 h-4 text-[#4A1C6A]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Payout Settings</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">Instant Daily UPI</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/vehicle"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50/40 hover:bg-purple-100/60 border border-purple-100/80 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-purple-100 flex items-center justify-center text-[#4A1C6A] group-hover:scale-105 transition-transform">
                    <Car className="w-4 h-4 text-[#E8637A]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Vehicle Registration</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">Honda Activa 6G</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/help"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50/40 hover:bg-purple-100/60 border border-purple-100/80 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-purple-100 flex items-center justify-center text-[#4A1C6A] group-hover:scale-105 transition-transform">
                    <Headphones className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">24/7 Captain Helpline</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">Priority Women Support</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
