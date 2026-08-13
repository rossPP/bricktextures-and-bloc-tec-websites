import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { GuideImagePlaceholder, GuideImagePlaceholderGrid } from "../components/GuideImagePlaceholder";

const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";
const BLEND_APP_URL = "/app/facing-bricks?tab=blend&src=brick-blending";

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

export function BrickBlendingPage() {
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
        "@id": "https://bricktextures.com/tools/brick-blending#webpage",
        url: "https://bricktextures.com/tools/brick-blending",
        name: "Brick Blending Tool | Mix Real Facing Bricks | Bricktextures",
        description:
          "Develop facing brick blends across manufacturer ranges, lock product proportions, review compatibility and record the agreed mix.",
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
            name: "Brick blending",
            item: "https://bricktextures.com/tools/brick-blending",
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

      <section className="section colour-guide-hero brick-blending-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Brick blending</span>
          </nav>

          <p className="eyebrow">Brick blending</p>
          <h1>Design brick blends from manufacturer products</h1>
          <p className="lead contact-lead">
            Combine facing bricks in controlled proportions and review the mix under a consistent bond
            and mortar. Products may be selected across manufacturers where procurement and technical
            compatibility permit.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={BLEND_APP_URL}
              onClick={event => onExploreClick(event, BLEND_APP_URL)}
            >
              Open the blend tool
            </a>
            <Link className="btn btn-secondary" to="/#why-bricktextures">
              Why Bricktextures
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Design and site context</p>
          <h2>Use a blend for a defined project reason</h2>
          <p>
            A blend can relate new work to retained masonry, respond to local material variation,
            moderate a dominant colour or distribute tonal variation across a large elevation. Develop
            the mix against the actual bond, mortar and viewing distance, then agree how it will be
            sampled and controlled on site.
          </p>
          <GuideImagePlaceholder
            label="Brick blend in the Bricktextures viewer"
            caption="Multi-product blend shown at wall scale."
            wide
          />
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Lock proportions</p>
          <h2>Lock in a specific blend</h2>
          <p>
            Lock an agreed product proportion while adjusting the remainder of the mix. The locked
            values stay fixed and the available balance is redistributed, preserving design intent
            through successive options. Record final percentages for sample panels, scheduling and
            site quality control.
          </p>
          <GuideImagePlaceholderGrid
            items={[
              {
                label: "Blend proportions unlocked",
                caption: "Example of adjusting several products freely.",
              },
              {
                label: "Blend with locked proportions",
                caption: "Example of locking one or more products while refining others.",
              },
            ]}
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Compatibility</p>
          <h2>Warnings when products are not fully compatible</h2>
          <p>
            Products with different sizes or available configurations can restrict compatible bonds
            and joints. Bricktextures flags these constraints early; confirm dimensions, tolerances,
            durability, availability and manufacturer guidance before specification.
          </p>
          <p>
            Clay and concrete units are not combined. Their dimensional behaviour, moisture movement,
            tolerances and weathering differ, creating avoidable design and construction risks within
            one blend.
          </p>
          <GuideImagePlaceholderGrid
            items={[
              {
                label: "Limited compatibility warning example",
                caption: "Compatibility warning for products with restricted shared options.",
              },
              {
                label: "Clay vs concrete blocked mix example",
                caption: "Incompatible material categories kept as separate blends.",
              },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Colour strategy</p>
          <h2>Set the blend from its context</h2>
          <p>
            Use measured proportions to relate brickwork to retained masonry, adjacent stone, timber,
            landscape or the wider townscape. A blend should have a legible purpose at wall and
            building scale, not only as an isolated product sample.
          </p>
          <p>
            Review representative areas at the intended viewing distance and confirm the distribution
            with a site sample panel before fixing the specification.
          </p>
          <GuideImagePlaceholder
            label="Intentional multi-colour brick blend"
            caption="Blend proportioned to complement an adjacent material or setting."
            wide
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Multi-manufacturer</p>
          <h2>Blend across manufacturers</h2>
          <p>
            Bricktextures can combine compatible products from different manufacturers in one design.
            This is useful where colour, availability, local sourcing or an existing material requires
            a cross-range specification.
          </p>
          <p>
            Check size, dimensional tolerances, technical performance, supply and warranties with
            each manufacturer. The visual blend is a design record, not confirmation that products are
            interchangeable or jointly warranted.
          </p>
          <GuideImagePlaceholder
            label="Blend using products from more than one manufacturer"
            caption="Compatible products selected across manufacturer ranges."
            wide
          />
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Share and specify</p>
          <h2>Pass the blend around, then download the specification</h2>
          <p>
            Send a share link during design review so colleagues or clients can open the same blend
            and compare revisions.
          </p>
          <p>
            For specification handoff, download the product schedule and agreed proportions as a clear
            design record. Coordinate it with drawings, clauses, samples and manufacturer advice.{" "}
            <Link to="/tools/share-design">How sharing and specifications work</Link>.
          </p>
          <GuideImagePlaceholderGrid
            items={[
              {
                label: "Shared blend link opened by a colleague",
                caption: "Shared design opened for project-team review.",
              },
              {
                label: "Downloaded blend design specification",
                caption: "Design record listing products and agreed proportions.",
              },
            ]}
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Related tools</p>
          <h2>From blend to texture and bond</h2>
          <p>
            Once a blend looks right, you can{" "}
            <Link to="/tools/share-design">share the design or download a specification</Link>,
            continue into <Link to="/tools/seamless-brick-textures">seamless texture export</Link>, or
            explore <Link to="/facing-bricks/bonds">brick bonds</Link> that suit the surface textures in your
            mix.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-closing">
          <p className="eyebrow">Start blending</p>
          <h2>Create a brick blend in Bricktextures</h2>
          <p>
            Add the selected products, set and lock their proportions, review compatibility, then
            issue the design for review or specification handoff.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={BLEND_APP_URL}
              onClick={event => onExploreClick(event, BLEND_APP_URL)}
            >
              Start a blend
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
