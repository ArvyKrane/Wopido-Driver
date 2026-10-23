'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';

export default function DriverAuthPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setStep('otp');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">Wopido Captain Portal</h1>
          <p className="text-xs text-muted-foreground">
            Sign in to start driving, accept rides, and track daily earnings.
          </p>
        </div>

        <Card className="p-6 border-border/80 bg-card shadow-lg space-y-5">
          {step === 'phone' ? (
            <form onSubmit={handleContinue} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-semibold">Registered Driver Mobile</Label>
                <div className="flex gap-2">
                  <span className="flex items-center justify-center px-3 rounded-lg border bg-muted text-xs font-semibold text-muted-foreground">
                    +91
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 text-sm font-mono"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-primary/5 rounded-xl border border-primary/20 text-xs text-primary flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  Exclusive platform for verified women drivers with validated Driving Licence & RC.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/95 text-white font-bold text-xs gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="text-center space-y-1">
                <h3 className="font-bold text-sm text-foreground">Enter Driver OTP</h3>
                <p className="text-xs text-muted-foreground">
                  Sent to +91 {phone || '9876543210'}
                </p>
              </div>

              <div className="space-y-1.5">
                <Input
                  id="otp"
                  type="text"
                  placeholder="• • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-12 text-center text-xl font-mono tracking-widest"
                  maxLength={4}
                  required
                />
                <p className="text-[11px] text-center text-muted-foreground">
                  (Demo: enter any 4 digits, e.g. 1234)
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-primary hover:bg-primary/95 text-white font-bold text-xs"
              >
                {loading ? 'Verifying Captain...' : 'Sign In to Dashboard'}
              </Button>
            </form>
          )}

          {/* Quick Demo Bypass */}
          <div className="pt-2 border-t text-center space-y-2">
            <p className="text-[11px] text-muted-foreground font-medium">Testing the captain app?</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => router.push('/')}
              className="w-full text-xs h-9 border-dashed gap-1.5"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-primary" />
              Demo One-Click Sign In (Priya Sharma)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
