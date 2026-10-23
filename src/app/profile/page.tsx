'use client';

import React from 'react';
import { DEMO_DRIVER_PROFILE } from '@/lib/demo-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ShieldCheck, Star, Phone, Mail, Award, LogOut, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DriverProfilePage() {
  const router = useRouter();
  const driver = DEMO_DRIVER_PROFILE;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16 border-2 border-primary/20 shadow-md">
          <AvatarFallback className="bg-primary text-white text-xl font-bold">
            {driver.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-bold text-foreground">{driver.name}</h1>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xs text-muted-foreground">{driver.phone}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-0.5 text-xs font-bold text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {driver.rating}
            </span>
            <span className="text-xs text-muted-foreground">• {driver.totalRides} trips</span>
          </div>
        </div>
      </div>

      {/* Payout Details */}
      <Card className="p-5 border-border/80 bg-card space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-primary" />
            Payout Account (UPI)
          </h3>
          <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-300">Verified</Badge>
        </div>

        <div className="p-3 bg-muted/40 rounded-xl border text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">UPI ID</span>
            <span className="font-mono font-semibold text-foreground">{driver.bankDetails.upi}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bank Account</span>
            <span className="font-mono font-semibold text-foreground">{driver.bankDetails.accountNo}</span>
          </div>
        </div>
      </Card>

      {/* Driver Milestone */}
      <Card className="p-5 border-border/80 bg-card space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-primary" />
          Captain Milestones
        </h3>
        <div className="grid grid-cols-2 gap-3 text-center text-xs">
          <div className="p-3 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-muted-foreground">Safe Driving Streak</p>
            <p className="text-base font-black text-primary mt-0.5">180 Days</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-muted-foreground">Acceptance Rate</p>
            <p className="text-base font-black text-emerald-700 mt-0.5">96.4%</p>
          </div>
        </div>
      </Card>

      <Button
        variant="outline"
        onClick={() => router.push('/auth')}
        className="w-full text-xs text-destructive hover:bg-destructive/10 border-destructive/30 gap-2"
      >
        <LogOut className="w-3.5 h-3.5" />
        Sign Out Captain Portal
      </Button>
    </div>
  );
}
