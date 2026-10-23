'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Bell,
  TrendingUp,
  FileText,
  User,
  Car,
  HelpCircle,
  ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/requests', label: 'Requests', icon: Bell, badge: '1' },
  { href: '/rides', label: 'Rides', icon: ClipboardList },
  { href: '/earnings', label: 'Earnings', icon: TrendingUp },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/vehicle', label: 'Vehicle', icon: Car },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/help', label: 'Help', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A1C6A] to-[#E8637A] flex items-center justify-center text-white font-bold text-lg">
            W
          </div>
          <div>
            <div className="font-bold text-white text-lg leading-none">Wopido</div>
            <div className="text-slate-400 text-xs">Driver Partner</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[#4A1C6A] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs py-0 px-1.5 h-5">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <p className="text-slate-500 text-xs text-center">Wopido Driver v1.0</p>
        <p className="text-slate-600 text-xs text-center mt-1">Women-first ride hailing</p>
      </div>
    </aside>
  );
}
