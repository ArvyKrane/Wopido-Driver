import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ReceiptProps {
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
  };
}

export function Receipt({ ride }: ReceiptProps) {
  const platformFee = parseFloat((ride.fare - ride.driverEarnings).toFixed(2));

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Ride Receipt</h3>
        <Badge variant="success">Completed</Badge>
      </div>

      <Separator />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Rider</span>
          <span className="text-foreground font-medium">{ride.riderName}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Date</span>
          <span className="text-foreground">{ride.date} {ride.time}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Distance</span>
          <span className="text-foreground">{ride.distance} km</span>
        </div>
      </div>

      <Separator />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Rider paid</span>
          <span>{formatCurrency(ride.fare)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Platform fee (3%)</span>
          <span>- {formatCurrency(platformFee)}</span>
        </div>
        <div className="flex justify-between font-bold text-emerald-600 text-base border-t border-border pt-2">
          <span>Your earnings</span>
          <span>{formatCurrency(ride.driverEarnings)}</span>
        </div>
      </div>
    </div>
  );
}
