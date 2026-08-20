import { Link, Navigate, useParams } from "react-router-dom";
import type { AppearanceRoute } from "../content/exploreAppearance";
import {
  COLOUR_ROUTES,
  COLOUR_SECTION,
  SIZE_ROUTES,
  SIZE_SECTION,
  TEXTURE_ROUTES,
  TEXTURE_SECTION,
} from "../content/exploreAppearance";
import { AppearanceCardMedia } from "../components/AppearanceCardMedia";

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d="M7.5 4.5 13 10l-5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AppearanceLinkGrid({
  routes,
  gridClassName,
}: {
  routes: AppearanceRoute[];
  gridClassName?: string;
}) {
  return (
    <div className={["appearance-grid", gridClassName].filter(Boolean).join(" ")}>
      {routes.map(route => (
        <Link
          key={route.to}
          className={[
            "appearance-card",
            route.tone === "blend" ? "appearance-card-blend" : "",
            route.span === 2 ? "appearance-card-span-2" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          to={route.to}
        >
          <AppearanceCardMedia tone={route.tone} image={route.image} />
          <span className="appearance-card-copy">
            <strong>{route.label}</strong>
            <span>{route.description}</span>
          </span>
          <ChevronIcon className="appearance-card-arrow" />
        </Link>
      ))}
    </div>
  );
}

const EXPLORE_GROUPS = {
  colour: {
    label: "Colour",
    ...COLOUR_SECTION,
    routes: COLOUR_ROUTES as AppearanceRoute[],
  },
  finish: {
    label: "Texture",
    ...TEXTURE_SECTION,
    routes: TEXTURE_ROUTES as AppearanceRoute[],
  },
  format: {
    label: "Size",
    ...SIZE_SECTION,
    routes: SIZE_ROUTES as AppearanceRoute[],
  },
} as const;

type ExploreGroupKey = keyof typeof EXPLORE_GROUPS;

export function ExploreGroupPage() {
  const { group = "" } = useParams();

  if (group === "material") {
    return <Navigate to="/facing-bricks/clay-vs-concrete" replace />;
  }

  const config = EXPLORE_GROUPS[group as ExploreGroupKey];

  if (!config) {
    return <Navigate to="/explore/colour" replace />;
  }

  const pageUrl = `https://bricktextures.com/explore/${group}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: config.metaTitle,
        description: config.metaDescription,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://bricktextures.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: config.label,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="section colour-guide-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{config.label}</span>
          </nav>

          <p className="eyebrow">{config.label}</p>
          <h1>{config.title}</h1>
          <p className="lead contact-lead">{config.description}</p>
        </div>
      </section>

      <section className="section section-alt appearance-section">
        <div className="container">
          <AppearanceLinkGrid
            routes={[...config.routes]}
            gridClassName={group === "format" ? "appearance-grid-size" : undefined}
          />
        </div>
      </section>
    </>
  );
}
