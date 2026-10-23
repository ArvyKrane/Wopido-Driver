'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AvailabilityToggleProps {
  isOnline: boolean;
  onToggle: () => void;
  loading?: boolean;
  isDemoMode?: boolean;
}

export function AvailabilityToggle({ isOnline, onToggle, loading, isDemoMode }: AvailabilityToggleProps) {
  return (
    <div className={cn(
      'rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-500',
      isOnline
        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-200'
        : 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700'
    )}>
      {/* Status indicator */}
      <div className="relative">
        <button
          onClick={onToggle}
          disabled={loading}
          aria-label={isOnline ? 'Go Offline' : 'Go Online'}
          className={cn(
            'w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold transition-all duration-300 shadow-inner focus:outline-none focus:ring-4',
            isOnline
              ? 'bg-white/20 ring-white/50 hover:bg-white/30'
              : 'bg-white/50 ring-slate-400/50 hover:bg-white/70'
          )}
        >
          {loading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <span className="text-4xl">{isOnline ? '🟢' : '⚫'}</span>
          )}
        </button>
        {isOnline && (
          <span className="absolute inset-0 rounded-full animate-ping bg-white/30 pointer-events-none" />
        )}
      </div>

      {/* Status text */}
      <div className="text-center">
        <p className="text-lg font-bold">
          {isOnline ? 'You are Online' : 'You are Offline'}
        </p>
        <p className={cn('text-sm mt-1', isOnline ? 'text-white/80' : 'text-slate-600')}>
          {isOnline ? 'Accepting rides from nearby riders' : 'Tap to start accepting rides'}
        </p>
      </div>

      {isDemoMode && (
        <Badge variant="demo" className="bg-white/20 text-white border-white/30">
          [DEMO] Local state only
        </Badge>
      )}
    </div>
  );
}
