'use client';

import { useState } from 'react';

const isDemoMode =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project') ||
  process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // demo: pre-logged in
  const [loading, setLoading] = useState(false);

  const login = async (phone: string, _password?: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoggedIn(true);
    setLoading(false);
    return { success: true };
  };

  const logout = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setIsLoggedIn(false);
    setLoading(false);
  };

  return { isLoggedIn, login, logout, loading, isDemoMode };
}
