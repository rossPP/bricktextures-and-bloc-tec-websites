import glazedTexture from "../assets/textures/glazed.webp";
import smoothTexture from "../assets/textures/smooth.webp";
import traditionalTexture from "../assets/textures/traditional.webp";
import tumbledTexture from "../assets/textures/tumbled.webp";
import wirecutTexture from "../assets/textures/wirecut.webp";
import imperialFormat from "../assets/formats/imperial.webp";
import linearFormat from "../assets/formats/linear.webp";
import standardFormat from "../assets/formats/metric.webp";

export type AppearanceRoute = {
  label: string;
  description: string;
  to: string;
  tone: string;
  /** Optional brick-face image used instead of a colour swatch. */
  image?: string;
  /** Desktop grid column span — used so linear can stay at the same brick height as standard. */
  span?: 1 | 2;
};

export const COLOUR_SECTION = {
  eyebrow: "Start by appearance",
  title: "Explore facing bricks by colour",
  description:
    "Colour makes the biggest impact on our design and is usally the first question we ask.",
  metaTitle: "Explore Facing Bricks by Colour | Bricktextures",
  metaDescription:
    "Explore facing bricks by colour — red and orange, buff, brown and neutral — then compare products in Bricktextures.",
} as const;

export const COLOUR_ROUTES: AppearanceRoute[] = [
  {
    label: "Red and orange bricks",
    description: "Explore warm reds, oranges and mixed tones.",
    to: "/facing-bricks/colour/red-and-orange",
    tone: "red-orange",
  },
  {
    label: "Buff bricks",
    description: "Browse cream, yellow and light buff options.",
    to: "/facing-bricks/colour/buff",
    tone: "buff",
  },
  {
    label: "Brown bricks",
    description: "Compare earthy brown and deeper natural tones.",
    to: "/facing-bricks/colour/brown",
    tone: "brown",
  },
  {
    label: "Neutral bricks",
    description: "Browse black to white bricks across the grey spectrum.",
    to: "/facing-bricks/colour/grey-black-white",
    tone: "neutral",
  },
  {
    label: "Brick blending",
    description: "Mix colours into a custom brick blend.",
    to: "/tools/brick-blending",
    tone: "blend",
  },
];

export const TEXTURE_SECTION = {
  eyebrow: "Start by texture",
  title: "Explore facing bricks by texture",
  description:
    "Surface and edge texture changes the mood of our design, find the look you want.",
  metaTitle: "Explore Facing Bricks by Texture | Bricktextures",
  metaDescription:
    "Explore facing brick textures — smooth, glazed, tumbled, traditional and wirecut — then compare products in Bricktextures.",
} as const;

export const TEXTURE_ROUTES: AppearanceRoute[] = [
  {
    label: "Tumbled brick texture",
    description: "Rounded edges to create a weathered and worn look.",
    to: "/facing-bricks/finish/tumbled",
    tone: "tumbled",
    image: tumbledTexture,
  },
  {
    label: "Smooth brick texture",
    description: "Flat, smooth faces and crisp edges for precise brickwork.",
    to: "/facing-bricks/finish/smooth",
    tone: "smooth",
    image: smoothTexture,
  },
  {
    label: "Traditional brick texture",
    description: "Sand-released stock character with lots of natural variation.",
    to: "/facing-bricks/finish/traditional",
    tone: "traditional",
    image: traditionalTexture,
  },
  {
    label: "Wirecut brick texture",
    description: "Crisp edges along with a variety of face textures.",
    to: "/facing-bricks/finish/wirecut",
    tone: "wirecut",
    image: wirecutTexture,
  },
  {
    label: "Glazed brick texture",
    description: "Reflective glazed faces with strong colours.",
    to: "/facing-bricks/finish/glazed",
    tone: "glazed",
    image: glazedTexture,
  },
];

export const SIZE_SECTION = {
  eyebrow: "Start by size",
  title: "Explore facing bricks by size",
  description:
    "Instantly filter for brick sizes that suit your project or design.",
  metaTitle: "Explore Facing Bricks by Size | Bricktextures",
  metaDescription:
    "Explore facing brick sizes — standard 215 × 65 mm, imperial and linear — then compare products in Bricktextures.",
} as const;

export const SIZE_ROUTES: AppearanceRoute[] = [
  {
    label: "Standard size",
    description: "Modern metric sizes, suitable for the largest range of bonds.",
    to: "/facing-bricks/format/standard",
    tone: "standard",
    image: standardFormat,
  },
  {
    label: "Imperial size",
    description: "Taller imperialsizes - ideal for restoration projects.",
    to: "/facing-bricks/format/imperial",
    tone: "imperial",
    image: imperialFormat,
  },
  {
    label: "Linear size",
    description: "Long bricks that emphasise the horizontal line of the wall. A great format for creating visual interest.",
    to: "/facing-bricks/format/linear",
    tone: "linear",
    image: linearFormat,
    span: 2,
  },
];
