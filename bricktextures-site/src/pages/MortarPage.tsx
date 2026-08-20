import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { GuideImagePlaceholder } from "../components/GuideImagePlaceholder";
import { MORTAR_COLOUR_EXAMPLES } from "../content/mortarColourByBrick";
import naturalMortarDarkBrick from "../assets/mortar/natural-mortar-with-dark-brick.jpeg";
import naturalMortarDarkBrickArea from "../assets/mortar/natural-mortar-with-dark-brick-large-area.jpeg";
import naturalMortarLightBrick from "../assets/mortar/natural-mortar-with-light-brick.jpeg";
import naturalMortarLightBrickArea from "../assets/mortar/natural-mortar-with-light-brick-large-area.jpeg";

const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";
const MORTAR_APP_URL = "/app/facing-bricks?src=mortar-colour";
const MORTAR_ILLUSION_APP_URL = "/app/facing-bricks?src=mortar-context";

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
        name: "Brick Mortar Colours | Bricktextures",
        description:
          "Natural and dyed mortar colours, how brick context changes mortar appearance, and contrast principles.",
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
            <span>Mortar colours</span>
          </nav>

          <p className="eyebrow">Brickwork design</p>
          <h1>Mortar colours</h1>
          <p className="lead contact-lead">
            Mortar colour comes from the sand, aggregate and cement in the mix, or from colour added
            to it. Know the difference between natural and dyed mortar before you choose.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={MORTAR_APP_URL}
              onClick={event => onExploreClick(event, MORTAR_APP_URL)}
            >
              Trial mortar colour in Bricktextures
            </a>
          </div>

          <nav className="guide-section-nav" aria-label="On this page">
            <p className="eyebrow">On this page</p>
            <ul>
              <li>
                <a href="#natural-colours">Natural mortar colours</a>
              </li>
              <li>
                <a href="#using-dyes">Using dyes</a>
              </li>
              <li>
                <a href="#mortar-perception">How brick colour affects mortar</a>
              </li>
              <li>
                <a href="#choosing-mortar-colour">Choosing a mortar colour</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <section id="natural-colours" className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Natural colours</p>
          <h2>Natural mortar colours</h2>
          <p>
            Historically, mortar colour was determined by the natural aggregate and cement used in
            the mix. Local sand can strongly influence the tone; yellow sand, for example, may
            naturally produce a light buff mortar. On larger projects, check the available local
            sand and aggregate before specifying dye.
          </p>
          <p>
            Where natural materials provide the required appearance, mortar without added colour is
            often preferable because it keeps the mix simple and leaves one less thing that can
            shift on site. Natural colours commonly range from grey through yellow to light buff, and
            may already sit well with the brick, stone and render around them.
          </p>
        </div>
      </section>

      <section id="using-dyes" className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Added colour</p>
          <h2>Using dyes</h2>
          <p>
            Dye lets you match or contrast mortar with the brick, and with roof, stone or window
            colours nearby. It can create dark greys, buffs, reds and other colours that local
            materials cannot provide on their own.
          </p>
          <p>
            Added colour is another thing that can shift between batches. Moisture and sand can
            change, while small differences in dye quantity may produce visible colour changes.
            Careful measuring and mixing are especially important across a large project.
          </p>
          <p>
            Compare natural and dyed mortar against the chosen brick in Bricktextures and on physical
            sample boards before fixing the specification.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={MORTAR_APP_URL}
              onClick={event => onExploreClick(event, MORTAR_APP_URL)}
            >
              Trial mortar colour in Bricktextures
            </a>
          </div>
        </div>
      </section>

      <section id="mortar-perception" className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Context and perception</p>
          <h2>How brick colour affects how we see mortar</h2>
          <p>
            Look at the two brickwork samples below — each shown close up and across a larger wall
            area. Which mortar looks lighter, and which looks darker?
          </p>
          <div className="mortar-illusion-grid">
            <article>
              <h3>Light brick</h3>
              <div className="mortar-colour-image-pair">
                <GuideImagePlaceholder
                  label="Natural mortar with light brick — close view"
                  src={naturalMortarLightBrick}
                  ratio="square"
                />
                <GuideImagePlaceholder
                  label="Natural mortar with light brick — larger wall area"
                  src={naturalMortarLightBrickArea}
                  ratio="square"
                />
              </div>
              <p className="mortar-colour-comparison-note">
                Which mortar looks darker against the pale brick?
              </p>
            </article>
            <article>
              <h3>Dark brick</h3>
              <div className="mortar-colour-image-pair">
                <GuideImagePlaceholder
                  label="Natural mortar with dark brick — close view"
                  src={naturalMortarDarkBrick}
                  ratio="square"
                />
                <GuideImagePlaceholder
                  label="Natural mortar with dark brick — larger wall area"
                  src={naturalMortarDarkBrickArea}
                  ratio="square"
                />
              </div>
              <p className="mortar-colour-comparison-note">
                Which mortar looks lighter against the dark brick?
              </p>
            </article>
          </div>
          <p>
            Both samples use exactly the same mortar colour. The difference is only the brick. Our
            eye judges the joint against its surroundings, so the mortar appears darker beside a
            pale brick and lighter beside a dark brick — even when nothing in the joint colour has
            changed.
          </p>
          <p>
            Mortar cannot be chosen from a single swatch in isolation. The same mortar looks
            different against light and dark bricks, so a sample judged on one product can mislead
            when it is used with another. The surroundings trick the eye.
          </p>
          <p>
            <strong>
              This is a core reason to use Bricktextures.
            </strong>{" "}
            In the app you can place the same mortar against different bricks and see how the joint
            changes before you commit on site. Seeing the same mortar on different bricks removes the
            guesswork.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={MORTAR_ILLUSION_APP_URL}
              onClick={event => onExploreClick(event, MORTAR_ILLUSION_APP_URL)}
            >
              Compare mortar on different bricks
            </a>
          </div>
        </div>
      </section>

      <section id="choosing-mortar-colour" className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Contrast and definition</p>
          <h2>Choosing a mortar colour</h2>
          <p>
            Mortar is a thin line between the bricks, so brick colour alone does not dictate the
            choice. The more important decision is how strongly you want the joints and bond to show.
          </p>
          <ol className="colour-design-process">
            <li>
              <strong>Define the brickwork.</strong> A mortar that contrasts with the brick gives
              each unit a clearer outline and makes the bond more prominent.
            </li>
            <li>
              <strong>Blend the brickwork.</strong> A mortar close to the brick tone reduces joint
              contrast and makes the wall appear closer to one continuous colour.
            </li>
            <li>
              <strong>Keep the effect restrained.</strong> A natural or mid-tone mortar can leave
              the joint visible without strongly defining it or blending it away.
            </li>
          </ol>
          <p>
            The same principles apply across red, buff, brown and neutral bricks. Mortar can also
            connect brickwork with nearby stone, render, roofing or window colours. This is a wider
            choice about how the whole building works together, not a rule set by brick colour alone.
          </p>

          {MORTAR_COLOUR_EXAMPLES.map(group => (
            <div className="mortar-colour-notes" key={group.slug}>
              <h3>{group.title}</h3>
              <p>
                Each option is shown close up and on a larger wall so you can judge the joints at
                both scales.
              </p>
              <div className="mortar-colour-comparison-grid">
                {group.items.map(item => (
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
            </div>
          ))}
          <p>
            If you want almost no visible mortar — thin or glued joints rather than a coloured bed —
            see{" "}
            <Link to="/facing-bricks/joint-size#tight-joints">tighter joints</Link>.
          </p>
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
