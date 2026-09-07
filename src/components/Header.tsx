'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/guests', label: 'Guests' },
    { href: '/episodes', label: 'Episodes' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#F4F1EC]/90 backdrop-blur-md shadow-xs border-b border-[#756B67]/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Wordmark & Seal */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-[#C7A45B]/40 shadow-xs transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/assets/antaara_logo_seal.jpg"
              alt="Antaara Seal"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.22em] text-lg md:text-xl text-[#292625] uppercase font-light leading-none">
              Antaara
            </span>
            <span className="text-[9px] md:text-[10px] tracking-[0.35em] text-[#756B67] uppercase font-sans font-medium mt-1">
              Unplugged
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-9" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-xs tracking-[0.18em] uppercase font-sans transition-colors duration-300 ${
                isActive(link.href)
                  ? 'text-[#292625] font-semibold'
                  : 'text-[#756B67] hover:text-[#292625]'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-[1.5px] bg-[#C7A45B] rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Primary CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/episodes"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#292625]/20 bg-[#292625] text-[#F4F1EC] text-xs tracking-[0.15em] uppercase font-sans hover:bg-[#3D3937] hover:border-[#292625] transition-all duration-300 group"
          >
            <span>Explore Episodes</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#292625] focus:outline-none focus:ring-1 focus:ring-[#C7A45B] rounded-md"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F4F1EC] border-b border-[#756B67]/15 px-6 pt-4 pb-8 shadow-lg transition-all duration-300">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 text-sm tracking-[0.18em] uppercase font-sans border-b border-[#756B67]/10 ${
                  isActive(link.href)
                    ? 'text-[#292625] font-bold pl-2 border-l-2 border-l-[#C7A45B]'
                    : 'text-[#756B67] hover:text-[#292625]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/episodes"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#292625] text-[#F4F1EC] text-xs tracking-[0.16em] uppercase font-sans hover:bg-[#3D3937] transition-all"
              >
                <span>Explore Episodes</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
