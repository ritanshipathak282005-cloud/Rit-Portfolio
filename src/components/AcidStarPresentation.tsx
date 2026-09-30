import React from 'react';
import { Project, DarkSafariBoards } from '../types';
import {
  EditorialProjectPresentation,
  EditorialPresentationTheme,
} from './EditorialProjectPresentation';

import acidStarThemeImg from '../assets/images/acid_star_theme_board.png';
import acidStarInspirationImg from '../assets/images/regenerated_image_1789888200540.png';
import acidStarDevBoardImg from '../assets/images/regenerated_image_1789888326169.png';
import acidStarLook1Img from '../assets/images/acid_star_look1_independent.jpg';
import acidStarLook2Img from '../assets/images/regenerated_image_1789888510287.jpg';
import acidStarLook3Img from '../assets/images/regenerated_image_1789889100383.jpg';
import acidStarLook4Img from '../assets/images/regenerated_image_1789889279085.jpg';

const ACID_STAR_STORAGE_KEY = 'ritanshi_acid_star_boards_v9';

export const DEFAULT_ACID_STAR_BOARDS: DarkSafariBoards = {
  themeBoard: [
    {
      id: 'as-tb-1',
      url: acidStarThemeImg,
      title: 'Acid Star Theme & Rave Silhouette Mood Board',
      aspect: 'landscape',
    },
  ],
  inspirationBoard: [
    {
      id: 'as-ib-1',
      url: acidStarInspirationImg,
      title: 'Surrealist Kinetic Calder Forms & Historical Corsetry Research',
      aspect: 'landscape',
    },
  ],
  developmentBoard: [
    {
      id: 'as-db-1',
      url: acidStarDevBoardImg,
      title: 'Acid Star Draping, Boning Construction & Development Collage',
      aspect: 'landscape',
    },
  ],
  lookBook: [
    {
      id: 'as-lb-1',
      url: acidStarLook1Img,
      title: 'Look 01 — Reworked Denim Corset & Bandhani Bleach Utility',
      aspect: 'tall',
    },
    {
      id: 'as-lb-2',
      url: acidStarLook2Img,
      title: 'Look 02 — Suspended Organza Kinetic Volume',
      aspect: 'tall',
    },
    {
      id: 'as-lb-3',
      url: acidStarLook3Img,
      title: 'Look 03 — Sculptural Wire Architecture Silhouette',
      aspect: 'tall',
    },
    {
      id: 'as-lb-4',
      url: acidStarLook4Img,
      title: 'Look 04 — Sheer Weightless Runway Portrait',
      aspect: 'tall',
    },
  ],
};

const ACID_STAR_THEME: EditorialPresentationTheme = {
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

interface AcidStarPresentationProps {
  project: Project;
  onUpdateBoards?: (boards: DarkSafariBoards) => void;
}

export const AcidStarPresentation: React.FC<AcidStarPresentationProps> = ({
  project,
  onUpdateBoards,
}) => {
  return (
    <EditorialProjectPresentation
      key={ACID_STAR_STORAGE_KEY}
      project={project}
      headerId="acid-star-presentation-header"
      atelierId="acid-star-atelier-index"
      categoryLabel="BANDHANI"
      subtitle="DENIM \ BANDHANI \ CORSET"
      craftTechniques="Bandhani Resist, Bleach Manipulation"
      theme={ACID_STAR_THEME}
      defaultBoards={DEFAULT_ACID_STAR_BOARDS}
      storageKey={ACID_STAR_STORAGE_KEY}
      onUpdateBoards={onUpdateBoards}
    />
  );
};
