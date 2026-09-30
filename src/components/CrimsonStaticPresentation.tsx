import React from 'react';
import { Project, DarkSafariBoards } from '../types';
import {
  EditorialProjectPresentation,
  EditorialPresentationTheme,
} from './EditorialProjectPresentation';
import jaipurMartiniImg from '../assets/images/crimson_static_look1_independent.jpg';
import jaipurSketchesImg from '../assets/images/regenerated_image_1790113115008.png';
import craftCultureImg from '../assets/images/regenerated_image_1786600911516.jpg';
import themeBoardImg4 from '../assets/images/regenerated_image_1789418576023.png';
import inspirationBoardImg from '../assets/images/regenerated_image_1790266835017.png';
import crimsonLook2Img from '../assets/images/regenerated_image_1790604877730.png';
import crimsonLook3Img from '../assets/images/regenerated_image_1790267969354.jpg';
import crimsonLook4Img from '../assets/images/regenerated_image_1790268122059.jpg';

const CRIMSON_STATIC_STORAGE_KEY = 'ritanshi_crimson_static_boards_v6';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CRIMSON STATIC BOARDS (EXACTLY MATCHING ACID STAR LAYOUT):
// 1. THEME BOARD — 1 single complete mood board image
// 2. INSPIRATION BOARD — 1 single complete mood board image
// 3. DEVELOPMENT BOARD — 1 single complete photo collage document
// 4. LOOK BOOK — 4 images in a balanced 2x2 grid
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const DEFAULT_CRIMSON_STATIC_BOARDS: DarkSafariBoards = {
  themeBoard: [
    {
      id: 'cs-tb-1',
      url: themeBoardImg4,
      title: 'Crimson Static Heritage & Royal Eveningwear Theme Board',
      aspect: 'landscape',
    },
  ],
  inspirationBoard: [
    {
      id: 'cs-ib-1',
      url: inspirationBoardImg,
      title: 'Rajasthani Court Zari Weaves & Architectural Palace Dusk Research',
      aspect: 'landscape',
    },
  ],
  developmentBoard: [
    {
      id: 'cs-db-1',
      url: jaipurSketchesImg,
      title: 'Silhouette Draping, Zardozi Gold Bullion Thread & Spec Development',
      aspect: 'landscape',
    },
  ],
  lookBook: [
    {
      id: 'cs-lb-1',
      url: jaipurMartiniImg,
      title: 'Look 01 — Deconstructed Angrakha & Silk Brocade Gown',
      aspect: 'tall',
    },
    {
      id: 'cs-lb-2',
      url: crimsonLook2Img,
      title: 'Look 02 — Asymmetric Architectural Silk Eveningwear',
      aspect: 'tall',
    },
    {
      id: 'cs-lb-3',
      url: crimsonLook3Img,
      title: 'Look 03 — Exposed Tailoring & Zardozi Accent Suit',
      aspect: 'tall',
    },
    {
      id: 'cs-lb-4',
      url: crimsonLook4Img,
      title: 'Look 04 — Modern Courtly Opulence Silhouette',
      aspect: 'tall',
    },
  ],
};

const CRIMSON_STATIC_THEME: EditorialPresentationTheme = {
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

interface CrimsonStaticPresentationProps {
  project: Project;
  onUpdateBoards?: (boards: DarkSafariBoards) => void;
}

export const CrimsonStaticPresentation: React.FC<CrimsonStaticPresentationProps> = ({
  project,
  onUpdateBoards,
}) => {
  return (
    <EditorialProjectPresentation
      key={CRIMSON_STATIC_STORAGE_KEY}
      project={project}
      headerId="crimson-static-presentation-header"
      atelierId="crimson-static-atelier-index"
      categoryLabel=""
      subtitle="Bandhani / hand-painted denim."
      craftTechniques="Bandhani, Hand-Painted Denim"
      theme={CRIMSON_STATIC_THEME}
      defaultBoards={DEFAULT_CRIMSON_STATIC_BOARDS}
      storageKey={CRIMSON_STATIC_STORAGE_KEY}
      onUpdateBoards={onUpdateBoards}
    />
  );
};
