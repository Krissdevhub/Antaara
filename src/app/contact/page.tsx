import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '@/components/Icons';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { FloralFlowerArt, BotanicalBranchArt, OrganicCurveBackground } from '@/components/FloralArt';
import { getSettings } from '@/lib/db';

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EC] text-[#292625] relative selection:bg-[#E4D3CC]">
      <Header />

      <main className="flex-grow pt-24 md:pt-32 pb-24">
        {/* Editorial Heading */}
        <section className="px-6 md:px-10 py-12 md:py-16 relative overflow-hidden text-center">
          <OrganicCurveBackground />

          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-[10px] uppercase tracking-[0.32em] font-sans font-semibold text-[#756B67]">
              Collaborations & Inquiries
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#292625] font-light mt-2 mb-4">
              Let&apos;s Connect
            </h1>
            <p className="font-sans text-xs md:text-sm text-[#756B67] max-w-xl mx-auto leading-relaxed">
              For collaborations, conversations, partnerships, and enquiries, get in touch with our production and editorial team.
            </p>
            <div className="w-16 h-[1px] bg-[#C7A45B] mx-auto mt-6" />
          </div>
        </section>

        {/* Contact Split Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right: Studio Details & Information */}
            <div className="lg:col-span-5 flex flex-col space-y-8">
              {/* Studio Card */}
              <div className="p-8 rounded-3xl bg-[#EDE5DE] border border-[#756B67]/15">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#C7A45B]/40 shadow-xs">
                    <Image
                      src="/assets/antaara_logo_seal.jpg"
                      alt="Antaara Seal"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#292625]">
                      Antaara Designing Studio
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#756B67]">
                      Home of Antaara Unplugged
                    </p>
                  </div>
                </div>

                <div className="space-y-4 font-sans text-xs text-[#756B67] leading-relaxed">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#A5843A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#292625] block">Location</strong>
                      <span>{settings.contactAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#A5843A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#292625] block">Telephone</strong>
                      <a href={`tel:${settings.contactPhone}`} className="hover:underline text-[#292625]">
                        {settings.contactPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#A5843A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#292625] block">Electronic Mail</strong>
                      <a href={`mailto:${settings.contactEmail}`} className="hover:underline text-[#292625]">
                        {settings.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#756B67]/15">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#292625] font-semibold mb-3">
                    Follow Our Channels
                  </h4>
                  <div className="flex flex-col space-y-2 text-xs font-sans text-[#756B67]">
                    <a
                      href="https://instagram.com/AntaaraStudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#292625] flex items-center gap-2"
                    >
                      <InstagramIcon className="w-3.5 h-3.5 text-[#D88F91]" />
                      <span>@AntaaraStudio (Interior Design)</span>
                    </a>
                    <a
                      href="https://instagram.com/AntaaraUnpluggedofficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#292625] flex items-center gap-2"
                    >
                      <InstagramIcon className="w-3.5 h-3.5 text-[#D88F91]" />
                      <span>@AntaaraUnpluggedofficial (Podcast)</span>
                    </a>
                    <a
                      href="https://youtube.com/@AntaaraUnplugged"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#292625] flex items-center gap-2"
                    >
                      <YoutubeIcon className="w-3.5 h-3.5 text-[#D88F91]" />
                      <span>YouTube: Antaara Unplugged</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Editorial Quote Card */}
              <div className="p-8 rounded-3xl bg-[#F4F1EC] border border-[#C7A45B]/30 relative overflow-hidden">
                <FloralFlowerArt className="absolute -bottom-8 -right-8 w-36 h-36 text-[#D9AAA6] opacity-30 pointer-events-none" />
                <p className="font-serif italic text-lg text-[#292625] leading-snug relative z-10">
                  “Every thoughtful guest, every brand collaboration, and every community connection begins with a single respectful greeting.”
                </p>
                <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#756B67] mt-3 relative z-10">
                  — Kirti Jaiswal Rajpal
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
