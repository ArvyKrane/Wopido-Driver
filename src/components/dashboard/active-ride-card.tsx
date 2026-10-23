'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, CheckCircle, AlertTriangle } from 'lucide-react';
import { type ActiveRide } from '@/hooks/use-driver';
import { formatCurrency } from '@/lib/utils';

interface ActiveRideCardProps {
  ride: ActiveRide;
  onAdvance: () => void;
}

const STATUS_CONFIG = {
  accepted: {
    label: 'Heading to Pickup',
    color: 'bg-blue-100 text-blue-700',
    action: 'Mark Arrived at Pickup',
    actionVariant: 'default' as const,
    icon: Navigation,
  },
  driver_arrived: {
    label: 'Arrived at Pickup',
    color: 'bg-amber-100 text-amber-700',
    action: 'Start Ride',
    actionVariant: 'success' as const,
    icon: MapPin,
  },
  in_progress: {
    label: 'Ride in Progress',
    color: 'bg-emerald-100 text-emerald-700',
    action: 'Complete Ride',
    actionVariant: 'success' as const,
    icon: CheckCircle,
  },
  completed: {
    label: 'Completed',
    color: 'bg-gray-100 text-gray-700',
    action: '',
    actionVariant: 'default' as const,
    icon: CheckCircle,
  },
};

export function ActiveRideCard({ ride, onAdvance }: ActiveRideCardProps) {
  const config = STATUS_CONFIG[ride.status];
  const Icon = config.icon;

  return (
    <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Active Ride</p>
          <p className="font-semibold text-foreground">{ride.riderName}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${config.color}`}>
          {config.label}
        </span>
      </div>

      {/* Route */}
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Pickup</p>
            <p className="text-sm font-medium">{ride.pickup}</p>
          </div>
        </div>
        <div className="ml-2.5 w-0.5 h-4 bg-border" />
        <div className="flex items-start gap-3">
          <div className="mt-0.5 w-5 h-5 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Destination</p>
            <p className="text-sm font-medium">{ride.destination}</p>
          </div>
        </div>
      </div>

      {/* Fare */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-border p-3">
        <div>
          <p className="text-xs text-muted-foreground">Your Earnings</p>
          <p className="text-xl font-bold text-emerald-600">{formatCurrency(ride.driverEarnings)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Rider pays</p>
          <p className="text-sm font-semibold text-foreground">{formatCurrency(ride.fare)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant={config.actionVariant} className="flex-1" onClick={onAdvance}>
          <Icon className="h-4 w-4" />
          {config.action}
        </Button>
        {ride.status === 'in_progress' && (
          <Button variant="outline" size="icon" title="Report Problem">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </Button>
        )}
      </div>
    </div>
  );
}
