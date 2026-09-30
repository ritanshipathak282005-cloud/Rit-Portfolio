import { useState, useEffect, useCallback } from 'react';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GLOBAL IMAGE SLOT MANAGER
// RULE: ONE IMAGE SLOT = ONE INDEPENDENT IMAGE REFERENCE
// Changing an image in one slot will NEVER mutate any other slot.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface UpdateImageSlotParams {
  projectId: string;
  sectionId: string;
  imageId: string;
  newImage: string;
}

const STORAGE_KEY = 'ritanshi_image_slots_registry_v13';

export function getSlotKey(projectId: string, sectionId: string, imageId: string): string {
  const normProject = projectId.toLowerCase().trim().replace(/[^a-z0-9_-]+/g, '-');
  const normSection = sectionId.toLowerCase().trim().replace(/[^a-z0-9_-]+/g, '-');
  const normImage = imageId.toLowerCase().trim().replace(/[^a-z0-9_-]+/g, '-');
  return `${normProject}__${normSection}__${normImage}`;
}

// In-memory slot cache for instant lookups
const slotCache: Record<string, string> = {};

function initSlotCache(): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'object' && parsed !== null) {
        Object.assign(slotCache, parsed);
      }
    }
  } catch (e) {
    console.warn('Failed to read image slot registry from localStorage:', e);
  }
}

initSlotCache();

export function getImageSlot(
  projectId: string,
  sectionId: string,
  imageId: string,
  defaultUrl: string
): string {
  const key = getSlotKey(projectId, sectionId, imageId);
  return slotCache[key] || defaultUrl;
}

export function updateImageSlot({
  projectId,
  sectionId,
  imageId,
  newImage,
}: UpdateImageSlotParams): void {
  const key = getSlotKey(projectId, sectionId, imageId);
  slotCache[key] = newImage;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slotCache));
    } catch (e) {
      console.warn('Failed to persist image slot registry to localStorage:', e);
    }

    const event = new CustomEvent('ritanshi-image-slot-updated', {
      detail: {
        slotKey: key,
        projectId,
        sectionId,
        imageId,
        newImage,
      },
    });
    window.dispatchEvent(event);
  }
}

// React Hook to subscribe to an individual image slot
export function useImageSlot(
  projectId: string,
  sectionId: string,
  imageId: string,
  defaultUrl: string
): [string, (newImage: string) => void] {
  const slotKey = getSlotKey(projectId, sectionId, imageId);
  const [currentUrl, setCurrentUrl] = useState<string>(() => {
    return getImageSlot(projectId, sectionId, imageId, defaultUrl);
  });

  // Keep synced if defaultUrl changes (e.g. from code updates)
  useEffect(() => {
    if (!slotCache[slotKey]) {
      setCurrentUrl(defaultUrl);
    }
  }, [defaultUrl, slotKey]);

  // Listen strictly to events for this exact slotKey
  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{
        slotKey: string;
        projectId: string;
        sectionId: string;
        imageId: string;
        newImage: string;
      }>;
      if (customEvent.detail && customEvent.detail.slotKey === slotKey) {
        setCurrentUrl(customEvent.detail.newImage);
      }
    };

    window.addEventListener('ritanshi-image-slot-updated', handleUpdate);
    return () => {
      window.removeEventListener('ritanshi-image-slot-updated', handleUpdate);
    };
  }, [slotKey]);

  const update = useCallback(
    (newImage: string) => {
      updateImageSlot({ projectId, sectionId, imageId, newImage });
    },
    [projectId, sectionId, imageId]
  );

  return [currentUrl, update];
}

// Attach to window for testing / automated verification
if (typeof window !== 'undefined') {
  (window as any).updateImage = updateImageSlot;
  (window as any).updateImageSlot = updateImageSlot;
  (window as any).getImageSlot = getImageSlot;
  (window as any).getSlotKey = getSlotKey;
}
