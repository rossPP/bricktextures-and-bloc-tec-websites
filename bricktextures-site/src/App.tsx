import { MouseEvent, useEffect, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import conceptToRealityHero from "../../bloc-tec-site/public/images/conceptToRealityHero.webp";
import { demoStats } from "./generated/demoStats";
import './App.css'

const VAULT_FACING_BRICKS_URL = "https://app.bloc-tec.com/account/demo/";
const BLOC_TEC_CONTACT_URL = "https://bloc-tec.com/for-manufacturers";
const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";
const COUNT_FORMATTER = new Intl.NumberFormat("en-GB");

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

function RouteTitleSync() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Brick Textures by BLOC-TEC";
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
          <NavLink to="/">Home</NavLink>
          <NavLink to="/manufacturers">Manufacturers</NavLink>
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
    window.open(url, "_blank", "noopener,noreferrer");
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

  const formatCount = (value: number) => COUNT_FORMATTER.format(value);

  return (
    <>
      <section className="hero">
        <div className="container hero-center">
          <p className="eyebrow">Brick Textures by BLOC-TEC</p>
          <h1>Find. Configure. Blend.</h1>
          <p className="lead">
            One source for architects and designers to find real UK and Ireland facing bricks, configure
            them in different bonds and mortars, create blends, and use them in live projects.
          </p>
          <div className="hero-proof-band">
            <p className="hero-proof-line">
              Every brick is professionally photographed under controlled lighting conditions to provide accurate comparisons.
            </p>
            <div className="hero-stats-grid" aria-label="Current demo account statistics">
              <article className="hero-stat-pill">
                <strong>{formatCount(demoStats.manufacturers)}</strong>
                <span>manufacturers</span>
              </article>
              <article className="hero-stat-pill">
                <strong>{formatCount(demoStats.colourOptions)}</strong>
                <span>product colours</span>
              </article>
              <article className="hero-stat-pill">
                <strong>{formatCount(demoStats.capturedImages)}</strong>
                <span>captured images</span>
              </article>
            </div>
          </div>
          <p className="hero-subline">Real products. Flexible options. Ready for design work.</p>
          <div className="hero-cta-wrap">
            <a
              className="hero-cta"
              href={VAULT_FACING_BRICKS_URL}
              target="_blank"
              rel="noreferrer"
              onClick={event => onCategoryClick(event, VAULT_FACING_BRICKS_URL)}
            >
              <span>Explore Bricks</span>
              <ChevronIcon className="hero-cta-arrow" />
            </a>
          </div>
        </div>
      </section>

      <section className="hero-visual-section" aria-label="Brick textures workflow preview">
        <div className="container hero-workflow">
          <div className="workflow-steps" aria-label="Configure blend and export workflow">
            <div className="workflow-step">
              <p className="workflow-step-title">Configure</p>
              <p className="workflow-step-copy">Try different bonds and mortar colours.</p>
            </div>
            <ChevronIcon className="workflow-step-arrow" />
            <div className="workflow-step">
              <p className="workflow-step-title">Blend</p>
              <p className="workflow-step-copy">Create blends to suit your colour scheme.</p>
            </div>
            <ChevronIcon className="workflow-step-arrow" />
            <div className="workflow-step">
              <p className="workflow-step-title">Export</p>
              <p className="workflow-step-copy">Download textures ready for your project.</p>
            </div>
          </div>
          <div className="hero-visual-frame">
            <img
              className="hero-visual-image"
              src={conceptToRealityHero}
              alt="Brick design and visualisation preview"
            />
          </div>
          <p className="workflow-note">
            Brick Textures is our development and testing environment for new software ideas before
            features are rolled into manufacturer-linked accounts.
          </p>
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
          <h2>Can I buy products directly from Brick Textures?</h2>
          <p>
            Brick Textures helps users discover and evaluate products, but does not directly sell
            products. The platform features real UK and Ireland market products, and purchasing is handled by
            the relevant manufacturer or supplier.
          </p>
        </article>
        <article className="card">
          <h2>Who is this for?</h2>
          <p>
            Brick Textures supports architects, designers, and other users who
            need realistic product visuals, configuration and blending tools, and texture exports as the final output.
          </p>
        </article>
        <article className="card">
          <h2>Can manufacturers have a private version on their own website?</h2>
          <p>
            Yes. Manufacturers can deploy a dedicated BLOC-TEC experience on their own website with
            their own product catalogue only. See{" "}
            <a className="inline-link" href="https://bloc-tec.com/for-manufacturers" target="_blank" rel="noreferrer">
              bloc-tec.com/for-manufacturers
            </a>{" "}
            for details.
          </p>
        </article>
        <article className="card">
          <h2>How does manufacturer pricing work?</h2>
          <p>
            Inclusion is based on onboarding and setup costs for the work required to add and
            prepare your products. Dedicated website deployment, optional modules, and additional
            services are priced separately.
          </p>
        </article>
      </div>
    </section>
  );
}

function ManufacturersPage() {
  return (
    <>
      <section className="section">
        <div className="container page-header">
          <p className="eyebrow">Manufacturers</p>
          <h1>Bring your products to Brick Textures</h1>
          <p>
            Start with inclusion in Brick Textures, then scale to a dedicated
            deployment on your own website when you are ready.
          </p>
        </div>

        <div className="container grid two">
          <article className="card">
            <h2>Public inclusion</h2>
            <p>
              Include suitable product ranges in Brick Textures to help users
              discover and evaluate your products.
            </p>
            <p>
              Inclusion is charged based on onboarding and setup work required to add and prepare
              your products.
            </p>
          </article>

          <article className="card">
            <h2>Dedicated website deployment</h2>
            <p>
              Run a dedicated BLOC-TEC experience on your own website with your own product
              catalogue only.
            </p>
            <ul className="benefit-list">
              <li>Your own website and domain experience</li>
              <li>Your own product catalogue only</li>
              <li>No competitor products shown in your deployment</li>
              <li>Optional modules and onboarding support</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <article className="card">
            <h2>Commercial and onboarding options</h2>
            <p>
              Our pricing model is simple and work-based.
            </p>
            <ul className="benefit-list">
              <li>Onboarding and setup costs based on scope of work required</li>
              <li>Paid upgrades for dedicated deployment, modules, and extra services</li>
            </ul>
            <p>
              Manufacturers can find out more about adding products to Brick Textures on the
              BLOC-TEC manufacturers page.
            </p>
            <div className="actions">
              <a className="btn btn-primary" href={BLOC_TEC_CONTACT_URL} target="_blank" rel="noreferrer">
                Find out more about adding your products
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
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
