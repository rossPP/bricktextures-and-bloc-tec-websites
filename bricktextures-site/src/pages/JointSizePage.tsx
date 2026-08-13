import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { GuideImagePlaceholder } from "../components/GuideImagePlaceholder";

const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";
const JOINT_APP_URL = "/app/facing-bricks?src=joint-size";

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

export function JointSizePage() {
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
        "@id": "https://bricktextures.com/facing-bricks/joint-size#webpage",
        url: "https://bricktextures.com/facing-bricks/joint-size",
        name: "Brick Joint Size | Bricktextures",
        description:
          "How joint size changes facing brickwork — the 10 mm joint, tighter joints, wider traditional joints, and how to trial them in Bricktextures.",
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
            name: "Joint size",
            item: "https://bricktextures.com/facing-bricks/joint-size",
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
            <span>Joint size</span>
          </nav>

          <p className="eyebrow">Joint size</p>
          <h1>Joint size</h1>
          <p className="lead contact-lead">
            Joint width controls brickwork module, bond alignment and the visual weight of mortar.
            Trial widths in Bricktextures, then coordinate setting out with product tolerances and
            the proposed mortar.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={JOINT_APP_URL}
              onClick={event => onExploreClick(event, JOINT_APP_URL)}
            >
              Trial joint size in Bricktextures
            </a>
            <Link className="btn btn-secondary" to="/facing-bricks/mortar">
              Mortar colour
            </Link>
          </div>

          <nav className="guide-section-nav" aria-label="On this page">
            <p className="eyebrow">On this page</p>
            <ul>
              <li>
                <a href="#standard-joint">The 10 mm joint</a>
              </li>
              <li>
                <a href="#tight-joints">Tighter joints</a>
              </li>
              <li>
                <a href="#wider-joints">Wider joints</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <section id="standard-joint" className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Standard</p>
          <h2>The 10 mm joint — and when to depart from it</h2>
          <p>
            A typical mortar joint for facing brickwork is about 10 mm. On site it will vary a
            little. Clay bricks especially can sit a few millimetres either side of nominal size, so
            you may see joints closer to 8 mm in one place and 12 mm in another — but they usually
            average out near 10 mm. That average is what keeps metric courses on a familiar 75 mm
            module (65 mm brick + 10 mm joint).
          </p>
          <p>
            Good detailing works with that module: window and door openings set out so courses and
            openings meet on whole bricks wherever possible. That reduces cutting for the bricklayer
            and usually looks cleaner. See also{" "}
            <Link to="/facing-bricks/format/standard">standard size bricks</Link>, where a 10 mm
            joint makes one stretcher equal two headers — the basis of many{" "}
            <Link to="/facing-bricks/bonds">bond patterns</Link>.
          </p>
          <GuideImagePlaceholder
            label="Standard 10 mm joint on facing brickwork"
            caption="Typical 10 mm bed joint and perpend shown in elevation."
            wide
          />
        </div>
      </section>

      <section id="tight-joints" className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Tighter joints</p>
          <h2>When the brick can hold a finer bed</h2>
          <p>
            Tighter joints are possible when the brick has low size tolerance — for example wirecut,
            glazed or many concrete facing bricks. With sand-cement mortar, the aggregate must be
            fine enough for the joint: as a guide, keep the joint about 2.5 times the largest grain
            size so the mortar spreads cleanly, beds slightly out-of-tolerance units, and lets the
            bricklayer work at a practical pace.
          </p>
          <p>
            Very fine joints, around 2–3 mm, generally require proprietary adhesive or thin-joint
            systems rather than traditional site-mixed sand-cement mortar. Pumped or slurry-applied
            systems also require careful face protection and installation in accordance with the
            system supplier’s guidance.
          </p>
          <GuideImagePlaceholder
            label="Same brick with 10 mm vs tighter joint"
            caption="Standard and tight joint widths compared on the same brick."
            wide
          />
        </div>
      </section>

      <section id="wider-joints" className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Wider joints</p>
          <h2>Traditional character — and a note on patterns</h2>
          <p>
            Wider joints can suit tumbled, sand-released, creased and handmade bricks, accommodating
            dimensional variation and giving mortar greater visual presence. Check that the proposed
            width, profile and mix remain suitable for exposure and workmanship.
          </p>
          <p>
            One caution with metric bricks: if you leave the 10 mm standard joint, many stretcher
            and header patterns stop tessellating cleanly. The familiar fit between stretcher and
            two headers depends on that joint relationship — so changing joint size can limit which
            bonds still read correctly. Trial the bond and joint together before you lock the design.
          </p>
          <GuideImagePlaceholder
            label="Traditional brick with a wider mortar joint"
            caption="Tumbled or creased brickwork with a deliberately wider joint."
            wide
          />
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-closing">
          <p className="eyebrow">In Bricktextures</p>
          <h2>Pick joint size while you compare</h2>
          <p>
            Compare joint widths under the same lighting and bond, then coordinate the selected width
            with setting-out dimensions, product tolerances and{" "}
            <Link to="/facing-bricks/mortar">mortar colour</Link>.
          </p>
          <div className="actions">
            <a
              className="btn btn-primary"
              href={JOINT_APP_URL}
              onClick={event => onExploreClick(event, JOINT_APP_URL)}
            >
              Trial joint size in Bricktextures
            </a>
            <Link className="btn btn-secondary" to="/facing-bricks/bonds">
              Brick bonds
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
