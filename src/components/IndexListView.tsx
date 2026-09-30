import React, { useState } from 'react';
import { Project } from '../types';
import { ArrowUpRight, List } from 'lucide-react';

interface IndexListViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onHoverImage: (label: string | null) => void;
}

export const IndexListView: React.FC<IndexListViewProps> = ({
  projects,
  onSelectProject,
  onHoverImage,
}) => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#F3E7DB] pl-14 sm:pl-20 md:pl-28 lg:pl-32 pr-6 md:pr-16 pt-28 pb-20 md:pt-36 animate-in fade-in duration-500"
    >
      <div className="mx-auto max-w-6xl">
        
        {/* Header Title */}
        <div className="mb-12 border-b border-[#992511]/20 pb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-widest text-[#992511] uppercase">
              <List className="h-3.5 w-3.5" />
              <span>COLLECTION DIRECTORY</span>
            </div>
            <h1 className="mt-3 font-serif text-5xl font-normal text-[#821713] md:text-7xl">
              RITANSHI Archive
            </h1>
          </div>
          <span className="hidden text-xs font-semibold tracking-widest text-[#992511] uppercase md:block">
            {projects.length} PROJECTS RECORDED
          </span>
        </div>

        {/* Project Directory Table / Editorial List */}
        <div className="divide-y divide-[#992511]/15">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              onMouseEnter={() => {
                setHoveredProject(proj);
                onHoverImage('VIEW CASE STUDY');
              }}
              onMouseLeave={() => {
                setHoveredProject(null);
                onHoverImage(null);
              }}
              className="group cursor-pointer py-8 transition-colors duration-200 hover:bg-[#F0E7DE] px-4 rounded-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                
                {/* Number & Title */}
                <div className="flex items-baseline space-x-6">
                  <span className="font-serif text-xl text-[#992511] group-hover:text-[#821713]">
                    {proj.number}
                  </span>
                  <h2 className="font-serif text-3xl font-normal text-[#821713] transition-transform duration-300 group-hover:translate-x-2 md:text-4xl lg:text-5xl">
                    {proj.title}
                  </h2>
                </div>

                {/* Category & Tags & Action */}
                <div className="flex items-center justify-between md:justify-end space-x-6">
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-semibold tracking-wider text-[#821713] uppercase">
                      {proj.category}
                    </span>
                    <span className="text-[11px] text-[#992511]">{proj.year}</span>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#992511]/25 text-[#821713] transition-all duration-300 group-hover:bg-[#821713] group-hover:text-[#F3E7DB] group-hover:scale-110">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Floating Image Preview near Cursor on Hover */}
      {hoveredProject && (
        <div
          className="pointer-events-none fixed z-30 hidden -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-2xl transition-opacity duration-200 md:block"
          style={{
            left: `${mousePos.x + 120}px`,
            top: `${mousePos.y}px`,
            width: '280px',
            height: '380px',
          }}
        >
          <img
            src={hoveredProject.coverImage}
            alt={hoveredProject.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover animate-in fade-in zoom-in-95 duration-200"
          />
        </div>
      )}
    </div>
  );
};
