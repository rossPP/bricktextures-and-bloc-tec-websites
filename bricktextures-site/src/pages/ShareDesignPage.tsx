import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { GuideImagePlaceholder, GuideImagePlaceholderGrid } from "../components/GuideImagePlaceholder";

const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";
const SHARE_APP_URL = "/app/facing-bricks?src=share-design";

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

export function ShareDesignPage() {
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
        "@id": "https://bricktextures.com/tools/share-design#webpage",
        url: "https://bricktextures.com/tools/share-design",
        name: "Share Your Brick Design | Link and Specification | Bricktextures",
        description:
          "Share a live Bricktextures design for client review or download a fixed product and blend record for specification handoff.",
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
            name: "Share your design",
            item: "https://bricktextures.com/tools/share-design",
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

      <section className="section colour-guide-hero share-design-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Share your design</span>
          </nav>

          <p className="eyebrow">Share your design</p>
          <h1>Share your design and download the specification</h1>
          <p className="lead contact-lead">
            Use a live link for client and design-team review. Use the downloaded record when the
            selected products and blend proportions are ready for specification handoff.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={SHARE_APP_URL}
              onClick={event => onExploreClick(event, SHARE_APP_URL)}
            >
              Open Bricktextures
            </a>
            <Link className="btn btn-secondary" to="/tools/seamless-brick-textures">
              Seamless textures
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Share link</p>
          <h2>Keep client review on the same design state</h2>
          <p>
            A share link captures the current products, blend proportions, bond, mortar and viewer
            settings. Colleagues and clients can therefore review the same option without reconstructing
            it or relying on an unrecorded screenshot.
          </p>
          <p>
            From Share design you can copy a link, or send it by email, WhatsApp or SMS. Recipients
            can review the design and, if needed, tweak it and share again.
          </p>
          <GuideImagePlaceholderGrid
            items={[
              {
                label: "Share design dialog",
                caption: "Live design prepared for client or project-team review.",
              },
              {
                label: "Shared design opened in another browser",
                caption: "The same configuration opened from its share link.",
              },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Download specification</p>
          <h2>A fixed record for specification handoff</h2>
          <p>
            Download specification records the selected product and key settings. For a blend, it
            identifies each product and its proportion, giving the project team a fixed reference
            independent of later changes to a shared design.
          </p>
          <p>
            Coordinate this record with drawings, specification clauses, approved samples and
            manufacturer advice. It supports handoff but does not replace technical review,
            availability checks or the contractual specification.
          </p>
          <GuideImagePlaceholder
            label="Downloaded design specification example"
            caption="Fixed design record showing products, proportions and settings."
            wide
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">When to use each</p>
          <h2>Share link vs specification download</h2>
          <div className="colour-guide-card-grid">
            <article>
              <h3>Use a share link when</h3>
              <p>
                The client or design team needs to review a live option, compare alternatives or
                comment before the selection is fixed.
              </p>
            </article>
            <article>
              <h3>Use the specification when</h3>
              <p>
                The agreed selection needs a dated, portable record for technical coordination,
                sampling, supplier enquiries or inclusion in the project information.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Works with your tools</p>
          <h2>Blends, textures and more</h2>
          <p>
            Sharing and specification download work with the designs you build in Bricktextures,
            including multi-product blends. After shortlisting, you can also move into{" "}
            <Link to="/tools/brick-blending">brick blending</Link> or{" "}
            <Link to="/tools/seamless-brick-textures">seamless texture export</Link>.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-closing">
          <p className="eyebrow">Start in Bricktextures</p>
          <h2>Configure a design, then share or download</h2>
          <p>
            Share the live design while it remains under review; download the fixed record when it is
            ready to pass into specification.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={SHARE_APP_URL}
              onClick={event => onExploreClick(event, SHARE_APP_URL)}
            >
              Open Bricktextures
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
