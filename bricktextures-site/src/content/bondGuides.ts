export type BondItem = {
  id: string;
  name: string;
  /** Matches a layout group title in bondExamples. */
  layoutGroup: string;
  description: string;
  /** Common alternate names, when they are well established. */
  alsoKnownAs?: string[];
  /** Freeform side note about naming (shown in the same style as also-known-as). */
  nameNote?: string;
};

export type BondGuide = {
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  whyChangeBond: {
    title: string;
    paragraphs: string[];
  };
  pickAdvice: {
    title: string;
    intro: string;
    sections: { title: string; paragraphs: string[] }[];
  };
  suitedFinishLinks: { label: string; slug: string }[];
  exampleBrick: {
    name: string;
    appUrl: string;
  };
  exploreAllBricksUrl: string;
  bonds: BondItem[];
};

export const BOND_GUIDE: BondGuide = {
  h1: "Brick bonds and patterns",
  lead:
    "Running bonds, header-and-stretcher arrangements, herringbone, stack and basketweave — patterns to compare for facing brickwork.",
  metaTitle: "Brick Bonds and Patterns for Facing Bricks | Bricktextures",
  metaDescription:
    "Why change from stretcher bond? Compare half-bond, Flemish, English, herringbone, stack and basketweave brick patterns for facing brickwork.",
  whyChangeBond: {
    title: "Why change the bond from standard stretcher bond?",
    paragraphs: [
      "Stretcher bond is a reliable everyday default. Changing the bond is usually about visual interest: a richer rhythm, a feature panel, or a façade that plays with light and shadow instead of reading as a flat grid of stretchers.",
      "Those patterns become more discernible when the mortar colour contrasts with the brick colour. A closer match softens the bond; a clearer contrast makes the pattern stand out. Read more on our mortar colour page.",
      "Bricktextures offers an extensive range of brick bonds and patterns — many that already exist in practice, plus a few variations we have added ourselves, because why not. Feel free to get in touch if you have a pattern you would like to see added to this page and the app.",
    ],
  },
  pickAdvice: {
    title: "Which bond to pick",
    intro:
      "These questions help you pick a bond that suits your project — the design intention of the façade, wall thickness, overall building design, then the brick you have chosen.",
    sections: [
      {
        title: "What is the main design intention of your façade?",
        paragraphs: [
          "Do you want a beautiful brick blend, where the mortar transitions into the bricks and each unit has subtle variation that gives an overall appearance of a beautiful wall?",
          "Or do you want to change the mortar colour to highlight the brick and mortar lines, drawing the eye more to the pattern rather than the overall colour of the wall?",
          "If you want both, choose more carefully — compare the same bond with a softer mortar match and with clearer contrast so you can see how each reads.",
        ],
      },
      {
        title: "How thick is your wall?",
        paragraphs: [
          "Is this a facing leaf or cladding? How wide is the wall? That decision shapes which bonds are practical to lay.",
          "Patterns that use only the stretcher face suit what is usually called a half-brick wall — about 102 mm thick for a standard metric brick. Most everyday running bonds fall into this group.",
          "Patterns that use headers generally suit a thicker, one-brick wall — the full width of a stretcher face, 215 mm for a standard metric brick. Flemish, English, Monk and other header-and-stretcher bonds belong here.",
          "These are practical guides, not hard rules. On a half-brick wall, headers usually mean cutting many bricks into halves, which slows laying. Where units are already supplied to the required size — for example in some cladding systems — you are freer to use almost any bond.",
        ],
      },
      {
        title: "Consider your overall building design",
        paragraphs: [
          "Is the project modern or traditional? Running bonds and familiar header-and-stretcher arrangements such as Flemish, English and Monk bond are often used on character streets and heritage-led work.",
          "If the building design favours straight lines and clear geometry, look at the stack and related patterns below. Decorative options such as herringbone and basketweave sit between the two: they add visual play without needing a fully geometric elevation.",
        ],
      },
      {
        title: "Consider your chosen brick",
        paragraphs: [
          "First select a brick you like that suits the project — colour and texture come before the bond.",
          "Then look at its size tolerance and natural variation. Ask whether that brick will easily allow the bond you prefer — geometric patterns with continuous joints need more consistent dimensions.",
          "Compare the same product across bonds under the same mortar and lighting in Bricktextures so course rhythm and alignment are clear.",
        ],
      },
    ],
  },
  suitedFinishLinks: [
    { label: "Smooth bricks", slug: "smooth" },
    { label: "Glazed bricks", slug: "glazed" },
    { label: "Wirecut bricks", slug: "wirecut" },
  ],
  /** Brick used for the bond example images on this page. */
  exampleBrick: {
    name: "Vandersanden Quartis",
    appUrl: "/app/facing-bricks?c=QUA&src=bonds-example",
  },
  exploreAllBricksUrl: "/app/facing-bricks?src=bonds",
  bonds: [
    {
      id: "half-bond",
      name: "Half bond variations",
      layoutGroup: "1/2 Bond",
      alsoKnownAs: ["stretcher bond", "running bond"],
      description:
        "Stretcher bond is the most popular bond — easy to lay, quick to install, and familiar on everyday facing brickwork. The half-bond lap keeps the façade strong and well tied together while the pattern stays simple to read.",
    },
    {
      id: "quarter-bond",
      name: "Quarter bond variations",
      layoutGroup: "1/4 Bond Toothed",
      alsoKnownAs: ["raking stretcher bond"],
      description:
        "Quarter bond still gives enough lap between courses to help maintain structural strength in the wall, while shifting the rhythm away from a plain stretcher grid. Many variations sit in this group — toothed, stepped and related offsets.",
    },
    {
      id: "traditional-bond",
      name: "Traditional bond variations",
      layoutGroup: "Traditional",
      nameNote:
        "Local areas may use traditional regional names — for example, Flemish garden wall bond is known as Sussex bond in some regions.",
      description:
        "This is where bonded brickwork began. Flemish, English, Monk and related patterns used headers — the head of the brick on the face, with the unit running through the wall — to tie the leaf together through its thickness and make it stronger. We still use them today as much for appearance as for how they were built.",
    },
    {
      id: "herringbone",
      name: "Herringbone bond variations",
      layoutGroup: "Herringbone",
      description:
        "Herringbone is common for feature panels, though it can also be used across larger areas. We offer many herringbone variations to create great visual interest in your designs.",
    },
    {
      id: "stack-bond",
      name: "Stack bond variations",
      layoutGroup: "Stacked",
      alsoKnownAs: ["block bond"],
      description:
        "The straight vertical and horizontal lines suit bricks with small size tolerances — variation can show in continuous joints. They also suit projects whose building design already favours straight running lines.",
    },
    {
      id: "basketweave",
      name: "Basketweave bond variations",
      layoutGroup: "Basketweave",
      alsoKnownAs: ["weave bond"],
      description:
        "Like herringbone, basketweave is more traditionally used in feature panels, though it can also work across larger areas where a woven, modular pattern is wanted.",
    },
  ],
};

/** Maps legacy /bonds/:slug paths to in-page anchors. */
export const BOND_LEGACY_REDIRECTS: Record<string, string> = {
  traditional: "half-bond",
  modern: "stack-bond",
};
