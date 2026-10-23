'use client';

import Link from 'next/link';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DEMO_DRIVER_PROFILE } from '@/lib/demo-data';
import { getInitials } from '@/lib/utils';

export function Navbar() {
  const driver = DEMO_DRIVER_PROFILE;

  return (
    <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4A1C6A] to-[#E8637A] flex items-center justify-center text-white font-bold text-sm">
            W
          </div>
          <span className="font-bold text-foreground text-base">Wopido Driver</span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {getInitials(driver.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
