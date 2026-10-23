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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-2xl border-t border-purple-100 shadow-[0_-4px_24px_rgba(74,28,106,0.08)]">
      <div className="flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex-1 flex flex-col items-center gap-1 py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all relative',
                isActive
                  ? 'text-[#4A1C6A]'
                  : 'text-muted-foreground/80 hover:text-foreground'
              )}
            >
              <div className="relative">
                <div
                  className={cn(
                    'p-1.5 rounded-xl transition-all',
                    isActive ? 'bg-[#4A1C6A]/10 scale-105' : 'hover:bg-muted/50'
                  )}
                >
                  <Icon className={cn('h-5 w-5', isActive ? 'text-[#4A1C6A]' : 'text-muted-foreground')} />
                </div>
                {item.badge && (
                  <Badge
                    className="absolute -top-1 -right-2 text-[9px] font-black py-0 px-1 h-3.5 bg-emerald-500 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center border-2 border-white"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="leading-none">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8637A]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
