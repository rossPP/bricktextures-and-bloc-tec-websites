import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  GuideImagePlaceholderGrid,
} from "../components/GuideImagePlaceholder";
import tileCloseDetail from "../assets/seamless-textures/blend-900mm-close-detail.webp";
import tileLargeArea from "../assets/seamless-textures/blend-3600mm-large-area.webp";
import lightMortarStretcher from "../assets/seamless-textures/engels-oranjerood-light-mortar-stretcher.webp";
import darkMortarStretcher from "../assets/seamless-textures/engels-oranjerood-dark-mortar-stretcher.webp";
import lightMortarStack from "../assets/seamless-textures/engels-oranjerood-light-mortar-stack.webp";
import lightMortarBasketweave from "../assets/seamless-textures/engels-oranjerood-light-mortar-basketweave.webp";
import blendWarmRedOrange from "../assets/seamless-textures/blend-warm-red-orange.webp";
import blendRedWithDarkAccents from "../assets/seamless-textures/blend-red-with-dark-accents.webp";

const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";
const TEXTURE_APP_URL = "/app/facing-bricks";

const MANUFACTURERS = [
  { label: "Ibstock", filter: "Ibstock" },
  { label: "Wienerberger", filter: "Wienerberger" },
  { label: "Forterra", filter: "Forterra" },
  { label: "Kingscourt", filter: "Kingscourt" },
  { label: "Vandersanden", filter: "Vandersanden" },
  { label: "Marshalls", filter: "Marshalls" },
  { label: "AG (Acheson & Glover)", filter: "AG" },
  { label: "Tobermore", filter: "Tobermore" },
  { label: "Precon", filter: "Precon" },
] as const;

const VISITOR_ROLES = [
  "Architect",
  "Game Developer",
  "3D Artist",
  "Interior Designer",
  "Manufacturer",
  "Brick Reseller / Merchant",
  "Other",
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

export function SeamlessTexturesPage() {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [pendingCategoryUrl, setPendingCategoryUrl] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [roleOptions, setRoleOptions] = useState<string[]>(buildRoleOptions());

  const launchCategory = (url: string) => {
    window.location.assign(url);
  };

  const onExploreClick = (event: MouseEvent<HTMLAnchorElement>, url: string) => {
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

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://bricktextures.com/tools/seamless-brick-textures#webpage",
        url: "https://bricktextures.com/tools/seamless-brick-textures",
        name: "Seamless Brick Textures from Real Manufacturers | Bricktextures",
        description:
          "Download correctly scaled seamless brick textures from real UK and Ireland manufacturer facing bricks. Any bond, mortar and joint size — aligned to brick courses for Revit, SketchUp, Enscape and V-Ray.",
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
            name: "Seamless brick textures",
            item: "https://bricktextures.com/tools/seamless-brick-textures",
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

      <section className="section colour-guide-hero seamless-textures-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Seamless brick textures</span>
          </nav>

          <p className="eyebrow">Seamless brick textures</p>
          <h1>Seamless brick textures from real manufacturer products</h1>
          <p className="lead contact-lead">
            Not stock patterns — photographed facing bricks from real UK and Ireland manufacturers.
            Choose bond and mortar, then download a seamless texture for your visualisation work.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={TEXTURE_APP_URL}
              onClick={event => onExploreClick(event, TEXTURE_APP_URL)}
            >
              Open the texture tool
            </a>
            <Link className="btn btn-secondary" to="/#why-bricktextures">
              Why Bricktextures
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Full control</p>
          <h2>Change the joint, layout or blend</h2>

          <div className="texture-control-group">
            <h3>Change the joint</h3>
            <p>
              Use a contrasting mortar to outline each brick, or a closer tone so the wall reads as
              one colour.{" "}
              <Link to="/facing-bricks/mortar">Mortar colour</Link>.
            </p>
            <GuideImagePlaceholderGrid
              ratio="natural"
              items={[
                {
                  label: "Engels Oranjerood with light mortar",
                  caption: "Light joint colour against the brick.",
                  src: lightMortarStretcher,
                },
                {
                  label: "Engels Oranjerood with dark mortar",
                  caption: "Darker joint colour on the same brick.",
                  src: darkMortarStretcher,
                },
              ]}
            />
          </div>

          <div className="texture-control-group">
            <h3>Change the layout</h3>
            <p>
              Keep the brick and change the{" "}
              <Link to="/facing-bricks/bonds">bond</Link> — stretcher, stack, basketweave and more —
              so the texture follows the pattern on the elevation.
            </p>
            <GuideImagePlaceholderGrid
              ratio="natural"
              items={[
                {
                  label: "Engels Oranjerood in basketweave bond",
                  caption: "Basketweave layout.",
                  src: lightMortarBasketweave,
                },
                {
                  label: "Engels Oranjerood in stack bond",
                  caption: "Stack bond layout.",
                  src: lightMortarStack,
                },
              ]}
            />
          </div>

          <div className="texture-control-group">
            <h3>Change the blend</h3>
            <p>
              Mix two or more products when one brick is not enough, then download the mix as one
              seamless texture.{" "}
              <Link to="/tools/brick-blending">Brick blending</Link>.
            </p>
            <GuideImagePlaceholderGrid
              ratio="natural"
              items={[
                {
                  label: "Warm red and orange brick blend",
                  caption: "Related reds and oranges mixed across the wall.",
                  src: blendWarmRedOrange,
                },
                {
                  label: "Red brick blend with dark accents",
                  caption: "Stronger contrast with darker accent bricks in the mix.",
                  src: blendRedWithDarkAccents,
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Tile size</p>
          <h2>Avoid repetition — set the physical area yourself</h2>
          <p>
            You choose how much wall each seamless texture covers. A larger physical area shows more
            unique bricks before the pattern repeats — important on long façades. Always map the
            download at its stated real-world size so the brick module stays correct.
          </p>
          <p>
            Both examples below are the same pixel size. One covers 900 × 900&nbsp;mm for close
            detail — interiors and smaller projects. The other covers 3600 × 3600&nbsp;mm for a big
            façade, with less obvious repetition.
          </p>
          <GuideImagePlaceholderGrid
            ratio="natural"
            items={[
              {
                label: "Seamless brick texture covering 900 × 900 mm",
                caption: "Same pixel size — 900 × 900 mm for close detail, interiors and small projects.",
                src: tileCloseDetail,
              },
              {
                label: "Seamless brick texture covering 3600 × 3600 mm",
                caption: "Same pixel size — 3600 × 3600 mm for large façades, with more unique bricks before repeat.",
                src: tileLargeArea,
              },
            ]}
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-closing">
          <p className="eyebrow">Start in Bricktextures</p>
          <h2>Download a real brick texture</h2>
          <p>
            Open a manufacturer range, pick a product, set mortar, bond and tile size, then download
            for your visualisation software.
          </p>
          <ul className="material-manufacturer-list">
            {MANUFACTURERS.map(mfr => (
              <li key={mfr.filter}>
                <a href={TEXTURE_APP_URL} onClick={event => onExploreClick(event, TEXTURE_APP_URL)}>
                  {mfr.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={TEXTURE_APP_URL}
              onClick={event => onExploreClick(event, TEXTURE_APP_URL)}
            >
              Create a seamless brick texture
            </a>
          </div>
        </div>
      </section>

      {isRoleModalOpen ? (
        <div className="role-modal-backdrop" onClick={onCloseRoleModal}>
          <div className="role-modal card" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <h2>Help us improve your experience</h2>
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
