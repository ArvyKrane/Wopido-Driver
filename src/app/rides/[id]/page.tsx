'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DEMO_COMPLETED_RIDES } from '@/lib/demo-data';
import { Receipt } from '@/components/rides/receipt';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SingleDriverRidePage() {
  const params = useParams();
  const rideId = params?.id as string;
  const ride = DEMO_COMPLETED_RIDES.find((r) => r.id === rideId) || DEMO_COMPLETED_RIDES[0];

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/rides">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-foreground">Trip Summary</h1>
          <p className="text-xs text-muted-foreground font-mono">{ride.id}</p>
        </div>
      </div>

      <Receipt ride={ride} />
    </div>
  );
}
