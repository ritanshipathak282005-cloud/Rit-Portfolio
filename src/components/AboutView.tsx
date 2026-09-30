import React, { useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { ArrowUpRight, X } from 'lucide-react';
import defaultPortraitImg from '../assets/images/regenerated_image_1790111869119.png';
import { getImageSlot, getSlotKey } from '../services/imageSlotManager';

interface AboutViewProps {
  data: PortfolioData;
}

export const AboutView: React.FC<AboutViewProps> = ({ data }) => {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEnlargedImage(null);
    };
    if (enlargedImage) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [enlargedImage]);

  const currentPortrait = data.portraitUrl || defaultPortraitImg;

  return (
    <div className="min-h-screen bg-[#C81D25] px-6 md:px-12 pt-32 pb-24 md:pt-40 animate-in fade-in duration-500">
      <div className="mx-auto max-w-6xl">
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          
          {/* Left Column: Frameless Editorial Portrait & Contacts */}
          <div className="space-y-12 lg:col-span-5">
            {/* Frameless Portrait — 100% Sharp & Crisp with Click to Enlarge */}
            <div
              onClick={() => setEnlargedImage(currentPortrait)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setEnlargedImage(currentPortrait);
                }
              }}
              aria-label="Enlarge portrait image"
              className="overflow-hidden editorial-photo-frame ring-1 ring-[#F3C5CD]/10 relative group cursor-zoom-in"
            >
              <img
                id={getSlotKey('about', 'portrait', 'image')}
                data-project-id="about"
                data-section-id="portrait"
                data-image-id="image"
                data-slot-id={getSlotKey('about', 'portrait', 'image')}
                src={getImageSlot('about', 'portrait', 'image', currentPortrait)}
                alt={data.name}
                referrerPolicy="no-referrer"
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.01]"
              />
            </div>

            {/* Direct Contact Links - Light Cream Editorial Block */}
            <div className="border border-[#F3C5CD]/20 bg-black/20 p-8 space-y-6 shadow-sm">
              <span className="text-[10.5px] font-semibold tracking-[0.25em] text-[#F3C5CD] uppercase block">
                COMMUNICATIONS
              </span>

              <div className="space-y-4">
                <a
                  href={`mailto:${data.email}`}
                  className="flex items-center justify-between text-xs font-medium tracking-[0.18em] uppercase text-[#F3C5CD] transition-colors hover:text-white border-b border-[#F3C5CD]/15 pb-3"
                >
                  <span>EMAIL ({data.email})</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <a
                  href={`https://instagram.com/${data.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-medium tracking-[0.18em] uppercase text-[#F3C5CD] transition-colors hover:text-white border-b border-[#F3C5CD]/15 pb-3"
                >
                  <span>INSTAGRAM ({data.instagram})</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <a
                  href="https://www.behance.net/ritanshipathak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-medium tracking-[0.18em] uppercase text-[#F3C5CD] transition-colors hover:text-white pb-1"
                >
                  <span>BEHANCE</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Education, Skills, Interests */}
          <div className="space-y-16 lg:col-span-7">
            
            {/* Primary Bio & Manifesto */}
            <div className="space-y-6">
              <span className="text-[10.5px] font-medium tracking-[0.25em] text-[#F3C5CD]/80 uppercase block">
                DESIGN ETHOS
              </span>
              <p className="font-romantic text-3xl md:text-4xl font-normal leading-snug italic text-[#F3C5CD]">
                "{data.tagline}"
              </p>
              <p className="text-base leading-relaxed text-[#F3C5CD]/90 md:text-lg whitespace-pre-line">
                {data.bio}
              </p>
              <p className="text-base leading-relaxed text-[#F3C5CD]/80 md:text-lg whitespace-pre-line">
                {data.bioSecondary}
              </p>
            </div>

            {/* Education */}
            <div className="space-y-6">
              <span className="text-[10.5px] font-medium tracking-[0.25em] text-[#F3C5CD]/80 uppercase block">
                EDUCATION
              </span>
              <div className="space-y-6 border-l-2 border-[#F3C5CD] pl-6">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="inline-block bg-black/25 px-2.5 py-0.5 text-[10px] text-[#F3C5CD] font-semibold tracking-wider uppercase border border-[#F3C5CD]/20 mb-1">
                      {edu.year}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-[#F3C5CD]">{edu.degree}</h3>
                    <p className="text-xs tracking-wider uppercase text-[#F3C5CD]/80">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Expertise with Soft Pastel Pink Badges */}
            <div className="space-y-6">
              <span className="text-[10.5px] font-medium tracking-[0.25em] text-[#F3C5CD]/80 uppercase block">
                AREAS OF PRACTICE
              </span>
              <div className="flex flex-col items-start gap-2.5">
                {data.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="w-fit whitespace-nowrap border border-[#F3C5CD]/20 bg-black/20 px-3 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-[#F3C5CD] hover:bg-[#F3C5CD]/15 hover:text-white transition-all shadow-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>


          </div>

        </div>

      </div>

      {/* Single-Image Enlarged Fullscreen Lightbox View */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setEnlargedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged portrait image"
        >
          {/* Subtle close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEnlargedImage(null);
            }}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
            aria-label="Close enlarged image"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Single enlarged image preserving natural proportions & sharp quality */}
          <div
            className="relative max-w-5xl max-h-[92vh] flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={enlargedImage}
              alt={data.name}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[88vh] w-auto h-auto object-contain block select-none shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
