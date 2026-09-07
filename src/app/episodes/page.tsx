import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OrganicCurveBackground } from '@/components/FloralArt';
import { getEpisodes } from '@/lib/db';

export const revalidate = 0;

export default async function EpisodesPage() {
  const episodes = await getEpisodes();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EC] text-[#292625] relative selection:bg-[#E4D3CC]">
      <Header />

      <main className="flex-grow pt-24 md:pt-32 pb-24">
        {/* Editorial Heading */}
        <section className="px-6 md:px-10 py-12 md:py-16 relative overflow-hidden text-center">
          <OrganicCurveBackground />

          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-[10px] uppercase tracking-[0.32em] font-sans font-semibold text-[#756B67]">
              Audio & Video Library
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#292625] font-light mt-2 mb-4">
              All Podcast Episodes
            </h1>
            <p className="font-sans text-xs md:text-sm text-[#756B67] max-w-xl mx-auto leading-relaxed">
              Immerse yourself in our complete catalog of conversations exploring timeless wisdom, creative discipline, and personal transformation.
            </p>
            <div className="w-16 h-[1px] bg-[#C7A45B] mx-auto mt-6" />
          </div>
        </section>

        {/* Episodes Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((ep) => (
              <div
                key={ep.id}
                className="flex flex-col bg-[#EDE5DE]/50 rounded-2xl border border-[#756B67]/15 overflow-hidden group hover:border-[#C7A45B]/50 transition-all duration-300 hover:shadow-md"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full bg-[#292625] overflow-hidden">
                  <Image
                    src={ep.thumbnailUrl}
                    alt={ep.title}
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#292625]/80 backdrop-blur-xs text-[10px] font-sans text-[#F4F1EC]">
                    {ep.duration || '45m'}
                  </div>
                  {ep.isFeatured && (
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#C7A45B] text-[9px] uppercase tracking-[0.16em] font-sans font-semibold text-[#292625]">
                      Featured
                    </div>
                  )}

                  {/* Play Overlay */}
                  <a
                    href={ep.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Play ${ep.title}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#F4F1EC] text-[#292625] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </a>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-sans text-[#A5843A] font-semibold">
                      {ep.guestCategory}
                    </span>
                    <span className="text-[11px] font-sans text-[#756B67]/70">
                      {ep.publishDate}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#292625] mb-2 leading-snug font-normal group-hover:text-[#A5843A] transition-colors line-clamp-2">
                    {ep.title}
                  </h3>

                  <p className="text-xs uppercase tracking-[0.12em] font-sans text-[#756B67] font-medium mb-3">
                    With {ep.guestName}
                  </p>

                  <p className="font-sans text-xs text-[#756B67] line-clamp-2 mb-4 leading-relaxed flex-grow">
                    {ep.description}
                  </p>

                  {ep.keyTopics && ep.keyTopics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {ep.keyTopics.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] tracking-[0.05em] px-2 py-0.5 rounded-sm bg-[#F4F1EC] text-[#756B67] font-sans border border-[#756B67]/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-3 border-t border-[#756B67]/10 flex items-center justify-between">
                    <a
                      href={ep.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-sans font-medium text-[#292625] hover:text-[#C7A45B]"
                    >
                      <span>Watch Video</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
