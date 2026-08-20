export type BondItem = {
  name: string;
  /** Matches a layout group title in bondExamples. */
  layoutGroup: string;
  description: string;
  bestFor: string;
};

export type BondGuideSlug = "classic" | "modern" | "traditional";

export type BondGuide = {
  slug: BondGuideSlug;
  title: string;
  shortLabel: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  /** Empty means the bonds suit all facing bricks. */
  suitedFinishes: { label: string; slug: string }[];
  whyTheseBonds: string;
  alignmentNote: string;
  bonds: BondItem[];
};

export const BOND_GUIDES: BondGuide[] = [
  {
    slug: "classic",
    title: "Classic brick bonds",
    shortLabel: "Classic bonds",
    h1: "Classic brick bonds",
    lead:
      "Half-bond, quarter-bond and other running patterns — the everyday brick bonds used across most housing and commercial work.",
    metaTitle: "Classic Brick Bonds | Half-Bond & Running Bonds | Bricktextures",
    metaDescription:
      "Classic brick bonds for facing bricks: half-bond, quarter-bond and running variations used across everyday architecture.",
    suitedFinishes: [],
    whyTheseBonds:
      "Classic running bonds suit all facing bricks. Courses are laid mainly with the long face showing, usually offset by half a brick. Quarter-brick and stepped offsets can also be used where the brick size and joint allow.",
    alignmentNote:
      "Running bonds accommodate normal dimensional variation more readily than bonds with continuous vertical joints. Soldier courses, headers or changes in direction can still be added as local details without changing the field bond. Mortar colour and brick blend also alter the appearance.",
    bonds: [
      {
        name: "Half-bond / running bond",
        layoutGroup: "1/2 Bond",
        description:
          "Each course is offset by half a brick. It is straightforward to lay and is the most widely used facing brick bond.",
        bestFor: "Everyday housing, apartments, extensions and most facing brick elevations.",
      },
      {
        name: "Quarter-bond and stepped variations",
        layoutGroup: "1/4 Bond",
        description:
          "Running patterns using a quarter-brick or progressive offset. Check the lap against unit size, joint width and manufacturer guidance.",
        bestFor:
          "Walls where you want a livelier rhythm without leaving everyday running bonds.",
      },
    ],
  },
  {
    slug: "modern",
    title: "Modern geometric brick bonds",
    shortLabel: "Modern bonds",
    h1: "Modern geometric brick bonds",
    lead: "Stack and basketweave — geometric patterns based on a clearly repeated module and consistent joint alignment.",
    metaTitle: "Modern Brick Bonds | Stack & Basketweave | Bricktextures",
    metaDescription:
      "Modern geometric brick bonds: stack bond and basketweave — best with consistent, tight-tolerance facing bricks.",
    suitedFinishes: [
      { label: "Smooth bricks", slug: "smooth" },
      { label: "Glazed bricks", slug: "glazed" },
      { label: "Wirecut bricks", slug: "wirecut" },
    ],
    whyTheseBonds:
      "Stack and basketweave need the brick size, joint width and direction to repeat cleanly. Small size differences show quickly where vertical joints line up. Prefer bricks with consistent dimensions, agree the joint early and build a sample panel before specifying.",
    alignmentNote:
      "Size variation shows wherever joints must line up course after course. Prefer bricks with consistent dimensions and agree the joint early. Stack-bonded masonry may need specific reinforcement — confirm with the project engineer.",
    bonds: [
      {
        name: "Stack bond",
        layoutGroup: "Stacked",
        description:
          "Units aligned so perpend joints form continuous vertical lines. Dimensional and laying tolerances show readily.",
        bestFor:
          "Feature façades, contemporary housing, interiors and glazed colour statements.",
      },
      {
        name: "Basketweave",
        layoutGroup: "Basketweave",
        description:
          "Groups of bricks turned through 90 degrees in a repeating woven layout. Check that each group closes on the same module.",
        bestFor: "Feature panels, courtyard walls and glazed accents.",
      },
    ],
  },
  {
    slug: "traditional",
    title: "Traditional brick bonds",
    shortLabel: "Traditional bonds",
    h1: "Traditional brick bonds",
    lead:
      "Traditional header-and-stretcher bonds, plus herringbone for feature panels and decorative work.",
    metaTitle: "Traditional Brick Bonds | Traditional & Herringbone | Bricktextures",
    metaDescription:
      "Traditional brick bonds and herringbone patterns — often used with tumbled and sand-released stock bricks.",
    suitedFinishes: [
      { label: "Traditional bricks", slug: "traditional" },
      { label: "Tumbled bricks", slug: "tumbled" },
    ],
    whyTheseBonds:
      "Traditional bonds arrange stretchers and headers into familiar repeating patterns. Sanded stock and tumbled bricks often suit them; on conservation work take the bond and brick from the existing building rather than a generic name.",
    alignmentNote:
      "Texture and worn edges can hide small joint differences, but the brickwork still needs to be laid accurately.",
    bonds: [
      {
        name: "Traditional",
        layoutGroup: "Traditional",
        description:
          "Established header-and-stretcher arrangements such as Flemish, English and Monk bond — familiar repeating patterns for character elevations.",
        bestFor: "Traditional streets, housing, heritage-led projects and conservation work.",
      },
      {
        name: "Herringbone",
        layoutGroup: "Herringbone",
        description:
          "Herringbone is traditionally used for feature panels. Bricktextures also shows additional herringbone patterns for interesting panels and features.",
        bestFor: "Feature panels, decorative bands and distinctive elevation details.",
      },
    ],
  },
];

export function getBondGuide(slug: string): BondGuide | undefined {
  return BOND_GUIDES.find(guide => guide.slug === slug);
}
