'use client';

import { cn, formatCurrency } from '@/lib/utils';
import { TrendingUp, Star, Activity } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: 'money' | 'star' | 'rides' | 'total';
  highlight?: boolean;
  className?: string;
}

const iconMap = {
  money: <TrendingUp className="h-4 w-4" />,
  star: <Star className="h-4 w-4" />,
  rides: <Activity className="h-4 w-4" />,
  total: <Activity className="h-4 w-4" />,
};

export function StatsCard({ label, value, icon = 'rides', highlight, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-4 flex flex-col gap-2',
        highlight && 'border-primary/30 bg-primary/5',
        className
      )}
    >
      <div className={cn('flex items-center gap-1.5 text-xs font-medium', highlight ? 'text-primary' : 'text-muted-foreground')}>
        {iconMap[icon]}
        <span>{label}</span>
      </div>
      <div className={cn('text-2xl font-bold', highlight ? 'text-primary' : 'text-foreground')}>
        {value}
      </div>
    </div>
  );
}
