'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Edit, Trash2, Check, X, Search, Film, Star, Play } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Episode, GuestCategory } from '@/types';

export default function AdminEpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<Partial<Episode> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Episode | null>(null);

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/episodes');
      const data = await res.json();
      if (data.success) {
        setEpisodes(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const handleOpenCreate = () => {
    setEditingEpisode({
      title: '',
      guestName: '',
      guestCategory: 'Spirituality',
      description: '',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: '/assets/amogh_lila_thumb.jpg',
      duration: '45:00',
      publishDate: new Date().toISOString().split('T')[0],
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ep: Episode) => {
    setEditingEpisode({ ...ep });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEpisode?.title || !editingEpisode?.guestName) return;

    try {
      const url = editingEpisode.id
        ? `/api/episodes/${editingEpisode.id}`
        : '/api/episodes';
      const method = editingEpisode.id ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingEpisode),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        setEditingEpisode(null);
        fetchEpisodes();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/episodes/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setEpisodes((prev) => prev.filter((e) => e.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetFeatured = async (ep: Episode) => {
    try {
      const res = await fetch(`/api/episodes/${ep.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: true }),
      });
      if (res.ok) {
        setEpisodes((prev) =>
          prev.map((e) => ({
            ...e,
            isFeatured: e.id === ep.id,
          }))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredEpisodes = episodes.filter((e) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      e.title.toLowerCase().includes(q) ||
      e.guestName.toLowerCase().includes(q) ||
      e.guestCategory.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#756B67]/15">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#756B67]">
              Media Management
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-[#292625] font-light mt-0.5">
              Episode Broadcasts
            </h1>
          </div>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.14em] font-sans hover:bg-[#3D3937] transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Episode</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search episodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#EDE5DE] border border-[#756B67]/20 text-xs font-sans text-[#292625] focus:outline-none focus:border-[#C7A45B]"
            />
            <Search className="w-4 h-4 text-[#756B67] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <span className="text-xs font-sans text-[#756B67]">
            {filteredEpisodes.length} Episodes
          </span>
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-16 text-center text-xs font-sans text-[#756B67]">
              Loading episodes...
            </div>
          ) : filteredEpisodes.length === 0 ? (
            <div className="col-span-full py-16 text-center text-xs font-sans text-[#756B67]">
              No episodes match your search.
            </div>
          ) : (
            filteredEpisodes.map((ep) => (
              <div
                key={ep.id}
                className={`bg-[#EDE5DE] rounded-2xl p-5 border transition-all flex flex-col justify-between shadow-xs ${
                  ep.isFeatured
                    ? 'border-[#C7A45B] ring-1 ring-[#C7A45B]/40'
                    : 'border-[#756B67]/15'
                }`}
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-[#292625] mb-4">
                    <Image
                      src={ep.thumbnailUrl}
                      alt={ep.title}
                      fill
                      className="object-cover"
                    />
                    {ep.isFeatured && (
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#C7A45B] text-[9px] uppercase tracking-[0.16em] font-sans font-bold text-[#292625]">
                        Homepage Featured
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-[#292625]/80 text-[10px] text-[#F4F1EC]">
                      {ep.duration}
                    </div>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.16em] font-sans text-[#A5843A] font-semibold">
                    {ep.guestCategory}
                  </span>
                  <h3 className="font-serif text-xl text-[#292625] leading-snug mt-0.5 mb-1 line-clamp-2">
                    {ep.title}
                  </h3>
                  <p className="text-xs font-sans text-[#292625] font-medium mb-2">
                    With {ep.guestName}
                  </p>
                  <p className="text-xs font-sans text-[#756B67] line-clamp-2 leading-relaxed mb-4">
                    {ep.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#756B67]/15 flex items-center justify-between">
                  <button
                    onClick={() => handleSetFeatured(ep)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.1em] font-sans transition-colors ${
                      ep.isFeatured
                        ? 'bg-[#C7A45B] text-[#292625] font-bold'
                        : 'bg-[#F4F1EC] text-[#756B67] hover:bg-[#F4F1EC]/80'
                    }`}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    <span>{ep.isFeatured ? 'Featured Spotlight' : 'Set as Featured'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(ep)}
                      className="p-1.5 rounded-md hover:bg-[#F4F1EC] text-[#292625]"
                      title="Edit Episode"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(ep)}
                      className="p-1.5 rounded-md hover:bg-red-100 text-red-700"
                      title="Delete Episode"
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
        {isModalOpen && editingEpisode && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-2xl bg-[#F4F1EC] rounded-3xl p-6 md:p-8 border border-[#756B67]/20 shadow-2xl relative my-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-1 text-[#756B67] hover:text-[#292625]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-3xl text-[#292625] font-light mb-6">
                {editingEpisode.id ? 'Edit Episode' : 'Create New Episode'}
              </h3>

              <form onSubmit={handleSave} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                    Episode Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEpisode.title || ''}
                    onChange={(e) =>
                      setEditingEpisode({ ...editingEpisode, title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                      Featured Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingEpisode.guestName || ''}
                      onChange={(e) =>
                        setEditingEpisode({ ...editingEpisode, guestName: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                      Category *
                    </label>
                    <select
                      value={editingEpisode.guestCategory || 'Spirituality'}
                      onChange={(e) =>
                        setEditingEpisode({
                          ...editingEpisode,
                          guestCategory: e.target.value as GuestCategory,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                    >
                      <option value="Spirituality">Spirituality</option>
                      <option value="Cinema & Television">Cinema & Television</option>
                      <option value="Social Impact">Social Impact</option>
                      <option value="Entrepreneurship">Entrepreneurship</option>
                      <option value="Wellness">Wellness</option>
                      <option value="Culture">Culture</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                    Episode Summary & Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingEpisode.description || ''}
                    onChange={(e) =>
                      setEditingEpisode({ ...editingEpisode, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                      YouTube Video URL *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingEpisode.youtubeUrl || ''}
                      onChange={(e) =>
                        setEditingEpisode({ ...editingEpisode, youtubeUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                      Thumbnail Image URL / Asset
                    </label>
                    <input
                      type="text"
                      value={editingEpisode.thumbnailUrl || ''}
                      onChange={(e) =>
                        setEditingEpisode({ ...editingEpisode, thumbnailUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                      Duration (e.g. 52:14)
                    </label>
                    <input
                      type="text"
                      value={editingEpisode.duration || ''}
                      onChange={(e) =>
                        setEditingEpisode({ ...editingEpisode, duration: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-[0.1em] text-[#292625] mb-1 font-medium">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      value={editingEpisode.publishDate || ''}
                      onChange={(e) =>
                        setEditingEpisode({ ...editingEpisode, publishDate: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#EDE5DE] border border-[#756B67]/20 text-[#292625]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="epIsFeatured"
                    checked={Boolean(editingEpisode.isFeatured)}
                    onChange={(e) =>
                      setEditingEpisode({ ...editingEpisode, isFeatured: e.target.checked })
                    }
                    className="rounded text-[#292625] focus:ring-[#C7A45B]"
                  />
                  <label htmlFor="epIsFeatured" className="text-xs text-[#292625]">
                    Set as Homepage Primary Featured Episode
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
                    Save Episode
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#F4F1EC] rounded-3xl p-6 border border-red-200 shadow-xl">
              <h3 className="font-serif text-2xl text-red-700">Delete Episode?</h3>
              <p className="font-sans text-xs text-[#756B67] mt-2 leading-relaxed">
                Are you sure you want to delete <strong>{deleteTarget.title}</strong>?
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
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
