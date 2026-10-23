'use client';

import React from 'react';
import { useDriver } from '@/hooks/use-driver';
import { RequestCard } from '@/components/requests/request-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function RequestsQueuePage() {
  const {
    isOnline,
    toggleOnline,
    pendingRequests,
    acceptRequest,
    rejectRequest,
  } = useDriver();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-foreground">Ride Requests Queue</h1>
          <p className="text-xs text-muted-foreground">Nearby requests available for acceptance</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Status:</span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
            isOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground'
          }`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {!isOnline ? (
        <Card className="p-8 text-center space-y-4">
          <p className="text-sm font-semibold text-foreground">You are currently Offline</p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            You must be online to receive incoming requests from riders in Pune.
          </p>
          <Button onClick={toggleOnline} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
            Go Online Now
          </Button>
        </Card>
      ) : pendingRequests.length === 0 ? (
        <Card className="p-10 text-center space-y-3">
          <Clock className="w-10 h-10 text-muted-foreground/40 mx-auto animate-pulse" />
          <p className="text-sm font-semibold text-foreground">No pending requests right now</p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Stay on this screen or return to dashboard. Requests will pop up automatically with audio alerts.
          </p>
          <Link href="/">
            <Button variant="outline" size="sm" className="text-xs">
              Back to Dashboard
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingRequests.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              onAccept={acceptRequest}
              onReject={rejectRequest}
            />
          ))}
        </div>
      )}
    </div>
  );
}
