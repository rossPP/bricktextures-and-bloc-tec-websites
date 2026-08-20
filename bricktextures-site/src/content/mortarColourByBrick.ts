import redBuffMortar from "../assets/mortar/red-brick-buff-mortar-colour.jpeg";
import redBuffMortarArea from "../assets/mortar/red-brick-buff-mortar-large-wall-area.jpeg";
import redDarkGreyMortar from "../assets/mortar/red-brick-dark-grey-mortar-colour.jpeg";
import redDarkGreyMortarArea from "../assets/mortar/red-brick-dark-grey-mortar-large-wall-area.jpeg";
import redNaturalMortar from "../assets/mortar/red-brick-natural-mortar-colour.jpeg";
import redNaturalMortarArea from "../assets/mortar/red-brick-natural-mortar-large-wall-area.jpeg";
import buffBuffMortar from "../assets/mortar/buff-brick-buff-mortar-450mm.jpeg";
import buffBuffMortarArea from "../assets/mortar/buff-brick-buff-mortar-2700mm.jpeg";
import buffDarkGreyMortar from "../assets/mortar/buff-brick-dark-grey-mortar-450mm.jpeg";
import buffDarkGreyMortarArea from "../assets/mortar/buff-brick-dark-grey-mortar-2700mm.jpeg";
import buffNaturalMortar from "../assets/mortar/buff-brick-natural-mortar-450mm.jpeg";
import buffNaturalMortarArea from "../assets/mortar/buff-brick-natural-mortar-2700mm.jpeg";

export type MortarColourExample = {
  slug: string;
  title: string;
  items: {
    name: string;
    note: string;
    imageLabel: string;
    src?: string;
    areaImageLabel?: string;
    areaSrc?: string;
  }[];
};

/**
 * Red and buff brickwork are both shown to demonstrate that mortar selection
 * follows the same contrast principles regardless of the brick colour.
 */
export const MORTAR_COLOUR_EXAMPLES: MortarColourExample[] = [
  {
    slug: "red-and-orange",
    title: "The principle shown with red brick",
    items: [
      {
        name: "Natural mortar",
        note: "The mid-tone joint remains visible without strongly defining or blending the brickwork.",
        imageLabel: "Red brick with natural mortar",
        src: redNaturalMortar,
        areaImageLabel: "Larger red brick wall area with natural mortar",
        areaSrc: redNaturalMortarArea,
      },
      {
        name: "Dark grey mortar",
        note: "The darker joint creates strong contrast and clearly defines the bond and each brick.",
        imageLabel: "Red brick with dark grey mortar",
        src: redDarkGreyMortar,
        areaImageLabel: "Larger red brick wall area with dark grey mortar",
        areaSrc: redDarkGreyMortarArea,
      },
      {
        name: "Buff mortar",
        note: "The lighter joint contrasts with the brick and makes the brick pattern more prominent.",
        imageLabel: "Red brick with buff mortar",
        src: redBuffMortar,
        areaImageLabel: "Larger red brick wall area with buff mortar",
        areaSrc: redBuffMortarArea,
      },
    ],
  },
  {
    slug: "buff",
    title: "The same principle shown with buff brick",
    items: [
      {
        name: "Natural mortar",
        note: "The mid-tone joint remains visible without becoming the dominant part of the wall.",
        imageLabel: "Buff brick with natural mortar",
        src: buffNaturalMortar,
        areaImageLabel: "Larger buff brick wall area with natural mortar",
        areaSrc: buffNaturalMortarArea,
      },
      {
        name: "Dark grey mortar",
        note: "The strong contrast clearly defines each brick and makes the bond more prominent.",
        imageLabel: "Buff brick with dark grey mortar",
        src: buffDarkGreyMortar,
        areaImageLabel: "Larger buff brick wall area with dark grey mortar",
        areaSrc: buffDarkGreyMortarArea,
      },
      {
        name: "Buff mortar",
        note: "The close-tone joint blends with the brick and creates a more continuous field of colour.",
        imageLabel: "Buff brick with buff mortar",
        src: buffBuffMortar,
        areaImageLabel: "Larger buff brick wall area with buff mortar",
        areaSrc: buffBuffMortarArea,
      },
    ],
  },
];
