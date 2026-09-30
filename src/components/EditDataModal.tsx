import React, { useState } from 'react';
import { PortfolioData, Project, ProcessItem } from '../types';
import { X, Save, RotateCcw, Plus, Trash2, Code, FileText } from 'lucide-react';

interface EditDataModalProps {
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
  onClose: () => void;
}

export const EditDataModal: React.FC<EditDataModalProps> = ({
  data,
  onSave,
  onReset,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'json'>('form');
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [jsonText, setJsonText] = useState<string>(JSON.stringify(data, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleSaveForm = () => {
    onSave(formData);
    onClose();
  };

  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonError(null);
      onSave(parsed);
      onClose();
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON syntax');
    }
  };

  // Helper to add a new blank project
  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      number: `0${formData.projects.length + 1}`,
      title: 'NEW FASHION COLLECTION',
      year: new Date().getFullYear().toString(),
      category: 'Fashion Collection / Concept Development',
      tagline: 'Short tagline describing the collection concept.',
      description: 'Full description of the collection...',
      concept: 'Creative concept details...',
      research: 'Archival research details...',
      processDetails: 'Pattern drafting and material manipulation details...',
      outcome: 'Collection garments and presentation results...',
      coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'
      ],
      tags: ['New Collection', 'Fashion'],
    };

    const updated = { ...formData, projects: [...formData.projects, newProj] };
    setFormData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
  };

  // Helper to remove project
  const handleRemoveProject = (id: string) => {
    const updated = {
      ...formData,
      projects: formData.projects.filter((p) => p.id !== id),
    };
    setFormData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
  };

  // Helper to update project field
  const handleUpdateProject = (id: string, field: keyof Project, val: any) => {
    const updated = {
      ...formData,
      projects: formData.projects.map((p) => (p.id === id ? { ...p, [field]: val } : p)),
    };
    setFormData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#821713]/60 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex h-[90vh] w-full max-w-5xl flex-col rounded-2xl bg-[#F3E7DB] text-[#821713] shadow-2xl overflow-hidden border border-[#992511]/20">
        
        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#992511]/15 px-6 py-4 bg-[#F0E7DE]">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#821713]">Portfolio Data Central</h2>
            <p className="text-xs text-[#992511]">Modify bio, projects, process items, and links in real-time.</p>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Switcher */}
            <div className="flex items-center rounded-lg bg-[#F3E7DB] p-1 border border-[#992511]/20">
              <button
                onClick={() => setActiveTab('form')}
                className={`flex items-center space-x-1 rounded px-3 py-1 text-xs font-semibold ${
                  activeTab === 'form' ? 'bg-[#821713] text-[#F3E7DB]' : 'text-[#821713]'
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Form Mode</span>
              </button>
              <button
                onClick={() => setActiveTab('json')}
                className={`flex items-center space-x-1 rounded px-3 py-1 text-xs font-semibold ${
                  activeTab === 'json' ? 'bg-[#821713] text-[#F3E7DB]' : 'text-[#821713]'
                }`}
              >
                <Code className="h-3.5 w-3.5" />
                <span>Raw JSON</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#821713] text-[#F3E7DB] hover:bg-[#992511] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'form' ? (
            <div className="space-y-8">
              
              {/* Identity & Bio */}
              <div className="rounded-xl border border-[#992511]/15 bg-[#F0E7DE] p-6 space-y-4 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-[#821713]">1. General Identity &amp; Bio</h3>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase text-[#992511]">Designer Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#992511]/20 bg-[#F3E7DB] px-3 py-2 text-sm font-medium text-[#821713]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-[#992511]">Title / Subtitle</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#992511]/20 bg-[#F3E7DB] px-3 py-2 text-sm font-medium text-[#821713]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-[#992511]">Tagline Manifesto</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#992511]/20 bg-[#F3E7DB] px-3 py-2 text-sm font-medium text-[#821713]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-[#992511]">Main Biography</label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#992511]/20 bg-[#F3E7DB] px-3 py-2 text-sm font-medium text-[#821713]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="text-xs font-semibold uppercase text-[#992511]">Email</label>
                    <input
                      type="text"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#992511]/20 bg-[#F3E7DB] px-3 py-2 text-sm text-[#821713]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-[#992511]">Instagram</label>
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#992511]/20 bg-[#F3E7DB] px-3 py-2 text-sm text-[#821713]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-[#992511]">LinkedIn</label>
                    <input
                      type="text"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#992511]/20 bg-[#F3E7DB] px-3 py-2 text-sm text-[#821713]"
                    />
                  </div>
                </div>
              </div>

              {/* Projects List Editor */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-[#821713]">2. Portfolio Projects ({formData.projects.length})</h3>
                  <button
                    onClick={handleAddProject}
                    className="flex items-center space-x-1.5 rounded-lg bg-[#821713] px-3 py-1.5 text-xs font-semibold text-[#F3E7DB] hover:bg-[#992511] transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>ADD NEW PROJECT</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {formData.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="rounded-xl border border-[#992511]/15 bg-[#F0E7DE] p-5 space-y-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between border-b border-[#992511]/10 pb-3">
                        <span className="font-serif text-lg font-bold text-[#821713]">
                          {proj.number} — {proj.title}
                        </span>
                        <button
                          onClick={() => handleRemoveProject(proj.id)}
                          className="flex items-center space-x-1 rounded text-xs font-semibold text-rose-700 hover:bg-rose-100 p-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <label className="text-[11px] font-semibold text-[#992511]">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
                            className="mt-1 w-full rounded border border-[#992511]/20 bg-[#F3E7DB] px-2.5 py-1.5 text-xs text-[#821713]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-[#992511]">Category</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={(e) => handleUpdateProject(proj.id, 'category', e.target.value)}
                            className="mt-1 w-full rounded border border-[#992511]/20 bg-[#F3E7DB] px-2.5 py-1.5 text-xs text-[#821713]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-[#992511]">Year</label>
                          <input
                            type="text"
                            value={proj.year}
                            onChange={(e) => handleUpdateProject(proj.id, 'year', e.target.value)}
                            className="mt-1 w-full rounded border border-[#992511]/20 bg-[#F3E7DB] px-2.5 py-1.5 text-xs text-[#821713]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#992511]">Cover Image URL</label>
                        <input
                          type="text"
                          value={proj.coverImage}
                          onChange={(e) => handleUpdateProject(proj.id, 'coverImage', e.target.value)}
                          className="mt-1 w-full rounded border border-[#992511]/20 bg-[#F3E7DB] px-2.5 py-1.5 text-xs font-mono text-[#821713]"
                        />
                      </div>

                      {proj.moodBoardImage !== undefined && (
                        <div>
                          <label className="text-[11px] font-semibold text-[#992511]">Mood Board Image URL</label>
                          <input
                            type="text"
                            value={proj.moodBoardImage || ''}
                            onChange={(e) => handleUpdateProject(proj.id, 'moodBoardImage', e.target.value)}
                            className="mt-1 w-full rounded border border-[#992511]/20 bg-[#F3E7DB] px-2.5 py-1.5 text-xs font-mono text-[#821713]"
                          />
                        </div>
                      )}

                      <div>
                        <label className="text-[11px] font-semibold text-[#992511]">Overview Description</label>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)}
                          className="mt-1 w-full rounded border border-[#992511]/20 bg-[#F3E7DB] px-2.5 py-1.5 text-xs text-[#821713]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* JSON Raw Editor */
            <div className="h-full flex flex-col space-y-3">
              {jsonError && (
                <div className="rounded-lg bg-rose-100 p-3 text-xs font-medium text-rose-800">
                  JSON Error: {jsonError}
                </div>
              )}
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="h-[60vh] w-full rounded-xl border border-[#992511]/20 bg-[#821713] p-4 text-xs font-mono text-[#F3E7DB] focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between border-t border-[#992511]/15 px-6 py-4 bg-[#F0E7DE]">
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 rounded-lg border border-rose-300 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-800 hover:bg-rose-100"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>RESET TO DEFAULTS</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="rounded-lg border border-[#992511]/25 px-4 py-2 text-xs font-semibold text-[#821713] hover:bg-[#821713]/10"
            >
              Cancel
            </button>
            <button
              onClick={activeTab === 'form' ? handleSaveForm : handleSaveJson}
              className="flex items-center space-x-2 rounded-lg bg-[#821713] px-5 py-2 text-xs font-semibold text-[#F3E7DB] hover:bg-[#992511] transition-colors shadow-md"
            >
              <Save className="h-3.5 w-3.5" />
              <span>SAVE &amp; APPLY DATA</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
