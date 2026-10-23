import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';
import { BottomNav } from '@/components/layout/bottom-nav';

export const metadata: Metadata = {
  title: 'Wopido Captain — Driver Portal',
  description: 'Empowering women drivers across Rourkela. Drive safely, earn with pride.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0F172A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
        {/* Desktop Sidebar (Fixed Left) */}
        <Sidebar />

        {/* Main Content Area (Offset by sidebar width on lg screens) */}
        <div className="flex-1 flex flex-col min-h-screen lg:pl-64">
          <Navbar />
          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-24 lg:pb-8">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
