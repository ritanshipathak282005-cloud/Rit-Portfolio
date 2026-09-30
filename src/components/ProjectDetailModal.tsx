import React, { useEffect } from 'react';
import { Project, DarkSafariBoards } from '../types';
import { ArrowLeft, X } from 'lucide-react';
import acidStarBgImg from '../assets/images/acid_star_bg.jpg';
import { DarkSafariPresentation } from './DarkSafariPresentation';
import { AcidStarPresentation } from './AcidStarPresentation';
import { GothicDebutantePresentation } from './GothicDebutantePresentation';
import { NocturnalPresentation } from './NocturnalPresentation';
import { CrimsonStaticPresentation } from './CrimsonStaticPresentation';
import { AbsurdismPresentation } from './AbsurdismPresentation';
import { getImageSlot, getSlotKey } from '../services/imageSlotManager';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
  onUpdateProject?: (project: Project) => void;
  allProjects?: Project[];
  initialSection?: string | null;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject,
  onUpdateProject,
  allProjects = [],
  initialSection,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (initialSection) {
      const scrollTimer = setTimeout(() => {
        const el = document.getElementById(initialSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
      return () => clearTimeout(scrollTimer);
    }
  }, [initialSection, project]);

  if (!project) return null;

  const isDarkSafari =
    project.id === 'proj-6' ||
    project.number === '06' ||
    project.title.toLowerCase().includes('dark safari');

  const isAcidStar =
    project.id === 'proj-3' ||
    project.number === '03' ||
    project.title.toLowerCase().includes('acid star');

  const isGothicDebutante =
    project.id === 'proj-4' ||
    project.number === '04' ||
    project.title.toLowerCase().includes('gothic debutante');

  const isNocturnal =
    project.id === 'proj-5' ||
    project.number === '05' ||
    project.title.toLowerCase().includes('nocturnal');

  const isCrimsonStatic =
    project.id === 'proj-1' ||
    project.number === '01' ||
    project.title.toLowerCase().includes('crimson static') ||
    project.title.toLowerCase().includes('martini');

  const isAbsurdism =
    project.id === 'proj-2' ||
    project.number === '02' ||
    project.title.toLowerCase().includes('absurdism') ||
    project.title.toLowerCase().includes('bleached heritage');

  const isDarkTheme =
    isDarkSafari || isAcidStar || isGothicDebutante || isNocturnal || isCrimsonStatic || isAbsurdism;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex !== -1 && allProjects.length > 0
      ? allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length]
      : null;
  const nextProject =
    currentIndex !== -1 && allProjects.length > 0
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-300 ${
        isDarkSafari
          ? 'bg-[#2B1B17] text-[#F3C5CD]'
          : isAcidStar
          ? 'text-[#F3C5CD]'
          : isGothicDebutante
          ? 'bg-[#000000] text-[#F3C5CD]'
          : isNocturnal
          ? 'bg-[#181515] text-[#F3C5CD]'
          : isCrimsonStatic
          ? 'bg-[#C81D25] text-[#F3C5CD]'
          : isAbsurdism
          ? 'bg-[#111215] text-[#F3C5CD]'
          : 'bg-[#F3E7DB] text-[#821713]'
      }`}
    >
      {!isDarkTheme && (
        <div className="pointer-events-none fixed inset-0 editorial-paper-grain" />
      )}

      {isAcidStar && (
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${acidStarBgImg})` }}
          aria-hidden="true"
        />
      )}

      {/* Sticky Modal Top Bar */}
      <div
        className={`sticky top-0 z-40 flex items-center justify-between border-b pl-14 sm:pl-20 md:pl-28 lg:pl-32 pr-6 py-5 backdrop-blur-md md:pr-16 ${
          isDarkSafari
            ? 'border-[#F3C5CD]/20 bg-[#2B1B17]/95 text-[#F3C5CD]'
            : isAcidStar
            ? 'border-[#F3C5CD]/20 bg-black/20 text-[#F3C5CD]'
            : isGothicDebutante
            ? 'border-[#F3C5CD]/20 bg-black/90 text-[#F3C5CD]'
            : isNocturnal
            ? 'border-[#F3C5CD]/20 bg-black/30 text-[#F3C5CD]'
            : isCrimsonStatic
            ? 'border-[#F3C5CD]/20 bg-[#C81D25]/95 text-[#F3C5CD]'
            : isAbsurdism
            ? 'border-[#F3C5CD]/20 bg-black/30 text-[#F3C5CD]'
            : 'border-[#992511]/25 bg-[#F3E7DB]/95 text-[#821713]'
        }`}
      >
        <button
          onClick={onClose}
          className={`flex items-center space-x-2 text-[11px] font-medium tracking-[0.22em] uppercase transition-colors ${
            isDarkTheme
              ? 'text-[#F3C5CD] hover:text-white'
              : 'text-[#821713] hover:text-[#992511]'
          }`}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>RETURN TO ARCHIVE</span>
        </button>

        <div
          className={`hidden font-serif text-base font-normal tracking-wide md:block ${
            isDarkTheme
              ? 'text-[#F3C5CD]'
              : 'text-[#821713]'
          }`}
        >
          {project.number} — {project.title}
        </div>

        <button
          onClick={onClose}
          className={`flex h-8 w-8 items-center justify-center border transition-all ${
            isDarkTheme
              ? 'border-[#F3C5CD]/30 text-[#F3C5CD] hover:bg-[#F3C5CD]/20 hover:text-white'
              : 'border-[#992511]/25 text-[#821713] hover:bg-[#EFC0C6] hover:text-[#821713]'
          }`}
          aria-label="Close project detail"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <article
        className={`relative z-20 mx-auto max-w-6xl xl:max-w-7xl px-6 md:px-12 ${
          isDarkTheme
            ? 'py-8 md:py-14'
            : 'py-16 md:py-24'
        }`}
      >
        {isDarkSafari ? (
          <DarkSafariPresentation
            project={project}
            onUpdateBoards={(b) => {
              if (onUpdateProject) onUpdateProject({ ...project, boards: b });
            }}
          />
        ) : isAcidStar ? (
          <AcidStarPresentation
            project={project}
            onUpdateBoards={(b) => {
              if (onUpdateProject) onUpdateProject({ ...project, boards: b });
            }}
          />
        ) : isAbsurdism ? (
          <AbsurdismPresentation
            project={project}
            onUpdateBoards={(b) => {
              if (onUpdateProject) onUpdateProject({ ...project, boards: b });
            }}
          />
        ) : isGothicDebutante ? (
          <GothicDebutantePresentation
            project={project}
            onUpdateBoards={(b) => {
              if (onUpdateProject) onUpdateProject({ ...project, boards: b });
            }}
          />
        ) : isNocturnal ? (
          <NocturnalPresentation
            project={project}
            onUpdateBoards={(b) => {
              if (onUpdateProject) onUpdateProject({ ...project, boards: b });
            }}
          />
        ) : isCrimsonStatic ? (
          <CrimsonStaticPresentation
            project={project}
            onUpdateBoards={(b) => {
              if (onUpdateProject) onUpdateProject({ ...project, boards: b });
            }}
          />
        ) : (
          <>
            <div
              className={`mb-16 border-b pb-14 ${
                isDarkSafari ? 'border-[#EFC0C6]/25' : 'border-[#992511]/25'
              }`}
            >
              <h1
                className={`font-romantic text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal italic tracking-[-0.02em] leading-[1.04] ${
                  isDarkSafari
                    ? 'text-[#F3E7DB] selection:bg-[#EFC0C6]/40'
                    : 'text-[#821713] selection:bg-[#EFC0C6]/50'
                }`}
              >
                {project.title}
              </h1>
              <p
                id="project-detail-tagline"
                className={`mt-8 max-w-3xl font-serif text-2xl md:text-3xl font-light leading-relaxed italic whitespace-pre-line ${
                  isDarkSafari ? 'text-[#EDE4DC]/90' : 'text-[#821713]/85'
                }`}
              >
                "{project.tagline}"
              </p>
            </div>

            <div className="mb-20 overflow-hidden editorial-photo-frame ring-1 ring-[#821713]/10">
              <img
                id={getSlotKey(project.id, 'case-study-hero', 'image')}
                data-project-id={project.id}
                data-section-id="case-study-hero"
                data-image-id="image"
                data-slot-id={getSlotKey(project.id, 'case-study-hero', 'image')}
                src={getImageSlot(project.id, 'case-study-hero', 'image', project.coverImage)}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="h-auto w-full max-h-[85vh] object-cover"
              />
            </div>

            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12 items-baseline border-b pb-12 opacity-95">
              <div className="md:col-span-8">
                <span
                  className={`text-[10.5px] font-medium tracking-[0.25em] uppercase block mb-3 ${
                    isDarkSafari ? 'text-[#EFC0C6]' : 'text-[#992511]'
                  }`}
                >
                  ATELIER BRIEF &amp; SUMMARY
                </span>
                <p
                  className={`text-lg md:text-xl font-serif font-light leading-relaxed ${
                    isDarkSafari ? 'text-[#E0D5CC]' : 'text-[#821713]/90'
                  }`}
                >
                  {project.description}
                </p>
              </div>
              <div className="md:col-span-4 flex flex-wrap gap-2 items-center justify-start md:justify-end">
                <div
                  className={`px-3 py-1.5 text-[10.5px] font-mono tracking-widest uppercase border ${
                    isDarkSafari
                      ? 'border-[#EFC0C6]/30 bg-[#221714] text-[#F3E7DB]'
                      : 'border-[#992511]/20 bg-[#F0E7DE] text-[#821713]'
                  }`}
                >
                  LOOK {project.number} • {project.year}
                </div>
                <div
                  className={`px-3 py-1.5 text-[10.5px] font-mono tracking-widest uppercase border ${
                    isDarkSafari
                      ? 'border-[#EFC0C6]/30 bg-[#221714] text-[#EFC0C6]'
                      : 'border-[#992511]/20 bg-[#F0E7DE] text-[#992511]'
                  }`}
                >
                  {project.category}
                </div>
              </div>
            </div>

            <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-4">
                <span
                  className={`text-[10.5px] font-medium tracking-[0.25em] uppercase block ${
                    isDarkSafari ? 'text-[#EFC0C6]' : 'text-[#992511]'
                  }`}
                >
                  01 • CONCEPT &amp; INSPIRATION
                </span>
                <h2
                  className={`font-serif text-3xl md:text-4xl font-normal ${
                    isDarkSafari ? 'text-[#F3E7DB]' : 'text-[#821713]'
                  }`}
                >
                  Structural Intent
                </h2>
                <p
                  className={`text-sm md:text-base leading-relaxed font-light ${
                    isDarkSafari ? 'text-[#E0D5CC]' : 'text-[#821713]/90'
                  }`}
                >
                  {project.concept}
                </p>
              </div>

              <div className="space-y-4">
                <span
                  className={`text-[10.5px] font-medium tracking-[0.25em] uppercase block ${
                    isDarkSafari ? 'text-[#EFC0C6]' : 'text-[#992511]'
                  }`}
                >
                  02 • TEXTILE &amp; ARCHIVAL RESEARCH
                </span>
                <h2
                  className={`font-serif text-3xl md:text-4xl font-normal ${
                    isDarkSafari ? 'text-[#F3E7DB]' : 'text-[#821713]'
                  }`}
                >
                  Material Memory
                </h2>
                <p
                  className={`text-sm md:text-base leading-relaxed font-light ${
                    isDarkSafari ? 'text-[#E0D5CC]' : 'text-[#821713]/90'
                  }`}
                >
                  {project.research}
                </p>
              </div>
            </div>

            <div className="mb-24 grid grid-cols-1 gap-12 md:grid-cols-2 border-t pt-16">
              <div className="space-y-4">
                <span
                  className={`text-[10.5px] font-medium tracking-[0.25em] uppercase block ${
                    isDarkSafari ? 'text-[#EFC0C6]' : 'text-[#992511]'
                  }`}
                >
                  03 • PROCESS &amp; CONSTRUCTION
                </span>
                <h2
                  className={`font-serif text-3xl md:text-4xl font-normal ${
                    isDarkSafari ? 'text-[#F3E7DB]' : 'text-[#821713]'
                  }`}
                >
                  Pattern &amp; Tension
                </h2>
                <p
                  className={`text-sm md:text-base leading-relaxed font-light ${
                    isDarkSafari ? 'text-[#E0D5CC]' : 'text-[#821713]/90'
                  }`}
                >
                  {project.processDetails}
                </p>
              </div>

              <div className="space-y-4">
                <span
                  className={`text-[10.5px] font-medium tracking-[0.25em] uppercase block ${
                    isDarkSafari ? 'text-[#EFC0C6]' : 'text-[#992511]'
                  }`}
                >
                  04 • FINAL FORM &amp; OUTCOME
                </span>
                <h2
                  className={`font-serif text-3xl md:text-4xl font-normal ${
                    isDarkSafari ? 'text-[#F3E7DB]' : 'text-[#821713]'
                  }`}
                >
                  Atelier Execution
                </h2>
                <p
                  className={`text-sm md:text-base leading-relaxed font-light ${
                    isDarkSafari ? 'text-[#E0D5CC]' : 'text-[#821713]/90'
                  }`}
                >
                  {project.outcome}
                </p>
              </div>
            </div>

            {project.galleryImages.length > 0 && (
              <div
                className={`mb-24 border-t pt-16 ${
                  isDarkSafari ? 'border-[#EFC0C6]/25' : 'border-[#992511]/25'
                }`}
              >
                <span
                  className={`text-[11px] font-medium tracking-[0.25em] uppercase block mb-8 ${
                    isDarkSafari ? 'text-[#EFC0C6]' : 'text-[#992511]'
                  }`}
                >
                  VISUAL ARCHIVE &amp; DETAIL STUDIES
                </span>
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                  {project.galleryImages.map((imgUrl, gIdx) => (
                    <div
                      key={gIdx}
                      className="overflow-hidden editorial-photo-frame ring-1 ring-[#821713]/10 transition-transform duration-500 hover:scale-[1.01]"
                    >
                      <img
                        id={getSlotKey(project.id, 'gallery', `image-${gIdx + 1}`)}
                        data-project-id={project.id}
                        data-section-id="gallery"
                        data-image-id={`image-${gIdx + 1}`}
                        data-slot-id={getSlotKey(project.id, 'gallery', `image-${gIdx + 1}`)}
                        src={getImageSlot(project.id, 'gallery', `image-${gIdx + 1}`, imgUrl)}
                        alt={`${project.title} archive detail ${gIdx + 1}`}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {(prevProject || nextProject) && (
          <div
            className={`border-t pt-12 ${
              isDarkTheme
                ? 'border-[#F3C5CD]/20'
                : 'border-[#992511]/25'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {prevProject ? (
                <button
                  onClick={() => onSelectProject && onSelectProject(prevProject)}
                  className="group flex flex-col items-start py-6 text-left transition-colors hover:opacity-80 w-full"
                >
                  <span
                    className={`text-[10.5px] font-medium tracking-[0.25em] uppercase block mb-3 ${
                      isDarkTheme
                        ? 'text-[#F3C5CD]/70'
                        : 'text-[#992511]'
                    }`}
                  >
                    PREVIOUS CASE STUDY
                  </span>
                  <div className="flex items-baseline justify-between w-full">
                    <div>
                      <span
                        className={`text-xs font-medium tracking-widest uppercase block mb-1 ${
                          isDarkTheme
                            ? 'text-[#F3C5CD]/70'
                            : 'text-[#992511]'
                        }`}
                      >
                        {prevProject.number}
                      </span>
                      <h3
                        className={`font-serif text-3xl sm:text-4xl font-normal transition-colors ${
                          isDarkTheme
                            ? 'text-[#F3C5CD] group-hover:text-white'
                            : 'text-[#821713] group-hover:text-[#992511]'
                        }`}
                      >
                        {prevProject.title}
                      </h3>
                    </div>
                    <ArrowLeft
                      className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:-translate-x-1 self-center ${
                        isDarkTheme
                          ? 'text-[#F3C5CD] group-hover:text-white'
                          : 'text-[#821713] group-hover:text-[#992511]'
                      }`}
                    />
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextProject && (
                <button
                  onClick={() => onSelectProject && onSelectProject(nextProject)}
                  className={`group flex flex-col items-start md:items-end py-6 text-left md:text-right transition-colors hover:opacity-80 w-full border-t md:border-t-0 pt-6 md:pt-6 ${
                    isDarkTheme
                      ? 'border-[#F3C5CD]/15'
                      : 'border-[#992511]/15'
                  }`}
                >
                  <span
                    className={`text-[10.5px] font-medium tracking-[0.25em] uppercase block mb-3 ${
                      isDarkTheme
                        ? 'text-[#F3C5CD]/70'
                        : 'text-[#992511]'
                    }`}
                  >
                    NEXT CASE STUDY
                  </span>
                  <div className="flex items-baseline justify-between w-full md:flex-row-reverse">
                    <div>
                      <span
                        className={`text-xs font-medium tracking-widest uppercase block mb-1 ${
                          isDarkTheme
                            ? 'text-[#F3C5CD]/70'
                            : 'text-[#992511]'
                        }`}
                      >
                        {nextProject.number}
                      </span>
                      <h3
                        className={`font-serif text-3xl sm:text-4xl font-normal transition-colors ${
                          isDarkTheme
                            ? 'text-[#F3C5CD] group-hover:text-white'
                            : 'text-[#821713] group-hover:text-[#992511]'
                        }`}
                      >
                        {nextProject.title}
                      </h3>
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
