import React, { useState, useEffect } from 'react';
import { ActiveTab, PortfolioData, Project } from './types';
import { initialData } from './data/initialData';
import { CustomCursor } from './components/CustomCursor';
import { HeaderNav } from './components/HeaderNav';
import { VerticalBrandWordmark } from './components/VerticalBrandWordmark';
import { SpatialCanvas } from './components/SpatialCanvas';
import { WorkGalleryView } from './components/WorkGalleryView';
import { ProcessView } from './components/ProcessView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { EditDataModal } from './components/EditDataModal';

const LOCAL_STORAGE_KEY = 'ritanshi_portfolio_data_v18';

export default function App() {
  // Load initial portfolio dataset with localStorage fallback
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved portfolio data, falling back to defaults:', e);
    }
    return initialData;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('index');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Hidden admin access: keyboard shortcut (Ctrl+Shift+E or Cmd+Shift+E) or query param (?admin=true)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setIsEditModalOpen((prev) => !prev);
      }
    };

    if (window.location.search.includes('admin=true')) {
      setIsEditModalOpen(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save updated data
  const handleSaveData = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  // Reset to default data
  const handleResetData = () => {
    if (window.confirm('Reset all portfolio data back to default initial state?')) {
      setData(initialData);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F3E7DB] text-[#821713] antialiased selection:bg-[#EFC0C6] selection:text-[#821713]">
      {/* Ultra-Subtle Editorial Matte Paper Tooth Overlay */}
      <div className="pointer-events-none fixed inset-0 editorial-paper-grain" />

      {/* Global Silver Star Custom Cursor */}
      <CustomCursor hoverLabel={cursorLabel} />

      {/* Persistent Left Vertical Brand Wordmark */}
      <VerticalBrandWordmark
        onNavigateHome={() => {
          setActiveTab('index');
          setSelectedProject(null);
        }}
      />

      {/* Editorial Top Navigation */}
      <HeaderNav
        data={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main View Router with subtle cinematic fade transition */}
      <main className="relative z-10 transition-opacity duration-500">
        {activeTab === 'index' && (
          <SpatialCanvas
            projects={data.projects}
            processItems={data.processItems}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onHoverImage={(label) => setCursorLabel(label)}
          />
        )}

        {activeTab === 'work' && (
          <WorkGalleryView
            projects={data.projects}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onHoverImage={(label) => setCursorLabel(label)}
          />
        )}

        {activeTab === 'process' && (
          <ProcessView
            items={data.processItems}
            onHoverImage={(label) => setCursorLabel(label)}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            data={data}
            onNavigateContact={() => setActiveTab('contact')}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView data={data} />
        )}
      </main>

      {/* Editorial Project Case Study Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          allProjects={data.projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Discreet Admin Edit Data Modal (Triggered via Ctrl+Shift+E or ?admin=true) */}
      {isEditModalOpen && (
        <EditDataModal
          data={data}
          onSave={handleSaveData}
          onReset={handleResetData}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
