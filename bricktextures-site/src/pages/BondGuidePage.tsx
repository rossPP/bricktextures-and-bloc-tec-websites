import { Link, Navigate, useParams } from "react-router-dom";
import { GuideImagePlaceholderGrid } from "../components/GuideImagePlaceholder";
import { BOND_EXAMPLE_GROUPS, BOND_HUB_THUMBNAILS } from "../content/bondExamples";
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
          "Choose classic, modern geometric or traditional brick bonds for facing brickwork.",
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
            Classic running bonds suit most facing bricks. Modern geometric bonds need tighter size
            control. Traditional and herringbone patterns suit character work and feature panels.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">Three bond groups</p>
            <h2>Choose the character you want</h2>
            <p>
              Decide the character you want, then choose a bond group that fits the brick and the
              look of the elevation.
            </p>
          </div>
          <div className="bond-hub-grid">
            {BOND_GUIDES.map(guide => (
              <Link key={guide.slug} className="bond-hub-card" to={`/facing-bricks/bonds/${guide.slug}`}>
                <div className="bond-hub-card-media" aria-hidden="true">
                  <img src={BOND_HUB_THUMBNAILS[guide.slug]} alt="" loading="lazy" />
                </div>
                <p className="eyebrow">{guide.shortLabel}</p>
                <h3>{guide.title}</h3>
                <p>{guide.lead}</p>
                {guide.suitedFinishes.length > 0 ? (
                  <ul className="bond-hub-finish-list">
                    {guide.suitedFinishes.map(finish => (
                      <li key={finish.slug}>{finish.label}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="bond-hub-finish-note">Suits all facing bricks.</p>
                )}
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
            Compare one product across bonds under consistent mortar and lighting before
            shortlisting.
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
  const suitsAllBricks = guide.suitedFinishes.length === 0;
  const exampleGroups = BOND_EXAMPLE_GROUPS[guide.slug];

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
          <p className="eyebrow">About these bonds</p>
          <h2>{suitsAllBricks ? "Suits all facing bricks" : "Which bricks these bonds suit"}</h2>
          <p>{guide.whyTheseBonds}</p>
          {!suitsAllBricks ? (
            <ul className="colour-guide-list">
              {guide.suitedFinishes.map(finish => (
                <li key={finish.slug}>
                  <Link to={`/facing-bricks/finish/${finish.slug}`}>{finish.label}</Link>
                </li>
              ))}
            </ul>
          ) : null}
          <p>{guide.alignmentNote}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">Recommended bonds</p>
            <h2>Bonds to consider</h2>
            <p>Open any image for a closer look at the layout.</p>
          </div>
          <div className="bond-list">
            {guide.bonds.map(bond => {
              const examples =
                exampleGroups.find(group => group.title === bond.layoutGroup)?.examples ?? [];
              return (
                <article key={bond.name} className="bond-list-item">
                  <h3>{bond.name}</h3>
                  <p>{bond.description}</p>
                  <p>
                    <strong>Best for:</strong> {bond.bestFor}
                  </p>
                  {examples.length > 0 ? (
                    <GuideImagePlaceholderGrid
                      className="bond-example-grid"
                      ratio="square"
                      items={examples.map(example => ({
                        label: example.name,
                        caption: example.name,
                        src: example.src,
                      }))}
                    />
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Compare in the app</p>
          <h2>
            {suitsAllBricks
              ? "See these bonds on manufacturer products"
              : "See these bonds on suitable products"}
          </h2>
          <p>
            {suitsAllBricks
              ? "Open Bricktextures and compare classic running bonds on any facing brick under the same mortar and lighting."
              : "Open Bricktextures, choose a compatible product, then compare alignment and course rhythm under the same mortar and lighting."}
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
                <div className="bond-hub-card-media" aria-hidden="true">
                  <img src={BOND_HUB_THUMBNAILS[item.slug]} alt="" loading="lazy" />
                </div>
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
