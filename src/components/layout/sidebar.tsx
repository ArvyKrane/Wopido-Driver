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

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/requests', label: 'Incoming Requests', icon: Bell, badge: 'Live' },
  { href: '/rides', label: 'Trip History', icon: ClipboardList },
  { href: '/earnings', label: 'Earnings & Payouts', icon: TrendingUp },
  { href: '/documents', label: 'Documents & KYC', icon: FileText },
  { href: '/vehicle', label: 'Vehicle Details', icon: Car },
  { href: '/profile', label: 'Captain Profile', icon: User },
  { href: '/help', label: 'Support & Help', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 z-30 border-r border-slate-800 shadow-lg">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-sm">
            W
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-white text-base tracking-tight">Wopido</span>
              <span className="text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded">
                CAPTAIN
              </span>
            </div>
            <p className="text-slate-400 text-xs font-medium">Driver Partner</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors group',
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              )}
            >
              <Icon className={cn('h-4 w-4', isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-white')} />
              <span>{item.label}</span>
              {item.badge && (
                <span className={cn(
                  'ml-auto text-[10px] font-extrabold py-0.5 px-2 rounded-full uppercase tracking-wider',
                  isActive ? 'bg-slate-900 text-amber-400' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Network Hub */}
      <div className="p-4 m-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Verified Captain Network</span>
        </div>
        <p className="text-slate-400 text-[11px]">
          Rourkela Hub • 100% Women Fleet
        </p>
      </div>
    </aside>
  );
}
