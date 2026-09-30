// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXACTLY 25 INDEPENDENT TEXTILE SWATCHES DATA
// RULE: ONE SWATCH = ONE INDEPENDENT IMAGE REFERENCE
// NEVER sync, duplicate, reuse, or share references between swatches.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import swatch01 from '../assets/images/regenerated_image_1790605276194.png';
import swatch02 from '../assets/images/regenerated_image_1790606501086.jpg';
import swatch03 from '../assets/images/swatches/swatch_03.png';
import swatch04 from '../assets/images/swatches/swatch_04.png';
import swatch05 from '../assets/images/swatches/swatch_05.jpg';
import swatch06 from '../assets/images/swatches/swatch_06.png';
import swatch07 from '../assets/images/swatches/swatch_07.png';
import swatch08 from '../assets/images/swatches/swatch_08.png';
import swatch09 from '../assets/images/swatches/swatch_09.png';
import swatch10 from '../assets/images/swatches/swatch_10.png';
import swatch11 from '../assets/images/swatches/swatch_11.png';
import swatch12 from '../assets/images/swatches/swatch_12.png';
import swatch13 from '../assets/images/swatches/swatch_13.png';
import swatch14 from '../assets/images/swatches/swatch_14.png';
import swatch15 from '../assets/images/swatches/swatch_15.png';
import swatch16 from '../assets/images/swatches/swatch_16.png';
import swatch17 from '../assets/images/swatches/swatch_17.jpg';
import swatch18 from '../assets/images/swatches/swatch_18.jpg';
import swatch19 from '../assets/images/regenerated_image_1790609188485.png';
import swatch20 from '../assets/images/swatches/swatch_20.jpg';
import swatch21 from '../assets/images/regenerated_image_1790609190383.png';
import swatch22 from '../assets/images/swatches/swatch_22.jpg';
import swatch23 from '../assets/images/regenerated_image_1790607844792.png';
import swatch24 from '../assets/images/regenerated_image_1790607737696.png';
import swatch25 from '../assets/images/regenerated_image_1790609192486.jpg';

export interface SwatchPosition {
  top: number; // percentage (0 - 100) of board height
  left: number; // percentage (0 - 100) of board width
  width: number; // percentage relative to board width
  minWidthPx?: number; // minimum display width in pixels so textile is never tiny
  scaleMultiplier?: number; // scale multiplier for transparent cutouts with padding
  zIndex: number;
}

export interface TextileSwatch {
  id: string; // e.g. "swatch-01"
  number: string; // "01"
  title: string;
  technique: string;
  material: string;
  process?: string;
  description: string;
  observation?: string;
  defaultImage: string;
  magnetType: 'silver' | 'matte-black' | 'brass' | 'pewter';
  magnetPosition?: 'top-center' | 'top-left' | 'top-right' | 'two-top';
  tiltDeg: number;
  position: SwatchPosition;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXACTLY 25 SWATCHES — COHESIVE, FULLY BALANCED ATELIER BOARD
// - Efficient vertical board space (minimal intentional bottom metal margin)
// - Swatches 21, 22, 23, 24 are prominently sized, clearly visible & noticeable
// - Human-placed, organic studio composition with varied scale & rotation
// - NO GRID, NO RECTANGULAR CARDS, NO POLAROID FRAMES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const TEXTILE_SWATCHES: TextileSwatch[] = [
  // ── ROW 1: UPPER FOCAL & RESEARCH STUDIES ─────────────────
  {
    id: 'swatch-01',
    number: '01',
    title: 'Painted Madhubani Royal Figure & Lotus Medallion',
    technique: 'Fine Brushwork Pigment Painting on Stonewashed Denim Pocket',
    material: '14oz Indigo Denim, Natural Earth Pigments, Gold Gouache',
    description: 'Detailed Madhubani miniature figure painted onto an authentic denim pocket flap, framed by a lotus mandala and hand-stitched border.',
    observation: 'Denim twill grain provides a tactile canvas texture; pigments hold flexibility with acrylic polymer binder.',
    defaultImage: swatch01,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: -1.5,
    position: { top: 3.5, left: 2.2, width: 18.5, minWidthPx: 240, zIndex: 10 },
  },
  {
    id: 'swatch-02',
    number: '02',
    title: 'Concentric Kantha Stitching on Black T-Shirt Cotton',
    technique: 'Kantha Running Stitch',
    material: 'Handloom Cotton Duck, Orange & Carmine Acid Dye, Waxed Thread',
    description: 'A hand-embroidered lotus motif using Kantha stitches on three layers of T-shirt fabric. The lotus is built with contrasting pink, yellow, turquoise, and orange running stitches, creating a colourful, textured and slightly raised surface.',
    observation: 'Working Kantha on three layers makes the T-shirt fabric stiffer and more structured without becoming harsh, while still retaining some softness and flexibility. The dense stitches add weight, texture, and dimension, giving the lotus a more defined surface.',
    defaultImage: swatch02,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: 1.0,
    position: { top: 2.8, left: 22.0, width: 22.5, minWidthPx: 285, zIndex: 8 },
  },
  {
    id: 'swatch-03',
    number: '03',
    title: 'Stick Cording',
    technique: 'Stick Cording',
    material: 'Heavy Unbleached Calico, Cotton Piping Cord Core',
    description: 'A textile manipulation technique where thin wooden sticks are inserted between fabric layers to create raised, parallel ridges and a three-dimensional surface.',
    observation: 'The sticks create defined structure and sculptural texture, making the fabric firmer while the areas between the ridges remain soft and flexible.',
    defaultImage: swatch03,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: 2.0,
    position: { top: 2.5, left: 46.5, width: 16.0, minWidthPx: 215, zIndex: 9 },
  },
  {
    id: 'swatch-04',
    number: '04',
    title: 'Bleach-Splattered Kantha Denim',
    technique: 'Bleach Splatter + Kantha Embroidery',
    material: '13.5oz Raw Selvedge Denim, Crimson Cotton Floss',
    description: 'Two denim swatches are treated with bleach splattering to create an irregular, distressed surface. Kantha embroidery in white and red Anchor thread is added over the bleached areas, introducing contrast and enhancing the denim’s texture.',
    observation: 'The bleach creates a varied, weathered surface, while the Kantha stitches add tactile texture and visual depth. The white thread blends subtly with the bleached areas, while the red creates a stronger contrast and makes the embroidery more pronounced.',
    defaultImage: swatch04,
    magnetType: 'silver',
    magnetPosition: 'two-top',
    tiltDeg: -0.8,
    position: { top: 1.8, left: 64.0, width: 21.0, minWidthPx: 275, zIndex: 7 },
  },
  {
    id: 'swatch-05',
    number: '05',
    title: 'Zardozi',
    technique: 'Zardozi & Beadwork',
    material: 'Silk Velvet Ground, Silver Micro-Beads, Bullion Wire',
    description: 'A traditional Zardozi embroidery motif on rich maroon velvet, worked with silver Anchor thread and dark red beadwork. The combination creates a luxurious, dimensional surface with a strong contrast between the metallic embroidery and deep velvet base.',
    observation: 'The velvet base absorbs and reflects light differently, making the silver embroidery stand out more prominently. The combination of metallic thread and beadwork adds both linear and raised texture, giving the motif depth while also making the fabric feel more structured and heavier around the embroidered areas.',
    defaultImage: swatch05,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: 0.6,
    position: { top: 3.2, left: 86.8, width: 11.2, minWidthPx: 155, zIndex: 11 },
  },

  // ── ROW 2: MIDDLE SURFACE STUDIES & EMBROIDERY ─────────────
  {
    id: 'swatch-06',
    number: '06',
    title: 'Bleach Wash on Corduroy',
    technique: 'Bleach Wash on Corduroy',
    material: 'Tomato-Red Cotton Corduroy, Bleach Solution',
    description: 'A bright tomato-red corduroy swatch was treated with a bleach and water solution for 5 minutes. The treatment subtly altered the original colour, resulting in a slightly deeper red tone with visible tonal variation across the surface.',
    observation: 'The bleach treatment caused a subtle darkening rather than a strong colour lift, showing that the fabric and dye reacted mildly to the solution. The corduroy texture remains visible, while the tonal change adds a slightly more worn and varied surface quality.',
    defaultImage: swatch06,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: -0.8,
    position: { top: 30.5, left: 23.0, width: 13.5, minWidthPx: 185, zIndex: 12 },
  },
  {
    id: 'swatch-07',
    number: '07',
    title: 'Checkerboard knitting',
    technique: 'Two-Stitch Check – Stranded Colourwork',
    material: 'Merino Wool & Marigold Acrylic Blend',
    description: 'Two pink stitches are followed by two yellow stitches, with the colours reversed in alternate rows to create a checkerboard grid effect.',
    observation: 'The colour changes create a clear geometric pattern, while the knitted structure remains soft, textured, and slightly stretchy. The edges naturally curl/fold inward, giving the swatch a softer, rolled finish and showing the natural behaviour of the knitted structure.',
    defaultImage: swatch07,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: -1.2,
    position: { top: 29.0, left: 41.0, width: 12.5, minWidthPx: 170, zIndex: 14 },
  },
  {
    id: 'swatch-08',
    number: '08',
    title: 'knotting',
    technique: 'knotting',
    material: 'Unbleached Muslin Ground, Cotton & Wool Braided Cords',
    description: `01 — 3-Strand Braid\n02 — Square Knot\n03 — Twisted Cord\n04 — Double Half Hitch\n05 — Spiral Knot`,
    observation: 'The 4th and 5th are both variations of half-hitch knotting, but their arrangement gives them different surface effects.',
    defaultImage: swatch08,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: 1.0,
    position: { top: 32.5, left: 47.5, width: 16.5, minWidthPx: 225, zIndex: 10 },
  },
  {
    id: 'swatch-09',
    number: '09',
    title: 'Seed Stitch (Moss Stitch)',
    technique: 'knitting',
    material: 'Natural Cream Cotton & Wool Yarn',
    description: 'Alternating knit and purl stitches are worked across the rows, creating a small, evenly textured surface with a subtle dotted appearance.',
    observation: 'The stitch produces a dense, soft and slightly nubby texture with less stretch than plain knitting. The even surface gives the swatch good structure and a balanced drape, while the edges show a slight natural curl.',
    defaultImage: swatch09,
    magnetType: 'silver',
    magnetPosition: 'top-right',
    tiltDeg: -2.0,
    position: { top: 38.0, left: 28.5, width: 16.5, minWidthPx: 225, zIndex: 9 },
  },
  {
    id: 'swatch-10',
    number: '10',
    title: 'Lace Stencil Printing on Corduroy',
    technique: 'Acrylic Spray Printing with Crochet Lace Stencil',
    material: 'Red Ribbed Corduroy, White Acrylic Paint',
    description: 'Corduroy is spray-painted with white acrylic paint using crocheted lace as a stencil, creating a delicate patterned surface against the red base.',
    observation: 'The acrylic paint settles into the corduroy texture, causing the fabric to lose some of its original softness and flexibility and develop a slightly rough, coated feel. The lace stencil creates an irregular, textured print that contrasts with the raised ribs of the corduroy.',
    defaultImage: swatch10,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: -1.5,
    position: { top: 29.0, left: 85.0, width: 13.5, minWidthPx: 185, zIndex: 12 },
  },
  {
    id: 'swatch-11',
    number: '11',
    title: 'Quilting with Cut-and-Slash',
    technique: 'Quilting with Cut-and-Slash',
    material: 'Layered Cotton Fabric, High-Density Foam Sheet, Stitching Thread',
    description: 'A quilting sample made by stitching and slashing the fabric surface, with a foam sheet inserted between the layers to create added volume and dimension.',
    observation: 'The foam filling gives the quilted areas more body and a raised, sculptural effect. The cut-and-slash technique exposes the inner layer and creates irregular linear textures, while the stitching helps control the shape and adds surface definition.',
    defaultImage: swatch11,
    magnetType: 'silver',
    magnetPosition: 'two-top',
    tiltDeg: 0.6,
    position: { top: 37.0, left: 67.5, width: 16.5, minWidthPx: 225, zIndex: 10 },
  },
  {
    id: 'swatch-12',
    number: '12',
    title: 'Diagonal Chevron Tablet Woven Ribbon',
    technique: 'Card / Tablet Weaving with Diagonal Shedding',
    material: 'Chocolate Brown & Cream Cotton Yarns',
    description: 'Dense warp-faced chevron ribbon showing precision geometric zigzag ridges.',
    observation: 'Exceptional tensile strength with smooth woven edges.',
    defaultImage: swatch12,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: 1.2,
    position: { top: 41.0, left: 86.0, width: 13.0, minWidthPx: 175, zIndex: 13 },
  },
  {
    id: 'swatch-13',
    number: '13',
    title: 'KNOTTING',
    technique: 'KNOTTING',
    material: 'Contrasting Dual-Tone Cording & Spun Yarn',
    description: `Alternating Square Knot\nRepeated square knots are worked with contrasting yarns, with the colour change creating a diagonal band across the surface.\n\nDNA-Inspired Twisted Knot\nInterlocking knots are repeated around the central strands to create a continuous, double-helix-like structure, resembling the form of a DNA strand.`,
    defaultImage: swatch13,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: -1.0,
    position: { top: 31.0, left: 3.2, width: 13.5, minWidthPx: 185, zIndex: 11 },
  },
  {
    id: 'swatch-14',
    number: '14',
    title: 'Knitting',
    technique: 'Open Mesh Knit',
    material: 'Cream Spun Cotton Yarn',
    description: 'A loosely knitted structure with larger spaces between stitches, creating an open, breathable mesh-like surface.',
    observation: 'The open construction makes the fabric lightweight, flexible, and breathable, with more visible negative space between the stitches. It also gives the sample a soft drape and slightly stretchy quality.',
    defaultImage: swatch14,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: 1.5,
    position: { top: 35.0, left: 15.5, width: 13.5, minWidthPx: 185, zIndex: 13 },
  },

  // ── ROW 3: LOWER SECTION & ENLARGED SWATCHES 21–24 ─────────
  {
    id: 'swatch-15',
    number: '15',
    title: 'Acrylic Fabric Paint Spray with Crochet Lace Stencil',
    technique: 'Fabric Paint Spray',
    material: 'Indigo Denim, White Acrylic Fabric Paint, Crocheted Lace Stencil',
    description: 'A surface-printing technique where acrylic fabric paint is spray-applied onto denim through a crocheted lace stencil, transferring the intricate lace pattern onto the fabric.',
    observation: 'The crocheted lace stencil creates an organic, intricate pattern with varied edges and negative spaces. Unlike corduroy, the denim retains its original texture, handle, and surface feel after printing, while the acrylic paint adds a visible lace-like surface effect without changing the character of the denim.',
    defaultImage: swatch15,
    magnetType: 'silver',
    magnetPosition: 'top-left',
    tiltDeg: 11.0,
    position: { top: 62.0, left: 2.0, width: 15.0, minWidthPx: 200, zIndex: 8 },
  },
  {
    id: 'swatch-16',
    number: '16',
    title: 'Open Cording',
    technique: 'Open Cording',
    material: 'Natural Linen Ground, Multi-Tone Twisted Cords',
    description: 'A surface embellishment technique where twisted cords are placed and arranged on the fabric to create raised, linear patterns and textures.',
    observation: 'The open placement allows the base fabric to remain visible, creating negative spaces between the cords. The combination of different cord colours and thicknesses gives the sample a handcrafted, raw, and slightly irregular look.',
    defaultImage: swatch16,
    magnetType: 'silver',
    magnetPosition: 'two-top',
    tiltDeg: -0.8,
    position: { top: 58.5, left: 11.5, width: 13.5, minWidthPx: 185, zIndex: 14 },
  },
  {
    id: 'swatch-17',
    number: '17',
    title: 'Chamba Rumal Embroidery on Suede',
    technique: 'Chamba Rumal Embroidery on Suede',
    material: 'Brown Suede, Contrasting Stranded Floss',
    description: 'A traditional Chamba Rumal embroidery technique adapted onto suede, using dense, colourful threadwork to create a detailed motif.',
    observation: 'The embroidery creates a bold, raised surface on the suede, adding texture and dimension. The detailed animal motif and contrasting threads give the sample a rich, handcrafted and traditional appearance.',
    defaultImage: swatch17,
    magnetType: 'silver',
    magnetPosition: 'top-right',
    tiltDeg: 0.5,
    position: { top: 61.5, left: 20.5, width: 15.5, minWidthPx: 210, zIndex: 12 },
  },
  {
    id: 'swatch-18',
    number: '18',
    title: 'Beadwork',
    technique: 'Beadwork',
    material: 'Base Textile Ground, Glass Beads & Metallic Accents',
    description: 'A decorative surface technique using beads and embellishments to create a raised motif on the fabric.',
    observation: 'creates a textured and dimensional surface, with the contrasting beads adding shine and definition to the motif. The combination of beads and metallic elements gives the sample a refined, handcrafted finish.',
    defaultImage: swatch18,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: 1.0,
    position: { top: 56.5, left: 35.5, width: 16.5, minWidthPx: 225, zIndex: 11 },
  },
  {
    id: 'swatch-19',
    number: '19',
    title: 'Cut & Slash on Knitted Fabric',
    technique: 'Cut & Slash',
    material: 'Multi-Layered Knitted Fabric, Black Rib-Knit Base',
    description: 'A surface manipulation technique where the knitted fabric is cut and slashed in strips, layered over a black rib-knit base.',
    observation: 'When stretched, the slashed areas open up to reveal all four layers, creating a wavy, layered effect. The contrast between the black rib-knit base and the exposed layers adds depth, texture, and movement to the surface.',
    defaultImage: swatch19,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: 1.2,
    position: { top: 52.5, left: 51.5, width: 7.2, minWidthPx: 115, scaleMultiplier: 1.35, zIndex: 15 },
  },
  {
    id: 'swatch-20',
    number: '20',
    title: 'Mirror Work',
    technique: 'Mirror Work',
    material: 'Base Textile Ground, Reflective Mirrors, Glass Beads & Decorative Floss',
    description: 'A traditional surface embellishment technique using mirrors, beads, and decorative threads arranged to form a geometric motif.',
    observation: 'The mirrors create a reflective surface and added dimension, while the bead and thread detailing frames the motif. The combination gives the fabric a rich, decorative finish.',
    defaultImage: swatch20,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: -0.6,
    position: { top: 52.0, left: 56.5, width: 7.0, minWidthPx: 110, scaleMultiplier: 1.35, zIndex: 15 },
  },
  {
    // SWATCH 21: ENLARGED, PROMINENT & CLEARLY VISIBLE
    id: 'swatch-21',
    number: '21',
    title: 'Bleaching on Corduroy',
    technique: 'Bleaching on Corduroy',
    material: 'Bright Red Cotton Corduroy, Undiluted Bleach',
    description: 'A colour manipulation technique where bright red corduroy is treated with undiluted bleach to alter the original colour.',
    observation: 'After 5 minutes of bleaching, the red corduroy shifted to orange and yellow tones. The process created an uneven, naturally mottled colour effect while retaining the original ribbed texture of the corduroy.',
    defaultImage: swatch21,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: 0.8,
    position: { top: 52.5, left: 61.8, width: 11.5, minWidthPx: 165, scaleMultiplier: 1.35, zIndex: 15 },
  },
  {
    // SWATCH 22: ENLARGED, PROMINENT & CLEARLY VISIBLE
    id: 'swatch-22',
    number: '22',
    title: 'Chamba Rumal Embroidery',
    technique: 'Chamba Rumal Embroidery',
    material: 'Silk threads',
    description: 'Traditional Chamba Rumal embroidery worked on cotton fabric using silk threads, featuring a traditional figurative motif.',
    observation: 'The silk thread creates a smooth, slightly lustrous surface with defined stitches. The detailed motif and vibrant colours give the embroidery a rich handcrafted look, while the cotton base provides a simple, natural background.',
    defaultImage: swatch22,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: -1.2,
    position: { top: 59.5, left: 68.0, width: 12.5, minWidthPx: 180, scaleMultiplier: 1.3, zIndex: 14 },
  },
  {
    // SWATCH 23: ENLARGED, PROMINENT & CLEARLY VISIBLE
    id: 'swatch-23',
    number: '23',
    title: 'Gathering',
    technique: 'Gathering',
    material: 'muslin',
    description: 'A fabric manipulation technique where the fabric is drawn together with stitches to create controlled fullness and folds.',
    observation: 'The gathering creates soft, irregular folds and added volume on the fabric surface. It gives the sample a three-dimensional, textured effect while adding movement and fullness to the fabric.',
    defaultImage: swatch23,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: 1.0,
    position: { top: 57.5, left: 75.0, width: 13.0, minWidthPx: 190, scaleMultiplier: 1.25, zIndex: 14 },
  },
  {
    // SWATCH 24: ENLARGED, PROMINENT & CLEARLY VISIBLE
    id: 'swatch-24',
    number: '24',
    title: 'Loop-Turned Spiral Cord with Cyan Binding',
    technique: 'Finger-Loop Braiding & Whipped Eyelet Finish',
    material: 'Natural Cream Cotton Cord, Cyan Waxed Thread',
    description: 'Open loop terminal secured with tightly wrapped cyan thread and hanging tassel.',
    observation: 'Modular fastening element for closure experimentation.',
    defaultImage: swatch24,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: -1.5,
    position: { top: 52.0, left: 81.5, width: 10.5, minWidthPx: 165, scaleMultiplier: 1.35, zIndex: 15 },
  },
  {
    id: 'swatch-25',
    number: '25',
    title: 'Knotted Macramé Ribbon with Mustard Accents',
    technique: 'Square Knotting with Integrated Weft Beads',
    material: 'Natural Cotton Sash Cord, Mustard Wool Yarn',
    description: 'Alternating square-knot macramé band with raised sculptural bead nodes.',
    observation: 'Architectural column profile suitable for garment suspenders or edge trim.',
    defaultImage: swatch25,
    magnetType: 'silver',
    magnetPosition: 'top-center',
    tiltDeg: 0.5,
    position: { top: 60.5, left: 86.0, width: 15.5, minWidthPx: 215, zIndex: 13 },
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STRICT SWATCH ISOLATION & PER-ID STORAGE SYSTEM
// Guarantees each swatch has its own unique, permanent record.
// A change to one swatch ID NEVER touches or transfers to another swatch ID.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const STORAGE_SWATCH_METADATA_KEY = 'ritanshi_swatch_metadata_v2';

/**
 * Normalizes any format of swatch ID (e.g. "swatch01", "swatch-01", "01", "1")
 * to the canonical format: "swatch-01".
 */
export function normalizeSwatchId(rawId: string): string {
  if (!rawId) return 'swatch-01';
  const clean = rawId.toLowerCase().trim();
  const match = clean.match(/(\d+)/);
  if (match) {
    const num = parseInt(match[1], 10);
    return `swatch-${num < 10 ? '0' + num : num}`;
  }
  return clean;
}

/**
 * Canonical dictionary of initial default swatches keyed strictly by their unique ID.
 */
export const DEFAULT_SWATCHES_BY_ID: Readonly<Record<string, TextileSwatch>> = Object.freeze(
  TEXTILE_SWATCHES.reduce<Record<string, TextileSwatch>>((acc, s) => {
    acc[s.id] = { ...s };
    acc[normalizeSwatchId(s.id)] = { ...s };
    return acc;
  }, {})
);

/**
 * Load all swatches, merging persisted user modifications strictly by matching swatch ID.
 * Every swatch is returned as an independent object instance to eliminate shared references.
 */
export function getInitialSwatches(): TextileSwatch[] {
  let savedRecords: Record<string, Partial<TextileSwatch>> = {};
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const raw = localStorage.getItem(STORAGE_SWATCH_METADATA_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          savedRecords = parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load saved swatch records:', e);
    }
  }

  // Build completely independent copies strictly keyed by swatch ID
  return TEXTILE_SWATCHES.map((baseSwatch) => {
    const canonicalId = normalizeSwatchId(baseSwatch.id);
    const savedForThisSwatch = savedRecords[canonicalId] || savedRecords[baseSwatch.id];

    if (!savedForThisSwatch) {
      return { ...baseSwatch, position: { ...baseSwatch.position } };
    }

    // Apply saved fields strictly to this swatch only
    return {
      ...baseSwatch,
      position: { ...baseSwatch.position },
      title: typeof savedForThisSwatch.title === 'string' ? savedForThisSwatch.title : baseSwatch.title,
      technique: typeof savedForThisSwatch.technique === 'string' ? savedForThisSwatch.technique : baseSwatch.technique,
      material: typeof savedForThisSwatch.material === 'string' ? savedForThisSwatch.material : baseSwatch.material,
      process: typeof savedForThisSwatch.process === 'string' ? savedForThisSwatch.process : baseSwatch.process,
      description: typeof savedForThisSwatch.description === 'string' ? savedForThisSwatch.description : baseSwatch.description,
      observation: typeof savedForThisSwatch.observation === 'string' ? savedForThisSwatch.observation : baseSwatch.observation,
      defaultImage: typeof savedForThisSwatch.defaultImage === 'string' ? savedForThisSwatch.defaultImage : baseSwatch.defaultImage,
    };
  });
}

/**
 * Save user edits for ONE SPECIFIC swatch ID permanently.
 * Does not touch, modify, or sync with any other swatch ID.
 */
export function saveSingleSwatchRecord(swatchId: string, updates: Partial<TextileSwatch>): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const canonicalId = normalizeSwatchId(swatchId);

  try {
    let existingMap: Record<string, Partial<TextileSwatch>> = {};
    const raw = localStorage.getItem(STORAGE_SWATCH_METADATA_KEY);
    if (raw) {
      try {
        existingMap = JSON.parse(raw) || {};
      } catch {
        existingMap = {};
      }
    }

    // Only update this specific swatch ID entry
    existingMap[canonicalId] = {
      ...(existingMap[canonicalId] || {}),
      ...updates,
      id: canonicalId,
    };

    localStorage.setItem(STORAGE_SWATCH_METADATA_KEY, JSON.stringify(existingMap));

    // Dispatch isolated event for this specific swatch ID
    window.dispatchEvent(
      new CustomEvent('ritanshi-swatch-updated', {
        detail: { swatchId: canonicalId, updates },
      })
    );
  } catch (err) {
    console.error('Failed to save record for ' + canonicalId, err);
  }
}

