import React, { useState } from 'react';
import { ProcessItem } from '../types';
import { Maximize2, X, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { getImageSlot, getSlotKey } from '../services/imageSlotManager';
import { MagneticNoticeBoard } from './MagneticNoticeBoard';
import { FashionSketchbook } from './FashionSketchbook';

interface ProcessViewProps {
  items: ProcessItem[];
  onHoverImage: (label: string | null) => void;
}

export const ProcessView: React.FC<ProcessViewProps> = ({ items, onHoverImage }) => {
  // Main state: isTextileExplorationOpen is FALSE by default!
  // The magnetic board will NOT appear automatically when entering Process.
  // ONLY when user clicks "TEXTILE EXPLORATION" does it open!
  const [isTextileExplorationOpen, setIsTextileExplorationOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('SKETCH');
  const [activeItem, setActiveItem] = useState<ProcessItem | null>(null);

  const categories = [
    'SKETCH',
    'TEXTILE EXPLORATION',
    'SUSTAINABLE STUDY',
    'CLO3D',
  ];

  const handleCategoryClick = (cat: string) => {
    if (cat === 'TEXTILE EXPLORATION' || cat === 'Textile Exploration') {
      // User clicked "Textile Exploration" -> Open the Magnetic Board subsection!
      setIsTextileExplorationOpen(true);
      setSelectedCategory('TEXTILE EXPLORATION');
    } else {
      setSelectedCategory(cat);
      setIsTextileExplorationOpen(false);
    }
  };

  const handleBackToProcess = () => {
    setIsTextileExplorationOpen(false);
    setSelectedCategory('SKETCH');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredItems = items
    .filter((item) => {
      // Exclude completely removed options: Moodboard and Material Research
      const cat = item.category?.toLowerCase() || '';
      return !cat.includes('mood') && !cat.includes('material');
    })
    .filter((item) => {
      if (selectedCategory === 'All') return true;

      const itemCat = item.category?.toLowerCase() || '';
      const selCat = selectedCategory.toLowerCase();

      if (selCat === 'sketch' || selCat === 'sketches') {
        return itemCat.includes('sketch');
      }
      if (selCat === 'textile exploration') {
        return itemCat.includes('textile');
      }
      if (selCat === 'sustainable study' || selCat === 'garment development') {
        return itemCat.includes('sustainable') || itemCat.includes('garment');
      }
      if (selCat === 'clo3d' || selCat === 'surface study') {
        return itemCat.includes('clo3d') || itemCat.includes('surface');
      }
      return itemCat === selCat;
    });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SUBSECTION: TEXTILE EXPLORATION MAGNETIC BOARD
  // Opens ONLY when "TEXTILE EXPLORATION" is clicked
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (isTextileExplorationOpen) {
    return (
      <div className="min-h-screen bg-[#C81D25] px-4 sm:px-6 md:px-12 pt-28 pb-24 md:pt-36 animate-in fade-in duration-500 text-[#F3C5CD]">
        <div className="mx-auto max-w-7xl">
          {/* Top Breadcrumb & Return to Process button */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3C5CD]/20 pb-5">
            <button
              onClick={handleBackToProcess}
              className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.2em] uppercase text-[#F3C5CD] hover:text-white bg-black/25 hover:bg-[#F3C5CD]/20 px-4 py-2 border border-[#F3C5CD]/30 transition-all duration-200 group w-fit"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              <span>BACK TO PROCESS</span>
            </button>

            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-[#F3C5CD]/70 uppercase">
              <span className="hover:underline cursor-pointer" onClick={handleBackToProcess}>
                PROCESS
              </span>
              <span>/</span>
              <span className="text-[#F3C5CD] font-bold">TEXTILE EXPLORATION</span>
            </div>
          </div>

          {/* Textile Exploration Section Header & Description */}
          <div className="mb-8 sm:mb-10">
            <span className="text-[11px] font-mono tracking-[0.28em] text-[#F3C5CD]/80 uppercase block">
              TEXTILE EXPLORATION
            </span>
            <h1 className="font-romantic text-4xl sm:text-5xl md:text-6xl font-normal italic tracking-[-0.01em] text-[#F3C5CD] mt-2">
              Material &amp; Surface Archive
            </h1>
            <p className="mt-3 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#F3C5CD]/85 max-w-3xl leading-relaxed">
              research wall — 25 independent textile swatches, surface studies, and hand manipulation samples .
            </p>
          </div>

          {/* THE REAL METAL MAGNETIC NOTICE BOARD (25 SWATCHES) */}
          <MagneticNoticeBoard onHoverImage={onHoverImage} />

          {/* Bottom Return Button */}
          <div className="mt-12 pt-8 border-t border-[#F3C5CD]/20 flex justify-center">
            <button
              onClick={handleBackToProcess}
              className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.2em] uppercase text-[#F3C5CD] hover:text-white bg-black/25 hover:bg-[#F3C5CD]/20 px-6 py-3 border border-[#F3C5CD]/30 transition-all duration-200 group"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              <span>RETURN TO PROCESS ARCHIVE</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // DEFAULT VIEW: PROCESS PAGE CONTENT & ARCHIVE
  // Opens normally when entering Process.
  // Magnetic board is NOT displayed or loaded here.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return (
    <div className="min-h-screen bg-[#C81D25] px-6 md:px-12 pt-32 pb-24 md:pt-40 animate-in fade-in duration-500 text-[#F3C5CD]">
      <div className="mx-auto max-w-7xl">
        {/* Main Process Page Heading */}
        <div className="mb-10 sm:mb-12 border-b border-[#F3C5CD]/20 pb-8">
          <h1 className="font-romantic text-4xl sm:text-5xl md:text-6xl font-normal italic tracking-[-0.01em] text-[#F3C5CD] mt-2">
            Process
          </h1>
        </div>

        {/* Category Filter Bar */}
        <div className="mb-10 pb-6 border-b border-[#F3C5CD]/20">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#F3C5CD]/80 uppercase block">
              PROCESS CATEGORIES
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium tracking-[0.25em] text-[#F3C5CD]/80 uppercase mr-1">
                FILTER:
              </span>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const isTextile = cat === 'TEXTILE EXPLORATION' || cat === 'Textile Exploration';
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-3 py-1.5 text-[10px] font-mono tracking-[0.18em] uppercase transition-all duration-200 border flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#F3C5CD] text-[#C81D25] border-[#F3C5CD] font-bold shadow-xs'
                        : isTextile
                        ? 'bg-black/40 text-[#F3C5CD] border-[#F3C5CD]/40 hover:bg-[#F3C5CD] hover:text-[#C81D25] font-semibold'
                        : 'bg-black/20 text-[#F3C5CD] border-[#F3C5CD]/20 hover:bg-[#F3C5CD]/15 hover:text-white'
                    }`}
                  >
                    {isTextile && <Sparkles className="h-3 w-3" />}
                    <span>{cat}</span>
                    {isTextile && <span className="text-[9px] opacity-80">(BOARD)</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SKETCH SECTION: INTERACTIVE FASHION SKETCHBOOK (14 INDEPENDENT PDF PAGES) */}
        {selectedCategory === 'SKETCH' ? (
          <div className="animate-in fade-in duration-400">
            <FashionSketchbook onHoverImage={onHoverImage} />
          </div>
        ) : (
          <>
            {/* FEATURED BANNER CARD: TEXTILE EXPLORATION (Clicking opens the magnetic board) */}
            <div
              onClick={() => setIsTextileExplorationOpen(true)}
              className="mb-14 p-6 sm:p-8 border border-[#F3C5CD]/30 bg-black/25 hover:bg-black/35 cursor-pointer transition-all duration-300 group hover:border-[#F3C5CD]/60"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[10.5px] font-mono tracking-[0.25em] text-[#F3C5CD]/80 uppercase">
                    <span className="h-2 w-2 rounded-full bg-[#F3C5CD] animate-pulse" />
                    <span>INTERACTIVE ATELIER FEATURE</span>
                  </div>
                  <h2 className="font-romantic text-2xl sm:text-3xl font-normal italic text-[#F3C5CD] group-hover:text-white transition-colors">
                    Textile Exploration — Magnetic Notice Board
                  </h2>
                  <p className="text-xs sm:text-sm font-mono tracking-wider text-[#F3C5CD]/80 max-w-2xl uppercase">
                    Explore  independent textile swatches pinned onto the brushed steel research wall. View fabric manipulations, sujni embroidery, and bleach tests, etc
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.2em] uppercase text-[#C81D25] bg-[#F3C5CD] group-hover:bg-white group-hover:text-[#C81D25] px-5 py-2.5 font-bold transition-all shadow-md">
                    <span>OPEN MAGNETIC BOARD</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>

            {/* Process Items Grid */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item, idx) => {
                const rot =
                  idx % 4 === 0
                    ? '-rotate-0.5'
                    : idx % 4 === 1
                    ? 'rotate-1'
                    : idx % 4 === 2
                    ? '-rotate-1'
                    : 'rotate-0.5';

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    onMouseEnter={() => onHoverImage('INSPECT')}
                    onMouseLeave={() => onHoverImage(null)}
                    className={`group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] ${rot}`}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden editorial-photo-frame ring-1 ring-[#F3C5CD]/10 transition-shadow duration-300 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
                      <img
                        id={getSlotKey('process', item.category, item.id)}
                        data-project-id="process"
                        data-section-id={item.category}
                        data-image-id={item.id}
                        data-slot-id={getSlotKey('process', item.category, item.id)}
                        src={getImageSlot('process', item.category, item.id, item.imageUrl)}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                        <div className="bg-black/40 p-2.5 text-[#F3C5CD] shadow-md group-hover:bg-[#F3C5CD] group-hover:text-[#C81D25] transition-colors border border-[#F3C5CD]/25">
                          <Maximize2 className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col space-y-1.5">
                      <div className="flex items-baseline justify-between text-[10px] font-medium tracking-[0.2em] text-[#F3C5CD]/80 uppercase">
                        <span className="bg-black/25 px-2 py-0.5 text-[9.5px] text-[#F3C5CD] font-medium border border-[#F3C5CD]/20">
                          {item.category === 'Textile Experiment'
                            ? 'Textile Exploration'
                            : item.category === 'Garment Development'
                            ? 'Sustainable Study'
                            : item.category === 'Surface Study'
                            ? 'CLO3D'
                            : item.category}
                        </span>
                        <span className="font-serif italic text-xs tracking-wider">{item.year}</span>
                      </div>
                      <h3 className="font-romantic text-xl font-normal italic text-[#F3C5CD] group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#F3C5CD]/80 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Item Inspect Modal */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-4xl overflow-hidden bg-[#96151B] p-6 shadow-2xl md:p-10 border border-[#F3C5CD]/30 text-[#F3C5CD]"
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 z-10 flex h-8 w-8 items-center justify-center border border-[#F3C5CD]/30 text-[#F3C5CD] transition-all hover:bg-[#F3C5CD] hover:text-[#C81D25]"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="overflow-hidden shadow-lg">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover max-h-[65vh]"
                />
              </div>
              <div className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-[10.5px] font-medium tracking-[0.25em] text-[#F3C5CD]/80 uppercase">
                    {activeItem.category === 'Textile Experiment'
                      ? 'Textile Exploration'
                      : activeItem.category === 'Garment Development'
                      ? 'Sustainable Study'
                      : activeItem.category === 'Surface Study'
                      ? 'CLO3D'
                      : activeItem.category} • {activeItem.year}
                  </div>
                  <h2 className="font-serif text-3xl font-normal text-[#F3C5CD]">
                    {activeItem.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[#F3C5CD]/85">
                    {activeItem.description}
                  </p>
                </div>
                <div className="border-t border-[#F3C5CD]/20 pt-4 text-[10.5px] font-medium tracking-[0.2em] text-[#F3C5CD]/80 uppercase">
                  ATELIER EXPERIMENTATION ARCHIVE
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
