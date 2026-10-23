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
    badgeBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    accentBorder: 'hover:border-emerald-500/30',
  },
  star: {
    icon: Star,
    badgeBg: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    accentBorder: 'hover:border-amber-500/30',
  },
  rides: {
    icon: Activity,
    badgeBg: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    accentBorder: 'hover:border-purple-500/30',
  },
  total: {
    icon: Award,
    badgeBg: 'bg-pink-500/10 text-[#E8637A] border-pink-500/20',
    accentBorder: 'hover:border-pink-500/30',
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
        'group relative overflow-hidden rounded-2xl p-4 md:p-5 transition-all duration-300',
        'bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_8px_24px_rgba(74,28,106,0.04)]',
        'hover:shadow-[0_12px_32px_rgba(74,28,106,0.08)] hover:-translate-y-0.5',
        highlight
          ? 'bg-gradient-to-br from-white/95 via-purple-50/50 to-white/90 border-[#4A1C6A]/20 shadow-[0_8px_28px_rgba(74,28,106,0.08)]'
          : itemConfig.accentBorder,
        className
      )}
    >
      {/* Top subtle highlight line for clay glass effect */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />

      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <div
          className={cn(
            'w-8 h-8 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110 shadow-sm',
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
            highlight ? 'text-[#4A1C6A]' : 'text-foreground'
          )}
        >
          {value}
        </div>
        {subtitle && (
          <p className="text-[11px] font-medium text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
