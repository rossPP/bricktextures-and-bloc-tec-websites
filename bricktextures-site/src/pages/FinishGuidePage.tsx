import { MouseEvent, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { GuideImagePlaceholder } from "../components/GuideImagePlaceholder";
import { FINISH_GUIDES, getFinishGuide } from "../content/finishGuides";

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

export function FinishGuidePage() {
  const { slug = "" } = useParams();
  const guide = getFinishGuide(slug);

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [pendingCategoryUrl, setPendingCategoryUrl] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [roleOptions, setRoleOptions] = useState<string[]>(buildRoleOptions());

  if (!guide) {
    return <Navigate to="/" replace />;
  }

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
        "@id": `https://bricktextures.com/facing-bricks/finish/${guide.slug}#webpage`,
        url: `https://bricktextures.com/facing-bricks/finish/${guide.slug}`,
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
            name: "Texture",
            item: "https://bricktextures.com/explore/finish",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.shortLabel,
            item: `https://bricktextures.com/facing-bricks/finish/${guide.slug}`,
          },
        ],
      },
    ],
  };

  const otherGuides = FINISH_GUIDES.filter(item => item.slug !== guide.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className={`section colour-guide-hero finish-guide-hero-${guide.tone}`}>
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/explore/finish">Texture</Link>
            <span aria-hidden="true">/</span>
            <span>{guide.shortLabel}</span>
          </nav>

          <p className="eyebrow">Facing bricks by texture</p>
          <h1>{guide.h1}</h1>
          <p className="lead contact-lead">{guide.lead}</p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={guide.appFilterUrl}
              onClick={event => onExploreClick(event, guide.appFilterUrl)}
            >
              Explore {guide.shortLabel.toLowerCase()} bricks
            </a>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">What it is</p>
          <h2>What this texture is</h2>
          <p>{guide.whatItIs}</p>
          <p>{guide.overallFeel}</p>
          <GuideImagePlaceholder
            label={guide.introImage?.label ?? `${guide.shortLabel} brick close-up`}
            caption={
              guide.introImage?.caption ?? "Face and edge detail showing the surface texture."
            }
            src={guide.introImage?.src}
            ratio={guide.introImage ? "natural" : "landscape"}
            wide
          />
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Why choose it</p>
          <h2>Why choose this texture?</h2>
          <ul className="colour-guide-list">
            {guide.whyChoose.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <GuideImagePlaceholder
            label={guide.projectImage?.label ?? `${guide.shortLabel} brick in a finished project`}
            caption={
              guide.projectImage?.caption ??
              "Built example showing the texture at façade scale."
            }
            src={guide.projectImage?.src}
            wide
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-closing">
          <p className="eyebrow">Compare products</p>
          <h2>Browse {guide.shortLabel.toLowerCase()} facing bricks</h2>
          <p>
            See how different {guide.shortLabel.toLowerCase()} bricks look with the same mortar, bond
            and lighting, so you can compare the products fairly.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={guide.appFilterUrl}
              onClick={event => onExploreClick(event, guide.appFilterUrl)}
            >
              Explore in Bricktextures
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">More texture guides</p>
            <h2>Explore other facing brick textures</h2>
          </div>
          <div className="colour-guide-other-grid">
            {otherGuides.map(item => (
              <Link
                key={item.slug}
                className="appearance-card colour-guide-other-card"
                to={`/facing-bricks/finish/${item.slug}`}
              >
                <span className={`appearance-swatch appearance-swatch-${item.tone}`} aria-hidden="true" />
                <span className="appearance-card-copy">
                  <strong>{item.title}</strong>
                  <span>{item.lead}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Link
            className="appearance-card appearance-card-blend colour-guide-blend-card"
            to={BLEND_PAGE_URL}
          >
            <span className="appearance-swatch appearance-swatch-blend" aria-hidden="true" />
            <span className="appearance-card-copy">
              <strong>Make your own blend</strong>
              <span>
                Combine products by texture and colour — including {guide.shortLabel.toLowerCase()} bricks —
                and set the required proportions in Bricktextures.
              </span>
            </span>
          </Link>
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
