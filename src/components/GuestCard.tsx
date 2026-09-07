import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ArrowRight } from 'lucide-react';
import { Guest } from '@/types';

interface GuestCardProps {
  guest: Guest;
  featured?: boolean;
}

export function GuestCard({ guest, featured = false }: GuestCardProps) {
  return (
    <div className="group relative flex flex-col bg-[#F4F1EC] rounded-2xl border border-[#756B67]/15 overflow-hidden p-6 md:p-7 hover:border-[#C7A45B]/50 transition-all duration-400 hover:shadow-md hover:-translate-y-0.5">
      {/* Editorial Portrait Container with organic oval shape */}
      <div className="relative w-full aspect-[4/4.5] overflow-hidden rounded-2xl bg-[#EDE5DE] mb-6">
        <Image
          src={guest.portraitUrl}
          alt={guest.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
        />

        {/* Category Pill Over Image */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F4F1EC]/90 backdrop-blur-xs text-[10px] tracking-[0.2em] uppercase font-sans font-medium text-[#292625] border border-[#756B67]/15">
            {guest.category}
          </span>
        </div>

        {/* Hover Quick-Play Icon Overlay */}
        <div className="absolute inset-0 bg-[#292625]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#F4F1EC] text-[#292625] flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Guest Details */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-serif text-2xl md:text-[26px] text-[#292625] font-normal leading-tight group-hover:text-[#A5843A] transition-colors">
          {guest.name}
        </h3>

        <p className="text-[11px] uppercase tracking-[0.16em] text-[#756B67] font-sans font-semibold mt-1 mb-3">
          {guest.roleTitle}
        </p>

        <p className="text-xs leading-relaxed text-[#756B67] font-sans line-clamp-2 mb-4 flex-grow">
          {guest.bio}
        </p>

        {/* Key Topics Badges */}
        {guest.keyTopics && guest.keyTopics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {guest.keyTopics.slice(0, 3).map((topic, i) => (
              <span
                key={i}
                className="text-[10px] tracking-[0.05em] px-2 py-0.5 rounded-sm bg-[#EDE5DE] text-[#756B67] font-sans"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#756B67]/10 flex items-center justify-between mt-auto">
          <Link
            href={`/guests/${guest.slug}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-sans font-medium text-[#292625] hover:text-[#C7A45B] transition-colors"
          >
            <span>Watch Conversation</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <span className="text-[11px] font-serif italic text-[#D88F91]">
            Episode Series
          </span>
        </div>
      </div>
    </div>
  );
}
