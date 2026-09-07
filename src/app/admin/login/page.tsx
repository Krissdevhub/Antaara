'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Authentication failed. Please check password.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred connecting to the auth service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1EC] p-6 relative overflow-hidden">
      {/* Background Floral Accents */}
      <div className="absolute -top-12 -left-12 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-80 h-80 text-[#D9AAA6]" fill="currentColor">
          <circle cx="100" cy="100" r="90" />
        </svg>
      </div>

      <div className="w-full max-w-md bg-[#EDE5DE] rounded-3xl p-8 md:p-10 border border-[#756B67]/20 shadow-md relative z-10">
        {/* Brand Seal */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C7A45B]/60 shadow-sm mb-4">
            <Image
              src="/assets/antaara_logo_seal.jpg"
              alt="Antaara"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#756B67]">
            Editorial Suite
          </span>
          <h1 className="font-serif text-3xl text-[#292625] font-light mt-1">
            Antaara Unplugged
          </h1>
          <p className="font-sans text-xs text-[#756B67] mt-1">
            Enter administrative key to manage platform
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] font-sans font-medium text-[#292625] mb-2">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-xs font-sans text-[#292625] placeholder-[#756B67]/50 focus:outline-none focus:border-[#C7A45B] focus:ring-1 focus:ring-[#C7A45B] transition-colors"
              />
              <Lock className="w-4 h-4 text-[#756B67] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[10px] text-[#756B67]/80 font-sans mt-1.5">
              Default password: <code className="bg-[#F4F1EC] px-1 py-0.5 rounded text-[#292625]">antaara2024</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.16em] font-sans font-medium hover:bg-[#3D3937] transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Access...</span>
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#756B67]/15 text-center">
          <a
            href="/"
            className="text-xs uppercase tracking-[0.12em] font-sans text-[#756B67] hover:text-[#292625]"
          >
            ← Return to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
