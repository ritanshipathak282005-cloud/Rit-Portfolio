import React from 'react';
import { Project, DarkSafariBoards } from '../types';
import {
  EditorialProjectPresentation,
  EditorialPresentationTheme,
} from './EditorialProjectPresentation';

import gothicDebutanteThemeImg from '../assets/images/gothic_debutante_theme_board.png';
import gothicDebutanteInspirationImg from '../assets/images/regenerated_image_1789894982997.png';
import gothicDebutanteDevImg from '../assets/images/regenerated_image_1789895477647.png';
import gothicDebutanteLook1Img from '../assets/images/gothic_debutante_look1_independent.jpg';
import gothicDebutanteLook2Img from '../assets/images/regenerated_image_1789896252881.jpg';
import gothicDebutanteLook3Img from '../assets/images/regenerated_image_1789896566032.jpg';
import gothicDebutanteLook4Img from '../assets/images/regenerated_image_1789895725440.jpg';

const GOTHIC_DEBUTANTE_STORAGE_KEY = 'ritanshi_gothic_debutante_boards_v7';

export const DEFAULT_GOTHIC_DEBUTANTE_BOARDS: DarkSafariBoards = {
  themeBoard: [
    {
      id: 'gd-tb-1',
      url: gothicDebutanteThemeImg,
      title: 'Neutral Vintage Mood Board Document',
      aspect: 'landscape',
    },
  ],
  inspirationBoard: [
    {
      id: 'gd-ib-1',
      url: gothicDebutanteInspirationImg,
      title: 'Gothic Femininity & Sculptural Drape Inspiration Board',
      aspect: 'landscape',
    },
  ],
  developmentBoard: [
    {
      id: 'gd-db-1',
      url: gothicDebutanteDevImg,
      title: 'Zero-Waste Pattern Blueprint & Sujni Stitch Exploration Development Board',
      aspect: 'landscape',
    },
  ],
  lookBook: [
    {
      id: 'gd-lb-1',
      url: gothicDebutanteLook1Img,
      title: 'Look 01 — Black Corset with Silver Sujni Embroidery',
      aspect: 'tall',
    },
    {
      id: 'gd-lb-2',
      url: gothicDebutanteLook2Img,
      title: 'Look 02 — Sculptural Silhouette Drape',
      aspect: 'tall',
    },
    {
      id: 'gd-lb-3',
      url: gothicDebutanteLook3Img,
      title: 'Look 03 — Zero-Waste Structural Form',
      aspect: 'tall',
    },
    {
      id: 'gd-lb-4',
      url: gothicDebutanteLook4Img,
      title: 'Look 04 — Organic Botanical Dye Textile & Silhouette Study',
      aspect: 'tall',
    },
  ],
};

const GOTHIC_DEBUTANTE_THEME: EditorialPresentationTheme = {
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

interface GothicDebutantePresentationProps {
  project: Project;
  onUpdateBoards?: (boards: DarkSafariBoards) => void;
}

export const GothicDebutantePresentation: React.FC<GothicDebutantePresentationProps> = ({
  project,
  onUpdateBoards,
}) => {
  return (
    <EditorialProjectPresentation
      key={GOTHIC_DEBUTANTE_STORAGE_KEY}
      project={project}
      headerId="gothic-debutante-presentation-header"
      atelierId="gothic-debutante-atelier-index"
      categoryLabel="SUJNI EMBROIDERY"
      subtitle="OLD-WORLD FEMININITY \ DARK DRAMA \ LEATHER \ SUJNI CORSET"
      craftTechniques="Leather Corsetry & Sujni Embroidery"
      theme={GOTHIC_DEBUTANTE_THEME}
      defaultBoards={DEFAULT_GOTHIC_DEBUTANTE_BOARDS}
      storageKey={GOTHIC_DEBUTANTE_STORAGE_KEY}
      onUpdateBoards={onUpdateBoards}
    />
  );
};
