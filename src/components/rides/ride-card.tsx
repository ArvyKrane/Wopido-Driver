import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';

interface RideCardProps {
  ride: {
    id: string;
    riderName: string;
    pickup: string;
    destination: string;
    distance: number;
    fare: number;
    driverEarnings: number;
    date: string;
    time?: string;
    rating: number;
    status: string;
  };
}

export function RideCard({ ride }: RideCardProps) {
  return (
    <Link href={`/rides/${ride.id}`} className="block">
      <div className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold text-sm">{ride.riderName}</p>
            <p className="text-xs text-muted-foreground">{ride.date} {ride.time && `• ${ride.time}`}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-emerald-600">{formatCurrency(ride.driverEarnings)}</p>
            <div className="flex items-center gap-1 justify-end mt-0.5">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span className="text-xs text-muted-foreground">{ride.rating}</span>
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 text-emerald-500 shrink-0" />
          <span className="truncate">{ride.pickup}</span>
          <span>→</span>
          <span className="truncate">{ride.destination}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{ride.distance} km</span>
          <Badge variant="success">Completed</Badge>
          <span className="text-muted-foreground">Rider paid {formatCurrency(ride.fare)}</span>
        </div>
      </div>
    </Link>
  );
}
