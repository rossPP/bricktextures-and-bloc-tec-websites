import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { GuideImagePlaceholderGrid } from "../components/GuideImagePlaceholder";
import kingscourtClay from "../assets/clay-vs-concrete/kingscourt-redwood-clay-half.webp";
import marshallsConcrete from "../assets/clay-vs-concrete/marshalls-parkview-samwell-haze-concrete-half.webp";

const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";
const CLAY_APP_URL =
  "/app/facing-bricks?filterCategory=Clay%20Facing%20Bricks";
const CONCRETE_APP_URL =
  "/app/facing-bricks?filterCategory=Concrete%20Facing%20Bricks";

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
  return `/app/facing-bricks?filterCategory=${category}&filterManufacturer=${encodeURIComponent(filter)}`;
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
            Clay offers a wide range of natural colour and texture. Concrete usually gives a more
            regular size and controlled appearance. Both can make good facing bricks, but they age,
            move and weather differently.
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
          <p className="eyebrow">Choosing the material</p>
          <h2>Why choose clay or concrete?</h2>
          <p>
            Clay is familiar, widely used and available in a broad range of colours, finishes and
            degrees of variation. Firing clay uses a great deal of energy, although the impact varies
            with the raw material, fuel, factory, transport distance and life of the product.
          </p>
          <p>
            Concrete bricks are moulded and cured rather than fired. They can offer regular sizing,
            controlled colour and a competitive price, but cement, aggregates, curing and transport
            all affect their environmental impact. Compare current information for the actual
            products rather than assuming one material is always better.
          </p>
          <p>
            Before reading on, look at these two walls side by side. One is clay and one is concrete —
            which is which?
          </p>
          <GuideImagePlaceholderGrid
            className="material-compare-grid"
            ratio="natural"
            items={[
              {
                label: "Brick wall A",
                caption: "Brick A",
                src: kingscourtClay,
              },
              {
                label: "Brick wall B",
                caption: "Brick B",
                src: marshallsConcrete,
              },
            ]}
          />
          <p className="mortar-colour-comparison-note">
            The answer is further down the page — after the clay and concrete sections.
          </p>
        </div>
      </section>

      <section id="clay" className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Clay facing bricks</p>
          <h2>Natural colour and a wide choice of textures</h2>
          <p>
            The clay, firing and surface treatment all affect the finished colour and texture.
            Wirecut, stock, waterstruck and handmade products can therefore look very different when
            built into a wall.
          </p>
          <p>
            Many clay bricks keep their colour well because it runs through the fired body or is fixed
            during firing. Exposure, salts, staining, detailing and maintenance will still affect how
            the wall looks as it ages.
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
          <h2>Regular sizing and a controlled appearance</h2>
          <p>
            Concrete facing bricks are formed from cement, aggregates, pigments and water, then cured.
            They avoid kiln firing, but cement still carries an environmental cost. Compare price and
            carbon using current information for the products you are actually considering.
          </p>
          <p>
            Moulding can produce consistent colour and geometry, including smooth, textured and creased
            faces. Because the texture is moulded, repeated marks can become noticeable across a large
            wall or at close range. Look at a full panel rather than one brick. Colour stability and
            weathering still depend on the chosen product and its exposure.
          </p>
          <p>
            Concrete bricks also tend to be more regular in size. They do not go through the kiln
            shrinkage and natural variation of clay, so one brick is more likely to match the next.
            This can make concrete a good fit for{" "}
            <Link to="/facing-bricks/bonds#stack-bond">modern bonds</Link> that rely on precise
            alignment, such as stack, grid and basketweave, where size differences quickly show.
          </p>
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
          <p className="eyebrow">The answer</p>
          <h2>Which wall was clay, and which was concrete?</h2>
          <p>
            Brick A is clay: Kingscourt Redwood. Brick B is concrete: Marshalls Parkview Samwell
            Haze. Side by side like this, the difference is often harder to spot than people expect —
            especially when colour, bond and joint are similar.
          </p>
          <GuideImagePlaceholderGrid
            className="material-compare-grid"
            ratio="natural"
            items={[
              {
                label: "Kingscourt Redwood clay facing brick wall",
                caption: "Brick A — Kingscourt Redwood (clay)",
                src: kingscourtClay,
              },
              {
                label: "Marshalls Parkview Samwell Haze concrete facing brick wall",
                caption: "Brick B — Marshalls Parkview Samwell Haze (concrete)",
                src: marshallsConcrete,
              },
            ]}
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Ageing</p>
          <h2>How clay and concrete change over time</h2>
          <p>
            Both materials change in the weather. Clay may stain, show efflorescence, develop
            biological growth or suffer frost damage if the product or detailing is wrong. Concrete
            can change colour, carbonate, show efflorescence or soil unevenly. Good copings, drips,
            cavities and water management matter as much as the material.
          </p>
          <p>
            Look at older projects built with the products you are considering, not only new sample
            panels. Check durability, movement joints and cleaning advice for the location before
            making the final choice.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">In Bricktextures</p>
          <h2>Compare them as separate materials</h2>
          <p>
            Bricktextures lists clay and concrete facing bricks under separate category filters so
            you can browse each set on its own. Do not mix clay and concrete in one blend: they are
            different materials and move differently.{" "}
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
