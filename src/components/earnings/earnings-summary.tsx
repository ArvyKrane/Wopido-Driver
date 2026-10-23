'use client';

import { formatCurrency } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface EarningsSummaryProps {
  totalEarnings: number;
  platformFees: number;
  netEarnings: number;
  rides: number;
}

export function EarningsSummary({
  totalEarnings,
  platformFees,
  netEarnings,
  rides,
}: EarningsSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 rounded-2xl bg-slate-900 p-6 text-white border border-slate-800 shadow-sm">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Gross Fare</p>
        <p className="text-3xl md:text-4xl font-black mt-1 text-white">{formatCurrency(totalEarnings)}</p>
        <p className="text-amber-400 text-xs mt-2 font-bold">{rides} completed trips</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
          <TrendingDown className="h-3.5 w-3.5 text-slate-400" />
          Platform Commission
        </div>
        <p className="text-lg font-black text-slate-800">- {formatCurrency(platformFees)}</p>
        <p className="text-xs text-slate-400 font-medium">3% platform fee</p>
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-1">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase">
          <TrendingUp className="h-3.5 w-3.5" />
          Captain Net Payout
        </div>
        <p className="text-lg font-black text-emerald-700">{formatCurrency(netEarnings)}</p>
        <p className="text-xs text-emerald-600 font-semibold">97% take-home earnings</p>
      </div>
    </div>
  );
}
