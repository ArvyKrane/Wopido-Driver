'use client';

import Link from 'next/link';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DEMO_DRIVER_PROFILE } from '@/lib/demo-data';
import { getInitials } from '@/lib/utils';

export function Navbar() {
  const driver = DEMO_DRIVER_PROFILE;

  return (
    <header className="lg:hidden sticky top-0 z-20 bg-white/85 backdrop-blur-xl border-b border-purple-100/80 shadow-[0_4px_20px_rgba(74,28,106,0.04)]">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4A1C6A] to-[#E8637A] flex items-center justify-center text-white font-black text-base shadow-[0_4px_12px_rgba(74,28,106,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]">
            W
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-foreground text-base tracking-tight">Wopido</span>
              <span className="text-[9px] font-black bg-[#E8637A] text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                Captain
              </span>
            </div>
          </div>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-xl bg-purple-50/60 hover:bg-purple-100/60 text-foreground"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse ring-2 ring-white" />
          </Button>

          <Avatar className="h-9 w-9 ring-2 ring-[#4A1C6A]/20 ring-offset-1">
            <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-[#4A1C6A] to-[#7B3FAB] text-white">
              {getInitials(driver.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
