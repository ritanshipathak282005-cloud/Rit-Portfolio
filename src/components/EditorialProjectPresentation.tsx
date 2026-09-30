import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Project, BoardImage, DarkSafariBoards } from '../types';
import { getImageSlot, getSlotKey } from '../services/imageSlotManager';

export type BoardKey = 'themeBoard' | 'inspirationBoard' | 'developmentBoard' | 'lookBook';

export interface EditorialPresentationTheme {
  containerClass: string;
  headerBorder: string;
  labelColor: string;
  titleColor: string;
  subtextColor: string;
  taglineColor: string;
  navBarBorder: string;
  navBtn: string;
  sectionBorder: string;
  sectionTitleColor: string;
}

export interface EditorialProjectPresentationProps {
  project: Project;
  headerId: string;
  atelierId: string;
  categoryLabel: string;
  subtitle: string;
  craftTechniques: string;
  theme: EditorialPresentationTheme;
  defaultBoards: DarkSafariBoards;
  storageKey: string;
  onUpdateBoards?: (boards: DarkSafariBoards) => void;
}

export const EditorialProjectPresentation: React.FC<EditorialProjectPresentationProps> = ({
  project,
  headerId,
  atelierId,
  categoryLabel,
  subtitle,
  craftTechniques,
  theme,
  defaultBoards,
  storageKey,
  onUpdateBoards,
}) => {
  // Guaranteed initialization of the project boards
  const [boards, setBoards] = useState<DarkSafariBoards>(() => {
    if (!storageKey) {
      return defaultBoards;
    }
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.themeBoard?.length === defaultBoards.themeBoard?.length &&
          parsed.inspirationBoard?.length === defaultBoards.inspirationBoard?.length &&
          parsed.developmentBoard?.length === defaultBoards.developmentBoard?.length &&
          parsed.lookBook?.length === defaultBoards.lookBook?.length
        ) {
          return {
            ...parsed,
            themeBoard: defaultBoards.themeBoard,
            inspirationBoard: defaultBoards.inspirationBoard,
            developmentBoard: defaultBoards.developmentBoard,
            lookBook: defaultBoards.lookBook,
          };
        }
      }
    } catch (e) {
      console.warn(`Failed to load saved presentation boards for ${project.title}:`, e);
    }
    return defaultBoards;
  });

  // Keep boards in sync when defaultBoards or storageKey changes
  useEffect(() => {
    setBoards(defaultBoards);
  }, [defaultBoards, storageKey]);

  // When storageKey is empty (pure code-driven projects like Nocturnal),
  // render directly from defaultBoards for 1:1 instantaneous image updates
  const activeBoards = storageKey ? boards : defaultBoards;

  const [lightboxImage, setLightboxImage] = useState<BoardImage | null>(null);

  // Four project sections in exact order
  const sections: {
    key: BoardKey;
    id: string;
    title: string;
    isLargest?: boolean;
  }[] = [
    {
      key: 'themeBoard',
      id: 'section-theme-board',
      title: 'THEME BOARD'
    },
    {
      key: 'inspirationBoard',
      id: 'section-inspiration-board',
      title: 'INSPIRATION BOARD'
    },
    {
      key: 'developmentBoard',
      id: 'section-development-board',
      title: 'DEVELOPMENT BOARD',
      isLargest: true
    },
    {
      key: 'lookBook',
      id: 'section-look-book',
      title: 'LOOK BOOK'
    }
  ];

  const projectSlug =
    project.id === 'proj-5' || project.title.toLowerCase().includes('nocturnal')
      ? 'nocturnal'
      : project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

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
      const currentNorm = projectSlug.replace(/[^a-z0-9]+/g, '');

      if (normProject === currentNorm || detail.projectId === project.id) {
        setBoards((prev) => {
          const next: DarkSafariBoards = {
            themeBoard: [...prev.themeBoard],
            inspirationBoard: [...prev.inspirationBoard],
            developmentBoard: [...prev.developmentBoard],
            lookBook: [...prev.lookBook],
          };

          const secLower = detail.sectionId?.toLowerCase().replace(/[^a-z0-9]+/g, '');
          const idx = parseInt(detail.imageId?.replace(/\D/g, '') || '1', 10) - 1;

          if ((secLower === 'themeboard' || secLower === 'theme' || secLower === 'moodboard' || secLower === 'mood') && next.themeBoard[idx]) {
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
          if (storageKey) {
            try {
              localStorage.setItem(storageKey, JSON.stringify(next));
            } catch (err) {
              console.warn(err);
            }
          }
          return next;
        });
      }
    };

    window.addEventListener('ritanshi-image-slot-updated', handleSlotUpdate);
    return () => {
      window.removeEventListener('ritanshi-image-slot-updated', handleSlotUpdate);
    };
  }, [projectSlug, project.id, onUpdateBoards, storageKey]);

  return (
    <div
      id={`${projectSlug}-presentation`}
      data-project={projectSlug}
      data-project-id={project.id}
      className={theme.containerClass}
    >
      {/* Understated Project Presentation Header */}
      <header
        id={headerId}
        className={`mb-14 md:mb-20 border-b pb-8 pt-2 ${theme.headerBorder}`}
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            {categoryLabel ? (
              <div className={`text-[10.5px] font-mono tracking-[0.25em] uppercase mb-2 ${theme.labelColor}`}>
                <span>{categoryLabel}</span>
              </div>
            ) : null}
            
            <h1 className={`font-romantic text-4xl sm:text-5xl md:text-6xl font-normal italic tracking-[-0.01em] leading-tight ${theme.titleColor}`}>
              {project.title}
            </h1>

            <p className={`mt-2 text-xs sm:text-sm font-mono tracking-widest uppercase ${theme.subtextColor}`}>
              {subtitle}
            </p>
          </div>

          <div className={`max-w-md font-serif text-sm md:text-base font-light italic leading-relaxed whitespace-pre-line lg:text-right ${theme.taglineColor}`}>
            "{project.tagline}"
          </div>
        </div>

        {/* Section Quick Jump Bar */}
        <nav
          aria-label="Presentation Sections"
          className={`mt-8 pt-4 border-t flex flex-wrap gap-2.5 sm:gap-3 items-center ${theme.navBarBorder}`}
        >
          {sections.map((sec) => (
            <a
              key={sec.key}
              href={`#${sec.id}`}
              className={`px-3.5 py-1.5 text-[10px] sm:text-[10.5px] font-mono tracking-widest uppercase border transition-all ${theme.navBtn}`}
            >
              {sec.title}
            </a>
          ))}
        </nav>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          THE FOUR SECTIONS (TOTAL 7 IMAGE SLOTS)
          1. THEME BOARD — 1 single complete mood board image
          2. INSPIRATION BOARD — 1 single complete mood board image
          3. DEVELOPMENT BOARD — 1 single complete photo collage document
          4. LOOK BOOK — 4 images in a balanced 2x2 grid
          
          IMAGE PRESENTATION:
          - Clean standalone editorial images
          - NO Polaroid frames or white card borders
          - NO captions or metadata underneath
          - NO image numbers or descriptions
          - NO physical photo shadows
          - Original proportions preserved without distortion or blurring
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="space-y-24 sm:space-y-28 md:space-y-36">
        {sections.map((sec) => {
          const boardItems = activeBoards[sec.key];

          return (
            <section
              key={sec.key}
              id={sec.id}
              data-project={projectSlug}
              data-section={sec.key}
              className={`relative border-t pt-10 sm:pt-14 ${theme.sectionBorder}`}
            >
              {/* Section Header: Pure title, no buttons, no cards, no metadata */}
              <div className="mb-10 sm:mb-14">
                <h2
                  className={`font-serif tracking-[0.15em] uppercase ${theme.sectionTitleColor} ${
                    sec.id === 'section-theme-board'
                      ? 'text-center font-bold not-italic text-[37px] leading-[46px]'
                      : sec.id === 'section-inspiration-board'
                      ? 'text-center font-bold not-italic text-[40px] leading-[45px]'
                      : sec.id === 'section-development-board'
                      ? 'text-center font-bold not-italic text-[40px] leading-[45px]'
                      : sec.id === 'section-look-book'
                      ? 'text-center font-bold not-italic text-[40px] leading-[45px]'
                      : 'text-2xl sm:text-3xl md:text-4xl font-normal'
                  }`}
                >
                  {sec.title}
                </h2>
              </div>

              {/* Standalone Editorial Images with Specific Section Layouts */}
              {boardItems && boardItems.length > 0 && (
                <div
                  className={
                    sec.key === 'themeBoard' ||
                    sec.key === 'inspirationBoard' ||
                    (sec.key === 'developmentBoard' && boardItems.length === 1)
                      ? /* 1 SINGLE COMPLETE MOOD BOARD / COLLAGE IMAGE: Clean standalone editorial image, centered, clear, sharp, fully visible without cropping or card decorations */
                        'w-full max-w-5xl mx-auto flex justify-center'
                      : sec.key === 'developmentBoard'
                      ? /* 2-IMAGE DEVELOPMENT BOARD (LANDSCAPE): Single-column vertical stacked layout with consistent vertical rhythm */
                        'flex flex-col gap-8 sm:gap-10 md:gap-12 w-full max-w-5xl mx-auto items-center'
                      : /* LOOK BOOK: 4 IMAGES: Symmetrical 2x2 editorial grid matching reference layout */
                        'grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto items-start'
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
                    const slotKey = getSlotKey(projectSlug, sectionSlug, imageSlotId);
                    const slotUrl = getImageSlot(projectSlug, sectionSlug, imageSlotId, item.url);

                    return (
                      <div
                        key={item.id}
                        onClick={() => setLightboxImage({ ...item, url: slotUrl })}
                        className="cursor-zoom-in transition-opacity duration-300 hover:opacity-95 flex justify-center w-full"
                      >
                        <img
                          id={slotKey}
                          data-project-id={projectSlug}
                          data-section-id={sectionSlug}
                          data-image-id={imageSlotId}
                          data-slot-id={slotKey}
                          src={slotUrl}
                          alt=""
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className={
                            sec.key === 'themeBoard' ||
                            sec.key === 'inspirationBoard'
                              ? 'w-full h-auto max-h-[88vh] object-contain block select-none mx-auto'
                              : sec.key === 'developmentBoard'
                              ? 'w-full h-auto block select-none'
                              : 'w-full h-auto aspect-[3/4] object-cover block select-none'
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

      {/* Understated Process Credits */}
      <section id={atelierId} className={`mt-28 mb-16 border-t pt-12 ${theme.sectionBorder}`}>
        <div className={`flex justify-center text-[11px] font-mono tracking-widest uppercase ${theme.titleColor}`}>
          <div className="space-y-1.5 text-center max-w-xl">
            <span className={`text-[9.5px] tracking-[0.25em] block ${theme.subtextColor}`}>CRAFT TECHNIQUES</span>
            <p className={`font-serif normal-case text-sm tracking-normal ${theme.titleColor}`}>
              {craftTechniques}
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CLEAN IMAGE LIGHTBOX (NO CARDS, NO CAPTIONS, NO METADATA)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl max-h-[92vh] flex items-center justify-center cursor-default"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-[#F3E7DB]/70 hover:text-[#F3E7DB] p-1.5 transition-colors cursor-pointer"
              aria-label="Close image"
            >
              <X className="w-6 h-6" />
            </button>

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
