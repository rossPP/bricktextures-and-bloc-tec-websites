import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import conceptToRealityHero from "../../bloc-tec-site/public/images/conceptToRealityHero.webp";
import './App.css'

const BRICKTEXTURES_APP_URL = "/app/facing-bricks";
const BLOC_TEC_CONTACT_URL = "https://bloc-tec.com/for-manufacturers";
const GENERAL_CONTACT_EMAIL = "info@bloc-tec.com";
const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";
const APPEARANCE_ROUTES = [
  {
    label: "Red and orange bricks",
    description: "Explore warm reds, oranges and mixed tones.",
    url: "/app/facing-bricks?filterColour=Red-Orange",
    tone: "red-orange",
  },
  {
    label: "Buff bricks",
    description: "Browse cream, yellow and light buff options.",
    url: "/app/facing-bricks?filterColour=Buff",
    tone: "buff",
  },
  {
    label: "Brown bricks",
    description: "Compare earthy brown and deeper natural tones.",
    url: "/app/facing-bricks?filterColour=Brown",
    tone: "brown",
  },
  {
    label: "Grey, black and white bricks",
    description: "Find pale neutrals, greys and dark bricks.",
    url: "/app/facing-bricks?filterColour=Black-White",
    tone: "neutral",
  },
] as const;
const CONTACT_REASONS = [
  "Feature request",
  "Existing feature improvement",
  "Feedback on how the platform works",
  "Manufacturer enquiry",
  "Bug report",
  "Other",
] as const;

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 2.25L7.75 6L4 9.75"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const VISITOR_ROLES = [
  "Architect",
  "Game Developer",
  "3D Artist",
  "Interior Designer",
  "Manufacturer",
  "Brick Reseller / Merchant",
  "Other"
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

function getStoredRole() {
  if (typeof window === "undefined") {
    return { selectedRole: "", otherRole: "" };
  }

  const savedRole = localStorage.getItem(VISITOR_ROLE_STORAGE_KEY)?.trim() ?? "";
  if (!savedRole) {
    return { selectedRole: "", otherRole: "" };
  }

  if (VISITOR_ROLES.includes(savedRole as (typeof VISITOR_ROLES)[number])) {
    return { selectedRole: savedRole, otherRole: "" };
  }

  return { selectedRole: "Other", otherRole: savedRole };
}

function buildMailtoHref({
  name,
  email,
  role,
  reason,
  subject,
  message,
}: {
  name: string;
  email: string;
  role: string;
  reason: string;
  subject: string;
  message: string;
}) {
  const mailSubject = `Brick Textures enquiry: ${reason}${subject ? ` - ${subject}` : ""}`;
  const bodyLines = [
    "Brick Textures contact enquiry",
    "",
    `Name: ${name || "Not provided"}`,
    `Email: ${email}`,
    `Role: ${role}`,
    `Reason: ${reason}`,
    subject ? `Subject: ${subject}` : "",
    "",
    "Message:",
    message,
  ].filter(Boolean);

  return `mailto:${GENERAL_CONTACT_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}

function getContactMessagePlaceholder(reason: string) {
  switch (reason) {
    case "Feature request":
      return "Tell us what feature you would like to see and how it would help your work.";
    case "Existing feature improvement":
      return "Tell us which feature could be improved and what would make it work better for you.";
    case "Feedback on how the platform works":
      return "Tell us what feels clear, what feels awkward, and what would improve the experience.";
    case "Bug report":
      return "Describe the problem, what you were doing just before it happened, and what you expected to happen instead.";
    case "Manufacturer enquiry":
      return "Tell us about your products, your goals, and what you would like to discuss.";
    case "Other":
      return "Tell us what you would like to contact us about.";
    default:
      return "Tell us how we can help.";
  }
}

function RouteTitleSync() {
  const location = useLocation();

  useEffect(() => {
    const pageMetaByPath: Record<string, { title: string; description: string }> = {
      "/": {
        title: "Find and Compare Facing Bricks | Bricktextures",
        description:
          "Explore and compare real UK and Ireland facing bricks using consistent seamless textures, mortar colours and bond layouts.",
      },
      "/manufacturers": {
        title: "For Manufacturers | Brick Textures by BLOC-TEC",
        description:
          "See how manufacturers can deploy a dedicated Brick Textures experience with their own catalogue, branding, and configuration options.",
      },
      "/contact": {
        title: "Contact | Brick Textures by BLOC-TEC",
        description:
          "Contact Brick Textures to share product feedback, report issues, request features, or discuss manufacturer deployment options.",
      },
      "/faq": {
        title: "FAQ | Brick Textures by BLOC-TEC",
        description:
          "Read frequently asked questions about Brick Textures, who it is for, and how architects and manufacturers use the platform.",
      },
    };

    const defaultMeta = pageMetaByPath["/"];
    const pageMeta = pageMetaByPath[location.pathname] ?? defaultMeta;
    const canonicalUrl = `https://bricktextures.com${location.pathname === "/" ? "/" : location.pathname}`;

    document.title = pageMeta.title;

    const setMetaTag = (selector: string, content: string, attributeName: "name" | "property", attributeValue: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute("content", content);
        return;
      }

      const meta = document.createElement("meta");
      meta.setAttribute(attributeName, attributeValue);
      meta.setAttribute("content", content);
      document.head.appendChild(meta);
    };

    setMetaTag('meta[name="description"]', pageMeta.description, "name", "description");
    setMetaTag('meta[property="og:title"]', pageMeta.title, "property", "og:title");
    setMetaTag('meta[property="og:description"]', pageMeta.description, "property", "og:description");
    setMetaTag('meta[property="og:url"]', canonicalUrl, "property", "og:url");
    setMetaTag('meta[property="og:image"]', new URL(conceptToRealityHero, window.location.origin).href, "property", "og:image");
    setMetaTag('meta[name="twitter:title"]', pageMeta.title, "name", "twitter:title");
    setMetaTag('meta[name="twitter:description"]', pageMeta.description, "name", "twitter:description");
    setMetaTag('meta[name="twitter:image"]', new URL(conceptToRealityHero, window.location.origin).href, "name", "twitter:image");

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", canonicalUrl);
    }
  }, [location.pathname]);

  return null;
}

function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <Link className="brand" to="/">
          Brick Textures
          <span>by BLOC-TEC</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
        </nav>
      </div>
    </header>
  );
}

function HomePage() {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [pendingCategoryUrl, setPendingCategoryUrl] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [roleOptions, setRoleOptions] = useState<string[]>(buildRoleOptions());

  const launchCategory = (url: string) => {
    window.location.assign(url);
  };

  const onCategoryClick = (event: MouseEvent<HTMLAnchorElement>, url: string) => {
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

  return (
    <>
      <section className="hero">
        <div className="container hero-center">
          <p className="eyebrow">Facing brick selection for architects</p>
          <h1>Find the right brick.</h1>
          <p className="lead">
            Explore and compare real facing bricks in one place, using consistent textures, mortar
            colours and bond layouts before you specify.
          </p>
          <div className="hero-cta-wrap">
            <a
              className="hero-cta"
              href={BRICKTEXTURES_APP_URL}
              onClick={event => onCategoryClick(event, BRICKTEXTURES_APP_URL)}
            >
              <span>Explore bricks</span>
              <ChevronIcon className="hero-cta-arrow" />
            </a>
          </div>
          <p className="hero-subline">
            Free for architects, designers, builders and homeowners.
          </p>
        </div>
      </section>

      <section className="section section-alt appearance-section">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">Start by appearance</p>
            <h2>Explore facing bricks by colour</h2>
            <p>
              Begin with the look you have in mind, then narrow the results inside Bricktextures.
            </p>
          </div>
          <div className="appearance-grid">
            {APPEARANCE_ROUTES.map(route => (
              <a
                className="appearance-card"
                href={route.url}
                key={route.label}
                onClick={event => onCategoryClick(event, route.url)}
              >
                <span className={`appearance-swatch appearance-swatch-${route.tone}`} aria-hidden="true" />
                <span className="appearance-card-copy">
                  <strong>{route.label}</strong>
                  <span>{route.description}</span>
                </span>
                <ChevronIcon className="appearance-card-arrow" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section why-bricktextures-section">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">Why use Bricktextures?</p>
            <h2>Compare bricks more fairly</h2>
            <p>
              Choosing bricks across different websites makes fair comparison difficult.
              Bricktextures presents real products from multiple manufacturers in one consistent
              visual environment, making their differences easier to judge.
            </p>
          </div>
          <div className="why-bricktextures-grid">
            <article>
              <h3>Compare like for like</h3>
              <p>Review bricks using consistent scale, lighting and presentation.</p>
            </article>
            <article>
              <h3>Use the same visual context</h3>
              <p>Apply consistent mortar colours and brick bonds while reviewing your options.</p>
            </article>
            <article>
              <h3>Make an informed shortlist</h3>
              <p>
                Identify real products worth investigating before requesting physical samples.
              </p>
            </article>
          </div>
        </div>
      </section>

      {isRoleModalOpen ? (
        <div className="modal-overlay" role="presentation" onClick={onCloseRoleModal}>
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

function FaqPage() {
  return (
    <section className="section">
      <div className="container page-header">
        <p className="eyebrow">FAQ</p>
        <h1>Frequently asked questions</h1>
      </div>

      <div className="container grid">
        <article className="card">
          <h2>What is the purpose of Brick Textures, and who is it for?</h2>
          <p>
            Brick Textures is a live product presentation environment used to gather UI feedback as we
            continue refining the experience. It is also our showcase for manufacturers, demonstrating
            what can be achieved on their own websites. It supports architects, designers, and other users
            who need realistic product visuals, configuration and blending tools, and texture exports.
          </p>
        </article>
        <article className="card">
          <h2>Can manufacturers have a private version on their own website?</h2>
          <p>
            Yes. Manufacturers can deploy a dedicated BLOC-TEC experience on their own website with
            their own product catalogue only.
            <br />
            See{" "}
            <a className="inline-link" href="https://bloc-tec.com/for-manufacturers" target="_blank" rel="noreferrer">
              bloc-tec.com/for-manufacturers
            </a>{" "}
            for details.
          </p>
        </article>
        <article className="card">
          <h2>Can I buy products directly from Brick Textures?</h2>
          <p>
            No, Brick Textures helps users discover and evaluate products, but does not directly sell
            products. The platform features real UK and Ireland market products, and purchasing is handled by
            the relevant manufacturer or supplier.
          </p>
        </article>
      </div>
    </section>
  );
}

function ContactPage() {
  const storedRole = getStoredRole();
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState(storedRole.selectedRole === "Other" ? storedRole.otherRole : "");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const roleValue = selectedRole === "Other" ? otherRole.trim() : selectedRole;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!roleValue || !email.trim() || !message.trim()) {
      setError("Please tell us who you are, how to contact you, and what you need.");
      return;
    }

    if (!reason) {
      setError("Please select a reason for contacting us.");
      return;
    }

    localStorage.setItem(VISITOR_ROLE_STORAGE_KEY, roleValue);
    setError("");
    window.location.href = buildMailtoHref({
      name: "",
      email: email.trim(),
      role: roleValue,
      reason,
      subject: subject.trim(),
      message: message.trim(),
    });
  };

  return (
    <>
      <section className="section">
        <div className="container page-header">
          <p className="eyebrow">Contact</p>
          <h1>Tell us who you are and how we can help.</h1>
          <p className="lead contact-lead">
            Brick Textures is an experimental environment for viewing, configuring, and testing real
            products. Use this page to tell us who you are, what you need, and how we can improve it
            for users and for the manufacturers we support.
          </p>
        </div>

        <div className="container grid two">
          <article className="card manufacturer-value-card">
            <h2>Why your feedback matters</h2>
            <p className="contact-supporting-copy">
              Whether you are an architect, designer, manufacturer, game developer, or another user,
              a little context helps us understand what matters most and where the platform should go next.
            </p>
            <p className="contact-supporting-copy">
              We want people to look closely at the platform, test it properly, and tell us what works,
              what feels missing, and what would make it more useful in real projects. When we see the
              same feedback coming through from multiple users, we treat that as a strong signal for what
              to improve and integrate next.
            </p>
          </article>

          <article className="card manufacturer-value-card">
            <h2>What we would love to hear about</h2>
            <ul className="benefit-list">
              <li>Suggesting features, exports, or configuration improvements</li>
              <li>Highlighting product data, image, or presentation issues</li>
              <li>Requesting tools for design, visualisation, or games workflows</li>
              <li>Asking about manufacturer participation or dedicated deployments</li>
              <li>Sharing any other feedback that would help shape the platform</li>
              <li>Reporting bugs, errors, or workflow issues</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <article className="card manufacturer-value-card">
            <h2>How can we help?</h2>
            <p className="manufacturer-note">
              Use the form to contact us at{" "}
              <a className="inline-link" href={`mailto:${GENERAL_CONTACT_EMAIL}`}>{GENERAL_CONTACT_EMAIL}</a>{" "}
              and shape the future of our service.
            </p>
            <form className="contact-form" onSubmit={onSubmit}>
              <label>
                Who are you?
                <select value={selectedRole} onChange={event => setSelectedRole(event.target.value)}>
                  <option value="">Select your role</option>
                  {VISITOR_ROLES.map(role => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>

              {selectedRole === "Other" ? (
                <label>
                  Please tell us your role
                  <input
                    value={otherRole}
                    onChange={event => setOtherRole(event.target.value)}
                    placeholder="Your role"
                  />
                </label>
              ) : null}

              <label>
                Your email
                <input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Why are you contacting us?
                <select value={reason} onChange={event => setReason(event.target.value)}>
                  <option value="">Select a reason</option>
                  {CONTACT_REASONS.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              {reason === "Bug report" ? (
                <p className="contact-supporting-copy">
                  If you are reporting a problem, it helps to include the product, page, device, and
                  what happened just before the issue appeared.
                </p>
              ) : null}

              <label>
                Subject
                <input
                  value={subject}
                  onChange={event => setSubject(event.target.value)}
                  placeholder="Short summary"
                />
              </label>

              <label>
                Message
                <textarea
                  rows={7}
                  value={message}
                  onChange={event => setMessage(event.target.value)}
                  placeholder={getContactMessagePlaceholder(reason)}
                />
              </label>

              {error ? <p className="form-error">{error}</p> : null}

              <div className="actions">
                <button className="btn btn-primary" type="submit">
                  Draft email to BLOC-TEC
                </button>
              </div>
            </form>
          </article>
        </div>
      </section>
    </>
  );
}

function ManufacturersPage() {
  return (
    <>
      <section className="section">
        <div className="container page-header">
          <p className="eyebrow">Manufacturers</p>
          <h1>Make beautiful brick ranges stand out digitally.</h1>
        </div>

        <div className="container manufacturer-value-stack">
          <article className="card manufacturer-value-card">
            <h2>Bring your products to Brick Textures</h2>
            <p>
              You've invested significant time and energy in product
              development and production. We can help you
              make sure that effort is seen by creating a strong digital
              presentation, ensuring your products are noticed and selected for use.
            </p>
            <ul className="benefit-list">
              <li>Clear product presentation</li>
              <li>Give architects the configuration tools they expect</li>
              <li>Give architects the confidence to specify your products</li>
            </ul>
          </article>

          <article className="card manufacturer-value-card">
            <h2>Dedicated website deployment</h2>
            <p>
              Run a dedicated BLOC-TEC experience on your own website, shaped around your own
              product catalogue, colour scheme, configuration preferences, and scenes that suit your
              target market.
            </p>
            <ul className="benefit-list">
              <li>Your own website and domain experience</li>
              <li>Your own product catalogue only, with no competitor products shown</li>
              <li>Optional modules to suit your needs</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <article className="card">
            <h2>Learn more about our manufacturer service</h2>
            <p>
              For more information on how we work with manufacturers, visit the main BLOC-TEC website,
              where we focus specifically on helping manufacturers present their products digitally.
            </p>
            <div className="actions">
              <a className="btn btn-primary" href={BLOC_TEC_CONTACT_URL} target="_blank" rel="noreferrer">
                Visit the BLOC-TEC manufacturers page
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-bottom">
        <p className="footer-company-meta">
          © {currentYear} Paver Picker Ltd trading as BLOC-TEC | Registered in Ireland | Company No. 604066
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="site-shell">
        <RouteTitleSync />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/manufacturers" element={<ManufacturersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
