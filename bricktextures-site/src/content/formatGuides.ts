import standardIntro from "../assets/formats/standard/standard-brick-texture-detail.webp";
import imperialIntro from "../assets/formats/imperial/imperial-brick-texture-detail.webp";
import imperialProject from "../assets/formats/imperial/imperial-brick-use-case.webp";
import linearIntro from "../assets/formats/linear/linear-brick-texture-detail.webp";
import linearProject from "../assets/formats/linear/linear-brick-house-use-case.webp";

export type FormatGuideSlug = "standard" | "imperial" | "linear";

export type FormatGuide = {
  slug: FormatGuideSlug;
  tone: FormatGuideSlug;
  shortLabel: string;
  /** Short SEO phrase used in download headings, e.g. "metric". */
  textureSeoNoun: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  appFilterUrl: string;
  /** Opens the texture tab with this size filter where available. */
  appTextureUrl: string;
  ctaLabel: string;
  whatItIs: string;
  whyItMatters: string;
  typicalSizes: string;
  inAppNote: string;
  relatedLinks: { label: string; to: string }[];
  placeholders: {
    label: string;
    caption: string;
    wide?: boolean;
    src?: string;
    ratio?: "landscape" | "square" | "natural";
  }[];
};

export const FORMAT_GUIDES: FormatGuide[] = [
  {
    slug: "standard",
    tone: "standard",
    shortLabel: "Standard",
    textureSeoNoun: "metric",
    h1: "Standard size facing bricks",
    lead:
      "The conventional metric brick — 215 × 65 mm. It is the most mass-produced facing brick size in England and Ireland because it meets the majority of requirements architects and designers ask for.",
    metaTitle: "Standard Size Facing Bricks 215 × 65 | Bricktextures",
    metaDescription:
      "Standard metric facing bricks (215 × 65 mm): the most widely produced size in England and Ireland, and how to download a seamless metric brick texture in Bricktextures.",
    appFilterUrl:
      "/app/facing-bricks?filterSize=Standard%20%3A%20215%20x%2065&src=format-standard",
    appTextureUrl:
      "/app/facing-bricks?filterSize=Standard%20%3A%20215%20x%2065&tab=texture&src=format-standard-textures",
    ctaLabel: "Explore standard size bricks",
    whatItIs:
      "The standard metric facing-brick work size is 215 mm long by 65 mm high on the exposed face. It is the default size in many current UK and Irish catalogues, although availability varies by manufacturer.",
    whyItMatters:
      "This is the most mass-produced facing brick size in England and Ireland. Manufacturers make it in the largest volumes because it satisfies most architectural and design requirements — colour, texture, bond options and programme — without needing a special format. Availability is therefore wide, but always check the actual brick dimensions before fixing the bond.",
    typicalSizes: "215 × 65 mm face (metric standard).",
    inAppNote:
      "In Bricktextures, open the Size filter and choose Standard : 215 x 65. You can then try different bonds and joint widths on real manufacturer products.",
    relatedLinks: [
      { label: "10 mm joint and stretcher module", to: "/facing-bricks/joint-size#when-to-change" },
      { label: "Mortar colour", to: "/facing-bricks/mortar" },
      { label: "Traditional brick bonds", to: "/facing-bricks/bonds#half-bond" },
      { label: "Clay vs concrete bricks", to: "/facing-bricks/clay-vs-concrete" },
    ],
    placeholders: [
      {
        label: "Standard metric brick close-up",
        caption:
          "Close-up of standard 215 × 65 mm metric brickwork, showing the familiar stretcher face and course height.",
        wide: true,
        src: standardIntro,
        ratio: "natural",
      },
    ],
  },
  {
    slug: "imperial",
    tone: "imperial",
    shortLabel: "Imperial",
    textureSeoNoun: "imperial",
    h1: "Imperial size facing bricks",
    lead:
      "Taller, pre-metric sizes — often 215 × 73 mm or 228 × 68 mm — chosen to match older brickwork and its coursing.",
    metaTitle: "Imperial Size Facing Bricks | Bricktextures",
    metaDescription:
      "Imperial size facing bricks: common sizes such as 215 × 73 and 228 × 68, and how to download a seamless imperial brick texture in Bricktextures.",
    appFilterUrl:
      "/app/facing-bricks?filterSize=Imperial%20%3A%20215%20x%2073&filterSize=Imperial%20%3A%20228%20x%2068&src=format-imperial",
    appTextureUrl:
      "/app/facing-bricks?filterSize=Imperial%20%3A%20215%20x%2073&filterSize=Imperial%20%3A%20228%20x%2068&tab=texture&src=format-imperial-textures",
    ctaLabel: "Explore imperial size bricks",
    whatItIs:
      "Imperial facing bricks are a family of sizes associated with construction predating metric standardisation or manufactured to match it. Current products commonly include 215 × 73 mm and 228 × 68 mm faces, but historic brick dimensions vary by period, region and source.",
    whyItMatters:
      "Imperial sizes are mainly chosen to match existing masonry and its coursing. You will not usually find an exact match for an older imperial brick — dimensions, colour and weathering vary by period and source — but you can find a very close match. Measure the brick, joint and bond on site rather than relying on the word ‘imperial’ alone. Bricktextures helps you compare products so you can identify the best matches available on the market.",
    typicalSizes:
      "Commonly 215 × 73 mm; also 228 × 68 mm and other imperial faces depending on the manufacturer.",
    inAppNote:
      "In Bricktextures, open the Size filter and choose the Imperial entries (for example Imperial : 215 x 73 and Imperial : 228 x 68). Compare colour, texture and coursing against the existing wall to find the closest available match, then adjust joint width when you want a tighter traditional reading.",
    relatedLinks: [
      { label: "Joint size", to: "/facing-bricks/joint-size" },
      { label: "Traditional brick bonds", to: "/facing-bricks/bonds#half-bond" },
      { label: "Traditional texture guide", to: "/facing-bricks/finish/traditional" },
      { label: "Clay vs concrete bricks", to: "/facing-bricks/clay-vs-concrete" },
    ],
    placeholders: [
      {
        label: "Imperial 73 mm brick close-up",
        caption:
          "Close-up of imperial-size brickwork (215 × 73 mm), showing the taller course height compared with metric standard.",
        wide: true,
        src: imperialIntro,
        ratio: "natural",
      },
      {
        label: "Imperial brick extension matching existing masonry",
        caption:
          "A worked example: new imperial-size brickwork beside older masonry. An exact match is rare, but a very close colour and texture match keeps the extension sitting comfortably with the original house — Bricktextures helps you find the best products available.",
        wide: true,
        src: imperialProject,
      },
    ],
  },
  {
    slug: "linear",
    tone: "linear",
    shortLabel: "Linear",
    textureSeoNoun: "linear",
    h1: "Linear size facing bricks",
    lead:
      "Long, low bricks that draw the eye along the wall and change how courses line up around openings.",
    metaTitle: "Linear Size Facing Bricks | Bricktextures",
    metaDescription:
      "Linear and long brick sizes: horizontal emphasis, and how to download a seamless linear brick texture in Bricktextures.",
    appFilterUrl: "/app/facing-bricks?filterSize=Linear&src=format-linear",
    appTextureUrl: "/app/facing-bricks?filterSize=Linear&tab=texture&src=format-linear-textures",
    ctaLabel: "Explore linear size bricks",
    whatItIs:
      "Bricktextures groups a product as linear, or long format, when its stretcher length exceeds two header widths. This is a catalogue grouping rather than a fixed industry term, and the exact dimensions vary by manufacturer.",
    whyItMatters:
      "A long, shallow brick gives the wall a stronger horizontal line and changes how courses meet openings, corners and movement joints. A tight or glued joint keeps the edges of each unit visible and makes that horizontal line even clearer — wider mortar softens it. Check how the selected brick will be cut, supported and bonded, especially when the units are unusually long or shallow.",
    typicalSizes:
      "Any long, shallow face where stretcher length exceeds two header widths (exact millimetre sizes vary by manufacturer).",
    inAppNote:
      "In Bricktextures, open the Size filter and choose Linear. That one choice covers all long-format sizes in the catalogue, including new ones as they are added.",
    relatedLinks: [
      { label: "Joint size", to: "/facing-bricks/joint-size" },
      { label: "Modern brick bonds", to: "/facing-bricks/bonds#stack-bond" },
      { label: "Smooth texture guide", to: "/facing-bricks/finish/smooth" },
      { label: "Clay vs concrete bricks", to: "/facing-bricks/clay-vs-concrete" },
    ],
    placeholders: [
      {
        label: "Linear brick close-up",
        caption:
          "Close-up of long-format linear brickwork, showing the elongated stretcher face and strong horizontal line of the courses.",
        wide: true,
        src: linearIntro,
        ratio: "natural",
      },
      {
        label: "Linear brick house with strong horizontal grain",
        caption:
          "A contemporary house in long-format linear brick. The elongated courses emphasise the horizontal line of the façade around the entrance, windows and garage.",
        wide: true,
        src: linearProject,
      },
    ],
  },
];

export function getFormatGuide(slug: string): FormatGuide | undefined {
  return FORMAT_GUIDES.find(guide => guide.slug === slug);
}
