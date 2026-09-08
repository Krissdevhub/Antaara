import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Compass, Heart, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloralFlowerArt, BotanicalBranchArt, OrganicCurveBackground } from '@/components/FloralArt';
import { getSettings } from '@/lib/db';

export const revalidate = 0;

export default async function AboutPage() {
  const settings = await getSettings();

  const themes = [
    'Leadership',
    'Creativity',
    'Spirituality',
    'Cinema & Television',
    'Entrepreneurship',
    'Social Impact',
    'Wellness & Fitness',
    'Culture & Poetry',
    'Personal Journeys',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EC] text-[#292625] relative selection:bg-[#E4D3CC]">
      <Header />

      <main className="flex-grow pt-24 md:pt-32">
        {/* ========================================================
            EDITORIAL HEADER
        ======================================================== */}
        <section className="px-6 md:px-10 py-12 md:py-16 relative overflow-hidden">
          <OrganicCurveBackground />

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <span className="text-[10px] uppercase tracking-[0.32em] font-sans font-semibold text-[#756B67]">
              The Story Behind The Conversations
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#292625] font-light mt-3 mb-4 leading-tight">
              More Than A Podcast. <br />
              <span className="italic font-normal">A Space for Meaningful Stories.</span>
            </h1>
            <p className="font-sans text-xs md:text-sm text-[#756B67] max-w-2xl mx-auto leading-relaxed">
              Antaara Unplugged brings together conversations with pioneering minds from diverse industries, uncovering the quiet discipline, spiritual depth, and lived truth behind their public achievements.
            </p>
            <div className="w-16 h-[1px] bg-[#C7A45B] mx-auto mt-8" />
          </div>
        </section>

        {/* ========================================================
            OUR PURPOSE: Editorial Split Layout
        ======================================================== */}
        <section className="px-6 md:px-10 py-16 bg-[#EDE5DE]/50 border-t border-b border-[#756B67]/10 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Purpose Text */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#D88F91]">
                Our Purpose
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#292625] font-light leading-snug">
                Unhurried Dialogues in an <br />
                <span className="italic">Overstimulated World.</span>
              </h2>
              <p className="font-sans text-xs md:text-sm text-[#756B67] leading-relaxed">
                In a media landscape driven by soundbites, clickbait, and algorithmic noise, Antaara Unplugged offers an intentional counter-rhythm. We believe the most transformative ideas cannot be distilled into 30-second clips; they require patience, safety, and deep active listening.
              </p>
              <p className="font-sans text-xs md:text-sm text-[#756B67] leading-relaxed">
                Our purpose is to serve as a bridge—connecting ancient Vedic wisdom with modern challenges, high-pressure leadership with holistic stillness, and celebrated artistic craft with inner vulnerability.
              </p>

              <div className="pt-2">
                <blockquote className="font-serif italic text-lg text-[#292625] border-l-2 border-[#C7A45B] pl-4 py-1">
                  “When we listen with grace, every human life becomes a sacred manuscript.”
                </blockquote>
              </div>
            </div>

            {/* Right: Large Editorial Composition with Oval Masks */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] mask-editorial-1 overflow-hidden shadow-xl bg-[#F4F1EC]">
                <Image
                  src="/assets/kirti_orange_chair.jpg"
                  alt="Kirti Jaiswal Rajpal"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 pointer-events-none">
                <FloralFlowerArt className="w-48 h-48 text-[#D9AAA6] opacity-40" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            OUR CONVERSATIONS: Thematic Scope
        ======================================================== */}
        <section className="px-6 md:px-10 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#756B67]">
                What We Explore
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#292625] font-light mt-1">
                Our Conversations
              </h2>
              <p className="font-sans text-xs md:text-sm text-[#756B67] mt-2">
                Antaara Unplugged curates guests whose journeys illuminate distinct pillars of the human experience.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
              {themes.map((theme, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#EDE5DE]/40 border border-[#756B67]/15 flex items-center gap-3 hover:border-[#C7A45B]/50 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#C7A45B]" />
                  <span className="font-serif text-lg md:text-xl text-[#292625]">
                    {theme}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            THE HOST SECTION: Kirti Jaiswal Rajpal
        ======================================================== */}
        <section className="px-6 md:px-10 py-20 bg-[#EDE5DE] border-t border-[#756B67]/15 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Host Portrait Collage */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              <div className="relative w-full max-w-[360px] aspect-[3.6/4.6] mask-oval overflow-hidden bg-[#F4F1EC] shadow-2xl border-2 border-white">
                <Image
                  src={settings.hostPortraitUrl}
                  alt={settings.hostName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Memento / Honor thumbnail */}
              <div className="relative -mt-12 mr-auto ml-4 w-36 sm:w-44 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white shadow-xl">
                <Image
                  src="/assets/kirti_award_sheraton.jpg"
                  alt="Honor Recognition"
                  fill
                  className="object-cover object-[center_10%]"
                />
              </div>
            </div>

            {/* Right: Host Bio & Heritage */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C7A45B]" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#756B67]">
                  The Host
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-[#292625] font-light leading-tight">
                {settings.hostName}
              </h2>
              <p className="text-xs uppercase tracking-[0.18em] font-sans text-[#A5843A] font-semibold -mt-3">
                {settings.hostRole}
              </p>

              <div className="font-sans text-xs md:text-sm text-[#756B67] leading-relaxed space-y-4">
                <p>
                  {settings.hostBio}
                </p>
                <p>
                  With an accomplished portfolio spanning luxury hospitality (including projects like <em>Sarovar Portico</em>), commercial wellness sanctuaries, and high-end residential interiors, Kirti approaches conversations the same way she approaches architectural design: by creating an atmosphere of safety, harmony, and elevated contemplation.
                </p>
                <p>
                  Her dedication has earned her recognition across Madhya Pradesh and national forums, with honors conferred by prominent dignitaries including Hon. Minister Raj Vardhan Singh ji, MP Shri Tulsi Silawat ji, and Mr. Shankar Lalwani.
                </p>
              </div>

              {/* Studio connect teaser */}
              <div className="pt-4 border-t border-[#756B67]/15 flex flex-wrap items-center gap-4">
                <Link
                  href="/guests"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.15em] hover:bg-[#3D3937] transition-all"
                >
                  <span>Explore Her Guest Conversations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-sans text-[#756B67] hover:text-[#292625] underline underline-offset-4"
                >
                  Connect Directly With Kirti
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
