'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Database, Copy, Check } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { SiteSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success) {
          setSettings(data.data);
          setSupabaseConnected(data.supabaseConnected);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const copySqlPath = () => {
    navigator.clipboard.writeText('supabase/schema.sql');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || !settings) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-xs font-sans text-[#756B67]">
          Loading platform configurations...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="pb-4 border-b border-[#756B67]/15">
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#756B67]">
            Platform Governance
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#292625] font-light mt-0.5">
            Settings & Integrations
          </h1>
        </div>

        {/* Supabase Integration Diagnostic Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#EDE5DE] border border-[#756B67]/20">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#F4F1EC] text-emerald-800">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#292625]">
                  Supabase PostgreSQL Engine
                </h3>
                <p className="font-sans text-xs text-[#756B67]">
                  Real-time database connection status
                </p>
              </div>
            </div>

            {supabaseConnected ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-sans font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Connected to Supabase</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-sans font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Local Resilient Store Active</span>
              </span>
            )}
          </div>

          <div className="text-xs font-sans text-[#756B67] leading-relaxed space-y-2 mt-4 pt-4 border-t border-[#756B67]/15">
            <p>
              The platform is currently operating in <strong>{supabaseConnected ? 'Supabase Synchronized' : 'Local Fallback'}</strong> mode.
              All contact submissions, guest edits, and episode updates work immediately with zero latency.
            </p>
            <p>
              To link your direct Supabase project, supply your credentials in <code className="bg-[#F4F1EC] px-1.5 py-0.5 rounded text-[#292625]">.env.local</code>:
            </p>
            <div className="p-3 rounded-xl bg-[#292625] text-[#EDE5DE] font-mono text-[11px] select-all">
              NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co<br />
              NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
            </div>
            <div className="flex items-center gap-2 pt-2">
              <span>SQL migration script ready at:</span>
              <code className="bg-[#F4F1EC] px-1.5 py-0.5 rounded font-mono text-[#292625]">
                supabase/schema.sql
              </code>
              <button
                onClick={copySqlPath}
                className="p-1 text-[#756B67] hover:text-[#292625] rounded"
                title="Copy path"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSave} className="space-y-6">
          {savedSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Platform settings updated successfully.</span>
            </div>
          )}

          {/* Host Profile */}
          <div className="p-6 md:p-8 rounded-3xl bg-[#EDE5DE]/70 border border-[#756B67]/15 space-y-4">
            <h3 className="font-serif text-2xl text-[#292625] pb-2 border-b border-[#756B67]/10">
              Host & Brand Profile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
              <div>
                <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                  Host Name
                </label>
                <input
                  type="text"
                  value={settings.hostName}
                  onChange={(e) => setSettings({ ...settings, hostName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-[#292625]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                  Host Role / Studio Title
                </label>
                <input
                  type="text"
                  value={settings.hostRole}
                  onChange={(e) => setSettings({ ...settings, hostRole: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-[#292625]"
                />
              </div>
            </div>

            <div className="font-sans text-xs">
              <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                Host Biography
              </label>
              <textarea
                rows={3}
                value={settings.hostBio}
                onChange={(e) => setSettings({ ...settings, hostBio: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-[#292625]"
              />
            </div>

            <div className="font-sans text-xs">
              <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                Host Portrait Asset Path
              </label>
              <input
                type="text"
                value={settings.hostPortraitUrl}
                onChange={(e) =>
                  setSettings({ ...settings, hostPortraitUrl: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-[#292625]"
              />
            </div>
          </div>

          {/* Studio Contact Info */}
          <div className="p-6 md:p-8 rounded-3xl bg-[#EDE5DE]/70 border border-[#756B67]/15 space-y-4">
            <h3 className="font-serif text-2xl text-[#292625] pb-2 border-b border-[#756B67]/10">
              Studio Contact & Channels
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
              <div>
                <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                  Studio Phone
                </label>
                <input
                  type="text"
                  value={settings.contactPhone}
                  onChange={(e) =>
                    setSettings({ ...settings, contactPhone: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-[#292625]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                  Official Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, contactEmail: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-[#292625]"
                />
              </div>
            </div>

            <div className="font-sans text-xs">
              <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                Physical Studio Address
              </label>
              <input
                type="text"
                value={settings.contactAddress}
                onChange={(e) =>
                  setSettings({ ...settings, contactAddress: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-[#292625]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
              <div>
                <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                  Instagram Handle / URL
                </label>
                <input
                  type="text"
                  value={settings.instagramUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, instagramUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-[#292625]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                  YouTube Channel URL
                </label>
                <input
                  type="text"
                  value={settings.youtubeUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, youtubeUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-[#292625]"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.16em] font-sans font-medium hover:bg-[#3D3937] transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Preserving Changes...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
