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
    <div className="space-y-6">
      {/* Clean Executive Header */}
      <div className="rounded-2xl p-5 md:p-6 bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Hello, {driver.name} 👋
            </h1>
            {driver.verified && (
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5 text-xs font-bold px-2.5 py-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Captain
              </Badge>
            )}
          </div>

          <p className="text-xs text-slate-500 flex flex-wrap items-center gap-2 font-medium">
            <span>Vehicle:</span>
            <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
              {driver.vehicle} ({driver.regNo})
            </span>
            <span>•</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Rourkela Hub
            </span>
          </p>
        </div>

        {/* Right Toggle */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {isDemoMode && (
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
              Rourkela Live Grid
            </span>
          )}

          <AvailabilityToggle
            isOnline={isOnline}
            onToggle={toggleOnline}
            loading={loading}
          />
        </div>
      </div>

      {/* Offline Alert Prompt */}
      {!isOnline && (
        <div className="rounded-2xl p-4 bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <Radio className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-950">You are currently Offline</p>
              <p className="text-xs text-amber-800/80">
                Turn your status Online to receive incoming ride requests from riders in Rourkela.
              </p>
            </div>
          </div>

          <Button
            onClick={toggleOnline}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs h-9 px-4 rounded-xl shrink-0"
          >
            Go Online Now
          </Button>
        </div>
      )}

      {/* Ongoing Ride if Active */}
      {activeRide && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Current Active Journey
            </h2>
          </div>
          <ActiveRideCard ride={activeRide} onAdvance={advanceRideStatus} />
        </div>
      )}

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Today's Earnings"
          value={formatCurrency(driver.todayEarnings)}
          icon="money"
          subtitle="Direct daily payout"
          highlight
        />
        <StatsCard
          label="Trips Today"
          value={`${driver.todayRides} rides`}
          icon="rides"
          subtitle="100% completion"
        />
        <StatsCard
          label="Captain Rating"
          value={`${driver.rating} ★`}
          icon="star"
          subtitle="Top rated in Rourkela"
        />
        <StatsCard
          label="Lifetime Trips"
          value={`${driver.totalRides}`}
          icon="total"
          subtitle="Safe rides delivered"
        />
      </div>

      {/* Main Content Grid: Incoming Requests + Earnings Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Requests Queue */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Incoming Requests ({isOnline ? pendingRequests.length : 0})
            </h2>
            <span className="text-[11px] text-slate-400 font-medium">Auto-refreshes in real time</span>
          </div>

          {!isOnline ? (
            <div className="rounded-2xl p-8 text-center bg-white border border-slate-200 space-y-2">
              <p className="text-sm font-bold text-slate-700">Offline Mode</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Turn your status Online above to receive requests from nearby riders.
              </p>
            </div>
          ) : pendingRequests.length === 0 ? (
            <div className="rounded-2xl p-8 text-center bg-white border border-dashed border-slate-300 space-y-2">
              <Radio className="w-8 h-8 text-slate-400 mx-auto animate-pulse" />
              <p className="text-sm font-bold text-slate-700">Searching for Nearby Requests...</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You will receive real-time audio and visual alerts when a rider books in Rourkela.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
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

        {/* Right Column: Weekly Earnings & Quick Links */}
        <div className="lg:col-span-5 space-y-5">
          <EarningsChart />

          <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Quick Shortcuts
            </h3>
            <div className="space-y-2 text-xs">
              <Link
                href="/documents"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-800">Documents & KYC</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Approved
                </span>
              </Link>

              <Link
                href="/earnings"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Wallet className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-slate-800">Payout Settings</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">Instant UPI</span>
              </Link>

              <Link
                href="/vehicle"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Car className="w-4 h-4 text-slate-700" />
                  <span className="font-semibold text-slate-800">Vehicle Details</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-600">Activa 6G</span>
              </Link>

              <Link
                href="/help"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Headphones className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-slate-800">Captain Helpline</span>
                </div>
                <span className="text-[11px] font-semibold text-blue-600">24/7 Support</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
