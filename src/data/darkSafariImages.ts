// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DARK SAFARI PROJECT INDEPENDENT IMAGE SOURCES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. darkSafariCoverImage          → Cover ONLY (Spatial canvas card & work archive card)
// 2. darkSafariThemeImage          → Theme Board ONLY (Top section of Dark Safari page)
// 3. darkSafariInspirationImage    → Inspiration Board ONLY (Second section of Dark Safari)
// 4. darkSafariDevelopmentImage    → Development Board ONLY (Third section of Dark Safari)
// 5. darkSafariLookbookImage1      → Lookbook Image 1 ONLY (Top-Left of 2x2 grid)
// 6. darkSafariLookbookImage2      → Lookbook Image 2 ONLY (Top-Right of 2x2 grid)
// 7. darkSafariLookbookImage3      → Lookbook Image 3 ONLY (Bottom-Left / Third of 2x2 grid)
// 8. darkSafariLookbookImage4      → Lookbook Image 4 ONLY (Bottom-Right / Fourth of 2x2 grid)
//
// Each variable is completely independent from Nocturnal or any other project.
// Changing any Dark Safari image will NEVER affect Nocturnal or any other project.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import darkSafariCoverAsset from '../assets/images/dark_safari_cover_independent.jpg';
import darkSafariThemeAsset from '../assets/images/regenerated_image_1789886451056.png';
import darkSafariInspirationAsset from '../assets/images/ritanshi_inspiration_moodboard.png';
import darkSafariDevAsset from '../assets/images/development_board_single.png';

// Dark Safari's own unique lookbook images (100% separate from Nocturnal)
import darkSafariLook1Asset from '../assets/images/regenerated_image_1787503584454.jpg';
import darkSafariLook2Asset from '../assets/images/regenerated_image_1789639813920.jpg';
import darkSafariLook3Asset from '../assets/images/regenerated_image_1789640269679.jpg';
import darkSafariLook4Asset from '../assets/images/regenerated_image_1790525842817.png';

// 1. COVER IMAGE ONLY: Displayed on the homepage spatial canvas card & work archive card
export const darkSafariCoverImage: string = darkSafariCoverAsset;

// 2. THEME BOARD IMAGE ONLY: Displayed in the Theme Board section of Dark Safari
export const darkSafariThemeImage: string = darkSafariThemeAsset;

// 3. INSPIRATION BOARD IMAGE ONLY: Displayed in the Inspiration Board section of Dark Safari
export const darkSafariInspirationImage: string = darkSafariInspirationAsset;

// 4. DEVELOPMENT BOARD IMAGE ONLY: Displayed in the Development Board section of Dark Safari
export const darkSafariDevelopmentImage: string = darkSafariDevAsset;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FOUR INDEPENDENT DARK SAFARI LOOKBOOK IMAGE SOURCES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Lookbook Image 1 ONLY (Look 01 — Hero Outerwear Coat with Handcrafted Chamba Rumal Detailing)
export const darkSafariLookbookImage1: string = darkSafariLook1Asset;

// Lookbook Image 2 ONLY (Look 02 — Tailored Street-Couture with Heritage Stitch Dynamics)
export const darkSafariLookbookImage2: string = darkSafariLook2Asset;

// Lookbook Image 3 ONLY (Look 03 — Chamba Rumal Floral & Feral Tailoring Silhouette)
export const darkSafariLookbookImage3: string = darkSafariLook3Asset;

// Lookbook Image 4 ONLY (Look 04 — Editorial Garment Monograph & Modern Craft Silhouette)
export const darkSafariLookbookImage4: string = darkSafariLook4Asset;

// Dedicated independent Look Book collection for Dark Safari ONLY
export const darkSafariLookbookImages: string[] = [
  darkSafariLookbookImage1,
  darkSafariLookbookImage2,
  darkSafariLookbookImage3,
  darkSafariLookbookImage4,
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ISOLATED DARK SAFARI IMAGE STATE CONTAINER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface DarkSafariImagesState {
  cover: string;
  themeBoard: string;
  inspirationBoard: string;
  developmentBoard: string;
  lookbook: [string, string, string, string];
}

export const darkSafariImages: DarkSafariImagesState = {
  cover: darkSafariCoverImage,
  themeBoard: darkSafariThemeImage,
  inspirationBoard: darkSafariInspirationImage,
  developmentBoard: darkSafariDevelopmentImage,
  lookbook: [
    darkSafariLookbookImage1,
    darkSafariLookbookImage2,
    darkSafariLookbookImage3,
    darkSafariLookbookImage4,
  ],
};
