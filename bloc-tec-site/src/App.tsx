import { FormEvent, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";

const APP_ENTRY_URL = "https://app.bloc-tec.com/account/demo/";
const BRICK_TEXTURES_URL = "https://bricktextures.com";

function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <Link className="brand" to="/">
          BLOC-TEC
          <span>by Paver Picker Ltd</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/for-manufacturers">For Manufacturers</NavLink>
          <NavLink to="/integration">Integration</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [websiteField, setWebsiteField] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (websiteField.trim()) return;

    if (message.trim().length < 20) {
      setError("Please provide a little more detail so we can route your enquiry correctly.");
      return;
    }

    setError("");
    const subject = "BLOC-TEC contact enquiry";
    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      "",
      "Message:",
      message
    ].join("\n");

    window.location.href = `mailto:info@bloc-tec.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label>
        Name
        <input value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        Company
        <input value={company} onChange={e => setCompany(e.target.value)} required />
      </label>
      <label>
        Work email
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Message
        <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} required />
      </label>
      <label className="honeypot-field" aria-hidden="true" tabIndex={-1}>
        Website
        <input
          value={websiteField}
          onChange={e => setWebsiteField(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <button className="btn btn-primary" type="submit">
        Send enquiry
      </button>
    </form>
  );
}

function HomePage() {
  return (
    <main id="top">
      <section className="hero">
        <div className="container">
          <p className="eyebrow">BLOC-TEC</p>
          <h1>Digital tools for real brick and paving product experiences.</h1>
          <p className="lead">
            BLOC-TEC develops software workflows for product discovery, configuration, blending, and
            texture-ready outputs across the built environment sector.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href={APP_ENTRY_URL} target="_blank" rel="noreferrer">
              Open app
            </a>
            <a className="btn btn-secondary" href={BRICK_TEXTURES_URL} target="_blank" rel="noreferrer">
              Visit Brick Textures
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container grid two">
          <article className="card">
            <h2>What we do</h2>
            <p>
              We help manufacturers and specifiers present products with greater clarity using visual
              software tools rather than static image collections.
            </p>
          </article>
          <article className="card">
            <h2>Where Brick Textures fits</h2>
            <p>
              Brick Textures is the market-facing vault experience. It supports category-led entry
              and manufacturer onboarding as part of the wider BLOC-TEC product ecosystem.
            </p>
          </article>
        </div>
      </section>

      <section id="app" className="section section-alt">
        <div className="container card">
          <h2>App access</h2>
          <p>
            Use the app to explore products, configure layouts, test blend options, and generate
            texture-ready outputs.
          </p>
          <a className="btn btn-primary" href={APP_ENTRY_URL} target="_blank" rel="noreferrer">
            Open app access
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2>Integration and implementation</h2>
          <p>
            Integration information is now on a dedicated page so we can provide fuller setup
            guidance and release notes over time.
          </p>
          <NavLink className="btn btn-secondary" to="/integration">
            View integration page
          </NavLink>
        </div>
      </section>

      <section id="contact" className="section cta-band">
        <div className="container">
          <h2>Work with BLOC-TEC</h2>
          <p>
            For business, platform, or integration enquiries, contact us directly and we will route
            your request to the right team.
          </p>
          <a className="btn btn-secondary" href="mailto:info@bloc-tec.com">
            Contact BLOC-TEC
          </a>
        </div>
      </section>
    </main>
  );
}

function IntegrationPage() {
  return (
    <main className="section">
      <div className="container page-header">
        <p className="eyebrow">Integration</p>
        <h1>Integration and implementation</h1>
        <p className="lead">
          This page is designed to hold detailed integration documentation as it is released.
        </p>
      </div>

      <div className="container grid two">
        <article className="card">
          <h2>Current status</h2>
          <p>
            Integration guidance is managed through BLOC-TEC business channels while implementation
            workflows are refined.
          </p>
        </article>
        <article className="card">
          <h2>Planned content</h2>
          <p>
            We will add setup paths, technical references, onboarding steps, and version-specific
            integration notes here.
          </p>
        </article>
      </div>

      <section className="section">
        <div className="container card">
          <h2>Need integration support now?</h2>
          <p>
            Contact us and include your website/platform context so we can route your request quickly.
          </p>
          <a className="btn btn-primary" href="mailto:info@bloc-tec.com">
            Email info@bloc-tec.com
          </a>
        </div>
      </section>
    </main>
  );
}

function ManufacturersPage() {
  return (
    <main className="section">
      <div className="container page-header">
        <p className="eyebrow">For Manufacturers</p>
        <h1>Showcase your product range with accuracy, consistency, and impact.</h1>
        <p className="lead">
          BLOC-TEC helps manufacturers improve digital product presentation while reaching specifiers
          and buyers through the Brick Textures vault.
        </p>
      </div>

      <div className="container grid two">
        <article className="card">
          <h2>1) Free vault inclusion</h2>
          <p>
            Inclusion can be free where suitable imagery and product data are supplied, and
            onboarding capacity allows.
          </p>
          <p>
            Free inclusion does not include rights to use Brick Textures assets or interactive tools
            on your own website.
          </p>
        </article>
        <article className="card">
          <h2>2) Assisted onboarding</h2>
          <p>
            If additional preparation, review, or photography support is needed, we provide assisted
            onboarding as a paid service.
          </p>
          <p>
            This helps maintain quality while supporting manufacturers at different stages of
            readiness.
          </p>
        </article>
      </div>

      <div className="container grid two">
        <article className="card">
          <h2>3) Website use and modules</h2>
          <p>
            Manufacturers who want Brick Textures experiences on their own website can access this
            through a paid commercial package.
          </p>
          <p>
            Modules such as blending and textures can be shown in the vault, but become paid add-ons
            for manufacturer website use.
          </p>
        </article>
        <article className="card">
          <h2>4) Commercial transparency</h2>
          <p>
            At launch we explain the model clearly without publishing full public prices. Pricing
            transparency will be expanded post-launch once packages are validated.
          </p>
          <p>In simple terms: vault inclusion can be free; website use is paid.</p>
        </article>
      </div>

      <section className="section">
        <div className="container card">
          <h2>Interested in featuring your products?</h2>
          <p>
            Tell us about your range and we can advise the best route: self-supplied inclusion,
            assisted onboarding, or website commercial packages.
          </p>
          <NavLink className="btn btn-primary" to="/contact">
            Contact BLOC-TEC
          </NavLink>
        </div>
      </section>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="section">
      <div className="container page-header">
        <p className="eyebrow">Contact</p>
        <h1>Contact BLOC-TEC</h1>
        <p className="lead">
          For business, platform, and manufacturer enquiries, send us a message and we will route it
          to the right team.
        </p>
      </div>

      <div className="container grid two">
        <article className="card">
          <h2>Send an enquiry</h2>
          <ContactForm />
        </article>
        <article className="card">
          <h2>Location</h2>
          <address className="location-block">
            Ballinamona
            <br />
            Glanworth
            <br />
            County Cork
            <br />
            P51 C9Y7
            <br />
            Ireland
          </address>
          <p>
            Email: <a href="mailto:info@bloc-tec.com">info@bloc-tec.com</a>
          </p>
        </article>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>BLOC-TEC by Paver Picker Ltd</p>
        <p>
          <a href={BRICK_TEXTURES_URL} target="_blank" rel="noreferrer">
            bricktextures.com
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
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/for-manufacturers" element={<ManufacturersPage />} />
          <Route path="/integration" element={<IntegrationPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
