import redCreamBuffOak from "../assets/colours/red/red-brick-complementary-colours-cream-brown.webp";
import redGreenCopper from "../assets/colours/red/red-brick-complementary-green-patinated-copper.webp";
import redDarkBlueGrey from "../assets/colours/red/red-brick-complementary-colours-blue-grey-slate.webp";
import redGreenFoliage from "../assets/colours/red/red-brick-complementary-colours-green-blue-grey.webp";
import redLightingExternal from "../assets/colours/red/red-brick-external-warm-lighting.webp";
import redLightingInternal from "../assets/colours/red/red-brick-interior-warm-lighting.webp";
import redSeamless3600 from "../assets/colours/red/seamless-red-brick-texture-3600mm.jpeg";
import redSeamless900 from "../assets/colours/red/seamless-red-brick-texture-900mm.jpeg";
import buffPurple from "../assets/colours/buff/buff-brick-complementary-purple-aubergine.webp";
import buffPurplePlantingBrown from "../assets/colours/buff/buff-brick-complementary-purple-planting-brown-components.webp";
import buffRedBrown from "../assets/colours/buff/buff-brick-complementary-red-brown-components.webp";
import buffRedBrownQuoins from "../assets/colours/buff/buff-brick-complementary-red-brown-quoins.webp";
import buffLightingDaylight from "../assets/colours/buff/buff-brick-atrium-natural-daylight.webp";
import buffLightingWarm from "../assets/colours/buff/buff-brick-interior-warm-lighting.webp";
import buffSeamless3600 from "../assets/colours/buff/seamless-buff-brick-texture-3600mm.jpeg";
import buffSeamless900 from "../assets/colours/buff/seamless-buff-brick-texture-900mm.jpeg";
import brownBlueGrey from "../assets/colours/brown/brown-brick-complementary-blue-grey-cladding.webp";
import brownCreamNeutral from "../assets/colours/brown/brown-brick-complementary-cream-neutral-entrance.webp";
import brownOliveSage from "../assets/colours/brown/brown-brick-complementary-olive-sage-planting.webp";
import brownPurplePlanting from "../assets/colours/brown/brown-brick-complementary-purple-planting-timber.webp";
import brownLightingInternal from "../assets/colours/brown/brown-brick-interior-wall-wash-lighting.webp";
import brownLightingExternal from "../assets/colours/brown/brown-brick-external-wall-wash-lighting.webp";
import brownSeamless3600 from "../assets/colours/brown/seamless-brown-brick-texture-3600mm.jpeg";
import brownSeamless900 from "../assets/colours/brown/seamless-brown-brick-texture-900mm.jpeg";
import neutralPrimaryPanels from "../assets/colours/neutral/neutral-brick-complementary-primary-colour-panels.webp";
import neutralMixedBright from "../assets/colours/neutral/neutral-brick-complementary-mixed-bright-accents.webp";
import neutralMulticolourBalconies from "../assets/colours/neutral/neutral-brick-complementary-multicolour-balconies.webp";
import neutralBrownTimberFins from "../assets/colours/neutral/neutral-brick-complementary-brown-timber-fins.webp";
import neutralBrownTimberHouse from "../assets/colours/neutral/neutral-brick-complementary-brown-timber-house.webp";
import greySeamless3600 from "../assets/colours/neutral/seamless-grey-brick-texture-3600mm.jpeg";
import greySeamless900 from "../assets/colours/neutral/seamless-grey-brick-texture-900mm.jpeg";
import neutralLightingBlack from "../assets/colours/neutral/neutral-brick-interior-black-lighting.webp";
import neutralLightingWhite from "../assets/colours/neutral/neutral-brick-interior-white-lighting.webp";

export type ColourGuide = {
  slug: string;
  tone: "red-orange" | "buff" | "brown" | "neutral";
  title: string;
  shortLabel: string;
  /** Short SEO phrase used in headings, e.g. "red brick". */
  textureSeoNoun: string;
  /** e.g. "red bricks" for “Traditional use of …” */
  traditionalNoun: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  appFilterUrl: string;
  appTextureUrl: string;
  traditionalUse: {
    summary: string;
  };
  designingWith: {
    summary: string;
    surroundings: string;
    emotions: string;
    complementary: {
      items: {
        name: string;
        swatch: string;
        exampleImage?: {
          label: string;
          caption: string;
          src?: string;
        };
        additionalExampleImages?: {
          label: string;
          caption: string;
          src?: string;
        }[];
      }[];
    };
    lighting: {
      summary: string;
      howWeFeel?: string;
      images?: {
        label: string;
        caption: string;
        src: string;
      }[];
      imagePlaceholders?: { label: string; caption: string }[];
    };
  };
  textureExamples: { label: string; caption: string; src?: string }[];
};

export const COLOUR_GUIDES: ColourGuide[] = [
  {
    slug: "red-and-orange",
    tone: "red-orange",
    title: "Red and orange facing bricks",
    shortLabel: "Red & orange",
    textureSeoNoun: "red brick",
    traditionalNoun: "red bricks",
    h1: "Red and orange facing bricks",
    lead:
      "Red and orange bricks are familiar to us. They suit new work that needs warmth and a traditional, comfortable ‘stay-a-while’ feel.",
    metaTitle: "Red and Orange Facing Bricks | Colour Guide | Bricktextures",
    metaDescription:
      "Traditional use of red bricks, designing with complementary colours and materials, lighting, and seamless red brick textures.",
    appFilterUrl: "/app/facing-bricks?filterColour=Red-Orange&src=colour-red-orange",
    appTextureUrl:
      "/app/facing-bricks?filterColour=Red-Orange&tab=texture&src=colour-red-orange-textures",
    traditionalUse: {
      summary:
        "Red and orange bricks are familiar to us. They suit new work that needs warmth and a traditional, comfortable ‘stay-a-while’ feel.",
    },
    designingWith: {
      summary:
        "Red and orange brick already supplies plenty of colour. Build the rest of the palette through landscaping and contrasting building components, so a large elevation feels balanced rather than overpowering, flat or uninteresting.",
      surroundings:
        "Red brick is very common, so it often appears throughout the urban landscape. If the building is in an urban environment, consider the colours of the buildings around it. If it is in a rural setting, consider the natural landscape features and the dominant colours that exist there. Then decide whether the building should blend into its surroundings or stand out and make a bold statement.",
      emotions:
        "Red naturally enlivens people’s emotions and brings warmth and energy to a façade. Decide whether that energy should feel traditional and welcoming, or sharper and more contemporary. Greens and light browns can calm the red; darker blues give it a cooler edge.",
      complementary: {
        items: [
          {
            name: "Forest and moss green",
            swatch: "linear-gradient(135deg, #4e5845, #7b8066 52%, #a0a58d)",
            exampleImage: {
              label: "Red brick with green, blue-grey and dark grey complementary colours",
              caption:
                "Green foliage softens the overall feel of the building and creates a calm contrast against the red brick texture. Blue-tinted windows and dark grey panelling also complement the red without competing with it.",
              src: redGreenFoliage,
            },
            additionalExampleImages: [
              {
                label: "Red brick with green patinated copper building elements",
                caption:
                  "Green does not need to come only from planting. Patinated copper introduces green as a major architectural element, creating a strong yet natural contrast with red brick and giving the façade a distinctive character.",
                src: redGreenCopper,
              },
            ],
          },
          {
            name: "Cream, buff and light brown",
            swatch: "linear-gradient(135deg, #f0e4c4, #d8c7a0 52%, #9b7654)",
            exampleImage: {
              label: "Red brick with cream, buff and light brown details",
              caption:
                "An older, traditional character is created by adding browns and creams — brown roof tiles and sandstone quoins. Timber cladding and coloured paving add further warmth, giving the building charm and a comfortable, homely feel.",
              src: redCreamBuffOak,
            },
          },
          {
            name: "Dark blues and blue-greys",
            swatch: "linear-gradient(135deg, #262b2d, #59656b 52%, #36495a)",
            exampleImage: {
              label: "Red brick with dark blue window, roof and paving details",
              caption:
                "Blocks of colour can be introduced through larger building elements. Here, multi-toned blue-grey slate is used on the roof to create an attractive contrast against the red brick.",
              src: redDarkBlueGrey,
            },
          },
        ],
      },
      lighting: {
        summary:
          "We are naturally attuned to orange and red from the setting sun, which creates a calm, relaxing mood. Use warm, soft lighting to draw on the same instinct when lighting red brick, especially at entrances and in hospitality spaces where people should feel welcome and stay a while.",
        images: [
          {
            label: "Red brick with external lighting",
            caption:
              "External lighting — warm light washes the red brick walls, creating a relaxed and welcoming tone.",
            src: redLightingExternal,
          },
          {
            label: "Red brick with internal lighting",
            caption:
              "Internal lighting — planting introduces green. Furniture, partitions and panelling can contribute further to a calming feel by introducing greens, earth browns and deep blues.",
            src: redLightingInternal,
          },
        ],
      },
    },
    textureExamples: [
      {
        label: "Seamless red brick texture — detail tile",
        caption:
          "Closer seamless red brick texture suited to detail views and smaller surfaces (900 × 900 mm)",
        src: redSeamless900,
      },
      {
        label: "Seamless red brick texture — larger wall area",
        caption:
          "Example seamless red brick texture covering a larger wall area (3600 × 3600 mm)",
        src: redSeamless3600,
      },
    ],
  },
  {
    slug: "buff",
    tone: "buff",
    title: "Buff facing bricks",
    shortLabel: "Buff",
    textureSeoNoun: "buff brick",
    traditionalNoun: "buff bricks",
    h1: "Buff facing bricks",
    lead:
      "Buff bricks range from cream to warm yellow. They catch daylight easily, making streets, courtyards and interiors feel brighter than they would in red or brown.",
    metaTitle: "Buff Facing Bricks | Colour Guide | Bricktextures",
    metaDescription:
      "Traditional use of buff bricks, designing with complementary colours and materials, lighting, and seamless buff brick textures.",
    appFilterUrl: "/app/facing-bricks?filterColour=Buff&src=colour-buff",
    appTextureUrl: "/app/facing-bricks?filterColour=Buff&tab=texture&src=colour-buff-textures",
    traditionalUse: {
      summary:
        "Buff and yellow stock bricks are familiar on pale urban streets. Their warm, sandy colour gives brickwork a lighter and more cheerful character than darker reds or browns.",
    },
    designingWith: {
      summary:
        "A long stretch of buff brick can feel flat, like open sand. Break it up with depth, openings, other materials, planting and contrasting colour so the wall has places for the eye to rest.",
      surroundings:
        "Buff and yellow stock bricks are common on streets where pale stone and render already dominate. Look at neighbouring walls, roofs and paving in town, or the stone, soil and planting around a rural site. Then decide whether the buff should settle into those pale surroundings or stand out against them.",
      emotions:
        "Buff brick recalls warm sand and sunlit beaches. Compared with grey sand, yellow sand feels brighter and more cheerful, giving colourful details a lively background. Buff can create the same optimistic mood, but without contrasting colour it can turn bland. Purples, greens and dark blues keep that warmth interesting.",
      complementary: {
        items: [
          {
            name: "Dark red-browns and purples",
            swatch:
              "linear-gradient(135deg, #33231f 0%, #59382f 34%, #563648 56%, #68445f 78%, #765d78 100%)",
            exampleImage: {
              label: "Buff brick with aubergine and purple building elements",
              caption:
                "Aubergine and purple are rich and unexpected against buff. Used on a main entrance, they pull the eye and give the building a clear centre.",
              src: buffPurple,
            },
            additionalExampleImages: [
              {
                label: "Buff brick with dark brown and red-brown details",
                caption:
                  "Dark brown and red-brown keep the warmth of buff but add heavier blocks of colour across the wall.",
                src: buffRedBrown,
              },
              {
                label: "Buff masonry with red-brown brick quoins and detailing",
                caption:
                  "Red-brown brick quoins and surrounds create a warmer complementary accent against pale buff walls, while dark window frames and roofing give the elevation a clear outline.",
                src: buffRedBrownQuoins,
              },
              {
                label: "Buff brick with purple landscaping and brown building components",
                caption:
                  "Purple and burgundy planting deepen the contrast, while dark brown frames, canopy and screens outline the building clearly.",
                src: buffPurplePlantingBrown,
              },
            ],
          },
          {
            name: "Olive and sage green",
            swatch: "linear-gradient(135deg, #59634b, #7f896b 52%, #a7ad91)",
          },
          {
            name: "Dark blues and blue-greys",
            swatch: "linear-gradient(135deg, #262b2d, #59656b 52%, #36495a)",
          },
        ],
      },
      lighting: {
        summary:
          "Buff throws daylight back into narrow streets, courtyards and light wells. In strong sun the yellow can intensify, so texture, recessed openings and darker surrounds help. On grey days buff usually keeps more character than white brick.",
        howWeFeel:
          "Buff works beautifully with warm lighting because its pale surface reflects the warmth instead of dulling it. Low, subtle wall lights can create small pools of glow without washing the whole wall. Sometimes artificial colour is not needed at all: a skylight or high window can warm buff brick naturally and make an interior feel sunlit.",
        images: [
          {
            label: "Buff brick atrium reflecting natural daylight",
            caption:
              "Daylight itself can be the complementary lighting. Here, a skylit atrium shows how buff brick reflects natural light and warms the space without artificial colour washes.",
            src: buffLightingDaylight,
          },
          {
            label: "Buff brick interior under warm lighting",
            caption:
              "Warm, low-output wall lights reinforce the sandy tones of buff brick and create comfortable pools of light without flooding the whole interior.",
            src: buffLightingWarm,
          },
        ],
      },
    },
    textureExamples: [
      {
        label: "Seamless buff brick texture — closer view",
        caption: "Closer seamless buff brick texture suited to detail views and smaller surfaces (900 × 900 mm)",
        src: buffSeamless900,
      },
      {
        label: "Seamless buff brick texture — larger wall area",
        caption: "Seamless buff brick texture covering a larger wall area (3600 × 3600 mm)",
        src: buffSeamless3600,
      },
    ],
  },
  {
    slug: "brown",
    tone: "brown",
    title: "Brown facing bricks",
    shortLabel: "Brown",
    textureSeoNoun: "brown brick",
    traditionalNoun: "brown bricks",
    h1: "Brown facing bricks",
    lead:
      "Brown bricks combine well with timber, stone and planting. Their mixed earth tones suit housing, conversions and landscape-led sites where a strong red would be too prominent.",
    metaTitle: "Brown Facing Bricks | Colour Guide | Bricktextures",
    metaDescription:
      "Traditional use of brown bricks, designing with complementary colours and materials, lighting, and seamless brown brick textures.",
    appFilterUrl: "/app/facing-bricks?filterColour=Brown&src=colour-brown",
    appTextureUrl: "/app/facing-bricks?filterColour=Brown&tab=texture&src=colour-brown-textures",
    traditionalUse: {
      summary:
        "Brown brick feels at home with timber, stone and planting. It is familiar in villages and suburbs, where a strong red might dominate.",
    },
    designingWith: {
      summary:
        "Look at the actual brick sample first. Browns lean red, grey or ochre, so choose neighbouring colours to match what you see rather than the label on the datasheet.",
      surroundings:
        "Brown brick is often found in rural buildings and suburban housing, where earth colours already sit in the landscape. In an urban setting, check neighbouring roofs, render and timber. In a rural setting, look at the natural landscape features and the dominant colours of soil, stone and planting. Then decide whether the brown brick should blend into that setting or contrast it.",
      emotions:
        "Brown brick feels settled and quiet, closer to timber, soil and planting than red. Creams and greens keep that calm; purple planting adds richness; dark blue-grey frames sharpen the outline when you want a crisper look.",
      complementary: {
        items: [
          {
            name: "Dark blues and blue-greys",
            swatch: "linear-gradient(135deg, #262b2d, #59656b 52%, #36495a)",
            exampleImage: {
              label: "Brown brick with dark blue-grey cladding and frames",
              caption:
                "Blue-grey cladding and frames give brown brick a cool, contemporary edge, while soft planting stops it feeling hard.",
              src: brownBlueGrey,
            },
          },
          {
            name: "Olive and sage green",
            swatch: "linear-gradient(135deg, #59634b, #7f896b 52%, #a7ad91)",
            exampleImage: {
              label: "Brown brick with olive and sage green landscaping",
              caption:
                "Olive, sage and clipped greens echo the earth colours in brown brick and help the building belong in its setting. Dark roofing and frames give it a clear outline.",
              src: brownOliveSage,
            },
            additionalExampleImages: [
              {
                label: "Brown brick with purple planting and timber components",
                caption:
                  "Purple and burgundy planting bring a richer complementary colour against brown brick. Warm timber screens and canopies keep a natural connection with the masonry.",
                src: brownPurplePlanting,
              },
            ],
          },
          {
            name: "Cream and warm neutral yellows",
            swatch: "linear-gradient(135deg, #f2ead8, #d8c99f 52%, #b79b67)",
            exampleImage: {
              label: "Brown brick with cream and warm neutral entrance details",
              caption:
                "A cream or pale stone entrance lifts brown brick and creates a lighter contrast at the main approach, while dark grey frames and roofing keep the elevation clearly outlined.",
              src: brownCreamNeutral,
            },
          },
        ],
      },
      lighting: {
        summary:
          "Brown brick absorbs light rather than throwing it back. Do not rely on reflected light from the surface — treat it as nothing and plan second lighting instead. Side light in the early morning or late afternoon still helps outdoors, but interiors and façades after dark need their own light.",
        howWeFeel:
          "Wall-wash lighting is not there to brighten the whole wall. It creates pools of light that people enjoy and find comfortable. Warm washes bring out the red and ochre in brown brick; cool white light pulls the grey forward and can flatten a dark blend.",
        images: [
          {
            label: "Brown brick interior with wall-wash lighting",
            caption:
              "Inside, brown brick does not bounce light around the room. Wall washes, shelf lighting and lamps create pools of glow that make the space feel comfortable rather than depending on the brick to reflect anything.",
            src: brownLightingInternal,
          },
          {
            label: "Brown brick exterior with bollard and wall-wash lighting",
            caption:
              "Low-level bollard lighting works upwards because we cannot depend on reflective light from the brick — brown simply absorbs light and does not reflect it. Up-and-down wall lights add further pools of glow on the façade for the same reason.",
            src: brownLightingExternal,
          },
        ],
      },
    },
    textureExamples: [
      {
        label: "Seamless brown brick texture — detail tile",
        caption:
          "Closer seamless brown brick texture suited to detail views and smaller surfaces (900 × 900 mm)",
        src: brownSeamless900,
      },
      {
        label: "Seamless brown brick texture — larger wall area",
        caption:
          "Example seamless brown brick texture covering a larger wall area (3600 × 3600 mm)",
        src: brownSeamless3600,
      },
    ],
  },
  {
    slug: "grey-black-white",
    tone: "neutral",
    title: "Neutral facing bricks",
    shortLabel: "Neutral",
    textureSeoNoun: "grey brick",
    traditionalNoun: "neutral bricks",
    h1: "Neutral facing bricks",
    lead:
      "Neutral brick — white through grey to black — is less about colour and more about shape, joints and shadow. It suits contemporary buildings where you want a calm, precise look.",
    metaTitle: "Neutral Facing Bricks | Colour Guide | Bricktextures",
    metaDescription:
      "Traditional and modern use of neutral bricks, designing with complementary colours and materials, lighting, and seamless grey brick textures.",
    appFilterUrl: "/app/facing-bricks?filterColour=Black-White&src=colour-neutral",
    appTextureUrl:
      "/app/facing-bricks?filterColour=Black-White&tab=texture&src=colour-neutral-textures",
    traditionalUse: {
      summary:
        "Dark blue engineering bricks were used for bridges, retaining walls and groundworks — tough, practical brick for hard-working structures.",
    },
    designingWith: {
      summary:
        "Neutral brick does not dominate the colour of a building. That leaves room to introduce almost any complementary colour — quiet timber and brown, or much stronger accents — without fighting the masonry.",
      surroundings:
        "Grey, black and white brick are common beside glass, metal and painted panels in contemporary city buildings. In the countryside, look at stone, hedges and sky. Then decide whether the brick should blend into those surroundings or stand apart.",
      emotions:
        "Because the brick stays quiet, the eye goes to whatever colour you add. Warm browns and timber feel settled and residential; bright panels and balconies feel playful and energetic. Choose the mood first, then the colour.",
      complementary: {
        items: [
          {
            name: "Any strong colour",
            swatch:
              "linear-gradient(135deg, #c23b2a 0%, #e0a21a 28%, #2f8f4e 55%, #2a6fbf 78%, #6b3fa0 100%)",
            exampleImage: {
              label: "Grey brick with multicoloured balcony boxes",
              caption:
                "Orange, blue, teal, lime and yellow balconies sit clearly against grey brick. The masonry stays in the background, so almost any colour can take the lead.",
              src: neutralMulticolourBalconies,
            },
            additionalExampleImages: [
              {
                label: "Grey brick with mixed bright façade accents",
                caption:
                  "Orange frames, yellow canopies, blue boxes and rainbow fins show how freely colour can be introduced when the brick itself does not dominate.",
                src: neutralMixedBright,
              },
              {
                label: "Grey brick with red, yellow and blue panels",
                caption:
                  "Primary colour panels read strongly against light grey brickwork. The brick is the quiet field that lets those colours do the talking.",
                src: neutralPrimaryPanels,
              },
            ],
          },
          {
            name: "Browns and timber",
            swatch: "linear-gradient(135deg, #5c3a22, #8b5a34 52%, #c4a06a)",
            exampleImage: {
              label: "Grey brick house with brown timber details",
              caption:
                "Brown wood on the door, balcony and soffits draws the eye. The grey brick makes that warm colour stand out more clearly than it would against a strong brick colour.",
              src: neutralBrownTimberHouse,
            },
            additionalExampleImages: [
              {
                label: "Grey brick with brown timber fins",
                caption:
                  "Warm brown timber fins become the main feature against mottled grey brick, glass and dark frames — again because the masonry does not compete for colour attention.",
                src: neutralBrownTimberFins,
              },
            ],
          },
        ],
      },
      lighting: {
        summary:
          "The colour of the brick changes how much light is reflected around the room. Black brick absorbs light; white brick reflects it. In the same layout, with the same fittings, a lighter brick lifts the whole space while a darker brick keeps it quieter. Design your lighting with that in mind, rather than treating grey, black and white as interchangeable.",
        howWeFeel:
          "Dark brick suits a more atmospheric, moody interior. White brick suits brighter, more clinical workspaces where you want the room to feel open and lifted. Cool, even light keeps neutral brick looking sharp; warm light at seating and entrances softens black brick when you need comfort as well as drama.",
        images: [
          {
            label: "Black brick interior under the same lighting layout",
            caption:
              "Black brick absorbs light rather than bouncing it around the room. Spotlights and shelf lighting create local pools of glow, but the space stays darker and more atmospheric overall.",
            src: neutralLightingBlack,
          },
          {
            label: "White brick interior under the same lighting layout",
            caption:
              "The same scene with white brick looks brighter throughout. The masonry reflects light back into the room, lifting the space — useful for clinics and other bright workspaces.",
            src: neutralLightingWhite,
          },
        ],
      },
    },
    textureExamples: [
      {
        label: "Seamless grey brick texture — detail tile",
        caption:
          "Closer seamless grey brick texture suited to detail views and smaller surfaces (900 × 900 mm)",
        src: greySeamless900,
      },
      {
        label: "Seamless grey brick texture — larger wall area",
        caption:
          "Example seamless grey brick texture covering a larger wall area (3600 × 3600 mm)",
        src: greySeamless3600,
      },
    ],
  },
];

export function getColourGuide(slug: string): ColourGuide | undefined {
  return COLOUR_GUIDES.find(guide => guide.slug === slug);
}
