export type FormatGuideSlug = "standard" | "imperial" | "linear";

export type FormatGuide = {
  slug: FormatGuideSlug;
  tone: FormatGuideSlug;
  shortLabel: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  appFilterUrl: string;
  ctaLabel: string;
  whatItIs: string;
  whyItMatters: string;
  typicalSizes: string;
  inAppNote: string;
  relatedLinks: { label: string; to: string }[];
  placeholders: { label: string; caption: string; wide?: boolean }[];
};

export const FORMAT_GUIDES: FormatGuide[] = [
  {
    slug: "standard",
    tone: "standard",
    shortLabel: "Standard",
    h1: "Standard size facing bricks",
    lead:
      "The conventional metric brick — 215 × 65 mm. With a standard 10 mm joint, one stretcher equals two headers, which is why so many familiar bond layouts work cleanly.",
    metaTitle: "Standard Size Facing Bricks 215 × 65 | Bricktextures",
    metaDescription:
      "Standard size facing bricks (215 × 65 mm): why the metric brick suits so many bonds, and how to browse them in Bricktextures. Also called standard format in many catalogues.",
    appFilterUrl:
      "/app/facing-bricks?filterSize=Standard%20%3A%20215%20x%2065&src=format-standard",
    ctaLabel: "Explore standard size bricks",
    whatItIs:
      "The standard metric facing-brick work size is 215 mm long by 65 mm high on the exposed face. It is the default size in many current UK and Irish catalogues, although availability varies by manufacturer.",
    whyItMatters:
      "With a nominal 10 mm joint, one 215 mm stretcher coordinates with two 102.5 mm headers plus one perpend joint. This module supports half-bond and many established header-and-stretcher patterns. Product availability is broad, but bond suitability still depends on actual dimensions, tolerances and the specified joint range.",
    typicalSizes: "215 × 65 mm face (metric standard).",
    inAppNote:
      "In Bricktextures, open the Size filter and choose Standard : 215 x 65. You can then trial bonds and joint widths on manufacturer products in that format.",
    relatedLinks: [
      { label: "Mortar colour", to: "/facing-bricks/mortar" },
      { label: "Joint size", to: "/facing-bricks/joint-size" },
      { label: "Classic brick bonds", to: "/facing-bricks/bonds/classic" },
      { label: "Traditional brick bonds", to: "/facing-bricks/bonds/traditional" },
      { label: "Clay vs concrete bricks", to: "/facing-bricks/clay-vs-concrete" },
    ],
    placeholders: [
      {
        label: "Standard 215 × 65 brick face",
        caption: "Replace with a clear standard-size stretcher face.",
        wide: true,
      },
      {
        label: "Stretcher equal to two headers with 10 mm joints",
        caption: "Replace with a diagram or wall detail showing the 1:2 stretcher-to-header fit.",
        wide: true,
      },
    ],
  },
  {
    slug: "imperial",
    tone: "imperial",
    shortLabel: "Imperial",
    h1: "Imperial size facing bricks",
    lead:
      "Imperial and imperial-compatible sizes used to match older brickwork, commonly including 215 × 73 mm and 228 × 68 mm products.",
    metaTitle: "Imperial Size Facing Bricks | Bricktextures",
    metaDescription:
      "Imperial size facing bricks: common sizes such as 215 × 73 and 228 × 68, header work, tight joints, and how to browse them in Bricktextures.",
    appFilterUrl:
      "/app/facing-bricks?filterSize=Imperial%20%3A%20215%20x%2073&filterSize=Imperial%20%3A%20228%20x%2068&src=format-imperial",
    ctaLabel: "Explore imperial size bricks",
    whatItIs:
      "Imperial facing bricks are a family of sizes associated with construction predating metric standardisation or manufactured to match it. Current products commonly include 215 × 73 mm and 228 × 68 mm faces, but historic brick dimensions vary by period, region and source.",
    whyItMatters:
      "These sizes are specified mainly to match existing masonry or reproduce its coursing. Record the existing unit dimensions, joint width and bond rather than relying on the label 'imperial'. Historic work may include headers, colour variation and joints narrower or wider than current nominal practice; all vary by building and period.",
    typicalSizes:
      "Commonly 215 × 73 mm; also 228 × 68 mm and other imperial faces depending on the manufacturer.",
    inAppNote:
      "In Bricktextures, open the Size filter and choose the Imperial entries (for example Imperial : 215 x 73 and Imperial : 228 x 68). Adjust joint width when you want a tighter traditional reading.",
    relatedLinks: [
      { label: "Joint size", to: "/facing-bricks/joint-size" },
      { label: "Traditional brick bonds", to: "/facing-bricks/bonds/traditional" },
      { label: "Traditional texture guide", to: "/facing-bricks/finish/traditional" },
      { label: "Clay vs concrete bricks", to: "/facing-bricks/clay-vs-concrete" },
    ],
    placeholders: [
      {
        label: "Imperial brick in an older façade",
        caption: "Replace with imperial-size brickwork, ideally showing header courses.",
        wide: true,
      },
      {
        label: "Tight-jointed imperial bond detail",
        caption: "Replace with a close joint detail; optionally with contrasting header colour.",
        wide: true,
      },
    ],
  },
  {
    slug: "linear",
    tone: "linear",
    shortLabel: "Linear",
    h1: "Linear size facing bricks",
    lead:
      "Long, low brick sizes used to increase horizontal emphasis and alter the coursing module.",
    metaTitle: "Linear Size Facing Bricks | Bricktextures",
    metaDescription:
      "Linear and long brick sizes: horizontal emphasis, why architects choose them, and how to browse linear sizes in Bricktextures.",
    appFilterUrl: "/app/facing-bricks?src=format-linear",
    ctaLabel: "Explore linear size bricks",
    whatItIs:
      "Bricktextures groups a product as linear, or long format, when its stretcher length exceeds two header widths. This is a catalogue classification rather than a universal industry definition; exact dimensions vary by manufacturer.",
    whyItMatters:
      "A long, shallow unit increases the horizontal emphasis of bed joints and changes the module around openings, corners and movement joints. Check cutting, support, restraint and bond requirements for the selected product, particularly where units are unusually long or shallow.",
    typicalSizes:
      "Any long, shallow face where stretcher length exceeds two header widths (exact millimetre sizes vary by manufacturer).",
    inAppNote:
      "In Bricktextures, open the Size filter and choose the Linear group. Exact size labels vary with the catalogue; the Linear filter collects the long-format options together.",
    relatedLinks: [
      { label: "Modern brick bonds", to: "/facing-bricks/bonds/modern" },
      { label: "Smooth texture guide", to: "/facing-bricks/finish/smooth" },
      { label: "Clay vs concrete bricks", to: "/facing-bricks/clay-vs-concrete" },
    ],
    placeholders: [
      {
        label: "Linear brick façade with strong horizontal grain",
        caption: "Replace with a long-format elevation that reads clearly horizontal.",
        wide: true,
      },
      {
        label: "Linear brick at a large window opening",
        caption: "Replace with a detail where linear brick frames or runs past a wide opening.",
        wide: true,
      },
    ],
  },
];

export function getFormatGuide(slug: string): FormatGuide | undefined {
  return FORMAT_GUIDES.find(guide => guide.slug === slug);
}
