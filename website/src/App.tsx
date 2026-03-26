import { MouseEvent, useEffect, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import './App.css'

const VAULT_FACING_BRICKS_URL = "https://app.bloc-tec.com/account/demo/";
const BLOC_TEC_CONTACT_URL = "https://bloc-tec.com/for-manufacturers";
const VISITOR_ROLE_STORAGE_KEY = "bt_visitor_role";

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

  const onContinueToVault = () => {
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
          <p className="eyebrow">Brick Textures by BLOC-TEC</p>
          <h1>Explore, configure, blend, and download textures in one Vault.</h1>
          <p className="lead">
            Brick Textures is software for exploring real products, testing design configurations,
            creating blends, and preparing texture-ready outputs. Enter
            the Brick Textures Vault and explore real products for your project.
          </p>
          <p className="vault-subline">All products. All bonds. All mortars. All seamless.</p>
          <div className="category-grid hero-category-grid">
            <a
              className="category-tile"
              href={VAULT_FACING_BRICKS_URL}
              target="_blank"
              rel="noreferrer"
              onClick={event => onCategoryClick(event, VAULT_FACING_BRICKS_URL)}
            >
              <span>Texture Vault</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid two">
          <article className="card">
            <h2>More than a product collection</h2>
            <p>
              Brick Textures combines real products with software tools that support design,
              configuration, and specification workflows.
            </p>
          </article>
          <article className="card">
            <h2>Built for clarity and control</h2>
            <p>
              Compare options, try different bonds and mortars, blend products, and move from concept to confident
              decisions faster.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>What you can expect from the Vault</h2>
          <ul className="benefit-list">
            <li>A growing catalogue across major manufacturers</li>
            <li>Consistent swatches and clearer product visuals</li>
            <li>Flexible configuration that supports practical design workflows</li>
            <li>Texture-ready outputs for downstream creative use</li>
            <li>Mobile-friendly browsing with full-page Vault access</li>
          </ul>
        </div>
      </section>

      {isRoleModalOpen ? (
        <div className="modal-overlay" role="presentation" onClick={onCloseRoleModal}>
          <div className="role-modal card" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <h2>Help us improve your Vault experience</h2>
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
                onClick={onContinueToVault}
              >
                Continue to Vault
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
            products. Please contact the relevant manufacturer or supplier for purchasing.
          </p>
        </article>
        <article className="card">
          <h2>Who is this Vault for?</h2>
          <p>
            The Vault supports architects, designers, and other users who
            need realistic product visuals, configurations, blends, and texture-ready outputs.
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
          <h2>How does manufacturer pricing work for the Vault?</h2>
          <p>
            Vault inclusion is based on onboarding and setup costs for the work required to add and
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
          <h1>Bring your products to the Vault</h1>
          <p>
            Start with inclusion in the public Brick Textures Vault, then scale to a dedicated
            deployment on your own website when you are ready.
          </p>
        </div>

        <div className="container grid two">
          <article className="card">
            <h2>Public Vault inclusion</h2>
            <p>
              Include suitable product ranges in the public Brick Textures Vault to help users
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
            <p>See full onboarding and commercial details on bloc-tec.com.</p>
            <div className="actions">
              <a className="btn btn-primary" href={BLOC_TEC_CONTACT_URL} target="_blank" rel="noreferrer">
                Continue to the bloc-tec.com manufacturers page
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>Brick Textures by BLOC-TEC</p>
        <p>Paver Picker Ltd</p>
        <p>
          <a href="https://bloc-tec.com" target="_blank" rel="noreferrer">
            Visit bloc-tec.com
          </a>
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
