import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';
import { BottomNav } from '@/components/layout/bottom-nav';

export const metadata: Metadata = {
  title: 'Wopido Captain — Women Driver Portal',
  description: 'Empowering women drivers across Pune. Drive safely, earn with pride.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#4A1C6A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#FAF8FC] font-sans antialiased text-[#1A1025] relative selection:bg-[#E8637A]/20 selection:text-[#4A1C6A]">
        {/* Ambient background light orbs for luxury glassmorphism */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#4A1C6A]/10 to-[#E8637A]/10 blur-3xl" />
          <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-gradient-to-bl from-[#7B3FAB]/8 to-[#10B981]/8 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-[#E8637A]/8 to-transparent blur-3xl" />
        </div>

        {/* Desktop Sidebar (Fixed Left) */}
        <Sidebar />

        {/* Main Content Area (Offset by sidebar width on lg screens) */}
        <div className="flex-1 flex flex-col min-h-screen lg:pl-72">
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
