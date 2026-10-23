'use client';

import { DEMO_WEEKLY_EARNINGS } from '@/lib/demo-data';
import { formatCurrency } from '@/lib/utils';

export function EarningsChart() {
  const data = DEMO_WEEKLY_EARNINGS;
  const maxEarnings = Math.max(...data.map((d) => d.earnings));
  const todayIdx = 6; // Sunday is index 6 in demo data

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-2 h-28">
        {data.map((day, i) => {
          const heightPct = Math.round((day.earnings / maxEarnings) * 100);
          const isToday = i === todayIdx;
          return (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground font-medium">
                {formatCurrency(day.earnings).replace('₹', '').replace(',', '')}
              </span>
              <div className="w-full flex items-end" style={{ height: '72px' }}>
                <div
                  className={`w-full rounded-t-md transition-all ${
                    isToday ? 'bg-secondary' : 'bg-primary/30'
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        {data.map((day, i) => (
          <div key={day.day} className="flex-1 text-center text-[11px] text-muted-foreground font-medium">
            {day.day}
          </div>
        ))}
      </div>
    </div>
  );
}
