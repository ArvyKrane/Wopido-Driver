export const PRICING_CONFIG = {
  baseFare: 40,
  includedDistance: 2,
  perKmRate: 12,
  platformFeePercent: 3,
  currency: 'INR',
  label: 'Demo Rate',
};

export function calculateFare(distanceKm: number, config = PRICING_CONFIG) {
  const extraDistance = Math.max(0, distanceKm - config.includedDistance);
  const extraCharge = extraDistance * config.perKmRate;
  const subtotal = config.baseFare + extraCharge;
  const platformFee = Math.round(subtotal * config.platformFeePercent * 100) / 10000;
  const total = parseFloat((subtotal + platformFee).toFixed(2));
  // 3% platform commission, 97% captain earnings
  const commissionRate = config.platformFeePercent / 100;
  const driverEarnings = parseFloat((subtotal * (1 - commissionRate)).toFixed(2));

  return {
    baseFare: config.baseFare,
    includedDistance: config.includedDistance,
    extraDistance: parseFloat(extraDistance.toFixed(2)),
    extraCharge: parseFloat(extraCharge.toFixed(2)),
    subtotal: parseFloat(subtotal.toFixed(2)),
    platformFee: parseFloat(platformFee.toFixed(2)),
    total,
    perKmRate: config.perKmRate,
    driverEarnings,
  };
}
