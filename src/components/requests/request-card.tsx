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
  const circumference = 2 * Math.PI * 18; // r=18
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
    <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-4">
      {/* Header with Rider & Countdown Timer */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900 text-lg">
              {request.riderName}
            </span>
            <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[10px] font-bold px-2 py-0.5 capitalize">
              {request.category}
            </Badge>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold gap-1 px-2 py-0.5">
              <Shield className="w-3 h-3 text-emerald-600" />
              Verified Rider
            </Badge>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Incoming Ride Alert • ~{request.duration} mins trip
          </p>
        </div>

        {/* Countdown Ring */}
        <div className="relative w-11 h-11 shrink-0">
          <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="3.5"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke={timeLeft <= 8 ? '#EF4444' : '#F59E0B'}
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
                timeLeft <= 8 ? 'text-red-600 animate-pulse' : 'text-slate-900'
              }`}
            >
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Route Info */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
        {/* Pickup */}
        <div className="flex items-start gap-3">
          <div className="mt-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Pickup Point
            </p>
            <p className="text-xs md:text-sm font-bold text-slate-900 truncate">
              {request.pickup}
            </p>
          </div>
        </div>

        <div className="ml-1.5 w-0.5 h-2 bg-slate-300" />

        {/* Destination */}
        <div className="flex items-start gap-3">
          <div className="mt-1 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-100 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Destination Drop
            </p>
            <p className="text-xs md:text-sm font-bold text-slate-900 truncate">
              {request.destination}
            </p>
          </div>
        </div>
      </div>

      {/* Trip Metric Badges */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Distance</p>
          <p className="text-xs md:text-sm font-black text-slate-900 mt-0.5">
            {request.distance} km
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Trip Time</p>
          <p className="text-xs md:text-sm font-black text-slate-900 mt-0.5">
            {request.duration} min
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
          <p className="text-[10px] font-black text-emerald-800 uppercase">You Earn</p>
          <p className="text-xs md:text-sm font-black text-emerald-700 mt-0.5">
            {formatCurrency(fare.driverEarnings)}
          </p>
        </div>
      </div>

      {/* Transparent Earnings Breakdown */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
        <div className="flex justify-between text-slate-500 text-[11px]">
          <span>Rider Fare Total</span>
          <span className="font-semibold text-slate-800">{formatCurrency(fare.total)}</span>
        </div>
        <div className="flex justify-between text-slate-500 text-[11px]">
          <span>Platform Fee (15%)</span>
          <span className="font-mono">-{formatCurrency(fare.subtotal * 0.15)}</span>
        </div>
        <div className="flex justify-between font-black text-xs text-emerald-700 pt-1.5 border-t border-slate-200">
          <span>Net Captain Payout</span>
          <span>{formatCurrency(fare.driverEarnings)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <Button
          variant="outline"
          onClick={() => onReject(request.id)}
          className="rounded-xl h-11 border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs"
        >
          <X className="h-4 w-4 mr-1.5" />
          Pass
        </Button>

        <Button
          onClick={handleAccept}
          disabled={accepted}
          className="rounded-xl h-11 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs tracking-wide shadow-sm"
        >
          <Check className="h-4 w-4 mr-1.5" />
          {accepted ? 'Accepting...' : 'Accept Ride'}
        </Button>
      </div>
    </div>
  );
}
