'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Lenis from 'lenis';

/**
 * Header component with sticky navigation and smooth scroll support
 * Features:
 * - Sticky positioning that overlays content without layout shifts
 * - Accessible keyboard navigation with proper focus management
 * - Mobile-responsive hamburger menu
 * - Smooth scroll integration with Lenis
 */

// Navigation items defined outside component to prevent hydration mismatches
const navigationItems = [
  { href: '#home', label: 'Home', id: 'nav-home' },
  { href: '/projects', label: 'Projects', id: 'nav-projects', isExternal: true },
  { href: '/about', label: 'About', id: 'nav-about', isExternal: true },
  { href: '#services', label: 'Services', id: 'nav-services' },
  { href: '#contact', label: 'Contact', id: 'nav-contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header background
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal: boolean = false) => {
    if (isExternal) {
      // For external links, let the default behavior handle navigation
      setIsMenuOpen(false);
      return;
    }
    
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Use Lenis smooth scroll if available
    if (typeof window !== 'undefined' && (window as unknown as { lenis?: Lenis }).lenis) {
      (window as unknown as { lenis: Lenis }).lenis.scrollTo(href, { duration: 1.2 });
    } else {
      // Fallback to native smooth scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-transparent'
        }
      `}
      role="banner"
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="#home"
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                         focus-visible:ring-offset-2 rounded-md px-2 py-1 transition-colors duration-200"
              onClick={(e) => handleNavClick(e, '#home')}
              aria-label="FareezArt - Go to home section"
            >
              FareezArt
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  id={item.id}
                  className={`
                    text-sm font-medium transition-colors duration-200 rounded-md px-3 py-2
                    hover:text-blue-600 hover:bg-blue-50
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                    focus-visible:ring-offset-2 focus-visible:bg-blue-50
                    ${isScrolled ? 'text-gray-700' : 'text-gray-800'}
                  `}
                  onClick={(e) => handleNavClick(e, item.href, item.isExternal)}
                  tabIndex={0}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className={`
                inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                focus-visible:ring-offset-2
                ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-800 hover:bg-gray-100'}
              `}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="sr-only">
                {isMenuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {/* Hamburger Icon */}
              <svg
                className={`h-6 w-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mobile-menu-button"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-gray-200/50">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                    hover:text-blue-600 hover:bg-blue-50
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                    focus-visible:ring-offset-2 focus-visible:bg-blue-50
                    text-gray-700
                  `}
                  onClick={(e) => handleNavClick(e, item.href, item.isExternal)}
                  role="menuitem"
                  tabIndex={0}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
