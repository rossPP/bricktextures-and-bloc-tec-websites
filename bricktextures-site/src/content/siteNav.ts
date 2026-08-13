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
      description: "Classic, modern and traditional bond groups.",
      to: "/facing-bricks/bonds",
    },
    {
      label: "Mortar colour",
      description: "Natural mortar colours and pairings by brick colour.",
      to: "/facing-bricks/mortar",
    },
    {
      label: "Joint size",
      description: "10 mm joints, tight joints and wider traditional beds.",
      to: "/facing-bricks/joint-size",
    },
  ],
};

export const TOOLS_HUB: NavHub = {
  label: "Tools",
  navChildren: [
    {
      label: "Seamless brick textures",
      description: "Set brick, bond, mortar and physical size, then export a seamless texture.",
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
