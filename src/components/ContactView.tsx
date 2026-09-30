import React from 'react';
import { PortfolioData } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ContactViewProps {
  data: PortfolioData;
}

export const ContactView: React.FC<ContactViewProps> = ({ data }) => {
  const email = data.contact?.email || data.email;
  const instagram = data.contact?.instagram || data.instagram;
  const behance = 'https://www.behance.net/ritanshipathak';

  const instagramUrl = instagram.startsWith('http')
    ? instagram
    : instagram.startsWith('@')
    ? `https://instagram.com/${instagram.slice(1)}`
    : `https://instagram.com/${instagram}`;

  const instagramHandle = instagram.startsWith('http')
    ? instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@').replace(/\/$/, '')
    : instagram.startsWith('@')
    ? instagram
    : `@${instagram}`;

  const behanceUrl = 'https://www.behance.net/ritanshipathak';
  const behanceHandle = 'behance.net/ritanshipathak';

  return (
    <div className="min-h-screen bg-[#C81D25] text-[#F3C5CD] px-6 md:px-12 lg:px-20 pt-32 pb-14 md:pt-40 md:pb-16 flex flex-col justify-between animate-in fade-in duration-700">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-romantic text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal italic tracking-[-0.02em] text-[#F3C5CD] leading-[1.02] select-none">
              LOOKING FOR THE NEXT CHAPTER
            </h1>
            <p className="font-serif text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed text-[#F3C5CD]/90 pt-4 max-w-xl">
              I’m looking for an opportunity to learn by doing, contribute my perspective, and grow alongside a fashion design team.
            </p>
            <div className="pt-10 border-t border-[#F3C5CD]/15 mt-10">
              <p className="text-[11px] font-mono tracking-[0.22em] text-[#F3C5CD]/60 uppercase">
                AHMEDABAD, INDIA
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-6 space-y-2">
            <div className="border-b border-[#F3C5CD]/20 pb-8 pt-2">
              <span className="text-[10px] font-mono font-semibold tracking-[0.28em] text-[#F3C5CD]/70 uppercase block mb-3">
                EMAIL
              </span>
              <a
                href={`mailto:${email}`}
                className="group flex items-center justify-between text-xl sm:text-2xl md:text-3xl font-serif text-[#F3C5CD] hover:text-white transition-colors duration-200"
              >
                <span className="break-all tracking-wide underline-offset-8 group-hover:underline">
                  {email}
                </span>
                <ArrowUpRight className="h-5 w-5 ml-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#F3C5CD]/80 group-hover:text-white" />
              </a>
            </div>

            <div className="border-b border-[#F3C5CD]/20 py-8">
              <span className="text-[10px] font-mono font-semibold tracking-[0.28em] text-[#F3C5CD]/70 uppercase block mb-3">
                INSTAGRAM
              </span>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between text-xl sm:text-2xl md:text-3xl font-serif text-[#F3C5CD] hover:text-white transition-colors duration-200"
              >
                <span className="tracking-wide underline-offset-8 group-hover:underline">
                  {instagramHandle}
                </span>
                <ArrowUpRight className="h-5 w-5 ml-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#F3C5CD]/80 group-hover:text-white" />
              </a>
            </div>

            <div className="border-b border-[#F3C5CD]/20 py-8">
              <span className="text-[10px] font-mono font-semibold tracking-[0.28em] text-[#F3C5CD]/70 uppercase block mb-3">
                BEHANCE
              </span>
              <a
                href={behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between text-xl sm:text-2xl md:text-3xl font-serif text-[#F3C5CD] hover:text-white transition-colors duration-200"
              >
                <span className="break-all tracking-wide underline-offset-8 group-hover:underline">
                  {behanceHandle}
                </span>
                <ArrowUpRight className="h-5 w-5 ml-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#F3C5CD]/80 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
