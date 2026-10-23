'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, IndianRupee, Check, X } from 'lucide-react';
import { calculateFare } from '@/lib/fare';
import { formatCurrency } from '@/lib/utils';
import { REQUEST_TIMEOUT_SECONDS } from '@/lib/constants';

interface RideRequest {
  id: string;
  riderName: string;
  pickup: string;
  destination: string;
  distance: number;
  duration: number;
  category: string;
  status: string;
  createdAt: string;
}

interface RequestCardProps {
  request: RideRequest;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export function RequestCard({ request, onAccept, onReject }: RequestCardProps) {
  const [timeLeft, setTimeLeft] = useState(REQUEST_TIMEOUT_SECONDS);
  const [accepted, setAccepted] = useState(false);

  const fare = calculateFare(request.distance);
  const circumference = 2 * Math.PI * 22; // r=22
  const strokeDashoffset = circumference - (timeLeft / REQUEST_TIMEOUT_SECONDS) * circumference;

  useEffect(() => {
    if (timeLeft <= 0) {
      onReject(request.id);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onReject, request.id]);

  const handleAccept = () => {
    setAccepted(true);
    onAccept(request.id);
  };

  return (
    <div className="rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/5 to-white p-5 space-y-4 shadow-sm">
      {/* Header with timer */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-foreground text-lg">{request.riderName}</p>
            <Badge variant="outline" className="text-xs capitalize">{request.category}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Incoming Request</p>
        </div>

        {/* Countdown ring */}
        <div className="relative w-14 h-14 shrink-0">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="22" fill="none" stroke="#e5e7eb" strokeWidth="4" />
            <circle
              cx="25"
              cy="25"
              r="22"
              fill="none"
              stroke={timeLeft <= 10 ? '#ef4444' : '#4A1C6A'}
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-sm font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-foreground'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Route */}
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <div className="mt-1 w-4 h-4 rounded-full bg-emerald-500 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Pickup</p>
            <p className="text-sm font-medium">{request.pickup}</p>
          </div>
        </div>
        <div className="ml-2 w-0.5 h-3 bg-border" />
        <div className="flex items-start gap-3">
          <div className="mt-1 w-4 h-4 rounded-full bg-secondary shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Destination</p>
            <p className="text-sm font-medium">{request.destination}</p>
          </div>
        </div>
      </div>

      {/* Trip info */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-muted rounded-lg p-2">
          <p className="text-xs text-muted-foreground">Distance</p>
          <p className="text-sm font-bold">{request.distance} km</p>
        </div>
        <div className="bg-muted rounded-lg p-2">
          <p className="text-xs text-muted-foreground">Time</p>
          <p className="text-sm font-bold">{request.duration} min</p>
        </div>
        <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-200">
          <p className="text-xs text-emerald-600 font-medium">You Earn</p>
          <p className="text-sm font-bold text-emerald-700">{formatCurrency(fare.driverEarnings)}</p>
        </div>
      </div>

      {/* Fare breakdown */}
      <div className="bg-muted/50 rounded-lg p-3 text-xs space-y-1">
        <div className="flex justify-between text-muted-foreground">
          <span>Rider pays</span>
          <span className="font-medium text-foreground">{formatCurrency(fare.total)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Platform fee (15%)</span>
          <span>-{formatCurrency(fare.subtotal * 0.15)}</span>
        </div>
        <div className="flex justify-between font-semibold text-emerald-700 border-t border-border pt-1">
          <span>Your earnings</span>
          <span>{formatCurrency(fare.driverEarnings)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => onReject(request.id)}
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          <X className="h-4 w-4" />
          Reject
        </Button>
        <Button variant="success" onClick={handleAccept} disabled={accepted} className="text-base font-bold">
          <Check className="h-4 w-4" />
          Accept
        </Button>
      </div>
    </div>
  );
}
