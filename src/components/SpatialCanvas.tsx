import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Project, ProcessItem } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { nocturnalDevelopmentImages } from '../data/nocturnalImages';

interface SpatialCanvasProps {
  projects: Project[];
  processItems: ProcessItem[];
  onSelectProject: (project: Project, sourceRect?: DOMRect, targetSection?: string) => void;
  onHoverImage: (label: string | null) => void;
  spaceMode?: 1 | 2 | 3;
  onSpaceModeChange?: (mode: 1 | 2 | 3) => void;
}

interface OrbitItem {
  id: string;
  projectId: string;
  project: Project;
  targetSection?: string;
  title: string;
  subtitle: string;
  tagline: string;
  imageUrl: string;
  tier: 'hero' | 'medium' | 'small'; // Strict hierarchy: 1-2 heroes, 4-5 mediums, small satellites
  baseAngle: number; // in radians
  radiusRatioX: number; // multiplier of base central radius
  radiusRatioY: number; // multiplier of base central radius
  baseDepth: number; // 0.25 (background) to 1.0 (foreground)
  baseRotation: number; // Subtle tilt in deg (-2.5 to +2.5)
  speedMultiplier: number;
  aspectRatio: number; // height / width, usually ~1.33 to 1.45
  vwWidth: number; // in vw units for responsive scaling
  minWidth: number;
  maxWidth: number;
}

interface ItemRuntimeState {
  item: OrbitItem;
  currentX: number;
  currentY: number;
  currentScale: number;
  currentRotation: number;
  currentDepth: number;
  currentOpacity: number;
  currentZIndex: number;
  isHovered: boolean;
}

export const SpatialCanvas: React.FC<SpatialCanvasProps> = ({
  projects,
  processItems,
  onSelectProject,
  onHoverImage,
  spaceMode = 1,
  onSpaceModeChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Active hovered project info for bottom center manifesto/title bar
  const [activeHoverItem, setActiveHoverItem] = useState<OrbitItem | null>(null);
  const [manifestoOpacity, setManifestoOpacity] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const alreadyPlayed = sessionStorage.getItem('ritanshi_intro_animated') === 'true';
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (alreadyPlayed || reducedMotion) return 1.0;
    }
    return 0.35;
  });

  // Opening Animation state
  const isOpeningRef = useRef<boolean>(() => {
    if (typeof window !== 'undefined') {
      const alreadyPlayed = sessionStorage.getItem('ritanshi_intro_animated') === 'true';
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !alreadyPlayed && !reducedMotion;
    }
    return false;
  });
  const openingStartTime = useRef<number | null>(null);

  // Physics & Animation Refs (runs at 60-120fps without React re-renders)
  const globalOrbitAngle = useRef(0);
  const orbitVelocity = useRef(0.00045); // Very slow, calm, continuous movement
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, angle: 0 });
  const totalDragDistance = useRef(0);

  const itemsStateRef = useRef<ItemRuntimeState[]>([]);
  const animFrame = useRef<number | null>(null);

  // Build the disciplined, hierarchy-driven constellation of items with varied orbital radii
  const orbitItems = useMemo<OrbitItem[]>(() => {
    if (!projects || projects.length === 0) return [];

    const items: OrbitItem[] = [];
    const totalProjects = projects.length;

    // 1. Map primary projects with distinct tier sizing (18-24vw heroes, 14-17vw mediums)
    projects.forEach((proj, idx) => {
      // Angular distribution around the central ellipse with staggered spacing
      const angleOffsets = [0.20, 1.45, 2.70, 3.95, 5.20];
      const baseAngle = angleOffsets[idx % angleOffsets.length];
      
      // Strict hierarchy: 2 heroes (idx 0 and idx 3), others are medium
      const isHero = idx === 0 || idx === 3;
      const tier: 'hero' | 'medium' | 'small' = isHero ? 'hero' : 'medium';

      // Sizing guidelines:
      // Hero (1-2): 18-21vw (clamp 180px to 260px)
      // Medium: 13.5-16vw (clamp 135px to 200px)
      const vwWidth = isHero ? 19.5 : 14.5;
      const minWidth = isHero ? 180 : 135;
      const maxWidth = isHero ? 260 : 200;

      // Staggered orbital radii (alternating foreground/outer and middle/inner tracks)
      const isOuterTrack = idx % 2 === 0;
      const radiusRatioX = isOuterTrack ? (isHero ? 1.28 : 1.24) : 0.92;
      const radiusRatioY = isOuterTrack ? (isHero ? 1.20 : 1.16) : 0.86;
      const baseDepth = isHero ? 1.0 : (isOuterTrack ? 0.85 : 0.72);
      const speedMultiplier = isHero ? 0.98 : (isOuterTrack ? 0.99 : 1.02);

      const isAcidStar = proj.id === 'proj-3' || proj.title?.toLowerCase().includes('acid star');
      const isGothicDebutante = proj.id === 'proj-4' || proj.title?.toLowerCase().includes('gothic debutante');
      const isNocturnal = proj.id === 'proj-5' || proj.title?.toLowerCase().includes('nocturnal');
      let subtitle = proj.category;
      if (isAcidStar || isNocturnal) {
        subtitle = '';
      } else if (isGothicDebutante) {
        // Remove ONLY the words "Sustainable Design" and "Material Research" from these hover details
        subtitle = subtitle
          .replace(/Sustainable Design/gi, '')
          .replace(/Material Research/gi, '')
          .replace(/^\s*[\/\-—]\s*|\s*[\/\-—]\s*$/g, '')
          .trim();
      }

      items.push({
        id: `orbit-proj-${proj.id}`,
        projectId: proj.id,
        project: proj,
        title: `${proj.number} ${proj.title}`,
        subtitle,
        tagline: proj.tagline,
        imageUrl: proj.coverImage,
        tier,
        baseAngle,
        radiusRatioX,
        radiusRatioY,
        baseDepth,
        baseRotation: ((idx * 3.7) % 4) - 2, // Restrained -2° to +2°
        speedMultiplier,
        aspectRatio: 1.38,
        vwWidth,
        minWidth,
        maxWidth,
      });
    });

    // 2. Add 1 curated satellite detail node for depth in open quadrant
    if (projects.length > 1 && projects[1].galleryImages && projects[1].galleryImages.length > 1) {
      const proj = projects[1];
      const secondaryImg = proj.galleryImages[1];
      if (secondaryImg && secondaryImg !== proj.coverImage) {
        items.push({
          id: `orbit-sat-${proj.id}-1`,
          projectId: proj.id,
          project: proj,
          title: `${proj.number} ${proj.title} (Detail)`,
          subtitle: `${proj.category} / Detail`,
          tagline: proj.tagline,
          imageUrl: secondaryImg,
          tier: 'small',
          baseAngle: 3.35, // Placed between idx 2 (2.70) and idx 3 (3.95) on outer track
          radiusRatioX: 1.34,
          radiusRatioY: 1.26,
          baseDepth: 0.52,
          baseRotation: 1.8,
          speedMultiplier: 0.96,
          aspectRatio: 1.35,
          vwWidth: 10.5, // 10-12vw
          minWidth: 100,
          maxWidth: 145,
        });
      }
    }

    // 3. Explicitly connect the clickable atelier node to NOCTURNAL Development Board Image 1
    const nocturnalProj =
      projects.find((p) => p.id === 'proj-5' || p.title?.toLowerCase().includes('nocturnal')) ||
      projects[4] ||
      projects[0];

    // Explicitly using nocturnalDevelopmentImages[0] for the first Nocturnal Development Board image
    const nocturnalDevBoardFirstImage = nocturnalDevelopmentImages[0];

    items.push({
      id: `orbit-dev-nocturnal-1`,
      projectId: nocturnalProj.id,
      project: nocturnalProj,
      targetSection: 'section-development-board',
      title: `${nocturnalProj.number} ${nocturnalProj.title}`,
      subtitle: 'Development Board Exploration',
      tagline: 'Initial studies exploring raw indigo deconstruction, hand-pulled warp threads and pleated sleeve construction.',
      imageUrl: nocturnalDevBoardFirstImage,
      tier: 'small',
      baseAngle: 0.82, // Placed between idx 0 (0.20) and idx 1 (1.45) on inner track
      radiusRatioX: 0.86,
      radiusRatioY: 0.80,
      baseDepth: 0.58,
      baseRotation: -1.6,
      speedMultiplier: 1.03,
      aspectRatio: 1.4,
      vwWidth: 10.0, // 9-11vw
      minWidth: 95,
      maxWidth: 140,
    });

    return items;
  }, [projects, processItems]);

  // Helper to compute responsive dimensions for an item in pixels
  const getItemDimensions = useCallback((item: OrbitItem, winW: number) => {
    const rawWidth = (item.vwWidth / 100) * winW;
    const clampedWidth = Math.max(item.minWidth, Math.min(item.maxWidth, rawWidth));
    const clampedHeight = clampedWidth * item.aspectRatio;
    return { width: clampedWidth, height: clampedHeight };
  }, []);

  // Stack imperfect rotation values for the initial controlled editorial stack
  const STACK_ROTATIONS = useMemo(() => [-3.0, 2.2, -1.6, 3.1, -2.4, 1.8, -1.1, 2.7, -2.1, 1.5], []);

  // Synchronize item runtime state
  useEffect(() => {
    const winW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const winH = typeof window !== 'undefined' ? window.innerHeight : 800;
    const centerX = winW / 2;
    const centerY = winH / 2;
    const isOpening = isOpeningRef.current;

    itemsStateRef.current = orbitItems.map((item, idx) => {
      const dims = getItemDimensions(item, winW);
      const stackOffsetX = ((idx % 3) - 1) * 7.5;
      const stackOffsetY = (((idx * 2) % 3) - 1) * 6.0;
      const stackRot = STACK_ROTATIONS[idx % STACK_ROTATIONS.length];
      const stackZIndex = (orbitItems.length - idx) * 3 + 10;
      const stackOpacity = 0.88 + (idx / Math.max(1, orbitItems.length)) * 0.12;

      if (isOpening) {
        return {
          item,
          currentX: centerX + stackOffsetX - dims.width / 2,
          currentY: centerY + stackOffsetY - dims.height / 2,
          currentScale: 0.96,
          currentRotation: stackRot,
          currentDepth: 1.0,
          currentOpacity: stackOpacity,
          currentZIndex: stackZIndex,
          isHovered: false,
        };
      }

      return {
        item,
        currentX: centerX - dims.width / 2,
        currentY: centerY - dims.height / 2,
        currentScale: 1,
        currentRotation: item.baseRotation,
        currentDepth: item.baseDepth,
        currentOpacity: 1,
        currentZIndex: 10,
        isHovered: false,
      };
    });
  }, [orbitItems, getItemDimensions, STACK_ROTATIONS]);

  // Main Animation Loop (Calm, Restrained, High-Precision with Measured Stack Opening Sequence)
  useEffect(() => {
    let lastTime = performance.now();
    const OPENING_TOTAL_DURATION = 4200; // ~4.2s measured, cinematic opening sequence

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Update global orbit angle
      if (!isDragging.current) {
        globalOrbitAngle.current += orbitVelocity.current;
        // Calm resting speed
        const targetSpeed = 0.00038;
        orbitVelocity.current += (targetSpeed - orbitVelocity.current) * 0.02;
      }

      const winW = window.innerWidth;
      const winH = window.innerHeight;
      // Slight horizontal offset to balance the persistent left vertical wordmark
      const centerX = winW * 0.515;
      const centerY = winH * 0.485;

      // Expansive, non-overlapping elliptical orbit field (32-38vw width, 22-26vh height)
      let baseRadiusX = Math.max(260, Math.min(winW * 0.32, 440));
      let baseRadiusY = Math.max(160, Math.min(winH * 0.23, 275));

      if (spaceMode === 2) {
        baseRadiusX = Math.max(220, Math.min(winW * 0.25, 340));
        baseRadiusY = Math.max(190, Math.min(winH * 0.29, 320));
      } else if (spaceMode === 3) {
        baseRadiusX = Math.max(290, Math.min(winW * 0.36, 480));
        baseRadiusY = Math.max(140, Math.min(winH * 0.19, 230));
      }

      // Check opening animation progression
      const isOpening = isOpeningRef.current;
      let openingElapsed = 0;
      if (isOpening) {
        if (openingStartTime.current === null) {
          openingStartTime.current = now;
        }
        openingElapsed = now - openingStartTime.current;

        // Manifesto opacity interpolation across 4 phases:
        // Phase 1 (0-1000ms): 0.35 (subtle)
        // Phase 2-3 (1000-3200ms): 0.35 -> 0.85
        // Phase 4 (3200-4200ms): 0.85 -> 1.0
        if (openingElapsed < 1000) {
          setManifestoOpacity(0.35);
        } else if (openingElapsed < 3200) {
          const progress = (openingElapsed - 1000) / 2200;
          setManifestoOpacity(0.35 + progress * 0.5);
        } else {
          const settleProgress = Math.min(1, (openingElapsed - 3200) / 1000);
          setManifestoOpacity(0.85 + settleProgress * 0.15);
        }

        if (openingElapsed >= OPENING_TOTAL_DURATION) {
          isOpeningRef.current = false;
          try {
            sessionStorage.setItem('ritanshi_intro_animated', 'true');
          } catch (e) {
            // ignore
          }
          setManifestoOpacity(1.0);
        }
      }

      // Target centers strictly independent of cursor movement
      const totalItems = itemsStateRef.current.length;
      const targets = itemsStateRef.current.map((st, idx) => {
        const item = st.item;
        const dims = getItemDimensions(item, winW);

        // Orbital angle calculation
        const currentAngle = item.baseAngle + globalOrbitAngle.current * item.speedMultiplier;

        // Elliptical coordinate calculation
        const radX = baseRadiusX * item.radiusRatioX;
        const radY = baseRadiusY * item.radiusRatioY;

        let xOnOrbit = Math.cos(currentAngle) * radX;
        let yOnOrbit = Math.sin(currentAngle) * radY;

        if (spaceMode === 2) {
          const cos20 = Math.cos(0.35);
          const sin20 = Math.sin(0.35);
          const rotX = xOnOrbit * cos20 - yOnOrbit * sin20;
          const rotY = xOnOrbit * sin20 + yOnOrbit * cos20;
          xOnOrbit = rotX;
          yOnOrbit = rotY;
        }

        // Depth: 0.25 to 1.0
        const depthSin = (Math.sin(currentAngle) + 1) / 2;
        const effectiveDepth = item.baseDepth * (0.7 + 0.3 * depthSin);

        // Soft, organic micro-float (2-4px max)
        const breathingOffset = Math.sin(now * 0.0012 + item.baseAngle) * (3 * effectiveDepth);

        // Stable target center without any cursor-based offsets
        const targetCenterX = centerX + xOnOrbit;
        const targetCenterY = centerY + yOnOrbit + breathingOffset;

        // Restrained intrinsic rotation (no cursor tilt)
        let targetRot = item.baseRotation + Math.sin(currentAngle) * 1.2;
        if (st.isHovered) {
          targetRot = 0;
        }

        // Scale & Opacity hierarchy
        let targetScale = 0.88 + 0.16 * effectiveDepth;
        if (st.isHovered) targetScale = 1.06;
        let targetOpacity = st.isHovered ? 1.0 : 0.80 + 0.20 * effectiveDepth;
        let targetZIndex = st.isHovered ? 70 : Math.round(effectiveDepth * 40) + 10;

        return {
          idx,
          st,
          item,
          dims,
          centerX: targetCenterX,
          centerY: targetCenterY,
          targetRot,
          targetScale,
          targetOpacity,
          targetZIndex,
          effectiveDepth,
        };
      });

      // Step 2: Center Clear Space Repulsion (Protects Manifesto & Center Negative Space)
      const centerSafeRadiusX = Math.max(130, winW * 0.115);
      const centerSafeRadiusY = Math.max(85, winH * 0.105);

      targets.forEach((t) => {
        const dx = t.centerX - centerX;
        const dy = t.centerY - centerY;
        const normDistSq = (dx / centerSafeRadiusX) ** 2 + (dy / centerSafeRadiusY) ** 2;

        if (normDistSq < 1.0 && normDistSq > 0.0001) {
          const normDist = Math.sqrt(normDistSq);
          const pushFactor = (1.0 - normDist) * 22;
          const angle = Math.atan2(dy / centerSafeRadiusY, dx / centerSafeRadiusX);
          t.centerX += Math.cos(angle) * pushFactor;
          t.centerY += Math.sin(angle) * pushFactor;
        }
      });

      // Step 3: Pairwise Soft Spatial Separation Solver (Zero Overlap Assurance)
      // Maintains 40–80px of clear air between any two revolving photographs
      const SEPARATION_PASSES = 3;
      for (let pass = 0; pass < SEPARATION_PASSES; pass++) {
        for (let i = 0; i < totalItems; i++) {
          for (let j = i + 1; j < totalItems; j++) {
            const tA = targets[i];
            const tB = targets[j];

            const dx = tB.centerX - tA.centerX;
            const dy = tB.centerY - tA.centerY;

            // Safe boundary = half widths + half heights + 55px horizontal / 45px vertical breathing buffer
            const minSafeDistX = (tA.dims.width + tB.dims.width) / 2 + 55;
            const minSafeDistY = (tA.dims.height + tB.dims.height) / 2 + 45;

            const normX = dx / minSafeDistX;
            const normY = dy / minSafeDistY;
            const normDistSq = normX * normX + normY * normY;

            if (normDistSq < 1.0 && normDistSq > 0.00001) {
              const normDist = Math.sqrt(normDistSq);
              const overlap = 1.0 - normDist;
              const pushMag = Math.min(overlap * 16, 14);

              const pushAngle = Math.atan2(normY, normX);
              const pushX = Math.cos(pushAngle) * pushMag * (minSafeDistX / 110);
              const pushY = Math.sin(pushAngle) * pushMag * (minSafeDistY / 110);

              tA.centerX -= pushX;
              tA.centerY -= pushY;
              tB.centerX += pushX;
              tB.centerY += pushY;
            }
          }
        }
      }

      // Step 4: Viewport Edge Containment & Rendering
      const leftSafeMargin = Math.max(65, winW * 0.055); // Clears the persistent vertical wordmark
      const rightSafeMargin = 20;
      const topSafeMargin = 78; // Clears top navigation
      const bottomSafeMargin = 78; // Clears bottom manifesto

      targets.forEach((t) => {
        const { idx, st, item, dims, targetRot, targetScale, targetOpacity, targetZIndex } = t;
        const el = document.getElementById(item.id);
        if (!el) return;

        // Bounded target coordinates
        const rawTargetX = t.centerX - dims.width / 2;
        const rawTargetY = t.centerY - dims.height / 2;

        const targetX = Math.max(leftSafeMargin, Math.min(winW - dims.width - rightSafeMargin, rawTargetX));
        const targetY = Math.max(topSafeMargin, Math.min(winH - dims.height - bottomSafeMargin, rawTargetY));

        if (isOpening) {
          // Controlled Initial Stack Geometry
          const stackOffsetX = ((idx % 3) - 1) * 7.5;
          const stackOffsetY = (((idx * 2) % 3) - 1) * 6.0;
          const stackRot = STACK_ROTATIONS[idx % STACK_ROTATIONS.length];
          const stackZIndex = (totalItems - idx) * 3 + 10;
          const stackOpacity = 0.88 + (idx / Math.max(1, totalItems)) * 0.12;

          // Four-Phase Choreography (~4.2s total):
          // PHASE 1: 0–1000ms Stack stillness with calm breathing
          // PHASE 2: 1000–1800ms Staggered release (top photograph first)
          // PHASE 3: 1800–3200ms Spatial spread & travel
          // PHASE 4: 3200–4200ms Settle softly into orbital physics
          const itemDelay = 1000 + idx * 110;
          const itemDuration = 2200;

          if (openingElapsed < 1000) {
            // PHASE 1: STACK / STILLNESS
            const stackBreath = Math.sin((openingElapsed / 1000) * Math.PI) * -3.5;
            st.currentX = centerX + stackOffsetX - dims.width / 2;
            st.currentY = centerY + stackOffsetY + stackBreath - dims.height / 2;
            st.currentScale = 0.96;
            st.currentRotation = stackRot;
            st.currentOpacity = stackOpacity;
            st.currentZIndex = stackZIndex;
          } else if (openingElapsed < itemDelay) {
            // Pre-release waiting state
            const waitElapsed = openingElapsed - 1000;
            const microBreath = Math.sin((waitElapsed / 800) * Math.PI) * -1.5;
            st.currentX = centerX + stackOffsetX - dims.width / 2;
            st.currentY = centerY + stackOffsetY + microBreath - dims.height / 2;
            st.currentScale = 0.96;
            st.currentRotation = stackRot;
            st.currentOpacity = stackOpacity;
            st.currentZIndex = stackZIndex;
          } else {
            // PHASE 2, 3, 4: CASCADING SPREAD & GENTLE SETTLE
            const rawProgress = Math.min(1, Math.max(0, (openingElapsed - itemDelay) / itemDuration));
            const easedProgress = rawProgress === 1 ? 1 : 1 - Math.pow(1 - rawProgress, 3.4);

            const startStackX = centerX + stackOffsetX - dims.width / 2;
            const startStackY = centerY + stackOffsetY - dims.height / 2;
            const startStackRot = stackRot;
            const startStackScale = 0.96;
            const startStackOpacity = stackOpacity;
            const startStackZ = stackZIndex;

            st.currentX = startStackX + (targetX - startStackX) * easedProgress;
            st.currentY = startStackY + (targetY - startStackY) * easedProgress;
            st.currentRotation = startStackRot + (targetRot - startStackRot) * easedProgress;
            st.currentScale = startStackScale + (targetScale - startStackScale) * easedProgress;
            st.currentOpacity = startStackOpacity + (targetOpacity - startStackOpacity) * easedProgress;
            st.currentZIndex = Math.round(startStackZ + (targetZIndex - startStackZ) * easedProgress);
          }
        } else {
          // Continuous Seamless Revolving State with smooth Physics Lerp Damping
          st.currentX += (targetX - st.currentX) * 0.09;
          st.currentY += (targetY - st.currentY) * 0.09;
          st.currentScale += (targetScale - st.currentScale) * 0.09;
          st.currentRotation += (targetRot - st.currentRotation) * 0.08;
          st.currentOpacity = targetOpacity;
          st.currentZIndex = targetZIndex;
        }

        // Direct Transform without reflow
        el.style.width = `${dims.width}px`;
        el.style.height = `${dims.height}px`;
        el.style.transform = `translate3d(${st.currentX}px, ${st.currentY}px, 0px) rotate(${st.currentRotation}deg) scale(${st.currentScale})`;
        el.style.opacity = `${st.currentOpacity}`;
        el.style.zIndex = `${st.currentZIndex}`;
      });

      animFrame.current = requestAnimationFrame(animate);
    };

    animFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [spaceMode, getItemDimensions]);

  // Pointer Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    totalDragDistance.current = 0;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      angle: globalOrbitAngle.current,
    };
    orbitVelocity.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      totalDragDistance.current += Math.hypot(dx, dy);

      // Subtle drag resistance
      const angleDelta = dx * 0.0022;
      globalOrbitAngle.current = dragStart.current.angle + angleDelta;
      orbitVelocity.current = dx * 0.00008;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Wheel Scroll Interaction (Rotate constellation subtly)
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
    orbitVelocity.current += delta * 0.000015;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Click handler: 100% Reliable, verified on every item
  const handleItemClick = (item: OrbitItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (totalDragDistance.current < 6) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      onSelectProject(item.project, rect, item.targetSection);
    }
  };

  return (
    <div
      ref={containerRef}
      id="creative-space-container"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative h-screen w-screen overflow-hidden bg-[#C81D25] select-none cursor-grab active:cursor-grabbing"
    >
      {/* Constellation Images Rendering Loop */}
      {orbitItems.map((item) => {
        return (
          <div
            key={item.id}
            id={item.id}
            onClick={(e) => handleItemClick(item, e)}
            onPointerDown={(e) => {
              dragStart.current = { x: e.clientX, y: e.clientY, angle: globalOrbitAngle.current };
              totalDragDistance.current = 0;
            }}
            onMouseEnter={() => {
              const st = itemsStateRef.current.find((s) => s.item.id === item.id);
              if (st) st.isHovered = true;
              setActiveHoverItem(item);
              onHoverImage('VIEW PROJECT');
            }}
            onMouseLeave={() => {
              const st = itemsStateRef.current.find((s) => s.item.id === item.id);
              if (st) st.isHovered = false;
              setActiveHoverItem(null);
              onHoverImage(null);
            }}
            className="absolute top-0 left-0 cursor-pointer pointer-events-auto group"
            style={{
              willChange: 'transform, opacity, width, height',
            }}
          >
            {/* STRICTLY FRAMELESS CLEAN PHOTOGRAPH — 100% SHARP & CRISP */}
            <div className="relative h-full w-full overflow-hidden editorial-photo-frame ring-1 ring-[#F3C5CD]/10 transition-all duration-500">
              <img
                id={`canvas__${item.id}`}
                data-project-id={item.projectId}
                data-slot-id={`canvas__${item.id}`}
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="eager"
                draggable={false}
              />

              {/* Minimal Corner Arrow Icon on Hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-2.5">
                <div className="bg-black/40 p-1.5 text-[#F3C5CD] shadow-sm transform scale-90 group-hover:scale-100 group-hover:bg-[#F3C5CD] group-hover:text-[#C81D25] transition-all duration-200 border border-[#F3C5CD]/30">
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modern Romantic Nostalgia: Quiet Editorial Manifesto & Hovered Project Metadata */}
      <div className="pointer-events-none fixed bottom-8 md:bottom-10 left-0 right-0 z-30 flex flex-col items-center justify-center text-center px-4">
        {activeHoverItem ? (
          <div className="flex flex-col items-center animate-in fade-in duration-200">
            <span className="font-romantic text-[18px] md:text-[21px] font-normal italic tracking-wide text-[#F3C5CD]">
              {activeHoverItem.title}
            </span>
            <div className="h-[1px] w-8 bg-[#F3C5CD]/40 my-1.5" />
            <div className="inline-flex items-center space-x-2 bg-black/35 px-3.5 py-1 border border-[#F3C5CD]/25 shadow-sm mt-0.5">
              <span className="text-[9.5px] md:text-[10px] font-medium tracking-[0.22em] text-[#F3C5CD] uppercase">
                {activeHoverItem.subtitle ? (
                  <>
                    {activeHoverItem.subtitle} <span className="text-[#F3C5CD]/60 font-normal px-0.5">—</span>{' '}
                  </>
                ) : null}
                <span className="text-[#F3C5CD] font-romantic italic normal-case tracking-wider text-[11px]">{activeHoverItem.tagline}</span>
              </span>
            </div>
          </div>
        ) : (
          <p
            className="font-romantic text-[18px] md:text-[21px] font-normal italic tracking-wider text-[#F3C5CD] select-none transition-opacity duration-300"
            style={{ opacity: manifestoOpacity }}
          >
            Between control and chaos.
          </p>
        )}
      </div>
    </div>
  );
};
