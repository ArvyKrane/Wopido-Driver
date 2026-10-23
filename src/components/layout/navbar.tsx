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
    <header className="lg:hidden sticky top-0 z-20 bg-slate-900 border-b border-slate-800 text-white">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-base shadow-sm">
            W
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-black text-white text-base tracking-tight">Wopido</span>
            <span className="text-[9px] font-black bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded uppercase tracking-wider">
              Captain
            </span>
          </div>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
          </Button>

          <Avatar className="h-8 w-8 border border-slate-700">
            <AvatarFallback className="text-xs font-bold bg-slate-800 text-white">
              {getInitials(driver.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
