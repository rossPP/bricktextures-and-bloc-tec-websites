import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  GuideImagePlaceholderGrid,
} from "../components/GuideImagePlaceholder";
import harmoniousBlend from "../assets/brick-blending/harmonious-neutral-brick-blend.webp";
import boldBlend from "../assets/brick-blending/bold-multicolour-brick-blend.webp";

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
        name: "Brick Blending | Why and How to Mix Facing Bricks | Bricktextures",
        description:
          "Why architects blend facing bricks, how to give each colour a role, and how to choose products that can work together at wall scale.",
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
          <h1>Why blend facing bricks — and how to do it well</h1>
          <p className="lead contact-lead">
            Use a blend to match existing masonry, soften a strong colour or spread variation across
            a large wall. Give each colour a clear role, let the blend tool check what can mix, and
            review the result at the scale people will see it.
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
          <h2>Why specify a blend?</h2>
          <p>
            A blend can relate new work to retained masonry, respond to local material variation,
            soften a strong colour or spread variation across a large wall so it does not feel flat or
            overpowering. Review the mix with the actual bond and mortar, and from the distance people
            will see it, so you can judge the mix at a realistic scale.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Colour roles</p>
          <h2>Give each colour a clear role</h2>
          <p>
            A blend brings several products or colours together in one wall. Choose one main brick
            colour, add related colours for depth, and use stronger contrasting colours more
            sparingly so the wall feels balanced rather than patchy or randomly mixed.
          </p>
          <p>
            The blend tool gives you that creative freedom. Mix any facing brick colours you want —
            a calm, easy-on-the-eye combination that sits quietly in its setting, or a bold statement
            mix that stands out. Decide the mood first, then set the proportions to match it.
          </p>
          <GuideImagePlaceholderGrid
            ratio="natural"
            items={[
              {
                label: "Harmonious neutral brick colour blend",
                caption:
                  "Related tones working together — calm, balanced and easy on the eye.",
                src: harmoniousBlend,
              },
              {
                label: "Bold multicolour brick blend",
                caption:
                  "Strong contrasting colours mixed for a clear, high-impact statement.",
                src: boldBlend,
              },
            ]}
          />
          <p>
            Start with the surroundings — neighbouring buildings and the landscape — and decide
            whether the blend should connect with that setting or stand out against it. Then decide
            whether the wall should feel warm and familiar, calm and restrained, or sharper and more
            contemporary. For complementary colour ideas against a single dominant brick colour, see
            the{" "}
            <Link to="/explore/colour">colour guides</Link>.
          </p>
          <p>
            Lighting changes which colours you notice first. Strong daylight brings lighter and
            brighter bricks forward, while shade can make darker bricks merge together. Warm lighting
            strengthens reds, buffs and browns; cooler lighting brings grey and blue-grey components
            forward. View the blend across a large wall area in the light each elevation will
            receive.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">How to build a blend</p>
          <h2>Compatibility is checked for you</h2>
          <p>
            Bricktextures only allows combinations that can work together. Incompatible sizes are
            blocked, and clay cannot be mixed with concrete. When a mix will not work, the tool
            warns you and prevents it — so you do not have to check sizes or materials by hand.
            That leaves you free to focus on colour, proportion and how the wall looks.
          </p>
          <p>
            You can still draw products from more than one manufacturer when colour or an existing
            material requires it. Combine ranges for appearance, then review the blend at wall scale.
          </p>
          <p>
            Once the proportions are set, review the blend across a representative wall area. A mix
            that looks balanced in a small preview may read differently when its colours and
            textures are spread across a full elevation. View it from the distance people will
            actually see it before fixing the specification.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-closing">
          <p className="eyebrow">Start blending</p>
          <h2>Create a brick blend in Bricktextures</h2>
          <p>
            Open the blend tool to try product combinations at wall scale. When the mix is agreed,
            you can{" "}
            <Link to="/tools/share-design">share the design or download a specification</Link>,
            export a{" "}
            <Link to="/tools/seamless-brick-textures">seamless texture</Link>, or choose a{" "}
            <Link to="/facing-bricks/bonds">bond</Link> that suits the surfaces in the mix.
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
