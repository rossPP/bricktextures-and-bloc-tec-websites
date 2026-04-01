import { FormEvent, useState } from "react";
import {
  Call24Regular,
  Box24Regular,
  Globe24Regular,
  Link24Regular,
  CheckmarkCircle24Regular,
  Table24Regular
} from "@fluentui/react-icons";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";

const APP_ENTRY_URL = "https://app.bloc-tec.com/account/demo/";
const IBSTOCK_INTEGRATION_URL = APP_ENTRY_URL;
const TOBERMORE_INTEGRATION_URL = APP_ENTRY_URL;
const KINGSCOURT_INTEGRATION_URL = APP_ENTRY_URL;
const ACHESON_GLOVER_INTEGRATION_URL = APP_ENTRY_URL;
const IBSTOCK_APP_URL = APP_ENTRY_URL;
const TOBERMORE_APP_URL = APP_ENTRY_URL;
const KINGSCOURT_APP_URL = APP_ENTRY_URL;
const ACHESON_GLOVER_APP_URL = APP_ENTRY_URL;

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
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
      <div className="support-nav-wrap">
        <div className="container">
          <nav className="support-nav" aria-label="Support navigation">
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/integration">Developers</NavLink>
            <NavLink to="/scenes">Scenes</NavLink>
            <NavLink to="/product-samples">Product Samples</NavLink>
          </nav>
        </div>
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
          <h1>Digital tools for brick and paving specification</h1>
          <p className="lead">
          BLOC-TEC develops digital tools that help brick and paving manufacturers present products with clarity for confident specification decisions.
          </p>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <article className="card">
            <h2>What we do</h2>
            <div className="feature-list">
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Configuration workflows</h3>
                  <p>Bonds, joints, sizes, and layout logic built for real-world product use.</p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Workflow image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Product blending</h3>
                  <p>Explore mixed product compositions and compare practical outcomes quickly.</p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Workflow image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Texture-ready outputs</h3>
                  <p>Generate outputs for downstream design, rendering, and creative workflows.</p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Workflow image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Configuration sharing</h3>
                  <p>Share product configurations clearly with colleagues, stakeholders, and clients.</p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Workflow image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
            </div>
          </article>
        </div>
      </section>

      <section id="app" className="section section-alt">
        <div className="container">
          <article className="card">
            <h2>Who We Work With</h2>
            <p>
              BLOC-TEC supports both leading manufacturers and specialist producers with practical
              digital solutions for product presentation, specification, and sharing.
            </p>
            <p>
              Use the app links below to open each manufacturer&apos;s products directly in the
              BLOC-TEC app.
            </p>
            <div className="feature-list integration-list">
              <article className="feature-row">
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Client logo
                  <br />
                  Recommended: 900 x 300 (PNG/SVG)
                </div>
                <div className="feature-content">
                  <h3>Ibstock Brick</h3>
                  <p>
                    The UK&apos;s largest brick manufacturer. Integration focuses on presenting a broad
                    clay brick range through clear, interactive product workflows.
                  </p>
                  <div className="integration-actions">
                    <a className="btn btn-secondary" href={IBSTOCK_INTEGRATION_URL} target="_blank" rel="noreferrer">
                      View integration
                    </a>
                    <a className="btn btn-secondary" href={IBSTOCK_APP_URL} target="_blank" rel="noreferrer">
                      View products in app
                    </a>
                  </div>
                </div>
              </article>

              <article className="feature-row">
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Client logo
                  <br />
                  Recommended: 900 x 300 (PNG/SVG)
                </div>
                <div className="feature-content">
                  <h3>Tobermore Concrete</h3>
                  <p>
                    A leading Northern Ireland manufacturer of concrete paving and walling products.
                    Integration supports practical specification and product selection workflows.
                  </p>
                  <div className="integration-actions">
                    <a className="btn btn-secondary" href={TOBERMORE_INTEGRATION_URL} target="_blank" rel="noreferrer">
                      View integration
                    </a>
                    <a className="btn btn-secondary" href={TOBERMORE_APP_URL} target="_blank" rel="noreferrer">
                      View products in app
                    </a>
                  </div>
                </div>
              </article>

              <article className="feature-row">
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Client logo
                  <br />
                  Recommended: 900 x 300 (PNG/SVG)
                </div>
                <div className="feature-content">
                  <h3>Kingscourt Bricks</h3>
                  <p>
                    A long-established Irish clay brick manufacturer. Integration demonstrates that the
                    platform is effective for focused specialist ranges as well as large catalogues.
                  </p>
                  <div className="integration-actions">
                    <a className="btn btn-secondary" href={KINGSCOURT_INTEGRATION_URL} target="_blank" rel="noreferrer">
                      View integration
                    </a>
                    <a className="btn btn-secondary" href={KINGSCOURT_APP_URL} target="_blank" rel="noreferrer">
                      View products in app
                    </a>
                  </div>
                </div>
              </article>

              <article className="feature-row">
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Client logo
                  <br />
                  Recommended: 900 x 300 (PNG/SVG)
                </div>
                <div className="feature-content">
                  <h3>Acheson &amp; Glover</h3>
                  <p>
                    A well-established hard landscaping manufacturer. Integration highlights how
                    BLOC-TEC supports practical paving-focused product journeys and client-ready output.
                  </p>
                  <div className="integration-actions">
                    <a className="btn btn-secondary" href={ACHESON_GLOVER_INTEGRATION_URL} target="_blank" rel="noreferrer">
                      View integration
                    </a>
                    <a className="btn btn-secondary" href={ACHESON_GLOVER_APP_URL} target="_blank" rel="noreferrer">
                      View products in app
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </article>
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
        <h1>Integration into your website</h1>
        <p className="lead">
          Integration is configured around your account route, with options for embedded experiences,
          product-level links, and centrally managed swatches.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <article className="card">
            <h2>Integration methods</h2>
            <div className="feature-list">
              <article className="feature-row">
                <div className="feature-content">
                  <h3>1) Access model: standalone link or iframe embed</h3>
                  <p>
                    From the outset, BLOC-TEC can be used as a standalone link or embedded in an iframe.
                    In both cases, account access is route-based.
                  </p>
                  <p>
                    <code>your Account</code> is your assigned account route name.
                    <br />
                    <code>yourCategory</code> is the category path inside your account (for example,
                    Clay Facing Bricks).
                  </p>
                  <p>
                    Breakdown:
                    <br />
                    Account root: <code>/account/your Account</code>
                    <br />
                    Account category: <code>/account/your Account/yourCategory</code>
                    <br />
                    Product by name: <code>/account/your Account/yourCategory?viewProduct=Product Name</code>
                    <br />
                    Individual product by SKU: <code>/account/your Account/yourCategory?c=productCode</code>
                  </p>
                  <p>
                    Iframe sizing guidance: the app switches to mobile-style UI behavior around a 1024px
                    viewport trigger. For desktop-style controls, use a wider iframe where possible.
                    Recommended start point: <code>width: 100%</code> and <code>height: 900px</code>.
                  </p>
                  <p>
                    Iframe display behavior for logo and back buttons:
                    <br />
                    - In product-embed mode (<code>viewProduct</code>), viewer logo and viewer back
                    button are hidden automatically.
                    <br />
                    - You can explicitly hide viewer header controls with
                    <code> ?logo=false&amp;viewerBack=false</code>.
                    <br />
                    - Product-page back control can also be managed with
                    <code> ?prodBack=false</code> where needed.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Access route image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>

              <article className="feature-row">
                <div className="feature-content">
                  <h3>2) Blender module placement guidance</h3>
                  <p>
                    If Blender is enabled, we recommend hosting it on a dedicated page rather than on a
                    single product page.
                  </p>
                  <p>
                    Blender supports compatible product mixes across ranges, so placing it on one
                    product page can misrepresent how it is intended to be used.
                  </p>
                  <p>
                    You can still link into that dedicated Blender page from product pages with calls to
                    action such as "Blend this product".
                  </p>
                  <p>
                    <a href="https://example.com/integration/blender-page-example" target="_blank" rel="noreferrer">
                      Placeholder: view dedicated Blender page example
                    </a>
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Blender page image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>

              <article className="feature-row">
                <div className="feature-content">
                  <h3>3) Live swatches in your web pages</h3>
                  <p>
                    Swatches served from BLOC-TEC stay aligned with current blend definitions and
                    presentation rules. This keeps output consistent in scale, framing, and displayed
                    physical area so users can compare products with clear expectations.
                  </p>
                  <p>
                    Central hosting also helps us keep delivery aligned with current web standards and
                    quality controls.
                  </p>
                  <p>
                    <a href="https://example.com/integration/live-swatches" target="_blank" rel="noreferrer">
                      Placeholder: view swatch integration example
                    </a>
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Swatch integration image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>

              <article className="feature-row">
                <div className="feature-content">
                  <h3>4) Share button: embedded vs standalone</h3>
                  <p>
                    In standalone mode, Share creates direct app URLs. In iframe mode, Share requests a
                    host-page URL so users return to your website context instead of leaving to the app
                    domain.
                  </p>
                  <p>
                    Embedded share routing uses host-page messaging, and can store viewer configuration
                    under a single <code>bt</code> key for cleaner deep links.
                  </p>
                  <p>
                    Code and demo references:
                    <br />
                    <a href="https://app.bloc-tec.xyz/embed-test/" target="_blank" rel="noreferrer">
                      Embedded share demo page
                    </a>
                    <br />
                    <a href="https://app.bloc-tec.xyz/embed-test/embed-host.js" target="_blank" rel="noreferrer">
                      Host integration script (embed-host.js)
                    </a>
                    <br />
                    <a href="https://example.com/integration/share-integration-guide" target="_blank" rel="noreferrer">
                      Placeholder: full share integration guide
                    </a>
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Share behavior image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
            </div>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container card">
          <h2>Need integration support now?</h2>
          <p>
            Contact us with your account route, website context, and whether you need full collection
            embeds, product-targeted links, or live swatch delivery.
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
        <h1>Digital product presentation that supports sales and specification teams.</h1>
        <p className="lead">
          BLOC-TEC helps manufacturers present products consistently, support reseller channels, and
          deliver more interactive website experiences.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <article className="card">
            <h2>Why manufacturers use BLOC-TEC</h2>
            <div className="feature-list">
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Consistent product imagery</h3>
                  <p>
                    Keep image output consistent across ranges, finishes, and marketing channels so
                    products are shown clearly and reliably.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Manufacturer workflow image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Reseller-ready sharing</h3>
                  <p>
                    Share approved visuals and outputs with resellers and merchant teams so product
                    presentation stays aligned across the channel.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Channel sharing image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Interactive website embedding</h3>
                  <p>
                    Embed BLOC-TEC controls on your own website through iframe integration and deliver
                    a more useful product exploration experience.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Embedded controls image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Stronger client engagement</h3>
                  <p>
                    Help specifiers and buyers compare options with confidence and stay engaged for
                    longer during product evaluation.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Engagement outcome image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
            </div>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <article className="card">
            <h2>Where manufacturers use BLOC-TEC</h2>
            <div className="feature-list">
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Showrooms and specification spaces</h3>
                  <p>
                    Run BLOC-TEC in your showroom so visitors can compare products, bonds, and mortar
                    options with your team in real time.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Showroom use image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Trade shows and event stands</h3>
                  <p>
                    Use BLOC-TEC on stand screens to create interactive product demonstrations and keep
                    visitors engaged for longer.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Trade show use image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Sales teams on tablets and laptops</h3>
                  <p>
                    Give sales teams a practical tool for iPads and laptops so product options can be
                    presented clearly during meetings and site visits.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Sales team use image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Manufacturer websites and partner channels</h3>
                  <p>
                    Embed BLOC-TEC in your website with iframe integration and extend access through
                    reseller portals or campaign landing pages where needed.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Website and channel image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="card">
            <h2>Onboarding options</h2>
            <div className="feature-list">
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Base package setup</h3>
                  <p>
                    Core setup includes account routing, product data onboarding, and recommended
                    defaults so your team can launch with a clear and consistent baseline.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Base package image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Blender and Texture add-ons</h3>
                  <p>
                    Blender and Texture modules are optional add-ons on top of the base package and can
                    be enabled according to your rollout priorities.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Module add-on image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Scenes: existing and custom</h3>
                  <p>
                    Start with scenes from our existing paving, walling, and flooring libraries, then
                    add custom scenes aligned to your own products, settings, and brand context.
                  </p>
                  <p>
                    <NavLink to="/scenes">View scene options</NavLink>
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Scenes image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Pattern, naming, and mortar preferences</h3>
                  <p>
                    Pattern naming and mortar defaults are configured to your local preferences at setup
                    and can be refined later. We aim for consistency across products wherever practical.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Configuration preferences image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
            </div>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container card">
          <h2>Reseller swatch usage policy</h2>
          <p>
            Reseller usage for product swatches is currently under review while we finalize policy and
            commercial terms. Approved usage routes are confirmed during onboarding.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2>Discuss your manufacturer setup</h2>
          <p>
            Tell us about your current product content, reseller needs, and website goals. We can
            recommend the best starting route for onboarding and integration.
          </p>
          <NavLink className="btn btn-primary" to="/contact">
            Contact BLOC-TEC
          </NavLink>
        </div>
      </section>
    </main>
  );
}

function FaqPage() {
  return (
    <main className="section">
      <div className="container page-header">
        <p className="eyebrow">FAQ</p>
        <h1>Frequently asked questions</h1>
        <p className="lead">
          Quick answers about imagery, hosting, integration, and commercial setup for BLOC-TEC.
        </p>
      </div>

      <section className="section">
        <div className="container grid two">
          <article className="card">
            <h2>Images</h2>
            <h3>Can we use our own images?</h3>
            <p>
              Image quality is central to accurate output. We review supplied imagery against BLOC-TEC
              requirements before use so display quality remains consistent.
            </p>

            <h3>How are product images created?</h3>
            <p>
              We work from product sample photography and structured processing workflows so products can
              be shown reliably across bonds, joints, and layout options.
            </p>

            <h3>Do we need to send all product samples?</h3>
            <p>
              Not always. We can advise the most practical route based on your product range and current
              image readiness.
            </p>
          </article>

          <article className="card">
            <h2>Hosting and security</h2>
            <h3>Can we host BLOC-TEC on our own servers?</h3>
            <p>
              Deployments are managed through BLOC-TEC infrastructure to support security, maintenance,
              reliability, and version control.
            </p>

            <h3>Which servers do you use?</h3>
            <p>
              We use managed cloud infrastructure (including AWS-backed deployments) selected for
              stability, security, and scalable performance.
            </p>

            <h3>How is security handled?</h3>
            <p>
              Core controls include secure HTTPS transport, controlled system access, and managed backup
              processes as part of normal platform operations.
            </p>

            <h3>Can BLOC-TEC be integrated into our website?</h3>
            <p>
              Yes. We support website embedding workflows, including iframe-based integration, and can
              also provide direct account links where needed.
            </p>

            <h3>How many product samples do we need to send?</h3>
            <p>
              This depends on product type, blend complexity, and size variation. We advise sample
              quantities during onboarding to balance realism and delivery speed.
            </p>
          </article>

          <article className="card">
            <h2>Performance</h2>
            <h3>What platforms does BLOC-TEC run on?</h3>
            <p>
              BLOC-TEC runs in modern web browsers and is designed for fast, interactive product
              exploration without specialist local installation.
            </p>

            <h3>Is BLOC-TEC responsive on mobile devices?</h3>
            <p>Yes. The interface is responsive across desktop, tablet, and mobile screen sizes.</p>
          </article>

          <article className="card">
            <h2>User accounts</h2>
            <h3>What is bricktextures.com website?</h3>
            <p>
              bricktextures.com is the BLOC-TEC development and testing environment used to trial new
              software ideas before selected features are rolled into manufacturer-linked accounts.
            </p>

            <h3>How is a new manufacturer account priced?</h3>
            <p>
              Pricing is based on scope: product count, onboarding effort, image readiness, and any
              required integration modules.
            </p>

            <h3>How do we link our website to the software?</h3>
            <p>
              You can embed BLOC-TEC directly in your website via iframe, or use direct account links
              for full-page launch depending on your user journey.
            </p>

            <h3>How long does onboarding take?</h3>
            <p>
              Delivery time depends on product volume and preparation quality. We confirm realistic
              timelines once scope is reviewed.
            </p>

            <h3>Can modules be added later?</h3>
            <p>
              Yes. Additional capabilities can be phased in as commercial and technical priorities
              develop.
            </p>

            <h3>What level of technical support is offered?</h3>
            <p>
              We provide ongoing support for account updates, compatibility maintenance, and operational
              guidance as your setup evolves.
            </p>

            <h3>Where can we use our software?</h3>
            <p>
              Accounts can be used on approved website domains and in non-web contexts such as
              showrooms, sales presentations, and exhibition environments.
            </p>

            <h3>Can products be added and removed after launch?</h3>
            <p>
              Yes. We can remove outdated products and onboard new products as your catalogue changes.
            </p>

            <h3>Can resellers use product swatches from BLOC-TEC?</h3>
            <p>
              Product swatch usage by resellers is currently under review. We confirm approved usage
              routes during manufacturer onboarding.
            </p>

            <h3>How do I change scenes?</h3>
            <p>
              Scene selection can be updated as your account evolves. We can adjust your scene mix and
              add new scene options during ongoing account support.
            </p>

            <h3>Can I add scenes from my own imagery?</h3>
            <p>
              Yes. Many clients use custom scenes built around their own context and products. See our
              scene options page for guidance.
              {" "}
              <NavLink to="/scenes">Open Scenes</NavLink>
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2>Get in touch</h2>
          <p>
            If you have other questions that are not covered here, contact us and we will route your
            enquiry to the right team.
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

function ProductSamplesPage() {
  return (
    <main className="section product-samples-page">
      <div className="container page-header">
        <p className="eyebrow">Support</p>
        <h1>Product Samples</h1>
        <p className="lead">
          Guidance for delivery and preparation of samples used in BLOC-TEC onboarding and photography
          workflows.
        </p>
      </div>

      <section className="section samples-quick-section">
        <div className="container card">
          <h2>Quick links</h2>
          <p className="samples-quick-links">
            <a href="#delivery-address">Delivery essentials</a>
            <a href="#quantity">Preparation for photography</a>
            <a href="#customs-info">Customs and compliance</a>
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container card" id="delivery-address">
          <h2>Delivery of samples</h2>
          <div className="feature-list samples-delivery-list">
            <article className="feature-row">
              <div className="feature-content">
                <h3>
                  <span className="samples-icon" aria-hidden="true"><Box24Regular /></span>
                  Delivery address
                </h3>
                <p className="samples-address-block">
                  Paver Picker Ltd
                  <br />
                  Ballinamona
                  <br />
                  Glanworth
                  <br />
                  County Cork
                  <br />
                  Ireland
                  <br />
                  P51 C9Y7
                </p>
              </div>
            </article>

            <article className="feature-row" id="delivery-contact">
              <div className="feature-content">
                <h3>
                  <span className="samples-icon" aria-hidden="true"><Call24Regular /></span>
                  Delivery contact
                </h3>
                <p>
                  <strong>Office:</strong> 025 46682
                  <br />
                  <strong>Mob:</strong> 087 989 7014
                  <br />
                  <strong>Email:</strong> <a href="mailto:info@bloc-tec.com">info@bloc-tec.com</a>
                </p>
              </div>
            </article>

            <article className="feature-row" id="offloading">
              <div className="feature-content">
                <h3>
                  <span className="samples-icon" aria-hidden="true"><Box24Regular /></span>
                  Off-loading of pallets
                </h3>
                <p>
                  We do not have a forklift at our photography area. Palleted samples need to be
                  off-loaded by the courier using a tail lift or another suitable method.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2>Preparation of samples for photography</h2>
          <div className="feature-list samples-prep-list">
            <article className="feature-row samples-matrix-card" id="quantity">
              <div className="feature-content">
                <h3><span className="samples-icon" aria-hidden="true"><Table24Regular /></span>Guidance for number of product samples</h3>
                <p>
                  We need to have enough samples to correctly represent your product and avoid visible
                  repetition. Ensure you select samples to represent the full colour range of your product.
                </p>
                <div className="samples-matrix-wrap">
                  <table className="samples-matrix">
                    <thead>
                      <tr>
                        <th>Product size</th>
                        <th>Single colour</th>
                        <th>Blended colour</th>
                        <th>Recommended fallback</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Any edge under 300mm (e.g. bricks and blocks)</td>
                        <td>10-20</td>
                        <td>20-30</td>
                        <td>Send 20</td>
                      </tr>
                      <tr>
                        <td>All edges over 300mm (e.g. slabs)</td>
                        <td>6-10</td>
                        <td>10-16</td>
                        <td>Send 10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            <article className="feature-row" id="packing">
              <div className="feature-content">
                <h3><span className="samples-icon" aria-hidden="true"><CheckmarkCircle24Regular /></span>Packing checklist</h3>
                <ul className="benefit-list">
                  <li>Clearly label samples with product name and/or product code</li>
                  <li>Ensure samples are clean and dry</li>
                  <li>Where possible, place samples on edge to reduce cracking risk</li>
                  <li>Protect all finished faces and edges using suitable cushioning materials</li>
                  <li>For brick products requiring header photography, ensure both header and stretcher faces are protected from direct contact</li>
                </ul>
                <p>
                  Use load-resistant cushioning materials (for example closed-cell foam; 4mm+ sheets are
                  recommended).
                </p>
              </div>
            </article>
          </div>

        </div>
      </section>

      <section className="section section-alt">
        <div className="container card" id="customs-info">
          <h2><span className="samples-icon" aria-hidden="true"><Globe24Regular /></span>Customs and compliance</h2>
          <div className="feature-list samples-customs-list">
            <article className="feature-row" id="customs">
              <div className="feature-content">
                <h3>Customs information (samples sent from outside the EU)</h3>
                <p>
                  Samples must be sent DDP (Delivered Duty Paid). Due to customs complexity, many clients
                  use an agent for smoother shipment handling.
                </p>
              </div>
            </article>

            <article className="feature-row">
              <div className="feature-content">
                <h3>Customs charges and registration</h3>
                <p>
                  All costs associated with delivery or return of products are covered by the sender.
                  An administration charge of 50 EUR applies where samples are not sent DDP.
                </p>
                <p>
                  VAT number: IE3472538NH
                  <br />
                  EORI number: IE3472538NH
                  <br />
                  Business Registration Number: 04066
                </p>
              </div>
            </article>

            <article className="feature-row">
              <div className="feature-content">
                <h3 id="customs-links"><span className="samples-icon" aria-hidden="true"><Link24Regular /></span>Useful customs links</h3>
                <ul className="benefit-list">
                  <li>
                    <a
                      href="https://www.revenue.ie/en/customs/businesses/relief-duty-vat/samples/index.aspx"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Tax relief on permanent importation of samples
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.revenue.ie/en/customs/businesses/temp-admission-exports/rules-procedures/index.aspx"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Temporary importation of samples
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=en#"
                      target="_blank"
                      rel="noreferrer"
                    >
                      TARIC code lookup
                    </a>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

function PrivacyPolicyPage() {
  return (
    <main className="section">
      <div className="container page-header">
        <p className="eyebrow">Legal</p>
        <h1>Privacy policy</h1>
        <p className="lead">
          This page will contain the official BLOC-TEC privacy policy in HTML format.
        </p>
      </div>
    </main>
  );
}

function AppTermsPage() {
  return (
    <main className="section">
      <div className="container page-header">
        <p className="eyebrow">Legal</p>
        <h1>App terms of use</h1>
        <p className="lead">
          This page will contain the official BLOC-TEC app terms of use in HTML format.
        </p>
      </div>
    </main>
  );
}

function ScenesPage() {
  return (
    <main className="section">
      <div className="container page-header">
        <p className="eyebrow">Scenes</p>
        <h1>Scene options for manufacturer accounts</h1>
        <p className="lead">
          Scene packs can start from existing BLOC-TEC libraries and expand with custom scenes tailored
          to your products and brand context.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <article className="card">
            <h2>Scene setup routes</h2>
            <div className="feature-list">
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Existing scene libraries</h3>
                  <p>
                    Choose from established scene sets across paving, walling, and flooring to launch
                    quickly with proven formats.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Existing scene library image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Custom scene development</h3>
                  <p>
                    Add custom scenes aligned to your products, photography style, and preferred
                    customer journey.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Custom scene image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Phased scene rollout</h3>
                  <p>
                    Start with a core scene set, then expand over time as product ranges and campaign
                    needs evolve.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Scene rollout image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Ongoing scene adjustments</h3>
                  <p>
                    Scene choices can be updated post-launch so your account stays aligned with sales
                    priorities, market seasonality, and new product introductions.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Scene updates image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
            </div>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container card">
          <h2>Have a scene idea?</h2>
          <p>
            If you have a scene concept and want to know whether it can be added to your account,
            contact us and we can review suitability, setup approach, and rollout options.
          </p>
          <NavLink className="btn btn-primary" to="/contact">
            Ask about scene suitability
          </NavLink>
        </div>
      </section>

    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>BLOC-TEC by Paver Picker Ltd</p>
        <p>
          <a href="https://bricktextures.com" target="_blank" rel="noreferrer">
            Visit bricktextures.com
          </a>
          {" "}for development and testing
        </p>
        <p className="footer-legal">
          <NavLink to="/privacy-policy">Privacy policy</NavLink>
          <span>|</span>
          <NavLink to="/app-terms">App terms of use</NavLink>
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
          <Route path="/scenes" element={<ScenesPage />} />
          <Route path="/product-samples" element={<ProductSamplesPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/app-terms" element={<AppTermsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
