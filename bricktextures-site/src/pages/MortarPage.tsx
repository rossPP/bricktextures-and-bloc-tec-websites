import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { GuideImagePlaceholderGrid } from "../components/GuideImagePlaceholder";
import { MORTAR_COLOUR_BY_BRICK } from "../content/mortarColourByBrick";

const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";
const MORTAR_APP_URL = "/app/facing-bricks?src=mortar-colour";

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

export function MortarPage() {
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
        "@id": "https://bricktextures.com/facing-bricks/mortar#webpage",
        url: "https://bricktextures.com/facing-bricks/mortar",
        name: "Brick Mortar Colour | Bricktextures",
        description:
          "How mortar colour changes facing brickwork — natural sand colours, dyed mortars, and pairings for red, buff, brown and neutral bricks.",
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
            name: "Mortar colour",
            item: "https://bricktextures.com/facing-bricks/mortar",
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
            <span>Mortar colour</span>
          </nav>

          <p className="eyebrow">Mortar colour</p>
          <h1>Mortar colour</h1>
          <p className="lead contact-lead">
            Mortar colour changes the apparent tone, contrast and module of brickwork. Compare options
            in Bricktextures under the same bond and lighting before confirming them against site
            samples.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={MORTAR_APP_URL}
              onClick={event => onExploreClick(event, MORTAR_APP_URL)}
            >
              Trial mortar colour in Bricktextures
            </a>
            <Link className="btn btn-secondary" to="/facing-bricks/joint-size">
              Joint size
            </Link>
          </div>

          <nav className="guide-section-nav" aria-label="On this page">
            <p className="eyebrow">On this page</p>
            <ul>
              <li>
                <a href="#natural-colours">Natural colours</a>
              </li>
              <li>
                <a href="#by-brick-colour">By brick colour</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <section id="natural-colours" className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Natural colours</p>
          <h2>Greys, yellows and light buffs</h2>
          <p>
            Historically, mortar colour was determined by the natural aggregate and cement used in
            the mix. Local sand can strongly influence the tone; yellow sand, for example, may
            naturally produce a light buff mortar. Investigate available local aggregates early,
            particularly on larger projects.
          </p>
          <p>
            Where natural materials provide the required appearance, mortar without added colour is
            often preferable because it removes an additional source of variation. Pigments extend
            the available range, but site-mixed batches can differ as sand moisture and composition
            change. Small differences in pigment quantity can also produce visible colour shifts,
            making consistent batching more difficult.
          </p>
          <p>
            A close colour match reduces the visual weight of joints; contrast makes the bond and
            module more prominent. Trial both approaches in Bricktextures, then review physical
            samples because screen colour cannot represent aggregate, curing and site variation.
          </p>
          <GuideImagePlaceholderGrid
            items={[
              {
                label: "Same brick with buff mortar",
                caption: "Natural buff or light sand mortar against the selected brick.",
              },
              {
                label: "Same brick with contrasting grey mortar",
                caption: "The same brick with a cooler grey joint for comparison.",
              },
            ]}
          />
        </div>
      </section>

      <section id="by-brick-colour" className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">By brick colour</p>
          <h2>Mortar pairings for common facing brick colours</h2>
          <p>
            Once you know the brick colour family, mortar is one of the fastest ways to tune how the
            wall reads. Jump to a colour guide for the wider pairing context, or trial the pairing
            directly in Bricktextures.
          </p>

          {MORTAR_COLOUR_BY_BRICK.map(group => (
            <div key={group.slug} id={`mortar-${group.slug}`} className="mortar-colour-group">
              <h3 className="colour-guide-subheading">{group.title}</h3>
              <p>
                {group.summary}{" "}
                <Link to={group.colourGuidePath}>Colour guide: {group.title.toLowerCase()}</Link>
                .
              </p>
              <div className="colour-guide-card-grid">
                {group.items.map(item => (
                  <article key={item.name}>
                    <h3>{item.name}</h3>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>
              <GuideImagePlaceholderGrid
                items={group.items.map(item => ({
                  label: item.imageLabel,
                  caption: "Close wall view of the brick and mortar pairing.",
                }))}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-closing">
          <p className="eyebrow">Next</p>
          <h2>Trial colour — then set the joint</h2>
          <p>
            Compare mortar options under consistent bond and lighting, then coordinate the selected
            colour with joint width, profile and workmanship.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={MORTAR_APP_URL}
              onClick={event => onExploreClick(event, MORTAR_APP_URL)}
            >
              Trial mortar colour in Bricktextures
            </a>
            <Link className="btn btn-secondary" to="/facing-bricks/joint-size">
              Joint size guide
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
