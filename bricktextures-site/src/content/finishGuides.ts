import smoothIntro from "../assets/finishes/smooth/smooth-brick-texture-detail.webp";
import smoothProject from "../assets/finishes/smooth/smooth-brick-riverside-house.webp";
import glazedIntro from "../assets/finishes/glazed/glazed-brick-texture-detail.webp";
import glazedProject from "../assets/finishes/glazed/glazed-brick-street-use-case.webp";
import tumbledIntro from "../assets/finishes/tumbled/tumbled-brick-texture-detail.webp";
import tumbledProject from "../assets/finishes/tumbled/tumbled-brick-barn-conversion.webp";
import traditionalIntro from "../assets/finishes/traditional/traditional-brick-texture-detail.webp";
import traditionalProject from "../assets/finishes/traditional/traditional-brick-use-case.webp";
import wirecutIntro from "../assets/finishes/wirecut/wirecut-brick-texture-detail.webp";
import wirecutProject from "../assets/finishes/wirecut/wirecut-brick-use-case.webp";

export type FinishGuide = {
  slug: string;
  tone: "smooth" | "glazed" | "tumbled" | "traditional" | "wirecut";
  title: string;
  shortLabel: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  appFilterUrl: string;
  whatItIs: string;
  overallFeel: string;
  whyChoose: string[];
  introImage?: {
    label: string;
    caption: string;
    src: string;
  };
  projectImage?: {
    label: string;
    caption: string;
    src: string;
  };
};

export const FINISH_GUIDES: FinishGuide[] = [
  {
    slug: "smooth",
    tone: "smooth",
    title: "Smooth facing bricks",
    shortLabel: "Smooth",
    h1: "Smooth facing bricks",
    lead:
      "Smooth bricks have an even face with very little texture. They give brickwork a clean, precise appearance and allow the brick colour, mortar and joint pattern to stand out.",
    metaTitle: "Smooth Facing Bricks | Texture Guide | Bricktextures",
    metaDescription:
      "Smooth facing brick texture: even face character and reasons to specify it. Also known as a smooth finish in many catalogues.",
    appFilterUrl: "/app/facing-bricks?filterFinish=Smooth&src=finish-smooth",
    whatItIs:
      "A smooth brick has a flat, even face without the deep marks, creases or roughness found on more textured bricks. Smooth bricks can be made in several different ways, so the edges, sheen and amount of variation will still differ from one product to another.",
    overallFeel:
      "With less texture competing for attention, the colour of the brick and the lines created by the mortar become more noticeable. This can make a building feel ordered and contemporary. It also makes smooth brick comfortable to use on walls that people pass close to.",
    whyChoose: [
      "Choose a smooth brick when you want clean lines and a simple, controlled appearance.",
      "It also works well in corridors, stairs and lobbies, where people regularly pass close to the wall.",
    ],
    introImage: {
      label: "Smooth brick texture close-up",
      caption:
        "Close-up of smooth brickwork, showing an even face with little surface texture and dark mortar joints.",
      src: smoothIntro,
    },
    projectImage: {
      label: "Smooth brick entrance at Riverside House",
      caption:
        "A contemporary entrance in smooth terracotta brick. The even face and precise joints give a clean, controlled appearance beside dark frames and wall lighting.",
      src: smoothProject,
    },
  },
  {
    slug: "glazed",
    tone: "glazed",
    title: "Glazed facing bricks",
    shortLabel: "Glazed",
    h1: "Glazed facing bricks",
    lead:
      "Glazed bricks have a coloured, glass-like surface that reflects light and is easier to clean. They can introduce strong colour and give a wall a bright, distinctive character.",
    metaTitle: "Glazed Facing Bricks | Texture Guide | Bricktextures",
    metaDescription:
      "Glazed facing brick texture: reflective faces with strong, even colour — and when to specify them.",
    appFilterUrl: "/app/facing-bricks?filterFinish=Glazed&src=finish-glazed",
    whatItIs:
      "A glaze is a glass-like coating fixed to one or more faces of the brick during firing. It creates a less absorbent surface and allows colours that would be difficult to achieve with the clay alone. Some glazes are glossy and highly reflective; others have a softer, more matt appearance.",
    overallFeel:
      "Glazed brick naturally attracts attention. Strong colours can make an entrance, feature wall or part of an elevation stand out, while lighter glazes can reflect more light into a space. Always view a sample in the intended light, because the level of shine can change its appearance considerably.",
    whyChoose: [
      "Choose glazed brick where easy cleaning is important, particularly in busy public spaces.",
      "It is also useful when colour marks an entrance or route through a busy public building.",
    ],
    introImage: {
      label: "Glazed brick texture close-up",
      caption:
        "Close-up of glazed brickwork, showing a reflective coloured face and clean mortar joints.",
      src: glazedIntro,
    },
    projectImage: {
      label: "Glazed red brick street façade",
      caption:
        "Glazed red brick on a street frontage. The reflective face brings strong colour to the elevation and reads clearly beside glass and paving.",
      src: glazedProject,
    },
  },
  {
    slug: "tumbled",
    tone: "tumbled",
    title: "Tumbled facing bricks",
    shortLabel: "Tumbled",
    h1: "Tumbled facing bricks",
    lead:
      "Tumbled bricks have chipped, rounded edges that make new brickwork feel softer and more established. They suit buildings that need a rustic, weathered or traditional character.",
    metaTitle: "Tumbled Facing Bricks | Texture Guide | Bricktextures",
    metaDescription:
      "Tumbled facing brick texture: softened edges, rustic character, and reasons to specify it.",
    appFilterUrl: "/app/facing-bricks?filterEdgeType=Tumbled&src=finish-tumbled",
    whatItIs:
      "Tumbled describes the worn appearance of the brick edges rather than the texture of the main face. The corners and edges are deliberately chipped or rounded, but the face itself may be smooth, creased or textured. Some products are only lightly softened, while others have a much more aged appearance.",
    overallFeel:
      "The softened outline removes the sharpness associated with new brickwork. This can help a new building or extension sit more comfortably beside older masonry and within rural surroundings.",
    whyChoose: [
      "Choose a tumbled brick when sharp new edges would look out of place beside older buildings.",
      "It is also well suited to homes, barns and hospitality spaces where you want a relaxed, rustic feel.",
    ],
    introImage: {
      label: "Tumbled brick texture close-up",
      caption:
        "Close-up of tumbled brickwork, showing chipped edges, mixed earthy colours and dark mortar joints.",
      src: tumbledIntro,
    },
    projectImage: {
      label: "Tumbled brick barn conversion",
      caption:
        "A barn conversion in traditional tumbled brick. Softened edges and mixed earthy tones help new work sit comfortably beside older masonry and rural settings.",
      src: tumbledProject,
    },
  },
  {
    slug: "traditional",
    tone: "traditional",
    title: "Traditional facing bricks",
    shortLabel: "Traditional",
    h1: "Traditional facing bricks",
    lead:
      "Traditional bricks have creased, sanded faces and natural variation from one brick to the next. They give new brickwork warmth, texture and the familiar character of older masonry.",
    metaTitle: "Traditional Facing Bricks | Texture Guide | Bricktextures",
    metaDescription:
      "Traditional facing brick texture: sand-released creased character and reasons to specify it.",
    appFilterUrl:
      "/app/facing-bricks?filterProductionType=Sand%20Released&src=finish-traditional",
    whatItIs:
      "Traditional stock-style bricks are recognised by the sand on their surface and the folds and creases across the face. These marks create texture and make each brick appear slightly different. Both handmade and machine-made products are available, so the amount of variation depends on the brick you choose.",
    overallFeel:
      "The creases catch light and shadow, giving the wall more depth than a smooth brick. Their familiar, imperfect appearance can make a building feel settled and welcoming. Look at several bricks or a sample panel, rather than one brick, so you can judge the full range of colour and texture.",
    whyChoose: [
      "Choose a traditional brick when new work needs to sit comfortably beside older brickwork.",
      "It also suits new buildings where you want warmth, visible texture and variation rather than a precise, uniform wall.",
    ],
    introImage: {
      label: "Traditional brick texture close-up",
      caption:
        "Close-up of traditional brickwork, showing creased, sanded faces, mixed red and blue tones, and dark mortar joints.",
      src: traditionalIntro,
    },
    projectImage: {
      label: "Traditional brick cottage entrance",
      caption:
        "A cottage entrance in traditional creased brick. Mixed red tones, sanded faces and soldier arches give warmth and the familiar character of older masonry.",
      src: traditionalProject,
    },
  },
  {
    slug: "wirecut",
    tone: "wirecut",
    title: "Wirecut facing bricks",
    shortLabel: "Wirecut",
    h1: "Wirecut facing bricks",
    lead:
      "Wirecut bricks are generally regular in size and available in a wide choice of colours and surface textures. Their consistent shape makes them a practical choice for large areas of brickwork.",
    metaTitle: "Wirecut Facing Bricks | Texture Guide | Bricktextures",
    metaDescription:
      "Wirecut facing brick texture: regular sizing, face treatment options, and reasons to specify it.",
    appFilterUrl: "/app/facing-bricks?filterProductionType=Wirecut&src=finish-wirecut",
    whatItIs:
      "The name wirecut comes from the way the clay is formed as a continuous column and cut into individual bricks using wires. This method can produce many different surfaces, including smooth, dragged, rolled, dimpled and rusticated faces. A wirecut brick is therefore not one particular texture.",
    overallFeel:
      "The main advantage is consistency. The regular size and shape can give large elevations a controlled appearance, while the chosen face treatment decides whether the finished wall feels clean and modern or rougher and more natural.",
    whyChoose: [
      "Choose wirecut bricks when a large elevation or several phases need a consistent appearance.",
      "Their wide availability can also help when a project has a tight budget or programme.",
    ],
    introImage: {
      label: "Wirecut brick texture close-up",
      caption:
        "Close-up of wirecut brickwork, showing regular faces with textured surface character and dark mortar joints.",
      src: wirecutIntro,
    },
    projectImage: {
      label: "Wirecut brick at a contemporary entrance",
      caption:
        "Wirecut brickwork on a modern elevation. Regular size and a textured face give a controlled, consistent reading beside glass and dark frames.",
      src: wirecutProject,
    },
  },
];

export function getFinishGuide(slug: string): FinishGuide | undefined {
  return FINISH_GUIDES.find(guide => guide.slug === slug);
}
