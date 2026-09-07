'use client';

import React, { useState, useMemo } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Guest, GuestCategory } from '@/types';
import { GuestCard } from '@/components/GuestCard';

const categories: (GuestCategory | 'All')[] = [
  'All',
  'Spirituality',
  'Cinema & Television',
  'Entrepreneurship',
  'Social Impact',
  'Wellness',
  'Culture',
];

interface GuestsClientProps {
  initialGuests: Guest[];
}

export function GuestsClient({ initialGuests }: GuestsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<GuestCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuests = useMemo(() => {
    return initialGuests.filter((guest) => {
      const matchesCategory =
        selectedCategory === 'All' || guest.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        guest.name.toLowerCase().includes(q) ||
        guest.roleTitle.toLowerCase().includes(q) ||
        guest.bio.toLowerCase().includes(q) ||
        (guest.keyTopics && guest.keyTopics.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [initialGuests, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-[#756B67]/15">
        {/* Horizontal Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.14em] font-sans font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#292625] text-[#F4F1EC] shadow-sm'
                  : 'bg-[#EDE5DE]/70 text-[#756B67] hover:bg-[#EDE5DE] hover:text-[#292625]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 flex-shrink-0">
          <input
            type="text"
            placeholder="Search by name or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#EDE5DE]/60 border border-[#756B67]/20 text-xs font-sans text-[#292625] placeholder-[#756B67]/60 focus:outline-none focus:border-[#C7A45B] focus:ring-1 focus:ring-[#C7A45B] transition-colors"
          />
          <Search className="w-4 h-4 text-[#756B67] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Guest Count Indicator */}
      <div className="flex items-center justify-between text-xs font-sans text-[#756B67] mb-8">
        <span>
          Showing <strong>{filteredGuests.length}</strong> {filteredGuests.length === 1 ? 'Guest' : 'Guests'}
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
        </span>
        {(selectedCategory !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-[#D88F91] hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Guests Grid */}
      {filteredGuests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuests.map((guest) => (
            <GuestCard key={guest.id} guest={guest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#EDE5DE]/30 rounded-3xl border border-dashed border-[#756B67]/20 p-8">
          <p className="font-serif text-2xl text-[#756B67]">No guests found matching your criteria.</p>
          <p className="font-sans text-xs text-[#756B67]/80 mt-2">
            Try adjusting your search terms or category selection.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-6 px-6 py-2 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.14em]"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
