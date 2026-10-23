'use client';

import React from 'react';
import { DEMO_VEHICLE } from '@/lib/demo-data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bike, ShieldCheck, Settings, AlertCircle } from 'lucide-react';

export default function VehiclePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-foreground">Registered Vehicle</h1>
          <p className="text-xs text-muted-foreground">Vehicle details, fitness certification, and insurance</p>
        </div>
        <Badge className="bg-emerald-600 text-white gap-1 text-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          Active for Rides
        </Badge>
      </div>

      <Card className="p-6 border-border/80 bg-card space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl shadow-sm">
            🛵
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {DEMO_VEHICLE.make} {DEMO_VEHICLE.model}
            </h2>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              Reg No: <span className="font-bold text-foreground">{DEMO_VEHICLE.regNo}</span>
            </p>
            <span className="inline-block mt-1 text-[11px] bg-primary/10 text-primary font-semibold px-2.5 py-0.5 rounded-full capitalize">
              {DEMO_VEHICLE.category} Category
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-xl border bg-muted/30">
            <span className="text-muted-foreground">Manufacturing Year</span>
            <p className="font-semibold text-foreground mt-0.5">{DEMO_VEHICLE.year}</p>
          </div>
          <div className="p-3 rounded-xl border bg-muted/30">
            <span className="text-muted-foreground">Color</span>
            <p className="font-semibold text-foreground mt-0.5">{DEMO_VEHICLE.color}</p>
          </div>
          <div className="p-3 rounded-xl border bg-muted/30">
            <span className="text-muted-foreground">Engine Number</span>
            <p className="font-mono font-semibold text-foreground mt-0.5">{DEMO_VEHICLE.engineNo}</p>
          </div>
          <div className="p-3 rounded-xl border bg-muted/30">
            <span className="text-muted-foreground">Chassis Number</span>
            <p className="font-mono font-semibold text-foreground mt-0.5">{DEMO_VEHICLE.chassisNo}</p>
          </div>
        </div>

        <div className="p-3 bg-muted/50 rounded-xl border text-xs text-muted-foreground flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Vehicle change requests require review and document re-verification by Wopido safety admin.</span>
        </div>
      </Card>
    </div>
  );
}
