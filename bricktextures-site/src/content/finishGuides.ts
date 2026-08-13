export type FinishGuide = {
  slug: string;
  tone: "smooth" | "glazed" | "tumbled" | "traditional" | "wirecut";
  title: string;
  shortLabel: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  appFilterUrl: string;
  whatItIs: string;
  overallFeel: string;
  whyChoose: string[];
  lightAndAtmosphere: string;
  howMade: string;
  complementaryMaterials: {
    summary: string;
    items: { name: string; note: string }[];
  };
  useCases: {
    summary: string;
    items: { name: string; note: string }[];
  };
  blendingNote: string;
  facadeAndInterior: string;
  bondGroups: Array<"classic" | "modern" | "traditional">;
  bondsSummary: string;
  recommendedBonds: string[];
};

export const FINISH_GUIDES: FinishGuide[] = [
  {
    slug: "smooth",
    tone: "smooth",
    title: "Smooth facing bricks",
    shortLabel: "Smooth",
    h1: "Smooth facing bricks",
    lead:
      "Facing bricks with little surface relief, used where an even texture and clearly defined joint pattern are required.",
    metaTitle: "Smooth Facing Bricks | Texture Guide | Bricktextures",
    metaDescription:
      "Smooth facing brick texture: modern appearance, interior use, light behaviour, complementary materials and common project scenarios. Also known as a smooth finish in many catalogues.",
    appFilterUrl: "/app/facing-bricks?filterFinish=Smooth&src=finish-smooth",
    whatItIs:
      "Smooth describes the face texture, not a single manufacturing method. Smooth-faced bricks may be extruded, pressed or moulded, and their edge profile and dimensional tolerance vary by product. The common characteristic is a relatively even face with little surface relief.",
    overallFeel:
      "A smooth face places greater visual emphasis on colour, bond and mortar joints than on surface relief. It is commonly used for contemporary façades and interiors, although suitability depends on the product's dimensions, edges and colour variation.",
    whyChoose: [
      "The design calls for an even face with limited surface variation.",
      "The wall will be close to users in corridors, stairs or lobbies, where a deeply textured face may be unsuitable.",
      "Openings, metalwork or adjacent materials should remain visually prominent.",
      "Joint pattern and brick colour should do more of the visual work than texture.",
    ],
    lightAndAtmosphere:
      "Smooth faces distribute light more evenly than deeply textured faces, so colour, joint profile and bond remain prominent. Sheen varies with the clay body, coating and firing rather than with the 'smooth' classification alone. Grazing light will reveal small face and laying variations; review a sample panel under the expected daylight or artificial lighting.",
    howMade:
      "A smooth face can be produced by extrusion, pressing or moulding, sometimes with additional face treatment. It should not be assumed to mean wirecut production or tight dimensional tolerances: check the declared production method, size range and tolerance for the selected product.",
    complementaryMaterials: {
      summary:
        "Smooth brick is often coordinated with materials that have similarly controlled joints and edges.",
      items: [
        {
          name: "Slim aluminium or bronze window systems",
          note: "Matches the clean geometry of a smooth masonry plane.",
        },
        {
          name: "Fair-faced concrete and pale stone",
          note: "Keeps plinths, floors and adjacent planes in a refined material family.",
        },
        {
          name: "Flat metal flashings and standing-seam roofs",
          note: "Reinforces a contemporary, controlled detail language.",
        },
        {
          name: "Light timber accents",
          note: "Provides colour and surface contrast in interiors.",
        },
        {
          name: "Consistent mortar colour",
          note: "Light mortar opens the grid; closer-tone mortar makes the wall more monolithic.",
        },
      ],
    },
    useCases: {
      summary:
        "Common where a low-relief surface or close-range use is part of the brief.",
      items: [
        {
          name: "Internal feature walls and circulation",
          note: "Stairs, corridors and lobbies where hands and bags pass close to the surface.",
        },
        {
          name: "Contemporary housing and apartments",
          note: "Clean street elevations and courtyards with a modern masonry identity.",
        },
        {
          name: "Offices, studios and education interiors",
          note: "Low-relief exposed masonry for workplaces and learning spaces.",
        },
        {
          name: "Extensions with crisp detailing",
          note: "Useful when new work should read precise beside a more textured host building.",
        },
      ],
    },
    blendingNote:
      "Blending smooth-faced products can introduce colour variation while retaining a consistent surface texture. Confirm that dimensions, water absorption, durability and other specification requirements are compatible before mixing products.",
    facadeAndInterior:
      "Externally, smooth brick suits façades where proportion, openings, colour and joint layout carry the design. Internally, the lower-relief face can be preferable in circulation and occupied spaces, although projections, joint profiles and edge sharpness should also be checked.",
    bondGroups: ["modern", "classic"],
    bondsSummary:
      "Smooth texture alone does not establish dimensional accuracy. Smooth products made to tight tolerances can suit stack, grid, basketweave and vertical patterns; verify actual dimensions and joint range. Running bonds are generally less sensitive to small dimensional variation.",
    recommendedBonds: ["Stack bond", "Basketweave", "Vertical / soldier courses", "Half-bond / running bond"],
  },
  {
    slug: "glazed",
    tone: "glazed",
    title: "Glazed facing bricks",
    shortLabel: "Glazed",
    h1: "Glazed facing bricks",
    lead:
      "Facing bricks with a fired glaze, specified for colour, reflectance and cleanability where the selected product meets the required exposure and performance criteria.",
    metaTitle: "Glazed Facing Bricks | Texture Guide | Bricktextures",
    metaDescription:
      "Glazed facing brick texture: easy-clean and clinical use, strong colour façades, light behaviour, blending and common project scenarios.",
    appFilterUrl: "/app/facing-bricks?filterFinish=Glazed&src=finish-glazed",
    whatItIs:
      "Glazed bricks have a vitreous coating fired onto one or more faces. The coating generally has lower surface absorption than an unglazed clay face and can be easier to clean. Colour, gloss, crazing, edge coverage and exposure suitability vary by product.",
    overallFeel:
      "Glazed brick gives a more reflective and colour-controlled surface than most unglazed clay faces. Pale, dark and saturated glazes behave differently under daylight, and gloss level has a direct effect on reflections.",
    whyChoose: [
      "You need an easy-clean surface for hygiene, maintenance or heavy public use.",
      "The design requires a colour or degree of uniformity not readily available in an unglazed clay body.",
      "The façade may face graffiti, pollution or frequent cleaning regimes.",
      "The brickwork forms a colour-coded, patterned or prominent part of the elevation.",
    ],
    lightAndAtmosphere:
      "Glazed faces reflect daylight and artificial light, with the strongest specular reflections occurring on high-gloss products. Assess large glazed areas for glare toward neighbours, roads and occupied spaces. Internally, consider reflected luminaires and contrast as well as colour; a project sample is preferable to judging from a catalogue image.",
    howMade:
      "A glaze slip or coating is applied to the brick face and fired, fusing a glass-like layer to the clay body. That process supports a wide colour range — including colours that are difficult to achieve in through-body clay alone — and creates the wipeable, durable face associated with glazed masonry.",
    complementaryMaterials: {
      summary:
        "Coordinate glazed brick with adjacent materials, sealants and metalwork, particularly where colour or gloss contrast is high.",
      items: [
        {
          name: "Stainless steel, porcelain and sealed floors",
          note: "Natural partners in clinical, transit and wet-area settings.",
        },
        {
          name: "Dark or pale metal window frames",
          note: "Frame strong glaze colours cleanly without visual clutter.",
        },
        {
          name: "Fair-faced concrete and simple render",
          note: "Plain adjacent surfaces let the colour and gloss of the glazed brick remain prominent.",
        },
        {
          name: "Timber used sparingly",
          note: "Introduces a matte surface and colour contrast beside reflective brickwork.",
        },
        {
          name: "Discrete lighting and signage",
          note: "Works with the reflective face instead of fighting glare and hotspotting.",
        },
      ],
    },
    useCases: {
      summary:
        "Common in hard-wearing public environments and anywhere colour needs to stay vivid and cleanable.",
      items: [
        {
          name: "Metro, rail and transport interiors",
          note: "Durable, washable walls that cope with crowds, cleaning and long service life.",
        },
        {
          name: "Clinical, laboratory and hygiene-led spaces",
          note: "Easy-clean faces for healthcare-adjacent, food and controlled environments.",
        },
        {
          name: "Urban façades under graffiti or pollution pressure",
          note: "Harder to mark permanently and simpler to clean than porous clay faces.",
        },
        {
          name: "Landmark and accent elevations",
          note: "Strong colour bands, feature walls and civic moments that need to read from a distance.",
        },
        {
          name: "Wet rooms, pools and leisure",
          note: "Moisture-tolerant decorative masonry with a sealed face.",
        },
      ],
    },
    blendingNote:
      "Different glaze colours, or glazed and unglazed bricks, can be combined for patterns and wayfinding. Check compatibility of dimensions, tolerances, durability and cleaning requirements, and approve the combination in a sample panel.",
    facadeAndInterior:
      "Externally, glazed brick is specified for colour, surface durability and cleaning requirements. Internally, it is used in stations, leisure facilities, sanitary areas and reception spaces. Confirm slip, hygiene and chemical-resistance requirements separately where relevant; a glazed face alone does not satisfy them.",
    bondGroups: ["modern", "classic"],
    bondsSummary:
      "A glaze does not guarantee square edges or tight sizing. Where a glazed product has suitable dimensional tolerances, geometric bonds can align colour and joint modules accurately. Running bond remains appropriate where the design or product variation calls for a less tolerance-sensitive layout.",
    recommendedBonds: ["Stack bond", "Basketweave", "Grid / stacked variations", "Half-bond / running bond"],
  },
  {
    slug: "tumbled",
    tone: "tumbled",
    title: "Tumbled facing bricks",
    shortLabel: "Tumbled",
    h1: "Tumbled facing bricks",
    lead:
      "Facing bricks with mechanically softened edges and corners, used where a less regular arris and an aged appearance are required.",
    metaTitle: "Tumbled Facing Bricks | Texture Guide | Bricktextures",
    metaDescription:
      "Tumbled facing brick texture: rustic and traditional character, light behaviour, complementary materials such as oak, and common project scenarios.",
    appFilterUrl: "/app/facing-bricks?filterEdgeType=Tumbled&src=finish-tumbled",
    whatItIs:
      "Tumbled describes an edge treatment, not the way the brick face was originally formed. Bricks from several production routes may be tumbled or otherwise distressed so that arrises and corners become chipped or rounded. Face texture, dimensional tolerance and degree of edge wear vary by product.",
    overallFeel:
      "Tumbled edges give new brickwork a less regular outline and can make it relate more readily to weathered or reclaimed masonry. The treatment is commonly used for traditional or rural design briefs, but it is not evidence of a particular historic production method.",
    whyChoose: [
      "New brickwork needs a softer edge profile than a crisp, untreated product.",
      "The project needs a rustic, antique or barn-like character.",
      "You are restoring or extending in a traditional context where sharp new edges would look wrong.",
      "Irregular arrises are appropriate to the intended detailing and context.",
    ],
    lightAndAtmosphere:
      "Chipped and rounded arrises interrupt the regular highlight and shadow at bed and perpend joints. The effect is most visible in raking light and with recessed or weathered joint profiles. Face texture still has a separate influence, so compare samples under the expected lighting.",
    howMade:
      "The product is mechanically handled or tumbled to chip and soften edges, typically as a separate finishing operation. Methods and process stages vary by manufacturer. This treatment should be distinguished from moulding, extrusion or other processes used to form the face and body.",
    complementaryMaterials: {
      summary:
        "Tumbled brick is commonly detailed with materials used in traditional and rural work.",
      items: [
        {
          name: "Oak beams, posts and joinery",
          note: "Classic partners for tumbled brick in homes, barns and hospitality.",
        },
        {
          name: "Natural stone and lime-toned mortars",
          note: "Supports a heritage or rural reading of the wall.",
        },
        {
          name: "Clay tiles and traditional roofscapes",
          note: "Keeps the whole envelope in a weathered, pre-modern family.",
        },
        {
          name: "Black ironmongery and simple metalwork",
          note: "Quiet robust detailing that suits rustic elevations.",
        },
        {
          name: "Limewash, soft paints and textiles indoors",
          note: "Adds softer surface contrast beside worn-edge masonry.",
        },
      ],
    },
    useCases: {
      summary:
        "Used where softened arrises support the required context or architectural detail.",
      items: [
        {
          name: "New builds wanting an old look",
          note: "Houses and courtyard schemes requiring an aged edge profile in new masonry.",
        },
        {
          name: "Barn, farm and rural conversions",
          note: "Matches the worn language of agricultural and landscape buildings.",
        },
        {
          name: "Heritage streets and conservation-led infill",
          note: "Softer edges help new work sit beside older masonry.",
        },
        {
          name: "Traditional hospitality interiors",
          note: "Inns, hotels and restaurants where the softened edge supports an established material palette.",
        },
        {
          name: "Homely residential interiors",
          note: "Feature walls that support oak, hearths and crafted domestic detailing.",
        },
      ],
    },
    blendingNote:
      "Related colour blends can increase variation across tumbled brickwork. Review the manufacturer's blend proportions and site-mixing instructions, because edge treatment and colour range can both vary between batches.",
    facadeAndInterior:
      "Externally, tumbled arrises reduce the crispness of new brickwork and are often paired with traditional forms and roof materials. Internally, consider dust retention, cleaning and the joint profile as well as the appearance of the softened edges.",
    bondGroups: ["traditional"],
    bondsSummary:
      "Tumbled products are often used with Flemish, English, Monk and garden-wall bonds. Their irregular arrises make continuous-joint layouts harder to control visually, although suitability depends on the actual dimensional tolerance and degree of tumbling.",
    recommendedBonds: ["Flemish bond", "Monk bond", "English bond", "Garden wall bonds"],
  },
  {
    slug: "traditional",
    tone: "traditional",
    title: "Traditional facing bricks",
    shortLabel: "Traditional",
    h1: "Traditional facing bricks",
    lead:
      "Sand-moulded or stock-style facing bricks with creased, sanded faces and product-dependent variation.",
    metaTitle: "Traditional Facing Bricks | Texture Guide | Bricktextures",
    metaDescription:
      "Traditional facing brick texture: sand-released creased character, uniqueness, light behaviour, complementary materials and common project scenarios.",
    appFilterUrl:
      "/app/facing-bricks?filterProductionType=Sand%20Released&src=finish-traditional",
    whatItIs:
      "Traditional stock-style bricks are generally formed in sanded moulds. Sand assists release and contributes to the face texture, while the filling and moulding process can produce creases and folds. Handmade and machine-made products are available; the amount of face, colour and dimensional variation depends on the product and production method.",
    overallFeel:
      "Creased and sanded faces produce more local shadow than smooth brickwork, particularly in raking light. These products are often selected for traditional or conservation-led work, but neither appearance nor price alone establishes technical quality or suitability.",
    whyChoose: [
      "The specification calls for a creased or sanded face with visible unit variation.",
      "The selected face needs to relate to traditional or existing masonry.",
      "Creased texture and sanded surface quality are part of the design intent.",
      "The accepted sample and blend provide the required degree of variation.",
    ],
    lightAndAtmosphere:
      "Raking light makes creases and sand texture more apparent; diffuse or frontal light reduces the contrast. Internally, side windows and wall-washing luminaires can emphasise surface variation. Assess a representative panel under the intended lighting because catalogue photography may exaggerate or suppress texture.",
    howMade:
      "Clay is placed or thrown into a sanded mould, then released before drying and firing. Sand acts as a release medium and remains as a surface texture; creasing depends on clay preparation and how the mould is filled. Handmade, soft-mud and mechanised stock processes differ, so confirm the manufacturer's stated production type.",
    complementaryMaterials: {
      summary:
        "Traditional stock-style brick is commonly coordinated with established masonry, timber and clay products.",
      items: [
        {
          name: "Lime-toned or carefully matched mortars",
          note: "Lets creased faces remain the focus without a harsh modern joint line.",
        },
        {
          name: "Timber windows, oak and painted joinery",
          note: "Suits housing and civic buildings with a warmer traditional identity.",
        },
        {
          name: "Natural stone cills and dressings",
          note: "Classic partners in streets with established masonry languages.",
        },
        {
          name: "Clay tile roofs",
          note: "Completes a traditional envelope family.",
        },
        {
          name: "Simple metalwork in black or bronze",
          note: "Provides contrast without turning the scheme fully contemporary-industrial.",
        },
      ],
    },
    useCases: {
      summary:
        "Common in traditional, conservation-led and contextual work where face variation is required.",
      items: [
        {
          name: "Traditional streets and housing",
          note: "Homes and terraces where a creased or sanded face is required.",
        },
        {
          name: "Civic and institutional buildings with craft character",
          note: "Elevations designed to show face texture at close viewing distances.",
        },
        {
          name: "Residential façades",
          note: "Used where sanded or creased stock character is part of the design brief.",
        },
        {
          name: "Extensions in historic contexts",
          note: "Creased, varied faces help new work relate to older brickwork nearby.",
        },
      ],
    },
    blendingNote:
      "Stock-style bricks may already contain substantial colour and face variation. When blending products or packs, set the proportions and site-mixing method from representative samples; unrelated colours can obscure the intended bond and detailing.",
    facadeAndInterior:
      "Externally, creased sand-moulded faces are most apparent at close range and in oblique light. Internally, consider lighting, cleaning and projections from the face and joints when specifying exposed brickwork in occupied spaces.",
    bondGroups: ["traditional"],
    bondsSummary:
      "Sand-moulded stock bricks are often used in Flemish, English, Monk and garden-wall bonds, especially in period-led work. Product tolerances, structural design and setting-out still govern the choice; the face texture does not by itself determine the bond.",
    recommendedBonds: ["Flemish bond", "English bond", "Monk bond", "Garden wall bonds", "Random traditional"],
  },
  {
    slug: "wirecut",
    tone: "wirecut",
    title: "Wirecut facing bricks",
    shortLabel: "Wirecut",
    h1: "Wirecut facing bricks",
    lead:
      "Extruded clay units cut to length by wire, available with smooth, dragfaced, rolled, dimpled and other face treatments.",
    metaTitle: "Wirecut Facing Bricks | Texture Guide | Bricktextures",
    metaDescription:
      "Wirecut facing brick texture: regular sizing, mass production, surface finish options, light behaviour and common project scenarios.",
    appFilterUrl: "/app/facing-bricks?filterProductionType=Wirecut&src=finish-wirecut",
    whatItIs:
      "Wirecut describes a production method. Clay is pushed through a die as a continuous column, like toothpaste from a tube, and wires cut it into individual units. The process supports high-volume production and generally consistent dimensions, but tolerances and appearance must be checked for each product.",
    overallFeel:
      "Extrusion can produce many different face textures. A wirecut brick may be smooth, dragfaced, rolled, dimpled, rusticated or coated, so production type should not be used as a substitute for finish classification. Dimensional consistency is commonly an advantage, subject to the declared tolerance range.",
    whyChoose: [
      "You need regular sizing and appearance across a large elevation or programme.",
      "The project benefits from widely available, mass-produced facing brick supply.",
      "The required face treatment is available on an extruded product.",
      "Budget and programme favour efficient, consistent extruded products.",
    ],
    lightAndAtmosphere:
      "Light response is governed primarily by the face finish rather than extrusion itself. Smooth faces show colour and joint geometry clearly; dragfaced, indented and dimpled faces create more local shadow. Review the specified texture under representative light, particularly where the wall will be seen at close range.",
    howMade:
      "Prepared clay is extruded through a die as a continuous column, cut to unit length by wires, dried and fired. Textures, coatings or surface treatments may be applied at different stages depending on the manufacturer. This is why wirecut production and smooth finish are separate catalogue attributes.",
    complementaryMaterials: {
      summary:
        "Wirecuts suit both contemporary detailing and, with the right face, more textured material mixes.",
      items: [
        {
          name: "Aluminium, steel and precise window systems",
          note: "Natural fit with regular extruded brick geometry.",
        },
        {
          name: "Concrete, render and metal cladding accents",
          note: "Common in mixed-material contemporary housing and commercial work.",
        },
        {
          name: "Standing-seam and flat roofing systems",
          note: "Keeps the overall language efficient and modern.",
        },
        {
          name: "Timber where warmth is needed",
          note: "Balances the more industrial regularity of extruded brick.",
        },
        {
          name: "Mortar chosen for grid strength or softness",
          note: "Contrasting mortar emphasises the regular unit; a closer tone reduces joint contrast.",
        },
      ],
    },
    useCases: {
      summary:
        "Common in volume residential, commercial and institutional work requiring extruded brick at scale.",
      items: [
        {
          name: "Volume residential and apartment façades",
          note: "Regular units, wide availability and predictable appearance across phases.",
        },
        {
          name: "Commercial and mixed-use envelopes",
          note: "Efficient masonry that still offers many face textures and colours.",
        },
        {
          name: "Schools, healthcare and institutional buildings",
          note: "Practical facing brick with controlled tolerances for large programmes.",
        },
        {
          name: "Contemporary detailing with textured faces",
          note: "Dragfaced, dimpled or indented wirecuts add character without leaving extruded production.",
        },
      ],
    },
    blendingNote:
      "Wirecut products can be blended by colour or face treatment where their work sizes and technical properties are compatible. Check dimensions rather than assuming all extruded products will course together, and establish blend proportions in the specification and sample panel.",
    facadeAndInterior:
      "Externally, wirecut brick is widely used because extrusion supports consistent supply and a broad range of face treatments. Internally, select by texture, edge profile and cleaning requirements rather than by production method alone.",
    bondGroups: ["modern", "classic"],
    bondsSummary:
      "Many wirecut products have tolerances suited to geometric bonds, including stack and basketweave, but this must be verified for the selected unit. Face texture does not prevent geometric use if the dimensions and joint module are suitable. Half-bond and other running bonds remain common.",
    recommendedBonds: ["Stack bond", "Basketweave", "Half-bond / running bond", "Vertical / soldier courses"],
  },
];

export function getFinishGuide(slug: string): FinishGuide | undefined {
  return FINISH_GUIDES.find(guide => guide.slug === slug);
}
