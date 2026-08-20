import classicBlock from "../assets/bonds/classic/classic__1-2-bond__block__quartis.webp";
import classicColumn from "../assets/bonds/classic/classic__1-2-bond__column__quartis.webp";
import classicHeader from "../assets/bonds/classic/classic__1-2-bond__header__quartis.webp";
import classicOffset from "../assets/bonds/classic/classic__1-2-bond__offset__quartis.webp";
import classicStretcher from "../assets/bonds/classic/classic__1-2-bond__stretcher__quartis.webp";
import classicLeftStep from "../assets/bonds/classic/classic__1-4-bond__left-step__quartis.webp";
import classicRightStepGothic from "../assets/bonds/classic/classic__1-4-bond__right-step-gothic__quartis.webp";
import classicRightStepMonk from "../assets/bonds/classic/classic__1-4-bond__right-step-monk__quartis.webp";
import classicRightStep from "../assets/bonds/classic/classic__1-4-bond__right-step__quartis.webp";
import classicToothedGothic from "../assets/bonds/classic/classic__1-4-bond__toothed-gothic__quartis.webp";
import classicToothed from "../assets/bonds/classic/classic__1-4-bond__toothed__quartis.webp";

import modernBasketAligned1 from "../assets/bonds/modern/modern__basketweave__aligned-1-soldier__quartis.webp";
import modernBasketAligned2 from "../assets/bonds/modern/modern__basketweave__aligned-2-soldiers__quartis.webp";
import modernBasketDouble from "../assets/bonds/modern/modern__basketweave__double__quartis.webp";
import modernBasketOffset1 from "../assets/bonds/modern/modern__basketweave__offset-1-soldier__quartis.webp";
import modernBasketOffset2 from "../assets/bonds/modern/modern__basketweave__offset-2-soldiers__quartis.webp";
import modernBasketStandard from "../assets/bonds/modern/modern__basketweave__standard__quartis.webp";
import modernBasketStepped from "../assets/bonds/modern/modern__basketweave__stepped__quartis.webp";
import modernBasketTriple from "../assets/bonds/modern/modern__basketweave__triple__quartis.webp";
import modernStackHeader from "../assets/bonds/modern/modern__stacked__header__quartis.webp";
import modernStackSoldier1 from "../assets/bonds/modern/modern__stacked__stretcher-1-soldier__quartis.webp";
import modernStackSoldier2 from "../assets/bonds/modern/modern__stacked__stretcher-2-soldiers__quartis.webp";
import modernStackSoldier3 from "../assets/bonds/modern/modern__stacked__stretcher-3-soldiers__quartis.webp";
import modernStackStretcherHeader from "../assets/bonds/modern/modern__stacked__stretcher-header__quartis.webp";
import modernStackStretcher from "../assets/bonds/modern/modern__stacked__stretcher__quartis.webp";

import traditionalHerringboneBlockToSingle from "../assets/bonds/traditional/traditional__herringbone__block-to-single__quartis.webp";
import traditionalHerringboneBlock from "../assets/bonds/traditional/traditional__herringbone__block__quartis.webp";
import traditionalHerringboneLinearDouble from "../assets/bonds/traditional/traditional__herringbone__linear-double__quartis.webp";
import traditionalHerringboneLinearTriple from "../assets/bonds/traditional/traditional__herringbone__linear-triple__quartis.webp";
import traditionalHerringboneStandard from "../assets/bonds/traditional/traditional__herringbone__standard__quartis.webp";
import traditionalEnglishGarden from "../assets/bonds/traditional/traditional__traditional__english-garden-wall__quartis.webp";
import traditionalEnglish from "../assets/bonds/traditional/traditional__traditional__english__quartis.webp";
import traditionalFlemishGarden from "../assets/bonds/traditional/traditional__traditional__flemish-garden-wall__quartis.webp";
import traditionalFlemish from "../assets/bonds/traditional/traditional__traditional__flemish__quartis.webp";
import traditionalMonk from "../assets/bonds/traditional/traditional__traditional__monk__quartis.webp";
import traditionalRandom from "../assets/bonds/traditional/traditional__traditional__random__quartis.webp";

export type BondExampleImage = {
  name: string;
  src: string;
};

export type BondExampleGroup = {
  title: string;
  examples: BondExampleImage[];
};

export const BOND_EXAMPLE_GROUPS: BondExampleGroup[] = [
  {
    title: "1/2 Bond",
    examples: [
      { name: "Stretcher", src: classicStretcher },
      { name: "Header", src: classicHeader },
      { name: "Block", src: classicBlock },
    ],
  },
  {
    title: "1/4 Bond Toothed",
    examples: [
      { name: "Toothed", src: classicToothed },
      { name: "Offset", src: classicOffset },
      { name: "Toothed Gothic", src: classicToothedGothic },
      { name: "Left Step", src: classicLeftStep },
      { name: "Right Step", src: classicRightStep },
      { name: "Right Step Gothic", src: classicRightStepGothic },
      { name: "Right Step Monk", src: classicRightStepMonk },
    ],
  },
  {
    title: "Traditional",
    examples: [
      { name: "English", src: traditionalEnglish },
      { name: "English Garden Wall", src: traditionalEnglishGarden },
      { name: "Flemish", src: traditionalFlemish },
      { name: "Flemish Garden Wall", src: traditionalFlemishGarden },
      { name: "Monk", src: traditionalMonk },
      { name: "Random", src: traditionalRandom },
    ],
  },
  {
    title: "Herringbone",
    examples: [
      { name: "Standard", src: traditionalHerringboneStandard },
      { name: "Linear Double", src: traditionalHerringboneLinearDouble },
      { name: "Linear Triple", src: traditionalHerringboneLinearTriple },
      { name: "Block", src: traditionalHerringboneBlock },
      { name: "Block to Single", src: traditionalHerringboneBlockToSingle },
    ],
  },
  {
    title: "Stacked",
    examples: [
      { name: "Stretcher", src: modernStackStretcher },
      { name: "Header", src: modernStackHeader },
      { name: "Stretcher Header", src: modernStackStretcherHeader },
      { name: "Stretcher 1 Soldier", src: modernStackSoldier1 },
      { name: "Stretcher 2 Soldiers", src: modernStackSoldier2 },
      { name: "Stretcher 3 Soldiers", src: modernStackSoldier3 },
      { name: "Column", src: classicColumn },
    ],
  },
  {
    title: "Basketweave",
    examples: [
      { name: "Offset 1 Soldier", src: modernBasketOffset1 },
      { name: "Offset 2 Soldiers", src: modernBasketOffset2 },
      { name: "Standard", src: modernBasketStandard },
      { name: "Aligned 1 Soldier", src: modernBasketAligned1 },
      { name: "Aligned 2 Soldiers", src: modernBasketAligned2 },
      { name: "Double", src: modernBasketDouble },
      { name: "Triple", src: modernBasketTriple },
      { name: "Stepped", src: modernBasketStepped },
    ],
  },
];
