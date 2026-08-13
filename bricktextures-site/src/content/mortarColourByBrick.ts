import redBuffMortar from "../assets/colours/red/red-brick-buff-mortar-colour.jpeg";
import redBuffMortarArea from "../assets/colours/red/red-brick-buff-mortar-large-wall-area.jpeg";
import redDarkGreyMortar from "../assets/colours/red/red-brick-dark-grey-mortar-colour.jpeg";
import redDarkGreyMortarArea from "../assets/colours/red/red-brick-dark-grey-mortar-large-wall-area.jpeg";
import redNaturalMortar from "../assets/colours/red/red-brick-natural-mortar-colour.jpeg";
import redNaturalMortarArea from "../assets/colours/red/red-brick-natural-mortar-large-wall-area.jpeg";

export type MortarColourAdvice = {
  slug: string;
  tone: "red-orange" | "buff" | "brown" | "neutral";
  title: string;
  colourGuidePath: string;
  introduction?: string;
  summary: string;
  selectionNote?: string;
  warning?: string;
  items: {
    name: string;
    note: string;
    imageLabel: string;
    src?: string;
    areaImageLabel?: string;
    areaSrc?: string;
  }[];
};

/** Mortar colour guidance by facing-brick colour — sourced from the former colour guides. */
export const MORTAR_COLOUR_BY_BRICK: MortarColourAdvice[] = [
  {
    slug: "red-and-orange",
    tone: "red-orange",
    title: "Red and orange bricks",
    colourGuidePath: "/facing-bricks/colour/red-and-orange",
    introduction:
      "Mortar occupies less surface area than the brick, but its colour plays an important part in how the brickwork appears. This is why each mortar colour is shown twice: first close up and then across a larger brick area, so you can see how the choice affects the overall colour of a façade and how the red brick itself is perceived.",
    summary:
      "Natural, dark grey and buff mortars each change the appearance of red brick. Natural mortar gives a balanced result, dark grey creates stronger definition, and buff introduces a warmer contrast.",
    selectionNote:
      "Choose mortar colour according to how you want the brickwork to appear. A mortar close in tone to the brick creates a more unified look, while a contrasting mortar gives each brick stronger definition. Lighter or darker mortar can also shift the overall tone of the façade. Mortar may also connect the brickwork with other materials—for example, buff mortar can complement sandstone details used alongside red brick.",
    warning:
      "Red mortar is often avoided with red brick because the close colour match can make the wall read as one mass, with little definition between individual bricks. Many architects and designers consider the result visually heavy or unattractive. Over time, red mortar may also appear lighter or pinker, making the colour match less appealing.",
    items: [
      {
        name: "Natural mortar",
        note: "Natural mortar creates a softer, balanced appearance in which neither the mortar nor the red brick dominates.",
        imageLabel: "Red brick with natural mortar",
        src: redNaturalMortar,
        areaImageLabel: "Larger red brick wall area with natural mortar",
        areaSrc: redNaturalMortarArea,
      },
      {
        name: "Dark grey mortar",
        note: "Dark grey creates a sharper, more pronounced brick pattern through strong contrast, much like dark eye shadow defines an eye.",
        imageLabel: "Red brick with dark grey mortar",
        src: redDarkGreyMortar,
        areaImageLabel: "Larger red brick wall area with dark grey mortar",
        areaSrc: redDarkGreyMortarArea,
      },
      {
        name: "Buff mortar",
        note: "Buff mortar creates a warm contrast that can make the red brick appear richer and more prominent.",
        imageLabel: "Red brick with buff mortar",
        src: redBuffMortar,
        areaImageLabel: "Larger red brick wall area with buff mortar",
        areaSrc: redBuffMortarArea,
      },
    ],
  },
  {
    slug: "buff",
    tone: "buff",
    title: "Buff bricks",
    colourGuidePath: "/facing-bricks/colour/buff",
    summary:
      "Buff brick is commonly paired with buff, cream or light-grey mortar. Exact colour matching is difficult because bricks and mortar vary and weather differently, so approve the combination from cured site samples.",
    items: [
      {
        name: "Buff or cream mortar",
        note: "Keeps contrast low on buff brick and reduces the visual emphasis of the joint grid.",
        imageLabel: "Buff brick with buff mortar",
      },
      {
        name: "Slight tone variation (not an exact match)",
        note: "Brick and mortar are unlikely to match exactly, and their colour may change differently with curing and weathering. Specify an acceptable range rather than assuming an identical tone.",
        imageLabel: "Buff brick with near-tone cream mortar variation",
      },
      {
        name: "Light or mid grey mortar (alternative)",
        note: "Use when you want clearer joint definition or a more contemporary, gridded reading of a buff elevation.",
        imageLabel: "Buff brick with light grey mortar",
      },
    ],
  },
  {
    slug: "brown",
    tone: "brown",
    title: "Brown bricks",
    colourGuidePath: "/facing-bricks/colour/brown",
    summary:
      "Brown brick is commonly paired with grey mortar; darker buff or warm mortar can reduce contrast. Selection should account for the brick blend, adjacent materials and the required joint definition.",
    items: [
      {
        name: "Natural or mid grey mortar",
        note: "The common practical choice. Greys define the bond, cool the brown slightly and suit both suburban and landscape settings.",
        imageLabel: "Brown brick with grey mortar",
      },
      {
        name: "Darker buff or warm mortar",
        note: "Keeps the joint within a warmer colour range and may coordinate with timber, stone or surrounding masonry.",
        imageLabel: "Brown brick with darker buff mortar",
      },
      {
        name: "Closer-tone brown mortar (used carefully)",
        note: "Reduces joint contrast and gives a more continuous field of colour. Review a cured sample to avoid an unintended dull or uneven result.",
        imageLabel: "Brown brick with warm tone-on-tone mortar",
      },
    ],
  },
  {
    slug: "grey-black-white",
    tone: "neutral",
    title: "Neutral bricks",
    colourGuidePath: "/facing-bricks/colour/grey-black-white",
    summary:
      "Neutral bricks can take either contrasting or matching mortars. The choice is a design decision: contrast emphasises the brick grid; matching softens it into a more continuous plane.",
    items: [
      {
        name: "Contrasting mortar on grey brick",
        note: "Light mortar on mid-to-dark grey brick, or darker mortar on light grey brick, increases bond and joint definition.",
        imageLabel: "Grey brick with contrasting mortar",
      },
      {
        name: "Matching or near-tone mortar on grey brick",
        note: "Closer mortar colours reduce the emphasis of the joint grid and produce a more continuous field of colour.",
        imageLabel: "Grey brick with matching mortar",
      },
      {
        name: "Black brick with light or dark joints",
        note: "Light grey joints create strong graphic contrast; dark joints keep a heavier, continuous dark elevation.",
        imageLabel: "Black brick with light vs dark mortar",
      },
      {
        name: "White brick mortar choices",
        note: "Off-white or light grey mortar keeps a soft light wall; a clearly darker joint turns the elevation into a precise grid.",
        imageLabel: "White brick with matching and contrasting mortars",
      },
    ],
  },
];
