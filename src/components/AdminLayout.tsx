'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Film,
  Inbox,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Database,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [supabaseConnected, setSupabaseConnected] = useState<boolean | null>(null);

  useEffect(() => {
    // Check auth status
    fetch('/api/admin/check')
      .then((res) => {
        if (!res.ok && pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      })
      .catch(() => {
        if (pathname !== '/admin/login') router.push('/admin/login');
      });

    // Check supabase status
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        setSupabaseConnected(Boolean(data.supabaseConnected));
      })
      .catch(() => setSupabaseConnected(false));
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (e) {
      console.error(e);
      router.push('/admin/login');
    }
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/leads', label: 'Leads & Enquiries', icon: Inbox },
    { href: '/admin/guests', label: 'Guests Management', icon: Users },
    { href: '/admin/episodes', label: 'Episodes Management', icon: Film },
    { href: '/admin/settings', label: 'Platform Settings', icon: SettingsIcon },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen flex bg-[#F4F1EC] text-[#292625]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#EDE5DE] border-r border-[#756B67]/15 p-6 fixed inset-y-0 left-0 z-30">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-[#756B67]/15">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#C7A45B]/50">
            <Image
              src="/assets/antaara_logo_seal.jpg"
              alt="Antaara"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-lg text-[#292625] leading-none uppercase tracking-wider">
              Antaara
            </h2>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#756B67] font-sans">
              Editorial Studio
            </span>
          </div>
        </div>

        {/* Database Status Pill */}
        <div className="my-4 px-3 py-2 rounded-xl bg-[#F4F1EC] border border-[#756B67]/10 flex items-center justify-between text-[11px] font-sans">
          <span className="flex items-center gap-1.5 text-[#756B67]">
            <Database className="w-3.5 h-3.5" />
            <span>Supabase</span>
          </span>
          {supabaseConnected ? (
            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Live</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-amber-700 font-medium" title="Using local fallback database. Add SUPABASE keys to sync.">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Local Store</span>
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col space-y-1 mt-2 flex-grow">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-[0.14em] font-sans font-medium transition-colors ${
                  active
                    ? 'bg-[#292625] text-[#F4F1EC]'
                    : 'text-[#756B67] hover:bg-[#F4F1EC] hover:text-[#292625]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-[#756B67]/15 flex flex-col space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-sans text-[#756B67] hover:text-[#292625] hover:bg-[#F4F1EC] transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-sans text-red-700 hover:bg-red-50 transition-colors w-full text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#EDE5DE] border-b border-[#756B67]/15 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#C7A45B]/50">
            <Image
              src="/assets/antaara_logo_seal.jpg"
              alt="Antaara"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-serif text-lg text-[#292625]">Antaara Admin</span>
        </div>

        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-1.5 text-[#292625] rounded-md"
          aria-label="Toggle Menu"
        >
          {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 z-40 bg-[#EDE5DE] border-b border-[#756B67]/20 p-6 shadow-xl space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-[0.14em] font-sans ${
                  active ? 'bg-[#292625] text-[#F4F1EC]' : 'text-[#756B67]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[#756B67]/15 flex justify-between items-center">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-sans text-[#756B67] flex items-center gap-1.5"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-sans text-red-700 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-6 md:p-10 pt-20 lg:pt-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
