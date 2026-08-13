import { MouseEvent, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { GuideImagePlaceholder, GuideImagePlaceholderGrid } from "../components/GuideImagePlaceholder";
import { COLOUR_GUIDES, getColourGuide } from "../content/colourGuides";
import { MORTAR_COLOUR_BY_BRICK } from "../content/mortarColourByBrick";

const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";
const BLEND_PAGE_URL = "/tools/brick-blending";

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

export function ColourGuidePage() {
  const { slug = "" } = useParams();
  const guide = getColourGuide(slug);

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [pendingCategoryUrl, setPendingCategoryUrl] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [roleOptions, setRoleOptions] = useState<string[]>(buildRoleOptions());

  if (!guide) {
    return <Navigate to="/" replace />;
  }

  const seoNoun = guide.textureSeoNoun;
  const mortarColourAdvice =
    guide.slug === "red-and-orange"
      ? MORTAR_COLOUR_BY_BRICK.find(item => item.slug === guide.slug)
      : undefined;

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
        "@id": `https://bricktextures.com/facing-bricks/colour/${guide.slug}#webpage`,
        url: `https://bricktextures.com/facing-bricks/colour/${guide.slug}`,
        name: guide.metaTitle,
        description: guide.metaDescription,
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
            name: "Colour",
            item: "https://bricktextures.com/explore/colour",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.shortLabel,
            item: `https://bricktextures.com/facing-bricks/colour/${guide.slug}`,
          },
        ],
      },
    ],
  };

  const otherGuides = COLOUR_GUIDES.filter(item => item.slug !== guide.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className={`section colour-guide-hero colour-guide-hero-${guide.tone}`}>
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/explore/colour">Colour</Link>
            <span aria-hidden="true">/</span>
            <span>{guide.shortLabel}</span>
          </nav>

          <p className="eyebrow">Facing bricks by colour</p>
          <h1>{guide.h1}</h1>
          <p className="lead contact-lead">{guide.traditionalUse.summary}</p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={guide.appFilterUrl}
              onClick={event => onExploreClick(event, guide.appFilterUrl)}
            >
              Explore {guide.shortLabel.toLowerCase()} bricks
            </a>
          </div>

          <nav className="guide-section-nav" aria-label="On this page">
            <p className="eyebrow">On this page</p>
            <ul>
              <li>
                <a href="#complementary-colours">Complementary colours</a>
              </li>
              <li>
                <a href="#complementary-lighting">Complementary lighting</a>
              </li>
              {mortarColourAdvice ? (
                <li>
                  <a href="#mortar-colours">Mortar colours</a>
                </li>
              ) : null}
              <li>
                <a href="#download-textures">Download a seamless {seoNoun} texture</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <section id="complementary-colours" className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Colour design</p>
          <h2>Complementary colours</h2>
          <p>{guide.designingWith.summary}</p>

          <ol className="colour-design-process">
            <li>
              <strong>Consider the building’s surroundings.</strong>{" "}
              {guide.designingWith.surroundings}
            </li>
            <li>
              <strong>Consider how colour affects our emotions.</strong>{" "}
              {guide.designingWith.emotions}
              <div className="colour-pairing-grid">
                {guide.designingWith.complementary.items.map(item => (
                  <article className="colour-idea-block" key={item.name}>
                    <span
                      className="colour-pairing-swatch"
                      style={{ background: item.swatch }}
                      aria-hidden="true"
                    />
                    <h3>{item.name}</h3>
                  </article>
                ))}
              </div>
            </li>
            <li>
              <strong>Introduce complementary colours.</strong>
              <div className="colour-idea-list">
                {guide.designingWith.complementary.items.map(item => (
                  <article className="colour-example-block" key={item.name}>
                    <GuideImagePlaceholder
                      label={item.exampleImage.label}
                      caption={item.exampleImage.caption}
                      src={item.exampleImage.src}
                    />
                  </article>
                ))}
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section id="complementary-lighting" className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Lighting design</p>
          <h2>Complementary lighting</h2>
          <p>{guide.designingWith.lighting.summary}</p>
          {guide.designingWith.lighting.howWeFeel ? (
            <p>{guide.designingWith.lighting.howWeFeel}</p>
          ) : null}
          {guide.designingWith.lighting.images?.length ? (
            <div className="colour-idea-list">
              {guide.designingWith.lighting.images.map(item => (
                <article className="colour-example-block" key={item.label}>
                  <GuideImagePlaceholder
                    label={item.label}
                    caption={item.caption}
                    src={item.src}
                  />
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {mortarColourAdvice ? (
        <section id="mortar-colours" className="section section-alt">
          <div className="container colour-guide-content">
            <p className="eyebrow">Brickwork detail</p>
            <h2>Mortar colours</h2>
            {mortarColourAdvice.introduction ? <p>{mortarColourAdvice.introduction}</p> : null}
            <div className="mortar-colour-comparison-grid">
              {mortarColourAdvice.items.map(item => (
                <article key={item.name}>
                  <h3>{item.name}</h3>
                  <div className="mortar-colour-image-pair">
                    <GuideImagePlaceholder
                      label={item.imageLabel}
                      src={item.src}
                      ratio="square"
                    />
                    {item.areaSrc ? (
                      <GuideImagePlaceholder
                        label={item.areaImageLabel ?? `${item.name} across a larger brick area`}
                        src={item.areaSrc}
                        ratio="square"
                      />
                    ) : null}
                  </div>
                  <p className="mortar-colour-comparison-note">{item.note}</p>
                </article>
              ))}
            </div>
            {mortarColourAdvice.selectionNote || mortarColourAdvice.warning ? (
              <div className="mortar-colour-notes">
                {mortarColourAdvice.selectionNote ? (
                  <>
                    <h3>Choosing a mortar colour</h3>
                    <p>{mortarColourAdvice.selectionNote}</p>
                  </>
                ) : null}
                {mortarColourAdvice.warning ? (
                  <aside className="mortar-colour-caution">
                    <h3>Why red mortar is often avoided</h3>
                    <p>{mortarColourAdvice.warning}</p>
                  </aside>
                ) : null}
                <p className="mortar-guide-link-copy">
                  Learn more about natural mortar, added dyes and maintaining consistent mortar
                  colour across a project.
                </p>
                <div className="actions mortar-colour-actions">
                  <Link className="btn btn-secondary" to="/facing-bricks/mortar">
                    Read the mortar guide
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section
        id="download-textures"
        className={mortarColourAdvice ? "section" : "section section-alt"}
      >
        <div className="container colour-guide-content">
          <p className="eyebrow">Seamless textures</p>
          <h2>Download a seamless {seoNoun} texture</h2>
          <p>
            Create a <strong>seamless {seoNoun} texture</strong> from a product in this colour group
            for visualisation and design software. Set the bond, mortar and physical brick area
            before export, so the digital texture matches the wall you are designing.
          </p>
          <GuideImagePlaceholderGrid
            items={guide.textureExamples.slice(0, 2)}
            ratio={guide.textureExamples.some(item => item.src) ? "natural" : "landscape"}
          />
          <p className="texture-next-step-copy">
            Continue below to choose a{" "}
            {guide.slug === "red-and-orange" ? "red or orange brick" : seoNoun} and create its{" "}
            <strong>seamless texture</strong>.
          </p>
        </div>
      </section>

      <section className="section colour-guide-closing-block">
        <div className="container colour-guide-content colour-guide-closing">
          {mortarColourAdvice ? (
            <>
              <p className="eyebrow">Next step</p>
              <h2>Choose your red or orange brick</h2>
              <p>
                Select a product in Bricktextures, customise the bond, mortar colour and brick area,
                then download its seamless texture.
              </p>
              <div className="actions">
                <a
                  className="btn btn-primary"
                  href={guide.appFilterUrl}
                  onClick={event => onExploreClick(event, guide.appFilterUrl)}
                >
                  Explore red and orange bricks
                </a>
              </div>
            </>
          ) : (
            <>
              <p className="eyebrow">Next steps</p>
              <h2>Continue designing with {guide.title.toLowerCase().replace(" facing", "")}</h2>
              <div className="next-steps-grid">
                <article className="next-step-card">
                  <h3>Explore {guide.title.toLowerCase()}</h3>
                  <p>Compare products and create a seamless texture in Bricktextures.</p>
                  <a
                    className="btn btn-primary"
                    href={guide.appFilterUrl}
                    onClick={event => onExploreClick(event, guide.appFilterUrl)}
                  >
                    Explore in Bricktextures
                  </a>
                </article>
                <article className="next-step-card">
                  <h3>Complementary mortar colours</h3>
                  <p>See mortar guidance for this brick colour.</p>
                  <Link className="btn btn-primary" to="/facing-bricks/mortar">
                    Explore complementary mortar colours
                  </Link>
                </article>
              </div>
            </>
          )}
        </div>

        <div className="container colour-guide-closing-more">
          <div className="homepage-section-heading">
            <p className="eyebrow">Continue exploring</p>
            <h2>Browse other facing brick colours</h2>
          </div>
          <div className="colour-guide-other-grid">
            {otherGuides.map(item => (
              <Link
                key={item.slug}
                className="appearance-card colour-guide-other-card"
                to={`/facing-bricks/colour/${item.slug}`}
              >
                <span className={`appearance-swatch appearance-swatch-${item.tone}`} aria-hidden="true" />
                <span className="appearance-card-copy">
                  <strong>{item.title}</strong>
                  <span>{item.lead}</span>
                </span>
              </Link>
            ))}
            <Link
              className="appearance-card appearance-card-blend colour-guide-other-card"
              to={BLEND_PAGE_URL}
            >
              <span className="appearance-swatch appearance-swatch-blend" aria-hidden="true" />
              <span className="appearance-card-copy">
                <strong>Make your own blend</strong>
                <span>
                  Combine any colours — including {guide.shortLabel.toLowerCase()} — and create a custom
                  brick mix in Bricktextures.
                </span>
              </span>
            </Link>
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
