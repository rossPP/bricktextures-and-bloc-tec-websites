export type NavLinkItem = {
  label: string;
  description: string;
  to: string;
};

export type NavHub = {
  label: string;
  /** Short links for the header dropdown. */
  navChildren: NavLinkItem[];
};

export const EXPLORE_HUB: NavHub = {
  label: "Explore",
  navChildren: [
    {
      label: "By colour",
      description: "Red, buff, brown and neutral colour groups.",
      to: "/explore/colour",
    },
    {
      label: "By texture",
      description: "Smooth, glazed, tumbled, traditional and wirecut.",
      to: "/explore/finish",
    },
    {
      label: "By size",
      description: "Standard, imperial and linear brick sizes.",
      to: "/explore/format",
    },
    {
      label: "By material",
      description: "Clay versus concrete facing bricks.",
      to: "/facing-bricks/clay-vs-concrete",
    },
  ],
};

export const DESIGN_HUB: NavHub = {
  label: "Design",
  navChildren: [
    {
      label: "Brick bonds",
      description: "Running, traditional, stack, basketweave and herringbone patterns.",
      to: "/facing-bricks/bonds",
    },
    {
      label: "Mortar colour",
      description: "Natural and dyed mortar, context effects and contrast principles.",
      to: "/facing-bricks/mortar",
    },
    {
      label: "Joint size",
      description: "When to tighten or widen joints from the usual 10 mm.",
      to: "/facing-bricks/joint-size",
    },
  ],
};

export const TOOLS_HUB: NavHub = {
  label: "Tools",
  navChildren: [
    {
      label: "Seamless brick textures",
      description: "Download seamless textures from real manufacturer bricks — any bond, mortar or joint.",
      to: "/tools/seamless-brick-textures",
    },
    {
      label: "Brick blending",
      description: "Combine bricks, lock proportions and check size compatibility.",
      to: "/tools/brick-blending",
    },
    {
      label: "Share your design",
      description: "Share a link and download a clear design specification.",
      to: "/tools/share-design",
    },
  ],
};

export const PRIMARY_HUBS = [EXPLORE_HUB, DESIGN_HUB, TOOLS_HUB] as const;

export const FOOTER_LINKS = [
  { label: "By colour", to: "/explore/colour" },
  { label: "Brick bonds", to: "/facing-bricks/bonds" },
  { label: "Seamless textures", to: "/tools/seamless-brick-textures" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
  { label: "Manufacturers", to: "/manufacturers" },
] as const;
