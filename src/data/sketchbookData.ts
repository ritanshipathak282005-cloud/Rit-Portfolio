import page01 from '../assets/images/sketchbook/sketch_page_01.png';
import page02 from '../assets/images/sketchbook/sketch_page_02.png';
import page03 from '../assets/images/sketchbook/sketch_page_03.png';
import page04 from '../assets/images/sketchbook/sketch_page_04.png';
import page05 from '../assets/images/sketchbook/sketch_page_05.png';
import page06 from '../assets/images/sketchbook/sketch_page_06.png';
import page07 from '../assets/images/sketchbook/sketch_page_07.png';
import page08 from '../assets/images/sketchbook/sketch_page_08.png';
import page09 from '../assets/images/sketchbook/sketch_page_09.png';
import page10 from '../assets/images/sketchbook/sketch_page_10.png';
import page11 from '../assets/images/sketchbook/sketch_page_11.png';
import page12 from '../assets/images/sketchbook/sketch_page_12.png';
import page13 from '../assets/images/sketchbook/sketch_page_13.png';
import page14 from '../assets/images/sketchbook/sketch_page_14.png';

export interface SketchPage {
  id: string;
  pageNumber: number;
  title: string;
  imageUrl: string;
}

export const SKETCHBOOK_PAGES: SketchPage[] = [
  { id: 'sketch-p01', pageNumber: 1, title: 'Fashion Illustrations — Cover', imageUrl: page01 },
  { id: 'sketch-p02', pageNumber: 2, title: 'Introduction', imageUrl: page02 },
  { id: 'sketch-p03', pageNumber: 3, title: 'Spiderweb Couture Gown', imageUrl: page03 },
  { id: 'sketch-p04', pageNumber: 4, title: 'Star Bustier Sequin Mini', imageUrl: page04 },
  { id: 'sketch-p05', pageNumber: 5, title: 'Sculptural Scale Mermaid Gown', imageUrl: page05 },
  { id: 'sketch-p06', pageNumber: 6, title: 'Gilded Drop-Shoulder Draped Gown', imageUrl: page06 },
  { id: 'sketch-p07', pageNumber: 7, title: 'Burgundy Lattice Column Gown', imageUrl: page07 },
  { id: 'sketch-p08', pageNumber: 8, title: 'Liquid Silver Mosaic Strapless', imageUrl: page08 },
  { id: 'sketch-p09', pageNumber: 9, title: 'Draped Wing Halter Gown', imageUrl: page09 },
  { id: 'sketch-p10', pageNumber: 10, title: 'Valentino Linear Sequin Mini', imageUrl: page10 },
  { id: 'sketch-p11', pageNumber: 11, title: 'Desert Tiered Architectural Gown', imageUrl: page11 },
  { id: 'sketch-p12', pageNumber: 12, title: 'Bronze Sequined Off-Shoulder', imageUrl: page12 },
  { id: 'sketch-p13', pageNumber: 13, title: 'Tear-Drop Pearl Strapless & Gloves', imageUrl: page13 },
  { id: 'sketch-p14', pageNumber: 14, title: 'Designer Inspirations & Influences', imageUrl: page14 },
];
