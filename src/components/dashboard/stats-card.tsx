'use client';

import { cn } from '@/lib/utils';
import { TrendingUp, Star, Activity, Award } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: 'money' | 'star' | 'rides' | 'total';
  highlight?: boolean;
  className?: string;
  subtitle?: string;
}

const configMap = {
  money: {
    icon: TrendingUp,
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  star: {
    icon: Star,
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  rides: {
    icon: Activity,
    badgeBg: 'bg-slate-100 text-slate-700 border-slate-200',
  },
  total: {
    icon: Award,
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
};

export function StatsCard({
  label,
  value,
  icon = 'rides',
  highlight,
  className,
  subtitle,
}: StatsCardProps) {
  const itemConfig = configMap[icon];
  const Icon = itemConfig.icon;

  return (
    <div
      className={cn(
        'rounded-2xl p-4 md:p-5 transition-all bg-white border border-slate-200 shadow-sm',
        highlight && 'border-amber-300 bg-amber-50/20',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        <div
          className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center border',
            itemConfig.badgeBg
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="space-y-0.5">
        <div
          className={cn(
            'text-2xl md:text-3xl font-black tracking-tight',
            highlight ? 'text-slate-950' : 'text-slate-900'
          )}
        >
          {value}
        </div>
        {subtitle && (
          <p className="text-[11px] font-medium text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
