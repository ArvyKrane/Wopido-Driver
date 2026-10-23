'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation, MapPin, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { type ActiveRide } from '@/hooks/use-driver';
import { formatCurrency } from '@/lib/utils';

interface ActiveRideCardProps {
  ride: ActiveRide;
  onAdvance: () => void;
}

const STATUS_CONFIG = {
  accepted: {
    step: 1,
    label: 'Heading to Pickup',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    actionText: 'Mark Arrived at Pickup',
    icon: Navigation,
  },
  driver_arrived: {
    step: 2,
    label: 'Arrived at Pickup',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    actionText: 'Start Ride Journey',
    icon: MapPin,
  },
  in_progress: {
    step: 3,
    label: 'Ride in Progress',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    actionText: 'Complete Ride & Collect Payout',
    icon: CheckCircle2,
  },
  completed: {
    step: 4,
    label: 'Trip Finished',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
    actionText: 'Finished',
    icon: CheckCircle2,
  },
};

export function ActiveRideCard({ ride, onAdvance }: ActiveRideCardProps) {
  const config = STATUS_CONFIG[ride.status];
  const Icon = config.icon;

  return (
    <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-slate-900">{ride.riderName}</span>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold gap-1 px-2 py-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Verified Passenger
            </Badge>
          </div>
          <p className="text-xs text-slate-400 font-mono">Trip #{ride.id.slice(0, 8)}</p>
        </div>

        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${config.badgeClass}`}>
          {config.label}
        </span>
      </div>

      {/* Route */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
        <div className="flex items-start gap-3">
          <div className="mt-1 w-3 h-3 rounded-full bg-emerald-500 shrink-0 ring-4 ring-emerald-100" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pickup</p>
            <p className="text-xs md:text-sm font-bold text-slate-900">{ride.pickup}</p>
          </div>
        </div>

        <div className="ml-1.5 w-0.5 h-2 bg-slate-300" />

        <div className="flex items-start gap-3">
          <div className="mt-1 w-3 h-3 rounded-full bg-amber-500 shrink-0 ring-4 ring-amber-100" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destination</p>
            <p className="text-xs md:text-sm font-bold text-slate-900">{ride.destination}</p>
          </div>
        </div>
      </div>

      {/* Fare Highlight */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Captain Earnings</p>
          <p className="text-xl font-black text-emerald-600">{formatCurrency(ride.driverEarnings)}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-medium text-slate-400">Total Fare</p>
          <p className="text-sm font-bold text-slate-800">{formatCurrency(ride.fare)}</p>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex items-center gap-3">
        <Button
          onClick={onAdvance}
          className="flex-1 h-11 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs tracking-wide gap-2 shadow-sm"
        >
          <Icon className="h-4 w-4" />
          {config.actionText}
        </Button>

        {ride.status === 'in_progress' && (
          <Button
            variant="outline"
            className="h-11 w-11 rounded-xl border-amber-300 text-amber-700 hover:bg-amber-50 shrink-0 p-0"
            title="Helpline / Safety"
          >
            <AlertTriangle className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
