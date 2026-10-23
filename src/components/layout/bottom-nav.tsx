'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Bell, TrendingUp, User, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/requests', label: 'Requests', icon: Bell, badge: 'Live' },
  { href: '/rides', label: 'Rides', icon: ClipboardList },
  { href: '/earnings', label: 'Earnings', icon: TrendingUp },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900 border-t border-slate-800 shadow-lg text-white">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex-1 flex flex-col items-center gap-1 py-1.5 px-1 rounded-xl text-[11px] font-bold transition-colors relative',
                isActive ? 'text-amber-400' : 'text-slate-400 hover:text-white'
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <Badge className="absolute -top-1 -right-2 text-[9px] font-black py-0 px-1 h-3 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="leading-none">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-amber-400" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
