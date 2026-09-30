import React from 'react';
import { Project, DarkSafariBoards } from '../types';
import {
  EditorialProjectPresentation,
  EditorialPresentationTheme,
} from './EditorialProjectPresentation';
import {
  nocturnalThemeImage,
  nocturnalLookbookImage1,
  nocturnalLookbookImage2,
  nocturnalLookbookImage3,
  nocturnalLookbookImage4,
  nocturnalLookbookImages,
  nocturnalCoverImage,
  nocturnalDevelopmentImages,
  nocturnalDevBoard1Image,
  nocturnalDevBoard2Image,
} from '../data/nocturnalImages';
export {
  nocturnalThemeImage,
  nocturnalLookbookImage1,
  nocturnalLookbookImage2,
  nocturnalLookbookImage3,
  nocturnalLookbookImage4,
  nocturnalLookbookImages,
  nocturnalCoverImage,
  nocturnalDevelopmentImages,
  nocturnalDevBoard1Image,
  nocturnalDevBoard2Image,
} from '../data/nocturnalImages';

import nocturnalInspirationBoardImg from '../assets/images/regenerated_image_1790014573507.png';

export const DEFAULT_NOCTURNAL_BOARDS: DarkSafariBoards = {
  themeBoard: [
    {
      id: 'nocturnal-tb-1',
      url: nocturnalThemeImage,
      title: 'Nocturnal Atelier Denim Theme & 3D Relief Manipulation Mood Board',
      aspect: 'landscape',
    },
  ],
  inspirationBoard: [
    {
      id: 'nocturnal-ib-1',
      url: nocturnalInspirationBoardImg,
      title: 'Raw Indigo Deconstruction & Wednesday Addams Gothic Silhouette Research',
      aspect: 'landscape',
    },
  ],
  developmentBoard: [
    {
      id: 'nocturnal-db-1',
      url: nocturnalDevelopmentImages[0],
      title: 'Nocturnal Development Board — Study 01 (Hand-Pulled Warp & Material Testing)',
      aspect: 'landscape',
    },
    {
      id: 'nocturnal-db-2',
      url: nocturnalDevelopmentImages[1],
      title: 'Nocturnal Development Board — Study 02 (High-Heat Resin Setting & Pleat Construction)',
      aspect: 'landscape',
    },
  ],
  lookBook: [
    {
      id: 'nocturnal-lb-1',
      url: nocturnalLookbookImage1,
      title: 'Look 01 — The Nocturnal Blazer with Sculptural Pleated Sleeves',
      aspect: 'tall',
    },
    {
      id: 'nocturnal-lb-2',
      url: nocturnalLookbookImage2,
      title: 'Look 02 — Architectural Denim Silhouette & High-Heat Resin Form',
      aspect: 'tall',
    },
    {
      id: 'nocturnal-lb-3',
      url: nocturnalLookbookImage3,
      title: 'Look 03 — Distressed Warp Relief Texture & Raw Edge Study',
      aspect: 'tall',
    },
    {
      id: 'nocturnal-lb-4',
      url: nocturnalLookbookImage4,
      title: 'Look 04 — Tactile Relief Surface & Contrast Topstitching',
      aspect: 'tall',
    },
  ],
};

const NOCTURNAL_THEME: EditorialPresentationTheme = {
  containerClass: 'relative text-[#F3C5CD]',
  headerBorder: 'border-[#F3C5CD]/20',
  labelColor: 'text-[#F3C5CD]',
  titleColor: 'text-[#F3C5CD]',
  subtextColor: 'text-[#F3C5CD]/80',
  taglineColor: 'text-[#F3C5CD]/85',
  navBarBorder: 'border-[#F3C5CD]/15',
  navBtn:
    'border-[#F3C5CD]/25 hover:border-[#F3C5CD]/60 text-[#F3C5CD] hover:text-white bg-black/20 hover:bg-[#F3C5CD]/15 backdrop-blur-sm',
  sectionBorder: 'border-[#F3C5CD]/20',
  sectionTitleColor: 'text-[#F3C5CD]',
};

interface NocturnalPresentationProps {
  project: Project;
  onUpdateBoards?: (boards: DarkSafariBoards) => void;
}

export const NocturnalPresentation: React.FC<NocturnalPresentationProps> = ({
  project,
  onUpdateBoards,
}) => {
  const resolvedBoards: DarkSafariBoards = {
    ...DEFAULT_NOCTURNAL_BOARDS,
    themeBoard: [
      {
        ...DEFAULT_NOCTURNAL_BOARDS.themeBoard[0],
        url: nocturnalThemeImage,
      },
    ],
    developmentBoard: [
      {
        ...DEFAULT_NOCTURNAL_BOARDS.developmentBoard[0],
        url: nocturnalDevelopmentImages[0],
      },
      {
        ...DEFAULT_NOCTURNAL_BOARDS.developmentBoard[1],
        url: nocturnalDevelopmentImages[1],
      },
    ],
    lookBook: [
      {
        ...DEFAULT_NOCTURNAL_BOARDS.lookBook[0],
        url: nocturnalLookbookImage1,
      },
      {
        ...DEFAULT_NOCTURNAL_BOARDS.lookBook[1],
        url: nocturnalLookbookImage2,
      },
      {
        ...DEFAULT_NOCTURNAL_BOARDS.lookBook[2],
        url: nocturnalLookbookImage3,
      },
      {
        ...DEFAULT_NOCTURNAL_BOARDS.lookBook[3],
        url: nocturnalLookbookImage4,
      },
    ],
  };

  return (
    <EditorialProjectPresentation
      project={project}
      headerId="nocturnal-presentation-header"
      atelierId="nocturnal-atelier-index"
      categoryLabel=""
      subtitle="WEDNESDAY ADDAMS \ PLEATED SLEEVES"
      craftTechniques="Architectural Pleating"
      theme={NOCTURNAL_THEME}
      defaultBoards={resolvedBoards}
      storageKey="" // Empty storage key prevents stale localStorage caching
      onUpdateBoards={onUpdateBoards}
    />
  );
};
