'use client';

import { useLenis } from '../hooks/useLenis';

/**
 * LenisProvider component that initializes smooth scrolling
 * Wraps the entire app to provide smooth scroll functionality
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useLenis();
  
  return <>{children}</>;
}

