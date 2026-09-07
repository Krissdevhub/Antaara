'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Users,
  Film,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Database,
  Calendar,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Lead, Guest, Episode } from '@/types';

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [leadsRes, guestsRes, episodesRes] = await Promise.all([
          fetch('/api/leads').then((r) => r.json()),
          fetch('/api/guests').then((r) => r.json()),
          fetch('/api/episodes').then((r) => r.json()),
        ]);

        if (leadsRes.success) setLeads(leadsRes.data);
        if (guestsRes.success) setGuests(guestsRes.data);
        if (episodesRes.success) setEpisodes(episodesRes.data);
      } catch (err) {
        console.error('Failed to load dashboard metrics', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;

  const statCards = [
    {
      title: 'Total Inquiries',
      value: leads.length,
      subtitle: `${newLeadsCount} new unread`,
      icon: Inbox,
      href: '/admin/leads',
      color: 'text-amber-700',
    },
    {
      title: 'Active Guests',
      value: guests.length,
      subtitle: 'From reference archive',
      icon: Users,
      href: '/admin/guests',
      color: 'text-[#A5843A]',
    },
    {
      title: 'Episodes Published',
      value: episodes.length,
      subtitle: 'Interactive YouTube streams',
      icon: Film,
      href: '/admin/episodes',
      color: 'text-[#756B67]',
    },
    {
      title: 'New Leads',
      value: newLeadsCount,
      subtitle: 'Requires follow-up',
      icon: Clock,
      href: '/admin/leads?status=New',
      color: 'text-[#D88F91]',
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#756B67]/15">
          <div>
            <span className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold text-[#756B67]">
              Administrative Overview
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-[#292625] font-light mt-1">
              Antaara Unplugged Control Center
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.14em] font-sans hover:bg-[#3D3937] transition-all"
            >
              <span>Manage Leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Link
                key={i}
                href={stat.href}
                className="p-6 rounded-2xl bg-[#EDE5DE] border border-[#756B67]/15 hover:border-[#C7A45B]/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] uppercase tracking-[0.16em] font-sans font-medium text-[#756B67]">
                    {stat.title}
                  </span>
                  <div className="p-2 rounded-xl bg-[#F4F1EC] text-[#292625]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <span className="font-serif text-3xl md:text-4xl text-[#292625] font-light">
                    {loading ? '—' : stat.value}
                  </span>
                  <p className="font-sans text-[11px] text-[#756B67] mt-1">
                    {stat.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Inquiries Section */}
        <div className="bg-[#EDE5DE]/70 rounded-3xl p-6 md:p-8 border border-[#756B67]/15">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#756B67]/10">
            <div>
              <h2 className="font-serif text-2xl text-[#292625]">Recent Contact Inquiries</h2>
              <p className="font-sans text-xs text-[#756B67] mt-0.5">
                Prospective podcast guests, sponsorships, and collaborations
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs uppercase tracking-[0.14em] font-sans text-[#292625] hover:text-[#C7A45B] underline"
            >
              View All Leads ({leads.length})
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs font-sans text-[#756B67]">
              Loading inquiries...
            </div>
          ) : leads.length === 0 ? (
            <div className="py-12 text-center text-xs font-sans text-[#756B67]">
              No inquiries submitted yet.
            </div>
          ) : (
            <div className="divide-y divide-[#756B67]/10">
              {leads.slice(0, 5).map((lead) => (
                <div
                  key={lead.id}
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F4F1EC]/60 px-4 rounded-xl transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-serif text-lg text-[#292625]">{lead.name}</span>
                      <span
                        className={`text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full font-medium ${
                          lead.status === 'New'
                            ? 'bg-amber-100 text-amber-800'
                            : lead.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : lead.status === 'Qualified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-zinc-200 text-zinc-700'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-[#756B67]">
                      {lead.email} {lead.phone ? `• ${lead.phone}` : ''} •{' '}
                      <span className="font-medium text-[#292625]">{lead.subject}</span>
                    </p>
                    <p className="text-xs font-sans text-[#756B67]/90 line-clamp-1 italic">
                      “{lead.message}”
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto flex-shrink-0">
                    <span className="text-[11px] font-sans text-[#756B67]/70">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      href="/admin/leads"
                      className="px-3 py-1.5 rounded-full border border-[#756B67]/20 text-[11px] uppercase tracking-[0.1em] font-sans hover:bg-[#F4F1EC]"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Admin Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/guests"
            className="p-6 rounded-2xl bg-[#F4F1EC] border border-[#756B67]/15 hover:border-[#C7A45B]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <Users className="w-6 h-6 text-[#A5843A] mb-3" />
              <h3 className="font-serif text-xl text-[#292625]">Guest Management</h3>
              <p className="font-sans text-xs text-[#756B67] mt-1">
                Add, edit bios, update portraits, and toggle featured guest cards.
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.14em] font-sans text-[#292625] mt-4 flex items-center gap-1 font-medium">
              Manage {guests.length} Guests →
            </span>
          </Link>

          <Link
            href="/admin/episodes"
            className="p-6 rounded-2xl bg-[#F4F1EC] border border-[#756B67]/15 hover:border-[#C7A45B]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <Film className="w-6 h-6 text-[#756B67] mb-3" />
              <h3 className="font-serif text-xl text-[#292625]">Episode Library</h3>
              <p className="font-sans text-xs text-[#756B67] mt-1">
                Set headline episode for homepage spotlight, edit YouTube URLs.
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.14em] font-sans text-[#292625] mt-4 flex items-center gap-1 font-medium">
              Manage {episodes.length} Episodes →
            </span>
          </Link>

          <Link
            href="/admin/settings"
            className="p-6 rounded-2xl bg-[#F4F1EC] border border-[#756B67]/15 hover:border-[#C7A45B]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <Database className="w-6 h-6 text-emerald-700 mb-3" />
              <h3 className="font-serif text-xl text-[#292625]">Supabase & Settings</h3>
              <p className="font-sans text-xs text-[#756B67] mt-1">
                Verify live database connectivity, update studio phone, email, and social links.
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.14em] font-sans text-[#292625] mt-4 flex items-center gap-1 font-medium">
              Configure Settings →
            </span>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
