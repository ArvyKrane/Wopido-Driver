'use client';

import React from 'react';
import { EarningsSummary } from '@/components/earnings/earnings-summary';
import { RideLedger } from '@/components/earnings/ride-ledger';
import { EarningsChart } from '@/components/dashboard/earnings-chart';
import { DEMO_DRIVER_PROFILE, DEMO_COMPLETED_RIDES } from '@/lib/demo-data';

export default function EarningsPage() {
  const total = DEMO_DRIVER_PROFILE.todayEarnings;
  const platform = Math.round(total * 0.15 * 100) / 100;
  const net = total - platform;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-foreground">Earnings & Payouts</h1>
        <p className="text-xs text-muted-foreground">
          Real-time income calculations, daily breakdowns, and payout status
        </p>
      </div>

      <EarningsSummary
        totalEarnings={total}
        platformFees={platform}
        netEarnings={net}
        rides={DEMO_DRIVER_PROFILE.todayRides}
      />

      <EarningsChart />

      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Trip Fare Ledger
        </h2>
        <RideLedger rides={DEMO_COMPLETED_RIDES} />
      </div>
    </div>
  );
}
