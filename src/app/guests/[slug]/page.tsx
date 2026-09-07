import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Share2, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloralFlowerArt, BotanicalBranchArt } from '@/components/FloralArt';
import { VideoPlayer } from '@/components/VideoPlayer';
import { GuestCard } from '@/components/GuestCard';
import { getGuests, getGuestBySlug } from '@/lib/db';

export const revalidate = 0;

export default async function GuestDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guest = await getGuestBySlug(slug);

  if (!guest) {
    notFound();
  }

  const allGuests = await getGuests();
  const relatedGuests = allGuests
    .filter((g) => g.id !== guest.id && (g.category === guest.category || g.isFeatured))
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EC] text-[#292625] relative selection:bg-[#E4D3CC]">
      <Header />

      <main className="flex-grow pt-28 md:pt-36 pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {/* Back to Guests Navigation */}
          <div className="mb-8">
            <Link
              href="/guests"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-sans text-[#756B67] hover:text-[#292625] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Guests Directory</span>
            </Link>
          </div>

          {/* ========================================================
              GUEST PROFILE HEADER: Editorial Split
          ======================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 pb-14 border-b border-[#756B67]/15 relative">
            {/* Portrait with Oval Mask */}
            <div className="md:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[4/5] mask-oval overflow-hidden bg-[#EDE5DE] shadow-xl border-2 border-white">
                <Image
                  src={guest.portraitUrl}
                  alt={guest.name}
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* Decorative line-art */}
              <div className="absolute -top-8 -right-6 pointer-events-none">
                <FloralFlowerArt className="w-40 h-40 text-[#D9AAA6] opacity-40" />
              </div>
            </div>

            {/* Information */}
            <div className="md:col-span-7 flex flex-col space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-[#E4D3CC] text-[10px] uppercase tracking-[0.22em] font-sans font-medium text-[#292625]">
                  {guest.category}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] font-sans text-[#756B67]">
                  Antaara Unplugged
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#292625] font-light leading-tight">
                {guest.name}
              </h1>

              <p className="text-xs uppercase tracking-[0.18em] font-sans text-[#A5843A] font-semibold">
                {guest.roleTitle}
              </p>

              <p className="font-sans text-xs md:text-sm text-[#756B67] leading-relaxed pt-1">
                {guest.bio}
              </p>

              <div className="p-5 rounded-2xl bg-[#EDE5DE]/50 border border-[#756B67]/10 font-sans text-xs md:text-sm text-[#292625] leading-relaxed">
                <p className="font-serif italic text-base text-[#756B67] mb-1">
                  Conversation Focus:
                </p>
                {guest.fullDescription}
              </div>

              {/* Topics */}
              {guest.keyTopics && guest.keyTopics.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {guest.keyTopics.map((topic, i) => (
                    <span
                      key={i}
                      className="text-[10px] tracking-[0.06em] uppercase px-3 py-1 rounded-full bg-[#EDE5DE] text-[#756B67] font-sans"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ========================================================
              WATCH THE CONVERSATION: Dedicated Video Section
          ======================================================== */}
          <section className="mb-20">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#756B67]">
                Video Stream
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#292625] font-light mt-1">
                Watch the Conversation
              </h2>
              <div className="w-12 h-[1px] bg-[#C7A45B] mx-auto mt-3" />
            </div>

            {/* YouTube Embed Player */}
            <div className="max-w-4xl mx-auto">
              <VideoPlayer
                youtubeUrl={guest.youtubeUrl}
                title={`${guest.episodeTitle} - ${guest.name}`}
                thumbnailUrl={guest.portraitUrl}
              />

              {/* Episode Metadata Below Video */}
              <div className="mt-8 p-6 md:p-8 bg-[#EDE5DE]/60 rounded-2xl border border-[#756B67]/15">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#756B67]/10">
                  <div>
                    <h3 className="font-serif text-2xl text-[#292625] font-normal">
                      {guest.episodeTitle}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.14em] font-sans text-[#756B67] mt-1">
                      Featuring {guest.name} • Hosted by Kirti Jaiswal Rajpal
                    </p>
                  </div>

                  <a
                    href={guest.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.15em] hover:bg-[#3D3937] transition-all self-start md:self-auto flex-shrink-0"
                  >
                    <span>Open in YouTube</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="pt-4 font-sans text-xs md:text-sm text-[#756B67] leading-relaxed">
                  <p>{guest.fullDescription}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              RELATED CONVERSATIONS
          ======================================================== */}
          {relatedGuests.length > 0 && (
            <section className="pt-12 border-t border-[#756B67]/15">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#756B67]">
                    More Dialogues
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#292625] font-light">
                    Related Conversations
                  </h3>
                </div>
                <Link
                  href="/guests"
                  className="text-xs uppercase tracking-[0.14em] font-sans text-[#292625] hover:text-[#C7A45B] underline"
                >
                  View All
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedGuests.map((relGuest) => (
                  <GuestCard key={relGuest.id} guest={relGuest} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
