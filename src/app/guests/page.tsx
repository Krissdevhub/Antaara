import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OrganicCurveBackground } from '@/components/FloralArt';
import { getGuests } from '@/lib/db';
import { GuestsClient } from './GuestsClient';

export const revalidate = 0;

export default async function GuestsPage() {
  const guests = await getGuests();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EC] text-[#292625] relative selection:bg-[#E4D3CC]">
      <Header />

      <main className="flex-grow pt-24 md:pt-32">
        {/* Editorial Heading */}
        <section className="px-6 md:px-10 py-12 md:py-16 relative overflow-hidden text-center">
          <OrganicCurveBackground />

          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-[10px] uppercase tracking-[0.32em] font-sans font-semibold text-[#756B67]">
              Antaara Unplugged Directory
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#292625] font-light mt-2 mb-4">
              Our Esteemed Guests
            </h1>
            <p className="font-sans text-xs md:text-sm text-[#756B67] max-w-xl mx-auto leading-relaxed">
              Explore insightful dialogues with gurus, artists, visionaries, public servants, and change-makers from across India.
            </p>
            <div className="w-16 h-[1px] bg-[#C7A45B] mx-auto mt-6" />
          </div>
        </section>

        {/* Interactive Guests Directory */}
        <GuestsClient initialGuests={guests} />
      </main>

      <Footer />
    </div>
  );
}
