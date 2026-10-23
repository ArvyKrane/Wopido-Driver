'use client';

import { useMemo } from 'react';
import { DEMO_COMPLETED_RIDES, DEMO_WEEKLY_EARNINGS, DEMO_DRIVER_PROFILE } from '@/lib/demo-data';

export type EarningsPeriod = 'today' | 'week' | 'month';

export function useEarnings(period: EarningsPeriod = 'today') {
  const rides = DEMO_COMPLETED_RIDES;
  const weekly = DEMO_WEEKLY_EARNINGS;
  const driver = DEMO_DRIVER_PROFILE;

  const summary = useMemo(() => {
    const todayRides = rides.filter((r) => r.date === '2026-10-23');
    const todayEarnings = todayRides.reduce((s, r) => s + r.driverEarnings, 0);
    const todayPlatformFees = todayRides.reduce((s, r) => s + (r.fare - r.driverEarnings), 0);

    const weekRides = rides;
    const weekEarnings = driver.weeklyEarnings;
    const weekPlatformFees = parseFloat((weekEarnings * 0.15).toFixed(2));

    const monthEarnings = driver.monthlyEarnings;
    const monthPlatformFees = parseFloat((monthEarnings * 0.15).toFixed(2));

    if (period === 'today') {
      return {
        totalEarnings: parseFloat(todayEarnings.toFixed(2)),
        platformFees: parseFloat(todayPlatformFees.toFixed(2)),
        netEarnings: parseFloat(todayEarnings.toFixed(2)),
        rides: todayRides.length,
        ridesData: todayRides,
      };
    }
    if (period === 'week') {
      return {
        totalEarnings: weekEarnings,
        platformFees: weekPlatformFees,
        netEarnings: parseFloat((weekEarnings - weekPlatformFees).toFixed(2)),
        rides: weekRides.length,
        ridesData: weekRides,
      };
    }
    return {
      totalEarnings: monthEarnings,
      platformFees: monthPlatformFees,
      netEarnings: parseFloat((monthEarnings - monthPlatformFees).toFixed(2)),
      rides: 87,
      ridesData: rides,
    };
  }, [period, rides, driver]);

  return { summary, weekly, rides };
}
