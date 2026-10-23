'use client';

import { cn } from '@/lib/utils';
import { Loader2, Power } from 'lucide-react';

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
        'group relative flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 font-extrabold text-xs shadow-md active:scale-95',
        isOnline
          ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white shadow-[0_8px_20px_rgba(16,185,129,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]'
          : 'bg-white/90 dark:bg-slate-800 text-muted-foreground border-2 border-border shadow-sm hover:border-emerald-500/50 hover:text-foreground'
      )}
    >
      {/* 3D Tactile Orb */}
      <div className={cn(
        'relative w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300',
        isOnline 
          ? 'bg-white text-emerald-600 shadow-[0_2px_6px_rgba(0,0,0,0.15)]' 
          : 'bg-muted text-muted-foreground'
      )}>
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Power className="w-3.5 h-3.5" />
        )}
        {isOnline && (
          <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400/40 pointer-events-none" />
        )}
      </div>

      <div className="text-left pr-1">
        <span className="block leading-none font-black tracking-wide">
          {isOnline ? 'CAPTAIN ONLINE' : 'CAPTAIN OFFLINE'}
        </span>
        <span className={cn('text-[10px] font-semibold leading-tight block mt-0.5', isOnline ? 'text-white/80' : 'text-muted-foreground')}>
          {isOnline ? 'Accepting Live Rides' : 'Tap to Go Online'}
        </span>
      </div>
    </button>
  );
}
