'use client';

import React, { useState, useEffect } from 'react';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { SiteSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success) {
          setSettings(data.data);
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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError('New password must be different from current password.');
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPasswordSuccess(data.message || 'Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPasswordSuccess(''), 5000);
      } else {
        setPasswordError(data.error || 'Failed to update password. Please check your current password.');
      }
    } catch (err) {
      console.error(err);
      setPasswordError('Network error while updating password.');
    } finally {
      setPasswordLoading(false);
    }
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
            Platform Settings
          </h1>
        </div>

        {/* Change Password Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#EDE5DE] border border-[#756B67]/20 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-[#756B67]/15">
            <div className="p-2.5 rounded-2xl bg-[#F4F1EC] text-[#292625] border border-[#756B67]/15">
              <KeyRound className="w-5 h-5 text-[#C7A45B]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#292625]">
                Admin Security & Credentials
              </h3>
              <p className="font-sans text-xs text-[#756B67] mt-0.5">
                Change your administrative password to keep the portal safe and secure
              </p>
            </div>
          </div>

          {passwordSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          {passwordError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
              {/* Current Password */}
              <div>
                <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1.5 font-medium">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3.5 pr-10 py-2.5 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-[#292625] placeholder-[#756B67]/50 focus:outline-none focus:border-[#C7A45B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#756B67] hover:text-[#292625] cursor-pointer"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1.5 font-medium">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 pr-10 py-2.5 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-[#292625] placeholder-[#756B67]/50 focus:outline-none focus:border-[#C7A45B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#756B67] hover:text-[#292625] cursor-pointer"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1.5 font-medium">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 pr-10 py-2.5 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-[#292625] placeholder-[#756B67]/50 focus:outline-none focus:border-[#C7A45B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#756B67] hover:text-[#292625] cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={passwordLoading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.14em] font-sans font-medium hover:bg-[#3D3937] transition-all cursor-pointer disabled:opacity-50"
              >
                {passwordLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C7A45B]" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </div>
          </form>
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
