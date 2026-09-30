import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { getImageSlot, getSlotKey } from '../services/imageSlotManager';

interface WorkGalleryViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onHoverImage: (label: string | null) => void;
}

export const WorkGalleryView: React.FC<WorkGalleryViewProps> = ({
  projects,
  onSelectProject,
  onHoverImage,
}) => {
  return (
    <div className="min-h-screen bg-[#C81D25] px-6 md:px-12 pt-32 pb-24 md:pt-40 animate-in fade-in duration-500">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 border-b border-[#F3C5CD]/20 pb-8 flex items-baseline justify-between">
          <div>
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#F3C5CD]/80 uppercase block mb-2">
              SELECTED ARCHIVAL COLLECTIONS &amp; CASE STUDIES
            </span>
            <h1 className="font-romantic text-5xl font-normal italic tracking-tight text-[#F3C5CD] md:text-7xl lg:text-8xl">
              Fashion Archives
            </h1>
          </div>
          <span className="hidden text-[11px] font-medium tracking-[0.22em] text-[#F3C5CD]/80 uppercase md:block">
            {projects.length} EDITIONS
          </span>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-x-16 md:gap-y-24">
          {projects.map((proj) => {
            const hasCategory =
              proj.category &&
              proj.category.trim() &&
              !(
                proj.id === 'proj-1' ||
                proj.title?.toUpperCase().includes('CRIMSON STATIC') ||
                proj.title?.toUpperCase().includes('MARTINI')
              ) &&
              !(proj.id === 'proj-3' || proj.title?.toUpperCase().includes('ACID STAR')) &&
              !(proj.id === 'proj-4' || proj.title?.toUpperCase().includes('GOTHIC DEBUTANTE')) &&
              !(proj.id === 'proj-5' || proj.title?.toUpperCase().includes('NOCTURNAL'));

            return (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                onMouseEnter={() => onHoverImage('VIEW CASE STUDY')}
                onMouseLeave={() => onHoverImage(null)}
                className="group cursor-pointer space-y-5"
              >
                <div className="relative aspect-[4/5] overflow-hidden editorial-photo-frame ring-1 ring-[#F3C5CD]/10 transition-all duration-500">
                  <img
                    id={getSlotKey(proj.id, 'cover', 'image')}
                    data-project-id={proj.id}
                    data-section-id="cover"
                    data-image-id="image"
                    data-slot-id={getSlotKey(proj.id, 'cover', 'image')}
                    src={getImageSlot(proj.id, 'cover', 'image', proj.coverImage)}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center bg-black/40 text-[#F3C5CD] border border-[#F3C5CD]/25 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-[#F3C5CD] group-hover:text-[#C81D25] shadow-md">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex flex-col space-y-2 pt-1">
                  <div className="flex items-baseline justify-between text-[11px] font-medium tracking-[0.2em] text-[#F3C5CD]/80 uppercase">
                    <span className="bg-black/25 px-2.5 py-0.5 text-[10px] font-semibold text-[#F3C5CD] border border-[#F3C5CD]/20">
                      EDITION {proj.number}
                    </span>
                    <span className="font-serif italic text-xs tracking-wider">{proj.year}</span>
                  </div>

                  <h2 className="font-romantic text-3xl font-normal italic text-[#F3C5CD] transition-colors duration-200 group-hover:text-white md:text-4xl">
                    {proj.title}
                  </h2>
                  <div className="h-[1px] w-0 bg-[#F3C5CD] transition-all duration-300 group-hover:w-14" />

                  {hasCategory ? (
                    <div className="flex items-center space-x-2">
                      <span className="inline-block bg-black/20 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.18em] text-[#F3C5CD] uppercase border border-[#F3C5CD]/20">
                        {proj.category}
                      </span>
                    </div>
                  ) : null}

                  <p className="font-serif text-sm font-light italic text-[#F3C5CD]/85 line-clamp-2 pt-1">
                    "{proj.tagline}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
