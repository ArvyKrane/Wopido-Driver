'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Shield, Clock, MapPin, ArrowRight } from 'lucide-react';
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
  const circumference = 2 * Math.PI * 20; // r=20
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
    <div className="relative overflow-hidden rounded-3xl p-5 md:p-6 bg-white/90 backdrop-blur-2xl border-2 border-[#4A1C6A]/20 shadow-[0_12px_36px_rgba(74,28,106,0.08)] space-y-4 transition-all duration-300">
      {/* Top subtle highlight */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />

      {/* Header with Rider & Countdown Timer */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-black text-foreground text-lg tracking-tight">
              {request.riderName}
            </span>
            <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/15 border-emerald-500/30 text-[10px] font-bold gap-1 px-2 py-0.5">
              <Shield className="w-3 h-3 text-emerald-600" />
              Verified Rider
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
            <span className="capitalize font-semibold text-primary">{request.category}</span>
            <span>•</span>
            <span>Est. {request.duration} mins trip</span>
          </p>
        </div>

        {/* Countdown Ring */}
        <div className="relative w-12 h-12 shrink-0">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#F1EAF7"
              strokeWidth="3.5"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke={timeLeft <= 8 ? '#EF4444' : '#4A1C6A'}
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-xs font-black ${
                timeLeft <= 8 ? 'text-red-500 animate-pulse' : 'text-[#4A1C6A]'
              }`}
            >
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Route Info with Clean Nodes */}
      <div className="p-3.5 rounded-2xl bg-purple-50/40 border border-purple-100/80 space-y-3">
        {/* Pickup */}
        <div className="flex items-start gap-3">
          <div className="mt-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Pickup Point
            </p>
            <p className="text-xs md:text-sm font-semibold text-foreground truncate">
              {request.pickup}
            </p>
          </div>
        </div>

        {/* Connector */}
        <div className="ml-1.5 w-0.5 h-2.5 bg-gradient-to-b from-emerald-500 to-[#E8637A]" />

        {/* Destination */}
        <div className="flex items-start gap-3">
          <div className="mt-1 w-3.5 h-3.5 rounded-full bg-[#E8637A] ring-4 ring-[#E8637A]/20 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Destination
            </p>
            <p className="text-xs md:text-sm font-semibold text-foreground truncate">
              {request.destination}
            </p>
          </div>
        </div>
      </div>

      {/* Trip Metric Badges */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-xl bg-white border border-purple-100/80 text-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Distance</p>
          <p className="text-xs md:text-sm font-black text-foreground mt-0.5">
            {request.distance} km
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-white border border-purple-100/80 text-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Duration</p>
          <p className="text-xs md:text-sm font-black text-foreground mt-0.5">
            {request.duration} min
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-center">
          <p className="text-[10px] font-black text-emerald-700 uppercase">You Earn</p>
          <p className="text-xs md:text-sm font-black text-emerald-700 mt-0.5">
            {formatCurrency(fare.driverEarnings)}
          </p>
        </div>
      </div>

      {/* Transparent Earnings Breakdown */}
      <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-xs space-y-1.5">
        <div className="flex justify-between text-muted-foreground text-[11px]">
          <span>Rider Fare Total</span>
          <span className="font-semibold text-foreground">{formatCurrency(fare.total)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground text-[11px]">
          <span>Platform Commission (15%)</span>
          <span className="font-mono">-{formatCurrency(fare.subtotal * 0.15)}</span>
        </div>
        <div className="flex justify-between font-black text-xs text-emerald-700 pt-1.5 border-t border-border/80">
          <span>Net Payout to Captain</span>
          <span>{formatCurrency(fare.driverEarnings)}</span>
        </div>
      </div>

      {/* Tactile Claymorphic Actions */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <Button
          variant="outline"
          onClick={() => onReject(request.id)}
          className="rounded-xl h-11 border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs"
        >
          <X className="h-4 w-4 mr-1.5" />
          Pass
        </Button>

        <Button
          onClick={handleAccept}
          disabled={accepted}
          className="rounded-xl h-11 clay-btn-success text-white font-black text-xs tracking-wide"
        >
          <Check className="h-4 w-4 mr-1.5" />
          {accepted ? 'Accepting...' : 'Accept Ride'}
        </Button>
      </div>
    </div>
  );
}
