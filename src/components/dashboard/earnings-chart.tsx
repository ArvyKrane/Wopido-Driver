'use client';

import { DEMO_WEEKLY_EARNINGS } from '@/lib/demo-data';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

export function EarningsChart() {
  const data = DEMO_WEEKLY_EARNINGS;
  const maxEarnings = Math.max(...data.map((d) => d.earnings));
  const totalWeekly = data.reduce((sum, d) => sum + d.earnings, 0);
  const todayIdx = 6; // Sunday is index 6 in demo data

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-white border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Weekly Revenue Overview
            </h3>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              +14% this week
            </span>
          </div>
          <p className="text-xl md:text-2xl font-black text-slate-900 mt-1">
            {formatCurrency(totalWeekly)}
          </p>
        </div>

        <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="pt-2">
        <div className="flex items-end gap-2 md:gap-3 h-32 border-b border-slate-200 pb-2">
          {data.map((day, i) => {
            const heightPct = Math.round((day.earnings / maxEarnings) * 100);
            const isToday = i === todayIdx;

            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-bold text-slate-400">
                  ₹{day.earnings}
                </span>

                <div className="w-full max-w-[36px] flex items-end h-24">
                  <div
                    className={`w-full rounded-t-lg transition-all ${
                      isToday
                        ? 'bg-amber-500 shadow-sm'
                        : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                    style={{ height: `${Math.max(12, heightPct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 md:gap-3 pt-2">
          {data.map((day, i) => {
            const isToday = i === todayIdx;
            return (
              <div
                key={day.day}
                className={`flex-1 text-center text-xs font-bold ${
                  isToday ? 'text-amber-700 font-black' : 'text-slate-500'
                }`}
              >
                {day.day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
