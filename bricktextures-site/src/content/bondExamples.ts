import classicBlock from "../assets/bonds/classic/classic__1-2-bond__block__swanage-handmade-restoration-red.webp";
import classicColumn from "../assets/bonds/classic/classic__1-2-bond__column__swanage-handmade-restoration-red.webp";
import classicHeader from "../assets/bonds/classic/classic__1-2-bond__header__swanage-handmade-restoration-red.webp";
import classicOffset from "../assets/bonds/classic/classic__1-2-bond__offset__swanage-handmade-restoration-red.webp";
import classicStretcher from "../assets/bonds/classic/classic__1-2-bond__stretcher__swanage-handmade-restoration-red.webp";
import classicLeftStep from "../assets/bonds/classic/classic__1-4-bond__left-step__swanage-handmade-restoration-red.webp";
import classicRightStepGothic from "../assets/bonds/classic/classic__1-4-bond__right-step-gothic__swanage-handmade-restoration-red.webp";
import classicRightStepMonk from "../assets/bonds/classic/classic__1-4-bond__right-step-monk__swanage-handmade-restoration-red.webp";
import classicRightStep from "../assets/bonds/classic/classic__1-4-bond__right-step__swanage-handmade-restoration-red.webp";
import classicToothedGothic from "../assets/bonds/classic/classic__1-4-bond__toothed-gothic__swanage-handmade-restoration-red.webp";
import classicToothed from "../assets/bonds/classic/classic__1-4-bond__toothed__swanage-handmade-restoration-red.webp";

import modernBasketAligned1 from "../assets/bonds/modern/modern__basketweave__aligned-1-soldier__throckley-smooth-red.webp";
import modernBasketAligned2 from "../assets/bonds/modern/modern__basketweave__aligned-2-soldiers__throckley-smooth-red.webp";
import modernBasketDouble from "../assets/bonds/modern/modern__basketweave__double__throckley-smooth-red.webp";
import modernBasketOffset1 from "../assets/bonds/modern/modern__basketweave__offset-1-soldier__throckley-smooth-red.webp";
import modernBasketOffset2 from "../assets/bonds/modern/modern__basketweave__offset-2-soldiers__throckley-smooth-red.webp";
import modernBasketStandard from "../assets/bonds/modern/modern__basketweave__standard__throckley-smooth-red.webp";
import modernBasketStepped from "../assets/bonds/modern/modern__basketweave__stepped__throckley-smooth-red.webp";
import modernBasketTriple from "../assets/bonds/modern/modern__basketweave__triple__throckley-smooth-red.webp";
import modernStackHeader from "../assets/bonds/modern/modern__stacked__header__throckley-smooth-red.webp";
import modernStackSoldier1 from "../assets/bonds/modern/modern__stacked__stretcher-1-soldier__throckley-smooth-red.webp";
import modernStackSoldier2 from "../assets/bonds/modern/modern__stacked__stretcher-2-soldiers__throckley-smooth-red.webp";
import modernStackSoldier3 from "../assets/bonds/modern/modern__stacked__stretcher-3-soldiers__throckley-smooth-red.webp";
import modernStackStretcherHeader from "../assets/bonds/modern/modern__stacked__stretcher-header__throckley-smooth-red.webp";
import modernStackStretcher from "../assets/bonds/modern/modern__stacked__stretcher__throckley-smooth-red.webp";

import traditionalHerringboneBlockToSingle from "../assets/bonds/traditional/traditional__herringbone__block-to-single__oud-maasland.webp";
import traditionalHerringboneBlock from "../assets/bonds/traditional/traditional__herringbone__block__oud-maasland.webp";
import traditionalHerringboneLinearDouble from "../assets/bonds/traditional/traditional__herringbone__linear-double__oud-maasland.webp";
import traditionalHerringboneLinearTriple from "../assets/bonds/traditional/traditional__herringbone__linear-triple__oud-maasland.webp";
import traditionalHerringboneStandard from "../assets/bonds/traditional/traditional__herringbone__standard__oud-maasland.webp";
import traditionalEnglishGarden from "../assets/bonds/traditional/traditional__traditional__english-garden-wall__oud-maasland.webp";
import traditionalEnglish from "../assets/bonds/traditional/traditional__traditional__english__oud-maasland.webp";
import traditionalFlemishGarden from "../assets/bonds/traditional/traditional__traditional__flemish-garden-wall__oud-maasland.webp";
import traditionalFlemish from "../assets/bonds/traditional/traditional__traditional__flemish__oud-maasland.webp";
import traditionalMonk from "../assets/bonds/traditional/traditional__traditional__monk__oud-maasland.webp";
import traditionalRandom from "../assets/bonds/traditional/traditional__traditional__random__oud-maasland.webp";

import type { BondGuideSlug } from "./bondGuides";

export type BondExampleImage = {
  name: string;
  src: string;
};

export type BondExampleGroup = {
  title: string;
  examples: BondExampleImage[];
};

export const BOND_HUB_THUMBNAILS: Record<BondGuideSlug, string> = {
  classic: classicStretcher,
  modern: modernStackStretcher,
  traditional: traditionalFlemish,
};

export const BOND_EXAMPLE_GROUPS: Record<BondGuideSlug, BondExampleGroup[]> = {
  classic: [
    {
      title: "1/2 Bond",
      examples: [
        { name: "Stretcher", src: classicStretcher},
        { name: "Header", src: classicHeader},
        { name: "Block", src: classicBlock},
        { name: "Offset", src: classicOffset},
        { name: "Column", src: classicColumn},
      ],
    },
    {
      title: "1/4 Bond",
      examples: [
        { name: "Left Step", src: classicLeftStep},
        { name: "Right Step", src: classicRightStep},
        { name: "Right Step Gothic", src: classicRightStepGothic},
        { name: "Right Step Monk", src: classicRightStepMonk},
        { name: "Toothed", src: classicToothed},
        { name: "Toothed Gothic", src: classicToothedGothic},
      ],
    },
  ],
  modern: [
    {
      title: "Stacked",
      examples: [
        { name: "Stretcher", src: modernStackStretcher},
        { name: "Header", src: modernStackHeader},
        { name: "Stretcher Header", src: modernStackStretcherHeader},
        { name: "Stretcher 1 Soldier", src: modernStackSoldier1},
        { name: "Stretcher 2 Soldiers", src: modernStackSoldier2},
        { name: "Stretcher 3 Soldiers", src: modernStackSoldier3},
      ],
    },
    {
      title: "Basketweave",
      examples: [
        { name: "Standard", src: modernBasketStandard},
        { name: "Double", src: modernBasketDouble},
        { name: "Triple", src: modernBasketTriple},
        { name: "Offset 1 Soldier", src: modernBasketOffset1},
        { name: "Offset 2 Soldiers", src: modernBasketOffset2},
        { name: "Aligned 1 Soldier", src: modernBasketAligned1},
        { name: "Aligned 2 Soldiers", src: modernBasketAligned2},
        { name: "Stepped", src: modernBasketStepped},
      ],
    },
  ],
  traditional: [
    {
      title: "Traditional",
      examples: [
        { name: "English", src: traditionalEnglish},
        { name: "English Garden Wall", src: traditionalEnglishGarden},
        { name: "Flemish", src: traditionalFlemish},
        { name: "Flemish Garden Wall", src: traditionalFlemishGarden},
        { name: "Monk", src: traditionalMonk},
        { name: "Random", src: traditionalRandom},
      ],
    },
    {
      title: "Herringbone",
      examples: [
        { name: "Standard", src: traditionalHerringboneStandard},
        { name: "Linear Double", src: traditionalHerringboneLinearDouble},
        { name: "Linear Triple", src: traditionalHerringboneLinearTriple},
        { name: "Block", src: traditionalHerringboneBlock},
        { name: "Block to Single", src: traditionalHerringboneBlockToSingle},
      ],
    },
  ],
};
