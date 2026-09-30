import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Move,
  Check,
  RotateCcw,
  RotateCw,
  Plus,
  Minus,
  Layers,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Edit3,
  Save,
} from 'lucide-react';
import {
  TextileSwatch,
  TEXTILE_SWATCHES,
  getInitialSwatches,
  saveSingleSwatchRecord,
  normalizeSwatchId,
} from '../data/textileSwatchesData';
import { getImageSlot, getSlotKey } from '../services/imageSlotManager';

interface MagneticNoticeBoardProps {
  onHoverImage?: (label: string | null) => void;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INDEPENDENT MANUAL TRANSFORM DATA FOR EACH SWATCH
// Stores independent x, y, width, scale, rotation, and z-index
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface ManualSwatchTransform {
  left: number; // percentage (0 - 100) of board width
  top: number; // percentage (0 - 100) of board height
  width: number; // percentage of board width
  minWidthPx: number;
  scaleMultiplier: number;
  rotation: number; // degrees
  zIndex: number;
}

const STORAGE_LAYOUT_KEY = 'ritanshi_textile_board_manual_arrangement_v2';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ULTRA-LOW PROFILE NEODYMIUM MINI DISC MAGNET (5–8px)
// Understated, realistic studio-grade metal magnet clamping swatch edge to steel
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const DiscMagnet: React.FC<{
  type?: TextileSwatch['magnetType'];
  className?: string;
  size?: 'sm' | 'md';
}> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-[6.5px] h-[6.5px] sm:w-[7px] sm:h-[7px] rounded-full z-20 pointer-events-none select-none shrink-0 ${className}`}
      style={{
        // Realistic flat brushed-steel / nickel finish with subtle directional gradient
        background:
          'radial-gradient(circle at 35% 30%, #f1f3f5 0%, #cbd1d8 48%, #8d95a1 85%, #606670 100%)',
        // Flat low profile: microscopic beveled edge highlight + soft contact drop shadow
        boxShadow:
          '0 1px 1.5px rgba(0, 0, 0, 0.42), 0 0.5px 0.8px rgba(0, 0, 0, 0.28), inset 0 0.5px 0.5px rgba(255, 255, 255, 0.75), inset 0 -0.5px 0.5px rgba(0, 0, 0, 0.38)',
      }}
    >
      {/* Delicate off-center specular pin-reflection */}
      <div className="absolute top-[1px] left-[1.2px] w-[1.2px] h-[1.2px] rounded-full bg-white/70 blur-[0.15px]" />
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COUNTERSUNK WALL MOUNTING SCREW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const MountingScrew: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`absolute h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full flex items-center justify-center z-10 pointer-events-none select-none ${className}`}
    style={{
      background:
        'radial-gradient(circle at 38% 35%, #f1f3f6 0%, #a2a8b3 55%, #464c56 100%)',
      boxShadow:
        '0 1.5px 4px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.7), inset 0 -1px 1px rgba(0,0,0,0.65)',
    }}
  >
    <div className="h-[1px] w-2 sm:w-2.5 bg-black/70 rotate-45 transform" />
    <div className="h-[1px] w-2 sm:w-2.5 bg-black/70 -rotate-45 transform absolute" />
  </div>
);

// Build default layout map from TEXTILE_SWATCHES
function getDefaultLayoutMap(): Record<string, ManualSwatchTransform> {
  const map: Record<string, ManualSwatchTransform> = {};
  TEXTILE_SWATCHES.forEach((s) => {
    map[s.id] = {
      left: s.position.left,
      top: s.position.top,
      width: s.position.width,
      minWidthPx: s.position.minWidthPx || 160,
      scaleMultiplier: s.position.scaleMultiplier || 1.0,
      rotation: s.tiltDeg || 0,
      zIndex: s.position.zIndex || 10,
    };
  });
  return map;
}

// Load saved layout or fallback to initial defaults
function loadInitialLayouts(): Record<string, ManualSwatchTransform> {
  const defaults = getDefaultLayoutMap();
  try {
    const raw = localStorage.getItem(STORAGE_LAYOUT_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return { ...defaults, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to load saved swatch layout, using defaults', err);
  }
  return defaults;
}

export const MagneticNoticeBoard: React.FC<MagneticNoticeBoardProps> = ({ onHoverImage }) => {
  const [swatches, setSwatches] = useState<TextileSwatch[]>(getInitialSwatches);
  const [selectedSwatchId, setSelectedSwatchId] = useState<string | null>(null);
  const [isFitMode, setIsFitMode] = useState<boolean>(false);
  const [hoveredSwatchId, setHoveredSwatchId] = useState<string | null>(null);

  // ── INLINE MODAL EDITING STATE FOR ACTIVE SWATCH ─────────
  const [isEditingActiveSwatch, setIsEditingActiveSwatch] = useState<boolean>(false);
  const [activeFormData, setActiveFormData] = useState<{
    title: string;
    technique: string;
    material: string;
    process: string;
    description: string;
    observation: string;
  }>({
    title: '',
    technique: '',
    material: '',
    process: '',
    description: '',
    observation: '',
  });

  // ── MANUAL ARRANGE / EDIT BOARD STATE ──────────────────
  const [isArrangeMode, setIsArrangeMode] = useState<boolean>(false);
  const [selectedEditId, setSelectedEditId] = useState<string | null>(null);
  const [swatchLayouts, setSwatchLayouts] = useState<Record<string, ManualSwatchTransform>>(loadInitialLayouts);
  const [isSavedNoticeVisible, setIsSavedNoticeVisible] = useState<boolean>(false);

  const boardContainerRef = useRef<HTMLDivElement>(null);
  const boardPanelRef = useRef<HTMLDivElement>(null);

  // Dragging tracking ref
  const dragStateRef = useRef<{
    isDragging: boolean;
    swatchId: string | null;
    startX: number;
    startY: number;
    initialLeft: number;
    initialTop: number;
    boardWidth: number;
    boardHeight: number;
  }>({
    isDragging: false,
    swatchId: null,
    startX: 0,
    startY: 0,
    initialLeft: 0,
    initialTop: 0,
    boardWidth: 1,
    boardHeight: 1,
  });

  // Save manual layout to localStorage whenever it changes
  const saveLayouts = useCallback((newLayouts: Record<string, ManualSwatchTransform>) => {
    try {
      localStorage.setItem(STORAGE_LAYOUT_KEY, JSON.stringify(newLayouts));
      setIsSavedNoticeVisible(true);
      setTimeout(() => setIsSavedNoticeVisible(false), 1800);
    } catch (e) {
      console.error('Failed to save swatch layout', e);
    }
  }, []);

  // Listen to isolated swatch updates dispatched anywhere in app
  useEffect(() => {
    const handleSwatchUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{
        swatchId: string;
        updates: Partial<TextileSwatch>;
      }>;
      const detail = customEvent.detail;
      if (!detail || !detail.swatchId) return;

      const normId = normalizeSwatchId(detail.swatchId);
      setSwatches((prev) =>
        prev.map((s) => {
          if (normalizeSwatchId(s.id) === normId) {
            return { ...s, ...detail.updates };
          }
          return s;
        })
      );
    };

    window.addEventListener('ritanshi-swatch-updated', handleSwatchUpdate);
    return () => {
      window.removeEventListener('ritanshi-swatch-updated', handleSwatchUpdate);
    };
  }, []);

  // Subscribe to image slot updates so replacing ANY of the 25 swatches updates ONLY that swatch
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
      if (normProject === 'textileexploration' || normProject === 'process') {
        const canonicalId = normalizeSwatchId(detail.imageId);
        setSwatches((prev) =>
          prev.map((swatch) => {
            if (normalizeSwatchId(swatch.id) === canonicalId) {
              return { ...swatch, defaultImage: detail.newImage };
            }
            return swatch;
          })
        );
      }
    };

    window.addEventListener('ritanshi-image-slot-updated', handleSlotUpdate);
    return () => {
      window.removeEventListener('ritanshi-image-slot-updated', handleSlotUpdate);
    };
  }, []);

  // Active swatch is determined strictly by unique ID
  const activeSwatch = selectedSwatchId
    ? swatches.find((s) => normalizeSwatchId(s.id) === normalizeSwatchId(selectedSwatchId)) || null
    : null;

  const activeIndex = activeSwatch
    ? swatches.findIndex((s) => normalizeSwatchId(s.id) === normalizeSwatchId(activeSwatch.id))
    : -1;

  const handlePrev = useCallback(() => {
    if (!selectedSwatchId) return;
    setIsEditingActiveSwatch(false);
    const currIdx = swatches.findIndex(
      (s) => normalizeSwatchId(s.id) === normalizeSwatchId(selectedSwatchId)
    );
    if (currIdx === -1) return;
    const prevIdx = currIdx === 0 ? swatches.length - 1 : currIdx - 1;
    setSelectedSwatchId(swatches[prevIdx].id);
  }, [selectedSwatchId, swatches]);

  const handleNext = useCallback(() => {
    if (!selectedSwatchId) return;
    setIsEditingActiveSwatch(false);
    const currIdx = swatches.findIndex(
      (s) => normalizeSwatchId(s.id) === normalizeSwatchId(selectedSwatchId)
    );
    if (currIdx === -1) return;
    const nextIdx = currIdx === swatches.length - 1 ? 0 : currIdx + 1;
    setSelectedSwatchId(swatches[nextIdx].id);
  }, [selectedSwatchId, swatches]);

  // Keyboard navigation for enlarged modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedSwatchId === null) return;
      if (e.key === 'Escape') {
        setSelectedSwatchId(null);
        setIsEditingActiveSwatch(false);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSwatchId, handlePrev, handleNext]);

  const startEditingActiveSwatch = () => {
    if (!activeSwatch) return;
    setActiveFormData({
      title: activeSwatch.title || '',
      technique: activeSwatch.technique || '',
      material: activeSwatch.material || '',
      process: activeSwatch.process || '',
      description: activeSwatch.description || '',
      observation: activeSwatch.observation || '',
    });
    setIsEditingActiveSwatch(true);
  };

  const handleSaveActiveSwatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSwatch) return;

    const updates: Partial<TextileSwatch> = {
      title: activeFormData.title.trim(),
      technique: activeFormData.technique.trim(),
      material: activeFormData.material.trim(),
      process: activeFormData.process.trim(),
      description: activeFormData.description.trim(),
      observation: activeFormData.observation.trim(),
    };

    // Save strictly to this single swatch ID
    saveSingleSwatchRecord(activeSwatch.id, updates);

    // Update in-memory state for this swatch only
    setSwatches((prev) =>
      prev.map((s) =>
        normalizeSwatchId(s.id) === normalizeSwatchId(activeSwatch.id)
          ? { ...s, ...updates }
          : s
      )
    );

    setIsEditingActiveSwatch(false);
    setIsSavedNoticeVisible(true);
    setTimeout(() => setIsSavedNoticeVisible(false), 2000);
  };

  // ── DRAG & DROP HANDLERS (POINTER EVENTS) ─────────────────
  const handlePointerDown = (e: React.PointerEvent, swatchId: string) => {
    if (!isArrangeMode) return;
    e.stopPropagation();
    setSelectedEditId(swatchId);

    const board = boardPanelRef.current;
    if (!board) return;

    const boardRect = board.getBoundingClientRect();
    const currentTransform = swatchLayouts[swatchId] || {
      left: 10,
      top: 10,
      width: 15,
      minWidthPx: 160,
      scaleMultiplier: 1,
      rotation: 0,
      zIndex: 10,
    };

    dragStateRef.current = {
      isDragging: true,
      swatchId,
      startX: e.clientX,
      startY: e.clientY,
      initialLeft: currentTransform.left,
      initialTop: currentTransform.top,
      boardWidth: boardRect.width,
      boardHeight: boardRect.height,
    };

    // Capture pointer on window to ensure smooth tracking outside swatch
    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!dragStateRef.current.isDragging || !dragStateRef.current.swatchId) return;

      const deltaX = moveEvent.clientX - dragStateRef.current.startX;
      const deltaY = moveEvent.clientY - dragStateRef.current.startY;

      const deltaXPercent = (deltaX / dragStateRef.current.boardWidth) * 100;
      const deltaYPercent = (deltaY / dragStateRef.current.boardHeight) * 100;

      const newLeft = Math.max(0, Math.min(94, dragStateRef.current.initialLeft + deltaXPercent));
      const newTop = Math.max(0, Math.min(94, dragStateRef.current.initialTop + deltaYPercent));

      setSwatchLayouts((prev) => {
        const targetId = dragStateRef.current.swatchId!;
        const existing = prev[targetId];
        if (!existing) return prev;
        return {
          ...prev,
          [targetId]: {
            ...existing,
            left: Math.round(newLeft * 10) / 10,
            top: Math.round(newTop * 10) / 10,
          },
        };
      });
    };

    const handlePointerUp = () => {
      dragStateRef.current.isDragging = false;
      dragStateRef.current.swatchId = null;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      // Persist latest state
      setSwatchLayouts((latest) => {
        saveLayouts(latest);
        return latest;
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // ── INDEPENDENT TRANSFORM CONTROLS ────────────────────────
  const updateSelectedSwatch = (updates: Partial<ManualSwatchTransform>) => {
    if (!selectedEditId) return;
    setSwatchLayouts((prev) => {
      const existing = prev[selectedEditId];
      if (!existing) return prev;
      const updated = {
        ...prev,
        [selectedEditId]: {
          ...existing,
          ...updates,
        },
      };
      saveLayouts(updated);
      return updated;
    });
  };

  const bringToFront = () => {
    if (!selectedEditId) return;
    const allZ = (Object.values(swatchLayouts) as ManualSwatchTransform[]).map((t) => t.zIndex || 10);
    const maxZ = Math.max(...allZ, 10);
    updateSelectedSwatch({ zIndex: maxZ + 1 });
  };

  const sendToBack = () => {
    if (!selectedEditId) return;
    const allZ = (Object.values(swatchLayouts) as ManualSwatchTransform[]).map((t) => t.zIndex || 10);
    const minZ = Math.min(...allZ, 10);
    updateSelectedSwatch({ zIndex: Math.max(1, minZ - 1) });
  };

  const resetAllToDefault = () => {
    if (window.confirm('Reset all 25 swatches to their studio default positions?')) {
      const defaults = getDefaultLayoutMap();
      setSwatchLayouts(defaults);
      saveLayouts(defaults);
      setSelectedEditId(null);
    }
  };

  const selectedLayout = selectedEditId ? swatchLayouts[selectedEditId] : null;
  const selectedSwatchMeta = selectedEditId
    ? swatches.find((s) => s.id === selectedEditId)
    : null;

  return (
    <div className="w-full my-4 animate-in fade-in duration-500">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ATELIER TOOLBAR / ARRANGE BOARD MODE CONTROLS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1 text-xs font-mono tracking-wider text-[#F3C5CD]/90">
        <div className="flex items-center space-x-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isArrangeMode ? 'bg-amber-400 animate-ping' : 'bg-[#F3C5CD] animate-pulse'
            }`}
          />
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#F3C5CD]">
            RITANSHI ATELIER RESEARCH BOARD \ 25 INDEPENDENT SWATCHES
          </span>
          {isSavedNoticeVisible && (
            <span className="ml-3 px-2 py-0.5 bg-emerald-900/80 text-emerald-200 border border-emerald-500/40 text-[9px] uppercase tracking-widest flex items-center gap-1 animate-in fade-in">
              <Check className="h-3 w-3" />
              <span>ARRANGEMENT SAVED</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Arrange Board Mode Toggle Button */}
          <button
            onClick={() => {
              setIsArrangeMode((prev) => !prev);
              setSelectedEditId(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] uppercase font-mono tracking-widest transition-all rounded-[1px] font-semibold ${
              isArrangeMode
                ? 'bg-amber-400 text-black border border-amber-300 shadow-md hover:bg-amber-300'
                : 'bg-black/45 hover:bg-[#F3C5CD]/20 border border-[#F3C5CD]/40 text-[#F3C5CD]'
            }`}
            title={isArrangeMode ? 'Finish and save arrangement' : 'Enter manual drag-and-drop mode'}
          >
            {isArrangeMode ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>DONE ARRANGING</span>
              </>
            ) : (
              <>
                <Move className="h-3.5 w-3.5" />
                <span>ARRANGE BOARD</span>
              </>
            )}
          </button>

          {/* Reset button when in arrange mode */}
          {isArrangeMode && (
            <button
              onClick={resetAllToDefault}
              className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] uppercase font-mono tracking-wider bg-black/40 hover:bg-red-900/50 border border-red-500/40 text-red-300 transition-colors rounded-[1px]"
              title="Reset all swatches to initial layout"
            >
              <RotateCcw className="h-3 w-3" />
              <span>RESET</span>
            </button>
          )}

          {/* Zoom / Viewport toggle for small screens */}
          <button
            onClick={() => setIsFitMode((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase font-mono tracking-widest bg-black/35 hover:bg-[#F3C5CD]/20 border border-[#F3C5CD]/30 text-[#F3C5CD] transition-colors rounded-[1px]"
            title={isFitMode ? 'Expand to 100% detail' : 'Fit full board to view'}
          >
            {isFitMode ? (
              <>
                <ZoomIn className="h-3 w-3" />
                <span>100% DETAIL</span>
              </>
            ) : (
              <>
                <ZoomOut className="h-3 w-3" />
                <span>FIT OVERVIEW</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FLOATING ACTIVE SWATCH EDITING PALETTE (IN ARRANGE MODE)
          Appears when a swatch is clicked in Arrange Mode
          Allows direct manual control of scale, rotation, and layering
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {isArrangeMode && selectedEditId && selectedLayout && (
        <div className="mb-3 p-3 bg-black/90 border border-amber-400/60 shadow-xl rounded-[2px] text-white flex flex-wrap items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-400 text-black text-[10px] font-mono font-bold uppercase tracking-wider">
              EDITING: {selectedSwatchMeta?.number || selectedEditId}
            </span>
            <span className="text-xs font-serif text-neutral-200 truncate max-w-[200px] sm:max-w-none">
              {selectedSwatchMeta?.title}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            {/* SCALE CONTROLS */}
            <div className="flex items-center gap-1.5 bg-neutral-900 px-2 py-1 border border-white/10">
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest mr-1">SIZE:</span>
              <button
                onClick={() =>
                  updateSelectedSwatch({
                    scaleMultiplier: Math.max(0.5, Math.round((selectedLayout.scaleMultiplier - 0.1) * 10) / 10),
                  })
                }
                className="p-1 hover:bg-neutral-800 text-neutral-200 rounded"
                title="Decrease size"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-10 text-center font-bold text-amber-300">
                {Math.round(selectedLayout.scaleMultiplier * 100)}%
              </span>
              <button
                onClick={() =>
                  updateSelectedSwatch({
                    scaleMultiplier: Math.min(2.5, Math.round((selectedLayout.scaleMultiplier + 0.1) * 10) / 10),
                  })
                }
                className="p-1 hover:bg-neutral-800 text-neutral-200 rounded"
                title="Increase size"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            {/* ROTATION CONTROLS */}
            <div className="flex items-center gap-1.5 bg-neutral-900 px-2 py-1 border border-white/10">
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest mr-1">ROTATION:</span>
              <button
                onClick={() =>
                  updateSelectedSwatch({
                    rotation: Math.round(selectedLayout.rotation - 2),
                  })
                }
                className="p-1 hover:bg-neutral-800 text-neutral-200 rounded"
                title="Rotate counter-clockwise 2°"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
              <span className="w-10 text-center font-bold text-amber-300">
                {selectedLayout.rotation > 0 ? `+${selectedLayout.rotation}°` : `${selectedLayout.rotation}°`}
              </span>
              <button
                onClick={() =>
                  updateSelectedSwatch({
                    rotation: Math.round(selectedLayout.rotation + 2),
                  })
                }
                className="p-1 hover:bg-neutral-800 text-neutral-200 rounded"
                title="Rotate clockwise 2°"
              >
                <RotateCw className="h-3 w-3" />
              </button>
              <button
                onClick={() => updateSelectedSwatch({ rotation: 0 })}
                className="text-[9px] px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 uppercase rounded ml-1"
                title="Reset to 0°"
              >
                0°
              </button>
            </div>

            {/* LAYERING CONTROLS */}
            <div className="flex items-center gap-1.5 bg-neutral-900 px-2 py-1 border border-white/10">
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest mr-1">LAYER:</span>
              <button
                onClick={bringToFront}
                className="flex items-center gap-1 px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-[10px] uppercase text-neutral-200 rounded"
                title="Bring to Front"
              >
                <ArrowUp className="h-3 w-3" />
                <span>FRONT</span>
              </button>
              <button
                onClick={sendToBack}
                className="flex items-center gap-1 px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-[10px] uppercase text-neutral-200 rounded"
                title="Send to Back"
              >
                <ArrowDown className="h-3 w-3" />
                <span>BACK</span>
              </button>
            </div>

            {/* DESELECT */}
            <button
              onClick={() => setSelectedEditId(null)}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-neutral-200 text-[10px] uppercase tracking-wider rounded"
            >
              DONE WITH SWATCH
            </button>
          </div>
        </div>
      )}

      {/* ARRANGE MODE INSTRUCTION HINT */}
      {isArrangeMode ? (
        <div className="mb-2 text-center text-[10px] font-mono tracking-widest text-amber-300 uppercase bg-amber-950/40 border border-amber-500/30 py-1 px-3">
          ✦ ARRANGE MODE ACTIVE: CLICK &amp; DRAG ANY SWATCH ANYWHERE • CLICK TO SELECT, RESIZE &amp; ROTATE • POSITIONS ARE SAVED AUTOMATICALLY
        </div>
      ) : (
        <div className="mb-2 flex items-center justify-between text-[9.5px] font-mono tracking-widest text-[#F3C5CD]/70 uppercase px-1">
          <span>CLICK ANY TEXTILE TO INSPECT SPECIFICATIONS</span>
          <span className="hidden sm:inline">USE "ARRANGE BOARD" TO DRAG &amp; REPOSITION SWATCHES</span>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BRUSHED STAINLESS STEEL METAL NOTICE BOARD CONTAINER
          - Fixed comfortable canvas area (no auto-resizing canvas)
          - Cold-rolled brushed metal sheet with subtle texture & screws
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        ref={boardContainerRef}
        className={`w-full overflow-x-auto pb-4 transition-all duration-300 ${
          isFitMode ? 'max-w-full overflow-hidden' : ''
        }`}
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div
          ref={boardPanelRef}
          id="magnetic-notice-board-panel"
          data-board="magnetic-notice-board"
          onClick={() => {
            if (isArrangeMode) {
              setSelectedEditId(null);
            }
          }}
          className={`relative mx-auto rounded-[2px] transition-all duration-300 select-none ${
            isArrangeMode ? 'cursor-default ring-2 ring-amber-400/50' : ''
          }`}
          style={{
            minWidth: isFitMode ? '100%' : '1100px',
            width: isFitMode ? '100%' : '100%',
            maxWidth: '1380px',
            minHeight: isFitMode ? 'auto' : '1080px',
            height: isFitMode ? 'auto' : '1080px',

            // Cold rolled brushed stainless steel / aluminium finish
            background:
              'linear-gradient(132deg, #a8afba 0%, #c4cbd4 12%, #e5eaf0 26%, #b0b7c2 42%, #dbe0e6 60%, #9ba3ae 78%, #b6bec7 100%)',
            boxShadow:
              '0 40px 90px -20px rgba(0, 0, 0, 0.7), 0 16px 36px -6px rgba(0, 0, 0, 0.5), inset 1.5px 1.5px 0 rgba(255, 255, 255, 0.9), inset -1.5px -1.5px 1.5px rgba(0, 0, 0, 0.45), inset 0 0 65px rgba(0, 0, 0, 0.15)',
            border: '1.5px solid #787f8b',
          }}
        >
          {/* Fine horizontal brushed metal hairline texture */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[2px] opacity-35"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(255, 255, 255, 0.28) 3px, transparent 4px), repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0, 0, 0, 0.04) 4px, transparent 5px)',
            }}
          />

          {/* Diagonal specular highlights across the cold sheet */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[2px] opacity-25"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, transparent 35%, rgba(255,255,255,0.4) 62%, transparent 100%)',
            }}
          />

          {/* Perimeter edge darkening */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[2px]"
            style={{
              boxShadow:
                'inset 0 0 50px rgba(0, 0, 0, 0.18), inset 0 0 12px rgba(0, 0, 0, 0.25)',
            }}
          />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              AUTHENTIC COUNTERSUNK MOUNTING SCREWS
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <MountingScrew className="top-3 left-4" />
          <MountingScrew className="top-3 right-4" />
          <MountingScrew className="top-3 left-1/2 -translate-x-1/2" />
          <MountingScrew className="top-1/2 left-4 -translate-y-1/2" />
          <MountingScrew className="top-1/2 right-4 -translate-y-1/2" />
          <MountingScrew className="bottom-3 left-4" />
          <MountingScrew className="bottom-3 right-4" />
          <MountingScrew className="bottom-3 left-1/2 -translate-x-1/2" />

          {/* Subtle Atelier Header Stamp directly on metal */}
          <div className="absolute top-2.5 left-12 pointer-events-none text-[9px] font-mono tracking-[0.28em] text-neutral-800/60 uppercase font-bold">
            RITANSHI ATELIER • TEXTILE &amp; SURFACE RESEARCH BOARD
          </div>
          <div className="absolute bottom-2.5 right-12 pointer-events-none text-[9px] font-mono tracking-[0.25em] text-neutral-800/60 uppercase font-bold">
            ARCHIVE 2026 • 25 INDEPENDENT PHYSICAL SAMPLES
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              EXACTLY 25 SWATCHES — INDEPENDENT FREE-POSITIONING OBJECTS
              - No automatic grid, no automatic packing
              - Completely draggable, scalable, rotatable in Arrange Mode
              - In Visitor Mode, clicking opens modal
              - Direct alpha drop shadow hugs the actual non-transparent pixels
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {swatches.map((swatch, idx) => {
            const slotId = swatch.id;
            const slotKey = getSlotKey('textile-exploration', 'swatch', slotId);
            const currentImageUrl = getImageSlot(
              'textile-exploration',
              'swatch',
              slotId,
              swatch.defaultImage
            );

            // Fetch this swatch's independent transform
            const t = swatchLayouts[swatch.id] || {
              left: swatch.position.left,
              top: swatch.position.top,
              width: swatch.position.width,
              minWidthPx: swatch.position.minWidthPx || 160,
              scaleMultiplier: swatch.position.scaleMultiplier || 1.0,
              rotation: swatch.tiltDeg || 0,
              zIndex: swatch.position.zIndex || 10,
            };

            const isSelectedForEdit = isArrangeMode && selectedEditId === swatch.id;
            const isHovered = hoveredSwatchId === swatch.id;

            return (
              <div
                key={swatch.id}
                onPointerDown={(e) => handlePointerDown(e, swatch.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isArrangeMode) {
                    setSelectedEditId(swatch.id);
                  } else {
                    setSelectedSwatchId(swatch.id);
                    setIsEditingActiveSwatch(false);
                  }
                }}
                onMouseEnter={() => {
                  setHoveredSwatchId(swatch.id);
                  onHoverImage?.(`SWATCH ${swatch.number}`);
                }}
                onMouseLeave={() => {
                  setHoveredSwatchId(null);
                  onHoverImage?.(null);
                }}
                style={{
                  position: 'absolute',
                  top: `${t.top}%`,
                  left: `${t.left}%`,
                  width: `${t.width}%`,
                  minWidth: t.minWidthPx ? `${t.minWidthPx}px` : undefined,
                  zIndex: isSelectedForEdit ? 99 : isHovered ? 50 : t.zIndex,
                  transform: `rotate(${t.rotation}deg) scale(${t.scaleMultiplier})`,
                  transformOrigin: 'top center',
                  touchAction: isArrangeMode ? 'none' : 'auto',
                }}
                className={`group select-none transition-transform duration-150 ${
                  isArrangeMode
                    ? 'cursor-grab active:cursor-grabbing hover:scale-[1.03]'
                    : 'cursor-pointer hover:scale-[1.025]'
                } ${isSelectedForEdit ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-transparent' : ''}`}
              >
                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    MAGNET(S) PINNING THE SWATCH DIRECTLY TO THE METAL
                    Clamped naturally at upper edge / corner of swatch
                    Moves WITH the swatch at all times
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                {swatch.magnetPosition === 'two-top' ? (
                  <>
                    <div className="absolute top-[2.5px] left-3.5 z-30 pointer-events-none">
                      <DiscMagnet />
                    </div>
                    <div className="absolute top-[2.5px] right-3.5 z-30 pointer-events-none">
                      <DiscMagnet />
                    </div>
                  </>
                ) : swatch.magnetPosition === 'top-left' ? (
                  <div className="absolute top-[2.5px] left-3.5 z-30 pointer-events-none">
                    <DiscMagnet />
                  </div>
                ) : swatch.magnetPosition === 'top-right' ? (
                  <div className="absolute top-[2.5px] right-3.5 z-30 pointer-events-none">
                    <DiscMagnet />
                  </div>
                ) : (
                  <div className="absolute top-[2.5px] left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <DiscMagnet />
                  </div>
                )}

                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    RAW TEXTILE IMAGE SITTING DIRECTLY ON METAL
                    NO BOX SHADOW ON CONTAINER. NO OVERFLOW-HIDDEN.
                    Drop-shadow directly on <img> wraps cut-out alpha edges.
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <div
                  className="relative pointer-events-auto"
                  style={swatch.id === 'swatch-04' ? { height: '353.444px' } : undefined}
                >
                  <img
                    id={slotKey}
                    data-project-id="textile-exploration"
                    data-section-id="swatch"
                    data-image-id={slotId}
                    data-slot-id={slotKey}
                    src={currentImageUrl}
                    alt={swatch.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    draggable={false}
                    className={`w-full ${swatch.id === 'swatch-04' ? 'h-full object-contain' : 'h-auto'} block select-none pointer-events-none`}
                    style={{
                      filter: isHovered || isSelectedForEdit
                        ? 'drop-shadow(0 16px 28px rgba(0, 0, 0, 0.55)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.35))'
                        : 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.42)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25))',
                    }}
                  />

                  {/* Visual badges for Arrange mode / Visitor mode */}
                  {isArrangeMode ? (
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 pointer-events-none z-40 whitespace-nowrap">
                      <div className="bg-amber-400 text-black px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider shadow">
                        {swatch.number} • DRAG TO MOVE
                      </div>
                    </div>
                  ) : (
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-40 whitespace-nowrap">
                      <div className="bg-black/90 px-2 py-0.5 text-white border border-white/20 text-[8px] font-mono tracking-widest uppercase flex items-center gap-1 shadow-lg">
                        <Maximize2 className="h-2.5 w-2.5" />
                        <span>{swatch.number} • INSPECT</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ENLARGED LIGHTBOX MODAL (PRECISE TEXTILE DETAILS)
          - Shown in Visitor Mode when clicking any swatch
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeSwatch && !isArrangeMode && (
        <div
          onClick={() => {
            setSelectedSwatchId(null);
            setIsEditingActiveSwatch(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 md:p-10 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden bg-[#18181b] border border-white/15 text-neutral-100 shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedSwatchId(null);
                setIsEditingActiveSwatch(false);
              }}
              className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-black/60 border border-white/20 text-neutral-300 hover:text-white hover:bg-black/90 flex items-center justify-center transition-colors"
              aria-label="Close swatch detail"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left: Raw Textile Photograph (Original Proportions) */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <img
                src={getImageSlot(
                  'textile-exploration',
                  'swatch',
                  activeSwatch.id,
                  activeSwatch.defaultImage
                )}
                alt={activeSwatch.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto max-w-full object-contain shadow-2xl"
              />

              {/* Prev / Next Floating Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/90 flex items-center justify-center transition-colors"
                aria-label="Previous swatch"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/90 flex items-center justify-center transition-colors"
                aria-label="Next swatch"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Right: Curatorial & Craft Specifications */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh] bg-[#121214] border-t md:border-t-0 md:border-l border-white/10">
              {isEditingActiveSwatch ? (
                /* INLINE EDIT FORM — STRICTLY ISOLATED TO THIS SWATCH ID */
                <form onSubmit={handleSaveActiveSwatch} className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                      EDIT SWATCH {activeSwatch.number} ({activeSwatch.id})
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400">
                      PERMANENT PER-ID RECORD
                    </span>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                      Swatch Name / Title
                    </label>
                    <input
                      type="text"
                      value={activeFormData.title}
                      onChange={(e) => setActiveFormData((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full px-2.5 py-1.5 text-xs bg-black/60 border border-white/20 text-white rounded-[1px] focus:outline-none focus:border-amber-400 font-serif"
                      placeholder="e.g. Bleaching on Corduroy"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                        Technique
                      </label>
                      <input
                        type="text"
                        value={activeFormData.technique}
                        onChange={(e) => setActiveFormData((prev) => ({ ...prev, technique: e.target.value }))}
                        className="w-full px-2 py-1.5 text-xs bg-black/60 border border-white/20 text-white rounded-[1px] focus:outline-none focus:border-amber-400"
                        placeholder="Technique name"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                        Material
                      </label>
                      <input
                        type="text"
                        value={activeFormData.material}
                        onChange={(e) => setActiveFormData((prev) => ({ ...prev, material: e.target.value }))}
                        className="w-full px-2 py-1.5 text-xs bg-black/60 border border-white/20 text-white rounded-[1px] focus:outline-none focus:border-amber-400"
                        placeholder="Ground, fibres & threads"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                      Process (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={activeFormData.process}
                      onChange={(e) => setActiveFormData((prev) => ({ ...prev, process: e.target.value }))}
                      className="w-full px-2.5 py-1.5 text-xs bg-black/60 border border-white/20 text-white rounded-[1px] focus:outline-none focus:border-amber-400 resize-none"
                      placeholder="Step-by-step technique process..."
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                      Short Description
                    </label>
                    <textarea
                      rows={3}
                      value={activeFormData.description}
                      onChange={(e) => setActiveFormData((prev) => ({ ...prev, description: e.target.value }))}
                      className="w-full px-2.5 py-1.5 text-xs bg-black/60 border border-white/20 text-white rounded-[1px] focus:outline-none focus:border-amber-400 leading-relaxed"
                      placeholder="Curatorial and craft description..."
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                      Observation
                    </label>
                    <textarea
                      rows={2}
                      value={activeFormData.observation}
                      onChange={(e) => setActiveFormData((prev) => ({ ...prev, observation: e.target.value }))}
                      className="w-full px-2.5 py-1.5 text-xs bg-black/60 border border-white/20 text-white rounded-[1px] focus:outline-none focus:border-amber-400 italic"
                      placeholder="Visual and tactile observations..."
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsEditingActiveSwatch(false)}
                      className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-transparent hover:bg-white/10 text-neutral-300 border border-white/20 rounded-[1px]"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider font-semibold bg-amber-400 hover:bg-amber-300 text-black flex items-center gap-1.5 rounded-[1px] shadow"
                    >
                      <Save className="h-3 w-3" />
                      <span>SAVE TO SWATCH {activeSwatch.number}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* CURATORIAL VIEW MODE */
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
                    <div className="flex items-center gap-2">
                      <span>SWATCH {activeSwatch.number}</span>
                      <button
                        onClick={startEditingActiveSwatch}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-white/10 hover:bg-white/20 text-neutral-200 border border-white/20 text-[9px] tracking-wider transition-colors"
                        title="Edit information for this specific swatch"
                      >
                        <Edit3 className="h-2.5 w-2.5 text-amber-300" />
                        <span>EDIT</span>
                      </button>
                    </div>
                    <span>
                      {activeIndex + 1} OF {swatches.length}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                    {activeSwatch.title}
                  </h2>

                  <div className="pt-2 pb-1 border-y border-white/10 space-y-2">
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="font-mono text-neutral-400 text-[10px] uppercase tracking-wider">
                        TECHNIQUE:
                      </span>
                      <span className="font-medium text-neutral-200 text-right max-w-[65%]">
                        {activeSwatch.technique}
                      </span>
                    </div>

                    {activeSwatch.material && (
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="font-mono text-neutral-400 text-[10px] uppercase tracking-wider">
                          MATERIAL:
                        </span>
                        <span className="text-neutral-300 text-right max-w-[65%]">
                          {activeSwatch.material}
                        </span>
                      </div>
                    )}

                    {activeSwatch.process && (
                      <div className="pt-1 text-xs">
                        <span className="font-mono text-neutral-400 text-[10px] uppercase tracking-wider block mb-1">
                          PROCESS:
                        </span>
                        <p className="text-neutral-300 whitespace-pre-line leading-relaxed text-[11px]">
                          {activeSwatch.process}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                      SHORT DESCRIPTION
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                      {activeSwatch.description}
                    </p>
                  </div>

                  {activeSwatch.observation && (
                    <div className="space-y-1.5 pt-2">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                        OBSERVATION
                      </div>
                      <p className="text-xs text-neutral-400 italic leading-relaxed">
                        "{activeSwatch.observation}"
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrev}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono tracking-widest uppercase text-neutral-300 hover:text-white"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span>PREVIOUS</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono tracking-widest uppercase text-neutral-300 hover:text-white"
                  >
                    <span>NEXT</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 tracking-wider">
                  <span>ARROW KEYS TO NAVIGATE</span>
                  <span>ESC TO CLOSE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
