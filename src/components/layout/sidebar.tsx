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
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/requests', label: 'Incoming Requests', icon: Bell, badge: 'Live' },
  { href: '/rides', label: 'Trip History', icon: ClipboardList },
  { href: '/earnings', label: 'Earnings & Payouts', icon: TrendingUp },
  { href: '/documents', label: 'Documents & Verification', icon: FileText },
  { href: '/vehicle', label: 'Vehicle Details', icon: Car },
  { href: '/profile', label: 'Captain Profile', icon: User },
  { href: '/help', label: 'Captain Support', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col w-72 bg-gradient-to-b from-[#1E092B] via-[#160620] to-[#0E0316] text-white min-h-screen fixed left-0 top-0 z-30 border-r border-white/10 shadow-2xl">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#7B3FAB] to-[#E8637A] flex items-center justify-center text-white font-black text-xl shadow-[0_4px_16px_rgba(123,63,171,0.4),inset_0_1px_1px_rgba(255,255,255,0.6)]">
            W
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-white text-lg tracking-tight">Wopido</span>
              <span className="text-[10px] font-bold bg-[#E8637A] text-white px-1.5 py-0.2 rounded-md">
                CAPTAIN
              </span>
            </div>
            <p className="text-white/50 text-xs font-medium">Women Driving Women</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 group',
                isActive
                  ? 'bg-gradient-to-r from-primary to-[#6B2FA0] text-white shadow-[0_6px_18px_rgba(74,28,106,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] scale-[1.02]'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
              )}
            >
              <Icon className={cn('h-4 w-4 transition-transform group-hover:scale-110', isActive ? 'text-white' : 'text-white/60 group-hover:text-white')} />
              <span>{item.label}</span>
              {item.badge && (
                <span className={cn(
                  'ml-auto text-[10px] font-extrabold py-0.5 px-2 rounded-full uppercase tracking-wider',
                  isActive ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Verified Shield Footer */}
      <div className="p-4 m-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center space-y-1.5">
        <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Verified Captain Network</span>
        </div>
        <p className="text-white/40 text-[11px] leading-tight">
          Rourkela Hub • 100% Women Fleet
        </p>
      </div>
    </aside>
  );
}
