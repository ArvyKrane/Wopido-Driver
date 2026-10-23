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
    <div className="relative overflow-hidden rounded-3xl p-5 md:p-6 bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(74,28,106,0.06)] space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-black text-sm uppercase tracking-wider text-muted-foreground">
              Weekly Revenue Analytics
            </h3>
            <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-500/20">
              +14% vs last week
            </span>
          </div>
          <p className="text-xl md:text-2xl font-black text-[#4A1C6A] mt-1">
            {formatCurrency(totalWeekly)}
          </p>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#4A1C6A]">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="pt-2">
        <div className="flex items-end gap-2 md:gap-3 h-36 border-b border-purple-100/80 pb-2">
          {data.map((day, i) => {
            const heightPct = Math.round((day.earnings / maxEarnings) * 100);
            const isToday = i === todayIdx;

            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end">
                {/* Hover / Static value tooltip */}
                <span className="text-[10px] font-bold text-muted-foreground group-hover:text-[#4A1C6A] transition-colors">
                  ₹{day.earnings}
                </span>

                {/* Animated Bar with tactile top cap */}
                <div className="w-full max-w-[38px] flex items-end h-28">
                  <div
                    className={`w-full rounded-t-xl transition-all duration-500 group-hover:brightness-110 ${
                      isToday
                        ? 'bg-gradient-to-t from-[#E8637A] to-[#F48B9E] shadow-[0_4px_16px_rgba(232,99,122,0.4)] ring-2 ring-[#E8637A]/30'
                        : 'bg-gradient-to-t from-[#4A1C6A] to-[#7B3FAB] opacity-80 group-hover:opacity-100 shadow-[0_4px_12px_rgba(74,28,106,0.2)]'
                    }`}
                    style={{ height: `${Math.max(12, heightPct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Day Labels */}
        <div className="flex gap-2 md:gap-3 pt-2">
          {data.map((day, i) => {
            const isToday = i === todayIdx;
            return (
              <div
                key={day.day}
                className={`flex-1 text-center text-xs font-bold ${
                  isToday ? 'text-[#E8637A] font-black' : 'text-muted-foreground'
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
