'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface AvailabilityToggleProps {
  isOnline: boolean;
  onToggle: () => void;
  loading?: boolean;
}

export function AvailabilityToggle({ isOnline, onToggle, loading }: AvailabilityToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={loading}
      aria-label={isOnline ? 'Switch to Offline' : 'Switch to Online'}
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-xs transition-all border shadow-sm active:scale-95',
        isOnline
          ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
      )}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          {isOnline && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          )}
          <span
            className={cn(
              'relative inline-flex rounded-full h-3 w-3',
              isOnline ? 'bg-white' : 'bg-slate-400'
            )}
          />
        </span>
        <span className="text-xs font-black tracking-wide">
          {loading ? 'Updating...' : isOnline ? 'YOU ARE ONLINE' : 'YOU ARE OFFLINE'}
        </span>
      </div>

      <span
        className={cn(
          'text-[10px] font-black px-2 py-0.5 rounded-md',
          isOnline ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-600'
        )}
      >
        {isOnline ? 'Receiving Rides' : 'Go Online'}
      </span>
    </button>
  );
}
