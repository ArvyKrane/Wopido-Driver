'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageSquare, Phone, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function DriverHelpPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-black text-foreground">Captain Support</h1>
        <p className="text-xs text-muted-foreground">Dedicated safety & operational support for women drivers</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 border-border/80 text-center space-y-2 hover:border-primary/40 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-foreground">Captain Helpline</h4>
            <p className="text-[11px] text-muted-foreground mt-0.5">Live Agent Chat</p>
          </div>
        </Card>

        <Card className="p-4 border-border/80 text-center space-y-2 hover:border-rose-400 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-foreground">Emergency SOS</h4>
            <p className="text-[11px] text-muted-foreground mt-0.5">Instant Dispatch</p>
          </div>
        </Card>
      </div>

      <Card className="p-5 border-border/80 bg-card space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
          Captain Safety Guidelines
        </h3>
        <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
          <div className="p-3 bg-muted/30 rounded-xl border">
            <p className="font-semibold text-foreground mb-1">Verify OTP Before Starting</p>
            <p>Always verify the rider identity and trip destination before beginning the journey.</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-xl border">
            <p className="font-semibold text-foreground mb-1">Zero Tolerance Harassment Policy</p>
            <p>Wopido strictly protects its women drivers. Any abusive behavior results in immediate permanent ban of rider accounts.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
