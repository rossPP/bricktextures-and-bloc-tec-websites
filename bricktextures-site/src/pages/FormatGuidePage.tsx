import { MouseEvent, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { GuideImagePlaceholder } from "../components/GuideImagePlaceholder";
import { FORMAT_GUIDES, getFormatGuide } from "../content/formatGuides";

const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";

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

export function FormatGuidePage() {
  const { slug = "" } = useParams();
  const guide = getFormatGuide(slug);

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
        "@id": `https://bricktextures.com/facing-bricks/format/${guide.slug}#webpage`,
        url: `https://bricktextures.com/facing-bricks/format/${guide.slug}`,
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
            name: "Size",
            item: "https://bricktextures.com/explore/format",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.shortLabel,
            item: `https://bricktextures.com/facing-bricks/format/${guide.slug}`,
          },
        ],
      },
    ],
  };

  const otherGuides = FORMAT_GUIDES.filter(item => item.slug !== guide.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className={`section colour-guide-hero format-guide-hero-${guide.tone}`}>
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/explore/format">Sizes</Link>
            <span aria-hidden="true">/</span>
            <span>{guide.shortLabel}</span>
          </nav>

          <p className="eyebrow">Facing brick sizes</p>
          <h1>{guide.h1}</h1>
          <p className="lead contact-lead">{guide.lead}</p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={guide.appFilterUrl}
              onClick={event => onExploreClick(event, guide.appFilterUrl)}
            >
              {guide.ctaLabel}
            </a>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">What it is</p>
          <h2>How this size reads</h2>
          <p>{guide.whatItIs}</p>
          <p>
            <strong>Typical dimensions:</strong> {guide.typicalSizes}
          </p>
          <GuideImagePlaceholder
            label={guide.placeholders[0].label}
            caption={guide.placeholders[0].caption}
            wide={guide.placeholders[0].wide}
          />
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Why it matters</p>
          <h2>When to choose this size</h2>
          <p>{guide.whyItMatters}</p>
          {guide.placeholders[1] ? (
            <GuideImagePlaceholder
              label={guide.placeholders[1].label}
              caption={guide.placeholders[1].caption}
              wide={guide.placeholders[1].wide}
            />
          ) : null}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">In Bricktextures</p>
          <h2>Browse this size</h2>
          <p>{guide.inAppNote}</p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={guide.appFilterUrl}
              onClick={event => onExploreClick(event, guide.appFilterUrl)}
            >
              {guide.ctaLabel}
            </a>
          </div>
          <ul className="colour-guide-list format-related-links">
            {guide.relatedLinks.map(link => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Other sizes</p>
          <h2>Explore other facing brick sizes</h2>
          <div className="hub-link-grid">
            {otherGuides.map(item => (
              <Link key={item.slug} className="hub-link-card" to={`/facing-bricks/format/${item.slug}`}>
                <strong>{item.shortLabel}</strong>
                <span>{item.lead}</span>
              </Link>
            ))}
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
