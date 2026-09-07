import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#EDE5DE] border-t border-[#756B67]/15 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#756B67]/15">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#C7A45B]/40">
                <Image
                  src="/assets/antaara_logo_seal.jpg"
                  alt="Antaara"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.22em] text-xl text-[#292625] uppercase font-light">
                  Antaara
                </span>
                <span className="text-[10px] tracking-[0.35em] text-[#756B67] uppercase font-sans font-medium">
                  Unplugged
                </span>
              </div>
            </div>

            <p className="font-serif italic text-lg text-[#756B67] pt-2">
              “Thoughtful conversations. Diverse voices. Stories worth hearing.”
            </p>

            <p className="font-sans text-xs leading-relaxed text-[#756B67]/80 max-w-sm">
              A curated podcast hosted by Kirti Jaiswal Rajpal, bringing authentic perspectives from spirituality, cinema, entrepreneurship, culture, and wellness.
            </p>

            <div className="pt-2">
              <span className="font-script text-2xl text-[#D88F91]">
                Stories • People • Perspectives
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#292625] font-semibold mb-2">
              Explore
            </h4>
            <Link
              href="/"
              className="text-xs tracking-[0.12em] uppercase font-sans text-[#756B67] hover:text-[#292625] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-xs tracking-[0.12em] uppercase font-sans text-[#756B67] hover:text-[#292625] transition-colors"
            >
              The Story & Host
            </Link>
            <Link
              href="/guests"
              className="text-xs tracking-[0.12em] uppercase font-sans text-[#756B67] hover:text-[#292625] transition-colors"
            >
              Our Guests
            </Link>
            <Link
              href="/episodes"
              className="text-xs tracking-[0.12em] uppercase font-sans text-[#756B67] hover:text-[#292625] transition-colors"
            >
              Watch Episodes
            </Link>
            <Link
              href="/contact"
              className="text-xs tracking-[0.12em] uppercase font-sans text-[#756B67] hover:text-[#292625] transition-colors"
            >
              Connect & Collaborate
            </Link>
            <Link
              href="/admin"
              className="text-xs tracking-[0.12em] uppercase font-sans text-[#756B67]/60 hover:text-[#292625] transition-colors pt-2"
            >
              Admin Portal →
            </Link>
          </div>

          {/* Studio Details from Reference */}
          <div className="md:col-span-4 flex flex-col space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#292625] font-semibold mb-2">
              Studio & Connect
            </h4>
            <div className="text-xs font-sans text-[#756B67] leading-relaxed space-y-1.5">
              <p>
                <strong className="text-[#292625] font-medium">Studio:</strong> Antaraa Designing Studio
              </p>
              <p>
                <strong className="text-[#292625] font-medium">Phone:</strong> +91 9826766666
              </p>
              <p>
                <strong className="text-[#292625] font-medium">Email:</strong> antaaradesignstudio@gmail.com
              </p>
              <p>
                <strong className="text-[#292625] font-medium">Location:</strong> Indore, Madhya Pradesh, India
              </p>
            </div>

            <div className="pt-3 flex flex-wrap gap-3">
              <a
                href="https://instagram.com/AntaaraUnpluggedofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#756B67]/20 text-[11px] tracking-[0.12em] uppercase font-sans text-[#292625] hover:bg-[#F4F1EC] transition-colors"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://youtube.com/@AntaaraUnplugged"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#756B67]/20 text-[11px] tracking-[0.12em] uppercase font-sans text-[#292625] hover:bg-[#F4F1EC] transition-colors"
              >
                <span>YouTube</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#756B67]/80 tracking-[0.1em] gap-4">
          <p>© {new Date().getFullYear()} Antaara Unplugged. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Curated by</span>
            <span className="font-serif italic text-sm text-[#292625]">Kirti Jaiswal Rajpal</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
