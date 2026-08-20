import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import {
  GuideImagePlaceholderGrid,
  type GuideImageItem,
} from "../components/GuideImagePlaceholder";
import { BOND_EXAMPLE_GROUPS } from "../content/bondExamples";
import { BOND_GUIDE, BOND_LEGACY_REDIRECTS } from "../content/bondGuides";

function bondExampleLabel(name: string) {
  return /\bbond$/i.test(name) ? name : `${name} bond`;
}

export function BondHubPage() {
  const guide = BOND_GUIDE;
  const { hash } = useLocation();

  const allBondImages = useMemo((): GuideImageItem[] => {
    const images: GuideImageItem[] = [];
    for (const bond of guide.bonds) {
      const examples =
        BOND_EXAMPLE_GROUPS.find(group => group.title === bond.layoutGroup)?.examples ?? [];
      for (const example of examples) {
        const label = bondExampleLabel(example.name);
        images.push({
          label,
          caption: `${bond.name} — ${label}`,
          src: example.src,
        });
      }
    }
    return images;
  }, [guide.bonds]);

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://bricktextures.com/facing-bricks/bonds#webpage",
        url: "https://bricktextures.com/facing-bricks/bonds",
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
            <span>Brick bonds</span>
          </nav>

          <p className="eyebrow">Brick bonds</p>
          <h1>{guide.h1}</h1>
          <p className="lead contact-lead">{guide.lead}</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container colour-guide-content">
          <p className="eyebrow">Why change bond</p>
          <h2>{guide.whyChangeBond.title}</h2>
          {guide.whyChangeBond.paragraphs.map((paragraph, index) => {
            if (index === 1) {
              return (
                <p key={paragraph.slice(0, 40)}>
                  Those patterns become more discernible when the mortar colour contrasts with the
                  brick colour. A closer match softens the bond; a clearer contrast makes the
                  pattern stand out. Read more on our{" "}
                  <Link to="/facing-bricks/mortar">mortar colour</Link> page.
                </p>
              );
            }
            if (index === 2) {
              return (
                <p key={paragraph.slice(0, 40)}>
                  Bricktextures offers an extensive range of brick bonds and patterns — many that
                  already exist in practice, plus a few variations we have added ourselves, because
                  why not. Feel free to <Link to="/contact">get in touch</Link> if you have a
                  pattern you would like to see added to this page and the app.
                </p>
              );
            }
            return <p key={paragraph.slice(0, 40)}>{paragraph}</p>;
          })}
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Advice</p>
          <h2>{guide.pickAdvice.title}</h2>
          <p>{guide.pickAdvice.intro}</p>
          {guide.pickAdvice.sections.map(section => (
            <div key={section.title} className="bond-pick-section">
              <h3>{section.title}</h3>
              {section.paragraphs.map(paragraph => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
              {section.title === "What is the main design intention of your façade?" ? (
                <p>
                  Read more on our <Link to="/facing-bricks/mortar">mortar colour</Link> page.
                </p>
              ) : null}
              {section.title === "How thick is your wall?" ? (
                <p>
                  See also{" "}
                  <Link to="/facing-bricks/format/standard">standard metric brick size</Link> for
                  the usual 215 × 65 mm face dimensions.
                </p>
              ) : null}
              {section.title === "Consider your chosen brick" ? (
                <p>
                  Browse finishes such as{" "}
                  {guide.suitedFinishLinks.map((finish, index) => (
                    <span key={finish.slug}>
                      {index > 0
                        ? index === guide.suitedFinishLinks.length - 1
                          ? " and "
                          : ", "
                        : null}
                      <Link to={`/facing-bricks/finish/${finish.slug}`}>
                        {finish.label.toLowerCase()}
                      </Link>
                    </span>
                  ))}
                  when comparing products.
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">On this page</p>
            <h2>Browse brick bonds</h2>
            <p>Jump to a bond group, or scroll the full set below.</p>
          </div>
          <nav className="bond-page-nav" aria-label="Bond groups on this page">
            <ul>
              {guide.bonds.map(bond => (
                <li key={bond.id}>
                  <a href={`#${bond.id}`}>{bond.name}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="homepage-section-heading">
            <p className="eyebrow">Bond patterns</p>
            <h2>Brick bonds and patterns to consider</h2>
            <p>
              Many of these bonds already exist in practice, with a few variations we have added
              ourselves. Open any image for a closer look.
            </p>
          </div>
          <div className="bond-list">
            {guide.bonds.map(bond => {
              const examples =
                BOND_EXAMPLE_GROUPS.find(group => group.title === bond.layoutGroup)?.examples ?? [];
              return (
                <article key={bond.id} id={bond.id} className="bond-list-item">
                  <div className="bond-list-item-heading">
                    <h3>{bond.name}</h3>
                  </div>
                  {bond.alsoKnownAs && bond.alsoKnownAs.length > 0 ? (
                    <p className="bond-also-known">
                      Also known as {bond.alsoKnownAs.join(", ")}.
                    </p>
                  ) : null}
                  {bond.nameNote ? <p className="bond-also-known">{bond.nameNote}</p> : null}
                  <p>{bond.description}</p>
                  {examples.length > 0 ? (
                    <GuideImagePlaceholderGrid
                      className="bond-example-grid"
                      ratio="square"
                      navigationItems={allBondImages}
                      items={examples.map(example => {
                        const label = bondExampleLabel(example.name);
                        return {
                          label,
                          caption: label,
                          src: example.src,
                        };
                      })}
                    />
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container colour-guide-content">
          <p className="eyebrow">Compare in the app</p>
          <h2>See these bonds on manufacturer products</h2>
          <p>
            The bond examples on this page use {guide.exampleBrick.name}. Open that product to try
            the same layouts yourself, or browse the full catalogue.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href={guide.exampleBrick.appUrl}>
              View {guide.exampleBrick.name}
            </a>
            <a className="btn btn-secondary" href={guide.exploreAllBricksUrl}>
              Explore all bricks
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function BondGuidePage() {
  const { slug = "" } = useParams();
  const anchor = BOND_LEGACY_REDIRECTS[slug];

  if (anchor) {
    return <Navigate to={`/facing-bricks/bonds#${anchor}`} replace />;
  }

  return <Navigate to="/facing-bricks/bonds" replace />;
}
