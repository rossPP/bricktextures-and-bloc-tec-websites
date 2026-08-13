import redCreamBuffOak from "../assets/colours/red/red-brick-complementary-colours-cream-brown.webp";
import redDarkBlueGrey from "../assets/colours/red/red-brick-complementary-colours-blue-grey-slate.webp";
import redGreenFoliage from "../assets/colours/red/red-brick-complementary-colours-green-blue-grey.webp";
import redLightingExternal from "../assets/colours/red/red-brick-external-warm-lighting.webp";
import redLightingInternal from "../assets/colours/red/red-brick-interior-warm-lighting.webp";
import redSeamless3600 from "../assets/colours/red/seamless-red-brick-texture-3600mm.jpeg";
import redSeamless900 from "../assets/colours/red/seamless-red-brick-texture-900mm.jpeg";

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
        exampleImage: {
          label: string;
          caption: string;
          src?: string;
        };
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
      "Buff bricks range from cream to warm yellow. They reflect more daylight than red or brown brick and can lighten streets, courtyards and interiors.",
    metaTitle: "Buff Facing Bricks | Colour Guide | Bricktextures",
    metaDescription:
      "Traditional use of buff bricks, designing with complementary colours and materials, lighting, and seamless buff brick textures.",
    appFilterUrl: "/app/facing-bricks?filterColour=Buff&src=colour-buff",
    appTextureUrl: "/app/facing-bricks?filterColour=Buff&tab=texture&src=colour-buff-textures",
    traditionalUse: {
      summary:
        "Yellow and buff stock bricks are strongly associated with London and the south-east of England, where their use gives streets and buildings a distinct local character.",
    },
    designingWith: {
      summary:
        "Buff brick benefits from a darker or richer counterpoint. This gives definition to openings and prevents the brick, paving and sky from merging into one pale composition.",
      surroundings:
        "Buff and yellow stock bricks are common in many urban streets, especially where pale masonry already sets the tone. In an urban setting, look at neighbouring walls, roofs and paving. In a rural setting, look at the natural landscape features and the dominant colours around the site. Then decide whether the buff brick should blend into that pale context or contrast it to stand out.",
      emotions:
        "Buff brick feels light, open and often sunny. It can make streets and courtyards feel brighter, but without a deeper counterpoint it may also feel washed out. Darker greys, ink blues or muted greens help people read the openings and give the elevation more weight.",
      complementary: {
        items: [
          {
            name: "Charcoal and graphite",
            swatch: "linear-gradient(135deg, #272b2c, #62696a 52%, #43484a)",
            exampleImage: {
              label: "Buff brick with charcoal and graphite details",
              caption:
                "Placeholder: darker frames, roofs and paving giving buff brick a clear outline.",
            },
          },
          {
            name: "Ink blue",
            swatch: "linear-gradient(135deg, #1f2f42, #405a73 52%, #2f4054)",
            exampleImage: {
              label: "Buff brick with ink blue details",
              caption:
                "Placeholder: blue joinery, cladding or ceramic details set against yellow-buff brick.",
            },
          },
          {
            name: "Olive, sage and terracotta",
            swatch: "linear-gradient(135deg, #66705b, #9aa185 52%, #a96f50)",
            exampleImage: {
              label: "Buff brick with olive, sage and terracotta accents",
              caption:
                "Placeholder: greens, timber and clay used to soften a light buff elevation.",
            },
          },
        ],
      },
      lighting: {
        summary:
          "Buff brick reflects useful daylight into narrow streets, courtyards and light wells. Strong sun can make a yellow face appear more saturated, so texture, reveal depth and darker openings become important. Under overcast light, buff generally retains more definition than white brick.",
        howWeFeel:
          "The extra reflected light makes enclosed spaces feel more open. Indoors, check the brick under the proposed lamps: warm light pulls out yellow tones, while cool light brings the face closer to cream or light grey.",
      },
    },
    textureExamples: [
      {
        label: "Seamless buff brick texture — courtyard elevation",
        caption: "Placeholder for a downloadable seamless buff brick texture tile.",
      },
      {
        label: "Cream brick texture — bright interior wall sample",
        caption: "Placeholder for a cream or buff texture for interiors.",
      },
      {
        label: "Yellow-buff brick texture — sunny façade sample",
        caption: "Placeholder for a warmer yellow-buff seamless texture.",
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
        "Brown and multi-toned bricks have long been used in rural buildings and suburban housing, where their earth colours give the brickwork a natural, grounded character.",
    },
    designingWith: {
      summary:
        "Start with the undertones in the actual brick sample. Brown blends may lean red, grey or ochre, and the adjoining colours should respond to that mix rather than to the word ‘brown’.",
      surroundings:
        "Brown brick is often found in rural buildings and suburban housing, where earth colours already sit in the landscape. In an urban setting, check neighbouring roofs, render and timber. In a rural setting, look at the natural landscape features and the dominant colours of soil, stone and planting. Then decide whether the brown brick should blend into that setting or contrast it.",
      emotions:
        "Brown brick feels grounded and settled. It usually reads as quieter than red, and can make a building feel closer to timber, soil and planting. Creams and greens support that calm; darker details sharpen the outline if the scheme needs more definition.",
      complementary: {
        items: [
          {
            name: "Cream, limewash white and oak",
            swatch: "linear-gradient(135deg, #f2ead8, #ded4bd 52%, #a57b55)",
            exampleImage: {
              label: "Brown brick with cream masonry and oak",
              caption:
                "Placeholder: pale stone, render and oak used to lift warmer brown brick tones.",
            },
          },
          {
            name: "Forest and moss green",
            swatch: "linear-gradient(135deg, #344637, #607258 52%, #82906c)",
            exampleImage: {
              label: "Brown brick with forest and moss green planting",
              caption:
                "Placeholder: layered greens helping brown brick sit naturally in a planted setting.",
            },
          },
          {
            name: "Charcoal and black",
            swatch: "linear-gradient(135deg, #171918, #4b4b47 52%, #73706a)",
            exampleImage: {
              label: "Brown brick with charcoal and black details",
              caption:
                "Placeholder: dark frames, roofs and paving sharpening the outline of brown brick.",
            },
          },
        ],
      },
      lighting: {
        summary:
          "Brown brick absorbs more light than buff and many reds. In deep shade, dark openings and dark mortar can merge with the face, so check the sample on the intended orientation. Raking light is useful on mixed brown blends because it reveals differences in colour and surface texture.",
        howWeFeel:
          "Warm exterior or interior lighting brings out red and ochre undertones. Cool white light emphasises grey undertones and can make a dark blend appear flatter.",
      },
    },
    textureExamples: [
      {
        label: "Seamless brown brick texture — landscape elevation",
        caption: "Placeholder for a downloadable seamless brown brick texture tile.",
      },
      {
        label: "Blended brown brick texture — close face sample",
        caption: "Placeholder showing mixed undertones in a brown blend texture.",
      },
      {
        label: "Earthy brown brick texture — interior feature wall",
        caption: "Placeholder for a brown brick texture used on an interior feature wall.",
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
      "Neutral bricks have no true colour — white to black across the grey spectrum. They put more emphasis on form, jointing and shadow than traditional earth colours, and suit elevations that need a controlled, contemporary palette.",
    metaTitle: "Neutral Facing Bricks | Colour Guide | Bricktextures",
    metaDescription:
      "Traditional and modern use of neutral bricks, designing with complementary colours and materials, lighting, and seamless grey brick textures.",
    appFilterUrl: "/app/facing-bricks?filterColour=Black-White&src=colour-neutral",
    appTextureUrl:
      "/app/facing-bricks?filterColour=Black-White&tab=texture&src=colour-neutral-textures",
    traditionalUse: {
      summary:
        "Within the neutral range, dark blue engineering bricks were traditionally used for bridges, retaining walls and groundworks, giving them a strong, robust and practical character.",
    },
    designingWith: {
      summary:
        "With a neutral brick, decide whether the scheme should remain restrained or use one warmer accent. Too many greys can flatten the elevation; one clear contrast is usually more effective.",
      surroundings:
        "Neutral bricks are common in contemporary urban work, where grey, black or white masonry is used for a controlled palette. In an urban setting, look at neighbouring glass, metal, concrete and painted surfaces. In a rural setting, look at the natural landscape features and decide how pale or dark the brick should sit against them. Then choose whether the building should blend into that setting or contrast it.",
      emotions:
        "Neutral brick can feel calm, precise and modern, but also cool or severe if left unsupported. Timber, greens or bronze accents bring warmth back into the scheme and help people feel more comfortable around the building.",
      complementary: {
        items: [
          {
            name: "Oak and warm timber",
            swatch: "linear-gradient(135deg, #704d34, #9b7654 52%, #c39b70)",
            exampleImage: {
              label: "Neutral brick with oak and warm timber",
              caption:
                "Placeholder: timber doors, cladding or soffits warming a grey, black or white elevation.",
            },
          },
          {
            name: "Soft and deep green",
            swatch: "linear-gradient(135deg, #3f5141, #64745f 52%, #91a087)",
            exampleImage: {
              label: "Neutral brick with soft and deep green accents",
              caption:
                "Placeholder: planting and green joinery softening a restrained neutral façade.",
            },
          },
          {
            name: "Bronze, muted brass and terracotta",
            swatch: "linear-gradient(135deg, #6f5135, #a68757 52%, #a96345)",
            exampleImage: {
              label: "Neutral brick with bronze and terracotta accents",
              caption:
                "Placeholder: bronze metalwork and clay tones adding controlled warmth to a neutral scheme.",
            },
          },
        ],
      },
      lighting: {
        summary:
          "Grey brick changes with the colour of the sky and can appear cooler under overcast light. White brick needs surface texture, bond or reveal depth to avoid looking flat. Black brick absorbs light and emphasises the outline of the building; grazing light is needed if the surface texture is meant to be visible after dark.",
        howWeFeel:
          "Cool, even light keeps a neutral scheme precise. Warmer light at entrances and occupied terraces makes grey or black brick less severe and helps people distinguish those spaces from the main façade.",
      },
    },
    textureExamples: [
      {
        label: "Seamless grey brick texture — contemporary façade",
        caption: "Placeholder for a downloadable seamless grey brick texture tile.",
      },
      {
        label: "Black brick texture — graphic elevation sample",
        caption: "Placeholder for a dark / black brick seamless texture.",
      },
      {
        label: "White brick texture — bright interior or façade sample",
        caption: "Placeholder for a white or light grey brick texture.",
      },
    ],
  },
];

export function getColourGuide(slug: string): ColourGuide | undefined {
  return COLOUR_GUIDES.find(guide => guide.slug === slug);
}
