# Wopido Captain — Driver Partner Portal (Driver App)

> **Empowering women on the move.** Driver partner portal for women driving on the Wopido ride-hailing network.

---

## 🛵 Captain Highlights & Capabilities
- **Availability Toggle**: Realtime Online/Offline toggle controlling request eligibility.
- **Atomic Ride Acceptance**: Concurrency-protected booking claims ensuring no two drivers can accept the same ride.
- **Active Trip Workflow**: Status-dependent action buttons (`Mark Arrived` → `Start Ride` → `Complete Ride`).
- **30-Second Request Timer**: Visual countdown ring and sound alerts for incoming booking offers.
- **Transparent Earnings Ledger**: Realtime calculations (85% driver take-home, 15% platform commission), daily/weekly totals, and per-trip fee ledger.
- **Document Verification Workflow**: Driving Licence, RC, Vehicle Insurance, and PUC status tracking.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS & shadcn/ui
- **Icons**: Lucide React
- **Backend**: Supabase (PostgreSQL, Realtime, RLS)
- **Default Port**: 3001

---

## 🚀 Quick Start (Local Setup)

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📱 Driver Portal Screens
- `/` — Captain Dashboard: Status toggle, active trip cards, daily earnings, rating, incoming requests.
- `/requests` — Request Queue: Filter and view available ride bookings.
- `/rides` — Trip History: Log of completed rides, rider ratings, and earnings.
- `/rides/[id]` — Trip Summary: Itemized earnings and commission breakdown.
- `/earnings` — Earnings Analytics: Daily and weekly charts, net payouts, UPI accounts.
- `/documents` — Verification Center: Status of Licence, RC, Insurance, and PUC.
- `/vehicle` — Vehicle Management: Reg details, color, model, and category.
- `/profile` — Captain Profile: Badges, safe driving streaks, and account settings.
- `/help` — Captain Help: Safety protocols and 24/7 driver support.
