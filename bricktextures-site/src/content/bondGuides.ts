export type BondItem = {
  name: string;
  iconName: string;
  description: string;
  bestFor: string;
  imageLabel: string;
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
  suitedFinishes: { label: string; slug: string }[];
  whyTheseBonds: string;
  alignmentNote: string;
  bonds: BondItem[];
  exampleImages: { label: string; caption: string }[];
};

export const BOND_GUIDES: BondGuide[] = [
  {
    slug: "classic",
    title: "Classic brick bonds",
    shortLabel: "Classic bonds",
    h1: "Classic brick bonds",
    lead:
      "Half-bond, quarter-bond and other running patterns — the everyday brick bonds used across most housing and commercial work, built primarily with the long face of the brick.",
    metaTitle: "Classic Brick Bonds | Half-Bond & Running Bonds | Bricktextures",
    metaDescription:
      "Classic brick bonds for smooth, glazed and wirecut facing bricks: half-bond, quarter-bond and running variations used across everyday architecture.",
    suitedFinishes: [
      { label: "Smooth bricks", slug: "smooth" },
      { label: "Wirecut bricks", slug: "wirecut" },
      { label: "Glazed bricks", slug: "glazed" },
    ],
    whyTheseBonds:
      "Running bonds are widely used for facing brickwork. Courses are laid mainly as stretchers, commonly with a half-brick lap; quarter-lap and other offsets are also used where setting-out and minimum-lap requirements permit. They work with most facing-brick types, subject to the product tolerances and the specified joint width.",
    alignmentNote:
      "Running bonds accommodate normal dimensional variation more readily than bonds with continuous vertical joints. Mortar colour, brick blend and changes in lap can alter the appearance, but bond selection must also account for structural design, movement joints, openings and site setting-out.",
    bonds: [
      {
        name: "Half-bond / running bond",
        iconName: "Stretcher",
        description:
          "A running bond in which each course is offset by half a brick. It is straightforward to set out and is widely used for facing brickwork.",
        bestFor:
          "Everyday housing, apartments, extensions and most facing brick elevations.",
        imageLabel: "Half-bond / running bond example",
      },
      {
        name: "Quarter-bond and stepped variations",
        iconName: "Stepped",
        description:
          "Running patterns using a quarter-brick or progressive offset. The exact lap and repeat should be checked against the unit size, joint width, structural requirements and the manufacturer's guidance.",
        bestFor:
          "Façades that want a little more movement while staying in the classic bond family.",
        imageLabel: "Quarter-bond / stepped classic bond example",
      },
      {
        name: "Running-bond field with local details",
        iconName: "Stretcher",
        description:
          "This is a detailing approach rather than a separate bond: a half-bond or other running-bond field is combined with local soldier courses, headers or changes in orientation at openings, plinths and bands.",
        bestFor:
          "Housing and commercial work requiring a consistent field bond with defined details at entrances, openings or corners.",
        imageLabel: "Running bond with local brick details",
      },
    ],
    exampleImages: [
      {
        label: "Classic half-bond on a housing façade",
        caption: "Replace with a real half-bond elevation.",
      },
      {
        label: "Classic quarter-bond or stepped running bond",
        caption: "Replace with a close wall photo of the joint rhythm.",
      },
      {
        label: "Classic bond with light grey mortar",
        caption: "Show how mortar colour changes the classic pattern.",
      },
      {
        label: "Classic bond on smooth or wirecut brick",
        caption: "Example using a suitable regular surface texture.",
      },
      {
        label: "Classic bond detail at an opening",
        caption: "Window or door junction in classic running bond.",
      },
    ],
  },
  {
    slug: "modern",
    title: "Modern geometric brick bonds",
    shortLabel: "Modern bonds",
    h1: "Modern geometric brick bonds",
    lead:
      "Stack, grid, basketweave and vertical patterns based on a clearly repeated module and consistent joint alignment.",
    metaTitle: "Modern Brick Bonds | Stack, Grid & Basketweave | Bricktextures",
    metaDescription:
      "Modern geometric brick bonds for tight-tolerance bricks: stack bond, grid patterns, basketweave and vertical courses suited to smooth, glazed and wirecut units.",
    suitedFinishes: [
      { label: "Smooth bricks", slug: "smooth" },
      { label: "Glazed bricks", slug: "glazed" },
      { label: "Wirecut bricks", slug: "wirecut" },
    ],
    whyTheseBonds:
      "Modern geometric bonds depend on a repeated module: brick dimensions, joint widths and orientation must resolve consistently across the elevation. Stack and grid layouts expose small dimensional differences because vertical joints continue through several courses; basketweave repeats also accumulate error if the unit and joint module do not fit. Products manufactured to tighter tolerances are generally easier to set out in these bonds, but suitability varies by product. Confirm declared dimensional tolerances, establish the intended joint range and build a sample panel before final specification.",
    alignmentNote:
      "Dimensional variation is visible where joints must align continuously or close within a repeated panel. Coordinate the actual work size of the brick with the nominal joint, allow for site adjustment and agree acceptable alignment in a sample panel. Stack-bonded masonry may also require specific structural reinforcement or support; confirm the wall design with the project engineer.",
    bonds: [
      {
        name: "Stack bond",
        iconName: "Stack",
        description:
          "Units are aligned so the perpend joints form continuous vertical lines. The result is a regular grid that makes dimensional and laying tolerances readily visible.",
        bestFor:
          "Feature façades, contemporary housing, interiors and glazed colour statements where a precise grid is wanted.",
        imageLabel: "Stack bond wall example",
      },
      {
        name: "Grid and stacked variations",
        iconName: "Header",
        description:
          "Header-facing courses or combinations of stretchers and headers arranged on a regular module. Each repeat must be coordinated with brick dimensions and joint widths.",
        bestFor:
          "Modern elevations that need a controlled modular look on smooth or wirecut façades.",
        imageLabel: "Grid / stacked modern bond example",
      },
      {
        name: "Basketweave",
        iconName: "Basketweave",
        description:
          "Groups of bricks are turned through 90 degrees to form a repeating woven layout. Check that each group closes on the same module and that permitted joint adjustment can absorb product variation.",
        bestFor:
          "Feature panels, courtyard walls, glazed accents and artistic masonry moments.",
        imageLabel: "Basketweave bond example",
      },
      {
        name: "Vertical and soldier courses",
        iconName: "Header",
        description:
          "Bricks are laid vertically, commonly as soldier courses, to form bands, panels or opening details. Unit height, length and joint width determine how these courses align with adjacent horizontal work.",
        bestFor:
          "Detail bands, entrance surrounds, contemporary interiors and façades needing vertical emphasis.",
        imageLabel: "Vertical / soldier course example",
      },
    ],
    exampleImages: [
      {
        label: "Stack bond modern façade",
        caption: "Replace with a crisp stack-bond elevation.",
      },
      {
        label: "Basketweave feature panel",
        caption: "Replace with a woven geometric brick panel.",
      },
      {
        label: "Soldier / vertical course banding",
        caption: "Replace with a modern vertical brick detail.",
      },
      {
        label: "Geometric bond setting-out detail",
        caption: "Show the brick-and-joint module closing across a repeated panel.",
      },
      {
        label: "Modern geometric bond in an interior",
        caption: "Close-range stack or grid bond where the pattern is clearly readable.",
      },
    ],
  },
  {
    slug: "traditional",
    title: "Traditional brick bonds",
    shortLabel: "Traditional bonds",
    h1: "Traditional brick bonds",
    lead:
      "Flemish, Monk, English and related bonds using stretchers and headers in established repeating arrangements.",
    metaTitle: "Traditional Brick Bonds | Flemish, English & Monk | Bricktextures",
    metaDescription:
      "Traditional brick bonds for tumbled and sand-released facing bricks: Flemish, Monk, English and related patterns.",
    suitedFinishes: [
      { label: "Traditional bricks", slug: "traditional" },
      { label: "Tumbled bricks", slug: "tumbled" },
    ],
    whyTheseBonds:
      "Traditional bonds arrange stretchers and headers to established course patterns. Their construction and regional use vary by period, wall thickness and local practice. Sand-moulded stock bricks and products with tumbled edges are often specified with these bonds for period-led work, but the bond and brick type should be selected from evidence where an existing building or conservation context is involved.",
    alignmentNote:
      "Header-and-stretcher patterns require careful setting-out at corners and openings, and their structural role depends on the wall build-up. Face and edge variation can reduce the visual emphasis on minor joint adjustments, but it does not remove dimensional or workmanship requirements.",
    bonds: [
      {
        name: "Flemish bond",
        iconName: "Flemish",
        description:
          "Stretchers and headers alternate within each course, with headers centred over stretchers in adjacent courses. Variants occur by period and region.",
        bestFor:
          "Traditional streets, housing, heritage-led projects and tumbled or stock brick elevations.",
        imageLabel: "Flemish bond wall example",
      },
      {
        name: "Monk bond",
        iconName: "Flemish",
        description:
          "Usually formed with two stretchers between headers in each course, with the header positions offset between courses. The name and exact arrangement are not used consistently in every region, so the intended repeat should be drawn rather than specified by name alone.",
        bestFor:
          "Character façades, conservation-led work and traditional new builds.",
        imageLabel: "Monk bond wall example",
      },
      {
        name: "English bond",
        iconName: "English",
        description:
          "Alternating courses of stretchers and headers. It was historically used to bond solid walls, although its role in modern cavity or veneer construction differs.",
        bestFor:
          "Robust traditional elevations, civic-character buildings and stock brick work.",
        imageLabel: "English bond wall example",
      },
      {
        name: "English and Flemish garden wall bonds",
        iconName: "English",
        description:
          "Variants using several stretchers between headers, reducing the proportion of headers compared with Flemish or English bond. Definitions and repeats vary, so drawings should state the required arrangement.",
        bestFor:
          "Garden walls, boundary walls and traditional housing elevations.",
        imageLabel: "Garden wall bond example",
      },
      {
        name: "Random traditional laying",
        iconName: "Stepped",
        description:
          "Non-uniform stretcher and header arrangements used where a deliberately irregular appearance is required. The layout still needs adequate lap, coordinated corners and a clearly agreed sample.",
        bestFor:
          "Craft-led feature walls and rustic or barn-character projects.",
        imageLabel: "Random traditional bond example",
      },
    ],
    exampleImages: [
      {
        label: "Flemish bond façade example",
        caption: "Replace with a real Flemish bond elevation.",
      },
      {
        label: "English bond wall example",
        caption: "Replace with an English bond project photo.",
      },
      {
        label: "Monk bond or garden wall bond example",
        caption: "Replace with a related traditional pattern.",
      },
      {
        label: "Traditional bond on tumbled brick",
        caption: "Show worn-edge brick with a traditional pattern.",
      },
      {
        label: "Traditional bond on sand-released stock brick",
        caption: "Show creased traditional brick with Flemish or English bond.",
      },
    ],
  },
];

export function getBondGuide(slug: string): BondGuide | undefined {
  return BOND_GUIDES.find(guide => guide.slug === slug);
}
