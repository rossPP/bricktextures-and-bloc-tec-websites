import { Link, Navigate, useParams } from "react-router-dom";
import { BondIcon } from "../components/BondIcon";
import { GuideImagePlaceholder, GuideImagePlaceholderGrid } from "../components/GuideImagePlaceholder";
import { BOND_GUIDES, getBondGuide } from "../content/bondGuides";

export function BondHubPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://bricktextures.com/facing-bricks/bonds#webpage",
        url: "https://bricktextures.com/facing-bricks/bonds",
        name: "Brick Bonds for Facing Bricks | Bricktextures",
        description:
          "Choose classic, modern geometric or traditional brick bonds to suit the surface texture and dimensional tolerance of your facing bricks.",
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
            <span>Brick bonds</span>
          </nav>

          <p className="eyebrow">Brick bonds</p>
          <h1>Bonds to consider with facing bricks</h1>
          <p className="lead contact-lead">
            Select the bond with the brick size, dimensional tolerance and intended joint. Running
            bonds accommodate variation; geometric and header-based bonds depend on more exact
            alignment and module.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">Three bond groups</p>
            <h2>Match the bond to the brick texture</h2>
            <p>
              Set the required wall character, then test whether the product’s size, tolerances and
              surface texture support the bond at corners, openings and movement joints.
            </p>
          </div>
          <div className="bond-hub-grid">
            {BOND_GUIDES.map(guide => (
              <Link key={guide.slug} className="bond-hub-card" to={`/facing-bricks/bonds/${guide.slug}`}>
                <p className="eyebrow">{guide.shortLabel}</p>
                <h3>{guide.title}</h3>
                <p>{guide.lead}</p>
                <ul className="bond-hub-finish-list">
                  {guide.suitedFinishes.map(finish => (
                    <li key={finish.slug}>{finish.label}</li>
                  ))}
                </ul>
                <span className="bond-hub-link-label">View {guide.shortLabel.toLowerCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">In Bricktextures</p>
          <h2>Trial bonds on selected bricks</h2>
          <p>
            Compare one product across suitable bonds under consistent mortar and lighting. Confirm
            module, perp alignment and unavoidable cuts before shortlisting.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href="/app/facing-bricks?src=bonds-hub">
              Explore bricks
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function BondGuidePage() {
  const { slug = "" } = useParams();

  if (slug === "contemporary") {
    return <Navigate to="/facing-bricks/bonds/modern" replace />;
  }

  if (slug === "stretcher") {
    return <Navigate to="/facing-bricks/bonds/classic" replace />;
  }

  const guide = getBondGuide(slug);

  if (!guide) {
    return <Navigate to="/facing-bricks/bonds" replace />;
  }

  const otherGuides = BOND_GUIDES.filter(item => item.slug !== guide.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://bricktextures.com/facing-bricks/bonds/${guide.slug}#webpage`,
        url: `https://bricktextures.com/facing-bricks/bonds/${guide.slug}`,
        name: guide.metaTitle,
        description: guide.metaDescription,
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
            name: "Brick bonds",
            item: "https://bricktextures.com/facing-bricks/bonds",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.shortLabel,
            item: `https://bricktextures.com/facing-bricks/bonds/${guide.slug}`,
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

      <section className={`section colour-guide-hero bond-guide-hero-${guide.slug}`}>
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/facing-bricks/bonds">Brick bonds</Link>
            <span aria-hidden="true">/</span>
            <span>{guide.shortLabel}</span>
          </nav>

          <p className="eyebrow">Brick bonds</p>
          <h1>{guide.h1}</h1>
          <p className="lead contact-lead">{guide.lead}</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Best suited textures</p>
          <h2>Which bricks these bonds suit</h2>
          <p>{guide.whyTheseBonds}</p>
          <ul className="colour-guide-list">
            {guide.suitedFinishes.map(finish => (
              <li key={finish.slug}>
                <Link to={`/facing-bricks/finish/${finish.slug}`}>{finish.label}</Link>
              </li>
            ))}
          </ul>
          <GuideImagePlaceholder
            label={`${guide.shortLabel} with suited brick textures`}
            caption="Façade example pairing the bond with a suitable surface finish."
            wide
          />
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Alignment and character</p>
          <h2>Why texture and bond belong together</h2>
          <p>{guide.alignmentNote}</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">Recommended bonds</p>
            <h2>Bonds to consider</h2>
            <p>
              The diagrams use the same bond names as Bricktextures; assess each pattern against the
              selected product’s dimensions and tolerances.
            </p>
          </div>
          <div className="bond-list">
            {guide.bonds.map(bond => (
              <article key={bond.name} className="bond-list-item">
                <div className="bond-list-icon" aria-hidden="true">
                  <BondIcon name={bond.iconName} />
                </div>
                <div className="bond-list-copy">
                  <h3>{bond.name}</h3>
                  <p>{bond.description}</p>
                  <p>
                    <strong>Best for:</strong> {bond.bestFor}
                  </p>
                </div>
                <GuideImagePlaceholder
                  label={bond.imageLabel}
                  caption="Bond shown in built brickwork or a Bricktextures view."
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">Visual examples</p>
            <h2>Example images for {guide.shortLabel.toLowerCase()}</h2>
            <p>Compare bond geometry at wall scale and at corners, openings and junctions.</p>
          </div>
          <GuideImagePlaceholderGrid items={guide.exampleImages} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Compare in the app</p>
          <h2>See these bonds on manufacturer products</h2>
          <p>
            Select a compatible surface texture, then compare bonds for alignment, module and mortar
            distribution under the same lighting.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href={`/app/facing-bricks?src=bonds-${guide.slug}`}>
              Explore bricks
            </a>
            <Link className="btn btn-secondary" to="/facing-bricks/bonds">
              All bond guides
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">Related</p>
            <h2>The other bond groups</h2>
          </div>
          <div className="bond-hub-grid">
            {otherGuides.map(item => (
              <Link key={item.slug} className="bond-hub-card" to={`/facing-bricks/bonds/${item.slug}`}>
                <p className="eyebrow">{item.shortLabel}</p>
                <h3>{item.title}</h3>
                <p>{item.lead}</p>
                <span className="bond-hub-link-label">View {item.shortLabel.toLowerCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
