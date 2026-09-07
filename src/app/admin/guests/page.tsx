'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Edit, Trash2, Check, X, Search, Sparkles, Star } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Guest, GuestCategory } from '@/types';

const categories: GuestCategory[] = [
  'Spirituality',
  'Cinema & Television',
  'Entrepreneurship',
  'Social Impact',
  'Wellness',
  'Culture',
];

export default function AdminGuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Edit / Create Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Partial<Guest> | null>(null);
  const [deleteGuestTarget, setDeleteGuestTarget] = useState<Guest | null>(null);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/guests');
      const data = await res.json();
      if (data.success) {
        setGuests(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleOpenCreate = () => {
    setEditingGuest({
      name: '',
      category: 'Spirituality',
      roleTitle: '',
      bio: '',
      fullDescription: '',
      portraitUrl: '/assets/shri-amogh-lila-das-ji.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      episodeTitle: '',
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (guest: Guest) => {
    setEditingGuest({ ...guest });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGuest?.name) return;

    try {
      const url = editingGuest.id ? `/api/guests/${editingGuest.id}` : '/api/guests';
      const method = editingGuest.id ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingGuest),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        setEditingGuest(null);
        fetchGuests();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteGuestTarget) return;
    try {
      const res = await fetch(`/api/guests/${deleteGuestTarget.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setGuests((prev) => prev.filter((g) => g.id !== deleteGuestTarget.id));
        setDeleteGuestTarget(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFeatured = async (guest: Guest) => {
    try {
      const updatedStatus = !guest.isFeatured;
      const res = await fetch(`/api/guests/${guest.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: updatedStatus }),
      });
      if (res.ok) {
        setGuests((prev) =>
          prev.map((g) => (g.id === guest.id ? { ...g, isFeatured: updatedStatus } : g))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredGuests = guests.filter((g) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      g.name.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.roleTitle.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#756B67]/15">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#756B67]">
              Content Management
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-[#292625] font-light mt-0.5">
              Guest Profiles
            </h1>
          </div>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.14em] font-sans hover:bg-[#3D3937] transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Guest</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by name, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#EDE5DE] border border-[#756B67]/20 text-xs font-sans text-[#292625] focus:outline-none focus:border-[#C7A45B]"
            />
            <Search className="w-4 h-4 text-[#756B67] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <span className="text-xs font-sans text-[#756B67]">
            {filteredGuests.length} Guests Cataloged
          </span>
        </div>

        {/* Guests Grid/Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-16 text-center text-xs font-sans text-[#756B67]">
              Loading guest profiles...
            </div>
          ) : filteredGuests.length === 0 ? (
            <div className="col-span-full py-16 text-center text-xs font-sans text-[#756B67]">
              No guests found matching search.
            </div>
          ) : (
            filteredGuests.map((guest) => (
              <div
                key={guest.id}
                className="bg-[#EDE5DE] rounded-2xl p-5 border border-[#756B67]/15 flex flex-col justify-between hover:border-[#C7A45B]/50 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F4F1EC] flex-shrink-0 border border-[#756B67]/20">
                      <Image
                        src={guest.portraitUrl}
                        alt={guest.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <span className="text-[9px] uppercase tracking-[0.16em] font-sans text-[#A5843A] font-semibold block">
                        {guest.category}
                      </span>
                      <h3 className="font-serif text-xl text-[#292625] leading-snug">
                        {guest.name}
                      </h3>
                      <p className="text-[11px] font-sans text-[#756B67] line-clamp-1">
                        {guest.roleTitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-[#756B67] line-clamp-2 mb-3 leading-relaxed">
                    {guest.bio}
                  </p>

                  <div className="text-[11px] font-sans text-[#756B67]/80 mb-4">
                    <strong className="text-[#292625]">Episode:</strong> {guest.episodeTitle}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#756B67]/15 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleFeatured(guest)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-[0.1em] transition-colors ${
                      guest.isFeatured
                        ? 'bg-[#C7A45B] text-[#292625] font-semibold'
                        : 'bg-[#F4F1EC] text-[#756B67]'
                    }`}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    <span>{guest.isFeatured ? 'Featured' : 'Standard'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(guest)}
                      className="p-1.5 rounded-md hover:bg-[#F4F1EC] text-[#292625]"
                      title="Edit Guest"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteGuestTarget(guest)}
                      className="p-1.5 rounded-md hover:bg-red-100 text-red-700"
                      title="Delete Guest"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create / Edit Modal */}
        {isModalOpen && editingGuest && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-2xl bg-[#F4F1EC] rounded-3xl p-6 md:p-8 border border-[#756B67]/20 shadow-2xl relative my-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-1 text-[#756B67] hover:text-[#292625]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-3xl text-[#292625] font-light mb-6">
                {editingGuest.id ? 'Edit Guest Profile' : 'Add New Guest'}
              </h3>

              <form onSubmit={handleSave} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingGuest.name || ''}
                      onChange={(e) =>
                        setEditingGuest({ ...editingGuest, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                      Category *
                    </label>
                    <select
                      value={editingGuest.category || 'Spirituality'}
                      onChange={(e) =>
                        setEditingGuest({
                          ...editingGuest,
                          category: e.target.value as GuestCategory,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                    Professional Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Spiritual Guru & Mentor"
                    value={editingGuest.roleTitle || ''}
                    onChange={(e) =>
                      setEditingGuest({ ...editingGuest, roleTitle: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                    Short Biography *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingGuest.bio || ''}
                    onChange={(e) =>
                      setEditingGuest({ ...editingGuest, bio: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                    Conversation Details & Deep Dive *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingGuest.fullDescription || ''}
                    onChange={(e) =>
                      setEditingGuest({ ...editingGuest, fullDescription: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                      Portrait Image URL / Path
                    </label>
                    <input
                      type="text"
                      value={editingGuest.portraitUrl || ''}
                      onChange={(e) =>
                        setEditingGuest({ ...editingGuest, portraitUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                      YouTube Video URL
                    </label>
                    <input
                      type="text"
                      value={editingGuest.youtubeUrl || ''}
                      onChange={(e) =>
                        setEditingGuest({ ...editingGuest, youtubeUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                    Episode Title
                  </label>
                  <input
                    type="text"
                    value={editingGuest.episodeTitle || ''}
                    onChange={(e) =>
                      setEditingGuest({ ...editingGuest, episodeTitle: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={Boolean(editingGuest.isFeatured)}
                    onChange={(e) =>
                      setEditingGuest({ ...editingGuest, isFeatured: e.target.checked })
                    }
                    className="rounded text-[#292625] focus:ring-[#C7A45B]"
                  />
                  <label htmlFor="isFeatured" className="text-xs text-[#292625]">
                    Feature on Homepage Guest Showcase
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-[#756B67]/15">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-[#756B67]/20 text-xs font-sans text-[#756B67]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.14em] hover:bg-[#3D3937]"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteGuestTarget && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#F4F1EC] rounded-3xl p-6 border border-red-200 shadow-xl">
              <h3 className="font-serif text-2xl text-red-700">Delete Guest Profile?</h3>
              <p className="font-sans text-xs text-[#756B67] mt-2 leading-relaxed">
                Are you sure you want to remove <strong>{deleteGuestTarget.name}</strong> from the catalog? This will remove their card from the public guests page.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteGuestTarget(null)}
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
      </div>
    </AdminLayout>
  );
}
