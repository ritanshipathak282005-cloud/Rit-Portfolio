import React, { useState, useEffect } from 'react';
import { Project, DarkSafariBoards, BoardImage } from '../types';
import {
  darkSafariThemeImage,
  darkSafariInspirationImage,
  darkSafariDevelopmentImage,
  darkSafariLookbookImage1,
  darkSafariLookbookImage2,
  darkSafariLookbookImage3,
  darkSafariLookbookImage4,
} from '../data/darkSafariImages';
import { getImageSlot, getSlotKey } from '../services/imageSlotManager';

export const DEFAULT_DARK_SAFARI_BOARDS: DarkSafariBoards = {
  themeBoard: [
    {
      id: 'ds-tb-1',
      url: darkSafariThemeImage,
      title: 'Neutral Vintage Mood Board Document',
      aspect: 'landscape',
    },
  ],
  inspirationBoard: [
    {
      id: 'ds-ib-1',
      url: darkSafariInspirationImage,
      title: 'Brown Beige Elegant Minimalist Aesthetic Moodboard',
      aspect: 'landscape',
    },
  ],
  developmentBoard: [
    {
      id: 'ds-db-1',
      url: darkSafariDevelopmentImage,
      title: 'Neutral Minimal Elegant Moodboard Photo Collage Document',
      aspect: 'landscape',
    },
  ],
  lookBook: [
    {
      id: 'ds-lb-1',
      url: darkSafariLookbookImage1,
      title: 'Look 01 — Hero Outerwear Coat',
      aspect: 'tall',
    },
    {
      id: 'ds-lb-2',
      url: darkSafariLookbookImage2,
      title: 'Look 02 — Tailored Street-Couture',
      aspect: 'tall',
    },
    {
      id: 'ds-lb-3',
      url: darkSafariLookbookImage3,
      title: 'Look 03 — Chamba Rumal Craft Silhouette',
      aspect: 'tall',
    },
    {
      id: 'ds-lb-4',
      url: darkSafariLookbookImage4,
      title: 'Look 04 — Editorial Garment Portrait',
      aspect: 'tall',
    },
  ],
};

const DARK_SAFARI_STORAGE_KEY = 'ritanshi_dark_safari_boards_v1';

interface DarkSafariPresentationProps {
  project: Project;
  onUpdateBoards?: (boards: DarkSafariBoards) => void;
}

export const DarkSafariPresentation: React.FC<DarkSafariPresentationProps> = ({
  project,
  onUpdateBoards,
}) => {
  const resolvedBoards: DarkSafariBoards = {
    ...DEFAULT_DARK_SAFARI_BOARDS,
    themeBoard: [
      {
        ...DEFAULT_DARK_SAFARI_BOARDS.themeBoard[0],
        url: getImageSlot('dark-safari', 'theme-board', 'image-1', darkSafariThemeImage),
      },
    ],
    inspirationBoard: [
      {
        ...DEFAULT_DARK_SAFARI_BOARDS.inspirationBoard[0],
        url: getImageSlot('dark-safari', 'inspiration-board', 'image-1', darkSafariInspirationImage),
      },
    ],
    developmentBoard: [
      {
        ...DEFAULT_DARK_SAFARI_BOARDS.developmentBoard[0],
        url: getImageSlot('dark-safari', 'development-board', 'image-1', darkSafariDevelopmentImage),
      },
    ],
    lookBook: [
      {
        ...DEFAULT_DARK_SAFARI_BOARDS.lookBook[0],
        url: getImageSlot('dark-safari', 'lookbook', 'image-1', darkSafariLookbookImage1),
      },
      {
        ...DEFAULT_DARK_SAFARI_BOARDS.lookBook[1],
        url: getImageSlot('dark-safari', 'lookbook', 'image-2', darkSafariLookbookImage2),
      },
      {
        ...DEFAULT_DARK_SAFARI_BOARDS.lookBook[2],
        url: getImageSlot('dark-safari', 'lookbook', 'image-3', darkSafariLookbookImage3),
      },
      {
        ...DEFAULT_DARK_SAFARI_BOARDS.lookBook[3],
        url: getImageSlot('dark-safari', 'lookbook', 'image-4', darkSafariLookbookImage4),
      },
    ],
  };

  const [activeBoards, setActiveBoards] = useState<DarkSafariBoards>(resolvedBoards);

  useEffect(() => {
    const handleSlotUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{
        slotKey: string;
        projectId: string;
        sectionId: string;
        imageId: string;
        newImage: string;
      }>;
      const detail = customEvent.detail;
      if (!detail) return;

      const normProject = detail.projectId?.toLowerCase().replace(/[^a-z0-9]+/g, '');
      if (normProject === 'darksafari' || normProject === 'proj6') {
        setActiveBoards((prev) => {
          const next: DarkSafariBoards = {
            themeBoard: [...prev.themeBoard],
            inspirationBoard: [...prev.inspirationBoard],
            developmentBoard: [...prev.developmentBoard],
            lookBook: [...prev.lookBook],
          };

          const secLower = detail.sectionId?.toLowerCase().replace(/[^a-z0-9]+/g, '');
          const idx = parseInt(detail.imageId?.replace(/\D/g, '') || '1', 10) - 1;

          if ((secLower === 'themeboard' || secLower === 'theme') && next.themeBoard[idx]) {
            next.themeBoard[idx] = { ...next.themeBoard[idx], url: detail.newImage };
          } else if ((secLower === 'inspirationboard' || secLower === 'inspiration') && next.inspirationBoard[idx]) {
            next.inspirationBoard[idx] = { ...next.inspirationBoard[idx], url: detail.newImage };
          } else if ((secLower === 'developmentboard' || secLower === 'development') && next.developmentBoard[idx]) {
            next.developmentBoard[idx] = { ...next.developmentBoard[idx], url: detail.newImage };
          } else if ((secLower === 'lookbook' || secLower === 'look') && next.lookBook[idx]) {
            next.lookBook[idx] = { ...next.lookBook[idx], url: detail.newImage };
          }

          if (onUpdateBoards) {
            onUpdateBoards(next);
          }
          return next;
        });
      }
    };

    window.addEventListener('ritanshi-image-slot-updated', handleSlotUpdate);
    return () => {
      window.removeEventListener('ritanshi-image-slot-updated', handleSlotUpdate);
    };
  }, [onUpdateBoards]);

  useEffect(() => {
    setActiveBoards(resolvedBoards);
  }, [
    darkSafariLookbookImage1,
    darkSafariLookbookImage2,
    darkSafariLookbookImage3,
    darkSafariLookbookImage4,
    darkSafariThemeImage,
    darkSafariInspirationImage,
    darkSafariDevelopmentImage,
  ]);

  const [lightboxImage, setLightboxImage] = useState<BoardImage | null>(null);

  const sections = [
    { key: 'themeBoard' as const, id: 'section-theme-board', title: 'THEME BOARD' },
    { key: 'inspirationBoard' as const, id: 'section-inspiration-board', title: 'INSPIRATION BOARD' },
    { key: 'developmentBoard' as const, id: 'section-development-board', title: 'DEVELOPMENT BOARD', isLargest: true },
    { key: 'lookBook' as const, id: 'section-look-book', title: 'LOOK BOOK' },
  ];

  return (
    <div
      id="dark-safari-presentation"
      data-project="dark-safari"
      data-project-id="proj-6"
      className="relative text-[#F3C5CD]"
    >
      <header id="dark-safari-presentation-header" className="mb-14 md:mb-20 border-b border-[#F3C5CD]/20 pb-8 pt-2">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="text-[10.5px] font-mono tracking-[0.25em] uppercase text-[#F3C5CD] mb-2">
              <span>CHAMBA RUMAL</span>
            </div>
            <h1 className="font-romantic text-4xl sm:text-5xl md:text-6xl font-normal italic tracking-[-0.01em] text-[#F3C5CD] leading-tight">
              DARK SAFARI
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#F3C5CD]/80">
              INDIAN CRAFT \ FERAL \ LEOPARD
            </p>
          </div>
          <div className="max-w-md font-serif text-sm md:text-base font-light italic leading-relaxed text-[#F3C5CD]/85 lg:text-right">
            "{project.tagline}"
          </div>
        </div>

        <nav aria-label="Presentation Sections" className="mt-8 pt-4 border-t border-[#F3C5CD]/15 flex flex-wrap gap-2.5 sm:gap-3 items-center">
          {sections.map((sec) => (
            <a
              key={sec.key}
              href={`#${sec.id}`}
              className="px-3.5 py-1.5 text-[10px] sm:text-[10.5px] font-mono tracking-widest uppercase border border-[#F3C5CD]/25 hover:border-[#F3C5CD]/60 text-[#F3C5CD] hover:text-white bg-[#2B1B17] hover:bg-[#F3C5CD]/15 transition-all"
            >
              {sec.title}
            </a>
          ))}
        </nav>
      </header>

      <div className="space-y-24 sm:space-y-28 md:space-y-36">
        {sections.map((sec) => {
          const boardItems = activeBoards[sec.key];
          return (
            <section
              key={sec.key}
              id={sec.id}
              data-project="dark-safari"
              data-section={sec.key}
              className="relative border-t border-[#F3C5CD]/20 pt-10 sm:pt-14"
            >
              <div className="mb-10 sm:mb-14">
                <h2 className="font-serif tracking-[0.15em] uppercase text-[#F3C5CD] text-center font-bold not-italic text-[40px] leading-[45px]">
                  {sec.title}
                </h2>
              </div>

              {boardItems && boardItems.length > 0 && (
                <div
                  className={
                    sec.key === 'lookBook'
                      ? 'grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto items-start'
                      : 'w-full max-w-5xl mx-auto flex justify-center'
                  }
                >
                  {boardItems.map((item, itemIdx) => {
                    const sectionSlug =
                      sec.key === 'themeBoard'
                        ? 'theme-board'
                        : sec.key === 'inspirationBoard'
                        ? 'inspiration-board'
                        : sec.key === 'developmentBoard'
                        ? 'development-board'
                        : 'lookbook';
                    const imageSlotId = `image-${itemIdx + 1}`;
                    const slotKey = getSlotKey('dark-safari', sectionSlug, imageSlotId);

                    return (
                      <div
                        key={item.id}
                        onClick={() => setLightboxImage(item)}
                        className="cursor-zoom-in transition-opacity duration-300 hover:opacity-95 flex justify-center w-full"
                      >
                        <img
                          id={slotKey}
                          data-project-id="dark-safari"
                          data-section-id={sectionSlug}
                          data-image-id={imageSlotId}
                          data-slot-id={slotKey}
                          src={item.url}
                          alt=""
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className={
                            sec.key === 'lookBook'
                              ? 'w-full h-auto aspect-[3/4] object-cover block select-none'
                              : 'w-full h-auto max-h-[88vh] object-contain block select-none mx-auto'
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md cursor-zoom-out animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl max-h-[92vh] flex items-center justify-center cursor-default"
          >
            <img
              src={lightboxImage.url}
              alt=""
              referrerPolicy="no-referrer"
              className="max-h-[85vh] w-auto max-w-full object-contain select-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
