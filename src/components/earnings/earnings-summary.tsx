'use client';

import { formatCurrency } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface EarningsSummaryProps {
  totalEarnings: number;
  platformFees: number;
  netEarnings: number;
  rides: number;
}

export function EarningsSummary({ totalEarnings, platformFees, netEarnings, rides }: EarningsSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 rounded-2xl bg-gradient-to-br from-primary to-[#6B2D94] p-6 text-white">
        <p className="text-white/70 text-sm font-medium">Total Earnings</p>
        <p className="text-4xl font-bold mt-1">{formatCurrency(totalEarnings)}</p>
        <p className="text-white/60 text-xs mt-2">{rides} rides completed</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 space-y-1">
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <TrendingDown className="h-3.5 w-3.5 text-red-500" />
          Platform Fee
        </div>
        <p className="text-lg font-bold text-red-600">- {formatCurrency(platformFees)}</p>
        <p className="text-xs text-muted-foreground">15% of subtotal</p>
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-1">
        <div className="flex items-center gap-2 text-emerald-700 text-xs">
          <TrendingUp className="h-3.5 w-3.5" />
          Net Earnings
        </div>
        <p className="text-lg font-bold text-emerald-700">{formatCurrency(netEarnings)}</p>
        <p className="text-xs text-emerald-600">Your take-home</p>
      </div>
    </div>
  );
}
