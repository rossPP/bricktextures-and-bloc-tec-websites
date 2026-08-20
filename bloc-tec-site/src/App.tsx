import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import {
  Box24Regular,
  Globe24Regular,
  CheckmarkCircle24Regular,
  Table24Regular,
  VehicleTruckProfile24Regular,
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

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const MARSHALLS_INTEGRATION_URL =
  "https://www.marshalls.co.uk/bricks-and-masonry/facing-bricks";
const TOBERMORE_INTEGRATION_URL =
  "https://www.tobermore.co.uk/professional/paving-walling-creator/";
const KINGSCOURT_INTEGRATION_URL = "https://kingscourtbrick.com/bricks/";
const ACHESON_GLOVER_INTEGRATION_URL =
  "https://ag.uk.com/professional/product-visualiser/";
const CLAY_AND_CO_INTEGRATION_URL = "https://clayandco.com/product-visualiser";

const SOCIAL_LINKS = [
  {
    id: "facebook",
    label: "Facebook",
    iconSrc: "/images/social/facebook.svg",
    href: "https://www.facebook.com/paverpicker",
  },
  {
    id: "x",
    label: "X",
    iconSrc: "/images/social/x.svg",
    href: "https://x.com/bloc_tec",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    iconSrc: "/images/social/linkedin.svg",
    href: "https://www.linkedin.com/company/bloc-tec",
  },
] as const;

const getClientLogoUrl = (accountName: string) =>
  `https://app.bloc-tec.com/images/Clients/${accountName}/${accountName}_logo.png`;

const getAccountAppUrl = (accountName: string) =>
  `https://app.bloc-tec.com/account/${accountName}`;

type IntegrationMethodKey = "base" | "category" | "product" | "sku";

type IntegrationQueryParam = {
  code: string;
  required: boolean;
  explanation: string;
};

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
  queryParams?: IntegrationQueryParam[];
  recommendedIntro?: string;
  recommendedMethods: Array<{
    method: string;
    reason: string;
  }>;
};

function getSkuDemoUrl(productCode: string) {
  return `https://app.bloc-tec.com/account/ag/?c=${encodeURIComponent(productCode)}`;
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
      "Loads your full product collection.",
    demoIframeUrl: "https://app.bloc-tec.com/account/ag",
    examplePrefix: "https://app.bloc-tec.com/account/",
    exampleHighlight: "ag",
    queryParams: [
      {
        code: "<account-name>",
        required: true,
        explanation:
          "Your BLOC-TEC account name, provided during account set-up.",
      },
    ],
    recommendedIntro:
      "These methods avoid double-scroll issues that can occur in embedded mode with large swatch sets.",
    recommendedMethods: [
      {
        method: "New tab",
        reason: "largest available viewing area.",
      },
      {
        method: "Modal window",
        reason:
          "keeps users on your site; smaller viewing area than New tab.",
      },
    ],
  },
  category: {
    buttonLabel: "Category",
    title: "Linking to category level",
    templatePrefix: "https://app.bloc-tec.com/account/<account-name>/",
    templateHighlight: "<category-group-name>",
    description:
      "Loads one category from your account product structure.",
    demoIframeUrl: "https://app.bloc-tec.com/account/ag/Paving%20Blocks",
    examplePrefix: "https://app.bloc-tec.com/account/ag/",
    exampleHighlight: "Paving Blocks",
    queryParams: [
      {
        code: "<account-name>",
        required: true,
        explanation: "Your BLOC-TEC account name.",
      },
      {
        code: "<category-group-name>",
        required: true,
        explanation: "Category group name to load.",
      },
      {
        code: "prodBack=false",
        required: false,
        explanation:
          "Hides the product-level back control so users stay in your category-page flow.",
      },
    ],
    recommendedIntro:
      "These methods avoid double-scroll issues that can occur in embedded mode with large swatch sets.",
    recommendedMethods: [
      {
        method: "New tab",
        reason: "largest available viewing area.",
      },
      {
        method: "Modal window",
        reason:
          "keeps users on your site; smaller viewing area than New tab.",
      },
    ],
  },
  product: {
    buttonLabel: "Product",
    title: "Linking to product level",
    templatePrefix: "https://app.bloc-tec.com/account/<account-name>/",
    templateHighlight: "<category-group-name>/?viewProduct=<product-name>",
    description:
      "Loads a product within a category so users can browse its colours and finishes.",
    demoIframeUrl:
      "https://app.bloc-tec.com/account/ag/Paving%20Blocks/?viewProduct=Plaza",
    examplePrefix: "https://app.bloc-tec.com/account/ag/",
    exampleHighlight: "Paving Blocks/?viewProduct=Plaza",
    queryParams: [
      {
        code: "<category-group-name>",
        required: true,
        explanation:
          "Category group name that scopes the product lookup.",
      },
      {
        code: "viewProduct=<product-name>",
        required: true,
        explanation: "Product to open for colour and finish browsing.",
      },
    ],
    recommendedMethods: [
      {
        method: "Modal window",
        reason: "good focus for product-level exploration.",
      },
      {
        method: "Embedded",
        reason: "more seamless with your website flow.",
      },
    ],
  },
  sku: {
    buttonLabel: "SKU / Colour",
    title: "Linking to individual SKU level",
    templatePrefix: "https://app.bloc-tec.com/account/<account-name>/?",
    templateHighlight: "c=<product-sku>",
    description:
      "Loads one colour/SKU for a single-product page, independent of category path.",
    demoIframeUrl: getSkuDemoUrl("BPPL_PE_WAET"),
    examplePrefix: "https://app.bloc-tec.com/account/ag/?",
    exampleHighlight: "c=BPPL_PE_WAET",
    queryParams: [
      {
        code: "c=<product-sku>",
        required: true,
        explanation: "Exact colour/SKU to load.",
      },
      {
        code: "viewerBack=false",
        required: false,
        explanation:
          "Hides the viewer-level back control so users stay in your product-page flow.",
      },
      {
        code: "canBlend=false",
        required: false,
        explanation:
          "Disables blend controls on single-product pages when the blender module is active.",
      },
      {
        code: "tab=blend",
        required: false,
        explanation:
          "Opens the Blend tab instead of the default configuration tab when the blender module is active.",
      },
    ],
    recommendedMethods: [
      {
        method: "Modal window",
        reason: "good focus for product-level exploration.",
      },
      {
        method: "Embedded",
        reason: "more seamless with your website flow.",
      },
    ],
  },
};

function Header() {
  const location = useLocation();
  const [supportOpen, setSupportOpen] = useState(false);
  const supportTriggerRef = useRef<HTMLButtonElement | null>(null);
  const supportDropdownRef = useRef<HTMLElement | null>(null);
  const supportLinks = [
    { to: "/faq", label: "FAQ" },
    { to: "/integration", label: "Integration" },
    { to: "/scenes", label: "Scenes" },
    { to: "/product-samples", label: "Product Samples" },
  ] as const;
  const isSupportActive = supportLinks.some((item) =>
    location.pathname.startsWith(item.to),
  );

  useEffect(() => {
    if (!supportOpen) return;

    const onDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      if (supportTriggerRef.current?.contains(target)) return;
      if (supportDropdownRef.current?.contains(target)) return;

      setSupportOpen(false);
    };

    const onDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSupportOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocumentMouseDown);
    document.addEventListener("keydown", onDocumentKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocumentMouseDown);
      document.removeEventListener("keydown", onDocumentKeyDown);
    };
  }, [supportOpen]);

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
            <span className="brand-tagline">
              Digital tools for brick and paving specification
            </span>
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/for-manufacturers">Manufacturers</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <button
              type="button"
              ref={supportTriggerRef}
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
              ref={supportDropdownRef}
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

type HomePartner = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  integrationUrl: string;
  appUrl: string;
};

const HOME_PARTNERS: HomePartner[] = [
  {
    id: "clayandco",
    name: "Clay & Co",
    description:
      "A specialist brick and cladding supplier with a product visualiser-led customer journey. Integration supports faster product discovery, leading to confident choices.",
    logoUrl: getClientLogoUrl("outhaus"),
    integrationUrl: CLAY_AND_CO_INTEGRATION_URL,
    appUrl: getAccountAppUrl("outhaus"),
  },
  {
    id: "marshalls",
    name: "Marshalls Bricks & Masonry",
    description:
      "A leading UK supplier of concrete bricks and masonry products, with a strong focus on innovation, colour and finish choice, and practical walling performance.",
    logoUrl: getClientLogoUrl("MARSHALLS"),
    integrationUrl: MARSHALLS_INTEGRATION_URL,
    appUrl: getAccountAppUrl("marshalls"),
  },
  {
    id: "tobermore",
    name: "Tobermore Concrete",
    description:
      "A leading Northern Ireland manufacturer of concrete paving and walling products. Integration supports practical specification and product selection workflows.",
    logoUrl: getClientLogoUrl("tobermore"),
    integrationUrl: TOBERMORE_INTEGRATION_URL,
    appUrl: getAccountAppUrl("tobermore"),
  },
  {
    id: "kingscourt",
    name: "Kingscourt Bricks",
    description:
      "A long-established Irish clay brick manufacturer. Integration demonstrates that the platform is effective for focused specialist ranges as well as large catalogues.",
    logoUrl: getClientLogoUrl("kingscourt_brick"),
    integrationUrl: KINGSCOURT_INTEGRATION_URL,
    appUrl: getAccountAppUrl("kingscourt_brick"),
  },
  {
    id: "achesonglover",
    name: "Acheson & Glover",
    description:
      "A well-established hard landscaping manufacturer. Integration highlights how BLOC-TEC supports practical paving-focused product journeys and client-ready output.",
    logoUrl: getClientLogoUrl("ag"),
    integrationUrl: ACHESON_GLOVER_INTEGRATION_URL,
    appUrl: getAccountAppUrl("ag"),
  },
];

const SWIPE_MIN_PX = 50;

function WhoWeWorkWithSlider() {
  const [index, setIndex] = useState(0);
  const [slideDir, setSlideDir] = useState<"next" | "prev">("next");
  const touchStartX = useRef<number | null>(null);
  const partner = HOME_PARTNERS[index];
  const count = HOME_PARTNERS.length;

  const goPrev = useCallback(() => {
    setSlideDir("prev");
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setSlideDir("next");
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const onTouchStart = useCallback((event: TouchEvent) => {
    touchStartX.current = event.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (touchStartX.current == null) return;
      const delta = event.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(delta) < SWIPE_MIN_PX) return;
      if (delta > 0) goPrev();
      else goNext();
    },
    [goNext, goPrev],
  );

  const onTouchCancel = useCallback(() => {
    touchStartX.current = null;
  }, []);

  return (
    <div className="home-partner-slider-viewport">
      <button
        type="button"
        className="home-partner-slider-btn"
        aria-label="Previous manufacturer"
        onClick={goPrev}
      >
        ‹
      </button>
      <div
        className="home-partner-slider-track"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
        role="group"
        aria-roledescription="carousel"
        aria-label="Manufacturer highlights"
      >
        <div
          className={`home-partner-slider-panel home-partner-slider-panel--${slideDir}`}
          key={partner.id}
          aria-live="polite"
        >
          <div className="home-partner-logo">
            <img src={partner.logoUrl} alt={`${partner.name} logo`} loading="lazy" />
          </div>
          <div className="home-partner-slide-body">
            <h3>{partner.name}</h3>
            <p>{partner.description}</p>
            <div className="integration-actions home-partner-actions">
              <a
                className="btn btn-primary"
                href={partner.integrationUrl}
                target="_blank"
                rel="noreferrer"
              >
                View integration
              </a>
              <a
                className="btn btn-primary"
                href={partner.appUrl}
                target="_blank"
                rel="noreferrer"
              >
                View products in app
              </a>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="home-partner-slider-btn"
        aria-label="Next manufacturer"
        onClick={goNext}
      >
        ›
      </button>
    </div>
  );
}

function HomePage() {
  return (
    <main id="top" className="home-page">
      <section className="hero">
        <div className="container">
          <p className="eyebrow">BLOC-TEC</p>
          <h1>Digital tools for brick and paving specification</h1>
          <p className="lead">
            BLOC-TEC helps brick and paving manufacturers present products
            clearly online, so customers can explore, compare, and specify
            with confidence.
          </p>
        </div>
        <div className="home-hero-image-breakout">
          <img
            className="home-hero-image"
            src="/images/conceptToRealityHero.webp"
            alt="From early concept sketches to finished paving and product presentation"
            width={1200}
            height={600}
            decoding="async"
          />
        </div>
      </section>

      <section id="about" className="section scenes-panel">
        <div className="container scenes-panel-inner">
          <h2>Turn concepts into reality.</h2>
          <p>
            From early concepts through to finished digital tools, we support
            configuration workflows, product blending, texture-ready outputs,
            and clear sharing for teams, stakeholders, and clients.
          </p>
        </div>
      </section>

      <section id="app" className="section scenes-panel section-alt">
        <div className="container scenes-panel-inner">
          <h2>Who we work with</h2>
          <p>
            BLOC-TEC supports both leading manufacturers and specialist
            producers with practical digital solutions for product presentation,
            specification, and sharing. Explore each manufacturer to see how
            their products are presented in the BLOC-TEC app.
          </p>
          <WhoWeWorkWithSlider />
        </div>
      </section>

      <section className="section cta-band home-next-step">
        <div className="container">
          <article className="card page-cta-card">
            <h2>Ready to see what BLOC-TEC can do for you?</h2>
            <p>
              Explore how BLOC-TEC supports product presentation, specification,
              reseller channels, and digital sales journeys.
            </p>
            <Link className="btn btn-primary scene-cta-btn" to="/for-manufacturers">
              Find out more
            </Link>
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
    <main className="section contact-page">
      <div className="container page-header">
        <p className="eyebrow">Integration</p>
        <h1>Integration into your website</h1>
        <p className="lead">
          Integration is configured around your account name, with link options
          across account, category, product, and SKU levels, plus images
          you can download and host on your own pages.
        </p>
      </div>

      <section className="section" id="integration-methods">
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
                <div className="integration-code-card">
                  <pre className="integration-code-block">
                    <code>
                      {activeMethod.templatePrefix}
                      <strong>{activeMethod.templateHighlight}</strong>
                    </code>
                  </pre>
                </div>
                <p className="integration-step">{activeMethod.description}</p>
                {activeMethod.queryParams?.length ? (
                  <>
                    {activeMethod.queryParams.some((param) => param.required) ? (
                      <p className="integration-step">
                        <span className="integration-subtitle">
                          Required parameters:
                        </span>
                        <br />
                        {activeMethod.queryParams
                          .filter((param) => param.required)
                          .map((param) => (
                            <span
                              key={param.code}
                              className="integration-param-line"
                            >
                              <code>{param.code}</code> — {param.explanation}
                            </span>
                          ))}
                      </p>
                    ) : null}
                    {activeMethod.queryParams.some((param) => !param.required) ? (
                      <p className="integration-step">
                        <span className="integration-subtitle">
                          Optional parameters:
                        </span>
                        <br />
                        {activeMethod.queryParams
                          .filter((param) => !param.required)
                          .map((param) => (
                            <span
                              key={param.code}
                              className="integration-param-line"
                            >
                              <code>{param.code}</code> — {param.explanation}
                            </span>
                          ))}
                      </p>
                    ) : null}
                  </>
                ) : null}
                <p className="integration-step">
                  <span className="integration-subtitle">Examples</span>
                </p>
                <div className="integration-method-actions">
                  <a
                    className="btn-small"
                    href={activeMethod.demoIframeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    New tab
                  </a>
                  <button
                    className="btn-small"
                    type="button"
                    onClick={() => {
                      setShowIframeModal(true);
                      setShowIframePreview(false);
                    }}
                  >
                    Modal window
                  </button>
                  <button
                    className={`btn-small${showIframePreview ? " active" : ""}`}
                    type="button"
                    onClick={() => {
                      setShowIframePreview(true);
                      setShowIframeModal(false);
                    }}
                  >
                    Embedded
                  </button>
                </div>
                {showIframePreview ? (
                  <div className="integration-preview-wrap">
                    <div className="integration-preview-toolbar">
                      <span className="integration-preview-url">
                        URL: <code>{activeMethod.demoIframeUrl}</code>
                      </span>
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
                {selectedMethod === "product" ? (
                  <>
                    <p className="integration-step">
                      <span className="integration-subtitle">
                        Admin URL copy helper:
                      </span>
                    </p>
                    <p className="integration-step">
                      Add <code>admin=true</code> to the account or category URL
                      to reveal hidden copy controls beside each product. Use{" "}
                      <code>Copy productView</code> to copy the recommended
                      product-level URL with the category group name and{" "}
                      <code>viewProduct</code> query. The admin flag is removed
                      after loading and is not included in copied links. Include
                      the trailing forward slash before the query string, as
                      shown below.
                    </p>
                    <div className="integration-code-card">
                      <pre className="integration-code-block">
                        <code>
                          {`https://app.bloc-tec.com/account/<account-name>/?`}
                          <strong>admin=true</strong>
                        </code>
                      </pre>
                    </div>
                  </>
                ) : null}
                {selectedMethod === "sku" ? (
                  <>
                    <p className="integration-step">
                      <span className="integration-subtitle">
                        Admin URL copy helper:
                      </span>
                    </p>
                    <p className="integration-step">
                      Add <code>admin=true</code> to the account or category URL
                      to reveal hidden copy controls beside each colour
                      option. Use <code>Copy c</code> to copy the minimum
                      SKU-level URL for the selected colour/SKU. The admin flag
                      is removed after loading and is not included in copied
                      links. Include the trailing forward slash before the query
                      string, as shown below.
                    </p>
                    <p className="integration-step">
                      SKU links intentionally omit the category segment so you can
                      reorganise categories later without breaking existing links.
                      The copied <code>c</code> URL is the minimum colour/SKU
                      reference needed to load that option.
                    </p>
                    <div className="integration-code-card">
                      <pre className="integration-code-block">
                        <code>
                          {`https://app.bloc-tec.com/account/<account-name>/?`}
                          <strong>admin=true</strong>
                        </code>
                      </pre>
                    </div>
                    <p className="integration-step">
                      <span className="integration-subtitle">
                        If blender module is active:
                      </span>
                    </p>
                    <p className="integration-step">
                      See the Blender integration guidance below for when to use{" "}
                      <code>canBlend=false</code> and <code>tab=blend</code>.
                    </p>
                  </>
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
                  by appending the query parameter <code>logo=false</code>.
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

      <section className="section" id="swatch-image-downloads">
        <div className="container">
          <article className="card">
            <h2>Download images for your own product lists</h2>
            <p>
              Every product in your account can be downloaded as a swatch image
              and hosted on your own website, which suits product lists built in
              WordPress or any other template platform where an embed or an API
              is awkward. The images are drawn to the physical area you ask for,
              so products keep a consistent scale and framing and your customers
              can compare them fairly.
            </p>
            <p className="integration-step">
              <span className="integration-subtitle">What you choose</span>
            </p>
            <ul className="integration-step">
              <li>
                Every product in a category, a single product, or one colour of
                it.
              </li>
              <li>
                The area each image covers, in millimetres, and the quality:
                1, 2, or 4 pixels per millimetre.
              </li>
              <li>
                What goes into the file names, from the product, colour, finish,
                size, SKU, area, and quality. Names are lower case and
                hyphenated so they sit in a URL without escaping.
              </li>
            </ul>
            <p>
              A preview shows how much of the product the chosen area covers
              before anything is created. A single image downloads as a file of
              its own, and a larger selection arrives as a ZIP with a folder per
              product. Everything is WebP, sized for the web rather than print.
            </p>
            <p>
              The images are created in your browser and downloaded straight to
              your machine, so there is no key to manage and no upload step.
              Contact us and we will show you where to find it in your account.
            </p>
          </article>
        </div>
      </section>

      <section className="section section-alt" id="share-button-domain">
        <div className="container">
          <article className="card">
            <h2>Configure Share links to your website URL</h2>
            <p className="integration-step">
              In iframe mode, the helper keeps Share links on your own website
              domain; without it, Share links open on the app domain.
            </p>
            <p className="integration-step">
              <span className="integration-subtitle">
                Iframe and helper script setup
              </span>
            </p>
            <ol className="integration-step">
              <li>
                Add <code>data-bt-viewer</code> to your embedded iframe. The
                helper script uses this attribute to find the correct iframe and
                keep Share links mapped to your website URL.
              </li>
              <li>
                Replace <code>&lt;account-name&gt;</code> with your own
                BLOC-TEC account name.
              </li>
              <li>
                Include <code>allow="clipboard-write"</code> on your embedded
                iframe for reliable copy-link support.
              </li>
              <li>
                In addition to your iframe, load the helper script.
              </li>
            </ol>
            <div className="integration-code-card">
              <pre className="integration-code-block">
                <code>
                  {`<iframe
  data-bt-viewer
  src="https://app.bloc-tec.com/account/`}
                  <strong>{`<account-name>`}</strong>
                  {`"
  allow="clipboard-write"
></iframe>

<script
  src="https://app.bloc-tec.com/integration/iframe-integration-helper.js"
  defer
></script>`}
                </code>
              </pre>
            </div>
            <p className="integration-step">
              For SKU pages, use a category-independent SKU URL next to your
              iframe.
            </p>
            <div className="integration-code-card">
              <pre className="integration-code-block">
                <code>
                  {`src="https://app.bloc-tec.com/account/`}
                  <strong>{`<account-name>`}</strong>
                  {`?c=`}
                  <strong>{`<product-sku>`}</strong>
                  {`"`}
                </code>
              </pre>
            </div>
            <p className="integration-step integration-resource-links">
              <a
                href="/integration/iframe-integration-helper.js"
                target="_blank"
                rel="noreferrer"
              >
                Open helper script
              </a>
              {" | "}
              <a
                href="/integration/iframe-integration-test.html"
                target="_blank"
                rel="noreferrer"
              >
                Open iframe integration test page
              </a>
            </p>
            <p className="integration-step">
              <span className="integration-subtitle">Future Development</span>
            </p>
            <p className="integration-step integration-link-note">
              Analytics support for iframe integrations is in progress. By
              integrating this script, you will be able to use it when this
              feature is released.
            </p>
          </article>
        </div>
      </section>

      {/* Analytics section intentionally hidden for launch.
          Re-enable this block when analytics guidance is ready to ship again.
      <section className="section" id="iframe-analytics-guidance">
        <div className="container">
          <article className="card">
            <h2>Embedded analytics events</h2>
            <p className="integration-step">
              When the app is embedded in an iframe, it can send a small approved
              event list to your website using <code>postMessage</code>. This
              lets your website decide whether to send those events into GA4,
              GTM, or another analytics platform.
            </p>
            <p className="integration-step">
              <span className="integration-subtitle">
                What your website receives
              </span>
            </p>
            <p className="integration-step">
              Host websites receive the event name plus a small payload. The
              relevant fields are listed under each event category below so it
              is clear what belongs to what.
            </p>
            <p className="integration-step">
              Any BLOC-TEC-only internal reporting fields should be ignored by
              host websites.
            </p>
            <p className="integration-step">
              <span className="integration-subtitle">
                Event categories
              </span>
            </p>
            <p className="integration-step">
              The approved event list is intentionally small and practical so it
              is easy to adopt without a big custom setup.
            </p>
            <div className="feature-list integration-list integration-advice-list">
              <article className="feature-row">
                <h3>App lifecycle</h3>
                <p className="integration-step">
                  <code>app_loaded</code> fires when the embedded app has loaded
                  and is ready for use.
                </p>
                <p className="integration-step">
                  Typical fields: <code>account_name</code>,{" "}
                  <code>is_embedded</code>, and <code>page_path</code>.
                </p>
                <p className="integration-step">
                  This is the core event for measuring iframe launches on your
                  website.
                </p>
              </article>
              <article className="feature-row">
                <h3>Product exploration</h3>
                <p className="integration-step">
                  <code>category_selected</code> fires when a user opens a
                  product category.
                </p>
                <p className="integration-step">
                  Typical fields: <code>account_name</code>,{" "}
                  <code>is_embedded</code>, and <code>category_name</code>.
                </p>
                <p className="integration-step">
                  <code>product_selected</code> fires when a user opens or
                  selects a product.
                </p>
                <p className="integration-step">
                  Typical fields: <code>account_name</code>,{" "}
                  <code>is_embedded</code>, and <code>product_name</code>.
                </p>
                <p className="integration-step">
                  <code>filter_changed</code> fires when a user changes product
                  filters in the app.
                </p>
                <p className="integration-step">
                  Typical fields: <code>account_name</code>,{" "}
                  <code>is_embedded</code>, <code>filter_type</code>, and{" "}
                  <code>filter_value</code>.
                </p>
                <p className="integration-step">
                  <code>scene_selected</code> fires when a user switches scenes.
                </p>
                <p className="integration-step">
                  Typical fields: <code>account_name</code>,{" "}
                  <code>is_embedded</code>, <code>scene_name</code>, and{" "}
                  <code>scene_category</code>.
                </p>
                <p className="integration-step">
                  These events are the best starting point if you want to measure
                  product interest and user exploration.
                </p>
              </article>
              <article className="feature-row">
                <h3>Sharing and enquiries</h3>
                <p className="integration-step">
                  <code>share_clicked</code> fires when a user uses the Share
                  flow.
                </p>
                <p className="integration-step">
                  Typical fields: <code>account_name</code>,{" "}
                  <code>is_embedded</code>, and <code>share_channel</code>.
                </p>
                <p className="integration-step">
                  <code>cta_clicked</code> fires when a user clicks the
                  sample or enquiry-style CTA exposed through the iframe.
                </p>
                <p className="integration-step">
                  Typical fields: <code>account_name</code>,{" "}
                  <code>is_embedded</code>, and <code>cta_name</code>.
                </p>
                <p className="integration-step">
                  These are useful higher-value events because they show stronger
                  intent than general browsing.
                </p>
              </article>
              <article className="feature-row">
                <h3>Suggested client setup</h3>
                <p className="integration-step">
                  Start with <code>app_loaded</code>,{" "}
                  <code>category_selected</code>, <code>product_selected</code>,{" "}
                  <code>scene_selected</code>, <code>share_clicked</code>, and{" "}
                  <code>cta_clicked</code>.
                </p>
                <p className="integration-step">
                  Add <code>filter_changed</code> only if your team wants a more
                  detailed view of how users narrow product choices.
                </p>
              </article>
            </div>
            <p className="integration-step">
              <span className="integration-subtitle">
                Who tracks what
              </span>
            </p>
            <p className="integration-step">
              For embedded iframes, your website should control whether these
              analytics events are forwarded. That means your existing site
              consent banner or preference system should decide whether GA4, GTM,
              or another analytics tool receives the events.
            </p>
            <p className="integration-step">
              Standalone BLOC-TEC experiences can collect consented analytics
              directly for BLOC-TEC. Embedded experiences are designed so the
              host website owns the main analytics flow.
            </p>
            <p className="integration-step">
              BLOC-TEC may retain limited embedded service-level reporting, such
              as app loads or key CTA activity, but clients should treat their
              own host analytics setup as the main source for embedded usage
              reporting.
            </p>
            <p className="integration-step">
              <span className="integration-subtitle">
                Testing
              </span>
            </p>
            <p className="integration-step">
              Use the iframe integration test page to confirm that share and
              analytics messages are both being received by the parent page
              before wiring them into your live website analytics.
            </p>
            <p className="integration-step">
              On your live site, the quickest checks are your browser network
              tab and your analytics platform&apos;s realtime reporting.
            </p>
            <p className="integration-step integration-resource-links">
              <a
                href="/integration/iframe-integration-helper.js"
                target="_blank"
                rel="noreferrer"
              >
                Open helper script
              </a>
              {" | "}
              <a
                href="/integration/iframe-integration-test.html"
                target="_blank"
                rel="noreferrer"
              >
                Open iframe integration test page
              </a>
            </p>
          </article>
        </div>
      </section>
      */}

      <section className="section integration-cta-section" id="integration-support">
        <div className="container">
          <article className="card page-cta-card">
            <h2>Need integration support now?</h2>
            <p>
              If you run into an integration issue, contact us
              with your account name and a short summary. We will be happy to help
              you resolve it.
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
              <span className="integration-preview-url">
                URL: <code>{activeMethod.demoIframeUrl}</code>
              </span>
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
        <h1>Digital tools for sales and specification</h1>
        <p className="lead">
          BLOC-TEC helps manufacturers present products clearly and consistently,
          with stronger digital experiences across web, showroom, and field
          sales.
        </p>
      </div>

      <section className="section" id="why-bloc-tec">
        <div className="container">
          <article className="manufacturer-section-block">
            <h2>Why choose BLOC-TEC</h2>
            <div className="manufacturer-section-layout">
              <div className="manufacturer-section-media">
                <img
                  src="/images/factoryToDesign.webp"
                  alt="From factory production to digital product presentation"
                  width={1200}
                  height={400}
                  decoding="async"
                />
              </div>
              <p className="manufacturer-section-paragraph">
                BLOC-TEC helps sales, technical, and marketing teams work from
                the same design and configuration approach, giving
                designers clearer comparisons and more confidence earlier in the
                decision process. This helps teams have more informed
                conversations, present options more clearly, and move projects
                forward with stronger product understanding.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section section-alt" id="what-offers">
        <div className="container">
          <article className="manufacturer-section-block">
            <h2>What BLOC-TEC offers</h2>
            <div className="manufacturer-section-layout">
              <div className="manufacturer-section-media">
                <img
                  src="/images/blendingForManufacturers.webp"
                  alt="BLOC-TEC blending tools for manufacturers"
                  width={1200}
                  height={400}
                  decoding="async"
                />
              </div>
              <div className="manufacturer-section-copy-single">
                <p className="manufacturer-section-paragraph">
                  BLOC-TEC gives you a flexible way to present products through
                  practical, design-led configuration. Products can be shown in
                  any mortar and any layout, while the optional Blender add-on
                  allows designers and architects to combine products into
                  unique blends and explore a far wider range of design
                  outcomes.
                </p>
                <p className="manufacturer-section-paragraph">
                  Scene options can start from our existing libraries or be
                  custom built to suit the environments and locations most
                  relevant to you as a manufacturer, helping your account feel
                  tailored, and highly specific to the products you
                  want to present. <NavLink to="/scenes">View scene options</NavLink>
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="where-used">
        <div className="container">
          <article className="manufacturer-section-block">
            <h2>Where BLOC-TEC is used</h2>
            <div className="manufacturer-section-layout">
              <div className="manufacturer-section-media">
                <img
                  src="/images/showroom.webp"
                  alt="BLOC-TEC in a showroom environment"
                  width={1200}
                  height={400}
                  decoding="async"
                />
              </div>
              <p className="manufacturer-section-paragraph">
                BLOC-TEC supports product presentation across your website,
                showrooms, exhibitions, and field sales activity, giving your
                team one practical tool for presenting products clearly in every
                setting.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section section-alt page-end-cta" id="manufacturer-contact">
        <div className="container">
          <article className="card page-cta-card">
            <h2>See how BLOC-TEC could work for you</h2>
            <p>
              If you want to explore how BLOC-TEC could present your products
              in a way that fits your business, get in touch. We&apos;re happy
              to help.
            </p>
            <NavLink className="btn btn-primary scene-cta-btn" to="/contact">
              Contact us
            </NavLink>
          </article>
        </div>
      </section>
    </main>
  );
}

function FaqPage() {
  return (
    <main className="section faq-page">
      <div className="container page-header">
        <p className="eyebrow">FAQ</p>
        <h1>Frequently asked questions</h1>
      </div>

      <section className="section page-end-cta" id="faq-contact">
        <div className="container faq-layout">
          <article className="faq-section-block">
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
                  Inclusion is based on onboarding and set-up costs for the work
                  required to add and prepare your products. Dedicated website
                  deployment, optional modules, and additional services are
                  priced separately.
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
            </div>
          </article>

          <article className="faq-section-block">
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

          <article className="faq-section-block">
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

      <section className="section page-end-cta faq-cta-section">
        <div className="container faq-layout">
          <article className="card page-cta-card faq-cta-block">
            <h2>Can&apos;t find what you need?</h2>
            <p>
              If you have further questions, contact us directly and we&apos;ll
              be happy to help.
            </p>
            <NavLink className="btn btn-primary scene-cta-btn" to="/contact">
              Contact us
            </NavLink>
          </article>
        </div>
      </section>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="section contact-page">
      <div className="container page-header">
        <p className="eyebrow">Contact</p>
        <h1>Contact us</h1>
        <p className="lead">
          If you would like to ask about BLOC-TEC, email us directly and include
          your company, product range, and what you would like to discuss.
        </p>
      </div>

      <section className="contact-page-image">
        <div className="container contact-page-image-shell">
          <img
            src="/images/contactUs.webp"
            alt="Contact BLOC-TEC"
            width={1600}
            height={900}
            decoding="async"
          />
          <div className="contact-page-overlay">
            <article className="card">
              <address className="location-block">
                Paver Picker Ltd trading as BLOC-TEC
                <br />
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
              <div className="contact-details">
                <p>
                  Email: <a href="mailto:info@bloc-tec.com">info@bloc-tec.com</a>
                </p>
                <p>
                  Phone: +353 (0)25 46682
                </p>
              </div>
              <a className="btn btn-primary scene-cta-btn" href="mailto:info@bloc-tec.com">
                Email us
              </a>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductSamplesPage() {
  return (
    <main className="section product-samples-page">
      <section className="section" id="delivery-address">
        <div className="container page-header">
          <p className="eyebrow">Support</p>
          <h1>Product samples</h1>
          <p className="lead">
            Guidance for delivery and preparation of samples used in BLOC-TEC
            account set-up and photography workflows.
          </p>
        </div>
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

            <article className="feature-row" id="offloading">
              <div className="feature-content">
                <h3>
                  <span className="samples-icon" aria-hidden="true">
                    <VehicleTruckProfile24Regular />
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

      <section className="section" id="customs-info">
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
                  Samples must be sent DDP (Delivered Duty Paid). Many of our clients use an agent for smoother shipment
                  handling.
                </p>
              </div>
            </article>

            <article className="feature-row">
              <div className="feature-content">
                <h3>Customs charges and registration</h3>
                <p>
                  All costs associated with delivery or return of products are
                  covered by the sender.
                </p>
                <p>
                  VAT number: IE3472538NH
                  <br />
                  EORI number: IE3472538NH
                  <br />
                  Business Registration Number: 604066
                </p>
              </div>
            </article>

            <article className="feature-row">
              <div className="feature-content">
                <h3 id="customs-links">Useful customs links</h3>
                <ul className="benefit-list">
                  <li>
                    <a
                      href="https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=en#"
                      target="_blank"
                      rel="noreferrer"
                    >
                      TARIC code lookup
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
                      href="https://www.revenue.ie/en/customs/businesses/relief-duty-vat/samples/index.aspx"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Tax relief on permanent importation of samples
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
    <main className="section legal-page">
      <div className="container page-header">
        <p className="eyebrow">Legal</p>
        <h1>Privacy policy</h1>
        <p className="lead">
          This page explains, in plain language, what personal data BLOC-TEC
          collects, why we collect it, and how that differs between our
          marketing website, our app, and our customer operations.
        </p>
      </div>

      <section className="section">
        <div className="container legal-layout">
          <div className="legal-copy">
            <p>
              Paver Picker Limited trading as Bloc-Tec (&quot;we&quot;,
              &quot;us&quot;, &quot;our&quot;) is committed to handling personal
              data responsibly and openly.
            </p>
            <p>
              This policy covers three things: visits to{" "}
              <code>www.bloc-tec.com</code>, use of the Bloc-Tec app and
              embedded viewers, and the business information we need to manage
              customer accounts, support, and billing.
            </p>
            <p>
              This policy does not cover personal data that we process strictly
              on behalf of a customer inside their own account or service setup,
              where we act as a data processor rather than the data controller.
            </p>

            <h2>Data controller</h2>
            <p>
              The data controller is Paver Picker Limited, Ballinamona,
              Glanworth, County Cork, P51 C9Y7, Ireland.
            </p>

            <h2>Legal basis for processing</h2>
            <p>We only use personal data where we have a lawful basis to do so.</p>
            <ul>
              <li>To provide services you have asked us to provide.</li>
              <li>
                For our legitimate business interests, such as running,
                securing, improving, and supporting the service.
              </li>
              <li>To comply with legal, tax, or regulatory obligations.</li>
              <li>Where needed, with your consent.</li>
            </ul>

            <h2>What we collect on this website</h2>
            <p>
              Our marketing website is mainly informational. It does not
              currently use on-site contact forms. When pages or images are
              loaded, our servers or hosting providers may receive standard
              technical request data such as IP address, browser details, and
              basic server log information.
            </p>
            <p>
              If you choose to contact us by email, we will also receive the
              information you include in that message, such as your name, email
              address, company, and the details of your enquiry.
            </p>

            <h2>What we collect in the app and embedded viewers</h2>
            <p>
              Bloc-Tec provides web-based visualisation tools that can run on
              our own domains or inside a customer&apos;s website. When the app
              or an embedded viewer is used, we may collect technical and usage
              data needed to run, secure, and improve the service.
            </p>
            <ul>
              <li>
                Technical access data such as IP address, browser and device
                information, page URL, referrer or origin information, and
                authorised-domain checks.
              </li>
              <li>
                Usage data such as page loads, product selections, filters,
                scenes, share actions, and overall engagement timing.
              </li>
              <li>
                Account context such as the customer account or app path being
                viewed, where this is needed to understand how the service is
                being used.
              </li>
            </ul>
            <p>
              When the app is embedded in a customer&apos;s website, we may also
              emit a small approved event list to the parent page using{" "}
              <code>postMessage</code>. This lets the host website handle its
              own analytics and consent choices without needing separate client
              tracking code inside the iframe.
            </p>
            <p>
              For embedded client websites, the client or host website remains
              responsible for deciding whether iframe events are forwarded into
              its own analytics tools under its own consent setup.
            </p>
            <p>
              When the app is used as a standalone Bloc-Tec page rather than in
              an iframe, Bloc-Tec may collect richer analytics about sessions,
              engagement, and usage events, but only after the user has given
              consent where required.
            </p>

            <h2>Customer account, billing, and support data</h2>
            <p>
              If you become a customer or contact us about a commercial
              relationship, we may collect business contact details, billing
              details, invoicing information, service history, and records of
              our communications with you.
            </p>

            <h2>How we collect information</h2>
            <ul>
              <li>Directly from you when you email us or work with us.</li>
              <li>
                Automatically when you load the website, app, embedded viewer,
                or related hosted images and assets.
              </li>
              <li>
                From service providers who help us with hosting, analytics,
                communications, accounting, and customer operations.
              </li>
            </ul>

            <h2>How we use personal data</h2>
            <p>
              We use personal data to operate the website and app, verify
              authorised access, provide support, manage customer accounts and
              billing, protect the service from misuse, and understand how the
              service is being used so we can improve it.
            </p>
            <p>
              We may also use personal data to send service-related updates,
              respond to enquiries, keep internal records, and meet legal or
              financial obligations.
            </p>
            <p>
              We do not sell or rent your personal data.
            </p>

            <h2>Cookies and browser storage</h2>
            <p>
              Our marketing website does not currently rely on client-side
              cookies or browser storage to run its main content.
            </p>
            <p>
              In standalone app mode, Bloc-Tec may use browser storage such as{" "}
              <code>sessionStorage</code> or related analytics state after
              consent has been given. This helps us understand sessions and
              engagement within that standalone experience. Embedded host-site
              analytics are handled separately by the host website.
            </p>
            <p>
              If analytics are enabled for a standalone Bloc-Tec experience,
              events may be sent directly to Google Analytics 4 and related
              Bloc-Tec reporting. If our live setup changes materially, we will
              update this page.
            </p>

            <h2>Who we share data with</h2>
            <p>
              We share personal data only where there is a genuine business or
              legal need to do so. This may include hosting providers, analytics
              providers, communications tools, accounting systems, professional
              advisers, and public authorities where required by law.
            </p>
            <p>
              We may also share operational or aggregated usage information with
              customers where that reporting relates to their own embedded
              service or account.
            </p>

            <h2>International transfers</h2>
            <p>
              Some of our providers may process data outside your country or
              outside the EEA. Where that happens, we take reasonable steps to
              ensure appropriate safeguards are in place.
            </p>

            <h2>Data security</h2>
            <p>
              We use reasonable technical and organisational measures to protect
              personal data from loss, misuse, unauthorised access, or
              disclosure.
            </p>
            <p>
              No internet-based service can ever be guaranteed completely
              secure, but we work to keep access controlled and our systems
              appropriately protected.
            </p>

            <h2>Links to other websites</h2>
            <p>
              Our Site and Services may contain links to third-party websites.
              Those websites have their own privacy policies and we do not
              accept responsibility or liability for them. Please review those
              policies before submitting personal data to third-party websites.
            </p>

            <h2>Your rights</h2>
            <p>
              Depending on where you are located, you may have rights to:
            </p>
            <ul>
              <li>ask for access to the personal data we hold about you</li>
              <li>ask us to correct or delete it</li>
              <li>ask us to restrict or stop certain processing</li>
              <li>ask for a copy in a portable format where that right applies</li>
              <li>withdraw consent where we rely on consent</li>
            </ul>
            <p>
              We may need to verify your identity before responding to a rights
              request.
            </p>

            <h2>Data retention</h2>
            <p>
              We keep personal data only for as long as we need it for the
              purposes described above, including support, security, legal,
              accounting, and tax requirements.
            </p>
            <p>
              Some technical or analytics data may be kept for shorter periods,
              while customer account and billing records may need to be kept for
              longer. We may keep anonymised or aggregated information for
              longer where it no longer identifies individuals.
            </p>

            <h2>Complaints</h2>
            <p>
              If you have any complaints about our use of your personal data,
              please contact us using the details below or contact your local
              data protection supervisory authority. For EU individuals, this is
              the Data Protection Commission (DPC), Dublin 2, D02 RD28,
              Ireland.
            </p>

            <h2>UK representative</h2>
            <p>
              Leigh Walker, 31 Foxglove Drive, Highburton, Huddersfield, HD8
              0ZH.
            </p>

            <h2>Children</h2>
            <p>
              This website and the Bloc-Tec services are not intended for use by
              children under 16.
            </p>

            <h2>Changes to this Privacy Policy</h2>
            <p>
              We may update this page from time to time to reflect changes in
              the service, the way data is used, or legal requirements.
            </p>
            <p>
              This Privacy Policy was last updated on 10-04-26 and replaces any
              other Privacy Policy previously applicable from that date.
            </p>

            <h2>Contact</h2>
            <p>
              If you have any questions, comments, or requests regarding our
              privacy practices or this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>
                By post: Paver Picker Limited, Ballinamona, Glanworth, County
                Cork, P51 C9Y7, Ireland.
              </li>
              <li>
                By email: <a href="mailto:info@bloc-tec.com">info@bloc-tec.com</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

function AppTermsPage() {
  return (
    <main className="section legal-page">
      <div className="container page-header">
        <p className="eyebrow">Legal</p>
        <h1>Terms of service</h1>
        <p className="lead">
          These terms govern the use of Bloc-Tec visualisation services,
          including the platform, created materials, subscriptions, and related
          service delivery.
        </p>
      </div>

      <section className="section">
        <div className="container legal-layout">
          <div className="legal-copy">
            <h2 id="terms-1">1. Introduction and incorporation</h2>
            <ul>
              <li>
                <strong>1.1</strong> By confirming in writing or making payment for our Services, you
                agree to these Terms and our{" "}
                <NavLink to="/privacy-policy">Privacy Policy</NavLink>. If you do
                not agree, please do not use our Services.
              </li>
              <li>
                <strong>1.2</strong> Paver Picker Ltd trading as Bloc-Tec is a registered business in
                Ireland (business registration number: 604066) and provides the
                Bloc-Tec visualisation services described in your invoice or
                written confirmation.
              </li>
            </ul>

            <h2 id="terms-2">2. Definitions</h2>
            <p>In these Terms, the following expressions have the meanings set out below.</p>
            <ul>
              <li>
                <strong>2.1 You / Your:</strong> the customer business using our
                Services under this agreement.
              </li>
              <li>
                <strong>2.2 We / Us / Our:</strong> Bloc-Tec, being Paver Picker Ltd
                trading as Bloc-Tec.
              </li>
              <li>
                <strong>2.3 Services:</strong> the Bloc-Tec applications, tools, and
                online platform accessed under this agreement.
              </li>
              <li>
                <strong>2.4 Product Photography:</strong> high quality photographs of
                individual products, whether taken by Bloc-Tec or supplied by
                you, which may be processed for compatibility with our software.
              </li>
              <li>
                <strong>2.5 Created Materials:</strong> digital assets produced by
                Bloc-Tec using Product Photography and other data inputs,
                including software-generated visuals, seamless textures, product
                swatches, image downloads, and product information PDFs.
              </li>
              <li>
                <strong>2.6 Confidential Information:</strong> any non-public
                business, technical, or financial information shared between the
                parties.
              </li>
              <li>
                <strong>2.7 Billing Data:</strong> customer contact and payment
                details used for invoicing.
              </li>
            </ul>

            <h2 id="terms-3">3. Services and subscription</h2>
            <ul>
              <li>
                <strong>3.1</strong> We provide the Services described in your invoice or written
                confirmation. Created Materials, together with relevant data
                inputs, form part of the Services provided under this agreement.
              </li>
              <li>
                <strong>3.2</strong> Your subscription will
                commence when the Services are linked to your production website,
                used in a showroom or exhibition, or two calendar months after
                completion of set-up, whichever occurs first.
              </li>
              <li>
                <strong>3.3</strong> Subscription commencement for add-on modules and new products
                will be co-termed with your existing subscription, unless
                otherwise agreed in writing.
              </li>
              <li>
                <strong>3.4</strong> Products or features may be added or removed during the term,
                and refunds are not provided for removed items.
              </li>
              <li>
                <strong>3.5</strong> You are permitted to use the Services during your subscription
                term.
              </li>
              <li>
                <strong>3.6</strong> Your subscription is for your own business use only and cannot
                be shared or transferred to a different domain.
              </li>
              <li>
                <strong>3.7</strong> You may not modify, reverse-engineer, or create derivative works
                from the Services.
              </li>
              <li>
                <strong>3.8</strong> We may suspend access if security or integrity is at risk.
              </li>
              <li>
                <strong>3.9</strong> Updates and maintenance are included and we aim for high
                availability.
              </li>
            </ul>

            <h2 id="terms-4">4. Intellectual property</h2>
            <ul>
              <li>
                <strong>4.1</strong> We own all rights to the Services and Created Materials.
              </li>
              <li>
                <strong>4.2</strong> You retain ownership of original Product Photography or files you
                supply before we process them.
              </li>
              <li>
                <strong>4.3</strong> You may not remove our copyright notices or branding from
                Created Materials, nor claim ownership of them.
              </li>
            </ul>

            <h2 id="terms-5">5. Usage guidelines</h2>
            <h3 id="terms-5-1">5.1 Permitted use</h3>
            <p>During the subscription term, you may:</p>
            <ul>
              <li>
                <strong>5.1.1</strong> Use Created Materials on your approved domain or domains, or in
                printed materials.
              </li>
              <li>
                <strong>5.1.2</strong> Share Created Materials with your resellers for their online use
                only.
              </li>
              <li>
                <strong>5.1.3</strong> Use seamless textures in architectural visualisations.
              </li>
            </ul>
            <h3 id="terms-5-2">5.2 Prohibited use</h3>
            <p>You may not:</p>
            <ul>
              <li>
                <strong>5.2.1</strong> Modify, resell, redistribute, or license our Created Materials
                to others.
              </li>
              <li>
                <strong>5.2.2</strong> Use Created Materials in other software platforms,
                configurators, visualisers, or interactive applications.
              </li>
              <li>
                <strong>5.2.3</strong> Use Created Materials to train AI or machine learning systems.
              </li>
              <li>
                <strong>5.2.4</strong> Claim ownership of Created Materials in a way that implies
                Bloc-Tec endorses your products.
              </li>
              <li>
                <strong>5.2.5</strong> Use seamless textures outside their intended use in
                architectural visualisations.
              </li>
              <li>
                <strong>5.2.6</strong> Use Created Materials in any unlawful way.
              </li>
            </ul>
            <h3 id="terms-5-3">5.3 Risk and indemnity</h3>
            <p>
              <strong>5.3.1</strong> All Created Materials are used at your own risk. You agree to
              indemnify us against claims or damages arising from your use of
              Created Materials, including unauthorised use.
            </p>

            <h2 id="terms-6">6. Fees and payments</h2>
            <ul>
              <li>
                <strong>6.1</strong> We are not obliged to refund fees for cancelled work that is
                already completed.
              </li>
              <li>
                <strong>6.2</strong> Delivery may be delayed if product samples or images supplied to
                us are late, unsuitable, or require additional editing.
              </li>
              <li>
                <strong>6.3</strong> Services are provided as described in your invoice during the
                subscription term.
              </li>
              <li>
                <strong>6.4</strong> Invoices are issued in the stated currency and based on the
                Billing Data provided. VAT is added where applicable.
              </li>
              <li>
                <strong>6.5</strong> Payment is due within 30 days of invoice unless otherwise
                agreed.
              </li>
              <li>
                <strong>6.6</strong> Costs may increase annually by up to 5% based on the Global
                Inflation Index, with at least 7 days&apos; notice before changes
                take effect.
              </li>
              <li>
                <strong>6.7</strong> If payment is overdue by more than 7 days, we may suspend your
                account and statutory interest may apply.
              </li>
            </ul>

            <h2 id="terms-7">7. Product samples and product photography</h2>
            <ul>
              <li>
                <strong>7.1</strong> Samples must be clean, dry, and representative of product
                variations.
              </li>
              <li>
                <strong>7.2</strong> Delivery costs are your responsibility. Uncollected samples
                after 30 days may be disposed of.
              </li>
              <li>
                <strong>7.3</strong> We use standard colour calibration and exposure checks to ensure
                Product Photography is accurate and will not alter it in a way
                that misrepresents the product&apos;s appearance.
              </li>
            </ul>

            <h2 id="terms-8">8. Warranties</h2>
            <ul>
              <li>
                <strong>8.1</strong> Both parties confirm they have authority to enter this agreement
                and will comply with applicable laws.
              </li>
              <li>
                <strong>8.2</strong> We warrant that we have the right to provide the Services and
                will deliver them with reasonable care.
              </li>
              <li>
                <strong>8.3</strong> We do not guarantee uninterrupted service, specific results, or
                fitness for a particular purpose.
              </li>
              <li>
                <strong>8.4</strong> We are not responsible for issues caused by third-party
                components, services, connectivity, hosting, domain providers,
                or external licences outside our control.
              </li>
              <li>
                <strong>8.5</strong> You warrant that you own the rights to any content you provide
                and will take reasonable steps to protect access credentials,
                devices, and networks used with the Services.
              </li>
              <li>
                <strong>8.6</strong> Third-party content or information provided by us is supplied
                &quot;as is&quot;.
              </li>
              <li>
                <strong>8.7</strong> Except for the warranties stated above, all other warranties are
                excluded.
              </li>
            </ul>

            <h2 id="terms-9">9. Liability</h2>
            <ul>
              <li>
                <strong>9.1</strong> Neither party limits liability for fraud, death, or personal
                injury caused by negligence or misconduct.
              </li>
              <li>
                <strong>9.2</strong> Neither party is liable for indirect or consequential losses,
                including lost profits, business interruption, or loss of
                goodwill.
              </li>
              <li>
                <strong>9.3</strong> Our total liability is capped at the fees paid in the 12 months
                before the claim, or the shorter agreement term if applicable.
              </li>
              <li>
                <strong>9.4</strong> You are responsible for breaches caused by your users.
              </li>
              <li>
                <strong>9.5</strong> Both parties confirm this agreement, together with information
                on the invoice, is the entire basis of their relationship.
              </li>
            </ul>

            <h2 id="terms-10">10. Indemnities</h2>
            <ul>
              <li>
                <strong>10.1</strong> We will cover claims that the Services infringe intellectual
                property rights, except where the claim relates to content you
                provided, subject to prompt notice, control of the defence, and
                your cooperation.
              </li>
              <li>
                <strong>10.2</strong> If infringement occurs, we may secure rights, replace, or modify
                the Services.
              </li>
              <li>
                <strong>10.3</strong> We are not responsible for claims resulting from misuse of the
                Services, combining them with other systems, or a failure to
                take reasonable care.
              </li>
              <li>
                <strong>10.4</strong> You will cover claims and costs arising from your use of the
                Services, including intellectual property breaches, data
                protection issues, and user actions.
              </li>
              <li>
                <strong>10.5</strong> Both parties agree to indemnify each other for reasonable legal
                costs related to claims under this agreement.
              </li>
            </ul>

            <h2 id="terms-11">11. Term and termination</h2>
            <ul>
              <li>
                <strong>11.1</strong> This agreement starts when your subscription begins and renews
                automatically unless ended in accordance with these terms.
              </li>
              <li>
                <strong>11.2</strong> Either party may terminate by giving 30 days&apos; notice before
                the end of the current term.
              </li>
              <li>
                <strong>11.3</strong> We may terminate immediately if Services or Created Materials are
                misused or if providing Services becomes unlawful.
              </li>
              <li>
                <strong>11.4</strong> Either party may terminate if the other becomes insolvent, fails
                to remedy a material breach within 5 business days, or is
                prevented by Force Majeure for more than 28 days.
              </li>
              <li>
                <strong>11.5</strong> On termination, Services stop, your rights to use the Services
                end, and all unpaid fees for the term must be paid. No refunds
                are provided for early termination.
              </li>
              <li>
                <strong>11.6</strong> You and your resellers may keep using Created Materials created
                before termination, subject to the same usage rules.
              </li>
              <li>
                <strong>11.7</strong> Termination does not affect accrued rights and certain clauses
                continue after termination.
              </li>
            </ul>

            <h2 id="terms-12">12. Confidential information</h2>
            <ul>
              <li>
                <strong>12.1</strong> Each party must keep the other party&apos;s Confidential
                Information private and use it only for this agreement unless
                disclosure is required by law.
              </li>
              <li>
                <strong>12.2</strong> Disclosure is permitted only to employees or agents who need the
                information for this agreement and agree to keep it
                confidential.
              </li>
              <li>
                <strong>12.3</strong> Confidential Information does not include information already
                known, publicly available other than through breach, or required
                by law to be disclosed.
              </li>
            </ul>

            <h2 id="terms-13">13. Data protection</h2>
            <ul>
              <li>
                <strong>13.1</strong> Both parties will comply with applicable data protection laws.
              </li>
              <li>
                <strong>13.2</strong> You are the data controller and we are the data processor for
                personal data used in the Services.
              </li>
              <li>
                <strong>13.3</strong> We may take steps to prevent any data protection infringement.
              </li>
              <li>
                <strong>13.4</strong> Any personal data we collect as a controller is handled in
                accordance with our <NavLink to="/privacy-policy">Privacy Policy</NavLink>.
              </li>
              <li>
                <strong>13.5</strong> We process Billing Data in accordance with applicable data
                protection laws.
              </li>
              <li>
                <strong>13.6</strong> Client websites remain responsible for their own analytics and
                consent handling when embedding the Services.
              </li>
            </ul>

            <h2 id="terms-14">14. Force majeure</h2>
            <ul>
              <li>
                <strong>14.1</strong> If something beyond a party&apos;s control prevents that party
                from meeting its obligations, those obligations are paused.
              </li>
              <li>
                <strong>14.2</strong> The affected party must notify the other as soon as possible.
              </li>
              <li>
                <strong>14.3</strong> If the situation continues for more than 28 days, the other
                party may end the agreement immediately without penalty.
              </li>
            </ul>

            <h2 id="terms-15">15. Miscellaneous</h2>
            <ul>
              <li>
                <strong>15.1</strong> If any part of this agreement is invalid, the rest remains in
                force.
              </li>
              <li>
                <strong>15.2</strong> This agreement is the entire understanding between the parties.
              </li>
              <li>
                <strong>15.3</strong> Neither party may transfer its rights under this agreement
                without written consent, except that we may transfer the
                agreement if we sell our business.
              </li>
              <li>
                <strong>15.4</strong> Both parties act as independent contractors and nothing creates
                an employment relationship.
              </li>
              <li>
                <strong>15.5</strong> Changes or notices must be in writing. We may update these terms
                with 30 days&apos; notice, and you may terminate before the
                changes take effect if you do not agree.
              </li>
              <li>
                <strong>15.6</strong> No third party has rights to enforce this agreement.
              </li>
              <li>
                <strong>15.7</strong> This agreement is governed by Irish law and disputes are subject
                to the courts of Dublin.
              </li>
            </ul>
          </div>
        </div>
      </section>
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

      <section className="section scenes-panel scenes-panel-cta page-end-cta">
        <div className="container">
          <article className="card page-cta-card scenes-cta-card">
            <h2>Have a scene idea?</h2>
            <p>
              If you have a scene concept and want to know whether it can be added
              to your account, contact us and we can review suitability.
            </p>
            <NavLink className="btn btn-primary scene-cta-btn" to="/contact">
              Ask about scene suitability
            </NavLink>
          </article>
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function AnalyticsPageTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("event", "page_view", {
      page_path: `${location.pathname}${location.search}${location.hash}`,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-links-wrap">
            <div className="footer-grid">
              <div className="footer-logo-block footer-logo-block--side">
                <Link className="footer-brand-link" to="/" aria-label="BLOC-TEC home">
                  <img
                    src="/images/brand/bloc-tec-logo-black.svg"
                    alt="BLOC-TEC"
                    className="footer-brand-logo"
                    loading="lazy"
                  />
                </Link>
                <p className="footer-brand-subline">
                  Digital tools for brick and paving specification
                </p>
              </div>
              <nav className="footer-column footer-column--main" aria-label="Main links">
                <h4>Main</h4>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/for-manufacturers">Manufacturers</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </nav>
              <nav className="footer-column" aria-label="Support links">
                <h4>Support</h4>
                <NavLink to="/faq">FAQ</NavLink>
                <NavLink to="/integration">Integration</NavLink>
                <NavLink to="/scenes">Scenes</NavLink>
                <NavLink to="/product-samples">Product samples</NavLink>
              </nav>
              <nav className="footer-column" aria-label="Legal links">
                <h4>Legal</h4>
                <NavLink to="/privacy-policy">Privacy policy</NavLink>
                <NavLink to="/app-terms">Terms of service</NavLink>
              </nav>
              <div
                className="social-links social-links--footer social-links--footer-grid"
                aria-label="Social media links"
              >
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.id}
                    className={`social-link social-link--${link.id}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    title={link.label}
                  >
                    <span className="social-link-icon" aria-hidden="true">
                      <img src={link.iconSrc} alt="" className="social-link-icon-image" />
                    </span>
                  </a>
                ))}
              </div>
              <div className="footer-association footer-association--side">
                <img
                  src="/images/bmf-1-logo-svg-vector.svg"
                  alt="Builders Merchants Federation Ltd"
                  className="footer-association-logo"
                  loading="lazy"
                />
                <p className="footer-association-text">
                  Proud members of the Builders Merchants Federation
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-company-meta">
            © {currentYear} Paver Picker Ltd trading as BLOC-TEC | Registered in Ireland
            | Company No. 604066
          </p>
        </div>
        <button
          type="button"
          className="footer-top-btn"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="footer-top-btn-icon" aria-hidden="true">›</span>
        </button>
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnalyticsPageTracker />
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
