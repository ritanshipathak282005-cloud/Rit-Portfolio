import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, FileText, Sparkles, ChevronLeft, ChevronRight, CornerDownLeft } from 'lucide-react';
import { SKETCHBOOK_PAGES, SketchPage } from '../data/sketchbookData';
import { getImageSlot, getSlotKey } from '../services/imageSlotManager';

interface FashionSketchbookProps {
  onBack?: () => void;
  onHoverImage?: (label: string | null) => void;
}

export const FashionSketchbook: React.FC<FashionSketchbookProps> = ({
  onBack,
  onHoverImage,
}) => {
  // View mode: 'spread' (desktop 2-page spread) or 'single' (1 page at a time)
  const [viewMode, setViewMode] = useState<'spread' | 'single'>('spread');
  // In single mode: currentPage is 0..13 (representing page 1..14)
  // In spread mode: currentSpread is 0..7 (Spread 0: P1 cover, Spread 1: P2-3, Spread 2: P4-5, etc., Spread 7: P14 back)
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [spreadIndex, setSpreadIndex] = useState<number>(0);

  // Animation direction: 'next' | 'prev' | null
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | null>(null);
  const [isTurning, setIsTurning] = useState<boolean>(false);

  // Touch tracking for mobile swipe
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = SKETCHBOOK_PAGES.length; // 14

  // Spread definition:
  // Spread 0: [P1] (Cover, centered)
  // Spread 1: [P2, P3]
  // Spread 2: [P4, P5]
  // Spread 3: [P6, P7]
  // Spread 4: [P8, P9]
  // Spread 5: [P10, P11]
  // Spread 6: [P12, P13]
  // Spread 7: [P14] (Back / Designer Influences, centered)
  const spreads: { left?: SketchPage; right?: SketchPage; single?: SketchPage; title: string }[] = [
    { single: SKETCHBOOK_PAGES[0], title: 'Cover — Fashion Illustrations' },
    { left: SKETCHBOOK_PAGES[1], right: SKETCHBOOK_PAGES[2], title: 'Introduction & Spiderweb Couture' },
    { left: SKETCHBOOK_PAGES[3], right: SKETCHBOOK_PAGES[4], title: 'Star Bustier & Gold Scale Mermaid' },
    { left: SKETCHBOOK_PAGES[5], right: SKETCHBOOK_PAGES[6], title: 'Gilded Drop-Shoulder & Burgundy Lattice' },
    { left: SKETCHBOOK_PAGES[7], right: SKETCHBOOK_PAGES[8], title: 'Liquid Silver Mosaic & Draped Halter' },
    { left: SKETCHBOOK_PAGES[9], right: SKETCHBOOK_PAGES[10], title: 'Valentino Sequin Mini & Desert Architecture' },
    { left: SKETCHBOOK_PAGES[11], right: SKETCHBOOK_PAGES[12], title: 'Bronze Sequined & Pearl Droplet Opera' },
    { single: SKETCHBOOK_PAGES[13], title: 'Legendary Designers Archive' },
  ];

  const totalSpreads = spreads.length; // 8

  // Detect small screens and force single page view on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setViewMode('single');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Synchronize spread and single index when switching viewMode
  const switchViewMode = (mode: 'spread' | 'single') => {
    if (mode === viewMode) return;
    if (mode === 'single') {
      // From spread to single:
      if (spreadIndex === 0) setPageIndex(0);
      else if (spreadIndex === totalSpreads - 1) setPageIndex(totalPages - 1);
      else {
        // e.g. spread 1 -> page 1 (P2)
        setPageIndex(spreadIndex * 2 - 1);
      }
    } else {
      // From single to spread:
      if (pageIndex === 0) setSpreadIndex(0);
      else if (pageIndex === totalPages - 1) setSpreadIndex(totalSpreads - 1);
      else {
        setSpreadIndex(Math.floor((pageIndex + 1) / 2));
      }
    }
    setViewMode(mode);
  };

  // Turn page logic
  const handleNext = useCallback(() => {
    if (isTurning) return;

    if (viewMode === 'single') {
      if (pageIndex < totalPages - 1) {
        setIsTurning(true);
        setTurnDirection('next');
        setTimeout(() => {
          setPageIndex((prev) => prev + 1);
          setIsTurning(false);
          setTurnDirection(null);
        }, 420);
      }
    } else {
      if (spreadIndex < totalSpreads - 1) {
        setIsTurning(true);
        setTurnDirection('next');
        setTimeout(() => {
          setSpreadIndex((prev) => prev + 1);
          setIsTurning(false);
          setTurnDirection(null);
        }, 420);
      }
    }
  }, [isTurning, viewMode, pageIndex, spreadIndex, totalPages, totalSpreads]);

  const handlePrev = useCallback(() => {
    if (isTurning) return;

    if (viewMode === 'single') {
      if (pageIndex > 0) {
        setIsTurning(true);
        setTurnDirection('prev');
        setTimeout(() => {
          setPageIndex((prev) => prev - 1);
          setIsTurning(false);
          setTurnDirection(null);
        }, 420);
      }
    } else {
      if (spreadIndex > 0) {
        setIsTurning(true);
        setTurnDirection('prev');
        setTimeout(() => {
          setSpreadIndex((prev) => prev - 1);
          setIsTurning(false);
          setTurnDirection(null);
        }, 420);
      }
    }
  }, [isTurning, viewMode, pageIndex, spreadIndex]);

  // Jump to specific page
  const jumpToPage = (targetPageIndex: number) => {
    if (isTurning || targetPageIndex === pageIndex) return;
    const dir = targetPageIndex > pageIndex ? 'next' : 'prev';
    setIsTurning(true);
    setTurnDirection(dir);
    setTimeout(() => {
      setPageIndex(targetPageIndex);
      if (targetPageIndex === 0) setSpreadIndex(0);
      else if (targetPageIndex === totalPages - 1) setSpreadIndex(totalSpreads - 1);
      else setSpreadIndex(Math.floor((targetPageIndex + 1) / 2));
      setIsTurning(false);
      setTurnDirection(null);
    }, 380);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Detect horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const isAtStart = viewMode === 'single' ? pageIndex === 0 : spreadIndex === 0;
  const isAtEnd = viewMode === 'single' ? pageIndex === totalPages - 1 : spreadIndex === totalSpreads - 1;

  const currentSinglePage = SKETCHBOOK_PAGES[pageIndex];
  const currentSpread = spreads[spreadIndex];

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full text-[#F3C5CD] select-none"
    >
      {/* Editorial Sketchbook Header / Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#F3C5CD]/20">
        <div>
          <h2 className="font-romantic text-2xl sm:text-3xl md:text-4xl font-normal italic text-[#F3C5CD] tracking-tight">
            Fashion Illustrations — Ritanshi Pathak
          </h2>
        </div>

        {/* View Mode Toggle (Desktop only) & Page indicator */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="hidden lg:flex items-center border border-[#F3C5CD]/25 bg-black/25 p-0.5 rounded-none">
            <button
              onClick={() => switchViewMode('spread')}
              className={`px-3 py-1 text-[10px] tracking-widest uppercase transition-all ${
                viewMode === 'spread'
                  ? 'bg-[#F3C5CD] text-[#C81D25] font-bold shadow-xs'
                  : 'text-[#F3C5CD]/70 hover:text-white'
              }`}
            >
              SPREAD VIEW
            </button>
            <button
              onClick={() => switchViewMode('single')}
              className={`px-3 py-1 text-[10px] tracking-widest uppercase transition-all ${
                viewMode === 'single'
                  ? 'bg-[#F3C5CD] text-[#C81D25] font-bold shadow-xs'
                  : 'text-[#F3C5CD]/70 hover:text-white'
              }`}
            >
              SINGLE PAGE
            </button>
          </div>

          <div className="px-3.5 py-1.5 border border-[#F3C5CD]/30 bg-black/30 font-mono tracking-[0.25em] text-xs font-semibold text-[#F3C5CD]">
            {viewMode === 'single' ? (
              <span>
                {String(pageIndex + 1).padStart(2, '0')}{' '}
                <span className="text-[#F3C5CD]/40">/</span> {String(totalPages).padStart(2, '0')}
              </span>
            ) : currentSpread.single ? (
              <span>
                {spreadIndex === 0 ? '01 / 14' : '14 / 14'}
              </span>
            ) : (
              <span>
                {String(currentSpread.left!.pageNumber).padStart(2, '0')}–{String(currentSpread.right!.pageNumber).padStart(2, '0')}{' '}
                <span className="text-[#F3C5CD]/40">/</span> {String(totalPages).padStart(2, '0')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          THE SKETCHBOOK STAGE (PERSPECTIVE 3D)
          Centred, grand, subtle page depth and book spine
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative mx-auto flex flex-col items-center justify-center py-2 sm:py-6">
        
        {/* Subtle Archival Book Spine Surface Shadow underneath */}
        <div className="relative w-full max-w-5xl sketchbook-perspective flex justify-center">

          {/* SPREAD VIEW (Two-page open spread) */}
          {viewMode === 'spread' && (
            <div className="w-full flex justify-center">
              {currentSpread.single ? (
                /* Single Hero Page Spread (Cover or Final Archive Page) */
                <div
                  onClick={() => !isAtEnd && handleNext()}
                  className={`relative w-full max-w-md sm:max-w-lg md:max-w-xl transition-transform duration-500 cursor-pointer ${
                    turnDirection === 'next'
                      ? 'transform rotate-y-[-12deg] scale-[0.98] opacity-90'
                      : turnDirection === 'prev'
                      ? 'transform rotate-y-[12deg] scale-[0.98] opacity-90'
                      : 'transform rotate-y-0 scale-100 opacity-100'
                  }`}
                  style={{
                    perspective: '1800px',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative aspect-[1/1.414] overflow-hidden bg-[#FAF6F0] sketchbook-page-stack-shadow border border-black/10">
                    <img
                      id={getSlotKey('process', 'sketch', currentSpread.single.id)}
                      data-project-id="process"
                      data-section-id="sketch"
                      data-image-id={currentSpread.single.id}
                      src={getImageSlot('process', 'sketch', currentSpread.single.id, currentSpread.single.imageUrl)}
                      alt={currentSpread.single.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain select-none block"
                      loading="eager"
                    />

                    {/* Paper grain & subtle edge vignette */}
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_24px_rgba(0,0,0,0.08)]" />
                  </div>

                  {/* Stacked Paper Sheets Depth Effect (right & bottom edge) */}
                  <div className="absolute -bottom-1 -right-1 left-1.5 h-1 bg-[#EBE4D8] border-b border-r border-black/15 -z-10" />
                  <div className="absolute -bottom-2 -right-2 left-3 h-1 bg-[#DDD5C7] border-b border-r border-black/20 -z-20" />
                </div>
              ) : (
                /* Two-Page Book Spread (Left Page + Right Page with Spine Gutter) */
                <div
                  className={`relative w-full grid grid-cols-2 max-w-5xl bg-[#FAF6F0] sketchbook-page-stack-shadow border border-black/15 transition-all duration-400 ${
                    turnDirection === 'next'
                      ? 'transform rotate-y-[-4deg] scale-[0.99]'
                      : turnDirection === 'prev'
                      ? 'transform rotate-y-[4deg] scale-[0.99]'
                      : 'transform rotate-y-0 scale-100'
                  }`}
                  style={{
                    perspective: '2000px',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* LEFT PAGE */}
                  <div
                    onClick={handlePrev}
                    onMouseEnter={() => onHoverImage && onHoverImage(!isAtStart ? 'PREVIOUS PAGE' : null)}
                    onMouseLeave={() => onHoverImage && onHoverImage(null)}
                    className={`relative aspect-[1/1.414] overflow-hidden border-r border-black/10 bg-[#FAF6F0] ${
                      !isAtStart ? 'cursor-w-resize' : 'cursor-default'
                    }`}
                  >
                    <img
                      id={getSlotKey('process', 'sketch', currentSpread.left!.id)}
                      data-project-id="process"
                      data-section-id="sketch"
                      data-image-id={currentSpread.left!.id}
                      src={getImageSlot('process', 'sketch', currentSpread.left!.id, currentSpread.left!.imageUrl)}
                      alt={currentSpread.left!.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain select-none block"
                      loading="eager"
                    />

                    {/* Center Spine Inner Shadow on Left Page */}
                    <div className="absolute top-0 bottom-0 right-0 w-8 pointer-events-none bg-gradient-to-l from-black/20 via-black/5 to-transparent" />
                    {/* Left Outer Page Edge subtle shadow */}
                    <div className="absolute top-0 bottom-0 left-0 w-4 pointer-events-none bg-gradient-to-r from-black/5 to-transparent" />

                    {/* Left Page Number Watermark */}
                    <span className="absolute bottom-3 left-4 font-mono text-[9px] tracking-widest text-black/35 select-none uppercase">
                      P. {String(currentSpread.left!.pageNumber).padStart(2, '0')}
                    </span>
                  </div>

                  {/* CENTER BOOK SPINE CREASE */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 z-20 pointer-events-none shadow-[inset_0_0_8px_rgba(0,0,0,0.35)]" />

                  {/* RIGHT PAGE */}
                  <div
                    onClick={handleNext}
                    onMouseEnter={() => onHoverImage && onHoverImage(!isAtEnd ? 'NEXT PAGE' : null)}
                    onMouseLeave={() => onHoverImage && onHoverImage(null)}
                    className={`relative aspect-[1/1.414] overflow-hidden bg-[#FAF6F0] ${
                      !isAtEnd ? 'cursor-e-resize' : 'cursor-default'
                    }`}
                  >
                    <img
                      id={getSlotKey('process', 'sketch', currentSpread.right!.id)}
                      data-project-id="process"
                      data-section-id="sketch"
                      data-image-id={currentSpread.right!.id}
                      src={getImageSlot('process', 'sketch', currentSpread.right!.id, currentSpread.right!.imageUrl)}
                      alt={currentSpread.right!.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain select-none block"
                      loading="eager"
                    />

                    {/* Center Spine Inner Shadow on Right Page */}
                    <div className="absolute top-0 bottom-0 left-0 w-8 pointer-events-none bg-gradient-to-r from-black/20 via-black/5 to-transparent" />
                    {/* Right Outer Page Edge subtle shadow */}
                    <div className="absolute top-0 bottom-0 right-0 w-4 pointer-events-none bg-gradient-to-l from-black/5 to-transparent" />

                    {/* Right Page Number Watermark */}
                    <span className="absolute bottom-3 right-4 font-mono text-[9px] tracking-widest text-black/35 select-none uppercase">
                      P. {String(currentSpread.right!.pageNumber).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Stacked Archival Paper Thickness Illusion */}
                  <div className="absolute -bottom-1 -right-1 left-2 h-1 bg-[#EBE4D8] border-b border-r border-black/15 -z-10" />
                  <div className="absolute -bottom-2 -right-2 left-4 h-1 bg-[#DDD5C7] border-b border-r border-black/20 -z-20" />
                </div>
              )}
            </div>
          )}

          {/* SINGLE PAGE VIEW (Mobile default & desktop single toggle) */}
          {viewMode === 'single' && (
            <div className="w-full flex justify-center">
              <div
                onClick={() => !isAtEnd && handleNext()}
                className={`relative w-full max-w-md sm:max-w-lg md:max-w-xl transition-all duration-400 cursor-pointer ${
                  turnDirection === 'next'
                    ? 'transform rotate-y-[-16deg] scale-[0.98] opacity-80 -translate-x-3'
                    : turnDirection === 'prev'
                    ? 'transform rotate-y-[16deg] scale-[0.98] opacity-80 translate-x-3'
                    : 'transform rotate-y-0 scale-100 opacity-100 translate-x-0'
                }`}
                style={{
                  perspective: '1600px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative aspect-[1/1.414] overflow-hidden bg-[#FAF6F0] sketchbook-page-stack-shadow border border-black/15">
                  <img
                    id={getSlotKey('process', 'sketch', currentSinglePage.id)}
                    data-project-id="process"
                    data-section-id="sketch"
                    data-image-id={currentSinglePage.id}
                    src={getImageSlot('process', 'sketch', currentSinglePage.id, currentSinglePage.imageUrl)}
                    alt={currentSinglePage.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain select-none block"
                    loading="eager"
                  />

                  {/* Left Spine Book Curl Shadow */}
                  <div className="absolute top-0 bottom-0 left-0 w-6 pointer-events-none bg-gradient-to-r from-black/15 via-black/5 to-transparent" />
                  {/* Subtle Inner Paper Edge vignette */}
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.06)]" />

                  {/* Page watermark */}
                  <div className="absolute bottom-3 right-4 font-mono text-[9px] tracking-widest text-black/40 select-none uppercase">
                    PAGE {String(currentSinglePage.pageNumber).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
                  </div>
                </div>

                {/* Stacked Paper Sheets Depth Effect */}
                <div className="absolute -bottom-1 -right-1 left-1.5 h-1 bg-[#EBE4D8] border-b border-r border-black/15 -z-10" />
                <div className="absolute -bottom-2 -right-2 left-3 h-1 bg-[#DDD5C7] border-b border-r border-black/20 -z-20" />
              </div>
            </div>
          )}

        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            TACTILE NAVIGATION CONTROLS
            ← Previous | 01 / 14 | Next →
            Smooth, minimal, refined editorial aesthetic
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 z-30">
          <button
            onClick={handlePrev}
            disabled={isAtStart || isTurning}
            className={`inline-flex items-center space-x-2 text-xs font-mono tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-200 ${
              isAtStart
                ? 'opacity-30 border-[#F3C5CD]/20 text-[#F3C5CD]/40 cursor-not-allowed'
                : 'border-[#F3C5CD]/35 text-[#F3C5CD] hover:text-white bg-black/25 hover:bg-[#F3C5CD]/20 hover:border-[#F3C5CD]/70 active:scale-95'
            }`}
            aria-label="Previous Page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>PREVIOUS</span>
          </button>

          {/* Minimal Page Indicator */}
          <div className="px-4 py-2 border border-[#F3C5CD]/25 bg-black/35 text-xs font-mono tracking-[0.25em] text-[#F3C5CD]">
            {viewMode === 'single' ? (
              <span>
                PAGE <span className="font-bold">{String(pageIndex + 1).padStart(2, '0')}</span> OF {String(totalPages).padStart(2, '0')}
              </span>
            ) : currentSpread.single ? (
              <span>
                PAGE <span className="font-bold">{spreadIndex === 0 ? '01' : '14'}</span> OF 14
              </span>
            ) : (
              <span>
                PAGES <span className="font-bold">{String(currentSpread.left!.pageNumber).padStart(2, '0')}–{String(currentSpread.right!.pageNumber).padStart(2, '0')}</span> OF 14
              </span>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={isAtEnd || isTurning}
            className={`inline-flex items-center space-x-2 text-xs font-mono tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-200 ${
              isAtEnd
                ? 'opacity-30 border-[#F3C5CD]/20 text-[#F3C5CD]/40 cursor-not-allowed'
                : 'border-[#F3C5CD]/35 text-[#F3C5CD] hover:text-white bg-black/25 hover:bg-[#F3C5CD]/20 hover:border-[#F3C5CD]/70 active:scale-95'
            }`}
            aria-label="Next Page"
          >
            <span>NEXT</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Minimal Archival Thumbnails Scrubber Strip */}
        <div className="mt-8 w-full max-w-3xl px-4">
          <div className="flex items-center justify-between text-[9.5px] font-mono tracking-widest text-[#F3C5CD]/60 uppercase mb-2">
            <span>INDEX SCRUBBER</span>
            <span>{SKETCHBOOK_PAGES[viewMode === 'single' ? pageIndex : (currentSpread.single ? (spreadIndex === 0 ? 0 : 13) : currentSpread.left!.pageNumber - 1)].title}</span>
          </div>

          <div className="flex items-center justify-between gap-1 sm:gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {SKETCHBOOK_PAGES.map((pg, idx) => {
              const isCurrent =
                viewMode === 'single'
                  ? pageIndex === idx
                  : currentSpread.single
                  ? (spreadIndex === 0 && idx === 0) || (spreadIndex === totalSpreads - 1 && idx === totalPages - 1)
                  : currentSpread.left!.pageNumber - 1 === idx || currentSpread.right!.pageNumber - 1 === idx;

              return (
                <button
                  key={pg.id}
                  onClick={() => jumpToPage(idx)}
                  className={`group relative shrink-0 transition-all duration-200 rounded-none overflow-hidden ${
                    isCurrent
                      ? 'ring-2 ring-[#F3C5CD] scale-105 opacity-100'
                      : 'opacity-40 hover:opacity-85 ring-1 ring-[#F3C5CD]/20'
                  }`}
                  title={`Go to Page ${pg.pageNumber}: ${pg.title}`}
                >
                  <div className="w-8 sm:w-10 aspect-[1/1.414] bg-[#FAF6F0] overflow-hidden">
                    <img
                      src={getImageSlot('process', 'sketch', pg.id, pg.imageUrl)}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className={`text-[8px] font-mono text-center tracking-tighter py-0.5 ${
                      isCurrent ? 'bg-[#F3C5CD] text-[#C81D25] font-bold' : 'bg-black/60 text-[#F3C5CD]'
                    }`}
                  >
                    {String(pg.pageNumber).padStart(2, '0')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimal Navigation Hint */}
        <div className="mt-4 text-[10px] font-mono tracking-[0.2em] text-[#F3C5CD]/50 uppercase text-center">
          TIP: USE KEYBOARD ARROWS ← → OR SWIPE TO TURN PAGES
        </div>

      </div>
    </div>
  );
};
