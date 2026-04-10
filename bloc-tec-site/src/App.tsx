import { FormEvent, useEffect, useState } from "react";
import {
  Call24Regular,
  Box24Regular,
  Globe24Regular,
  Link24Regular,
  CheckmarkCircle24Regular,
  Table24Regular,
} from "@fluentui/react-icons";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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

type IntegrationMethodKey = "base" | "category" | "product" | "sku";

type IntegrationMethodOption = {
  buttonLabel: string;
  title: string;
  templatePrefix: string;
  templateHighlight: string;
  description: string;
  demoIframeUrl: string;
  examplePrefix: string;
  exampleHighlight: string;
  exampleSuffix?: string;
  recommendedIntro?: string;
  recommendedMethods: Array<{
    method: string;
    reason: string;
  }>;
};

function getSkuDemoUrl(productCode: string) {
  return `https://app.bloc-tec.com/account/demo/Clay%20Bricks?c=${encodeURIComponent(productCode)}`;
}

const INTEGRATION_METHOD_OPTIONS: Record<
  IntegrationMethodKey,
  IntegrationMethodOption
> = {
  base: {
    buttonLabel: "All products",
    title: "Linking to all your products",
    templatePrefix: "https://app.bloc-tec.com/account/",
    templateHighlight: "<account-name>",
    description:
      "This route gives access to your full product collection and works for both standalone links and iframe embeds. We provide your account name during account set-up.",
    demoIframeUrl: "https://app.bloc-tec.com/account/demo",
    examplePrefix: "https://app.bloc-tec.com/account/",
    exampleHighlight: "demo",
    recommendedIntro:
      "Both of the following recommended methods allow scrolling of large product swatch sets without double-scroll issues that can occur in embedded mode.",
    recommendedMethods: [
      {
        method: "New tab",
        reason: "offers the largest available viewing area.",
      },
      {
        method: "Modal window",
        reason:
          "keeps users on your website without opening a new browser tab; the trade-off is a smaller viewing area than New tab.",
      },
    ],
  },
  category: {
    buttonLabel: "Category",
    title: "Linking to category level",
    templatePrefix: "https://app.bloc-tec.com/account/<account-name>/",
    templateHighlight: "<category-name>",
    description:
      "This is the top level of your account product structure. Pass in the category name to load it directly.",
    demoIframeUrl: "https://app.bloc-tec.com/account/demo/Clay%20Bricks",
    examplePrefix: "https://app.bloc-tec.com/account/demo/",
    exampleHighlight: "Clay%20Bricks",
    recommendedIntro:
      "Both of the following recommended methods allow scrolling of large product swatch sets without double-scroll issues that can occur in embedded mode.",
    recommendedMethods: [
      {
        method: "New tab",
        reason: "offers the largest available viewing area.",
      },
      {
        method: "Modal window",
        reason:
          "keeps users on your website without opening a new browser tab; the trade-off is a smaller viewing area than New tab.",
      },
    ],
  },
  product: {
    buttonLabel: "Product",
    title: "Linking to product level",
    templatePrefix:
      "https://app.bloc-tec.com/account/<account-name>/<category-name>?",
    templateHighlight: "viewProduct=<product-name>",
    description:
      "This loads a specific product, allowing users to browse all available colours and finishes for that product.",
    demoIframeUrl:
      "https://app.bloc-tec.com/account/demo/Clay%20Bricks?viewProduct=Woodward",
    examplePrefix: "https://app.bloc-tec.com/account/demo/Clay%20Bricks?",
    exampleHighlight: "viewProduct=Woodward",
    recommendedMethods: [
      {
        method: "Modal window",
        reason: "gives good focus for product-level exploration.",
      },
      {
        method: "Embedded",
        reason: "provides a more seamless flow with your website.",
      },
    ],
  },
  sku: {
    buttonLabel: "SKU",
    title: "Linking to individual SKU level",
    templatePrefix:
      "https://app.bloc-tec.com/account/<account-name>/<category-name>?",
    templateHighlight: "c=<product-code>",
    description:
      "This is useful for embedding in a webpage specific to one product.",
    demoIframeUrl: getSkuDemoUrl("WO_LE_AN"),
    examplePrefix: "https://app.bloc-tec.com/account/demo/Clay%20Bricks?",
    exampleHighlight: "c=WO_LE_AN",
    recommendedMethods: [
      {
        method: "Modal window",
        reason: "gives good focus for product-level exploration.",
      },
      {
        method: "Embedded",
        reason: "provides a more seamless flow with your website.",
      },
    ],
  },
};

function Header() {
  const location = useLocation();
  const [supportOpen, setSupportOpen] = useState(false);
  const supportLinks = [
    { to: "/faq", label: "FAQ" },
    { to: "/integration", label: "Integration" },
    { to: "/scenes", label: "Scenes" },
    { to: "/product-samples", label: "Product Samples" },
  ] as const;
  const isSupportActive = supportLinks.some((item) =>
    location.pathname.startsWith(item.to),
  );

  return (
    <header className="site-header">
      <div className="container header-content">
        <div className="header-top-row">
          <Link className="brand" to="/">
            <img
              src="/images/brand/bloc-tec-logo-black.svg"
              alt="BLOC-TEC"
              className="brand-logo"
            />
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/for-manufacturers">For Manufacturers</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <button
              type="button"
              className={`support-nav-trigger${supportOpen || isSupportActive ? " active" : ""}`}
              aria-expanded={supportOpen}
              aria-controls="support-nav-dropdown"
              onClick={() => setSupportOpen((value) => !value)}
            >
              Support
              <span aria-hidden="true" className="support-nav-trigger-caret">
                {supportOpen ? "▲" : "▼"}
              </span>
            </button>
          </nav>
        </div>
        {supportOpen ? (
          <div className="support-nav-row">
            <nav
              className="support-nav-dropdown"
              id="support-nav-dropdown"
              aria-label="Support navigation"
            >
              {supportLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="support-tab"
                  onClick={() => setSupportOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
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
      setError(
        "Please provide a little more detail so we can route your enquiry correctly.",
      );
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
      message,
    ].join("\n");

    window.location.href = `mailto:info@bloc-tec.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label>
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Company
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </label>
      <label>
        Work email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Message
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
        />
      </label>
      <label className="honeypot-field" aria-hidden="true" tabIndex={-1}>
        Website
        <input
          value={websiteField}
          onChange={(e) => setWebsiteField(e.target.value)}
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
            BLOC-TEC develops digital tools that help brick and paving
            manufacturers present products with clarity for confident
            specification decisions.
          </p>
        </div>
      </section>

      <section className="section quick-links-section">
        <div className="container">
          <p className="quick-links">
            <a className="btn-small" href="#app">
              Who we work with
            </a>
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
                  <p>
                    Bonds, joints, sizes, and layout logic built for real-world
                    product use.
                  </p>
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
                  <p>
                    Explore mixed product compositions and compare practical
                    outcomes quickly.
                  </p>
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
                  <p>
                    Generate outputs for downstream design, rendering, and
                    creative workflows.
                  </p>
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
                  <p>
                    Share product configurations clearly with colleagues,
                    stakeholders, and clients.
                  </p>
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
              BLOC-TEC supports both leading manufacturers and specialist
              producers with practical digital solutions for product
              presentation, specification, and sharing.
            </p>
            <p>
              Use the app links below to open each manufacturer&apos;s products
              directly in the BLOC-TEC app.
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
                    The UK&apos;s largest brick manufacturer. Integration
                    focuses on presenting a broad clay brick range through
                    clear, interactive product workflows.
                  </p>
                  <div className="integration-actions">
                    <a
                      className="btn btn-secondary"
                      href={IBSTOCK_INTEGRATION_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View integration
                    </a>
                    <a
                      className="btn btn-secondary"
                      href={IBSTOCK_APP_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
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
                    A leading Northern Ireland manufacturer of concrete paving
                    and walling products. Integration supports practical
                    specification and product selection workflows.
                  </p>
                  <div className="integration-actions">
                    <a
                      className="btn btn-secondary"
                      href={TOBERMORE_INTEGRATION_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View integration
                    </a>
                    <a
                      className="btn btn-secondary"
                      href={TOBERMORE_APP_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
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
                    A long-established Irish clay brick manufacturer.
                    Integration demonstrates that the platform is effective for
                    focused specialist ranges as well as large catalogues.
                  </p>
                  <div className="integration-actions">
                    <a
                      className="btn btn-secondary"
                      href={KINGSCOURT_INTEGRATION_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View integration
                    </a>
                    <a
                      className="btn btn-secondary"
                      href={KINGSCOURT_APP_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
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
                    A well-established hard landscaping manufacturer.
                    Integration highlights how BLOC-TEC supports practical
                    paving-focused product journeys and client-ready output.
                  </p>
                  <div className="integration-actions">
                    <a
                      className="btn btn-secondary"
                      href={ACHESON_GLOVER_INTEGRATION_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View integration
                    </a>
                    <a
                      className="btn btn-secondary"
                      href={ACHESON_GLOVER_APP_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
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
  const [selectedMethod, setSelectedMethod] =
    useState<IntegrationMethodKey>("base");
  const [showIframePreview, setShowIframePreview] = useState(false);
  const [showIframeModal, setShowIframeModal] = useState(false);
  const activeMethod = INTEGRATION_METHOD_OPTIONS[selectedMethod];

  useEffect(() => {
    if (!showIframeModal) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showIframeModal]);

  const handleMethodSelect = (methodKey: IntegrationMethodKey) => {
    setSelectedMethod(methodKey);
    setShowIframePreview(false);
    setShowIframeModal(false);
    const methodsSection = document.getElementById("integration-methods");
    if (methodsSection) {
      const targetY =
        methodsSection.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    }
  };

  return (
    <main className="section">
      <div className="container page-header">
        <p className="eyebrow">Integration</p>
        <h1>Integration into your website</h1>
        <p className="lead">
          Integration is configured around your account name, with link options
          across account, category, product, and SKU levels, plus server-hosted
          swatches that stay current across your website.
        </p>
      </div>

      <section className="section quick-links-section">
        <div className="container">
          <p className="quick-links">
            <a className="btn-small" href="#embed-behaviour-and-sizing">
              Integration advice
            </a>
            <a className="btn-small" href="#iframe-integration-guidance">
              Up-to-date swatches
            </a>
            <a className="btn-small" href="#share-button-domain">
              Share button
            </a>
          </p>
        </div>
      </section>

      <section className="section section-tight-top" id="integration-methods">
        <div className="container">
          <article className="card">
            <h2>Integration methods</h2>
            <p className="integration-step">
              <span className="integration-subtitle">
                I would like to link to...
              </span>
            </p>
            <div
              className="scene-filter-bar integration-method-selector"
              role="tablist"
              aria-label="Integration method options"
            >
              {(
                Object.keys(
                  INTEGRATION_METHOD_OPTIONS,
                ) as IntegrationMethodKey[]
              ).map((methodKey) => (
                <button
                  key={methodKey}
                  type="button"
                  className={`scene-filter-btn${selectedMethod === methodKey ? " active" : ""}`}
                  onClick={() => handleMethodSelect(methodKey)}
                  aria-pressed={selectedMethod === methodKey}
                >
                  {INTEGRATION_METHOD_OPTIONS[methodKey].buttonLabel}
                </button>
              ))}
            </div>
            <article className="feature-row integration-method-panel">
              <div className="feature-content">
                <h3>{activeMethod.title}</h3>
                <p className="integration-step">
                  <code>{activeMethod.templatePrefix}</code>
                  <strong>
                    <code>{activeMethod.templateHighlight}</code>
                  </strong>
                </p>
                <p className="integration-step">{activeMethod.description}</p>
                <p className="integration-step">
                  <span className="integration-subtitle">Example link:</span>
                  <br />
                  <code>{activeMethod.examplePrefix}</code>
                  <strong>
                    <code>{activeMethod.exampleHighlight}</code>
                  </strong>
                  {activeMethod.exampleSuffix ? (
                    <code>{activeMethod.exampleSuffix}</code>
                  ) : null}
                </p>
                <p className="integration-step integration-recommendation">
                  <span className="integration-subtitle">
                    Recommended method:
                  </span>
                  <br />
                  {activeMethod.recommendedIntro ? (
                    <span className="integration-recommendation-intro">
                      {activeMethod.recommendedIntro}
                    </span>
                  ) : null}
                  {activeMethod.recommendedMethods.map(({ method, reason }) => (
                    <span
                      key={method}
                      className="integration-recommendation-line"
                    >
                      {method} - {reason}
                    </span>
                  ))}
                </p>
                {selectedMethod === "category" ? (
                  <>
                    <p className="integration-step">
                      <span className="integration-subtitle">
                        Additional Parameters:
                      </span>
                    </p>
                    <p className="integration-step">
                      <code>prodBack=false</code> hides the product-level back
                      control so users stay in your category-page flow.
                    </p>
                  </>
                ) : null}
                {selectedMethod === "sku" ? (
                  <>
                    <p className="integration-step">
                      <span className="integration-subtitle">
                        Additional Parameters:
                      </span>
                    </p>
                    <p className="integration-step">
                      <code>viewerBack=false</code> hides the viewer-level back
                      control so users stay in your product-page flow.
                    </p>
                    <p className="integration-step">
                      <span className="integration-subtitle">
                        If blender module is active:
                      </span>
                    </p>
                    <p className="integration-step">
                      See{" "}
                      <a href="#sku-blender-guidance">
                        Blender integration
                      </a>
                      {" "}below for further guidance.
                    </p>
                    <p className="integration-step">
                      <code>canBlend=false</code> disables blend controls for
                      single-product pages.
                    </p>
                    <p className="integration-step">
                      <code>tab=blend</code> opens the Blend tab instead of the
                      default product configuration tab.
                    </p>
                  </>
                ) : null}
                <div className="integration-method-actions">
                  <a
                    className="btn-small"
                    href={activeMethod.demoIframeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in new tab
                  </a>
                  <button
                    className="btn-small"
                    type="button"
                    onClick={() => {
                      setShowIframeModal(true);
                      setShowIframePreview(false);
                    }}
                  >
                    Open in modal window
                  </button>
                  <button
                    className={`btn-small${showIframePreview ? " active" : ""}`}
                    type="button"
                    onClick={() => {
                      setShowIframePreview(true);
                      setShowIframeModal(false);
                    }}
                  >
                    Open embedded
                  </button>
                </div>
                {showIframePreview ? (
                  <div className="integration-preview-wrap">
                    <div className="integration-preview-toolbar">
                      <button
                        className="btn-small"
                        type="button"
                        onClick={() => setShowIframePreview(false)}
                      >
                        Close preview
                      </button>
                    </div>
                    <iframe
                      className="integration-preview-iframe"
                      title={`${activeMethod.buttonLabel} integration preview`}
                      src={activeMethod.demoIframeUrl}
                      loading="lazy"
                    />
                  </div>
                ) : null}
              </div>
            </article>
          </article>
        </div>
      </section>

      <section className="section section-alt" id="embed-behaviour-and-sizing">
        <div className="container">
          <article className="card">
            <h2>Integration advice</h2>
            <div className="feature-list integration-list integration-advice-list">
              <article className="feature-row" id="sku-blender-guidance">
                <h3>Blender integration</h3>
                <p className="integration-step">
                  When using the blender module, we recommend using a dedicated
                  blending page on your website. This can be linked to account or
                  category level.
                </p>
                <p className="integration-step">
                  On single product pages, we do not recommend enabling
                  multi-product blending. It can complicate the single product
                  page presentation. Disable blending by appending query
                  parameter <code>canBlend=false</code>. You could use a "Blend
                  this product" button to navigate to your dedicated blending
                  page, where you can load the same SKU and present an immediate
                  blending option to your user by appending{" "}
                  <code>tab=blend</code>.
                </p>
              </article>

              <article className="feature-row">
                <h3>Iframe sizing</h3>
                <p className="integration-step">
                  Avoid iframe widths at or below{" "}
                  <code>1024px</code>, where the viewer can switch to a
                  mobile-style layout.
                </p>
              </article>

              <article className="feature-row">
                <h3>Hiding your logo</h3>
                <p className="integration-step">
                  For browser-tab links, you can explicitly hide the viewer logo
                  by appending <code>logo=false</code> to your integration URL.
                </p>
              </article>

              <article className="feature-row">
                <h3>Creating a modal window</h3>
                <p className="integration-step">
                  Use the steps below to wire a modal embed into your page.
                </p>
                <p className="integration-step">
                  Copy all three files into your project. If you rename or move
                  them, update the HTML <code>link</code> and{" "}
                  <code>script</code> paths.
                </p>
                <p className="integration-step">
                  Set the iframe <code>src</code> to your account route.
                </p>
                <p className="integration-step integration-resource-links">
                  <a href="/integration/modal-embed-example-html.txt" download>
                    Download HTML sample
                  </a>
                  {" | "}
                  <a
                    href="/integration/modal-embed-example-css.txt"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open CSS sample
                  </a>
                  {" | "}
                  <a
                    href="/integration/modal-embed-example-js.txt"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open JavaScript sample
                  </a>
                </p>
              </article>
            </div>
          </article>
        </div>
      </section>

      <section className="section section-alt" id="iframe-integration-guidance">
        <div className="container">
          <article className="card">
            <h2>Up-to-date swatches in your product lists</h2>
            <p>
              Swatches served from our platform stay up to date automatically.
              If a blend changes, the swatch output updates without manual
              intervention. Because we create and host these swatches, they stay
              consistent in scale, framing, and displayed physical area, so users
              can compare products with clear expectations.
            </p>
            <p>
              Swatch creation and hosting are provided as a custom service as
              part of your integration setup. Contact us to discuss adding this
              service to your product selection pages.
            </p>
          </article>
        </div>
      </section>

      <section className="section section-alt" id="share-button-domain">
        <div className="container">
          <article className="card">
            <h2>Share button</h2>
            <p className="integration-step">
              When the app is not embedded in an iframe, Share creates direct app
              URLs to our domain.
            </p>
            <p className="integration-step">
              When the app is embedded in an iframe, include{" "}
              <code>allow="clipboard-write"</code> on your embedded iframe for
              reliable copy-link support.
            </p>
            <p className="integration-step">
              <span className="integration-subtitle">
                Option to keep users on your domain
              </span>
            </p>
            <p className="integration-step">
              You can configure Share to generate URLs on your own website domain
              (host page), so users stay on your domain and reopen the same
              configured view.
            </p>
            <p className="integration-step">
              <span className="integration-subtitle">Share host setup steps</span>
            </p>
            <p className="integration-step">
              1) Add the host integration script (<code>embed-host.js</code>) to
              your website page (the page containing the iframe).
            </p>
            <p className="integration-step">
              2) Configure app base URL, default account/category, iframe
              selector, and exact allowed iframe origins including{" "}
              <code>https://app.bloc-tec.com</code>. Do not use wildcard origin
              rules.
            </p>
            <p className="integration-step">
              3) No manual storage code is needed in most cases: the host
              integration script stores shared viewer state under a single{" "}
              <code>bt</code> key in your website URL (recommended{" "}
              <code>#bt=...</code>; use <code>?bt=...</code> if your site already
              uses hash routing).
            </p>
            <p className="integration-step integration-resource-links">
              <a
                href="https://app.bloc-tec.xyz/embed-test/embed-host.js"
                target="_blank"
                rel="noreferrer"
              >
                Host integration script (embed-host.js)
              </a>
            </p>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <article className="card">
            <h2>Need integration support now?</h2>
            <p>
              If your developer team runs into an integration issue, contact us
              with your account name and a short summary. We are happy to help
              you resolve it quickly.
            </p>
            <a
              className="btn btn-primary scene-cta-btn"
              href="mailto:info@bloc-tec.com"
            >
              Email info@bloc-tec.com
            </a>
          </article>
        </div>
      </section>

      {showIframeModal ? (
        <div
          className="integration-iframe-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeMethod.buttonLabel} embedded preview`}
          onClick={() => setShowIframeModal(false)}
        >
          <div
            className="integration-iframe-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="integration-iframe-modal-toolbar">
              <button
                className="btn-small"
                type="button"
                onClick={() => setShowIframeModal(false)}
              >
                Close preview
              </button>
            </div>
            <iframe
              className="integration-iframe-modal-frame"
              title={`${activeMethod.buttonLabel} modal preview`}
              src={activeMethod.demoIframeUrl}
              loading="lazy"
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}

function ManufacturersPage() {
  return (
    <main className="section">
      <div className="container page-header">
        <p className="eyebrow">For Manufacturers</p>
        <h1>Digital product presentation for sales and specification teams.</h1>
        <p className="lead">
          BLOC-TEC helps manufacturers present products consistently, support
          reseller channels, and deliver stronger digital experiences across
          web, showroom, and field sales touchpoints.
        </p>
      </div>

      <section className="section quick-links-section">
        <div className="container">
          <p className="quick-links">
            <a className="btn-small" href="#what-offers">
              What BLOC-TEC offers
            </a>
            <a className="btn-small" href="#where-used">
              WHERE BLOC-TEC is used
            </a>
          </p>
        </div>
      </section>

      <section className="section" id="why-bloc-tec">
        <div className="container">
          <article className="card">
            <h2>WHY choose BLOC-TEC</h2>
            <div className="feature-list">
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Consistent product presentation</h3>
                  <p>
                    Keep product imagery consistent across ranges, finishes, and
                    marketing channels so every product is presented clearly and
                    reliably.
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
                  <h3>Aligned sales and technical messaging</h3>
                  <p>
                    Sales, technical, and marketing teams can work from the same
                    product story, helping customer messaging stay consistent
                    across channels.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Cross-team consistency image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Faster specification decisions</h3>
                  <p>
                    Help specifiers move from shortlists to confident product
                    decisions faster with clearer, more realistic product
                    comparisons.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Faster decision support image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Reduced sampling waste and cost</h3>
                  <p>
                    Improve pre-qualification before requesting physical
                    samples, helping reduce avoidable sample waste and
                    associated costs.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Sampling efficiency image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="what-offers">
        <div className="container">
          <article className="card">
            <h2>What BLOC-TEC offers</h2>
            <div className="feature-list">
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Base package</h3>
                  <p>
                    Base package includes account routing, product data set-up,
                    and recommended defaults so your team can launch with a
                    clear and consistent baseline. Pattern naming and mortar
                    preferences are also configured at setup and can be refined
                    later.
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
                  <h3>Blender add-on module</h3>
                  <p>
                    Blender is an optional add-on on top of the base package and
                    can be enabled according to your rollout priorities.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Blender add-on image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Texture add-on module</h3>
                  <p>
                    Texture is an optional add-on on top of the base package and
                    can be enabled according to your rollout priorities.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Texture add-on image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Scene options</h3>
                  <p>
                    Start with scenes from our existing paving, walling, and
                    flooring libraries. Custom scenes are available as an add-on
                    option aligned to your own products, settings, and brand
                    context.
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
            </div>
          </article>
        </div>
      </section>

      <section className="section section-alt" id="where-used">
        <div className="container">
          <article className="card">
            <h2>WHERE BLOC-TEC is used</h2>
            <div className="feature-list">
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Website</h3>
                  <p>
                    Run BLOC-TEC on your website so customers can explore
                    products in context and move from initial interest to more
                    confident product choices.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Website integration image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
              <article className="feature-row">
                <div className="feature-content">
                  <h3>Showrooms and design centers</h3>
                  <p>
                    Run BLOC-TEC in your showroom so visitors can compare
                    products, bonds, and mortar options with your team in real
                    time.
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
                    Use BLOC-TEC on stand screens to create interactive product
                    demonstrations and keep visitors engaged for longer.
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
                  <h3>Sales teams in the field</h3>
                  <p>
                    Give sales teams a practical tool for iPads and laptops so
                    product options can be presented clearly during meetings and
                    site visits.
                  </p>
                </div>
                <div className="highlight-image-placeholder" aria-hidden="true">
                  Sales team use image
                  <br />
                  Recommended: 1200 x 400 (WebP)
                </div>
              </article>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="manufacturer-contact">
        <div className="container">
          <article className="card">
            <h2>Next step: discuss your setup</h2>
            <p>
              Tell us about your current product content, reseller needs, and
              website goals. We are happy to advise on the best starting route
              for account set-up and integration.
            </p>
            <NavLink className="btn btn-primary scene-cta-btn" to="/contact">
              Contact BLOC-TEC
            </NavLink>
          </article>
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
      </div>

      <section className="section">
        <div className="container grid two">
          <article className="card">
            <h2>Account set-up and integration</h2>
            <div className="faq-accordion">
              <details className="faq-item">
                <summary>Can we host BLOC-TEC on our own servers?</summary>
                <p>
                  No. Deployments are managed through BLOC-TEC infrastructure to
                  support security, maintenance, reliability, and version
                  control.
                </p>
              </details>
              <details className="faq-item">
                <summary>Where is BLOC-TEC hosted and how is security managed?</summary>
                <p>
                  We use managed cloud infrastructure (including AWS-backed
                  deployments) selected for stability, security, and scalable
                  performance. Core controls include secure HTTPS transport,
                  controlled system access, and managed backup processes as part
                  of normal platform operations.
                </p>
              </details>

              <details className="faq-item">
                <summary>How is a new manufacturer account priced?</summary>
                <p>
                  Pricing is based on project requirements, including product
                  count, account set-up effort, image readiness, and required
                  integration modules.
                </p>
              </details>
              <details className="faq-item">
                <summary>How long does account set-up take?</summary>
                <p>
                  Delivery time depends on product volume and preparation
                  quality, as well as our current project pipeline. We confirm
                  realistic timelines once requirements are reviewed.
                </p>
              </details>
              <details className="faq-item">
                <summary>What is bricktextures.com?</summary>
                <p>
                  bricktextures.com is the BLOC-TEC development and testing
                  environment used to trial new software ideas before selected
                  features are rolled into manufacturer-linked accounts.
                </p>
              </details>
            </div>
          </article>

          <article className="card">
            <h2>Account management and support</h2>
            <div className="faq-accordion">
              <details className="faq-item">
                <summary>What level of technical support is offered?</summary>
                <p>
                  We provide ongoing support for account updates, compatibility
                  maintenance, and operational guidance as your setup evolves.
                </p>
              </details>
              <details className="faq-item">
                <summary>Where can we use our software?</summary>
                <p>
                  Accounts can be used on approved website domains and in
                  non-web contexts such as showrooms, sales presentations, and
                  exhibition environments.
                </p>
              </details>
              <details className="faq-item">
                <summary>
                  Can products be added and removed after launch?
                </summary>
                <p>
                  Yes. We can remove outdated products and onboard new products
                  as your catalogue changes.
                </p>
              </details>
              <details className="faq-item">
                <summary>Can modules be added after launch?</summary>
                <p>
                  Yes. Additional capabilities can be phased in as commercial
                  and technical priorities develop.
                </p>
              </details>
              <details className="faq-item">
                <summary>How are scenes managed after launch?</summary>
                <p>
                  Scene selection can be updated as your account evolves,
                  including custom scene requests where suitable.{" "}
                  <NavLink to="/scenes">Open Scenes</NavLink>
                </p>
              </details>
            </div>
          </article>

          <article className="card">
            <h2>Product images</h2>
            <div className="faq-accordion">

              <details className="faq-item">
                <summary>How are product images created?</summary>
               <p>
                We photograph physical product samples under controlled lighting
                conditions that mimic sunlight. All images are colour
                calibrated. We also ensure only
                the finished surface is shown so bonds and joint areas are presented accurately.
              </p>
              </details>
              <details className="faq-item">
                <summary>Can we use our own images?</summary>
                <p>
                  Yes. We review
                  supplied imagery for suitability before use so
                  display quality remains consistent. 
                </p>
              </details>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="card">
            <h2>Didn&apos;t find what you need?</h2>
            <p>
              If you have further questions, contact us directly and we&apos;ll
              be happy to help.
            </p>
            <div className="faq-cta-actions">
              <NavLink className="btn btn-primary scene-cta-btn" to="/contact">
                Contact BLOC-TEC
              </NavLink>
              <a
                className="btn btn-secondary scene-cta-btn"
                href="mailto:info@bloc-tec.com"
              >
                Email info@bloc-tec.com
              </a>
            </div>
          </article>
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
          For business, platform, and manufacturer enquiries, send us a message
          and we will route it to the right team.
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
          Guidance for delivery and preparation of samples used in BLOC-TEC
          account set-up and photography workflows.
        </p>
      </div>

      <section className="section quick-links-section">
        <div className="container">
          <p className="quick-links">
            <a className="btn-small" href="#preparation">
              Preparation for photography
            </a>
            <a className="btn-small" href="#customs-info">
              Customs and compliance
            </a>
          </p>
        </div>
      </section>

      <section className="section section-alt" id="delivery-address">
        <div className="container card">
          <h2>Delivery of samples</h2>
          <div className="feature-list samples-delivery-list">
            <article className="feature-row">
              <div className="feature-content">
                <h3>
                  <span className="samples-icon" aria-hidden="true">
                    <Box24Regular />
                  </span>
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
                  <span className="samples-icon" aria-hidden="true">
                    <Call24Regular />
                  </span>
                  Delivery contact
                </h3>
                <p>
                  <strong>Office:</strong> 025 46682
                  <br />
                  <strong>Mob:</strong> 087 989 7014
                  <br />
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@bloc-tec.com">info@bloc-tec.com</a>
                </p>
              </div>
            </article>

            <article className="feature-row" id="offloading">
              <div className="feature-content">
                <h3>
                  <span className="samples-icon" aria-hidden="true">
                    <Box24Regular />
                  </span>
                  Off-loading of pallets
                </h3>
                <p>
                  We do not have a forklift at our photography area. Palleted
                  samples need to be off-loaded by the courier using a tail lift
                  or another suitable method.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="preparation">
        <div className="container card">
          <h2>Preparation of samples for photography</h2>
          <div className="feature-list samples-prep-list">
            <article className="feature-row samples-matrix-card" id="quantity">
              <div className="feature-content">
                <h3>
                  <span className="samples-icon" aria-hidden="true">
                    <Table24Regular />
                  </span>
                  Guidance for number of product samples
                </h3>
                <p>
                  We need to have enough samples to correctly represent your
                  product and avoid visible repetition. Ensure you select
                  samples to represent the full colour range of your product.
                </p>
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
            </article>

            <article className="feature-row" id="packing">
              <div className="feature-content">
                <h3>
                  <span className="samples-icon" aria-hidden="true">
                    <CheckmarkCircle24Regular />
                  </span>
                  Packing checklist
                </h3>
                <ul className="benefit-list">
                  <li>
                    Clearly label samples with product name and/or product code
                  </li>
                  <li>Ensure samples are clean and dry</li>
                  <li>
                    Where possible, place samples on edge to reduce cracking
                    risk
                  </li>
                  <li>
                    Protect all finished faces and edges using suitable
                    cushioning materials
                  </li>
                  <li>
                    For brick products requiring header photography, ensure both
                    header and stretcher faces are protected from direct contact
                  </li>
                </ul>
                <p>
                  Use load-resistant cushioning materials (for example
                  closed-cell foam; 4mm+ sheets are recommended).
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="customs-info">
        <div className="container card">
          <h2>
            <span className="samples-icon" aria-hidden="true">
              <Globe24Regular />
            </span>
            Customs and compliance
          </h2>
          <div className="feature-list samples-customs-list">
            <article className="feature-row" id="customs">
              <div className="feature-content">
                <h3>Customs information (samples sent from outside the EU)</h3>
                <p>
                  Samples must be sent DDP (Delivered Duty Paid). Due to customs
                  complexity, many clients use an agent for smoother shipment
                  handling.
                </p>
              </div>
            </article>

            <article className="feature-row">
              <div className="feature-content">
                <h3>Customs charges and registration</h3>
                <p>
                  All costs associated with delivery or return of products are
                  covered by the sender. An administration charge of 50 EUR
                  applies where samples are not sent DDP.
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
                <h3 id="customs-links">
                  <span className="samples-icon" aria-hidden="true">
                    <Link24Regular />
                  </span>
                  Useful customs links
                </h3>
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
          This page will contain the official BLOC-TEC privacy policy in HTML
          format.
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
          This page will contain the official BLOC-TEC app terms of use in HTML
          format.
        </p>
      </div>
    </main>
  );
}

function ScenesPage() {
  const [sharedFilter, setSharedFilter] = useState<
    "Walling" | "Paving" | "Flooring"
  >("Walling");
  const [sharedSubFilter, setSharedSubFilter] = useState<string>("All");
  const [lightboxScene, setLightboxScene] = useState<null | {
    title: string;
    imageSrc: string;
  }>(null);
  const sharedFilters = ["Walling", "Paving", "Flooring"] as const;

  const sceneImageBaseUrl = "https://app.bloc-tec.com/images/scenes";
  const sharedSceneImage = (
    group: "paving" | "walling" | "flooring",
    name: string,
  ) => `${sceneImageBaseUrl}/shared/${group}/${encodeURIComponent(name)}.webp`;
  const customSceneImage = (account: string, name: string) =>
    `${sceneImageBaseUrl}/custom/${encodeURIComponent(account)}/${encodeURIComponent(name)}.webp`;

  type SharedGroup = "paving" | "walling" | "flooring";
  type SharedCategory = (typeof sharedFilters)[number];
  const categoryLabelByGroup: Record<SharedGroup, SharedCategory> = {
    paving: "Paving",
    walling: "Walling",
    flooring: "Flooring",
  };

  const getSubLevel = (group: SharedGroup, sceneName: string): string => {
    if (group === "paving") {
      if (sceneName.startsWith("Patio") || sceneName.startsWith("Pool"))
        return "Patios";
      if (sceneName.startsWith("Driveway")) return "Driveways";
      if (sceneName.startsWith("CommercialPaving")) return "Commercial";
      return "General";
    }
    if (group === "walling") {
      if (sceneName.startsWith("HouseWall")) return "House";
      if (sceneName.startsWith("CommercialWall")) return "Commercial";
      if (sceneName.startsWith("GardenWall")) return "Garden";
      if (sceneName.startsWith("InternalWall")) return "Internal";
      return "General";
    }
    if (group === "flooring") return "Internal";
    return "General";
  };

  const formatSceneTitle = (sceneName: string): string =>
    sceneName
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Za-z])(\d+)/g, "$1 $2")
      .trim();

  const sharedSceneCatalog: Array<{ group: SharedGroup; sceneName: string }> = [
    { group: "paving", sceneName: "Driveway1" },
    { group: "paving", sceneName: "Driveway2" },
    { group: "paving", sceneName: "Driveway3" },
    { group: "paving", sceneName: "Driveway4" },
    { group: "paving", sceneName: "Driveway5" },
    { group: "paving", sceneName: "Driveway6" },
    { group: "paving", sceneName: "Driveway7" },
    { group: "paving", sceneName: "Driveway8" },
    { group: "paving", sceneName: "Patio1" },
    { group: "paving", sceneName: "Patio2" },
    { group: "paving", sceneName: "Patio3" },
    { group: "paving", sceneName: "Patio4" },
    { group: "paving", sceneName: "Patio5" },
    { group: "paving", sceneName: "Patio6" },
    { group: "paving", sceneName: "Pool1" },
    { group: "paving", sceneName: "CommercialPaving1" },
    { group: "paving", sceneName: "CommercialPaving2" },
    { group: "paving", sceneName: "CommercialPaving3" },
    { group: "walling", sceneName: "CommercialWall1" },
    { group: "walling", sceneName: "CommercialWall2" },
    { group: "walling", sceneName: "CommercialWall3" },
    { group: "walling", sceneName: "GardenWall1" },
    { group: "walling", sceneName: "GardenWall2" },
    { group: "walling", sceneName: "HouseWall1" },
    { group: "walling", sceneName: "HouseWall2" },
    { group: "walling", sceneName: "HouseWall3" },
    { group: "walling", sceneName: "InternalWall1" },
    { group: "walling", sceneName: "InternalWall2" },
    { group: "walling", sceneName: "InternalWall3" },
    { group: "walling", sceneName: "InternalWall4" },
    { group: "flooring", sceneName: "Floor1" },
    { group: "flooring", sceneName: "Floor2" },
    { group: "flooring", sceneName: "Floor3" },
  ];

  const sharedScenes = sharedSceneCatalog.map((scene) => ({
    title: formatSceneTitle(scene.sceneName),
    category: categoryLabelByGroup[scene.group],
    subLevel: getSubLevel(scene.group, scene.sceneName),
    imageSrc: sharedSceneImage(scene.group, scene.sceneName),
  }));

  const customScenes = [
    {
      title: "Featured housing contract",
      imageSrc: customSceneImage("AG", "AGHouse1"),
      reason:
        "Our client wanted a semi-detached house with a central gable roof to reflect a major housing contract they were supplying bricks to.",
    },
    {
      title: "Large commercial and institutional buildings",
      imageSrc: customSceneImage("ibstock", "IBSTOCKFirrhill"),
      reason:
        "Brick manufacturers often want to visualise large facade projects such as hospitals, schools, commercial buildings, and other institutional developments.",
    },
    {
      title: "House typical of local factory area",
      imageSrc: customSceneImage("ibstock", "IBSTOCKRegencyManor"),
      reason:
        "This reflects a typical house style in the region around the brick manufacturer's factory.",
    },
    {
      title: "Specialist product use",
      imageSrc: customSceneImage("outhaus", "OUTHAUSInternalBrick1"),
      reason:
        "Clients may have specialised walling products, such as internal cladding. Custom scenes can showcase unique applications.",
    },
    {
      title: "Focus on architectural features",
      imageSrc: customSceneImage("outhaus", "OUTHAUSGableWithPorch"),
      reason:
        "Custom scenes can highlight unique features, such as a zinc porch or other distinctive architectural details.",
    },
    {
      title: "Hero image use",
      imageSrc: customSceneImage("outhaus", "OUTHAUSPaving1"),
      reason:
        "Our client had a high-performing hero image that we were able to incorporate into their account.",
    },
  ];

  const availableSubFilters = [
    "All",
    ...Array.from(
      new Set(
        sharedScenes
          .filter((scene) => scene.category === sharedFilter)
          .map((scene) => scene.subLevel),
      ),
    ),
  ];
  const realSubFilterCount = availableSubFilters.filter(
    (sub) => sub !== "All",
  ).length;

  const activeSubFilter = availableSubFilters.includes(sharedSubFilter)
    ? sharedSubFilter
    : "All";

  const filteredSharedScenes = sharedScenes.filter((scene) => {
    if (scene.category !== sharedFilter) return false;
    if (activeSubFilter !== "All" && scene.subLevel !== activeSubFilter)
      return false;
    return true;
  });

  useEffect(() => {
    if (!lightboxScene) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxScene(null);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxScene]);

  return (
    <main className="section scenes-page">
      <div className="container page-header">
        <p className="eyebrow">Scenes</p>
        <h1>Scene options for manufacturer accounts</h1>
        <p className="lead">
          We provide a library of shared scenes available across all client
          accounts for anyone who wants to use them.
        </p>
        <p className="lead">
          For a hassle-free launch, we can assign scenes from this shared
          library so your account is ready quickly without scene setup concerns.
          After launch, you can refine your scene list using proven shared
          options and add custom scenes that better match your products and
          local market.
        </p>
      </div>

      <section className="section scenes-panel">
        <div className="container scenes-panel-inner">
          <h2>Shared scenes</h2>
          <p>
            Shared scenes are grouped as Paving, Walling, and Flooring to match
            your product categories.
          </p>
          <p>
            These scenes have been used successfully by our clients, giving you
            a reliable starting point while keeping your initial setup
            straightforward.
          </p>
          <div
            className="scene-filter-bar"
            role="tablist"
            aria-label="Shared scene category filters"
          >
            {sharedFilters.map((filter) => (
              <button
                key={filter}
                className={`scene-filter-btn${sharedFilter === filter ? " active" : ""}`}
                type="button"
                onClick={() => {
                  setSharedFilter(filter);
                  setSharedSubFilter("All");
                }}
              >
                <span>{filter}</span>
              </button>
            ))}
          </div>
          {realSubFilterCount > 1 ? (
            <>
              <p className="scene-subfilter-label">
                Filter {sharedFilter} scenes
              </p>
              <div
                className="scene-subfilter-bar"
                role="tablist"
                aria-label={`${sharedFilter} scene sub-category filters`}
              >
                {availableSubFilters.map((subFilter) => (
                  <button
                    key={subFilter}
                    className={`scene-subfilter-btn${activeSubFilter === subFilter ? " active" : ""}`}
                    type="button"
                    onClick={() => setSharedSubFilter(subFilter)}
                  >
                    {subFilter}
                  </button>
                ))}
              </div>
            </>
          ) : null}
          <div className="scene-grid">
            {filteredSharedScenes.map((scene) => (
              <article
                key={`${scene.category}-${scene.title}`}
                className="scene-card"
              >
                <button
                  className="scene-card-trigger"
                  type="button"
                  onClick={() =>
                    setLightboxScene({
                      title: scene.title,
                      imageSrc: scene.imageSrc,
                    })
                  }
                  aria-label={`View larger: ${scene.title}`}
                >
                  <div className="scene-thumb">
                    <img
                      src={scene.imageSrc}
                      alt={scene.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3>{scene.title}</h3>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section scenes-panel" id="custom-scenes">
        <div className="container scenes-panel-inner">
          <h2>Custom scenes</h2>
          <p>
            Custom scenes are the key option when you need local relevance or a
            specific context for your market. This is often the strongest reason
            clients choose custom scene work.
          </p>
          <p>
            If you already have a hero scene or image that performs well, send it
            to us and we will do our best to include it in the software. If
            adjustments are needed, we will guide you on the required changes.
          </p>
          <div className="scene-grid">
            {customScenes.map((scene) => (
              <article key={scene.title} className="scene-card">
                <button
                  className="scene-card-trigger"
                  type="button"
                  onClick={() =>
                    setLightboxScene({
                      title: scene.title,
                      imageSrc: scene.imageSrc,
                    })
                  }
                  aria-label={`View larger: ${scene.title}`}
                >
                  <div className="scene-thumb">
                    <img
                      src={scene.imageSrc}
                      alt={scene.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3>{scene.title}</h3>
                  <p className="scene-reason">{scene.reason}</p>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section scenes-panel scenes-panel-cta">
        <div className="container scenes-panel-inner">
          <h2>Have a scene idea?</h2>
          <p>
            If you have a scene concept and want to know whether it can be added
            to your account, contact us and we can review suitability.
          </p>
          <NavLink className="btn btn-primary scene-cta-btn" to="/contact">
            Ask about scene suitability
          </NavLink>
        </div>
      </section>

      {lightboxScene ? (
        <div
          className="scene-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxScene.title}
          onClick={() => setLightboxScene(null)}
        >
          <div
            className="scene-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="btn-small scene-lightbox-close"
              type="button"
              onClick={() => setLightboxScene(null)}
            >
              Close
            </button>
            <img src={lightboxScene.imageSrc} alt={lightboxScene.title} />
            <p className="scene-lightbox-title">{lightboxScene.title}</p>
          </div>
        </div>
      ) : null}
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
