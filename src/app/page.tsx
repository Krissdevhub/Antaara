import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, Play, Sparkles, Compass, HeartHandshake, Film, Feather, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloralFlowerArt, BotanicalBranchArt, OrganicCurveBackground } from '@/components/FloralArt';
import { GuestCard } from '@/components/GuestCard';
import { VideoPlayer } from '@/components/VideoPlayer';
import { getGuests, getEpisodes, getFeaturedEpisode } from '@/lib/db';

export const revalidate = 0; // Dynamic rendering for instant admin updates

export default async function HomePage() {
  const guests = await getGuests();
  const episodes = await getEpisodes();
  const featuredEpisode = await getFeaturedEpisode();

  const themes = [
    {
      title: 'Spirituality & Mind',
      desc: 'Inner architecture, Vedic wisdom, and mindfulness for the modern consciousness.',
      icon: Compass,
      tag: 'Ancient Wisdom',
    },
    {
      title: 'Cinema & Performance',
      desc: 'Craftsmanship, authentic storytelling, and the discipline of 30+ years in entertainment.',
      icon: Film,
      tag: 'Creative Craft',
    },
    {
      title: 'Social Transformation',
      desc: 'Grassroots education, women leadership, and human welfare creating lasting equity.',
      icon: HeartHandshake,
      tag: 'Impact',
    },
    {
      title: 'Culture & Poetry',
      desc: 'Spoken word, vulnerability as artistic power, and celebrating regional heritage.',
      icon: Feather,
      tag: 'Artistic Voice',
    },
    {
      title: 'Leadership & Resilience',
      desc: 'High-stakes public service, digital security, and balance in a hyperconnected world.',
      icon: ShieldCheck,
      tag: 'Public Service',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EC] text-[#292625] relative selection:bg-[#E4D3CC]">
      <Header />

      <main className="flex-grow pt-24 md:pt-28">
        {/* ========================================================
            HERO SECTION: Editorial Split Layout
        ======================================================== */}
        <section className="relative overflow-hidden px-6 md:px-10 py-12 md:py-20">
          <OrganicCurveBackground />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
            {/* Left: Editorial Typography */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#C7A45B]" />
                <span className="text-[11px] uppercase tracking-[0.28em] font-sans font-semibold text-[#756B67]">
                  Antaara Unplugged
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.05] tracking-tight text-[#292625]">
                Conversations That <br />
                <span className="italic font-light text-[#756B67]">Stay With You.</span>
              </h1>

              <p className="font-sans text-sm md:text-base text-[#756B67] leading-relaxed max-w-xl font-normal">
                Stories, perspectives and wisdom from people who inspire, create and make a difference across spirituality, cinema, culture, social impact, and conscious living.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/episodes"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.16em] font-sans font-medium hover:bg-[#3D3937] transition-all duration-300 shadow-sm group"
                >
                  <span>Explore Episodes</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/guests"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-[#756B67]/30 bg-transparent text-[#292625] text-xs uppercase tracking-[0.16em] font-sans font-medium hover:bg-[#EDE5DE] transition-all duration-300"
                >
                  <span>Meet Our Guests</span>
                </Link>
              </div>

              {/* Decorative Handwritten Script Accent */}
              <div className="pt-4 flex items-center gap-3">
                <span className="font-script text-2xl md:text-3xl text-[#D88F91]">
                  Stories • People • Perspectives
                </span>
              </div>
            </div>

            {/* Right: Editorial Organic Portrait Composition */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              {/* Floral background decoration */}
              <div className="absolute -top-12 -right-10 pointer-events-none">
                <FloralFlowerArt className="w-72 h-72 text-[#D9AAA6] opacity-35" />
              </div>
              <div className="absolute -bottom-8 -left-8 pointer-events-none">
                <BotanicalBranchArt className="w-52 h-52 text-[#C7A45B] opacity-25" />
              </div>

              {/* Organic Oval Portrait Mask */}
              <div className="relative w-full max-w-[380px] aspect-[3.8/4.8] p-2">
                {/* Thin gold accent outline offset */}
                <div className="absolute inset-0 mask-oval border border-[#C7A45B]/40 transform rotate-2 pointer-events-none" />

                <div className="relative w-full h-full mask-oval overflow-hidden bg-[#EDE5DE] shadow-xl border-2 border-[#F4F1EC]">
                  <Image
                    src="/assets/kirti_hero.jpg"
                    alt="Kirti Jaiswal Rajpal - Founder Antaara Studio & Host"
                    fill
                    priority
                    className="object-cover object-center transform scale-102 hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle bottom vignette */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#292625]/60 to-transparent" />
                  
                  {/* Host badge */}
                  <div className="absolute bottom-5 left-0 right-0 text-center text-[#F4F1EC] z-10 px-4">
                    <p className="font-serif text-lg tracking-wide">Kirti Jaiswal Rajpal</p>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#EDE5DE]/90 font-sans">
                      Host & Founder, Antaara Studio
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Understated Editorial Divider */}
          <div className="max-w-7xl mx-auto mt-16 pt-6 border-b border-[#756B67]/15" />
        </section>

        {/* ========================================================
            FEATURED PODCAST SECTION: Headline Episode
        ======================================================== */}
        <section className="px-6 md:px-10 py-16 md:py-24 bg-[#EDE5DE]/60 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Eyebrow */}
            <div className="flex flex-col items-center text-center mb-12">
              <span className="text-[10px] uppercase tracking-[0.32em] text-[#756B67] font-sans font-semibold">
                A Podcast Series
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#292625] font-light mt-1">
                Antaara Unplugged
              </h2>
              <div className="w-12 h-[1px] bg-[#C7A45B] mt-4" />
            </div>

            {/* Split Featured Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#F4F1EC] rounded-3xl p-6 md:p-10 border border-[#756B67]/15 shadow-sm">
              {/* Left/Main Side: Video Player Embed */}
              <div className="lg:col-span-7">
                <VideoPlayer
                  youtubeUrl={featuredEpisode.youtubeUrl}
                  title={featuredEpisode.title}
                  thumbnailUrl={featuredEpisode.thumbnailUrl}
                />
              </div>

              {/* Right Side: Episode Details */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#E4D3CC] text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#292625]">
                    Featured Episode
                  </span>
                  <span className="text-xs uppercase tracking-[0.15em] font-sans text-[#756B67]">
                    {featuredEpisode.duration || '52 mins'}
                  </span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-[#292625] font-normal leading-snug">
                  {featuredEpisode.title}
                </h3>

                <div className="py-1">
                  <p className="font-serif italic text-lg text-[#A5843A]">
                    With {featuredEpisode.guestName}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.14em] font-sans text-[#756B67]">
                    {featuredEpisode.guestCategory}
                  </p>
                </div>

                <p className="font-sans text-xs md:text-sm text-[#756B67] leading-relaxed">
                  {featuredEpisode.description}
                </p>

                {/* Topics */}
                {featuredEpisode.keyTopics && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {featuredEpisode.keyTopics.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] tracking-[0.06em] px-2.5 py-1 rounded-sm bg-[#EDE5DE] text-[#756B67] font-sans"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-4 flex items-center gap-4">
                  <a
                    href={featuredEpisode.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.15em] font-sans font-medium hover:bg-[#3D3937] transition-all"
                  >
                    <span>Watch on YouTube</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href={`/guests/${guests.find((g) => g.id === featuredEpisode.guestId)?.slug || 'shri-amogh-lila-das-ji'}`}
                    className="text-xs uppercase tracking-[0.14em] font-sans text-[#756B67] hover:text-[#292625] underline underline-offset-4"
                  >
                    View Guest Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            ABOUT ANTAARA UNPLUGGED: Philosophy & Heritage
        ======================================================== */}
        <section className="px-6 md:px-10 py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Collage from PDF */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/assets/kirti_orange_chair.jpg"
                    alt="Kirti Jaiswal Rajpal"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                    <Image
                      src="/assets/manish_award.jpg"
                      alt="Antaara Memento with Manish Wadhwa"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src="/assets/kirti_award_sheraton.jpg"
                      alt="Kirti Jaiswal Rajpal Award"
                      fill
                      className="object-cover object-[center_12%]"
                    />
                  </div>
                </div>
              </div>

              {/* Decorative Seal Overlay */}
              <div className="absolute -bottom-6 -right-4 w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-xl">
                <Image
                  src="/assets/antaara_logo_seal.jpg"
                  alt="Seal"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-6 flex flex-col space-y-5">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#756B67]">
                The Vision
              </span>

              <h2 className="font-serif text-3xl md:text-5xl text-[#292625] font-light leading-tight">
                Where Design, Spirit & <br />
                <span className="italic">Storytelling Converge.</span>
              </h2>

              <p className="font-sans text-xs md:text-sm text-[#756B67] leading-relaxed">
                Founded by renowned interior designer <strong>Kirti Jaiswal Rajpal</strong> (Founder of Antaara Designing Studio, Indore), <em>Antaara Unplugged</em> was created from the understanding that spaces are not merely physical—they are experiential reflections of human thought, purpose, and consciousness.
              </p>

              <p className="font-sans text-xs md:text-sm text-[#756B67] leading-relaxed">
                Through candid, unhurried dialogues with spiritual masters, cinema icons, social activists, and cultural visionaries, this platform explores the deeper inner architecture behind meaningful human lives.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-sans font-medium text-[#292625] hover:text-[#C7A45B] transition-colors"
                >
                  <span>Read The Full Story & Host Bio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            MEET OUR GUESTS: Curated Showcase
        ======================================================== */}
        <section className="px-6 md:px-10 py-20 bg-[#EDE5DE]/40 border-t border-b border-[#756B67]/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#756B67]">
                  Voices of Antaara
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-[#292625] font-light mt-1">
                  Meet Our Esteemed Guests
                </h2>
                <p className="font-sans text-xs md:text-sm text-[#756B67] mt-2 max-w-xl">
                  Featuring distinguished personalities from spirituality, cinema, public service, social impact, and culture.
                </p>
              </div>

              <Link
                href="/guests"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#292625]/30 text-xs uppercase tracking-[0.15em] font-sans hover:bg-[#F4F1EC] transition-all self-start md:self-auto"
              >
                <span>View All 14 Guests</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Featured 6 Guests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guests.slice(0, 6).map((guest) => (
                <GuestCard key={guest.id} guest={guest} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            CONVERSATION THEMES: Editorial Cards
        ======================================================== */}
        <section className="px-6 md:px-10 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#756B67]">
                Domains of Exploration
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#292625] font-light mt-1">
                Themes We Explore
              </h2>
              <p className="font-sans text-xs md:text-sm text-[#756B67] mt-2">
                Every dialogue is crafted around genuine substance, timeless principles, and real human vulnerability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((t, idx) => {
                const IconComponent = t.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-2xl bg-[#EDE5DE]/50 border border-[#756B67]/15 hover:border-[#C7A45B]/40 transition-all duration-300 flex flex-col"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F4F1EC] border border-[#756B67]/15 flex items-center justify-center text-[#A5843A] mb-5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#D88F91] font-semibold mb-1">
                      {t.tag}
                    </span>
                    <h3 className="font-serif text-2xl text-[#292625] mb-2 font-normal">
                      {t.title}
                    </h3>
                    <p className="font-sans text-xs text-[#756B67] leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            LATEST EPISODES SECTION
        ======================================================== */}
        <section className="px-6 md:px-10 py-20 bg-[#EDE5DE]/40 border-t border-[#756B67]/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#756B67]">
                  Archive & Dialogue
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-[#292625] font-light mt-1">
                  Recent Episodes
                </h2>
              </div>
              <Link
                href="/episodes"
                className="text-xs uppercase tracking-[0.14em] font-sans text-[#292625] hover:text-[#C7A45B] underline underline-offset-4"
              >
                Browse All Episodes
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {episodes.slice(0, 3).map((ep) => (
                <div
                  key={ep.id}
                  className="flex flex-col bg-[#F4F1EC] rounded-2xl border border-[#756B67]/15 overflow-hidden group hover:border-[#C7A45B]/40 transition-all duration-300"
                >
                  <div className="relative aspect-video w-full bg-[#EDE5DE]">
                    <Image
                      src={ep.thumbnailUrl}
                      alt={ep.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#292625]/80 backdrop-blur-xs text-[10px] font-sans text-[#F4F1EC]">
                      {ep.duration}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-sans text-[#A5843A] font-semibold mb-1">
                      {ep.guestCategory}
                    </span>
                    <h3 className="font-serif text-xl text-[#292625] mb-2 leading-snug group-hover:text-[#A5843A] transition-colors line-clamp-2">
                      {ep.title}
                    </h3>
                    <p className="font-sans text-xs text-[#756B67] line-clamp-2 mb-4 leading-relaxed">
                      {ep.description}
                    </p>

                    <div className="mt-auto pt-3 border-t border-[#756B67]/10 flex items-center justify-between">
                      <span className="text-[11px] font-sans text-[#756B67]/70">
                        {ep.publishDate}
                      </span>
                      <a
                        href={ep.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] font-sans font-medium text-[#292625] hover:text-[#C7A45B]"
                      >
                        <span>Watch</span>
                        <Play className="w-3 h-3 fill-current" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            COLLABORATION & CTA TEASER
        ======================================================== */}
        <section className="px-6 md:px-10 py-24 relative overflow-hidden bg-[#F4F1EC]">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="font-script text-3xl md:text-4xl text-[#D88F91] block mb-2">
              Join the Conversation
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#292625] font-light leading-tight mb-6">
              Have an Inspiring Story or <br />
              <span className="italic">Partnership in Mind?</span>
            </h2>
            <p className="font-sans text-xs md:text-sm text-[#756B67] leading-relaxed max-w-xl mx-auto mb-8">
              We welcome dialogue proposals, guest nominations, brand partnerships, and cultural sponsorships that align with our philosophy of meaningful substance.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.16em] font-sans font-medium hover:bg-[#3D3937] transition-all"
              >
                <span>Get In Touch With Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#756B67]/30 text-xs uppercase tracking-[0.16em] font-sans font-medium text-[#292625] hover:bg-[#EDE5DE] transition-all"
              >
                <span>Learn More About Us</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
