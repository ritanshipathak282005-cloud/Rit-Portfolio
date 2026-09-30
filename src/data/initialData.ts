import { PortfolioData } from "../types";
import { nocturnalCoverImage } from "./nocturnalImages";
import { darkSafariCoverImage } from "./darkSafariImages";
import crimsonStaticCoverImg from "../assets/images/regenerated_image_1787502689977.jpg";
import bleachedHeritageCoverImg from "../assets/images/regenerated_image_1790692292163.png";
import bleachedHeritageMoodBoardImg from "../assets/images/Beige Minimalist Mood Board Fashion Presentation.png";
import bleachedHeritageGallery2 from "../assets/images/regenerated_image_1790696500342.png";
import acidStarCoverImg from "../assets/images/regenerated_image_1787503078706.jpg";
import gothicDebutanteCoverImg from "../assets/images/regenerated_image_1787502917021.jpg";
import darkSafariGallery2 from "../assets/images/regenerated_image_1789410389704.jpg";
import darkSafariGallery3 from "../assets/images/dark_safari_gallery_3_independent.jpg";
import darkSafariGallery4 from "../assets/images/dark_safari_gallery_4_independent.png";
import portraitImg from "../assets/images/regenerated_image_1790111869119.png";
import jaipurSketchesImg from "../assets/images/regenerated_image_1790113115008.png";
import sketchCoverImg from "../assets/images/sketchbook/sketch_page_01.png";

export const initialData: PortfolioData = {
  name: "RITANSHI",
  title: "FASHION DESIGNER",
  tagline: "Between control and chaos.",
  bio: `I’m drawn to the space between the familiar and the unexpected.
I like creating clothes that feel effortless at first, but reveal something more through their details, proportions, textures or construction. My work moves between different aesthetics rather than staying within one — balancing nostalgia with modernity, simplicity with detail, and control with a little chaos.`,
  bioSecondary: `I’m especially interested in Indian crafts and the character they carry. I like taking those techniques out of their expected setting and reworking them through contemporary silhouettes and materials, so they feel relevant without losing what makes them special.
At the centre of it all is wearability. I want my clothes to have a point of view, but never at the cost of being lived in. For me, design is about creating pieces that people can actually live in, but still feel something distinctive when they wear them.`,
  portraitUrl: portraitImg,
  email: "ritanshipathak282005@gmail.com",
  instagram: "@_ritanshipathak_",
  linkedin: "linkedin.com/in/ritanshi-fashion",
  behance: "behance.net/ritanshipathak",
  contact: {
    email: "ritanshipathak282005@gmail.com",
    instagram: "https://instagram.com/_ritanshipathak_",
    linkedin: "https://linkedin.com/in/ritanshi-fashion",
    behance: "https://www.behance.net/ritanshipathak"
  },
  education: [
    {
      degree: "Bachelor of Design in Fashion Design",
      institution: "Indus Design School",
      year: "2022 — 2026"
    }
  ],
  skills: [
    "Concept & Creative Direction",
    "Denim Surface Manipulation & Bleach Washing",
    "Textile Manipulation",
    "Indian Craft Heritage Research (Zardozi, Kantha)",
    "Sustainable & Zero-Waste Pattern Drafting",
    "Material Research & Natural Dyeing",
    "Research-Led Design",
    "Garment Prototyping & Tailoring"
  ],
  interests: [
    "Raw Indigo & Acid Bleaching Techniques",
    "Structural Architecture & Brutalism",
    "Deconstructed Tailoring",
    "Surrealist Fashion & Proportional Distortion",
    "Indian Craft Communities & Artisan Empowerment"
  ],
  projects: [
    {
      id: "proj-1",
      number: "01",
      title: "Crimson Static",
      year: "2026",
      category: "",
      tagline: `A contemporary Y2K look that combines traditional Bandhani with expressive hand-painted denim.
The contrast between controlled craft and freehand mark-making gives the look a playful, individual character.`,
      description: "Crimson Static is a high-fashion eveningwear collection that reimagines traditional Rajasthani royal attire through a sharp contemporary lens. By marrying heavy silk brocades and gold zardozi threadwork with asymmetric cuts, exposed tailoring, and stark architectural silhouettes, the collection creates a dialogue between courtly opulence and modern nightlife rebellion.",
      concept: "The project draws inspiration from the contrast between Jaipur's historic Palaces at dusk and modern lounge culture—where classic royalty meets contemporary nightlife.",
      research: "Extensive study of archival court robes from the Maharaja collections, analyzing heavy zari weaves, pleated ghagras, and tailored angrakhas. The research focused on deconstructing these heavy garments into fluid, weightless evening silhouettes.",
      processDetails: "Draping trials were conducted using stiff organdie and metallic brocades on dress forms. Multiple laser-cut cutouts were integrated with hand-stitched gold bullion thread.",
      outcome: "A 6-look high-fashion collection accompanied by editorial video, technical garment specs, and custom metallic hardware closures.",
      coverImage: crimsonStaticCoverImg,
      galleryImages: [
        crimsonStaticCoverImg,
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
      ],
      tags: ["Eveningwear", "Brocade", "Rajasthani Heritage", "Deconstruction"]
    },
    {
      id: "proj-2",
      number: "02",
      title: "Absurdism Through an Abstract Lens",
      year: "2025",
      category: "Denim / Surface Development",
      tagline: "Controlled chemical oxidation and hand bleach resist printing on raw indigo denim.",
      description: "Absurdism Through an Abstract Lens is a comprehensive denim surface development project exploring controlled oxidation techniques. By replacing traditional chemical discharge printing with artisan hand-bleaching, brush resists, and acid-dipping, indigo garments transform into wearable canvas artworks with rich, organic gradient textures.",
      concept: "Indigo denim as a canvas for living memory—using bleach to erode color and expose contrasting underlying warp threads.",
      research: "Investigated traditional Rajasthani Dabu mud-resist dyeing methods adapted for sodium hypochlorite bleaching baths on 14oz raw selvedge denim.",
      processDetails: "Over 40 swatch tests varying bleach concentrations, exposure times, and wax resist applications. Garments were distressed manually with wire brushes and enzyme wash baths.",
      outcome: "A capsule collection of 4 oversized denim jackets, raw selvedge jeans, and a surface swatch archive exhibited at material fairs.",
      coverImage: bleachedHeritageCoverImg,
      moodBoardImage: bleachedHeritageMoodBoardImg,
      galleryImages: [
        bleachedHeritageCoverImg,
        bleachedHeritageGallery2,
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1200&auto=format&fit=crop"
      ],
      tags: ["Denim", "Surface Manipulation", "Indigo Bleach", "Artisan Wash"]
    },
    {
      id: "proj-3",
      number: "03",
      title: "ACID STAR",
      year: "2025",
      category: "",
      tagline: "Denim reworked with Bandhani and bleach, paired with a structured corset and utility details for a playful Y2K look.",
      description: "Acid Star delves into the emotional sensation of gravity and constraint through dramatic sculptural forms. Utilizing semi-transparent silk organza, steel boning, and suspended wire structures, the garments construct exaggerated silhouettes that appear to hover around the human body without weighing it down.",
      concept: "Making emotional weight visually tangible yet physically weightless through sheer architecture.",
      research: "Studied surrealist art movements, kinetic sculptures by Alexander Calder, and early 20th-century corsetry structures.",
      processDetails: "Internal corset engineering using spring steel boning wrapped in bias silk casing. Transparent horsehair braiding integrated into hemlines for airborne volume.",
      outcome: "A 5-piece runway installation showcasing gravity-defying organza gowns with custom internal support cages.",
      coverImage: acidStarCoverImg,
      galleryImages: [
        acidStarCoverImg,
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"
      ],
      tags: ["Surrealism", "Organza", "Sculptural Form", "Runway"]
    },
    {
      id: "proj-4",
      number: "04",
      title: "Gothic Debutante",
      year: "2024",
      category: "",
      tagline: `Gothic Debutante blends the elegance of old-world femininity with a darker, dramatic edge.
Sujni embroidery in silver thread runs through the centre of the corset, adding a delicate contrast to the black silhouette.`,
      description: "Gothic Debutante blends the elegance of old-world femininity with a darker, dramatic edge. Sujni embroidery in silver thread runs through the centre of the corset, adding a delicate contrast to the black silhouette.",
      concept: "Complete circular design: zero fabric scraps sent to landfills and non-toxic botanical colors.",
      research: "Conducted dye fastness tests across organic handloom cottons, mulberry silks, and hemp linens under varying pH conditions.",
      processDetails: "Pattern pieces were developed as interlocking geometric grids on 100% width handloom fabric, utilizing every square centimeter of cloth without cutting scraps.",
      outcome: "A zero-waste capsule wardrobes and a comprehensive natural dye color recipe book for artisan clusters.",
      coverImage: gothicDebutanteCoverImg,
      galleryImages: [
        gothicDebutanteCoverImg,
        "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop"
      ],
      tags: ["Sustainable", "Zero Waste", "Botanical Dyes", "Handloom"]
    },
    {
      id: "proj-5",
      number: "05",
      title: "Nocturnal",
      year: "2024",
      category: "",
      tagline: "The Nocturnal Blazer is inspired by the dark, mysterious aesthetic of Wednesday Addams. Its sharp shoulders and sculptural pleated sleeves create a dramatic gothic silhouette with a sophisticated edge.",
      description: "Nocturnal is an ongoing open atelier experiment probing the physical boundaries of raw indigo denim fabric. Through hand-pulled warp threads, contrasting industrial topstitching, multi-layer distressing, and resin setting, raw denim is pushed into tactile, 3D relief surfaces.",
      concept: "Deconstructing the world's most ubiquitous utilitarian fabric into abstract textile art.",
      research: "Analyzing historical workwear distressing patterns and Japanese sashiko repair stitching.",
      processDetails: "Swatches were built layer by layer using 100% cotton threads, heavy hand-knotting, and high-heat resin treatment for rigid structural holds.",
      outcome: "An archival collection of 25 micro-swatches and 3 outerwear prototypes exploring extreme denim textures.",
      coverImage: nocturnalCoverImage,
      galleryImages: [
        nocturnalCoverImage,
        "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1200&auto=format&fit=crop"
      ],
      tags: ["Textile Research", "Denim", "Topstitching", "Sashiko"]
    },
    {
      id: "proj-6",
      number: "06",
      title: "DARK SAFARI",
      year: "2024",
      category: "INDIAN CRAFT \\ Chamba Rumal, Feral, LEOPARD",
      tagline: "Inspired by the rich detailing of Chamba Rumal, this piece brings the craft into a more playful, contemporary space.",
      description: "Dark Safari is a field research and design collaboration with artisan embroidery communities in Gujarat and Uttar Pradesh. The project documents endangered hand-stitching techniques and recontextualizes them onto oversized, modern outerwear and contemporary tailoring.",
      concept: "Empowering traditional craft communities by integrating heritage handwork with high-fashion streetwear silhouettes.",
      research: "Direct field work living alongside artisan families in Lucknow and Kutch, mapping motif histories and stitch mechanics.",
      processDetails: "Co-created motif designs translated onto dense wool felts and raw cotton canvases using metallic dori work and mirror inserts.",
      outcome: "A collaborative 4-piece outerwear collection, artisan documentation monograph, and fair-trade production framework.",
      coverImage: darkSafariCoverImage,
      galleryImages: [
        darkSafariCoverImage,
        darkSafariGallery2,
        darkSafariGallery3,
        darkSafariGallery4,
        "https://images.unsplash.com/photo-1516762689617-e1cffffd478d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop"
      ],
      tags: ["Indian Craft", "Chamba Rumal", "Feral", "Leopard"]
    }
  ],
  processItems: [
    {
      id: "proc-1",
      title: "Fashion Illustrations & Atelier Sketches",
      category: "Sketch",
      imageUrl: sketchCoverImg,
      description: "Fashion illustrations expressing dramatic color and line across 14 archival sketchbook pages by Ritanshi Pathak.",
      projectRef: "proj-1",
      year: "2026"
    },
    {
      id: "proc-2",
      title: "Acid Bleach Swatch #14",
      category: "CLO3D",
      imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
      description: "30-minute sodium hypochlorite brush wash on 14oz indigo denim with wax resist masking.",
      projectRef: "proj-2",
      year: "2025"
    },
    {
      id: "proc-3",
      title: "Organza Draping on Dress Form",
      category: "Sustainable Study",
      imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
      description: "Testing spiral boning channels to suspend translucent silk volume without visible internal seams.",
      projectRef: "proj-3",
      year: "2025"
    },
    {
      id: "proc-5",
      title: "Indigo Warp Pulling Test",
      category: "Textile Exploration",
      imageUrl: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=1200&auto=format&fit=crop",
      description: "Hand-stripping horizontal weft threads to expose raw white vertical warp cords.",
      projectRef: "proj-5",
      year: "2024"
    },
    {
      id: "proc-7",
      title: "Zero-Waste Pattern Grid Blueprint",
      category: "Sustainable Study",
      imageUrl: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1200&auto=format&fit=crop",
      description: "Tessellated geometric pattern drafting layout minimizing cutting loss to <0.5%.",
      projectRef: "proj-4",
      year: "2024"
    },
    {
      id: "proc-8",
      title: "Hand Zardozi Gold Bullion Study",
      category: "CLO3D",
      imageUrl: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop",
      description: "Traditional metallic coiled wire embroidery on heavy black felt background.",
      projectRef: "proj-6",
      year: "2024"
    }
  ]
};

export const absurdismThroughAbstractLens = {
  coverImage: bleachedHeritageCoverImg,
  moodBoardImage: bleachedHeritageMoodBoardImg,
};

