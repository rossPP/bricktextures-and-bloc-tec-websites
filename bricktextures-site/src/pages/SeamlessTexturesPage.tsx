import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { GuideImagePlaceholder, GuideImagePlaceholderGrid } from "../components/GuideImagePlaceholder";

const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";
const TEXTURE_APP_URL = "/app/facing-bricks?tab=texture&src=seamless-textures";

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
        name: "Seamless Brick Textures from Manufacturer Products | Bricktextures",
        description:
          "Create seamless brick textures from manufacturer products with controlled module, bond, mortar, blend and represented wall area.",
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
          <h1>Design seamless brick textures from manufacturer products</h1>
          <p className="lead contact-lead">
            Build a seamless brick texture from manufacturer products, with the brick size, joint,
            bond and represented wall area set to suit the model. Add a controlled blend where the
            elevation requires one.
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
          <p className="eyebrow">Specification-led textures</p>
          <h2>Keep product, module and bond aligned</h2>
          <p>
            Bricktextures starts with photographed manufacturer products. Configure the brick size,
            joint, bond and mortar before generating the seamless brick texture, so the exported
            material represents a defined wall build-up rather than an arbitrary surface image.
          </p>
          <p>
            In Revit, SketchUp, Enscape, V-Ray or another visualisation workflow, map the export at its
            stated real-world dimensions. This preserves brick module, joint width and bond geometry
            across views and comparison options.
          </p>
          <GuideImagePlaceholder
            label="Seamless brick texture and source product"
            caption="Exported tile shown with its source product and mapping dimensions."
            wide
          />
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Represented wall area</p>
          <h2>Set the area covered by the texture tile</h2>
          <p>
            Before export, set the real wall area represented by the tile. Use those dimensions when
            mapping the material; changing the image scale independently will make the brick module
            inaccurate.
          </p>
          <div className="colour-guide-card-grid">
            <article>
              <h3>Smaller physical area, higher definition</h3>
              <p>
                Use a smaller represented area for close views of interiors, entrances, courtyards
                and façade details. More pixels are assigned to each brick face and joint, at the
                cost of a more frequent tile repeat.
              </p>
            </article>
            <article>
              <h3>Larger physical area, broader coverage</h3>
              <p>
                Use a larger represented area for long elevations and wider views. The broader sample
                reduces visible repetition across the façade, with lower pixel density at close range.
              </p>
            </article>
          </div>
          <GuideImagePlaceholderGrid
            items={[
              {
                label: "Small HD seamless texture — interior / detail use",
                caption: "Example: residential feature wall or close-up visualisation material.",
              },
              {
                label: "Large-area seamless texture — commercial façade use",
                caption: "Example: hospital or office elevation where repeat must stay invisible.",
              },
            ]}
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">When to use which size</p>
            <h2>Example scenarios</h2>
          </div>
          <div className="colour-guide-card-grid seamless-scenario-grid">
            <article>
              <h3>Interior living or dining feature wall</h3>
              <p>
                Small physical tile, higher definition. People stand close to the brick; face detail
                and mortar lines need to hold up in close renders and walkthroughs.
              </p>
            </article>
            <article>
              <h3>Boutique hotel lobby or retail fit-out</h3>
              <p>
                Still favour a relatively compact, detailed texture — especially for hero walls and
                reception backdrops captured at mid to near distance.
              </p>
            </article>
            <article>
              <h3>House façade or small extension</h3>
              <p>
                Mid-size seamless tiles often work well: enough area for elevation views, enough
                definition for garden and street-level perspectives.
              </p>
            </article>
            <article>
              <h3>Hospital, school or commercial façade</h3>
              <p>
                Large physical area at lower scale. Long elevations and distant views expose tiling
                quickly if the seamless unit is too small; a bigger tile keeps the repeat quiet.
              </p>
            </article>
            <article>
              <h3>Masterplan or wide urban CGI</h3>
              <p>
                Prefer large-area, lower-scale textures so brickwork reads as masonry mass without
                noisy repeating motifs across blocks of buildings.
              </p>
            </article>
            <article>
              <h3>Close product comparison stills</h3>
              <p>
                Smaller, sharper textures help side-by-side visualisations where clients scrutinise
                the brick face itself, not only the overall building.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Configure everything</p>
          <h2>Set bond, mortar and blend before export</h2>
          <p>
            Select a supported bond, mortar colour and, where required, a multi-product blend. The
            exported seamless brick texture retains that configuration, including the selected
            product proportions.
          </p>
          <p>
            Confirm that the chosen size and joint produce the intended module, particularly where
            headers, stack alignment or other bond geometry depends on exact dimensions.
          </p>
          <ul className="colour-guide-list">
            <li>Manufacturer facing bricks as the source material</li>
            <li>Any supported brick bond for the selected products</li>
            <li>Mortar / joint colour control</li>
            <li>Custom blends of multiple bricks</li>
            <li>Selectable represented wall area for the seamless tile</li>
            <li>Export for use in your own design and visualisation software</li>
          </ul>
          <GuideImagePlaceholderGrid
            items={[
              {
                label: "Same brick, different bond in seamless export",
                caption: "Show stretcher vs stack or Flemish on one product.",
              },
              {
                label: "Blend + mortar variation seamless textures",
                caption: "Show how blend mix and joint colour change the export.",
              },
            ]}
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Who it is for</p>
          <h2>Architects, visualisers and design teams</h2>
          <p>
            Use seamless brick textures to represent shortlisted products consistently in client
            visuals, competition material and design-stage models. Record the export dimensions,
            product, size, bond and mortar alongside the model material.
          </p>
          <p>
            Explore by{" "}
            <Link to="/#colour">colour</Link>,{" "}
            <Link to="/#finish">surface texture</Link> or{" "}
            <Link to="/facing-bricks/bonds">brick bond</Link>, configure the wall, then open the
            texture tool to export.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-closing">
          <p className="eyebrow">Start in Bricktextures</p>
          <h2>Build a seamless brick texture now</h2>
          <p>
            Select the product, set the represented wall area, bond and mortar, then export the
            seamless brick texture at the stated scale.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={TEXTURE_APP_URL}
              onClick={event => onExploreClick(event, TEXTURE_APP_URL)}
            >
              Create a seamless texture
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
