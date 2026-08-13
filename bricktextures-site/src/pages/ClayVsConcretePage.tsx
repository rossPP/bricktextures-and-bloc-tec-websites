import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { GuideImagePlaceholder, GuideImagePlaceholderGrid } from "../components/GuideImagePlaceholder";

const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";
const CLAY_APP_URL =
  "/app/facing-bricks?filterCategory=Clay%20Facing%20Bricks&src=material-clay";
const CONCRETE_APP_URL =
  "/app/facing-bricks?filterCategory=Concrete%20Facing%20Bricks&src=material-concrete";

const CONCRETE_MANUFACTURERS = [
  { label: "Marshalls", filter: "Marshalls" },
  { label: "AG (Acheson & Glover)", filter: "AG" },
  { label: "Tobermore", filter: "Tobermore" },
  { label: "Precon", filter: "Precon" },
] as const;

const CLAY_MANUFACTURERS = [
  { label: "Ibstock", filter: "Ibstock" },
  { label: "Forterra", filter: "Forterra" },
  { label: "Kingscourt", filter: "Kingscourt" },
  { label: "Vandersanden", filter: "Vandersanden" },
] as const;

function manufacturerAppUrl(filter: string, material: "clay" | "concrete") {
  const category =
    material === "clay" ? "Clay%20Facing%20Bricks" : "Concrete%20Facing%20Bricks";
  return `/app/facing-bricks?filterCategory=${category}&filterManufacturer=${encodeURIComponent(filter)}&src=material-${material}-mfr`;
}

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

export function ClayVsConcretePage() {
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
        "@id": "https://bricktextures.com/facing-bricks/clay-vs-concrete#webpage",
        url: "https://bricktextures.com/facing-bricks/clay-vs-concrete",
        name: "Clay Bricks vs Concrete Bricks | Bricktextures",
        description:
          "Compare clay and concrete facing bricks by manufacture, appearance, tolerances, weathering, performance and project requirements.",
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
            name: "Clay vs concrete",
            item: "https://bricktextures.com/facing-bricks/clay-vs-concrete",
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
            <span>Clay vs concrete</span>
          </nav>

          <p className="eyebrow">Facing bricks by material</p>
          <h1>Clay bricks vs concrete bricks</h1>
          <p className="lead contact-lead">
            Clay and concrete facing bricks differ in manufacture, appearance, dimensional tolerance,
            moisture movement and weathering. Compare both in Bricktextures, then assess declared
            performance, detailing, supply and whole-life requirements for the project.
          </p>
          <div className="actions material-cta-actions">
            <a
              className="btn btn-primary"
              href={CLAY_APP_URL}
              onClick={event => onExploreClick(event, CLAY_APP_URL)}
            >
              Explore clay bricks
            </a>
            <a
              className="btn btn-secondary"
              href={CONCRETE_APP_URL}
              onClick={event => onExploreClick(event, CONCRETE_APP_URL)}
            >
              Explore concrete bricks
            </a>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Why both exist</p>
          <h2>Two materials, two reasons to choose</h2>
          <p>
            Fired clay offers established construction practice and a broad range of colours, finishes
            and degrees of variation. Its kiln-fired production is energy intensive, although impacts
            vary by raw material, fuel, factory efficiency, transport and service life.
          </p>
          <p>
            Concrete units are moulded and cured rather than kiln fired. They can provide consistent
            dimensions, controlled colour and competitive cost, but cement content, curing, aggregates
            and transport all affect embodied impact. Compare current product-specific declarations
            rather than assuming one material is universally preferable.
          </p>
        </div>
      </section>

      <section id="clay" className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Clay facing bricks</p>
          <h2>Fired material with broad visual range</h2>
          <p>
            Clay units are shaped, dried and fired. Manufacturing method, clay body, firing conditions
            and surface treatment determine colour, texture and dimensional variation; wirecut,
            stock, waterstruck and handmade products therefore read differently on the wall.
          </p>
          <p>
            Many clay products retain colour well because it is developed through the fired body or
            surface treatment. Exposure, detailing, salts, staining and maintenance still influence
            long-term appearance, so assess the product and location rather than the material alone.
          </p>
          <p>
            Clay ranges in Bricktextures include manufacturers such as Ibstock, Wienerberger,
            Forterra, Kingscourt and Vandersanden — useful when you want to compare familiar UK and
            Ireland clay brands side by side.
          </p>
          <ul className="material-manufacturer-list">
            {CLAY_MANUFACTURERS.map(mfr => {
              const url = manufacturerAppUrl(mfr.filter, "clay");
              return (
                <li key={mfr.filter}>
                  <a href={url} onClick={event => onExploreClick(event, url)}>
                    {mfr.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={CLAY_APP_URL}
              onClick={event => onExploreClick(event, CLAY_APP_URL)}
            >
              Browse clay facing bricks
            </a>
          </div>
        </div>
      </section>

      <section id="concrete" className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Concrete facing bricks</p>
          <h2>Moulded units with controlled dimensions</h2>
          <p>
            Concrete facing bricks are formed from cement, aggregates, pigments and water, then cured.
            They avoid kiln firing but retain the embodied impacts of cement and other constituents.
            Cost and carbon should be compared using project-specific prices and current environmental
            product declarations.
          </p>
          <p>
            Moulding can produce consistent colour and geometry, including smooth, textured and creased
            faces. Repeated surface patterns may become visible over large or close-viewed elevations;
            assess full panels, not single units. Pigment stability and weathering depend on the
            particular product and exposure.
          </p>
          <p>
            Concrete units also tend to hold tighter size tolerances. They do not go through the
            kiln shrinkage and natural variation of clay, so brick-to-brick dimensions stay more
            exact. That makes concrete a stronger fit for{" "}
            <Link to="/facing-bricks/bonds/modern">modern bonds</Link> that rely on precise
            alignment — stack, grid, basketweave and similar patterns — where wandering sizes quickly
            show.
          </p>
          <GuideImagePlaceholderGrid
            items={[
              {
                label: "Clay creased facing brick",
                caption: "Creased clay product showing variation between faces.",
              },
              {
                label: "Concrete creased facing brick",
                caption: "Moulded concrete product showing its surface pattern.",
              },
            ]}
          />
          <p>
            Concrete facing bricks in Bricktextures include manufacturers such as Marshalls, AG
            (Acheson & Glover), Tobermore and Precon — a practical place to review concrete options
            alongside clay without jumping between catalogues.
          </p>
          <ul className="material-manufacturer-list">
            {CONCRETE_MANUFACTURERS.map(mfr => {
              const url = manufacturerAppUrl(mfr.filter, "concrete");
              return (
                <li key={mfr.filter}>
                  <a href={url} onClick={event => onExploreClick(event, url)}>
                    {mfr.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={CONCRETE_APP_URL}
              onClick={event => onExploreClick(event, CONCRETE_APP_URL)}
            >
              Browse concrete facing bricks
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Ageing</p>
          <h2>How the two materials tend to change</h2>
          <p>
            Both materials weather. Clay may develop staining, efflorescence, biological growth or
            local frost damage where product selection and detailing are unsuitable. Concrete may show
            pigment change, carbonation effects, efflorescence or differential soiling. Exposure,
            copings, drips, cavities and water management often matter as much as material category.
          </p>
          <p>
            Review representative aged projects, declared durability and manufacturer guidance for
            the intended exposure. Confirm movement-joint strategy and cleaning methods before
            specification.
          </p>
          <GuideImagePlaceholder
            label="Aged clay façade vs aged concrete facing"
            caption="Weathered clay and concrete facing brickwork in comparable exposure."
            wide
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">In Bricktextures</p>
          <h2>Compare them as separate materials</h2>
          <p>
            Bricktextures lists clay and concrete facing bricks under separate category filters so
            you can browse each set on its own. When blending, clay and concrete are not mixed — they
            are different materials with different behaviour.{" "}
            <Link to="/tools/brick-blending">How brick blending works</Link>.
          </p>
          <div className="actions material-cta-actions">
            <a
              className="btn btn-primary"
              href={CLAY_APP_URL}
              onClick={event => onExploreClick(event, CLAY_APP_URL)}
            >
              Explore clay bricks
            </a>
            <a
              className="btn btn-secondary"
              href={CONCRETE_APP_URL}
              onClick={event => onExploreClick(event, CONCRETE_APP_URL)}
            >
              Explore concrete bricks
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
