'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Bell, TrendingUp, User, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/requests', label: 'Requests', icon: Bell, badge: '1' },
  { href: '/rides', label: 'Rides', icon: ClipboardList },
  { href: '/earnings', label: 'Earnings', icon: TrendingUp },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border shadow-lg">
      <div className="flex">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex-1 flex flex-col items-center gap-1 py-2 text-xs font-medium transition-colors relative',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 text-[10px] py-0 px-1 h-4 min-w-4 flex items-center justify-center"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span>{item.label}</span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
