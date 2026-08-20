import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import conceptToRealityHero from "../../bloc-tec-site/public/images/conceptToRealityHero.webp";
import { COLOUR_GUIDES } from "./content/colourGuides";
import { FINISH_GUIDES } from "./content/finishGuides";
import { BondGuidePage, BondHubPage } from "./pages/BondGuidePage";
import { ColourGuidePage } from "./pages/ColourGuidePage";
import { FinishGuidePage } from "./pages/FinishGuidePage";
import { BrickBlendingPage } from "./pages/BrickBlendingPage";
import { ExploreGroupPage } from "./pages/HubPage";
import { SeamlessTexturesPage } from "./pages/SeamlessTexturesPage";
import { ShareDesignPage } from "./pages/ShareDesignPage";
import { ClayVsConcretePage } from "./pages/ClayVsConcretePage";
import { FormatGuidePage } from "./pages/FormatGuidePage";
import { MortarPage } from "./pages/MortarPage";
import { JointSizePage } from "./pages/JointSizePage";
import { FORMAT_GUIDES } from "./content/formatGuides";
import {
  COLOUR_ROUTES,
  COLOUR_SECTION,
  SIZE_ROUTES,
  SIZE_SECTION,
  TEXTURE_ROUTES,
  TEXTURE_SECTION,
} from "./content/exploreAppearance";
import { AppearanceCardMedia } from "./components/AppearanceCardMedia";
import { FOOTER_LINKS, PRIMARY_HUBS } from "./content/siteNav";
import './App.css'

const SEAMLESS_TEXTURES_APP_URL = "/app/facing-bricks?tab=texture&src=seamless-textures";
const BRICK_BLENDING_APP_URL = "/app/facing-bricks?tab=blend&src=brick-blending";

const BRICKTEXTURES_APP_URL = "/app/facing-bricks";
const BLOC_TEC_CONTACT_URL = "https://bloc-tec.com/for-manufacturers";
const GENERAL_CONTACT_EMAIL = "info@bloc-tec.com";
const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";
const HOME_COLOUR_ROUTES = COLOUR_ROUTES;
const CONTACT_REASONS = [
  "Feature request",
  "Existing feature improvement",
  "Feedback on Bricktextures tools",
  "Manufacturer enquiry",
  "Bug report",
  "Other",
] as const;

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 2.25L7.75 6L4 9.75"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const VISITOR_ROLES = [
  "Architect",
  "Game Developer",
  "3D Artist",
  "Interior Designer",
  "Manufacturer",
  "Brick Reseller / Merchant",
  "Other"
] as const;

function buildRoleOptions(): string[] {
  const otherOption = "Other";
  const baseRoles = VISITOR_ROLES.filter(role => role !== otherOption);
  const shuffled = [...baseRoles];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return [...shuffled, otherOption];
}

function getStoredRole() {
  if (typeof window === "undefined") {
    return { selectedRole: "", otherRole: "" };
  }

  const savedRole = localStorage.getItem(VISITOR_ROLE_STORAGE_KEY)?.trim() ?? "";
  if (!savedRole) {
    return { selectedRole: "", otherRole: "" };
  }

  if (VISITOR_ROLES.includes(savedRole as (typeof VISITOR_ROLES)[number])) {
    return { selectedRole: savedRole, otherRole: "" };
  }

  return { selectedRole: "Other", otherRole: savedRole };
}

function buildMailtoHref({
  name,
  email,
  role,
  reason,
  subject,
  message,
}: {
  name: string;
  email: string;
  role: string;
  reason: string;
  subject: string;
  message: string;
}) {
  const mailSubject = `Bricktextures enquiry: ${reason}${subject ? ` - ${subject}` : ""}`;
  const bodyLines = [
    "Bricktextures contact enquiry",
    "",
    `Name: ${name || "Not provided"}`,
    `Email: ${email}`,
    `Role: ${role}`,
    `Reason: ${reason}`,
    subject ? `Subject: ${subject}` : "",
    "",
    "Message:",
    message,
  ].filter(Boolean);

  return `mailto:${GENERAL_CONTACT_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}

function getContactMessagePlaceholder(reason: string) {
  switch (reason) {
    case "Feature request":
      return "Tell us what feature you would like to see and how it would help your work.";
    case "Existing feature improvement":
      return "Tell us which feature could be improved and what would make it work better for you.";
    case "Feedback on Bricktextures tools":
      return "Tell us which tool you used, what worked and what would improve your workflow.";
    case "Bug report":
      return "Describe the problem, what you were doing just before it happened, and what you expected to happen instead.";
    case "Manufacturer enquiry":
      return "Tell us about your brick range, catalogue requirements and what you would like to discuss.";
    case "Other":
      return "Tell us what you would like to contact us about.";
    default:
      return "Tell us how we can help.";
  }
}

function RouteTitleSync() {
  const location = useLocation();

  useEffect(() => {
    const pageMetaByPath: Record<string, { title: string; description: string }> = {
      "/": {
        title: "Find and Compare Facing Bricks | Bricktextures",
        description:
          "Explore and compare UK and Ireland facing bricks using consistent seamless textures, mortar colours and bond layouts.",
      },
      "/manufacturers": {
        title: "For Manufacturers | Bricktextures by BLOC-TEC",
        description:
          "Present a facing brick catalogue with consistent product textures, bond and mortar options, branded scenes and specification tools.",
      },
      "/contact": {
        title: "Contact | Bricktextures by BLOC-TEC",
        description:
          "Contact Bricktextures for help with brick selection tools, product data, technical issues or manufacturer catalogue deployments.",
      },
      "/faq": {
        title: "FAQ | Bricktextures by BLOC-TEC",
        description:
          "Read frequently asked questions about Bricktextures, brick comparison, seamless textures, blending and manufacturer catalogues.",
      },
    };

    for (const guide of COLOUR_GUIDES) {
      pageMetaByPath[`/facing-bricks/colour/${guide.slug}`] = {
        title: guide.metaTitle,
        description: guide.metaDescription,
      };
    }

    for (const guide of FINISH_GUIDES) {
      pageMetaByPath[`/facing-bricks/finish/${guide.slug}`] = {
        title: guide.metaTitle,
        description: guide.metaDescription,
      };
    }

    pageMetaByPath["/facing-bricks/bonds"] = {
      title: "Brick Bonds and Patterns for Facing Bricks | Bricktextures",
      description:
        "Why change from stretcher bond? Compare half-bond, Flemish, English, herringbone, stack and basketweave brick patterns for facing brickwork.",
    };

    pageMetaByPath["/tools/seamless-brick-textures"] = {
      title: "Seamless Brick Textures from Real Manufacturers | Bricktextures",
      description:
        "Download correctly scaled seamless brick textures from real UK and Ireland manufacturer facing bricks. Any bond, mortar and joint — so courses align with your building components in Revit, SketchUp, Enscape and V-Ray.",
    };

    pageMetaByPath["/tools/brick-blending"] = {
      title: "Brick Blending | Why and How to Mix Facing Bricks | Bricktextures",
      description:
        "Why architects blend facing bricks, how to give each colour a role, and how Bricktextures checks size and material compatibility for you.",
    };

    pageMetaByPath["/tools/share-design"] = {
      title: "Share Your Brick Design | Link and Specification | Bricktextures",
      description:
        "Share a Bricktextures design link with colleagues and clients, and download a clear design specification of the selected products and blend.",
    };

    pageMetaByPath["/facing-bricks/clay-vs-concrete"] = {
      title: "Clay Bricks vs Concrete Bricks | Bricktextures",
      description:
        "Compare clay and concrete facing bricks. Concrete can offer a lower-cost alternative; clay offers a wider range of traditional finishes, colours and textures.",
    };

    pageMetaByPath["/facing-bricks/mortar"] = {
      title: "Brick Mortar Colours | Bricktextures",
      description:
        "Natural and dyed mortar colours, how brick context changes mortar appearance, and contrast principles.",
    };

    pageMetaByPath["/facing-bricks/joint-size"] = {
      title: "Brick Joint Size | Bricktextures",
      description:
        "When to tighten or widen facing brick joints — thin and glued joints, wider traditional beds, and how that affects bond and appearance.",
    };

    for (const guide of FORMAT_GUIDES) {
      pageMetaByPath[`/facing-bricks/format/${guide.slug}`] = {
        title: guide.metaTitle,
        description: guide.metaDescription,
      };
    }

    pageMetaByPath["/explore/colour"] = {
      title: COLOUR_SECTION.metaTitle,
      description: COLOUR_SECTION.metaDescription,
    };
    pageMetaByPath["/explore/finish"] = {
      title: TEXTURE_SECTION.metaTitle,
      description: TEXTURE_SECTION.metaDescription,
    };
    pageMetaByPath["/explore/format"] = {
      title: SIZE_SECTION.metaTitle,
      description: SIZE_SECTION.metaDescription,
    };

    const pageMeta = pageMetaByPath[location.pathname];
    const knownPath = Boolean(pageMeta);
    const resolvedMeta = pageMeta ?? {
      title: "Page not found | Bricktextures",
      description: "This page is not available on Bricktextures.",
    };
    const canonicalUrl = knownPath
      ? `https://bricktextures.com${location.pathname === "/" ? "/" : location.pathname}`
      : "https://bricktextures.com/";

    document.title = resolvedMeta.title;

    const setMetaTag = (selector: string, content: string, attributeName: "name" | "property", attributeValue: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute("content", content);
        return;
      }

      const meta = document.createElement("meta");
      meta.setAttribute(attributeName, attributeValue);
      meta.setAttribute("content", content);
      document.head.appendChild(meta);
    };

    setMetaTag('meta[name="description"]', resolvedMeta.description, "name", "description");
    setMetaTag('meta[name="robots"]', knownPath ? "index, follow" : "noindex, follow", "name", "robots");
    setMetaTag('meta[property="og:title"]', resolvedMeta.title, "property", "og:title");
    setMetaTag('meta[property="og:description"]', resolvedMeta.description, "property", "og:description");
    setMetaTag('meta[property="og:url"]', canonicalUrl, "property", "og:url");
    setMetaTag('meta[property="og:image"]', new URL(conceptToRealityHero, window.location.origin).href, "property", "og:image");
    setMetaTag('meta[name="twitter:title"]', resolvedMeta.title, "name", "twitter:title");
    setMetaTag('meta[name="twitter:description"]', resolvedMeta.description, "name", "twitter:description");
    setMetaTag('meta[name="twitter:image"]', new URL(conceptToRealityHero, window.location.origin).href, "name", "twitter:image");

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", canonicalUrl);
    }

    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return null;
}

function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <Link className="brand" to="/">
          Bricktextures
          <span>by BLOC-TEC</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          {PRIMARY_HUBS.map(hub => (
            <div key={hub.label} className="nav-hub">
              <span className="nav-hub-label">{hub.label}</span>
              <div className="nav-hub-menu" role="group" aria-label={`${hub.label} pages`}>
                {hub.navChildren.map(item => (
                  <Link key={item.to} to={item.to}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <a className="nav-cta" href={BRICKTEXTURES_APP_URL}>
            Explore bricks
          </a>
        </nav>
      </div>
    </header>
  );
}

function HomePage() {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [pendingCategoryUrl, setPendingCategoryUrl] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [roleOptions, setRoleOptions] = useState<string[]>(buildRoleOptions());

  const launchCategory = (url: string) => {
    window.location.assign(url);
  };

  const onCategoryClick = (event: MouseEvent<HTMLAnchorElement>, url: string) => {
    event.preventDefault();

    const savedRole = localStorage.getItem(VISITOR_ROLE_STORAGE_KEY);
    if (savedRole) {
      launchCategory(url);
      return;
    }

    setPendingCategoryUrl(url);
    setRoleOptions(buildRoleOptions());
    setIsRoleModalOpen(true);
  };

  const onContinue = () => {
    const roleValue = selectedRole === "Other" ? otherRole.trim() : selectedRole;
    if (!roleValue) return;

    localStorage.setItem(VISITOR_ROLE_STORAGE_KEY, roleValue);
    setIsRoleModalOpen(false);
    setSelectedRole("");
    setOtherRole("");

    if (pendingCategoryUrl) {
      launchCategory(pendingCategoryUrl);
      setPendingCategoryUrl("");
    }
  };

  const onCloseRoleModal = () => {
    setIsRoleModalOpen(false);
    setPendingCategoryUrl("");
    setSelectedRole("");
    setOtherRole("");
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-center">
          <p className="eyebrow">Facing brick selection for architects</p>
          <h1>Find the right brick.</h1>
          <p className="lead">
            Compare facing bricks from UK and Ireland manufacturers at a consistent scale, with
            mortar colours and bond layouts you can adjust before specifying.
          </p>
          <div className="hero-cta-wrap">
            <a
              className="hero-cta"
              href={BRICKTEXTURES_APP_URL}
              onClick={event => onCategoryClick(event, BRICKTEXTURES_APP_URL)}
            >
              <span>Explore bricks</span>
              <ChevronIcon className="hero-cta-arrow" />
            </a>
          </div>
          <p className="hero-subline">
            Free for architects, designers, builders and homeowners.
          </p>
        </div>
      </section>

      <section id="colour" className="section section-alt appearance-section">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">{COLOUR_SECTION.eyebrow}</p>
            <h2>{COLOUR_SECTION.title}</h2>
            <p>{COLOUR_SECTION.description}</p>
          </div>
          <div className="appearance-grid">
            {HOME_COLOUR_ROUTES.map(route => (
              <Link
                className={`appearance-card${route.tone === "blend" ? " appearance-card-blend" : ""}`}
                to={route.to}
                key={route.label}
              >
                <span className={`appearance-swatch appearance-swatch-${route.tone}`} aria-hidden="true" />
                <span className="appearance-card-copy">
                  <strong>{route.label}</strong>
                  <span>{route.description}</span>
                </span>
                <ChevronIcon className="appearance-card-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="finish" className="section appearance-section">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">{TEXTURE_SECTION.eyebrow}</p>
            <h2>{TEXTURE_SECTION.title}</h2>
            <p>{TEXTURE_SECTION.description}</p>
          </div>
          <div className="appearance-grid">
            {TEXTURE_ROUTES.map(route => (
              <Link
                className="appearance-card"
                to={route.to}
                key={route.label}
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
        </div>
      </section>

      <section id="format" className="section section-alt appearance-section">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">{SIZE_SECTION.eyebrow}</p>
            <h2>{SIZE_SECTION.title}</h2>
            <p>{SIZE_SECTION.description}</p>
          </div>
          <div className="appearance-grid appearance-grid-size">
            {SIZE_ROUTES.map(route => (
              <Link
                className={`appearance-card${route.span === 2 ? " appearance-card-span-2" : ""}`}
                to={route.to}
                key={route.label}
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
        </div>
      </section>

      <section id="why-bricktextures" className="section why-bricktextures-section">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">Why Bricktextures</p>
            <h2>Compare bricks more fairly</h2>
            <p>
              Compare colour, texture, size and manufacturing character without moving between
              catalogues. Consistent scale and presentation make meaningful differences easier to read.
            </p>
          </div>

          <div className="why-bricktextures-grid">
            <article>
              <p className="eyebrow">Explore</p>
              <h3>Get the look you have in mind</h3>
              <p>
                Begin with colour, texture or size, then review suitable facing bricks across
                manufacturers in one catalogue.
              </p>
            </article>
            <article>
              <p className="eyebrow">Compare</p>
              <h3>Compare like with like</h3>
              <p>
                Review brick colour, surface variation and proportions at a consistent scale and
                presentation, with the same mortar and bond where required.
              </p>
            </article>
            <article>
              <p className="eyebrow">Refine</p>
              <h3>Filter until you find it</h3>
              <p>
                Use colour, texture, size and manufacturer filters to narrow the catalogue to the
                bricks that fit your project, then open products to check them in detail.
              </p>
            </article>
          </div>

          <div className="why-bricktextures-develop">
            <div className="homepage-section-heading">
              <p className="eyebrow">Develop the appearance</p>
              <h2>Refine mortar, bond, blend and texture</h2>
            </div>
            <div className="why-bricktextures-grid">
              <article>
                <p className="eyebrow">Visualise</p>
                <h3>See mortar and bond change the result</h3>
                <p>
                  Mortar colour and brick bond can change a façade as much as the brick itself. Try
                  those choices in real scenes while you compare products.{" "}
                  <Link to="/facing-bricks/mortar">Mortar colour</Link>
                  {" · "}
                  <Link to="/facing-bricks/joint-size">Joint size</Link>
                </p>
              </article>
              <article>
                <p className="eyebrow">Blending</p>
                <h3>Combine bricks into the mix you need</h3>
                <p>
                  Blend up to five products and lock proportions. The tool blocks incompatible sizes
                  and clay–concrete mixes, so you can focus on colour and appearance.{" "}
                  <Link to="/tools/brick-blending">How brick blending works</Link>
                </p>
              </article>
              <article>
                <p className="eyebrow">Textures</p>
                <h3>Take the brick into your own visuals</h3>
                <p>
                  Download a seamless texture derived from the selected product, set to a known
                  physical size and ready for your visualisation software.{" "}
                  <Link to="/tools/seamless-brick-textures">How seamless textures work</Link>
                </p>
              </article>
            </div>
          </div>

          <div className="why-bricktextures-cta">
            <a
              className="btn btn-primary"
              href={BRICKTEXTURES_APP_URL}
              onClick={event => onCategoryClick(event, BRICKTEXTURES_APP_URL)}
            >
              Explore bricks
            </a>
          </div>
        </div>
      </section>

      {isRoleModalOpen ? (
        <div className="modal-overlay" role="presentation" onClick={onCloseRoleModal}>
          <div className="role-modal card" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <h2>Tell us about your work</h2>
            <p>Who are you?</p>
            <div className="role-options">
              {roleOptions.map(role => (
                <label key={role} className="role-option">
                  <input
                    type="radio"
                    name="visitorRole"
                    value={role}
                    checked={selectedRole === role}
                    onChange={e => setSelectedRole(e.target.value)}
                  />
                  <span>{role}</span>
                </label>
              ))}
            </div>

            {selectedRole === "Other" ? (
              <label className="other-role-input">
                Please tell us your role
                <input
                  value={otherRole}
                  onChange={e => setOtherRole(e.target.value)}
                  placeholder="Your role"
                />
              </label>
            ) : null}

            <div className="actions">
              <button className="btn btn-secondary" type="button" onClick={onCloseRoleModal}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                type="button"
                disabled={!selectedRole || (selectedRole === "Other" && !otherRole.trim())}
                onClick={onContinue}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function FaqPage() {
  return (
    <section className="section">
      <div className="container page-header">
        <p className="eyebrow">FAQ</p>
        <h1>Frequently asked questions</h1>
      </div>

      <div className="container grid">
        <article className="card">
          <h2>What is Bricktextures, and who is it for?</h2>
          <p>
            Bricktextures is a professional brick selection and visualisation tool for architects,
            designers and others working with facing brick. It brings manufacturer products into one
            searchable catalogue, with consistent textures, mortar and bond controls, blending tools
            and texture exports. Manufacturers can also use the same capabilities for their own ranges.
          </p>
        </article>
        <article className="card">
          <h2>Can manufacturers have a private version on their own website?</h2>
          <p>
            Yes. A manufacturer can deploy a dedicated BLOC-TEC brick selector on its own website,
            limited to its brick catalogue and configured for its brand and specification workflow.
            <br />
            See{" "}
            <a className="inline-link" href="https://bloc-tec.com/for-manufacturers" target="_blank" rel="noreferrer">
              bloc-tec.com/for-manufacturers
            </a>{" "}
            for details.
          </p>
        </article>
        <article className="card">
          <h2>Can I buy products directly from Bricktextures?</h2>
          <p>
            No. Bricktextures supports product discovery, comparison and early specification; it
            does not sell bricks or manage ordering.
          </p>
        </article>
        <article className="card">
          <h2>Can I download seamless brick textures?</h2>
          <p>
            Yes. Build a seamless texture from a manufacturer brick, setting its physical size,
            bond, mortar colour and any blend, then export it for design and visualisation software.{" "}
            <Link className="inline-link" to="/tools/seamless-brick-textures">
              Read about seamless brick textures
            </Link>{" "}
            or{" "}
            <a className="inline-link" href={SEAMLESS_TEXTURES_APP_URL}>
              open the texture tool
            </a>
            .
          </p>
        </article>
        <article className="card">
          <h2>Can I blend bricks from different manufacturers?</h2>
          <p>
            Yes. The Bricktextures blender can mix products across manufacturers and lock
            proportions. It warns about limited compatibility and blocks impractical mixes such as
            clay with concrete or mismatched sizes — so you do not have to check those constraints
            by hand.{" "}
            <Link className="inline-link" to="/tools/brick-blending">
              Learn about brick blending
            </Link>{" "}
            or{" "}
            <a className="inline-link" href={BRICK_BLENDING_APP_URL}>
              open the blend tool
            </a>
            .
          </p>
        </article>

        <article className="card">
          <h2>What is the difference between clay and concrete facing bricks?</h2>
          <p>
            Concrete facing bricks can offer a lower-cost alternative, while clay bricks offer a
            wider range of traditional finishes, colours and textures. Concrete also tends to hold
            tighter size tolerances — useful for bonds that need precise alignment — while clay
            usually ages better outdoors.{" "}
            <Link className="inline-link" to="/facing-bricks/clay-vs-concrete">
              Compare clay and concrete bricks
            </Link>
            .
          </p>
        </article>

        <article className="card">
          <h2>What brick sizes can I explore?</h2>
          <p>
            Bricktextures groups facing bricks as standard (215 × 65 mm), imperial (taller
            traditional sizes) and linear (long sizes that emphasise the horizontal).{" "}
            <Link className="inline-link" to="/facing-bricks/format/standard">
              Standard
            </Link>
            ,{" "}
            <Link className="inline-link" to="/facing-bricks/format/imperial">
              imperial
            </Link>{" "}
            and{" "}
            <Link className="inline-link" to="/facing-bricks/format/linear">
              linear
            </Link>{" "}
            guides explain when each size helps.
          </p>
        </article>

        <article className="card">
          <h2>How do mortar colour and joint size affect the look?</h2>
          <p>
            Mortar colour — often natural greys, yellows and buffs from local sand — and joint width
            (typically around 10 mm) change how a brick wall reads as much as the brick itself.{" "}
            <Link className="inline-link" to="/facing-bricks/mortar">
              Read about mortar colour
            </Link>{" "}
            and{" "}
            <Link className="inline-link" to="/facing-bricks/joint-size">
              joint size
            </Link>
            .
          </p>
        </article>

        <article className="card">
          <h2>Can I share a design or download a specification?</h2>
          <p>
            Yes. Share a link that opens the selected brickwork design, or download a specification
            recording the selected products and blend proportions.{" "}
            <Link className="inline-link" to="/tools/share-design">
              Learn about sharing and specifications
            </Link>
            .
          </p>
        </article>
      </div>
    </section>
  );
}

function ContactPage() {
  const storedRole = getStoredRole();
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState(storedRole.selectedRole === "Other" ? storedRole.otherRole : "");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const roleValue = selectedRole === "Other" ? otherRole.trim() : selectedRole;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!roleValue || !email.trim() || !message.trim()) {
      setError("Please tell us who you are, how to contact you, and what you need.");
      return;
    }

    if (!reason) {
      setError("Please select a reason for contacting us.");
      return;
    }

    localStorage.setItem(VISITOR_ROLE_STORAGE_KEY, roleValue);
    setError("");
    window.location.href = buildMailtoHref({
      name: "",
      email: email.trim(),
      role: roleValue,
      reason,
      subject: subject.trim(),
      message: message.trim(),
    });
  };

  return (
    <>
      <section className="section">
        <div className="container page-header">
          <p className="eyebrow">Contact</p>
          <h1>Tell us who you are and how we can help.</h1>
          <p className="lead contact-lead">
            Contact the Bricktextures team for help with brick selection, product information,
            technical issues or manufacturer catalogue services. We also welcome concise feedback
            from people using the tools on live projects.
          </p>
        </div>

        <div className="container grid two">
          <article className="card manufacturer-value-card">
            <h2>Project and product support</h2>
            <p className="contact-supporting-copy">
              If your enquiry concerns a project, include the products, bond, mortar, blend or export
              involved. For catalogue enquiries, tell us which range and product data need attention.
            </p>
            <p className="contact-supporting-copy">
              That context helps us address the immediate question. Suggestions based on specification
              and visualisation work also help us prioritise improvements to Bricktextures.
            </p>
          </article>

          <article className="card manufacturer-value-card">
            <h2>What to contact us about</h2>
            <ul className="benefit-list">
              <li>Product data, imagery or catalogue corrections</li>
              <li>Brick comparison, blending or texture export questions</li>
              <li>Manufacturer participation and dedicated catalogue deployments</li>
              <li>Technical faults or unexpected results</li>
              <li>Feature requests grounded in a design or specification workflow</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <article className="card manufacturer-value-card">
            <h2>How can we help?</h2>
            <p className="manufacturer-note">
              Use the form to contact us at{" "}
              <a className="inline-link" href={`mailto:${GENERAL_CONTACT_EMAIL}`}>{GENERAL_CONTACT_EMAIL}</a>{" "}
              about Bricktextures, a product listing or a manufacturer service.
            </p>
            <form className="contact-form" onSubmit={onSubmit}>
              <label>
                Who are you?
                <select value={selectedRole} onChange={event => setSelectedRole(event.target.value)}>
                  <option value="">Select your role</option>
                  {VISITOR_ROLES.map(role => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>

              {selectedRole === "Other" ? (
                <label>
                  Please tell us your role
                  <input
                    value={otherRole}
                    onChange={event => setOtherRole(event.target.value)}
                    placeholder="Your role"
                  />
                </label>
              ) : null}

              <label>
                Your email
                <input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Why are you contacting us?
                <select value={reason} onChange={event => setReason(event.target.value)}>
                  <option value="">Select a reason</option>
                  {CONTACT_REASONS.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              {reason === "Bug report" ? (
                <p className="contact-supporting-copy">
                  If you are reporting a problem, it helps to include the product, page, device, and
                  what happened just before the issue appeared.
                </p>
              ) : null}

              <label>
                Subject
                <input
                  value={subject}
                  onChange={event => setSubject(event.target.value)}
                  placeholder="Short summary"
                />
              </label>

              <label>
                Message
                <textarea
                  rows={7}
                  value={message}
                  onChange={event => setMessage(event.target.value)}
                  placeholder={getContactMessagePlaceholder(reason)}
                />
              </label>

              {error ? <p className="form-error">{error}</p> : null}

              <div className="actions">
                <button className="btn btn-primary" type="submit">
                  Draft email to BLOC-TEC
                </button>
              </div>
            </form>
          </article>
        </div>
      </section>
    </>
  );
}

function ManufacturersPage() {
  return (
    <>
      <section className="section">
        <div className="container page-header">
          <p className="eyebrow">Manufacturers</p>
          <h1>Present your brick range for specification.</h1>
        </div>

        <div className="container manufacturer-value-stack">
          <article className="card manufacturer-value-card">
            <h2>Bring your products to Bricktextures</h2>
            <p>
              Give architects a consistent way to review your range by colour, texture and size,
              then test products with relevant bonds, mortar colours, blends and project scenes.
            </p>
            <ul className="benefit-list">
              <li>Consistent textures and catalogue information across the range</li>
              <li>Brick-specific bond, mortar and blending controls</li>
              <li>Shareable selections and specification outputs</li>
            </ul>
          </article>

          <article className="card manufacturer-value-card">
            <h2>Dedicated website deployment</h2>
            <p>
              Run a dedicated BLOC-TEC brick selector on your own website, shaped around your own
              brick catalogue, brand, specification options and scenes suited to your target sectors.
            </p>
            <ul className="benefit-list">
              <li>Integrated with your website and domain</li>
              <li>Your brick catalogue only, with no competitor products shown</li>
              <li>Modules selected for your range and customer workflow</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <article className="card">
            <h2>Learn more about our manufacturer service</h2>
            <p>
              For more information on how we work with manufacturers, visit the main BLOC-TEC website,
              including catalogue preparation, brick visualisation and dedicated website deployments.
            </p>
            <div className="actions">
              <a className="btn btn-primary" href={BLOC_TEC_CONTACT_URL} target="_blank" rel="noreferrer">
                Visit the BLOC-TEC manufacturers page
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="section">
      <div className="container page-header">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="lead">This page is not available. Try the links below or return home.</p>
        <div className="material-cta-actions">
          <Link className="btn btn-primary" to="/">
            Back to home
          </Link>
          <Link className="btn btn-secondary" to="/explore/colour">
            Explore by colour
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <nav className="footer-nav" aria-label="Footer">
          {FOOTER_LINKS.map(item => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <p className="footer-company-meta">
          © {currentYear} Paver Picker Ltd trading as BLOC-TEC | Registered in Ireland | Company No. 604066
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="site-shell">
        <RouteTitleSync />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore/:group" element={<ExploreGroupPage />} />
            <Route path="/facing-bricks/clay-vs-concrete" element={<ClayVsConcretePage />} />
            <Route path="/facing-bricks/mortar" element={<MortarPage />} />
            <Route path="/facing-bricks/joint-size" element={<JointSizePage />} />
            <Route path="/facing-bricks/format/:slug" element={<FormatGuidePage />} />
            <Route path="/facing-bricks/colour/:slug" element={<ColourGuidePage />} />
            <Route path="/facing-bricks/finish/:slug" element={<FinishGuidePage />} />
            <Route path="/facing-bricks/bonds" element={<BondHubPage />} />
            <Route path="/facing-bricks/bonds/:slug" element={<BondGuidePage />} />
            <Route path="/tools/seamless-brick-textures" element={<SeamlessTexturesPage />} />
            <Route path="/tools/brick-blending" element={<BrickBlendingPage />} />
            <Route path="/tools/share-design" element={<ShareDesignPage />} />
            <Route path="/manufacturers" element={<ManufacturersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
