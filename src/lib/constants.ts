export const APP_NAME = 'Wopido Driver';
export const APP_VERSION = '1.0.0';

export const VEHICLE_CATEGORIES = [
  { id: 'bike', label: 'Bike', icon: '🏍' },
  { id: 'auto', label: 'Auto', icon: '🛺' },
  { id: 'cab', label: 'Cab', icon: '🚗' },
] as const;

export type VehicleCategory = (typeof VEHICLE_CATEGORIES)[number]['id'];

export const RIDE_STATUSES = [
  'searching',
  'accepted',
  'driver_arrived',
  'in_progress',
  'completed',
  'cancelled',
] as const;

export type RideStatus = (typeof RIDE_STATUSES)[number];

export const DOCUMENT_TYPES = [
  { id: 'driving_licence', label: 'Driving Licence', required: true, hasExpiry: true },
  { id: 'govt_id', label: 'Government ID (Aadhaar)', required: true, hasExpiry: false },
  { id: 'vehicle_rc', label: 'Vehicle RC', required: true, hasExpiry: false },
  { id: 'insurance', label: 'Vehicle Insurance', required: true, hasExpiry: true },
  { id: 'puc', label: 'PUC Certificate', required: true, hasExpiry: true },
  { id: 'selfie', label: 'Profile Photo / Selfie', required: true, hasExpiry: false },
] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number]['id'];

export const DOC_STATUSES = [
  'not_submitted',
  'pending_review',
  'approved',
  'rejected',
  'expired',
] as const;

export type DocStatus = (typeof DOC_STATUSES)[number];

export const REQUEST_TIMEOUT_SECONDS = 30;
export const PLATFORM_FEE_PERCENT = 15; // driver keeps 85%

export const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
