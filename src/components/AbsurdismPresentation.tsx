import React from 'react';
import { Project, DarkSafariBoards } from '../types';
import {
  EditorialProjectPresentation,
  EditorialPresentationTheme,
} from './EditorialProjectPresentation';

import absurdismCoverImg from '../assets/images/regenerated_image_1790692292163.png';
import absurdismMoodBoardImg from '../assets/images/Beige Minimalist Mood Board Fashion Presentation.png';
import absurdismInspirationImg from '../assets/images/regenerated_image_1790695857151.png';
import absurdismDevBoardImg from '../assets/images/regenerated_image_1790695978675.png';
import absurdismLook2Img from '../assets/images/regenerated_image_1790696500342.png';
import absurdismLook1Img from '../assets/images/absurdism_look1_editorial.jpg';
import absurdismLook3Img from '../assets/images/absurdism_look3_editorial.jpg';
import absurdismLook4Img from '../assets/images/absurdism_look4_editorial.jpg';

export { absurdismCoverImg, absurdismMoodBoardImg };

const ABSURDISM_STORAGE_KEY = 'ritanshi_absurdism_boards_v9';

export const DEFAULT_ABSURDISM_BOARDS: DarkSafariBoards = {
  themeBoard: [
    {
      id: 'abs-tb-1',
      url: absurdismMoodBoardImg,
      title: 'Absurdism Through an Abstract Lens Mood Board',
      aspect: 'landscape',
    },
  ],
  inspirationBoard: [
    {
      id: 'abs-ib-1',
      url: absurdismInspirationImg,
      title: 'Controlled Chemical Oxidation & Artisan Indigo Resist Research',
      aspect: 'landscape',
    },
  ],
  developmentBoard: [
    {
      id: 'abs-db-1',
      url: absurdismDevBoardImg,
      title: 'Absurdism Through an Abstract Lens Denim Swatch & Surface Bleach Development',
      aspect: 'landscape',
    },
  ],
  lookBook: [
    {
      id: 'abs-lb-1',
      url: absurdismLook1Img,
      title: 'Look 01 — Hand-Bleached Indigo Canvas Oversized Jacket',
      aspect: 'tall',
    },
    {
      id: 'abs-lb-2',
      url: absurdismLook2Img,
      title: 'Look 02 — Controlled Oxidation Selvedge Denim Construction',
      aspect: 'tall',
    },
    {
      id: 'abs-lb-3',
      url: absurdismLook3Img,
      title: 'Look 03 — Dabu Resist & Sodium Hypochlorite Brush Masking',
      aspect: 'tall',
    },
    {
      id: 'abs-lb-4',
      url: absurdismLook4Img,
      title: 'Look 04 — Distressed Warp Relief & Enzyme Wash Silhouette',
      aspect: 'tall',
    },
  ],
};

const ABSURDISM_THEME: EditorialPresentationTheme = {
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

interface AbsurdismPresentationProps {
  project: Project;
  onUpdateBoards?: (boards: DarkSafariBoards) => void;
}

export const AbsurdismPresentation: React.FC<AbsurdismPresentationProps> = ({
  project,
  onUpdateBoards,
}) => {
  const dynamicDefaultBoards: DarkSafariBoards = React.useMemo(() => {
    return {
      themeBoard: [
        {
          id: 'abs-tb-1',
          url: project.moodBoardImage || absurdismMoodBoardImg,
          title: 'Absurdism Through an Abstract Lens Mood Board',
          aspect: 'landscape',
        },
      ],
      inspirationBoard: [...DEFAULT_ABSURDISM_BOARDS.inspirationBoard],
      developmentBoard: [...DEFAULT_ABSURDISM_BOARDS.developmentBoard],
      lookBook: [...DEFAULT_ABSURDISM_BOARDS.lookBook],
    };
  }, [project.moodBoardImage]);

  return (
    <EditorialProjectPresentation
      key={ABSURDISM_STORAGE_KEY}
      project={project}
      headerId="absurdism-presentation-header"
      atelierId="absurdism-atelier-index"
      categoryLabel="SURFACE DEVELOPMENT"
      subtitle="DENIM \\ BLEACHING \\ KANTHA"
      craftTechniques="Controlled Chemical Oxidation, Hand Bleach Resist Printing, Dabu Mud-Resist Bath"
      theme={ABSURDISM_THEME}
      defaultBoards={dynamicDefaultBoards}
      storageKey={ABSURDISM_STORAGE_KEY}
      onUpdateBoards={onUpdateBoards}
    />
  );
};
