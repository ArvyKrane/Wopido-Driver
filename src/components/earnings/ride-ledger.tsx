import { formatCurrency } from '@/lib/utils';
import { Star } from 'lucide-react';

interface RideLedgerProps {
  rides: Array<{
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
  }>;
}

export function RideLedger({ rides }: RideLedgerProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/60">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Route</th>
            <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Distance</th>
            <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fare</th>
            <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Platform</th>
            <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Earned</th>
            <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rating</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rides.map((ride) => {
            const platformFee = parseFloat((ride.fare - ride.driverEarnings).toFixed(2));
            return (
              <tr key={ride.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-foreground font-medium">{ride.date}</div>
                  {ride.time && <div className="text-muted-foreground text-xs">{ride.time}</div>}
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <div className="text-foreground text-xs truncate max-w-[180px]">{ride.pickup}</div>
                  <div className="text-muted-foreground text-xs truncate max-w-[180px]">→ {ride.destination}</div>
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground hidden md:table-cell">{ride.distance} km</td>
                <td className="px-4 py-3 text-right font-medium">{formatCurrency(ride.fare)}</td>
                <td className="px-4 py-3 text-right text-red-500 hidden md:table-cell">- {formatCurrency(platformFee)}</td>
                <td className="px-4 py-3 text-right font-bold text-emerald-600">{formatCurrency(ride.driverEarnings)}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-medium">{ride.rating}</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
