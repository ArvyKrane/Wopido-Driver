'use client';

import React from 'react';
import { DEMO_COMPLETED_RIDES } from '@/lib/demo-data';
import { RideCard } from '@/components/rides/ride-card';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { History, Star, IndianRupee } from 'lucide-react';
import Link from 'next/link';

export default function DriverRidesHistoryPage() {
  const totalEarnings = DEMO_COMPLETED_RIDES.reduce((acc, r) => acc + r.driverEarnings, 0);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-foreground">Completed Trips</h1>
          <p className="text-xs text-muted-foreground">Detailed trip logs and earned fares</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-xs font-bold">
          <IndianRupee className="w-3.5 h-3.5" />
          <span>{formatCurrency(totalEarnings)} earned</span>
        </div>
      </div>

      <div className="space-y-3">
        {DEMO_COMPLETED_RIDES.map((ride) => (
          <Link key={ride.id} href={`/rides/${ride.id}`}>
            <RideCard ride={ride} />
          </Link>
        ))}
      </div>
    </div>
  );
}
