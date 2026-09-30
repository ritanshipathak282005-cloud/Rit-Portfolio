// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NOCTURNAL PROJECT INDEPENDENT IMAGE SOURCES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. nocturnalCoverImage        → Cover ONLY (Orbit card & Work gallery card)
// 2. nocturnalThemeImage        → Theme Board ONLY (Top section of Nocturnal page)
// 3. nocturnalLookbookImage1    → Lookbook Image 1 ONLY (Top-Left of 2x2 grid)
// 4. nocturnalLookbookImage2    → Lookbook Image 2 ONLY (Top-Right of 2x2 grid)
// 5. nocturnalLookbookImage3    → Lookbook Image 3 ONLY (Bottom-Left / Second-last of 2x2 grid)
// 6. nocturnalLookbookImage4    → Lookbook Image 4 ONLY (Bottom-Right / Last of 2x2 grid)
//
// Each variable is completely independent and has its own separate asset.
// Changing any one variable will NEVER affect any of the other images.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import coverAsset from '../assets/images/regenerated_image_1790108006142.png';
import themeAsset from '../assets/images/regenerated_image_1790014484543.png';
import lookbook1Asset from '../assets/images/regenerated_image_1790261226262.png';
import lookbook2Asset from '../assets/images/regenerated_image_1790016021372.png';
import lookbook3Asset from '../assets/images/regenerated_image_1790261540943.png';
import lookbook4Asset from '../assets/images/regenerated_image_1790525106910.png';
import devBoard1Asset from '../assets/images/regenerated_image_1790015771168.png';
import devBoard2Asset from '../assets/images/regenerated_image_1790015884830.png';

// 1. COVER IMAGE ONLY: Displayed on the homepage spatial canvas card & work archive card
export const nocturnalCoverImage: string = coverAsset;

// 2. THEME BOARD IMAGE ONLY: Displayed in the Theme Board section of Nocturnal
export const nocturnalThemeImage: string = themeAsset;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEVELOPMENT BOARD IMAGE SOURCES (INDEPENDENT DATA SEPARATION)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const nocturnalDevBoard1Image: string = devBoard1Asset;
export const nocturnalDevBoard2Image: string = devBoard2Asset;

export const nocturnalDevelopmentImages: string[] = [
  devBoard1Asset,
  devBoard2Asset,
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FOUR INDEPENDENT LOOKBOOK IMAGE SOURCES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Lookbook Image 1 ONLY (Look 01 — The Nocturnal Blazer with Sculptural Pleated Sleeves)
export const nocturnalLookbookImage1: string = lookbook1Asset;

// Lookbook Image 2 ONLY (Look 02 — Architectural Denim Silhouette & High-Heat Resin Form)
export const nocturnalLookbookImage2: string = lookbook2Asset;

// Lookbook Image 3 ONLY (Look 03 — Distressed Warp Relief Texture & Raw Edge Study)
export const nocturnalLookbookImage3: string = lookbook3Asset;

// Lookbook Image 4 ONLY (Look 04 — Tactile Relief Surface & Contrast Topstitching)
export const nocturnalLookbookImage4: string = lookbook4Asset;

// Dedicated independent Look Book collection for Nocturnal ONLY
export const nocturnalLookbookImages: string[] = [
  nocturnalLookbookImage1,
  nocturnalLookbookImage2,
  nocturnalLookbookImage3,
  nocturnalLookbookImage4,
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ISOLATED NOCTURNAL IMAGE STATE CONTAINER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface NocturnalImagesState {
  cover: string;
  themeBoard: string;
  developmentBoards: [string, string];
  lookbook: [string, string, string, string];
}

export const nocturnalImages: NocturnalImagesState = {
  cover: nocturnalCoverImage,
  themeBoard: nocturnalThemeImage,
  developmentBoards: [nocturnalDevBoard1Image, nocturnalDevBoard2Image],
  lookbook: [
    nocturnalLookbookImage1,
    nocturnalLookbookImage2,
    nocturnalLookbookImage3,
    nocturnalLookbookImage4,
  ],
};
