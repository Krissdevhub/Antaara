'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Plus,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  Edit2,
  Mail,
  Phone,
  Calendar,
  Filter,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Lead, LeadStatus, EnquiryType } from '@/types';

const statusOptions: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Closed'];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Modals state
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [deleteLeadTarget, setDeleteLeadTarget] = useState<Lead | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Podcast Guest',
    message: '',
    notes: '',
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (viewLead && viewLead.id === id) {
          setViewLead({ ...viewLead, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNotes = async (id: string, notes: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: viewLead?.status || 'New', notes }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, notes } : l))
        );
        if (viewLead) setViewLead({ ...viewLead, notes });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteLeadTarget) return;
    try {
      const res = await fetch(`/api/leads/${deleteLeadTarget.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== deleteLeadTarget.id));
        setDeleteLeadTarget(null);
        if (viewLead && viewLead.id === deleteLeadTarget.id) {
          setViewLead(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeadData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads((prev) => [data.data, ...prev]);
        setCreateModalOpen(false);
        setNewLeadData({
          name: '',
          email: '',
          phone: '',
          subject: 'Podcast Guest',
          message: '',
          notes: '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        const matchesStatus =
          statusFilter === 'All' || lead.status === statusFilter;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          lead.name.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          (lead.phone && lead.phone.toLowerCase().includes(q)) ||
          lead.subject.toLowerCase().includes(q) ||
          lead.message.toLowerCase().includes(q);
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [leads, statusFilter, searchQuery, sortOrder]);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#756B67]/15">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#756B67]">
              Inquiry Pipeline
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-[#292625] font-light mt-0.5">
              Leads & Enquiries
            </h1>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.14em] font-sans hover:bg-[#3D3937] transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Lead</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#EDE5DE] rounded-2xl p-4 border border-[#756B67]/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-sans text-[#756B67] mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Status:
            </span>
            {(['All', ...statusOptions] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-[0.1em] font-sans font-medium transition-all ${
                  statusFilter === s
                    ? 'bg-[#292625] text-[#F4F1EC]'
                    : 'bg-[#F4F1EC] text-[#756B67] hover:bg-[#F4F1EC]/80'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-grow md:w-64">
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-full bg-[#F4F1EC] border border-[#756B67]/20 text-xs font-sans text-[#292625] focus:outline-none focus:border-[#C7A45B]"
              />
              <Search className="w-3.5 h-3.5 text-[#756B67] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="px-3 py-1.5 rounded-full border border-[#756B67]/20 bg-[#F4F1EC] text-xs font-sans text-[#756B67] hover:text-[#292625] whitespace-nowrap"
            >
              Date: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-[#EDE5DE]/70 rounded-2xl border border-[#756B67]/15 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#756B67]/15 bg-[#EDE5DE] text-[10px] uppercase tracking-[0.18em] font-sans text-[#756B67]">
                  <th className="py-3.5 px-5">Lead / Contact</th>
                  <th className="py-3.5 px-4">Subject</th>
                  <th className="py-3.5 px-4">Message Snippet</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#756B67]/10 text-xs font-sans">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#756B67]">
                      Loading inquiries...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#756B67]">
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#F4F1EC]/60 transition-colors"
                    >
                      <td className="py-4 px-5">
                        <div className="font-serif text-base text-[#292625] font-normal">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-[#756B67]">
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="text-[10px] text-[#756B67]/70">
                            {lead.phone}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-[#F4F1EC] border border-[#756B67]/15 text-[10px] font-medium text-[#292625]">
                          {lead.subject}
                        </span>
                      </td>

                      <td className="py-4 px-4 max-w-xs">
                        <p className="line-clamp-2 text-[#756B67] leading-relaxed">
                          {lead.message}
                        </p>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap text-[#756B67]">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value as LeadStatus)
                          }
                          className={`text-[11px] font-medium rounded-lg px-2.5 py-1 border border-transparent focus:border-[#C7A45B] focus:outline-none cursor-pointer ${
                            lead.status === 'New'
                              ? 'bg-amber-100 text-amber-800'
                              : lead.status === 'Contacted'
                              ? 'bg-blue-100 text-blue-800'
                              : lead.status === 'Qualified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-zinc-200 text-zinc-700'
                          }`}
                        >
                          {statusOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-4 px-5 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => setViewLead(lead)}
                          className="p-1.5 text-[#756B67] hover:text-[#292625] hover:bg-[#F4F1EC] rounded-md transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteLeadTarget(lead)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Lead Detail Modal */}
        {viewLead && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#F4F1EC] rounded-3xl p-6 md:p-8 border border-[#756B67]/20 shadow-2xl relative">
              <button
                onClick={() => setViewLead(null)}
                className="absolute top-6 right-6 p-1 text-[#756B67] hover:text-[#292625] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#756B67]">
                  Lead Detail
                </span>
                <h3 className="font-serif text-3xl text-[#292625] font-light mt-1">
                  {viewLead.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#E4D3CC] font-medium text-[#292625]">
                    {viewLead.subject}
                  </span>
                  <span className="text-xs text-[#756B67]">
                    Received: {new Date(viewLead.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-4 font-sans text-xs text-[#756B67] pb-6 border-b border-[#756B67]/15">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#A5843A]" />
                  <a href={`mailto:${viewLead.email}`} className="text-[#292625] hover:underline">
                    {viewLead.email}
                  </a>
                </div>
                {viewLead.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#A5843A]" />
                    <a href={`tel:${viewLead.phone}`} className="text-[#292625] hover:underline">
                      {viewLead.phone}
                    </a>
                  </div>
                )}
                <div>
                  <strong className="text-[#292625] block mb-1">Message Content:</strong>
                  <div className="p-4 rounded-xl bg-[#EDE5DE] text-[#292625] leading-relaxed whitespace-pre-line">
                    {viewLead.message}
                  </div>
                </div>
              </div>

              {/* Status & Internal Notes */}
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase tracking-[0.14em] font-sans font-medium text-[#292625]">
                    Pipeline Status:
                  </label>
                  <select
                    value={viewLead.status}
                    onChange={(e) =>
                      handleStatusChange(viewLead.id, e.target.value as LeadStatus)
                    }
                    className="text-xs rounded-lg px-3 py-1.5 bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.14em] font-sans font-medium text-[#292625] block mb-1">
                    Internal Notes & Follow-up History:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Add team notes regarding this lead..."
                    defaultValue={viewLead.notes || ''}
                    onBlur={(e) => handleSaveNotes(viewLead.id, e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-xs font-sans text-[#292625]"
                  />
                  <p className="text-[10px] text-[#756B67] mt-1">
                    Notes auto-save when clicking outside the box.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteLeadTarget && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#F4F1EC] rounded-3xl p-6 border border-red-200 shadow-xl">
              <h3 className="font-serif text-2xl text-red-700">Delete Enquiry?</h3>
              <p className="font-sans text-xs text-[#756B67] mt-2 leading-relaxed">
                Are you sure you want to delete the enquiry from{' '}
                <strong>{deleteLeadTarget.name}</strong> ({deleteLeadTarget.email})? This action cannot be undone.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteLeadTarget(null)}
                  className="px-4 py-2 rounded-full border border-[#756B67]/20 text-xs font-sans text-[#756B67]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-sans hover:bg-red-700"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Manual Create Lead Modal */}
        {createModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#F4F1EC] rounded-3xl p-8 border border-[#756B67]/20 shadow-2xl relative">
              <button
                onClick={() => setCreateModalOpen(false)}
                className="absolute top-6 right-6 p-1 text-[#756B67] hover:text-[#292625]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-3xl text-[#292625] font-light mb-4">
                Record New Lead
              </h3>

              <form onSubmit={handleCreateLead} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLeadData.name}
                    onChange={(e) =>
                      setNewLeadData({ ...newLeadData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={newLeadData.email}
                      onChange={(e) =>
                        setNewLeadData({ ...newLeadData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={newLeadData.phone}
                      onChange={(e) =>
                        setNewLeadData({ ...newLeadData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1">
                    Enquiry Type
                  </label>
                  <select
                    value={newLeadData.subject}
                    onChange={(e) =>
                      setNewLeadData({ ...newLeadData, subject: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                  >
                    <option value="Podcast Guest">Podcast Guest</option>
                    <option value="Brand Collaboration">Brand Collaboration</option>
                    <option value="Sponsorship">Sponsorship</option>
                    <option value="Media">Media</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1">
                    Message / Notes *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newLeadData.message}
                    onChange={(e) =>
                      setNewLeadData({ ...newLeadData, message: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-[#756B67]/20 text-xs font-sans text-[#756B67]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.14em] hover:bg-[#3D3937]"
                  >
                    Save Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
