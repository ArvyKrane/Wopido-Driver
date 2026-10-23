'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation, MapPin, CheckCircle2, AlertTriangle, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { type ActiveRide } from '@/hooks/use-driver';
import { formatCurrency } from '@/lib/utils';

interface ActiveRideCardProps {
  ride: ActiveRide;
  onAdvance: () => void;
}

const STATUS_CONFIG = {
  accepted: {
    step: 1,
    label: 'En Route to Pickup',
    badgeClass: 'bg-blue-500/15 text-blue-700 border-blue-500/30',
    actionText: 'Mark Arrived at Pickup',
    icon: Navigation,
  },
  driver_arrived: {
    step: 2,
    label: 'Arrived at Pickup Spot',
    badgeClass: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
    actionText: 'Start Ride Journey',
    icon: MapPin,
  },
  in_progress: {
    step: 3,
    label: 'Ride in Progress',
    badgeClass: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
    actionText: 'Complete Ride & Collect Payout',
    icon: CheckCircle2,
  },
  completed: {
    step: 4,
    label: 'Trip Finished',
    badgeClass: 'bg-gray-500/15 text-gray-700 border-gray-500/30',
    actionText: 'Finished',
    icon: CheckCircle2,
  },
};

export function ActiveRideCard({ ride, onAdvance }: ActiveRideCardProps) {
  const config = STATUS_CONFIG[ride.status];
  const Icon = config.icon;

  return (
    <div className="relative overflow-hidden rounded-3xl p-5 md:p-6 bg-white/95 backdrop-blur-2xl border-2 border-emerald-500/30 shadow-[0_12px_40px_rgba(16,185,129,0.1)] space-y-5">
      {/* Top subtle highlight */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

      {/* Header Banner */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-black text-foreground">
              {ride.riderName}
            </span>
            <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/15 border-emerald-500/30 text-[10px] font-bold gap-1 px-2 py-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Verified Passenger
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Active Booking ID: <span className="font-mono font-medium">{ride.id.slice(0, 8)}</span>
          </p>
        </div>

        <span
          className={`text-xs font-bold px-3 py-1 rounded-full border ${config.badgeClass}`}
        >
          {config.label}
        </span>
      </div>

      {/* Stage Progress Bar */}
      <div className="grid grid-cols-3 gap-2">
        <div
          className={`h-1.5 rounded-full transition-all ${
            config.step >= 1 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-muted'
          }`}
        />
        <div
          className={`h-1.5 rounded-full transition-all ${
            config.step >= 2 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-muted'
          }`}
        />
        <div
          className={`h-1.5 rounded-full transition-all ${
            config.step >= 3 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-muted'
          }`}
        />
      </div>

      {/* Route Info */}
      <div className="p-4 rounded-2xl bg-purple-50/30 border border-purple-100/70 space-y-3">
        <div className="flex items-start gap-3">
          <div className="mt-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Pickup Point
            </p>
            <p className="text-xs md:text-sm font-semibold text-foreground">{ride.pickup}</p>
          </div>
        </div>

        <div className="ml-1.5 w-0.5 h-3 bg-gradient-to-b from-emerald-500 to-[#E8637A]" />

        <div className="flex items-start gap-3">
          <div className="mt-1 w-3.5 h-3.5 rounded-full bg-[#E8637A] ring-4 ring-[#E8637A]/20 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Destination Point
            </p>
            <p className="text-xs md:text-sm font-semibold text-foreground">{ride.destination}</p>
          </div>
        </div>
      </div>

      {/* Fare Highlight Card */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-white border border-emerald-200/80">
        <div>
          <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
            Your Captain Earnings
          </p>
          <p className="text-2xl font-black text-emerald-600">
            {formatCurrency(ride.driverEarnings)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-medium text-muted-foreground">Rider Fare</p>
          <p className="text-base font-bold text-foreground">{formatCurrency(ride.fare)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
        <Button
          onClick={onAdvance}
          className="flex-1 h-12 rounded-2xl clay-btn-success text-white font-black text-sm tracking-wide gap-2"
        >
          <Icon className="h-5 w-5" />
          {config.actionText}
        </Button>

        {ride.status === 'in_progress' && (
          <Button
            variant="outline"
            className="h-12 w-12 rounded-2xl border-amber-200 text-amber-600 hover:bg-amber-50 shrink-0 p-0"
            title="Report Emergency / Safety Support"
          >
            <AlertTriangle className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
