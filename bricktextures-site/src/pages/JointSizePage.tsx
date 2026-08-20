import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { GuideImagePlaceholder } from "../components/GuideImagePlaceholder";
import traditional14mmJoint from "../assets/joint-sizes/traditional-brick-14mm-joint.webp";
import linearGluedJoint from "../assets/joint-sizes/linear-brick-glued-tight-joint.webp";
import stretcherHeaderModule from "../assets/joint-sizes/two-headers-one-stretcher-10mm-joint.webp";

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
          "When to tighten or widen facing brick joints — thin and glued joints, wider traditional beds, and how that affects bond and appearance.",
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
            Most facing brickwork starts from a 10&nbsp;mm joint. This page is about when to leave
            that default — tighter for a sharp, linear reading, or wider for traditional character —
            and what else that decision changes.
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
                <a href="#when-to-change">When to change from 10&nbsp;mm</a>
              </li>
              <li>
                <a href="#tight-joints">Tighter and glued joints</a>
              </li>
              <li>
                <a href="#wider-joints">Wider joints</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <section id="when-to-change" className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Starting point</p>
          <h2>When to change from 10&nbsp;mm</h2>
          <p>
            A typical mortar joint for facing brickwork is about 10&nbsp;mm. On site it will vary a
            little — clay bricks especially can sit a few millimetres either side of nominal size —
            but joints usually average near 10&nbsp;mm. That average keeps{" "}
            <Link to="/facing-bricks/format/standard">standard 215 × 65 mm bricks</Link> on a
            familiar 75&nbsp;mm course module (65&nbsp;mm brick + 10&nbsp;mm joint).
          </p>
          <p>
            With a 10&nbsp;mm joint, one stretcher equals two headers. That is why half-bond and many
            familiar header-and-stretcher patterns work cleanly with the metric brick. Sensible
            setting-out works with that module: window and door openings are positioned so courses
            and openings meet on whole bricks wherever possible. That reduces cutting for the
            bricklayer and usually looks cleaner. See also{" "}
            <Link to="/facing-bricks/bonds">brick bonds</Link>.
          </p>
          <GuideImagePlaceholder
            label="Two headers plus a 10 mm joint equal one stretcher"
            caption="With a 10 mm joint: 102.5 + 10 + 102.5 = 215 mm — two headers equal one stretcher."
            src={stretcherHeaderModule}
            ratio="natural"
            wide
          />
          <p>
            Keep 10&nbsp;mm as the starting point unless the brick, the look you want, or the bond
            pattern asks for something else. Change the joint when you want less or more mortar on
            the face, when the brick’s size tolerance needs a different bed, or when a thinner joint
            is needed to keep long or precise units reading as sharp lines. Always review the bond
            and openings again after you change width — the joint is part of the module.
          </p>
        </div>
      </section>

      <section id="tight-joints" className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Tighter joints</p>
          <h2>When a tighter joint can work</h2>
          <p>
            Tighter joints suit bricks with low size tolerance — for example wirecut, glazed or many
            concrete facing bricks. With sand-cement mortar, the aggregate must be fine enough for
            the joint: as a guide, keep the joint about 2.5 times the largest grain size so the
            mortar spreads cleanly and the bricklayer can still bed the units at a practical pace.
          </p>
          <p>
            Glued brickwork is used where you want a tight wall with almost no visible mortar, so
            the brick colour itself carries the elevation. It can be used inside and outside.
            Adhesive is usually introduced between the units — often as a slurry pumped into the
            joints — and the bricks are bedded into place. The method suits wirecut bricks and other
            products with flat, straight edges, because those faces bond reliably with the adhesive.
          </p>
          <p>
            Joint widths typically start around 2&nbsp;mm and may extend toward 6&nbsp;mm depending
            on the system. Different manufacturers supply their own adhesives, but the finished
            appearance is usually similar. With the right brick, glued construction can also
            simplify jointing on site. Follow the supplier’s instructions, including face protection
            for pumped or slurry systems.
          </p>
          <p>
            On long linear bricks, a glued or thin joint keeps the edges of each unit visible and
            strengthens the horizontal line the format is chosen for. Compare a glued joint with
            conventional mortar on the same brick in Bricktextures before you decide.
          </p>
          <GuideImagePlaceholder
            label="Linear brick with glued thin joints"
            caption="Close-up of linear brickwork with very tight glued joints. The fine joints leave the edges of each unit clear, so the long horizontal courses read strongly."
            src={linearGluedJoint}
            ratio="natural"
            wide
          />
        </div>
      </section>

      <section id="wider-joints" className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Wider joints</p>
          <h2>Wider joints and traditional character</h2>
          <p>
            Wider joints suit tumbled, sand-released, creased and handmade bricks. They absorb size
            variation and put more mortar on the face, which softens the wall and suits older or
            rural character. Check that the width, profile and mix remain suitable for exposure and
            workmanship.
          </p>
          <p>
            On metric bricks, moving away from 10&nbsp;mm can stop stretcher and header patterns
            lining up cleanly — with a 10&nbsp;mm joint one stretcher equals two headers, and that
            fit depends on joint width as well as brick size. Try the bond and joint together before
            fixing the design.
          </p>
          <GuideImagePlaceholder
            label="Traditional brick with a 14 mm mortar joint"
            caption="Traditional tumbled brickwork with a deliberately wider 14 mm joint. More of the wall is given over to the light mortar than with a standard 10 mm bed."
            src={traditional14mmJoint}
            ratio="natural"
            wide
          />
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-closing">
          <p className="eyebrow">In Bricktextures</p>
          <h2>Pick joint size while you compare</h2>
          <p>
            Compare joint widths in the same light and bond, then check the chosen width against the
            brick size and{" "}
            <Link to="/facing-bricks/mortar">mortar colour</Link>. For the metric brick itself, see{" "}
            <Link to="/facing-bricks/format/standard">standard size</Link>.
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
