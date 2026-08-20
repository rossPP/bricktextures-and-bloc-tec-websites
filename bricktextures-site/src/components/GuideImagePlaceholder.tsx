import { useEffect, useState } from "react";

type GuideImagePlaceholderProps = {
  label: string;
  caption?: string;
  wide?: boolean;
  src?: string;
  /** Display crop for the thumbnail. Use natural for uncropped seamless textures. */
  ratio?: "landscape" | "square" | "natural";
};

export function GuideImagePlaceholder({
  label,
  caption,
  wide = false,
  src,
  ratio = "landscape",
}: GuideImagePlaceholderProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
        return;
      }
      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        setRotation(current => (current + 90) % 360);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) {
      setRotation(0);
    }
  }, [isLightboxOpen]);

  return (
    <figure className={`guide-image-placeholder${wide ? " guide-image-placeholder-wide" : ""}`}>
      {src ? (
        <button
          type="button"
          className={[
            "guide-image-media",
            ratio === "square" ? "guide-image-media-square" : "",
            ratio === "natural" ? "guide-image-media-natural" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setIsLightboxOpen(true)}
          aria-label={`View larger image: ${label}`}
        >
          <img src={src} alt={label} loading="lazy" />
        </button>
      ) : (
        <div className="guide-image-placeholder-frame" role="img" aria-label={`Placeholder for ${label}`}>
          <span className="guide-image-placeholder-tag">Image placeholder</span>
          <strong>{label}</strong>
        </div>
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}

      {isLightboxOpen && src ? (
        <div
          className="guide-image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            className="guide-image-lightbox-close"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close larger image"
          >
            Close
          </button>
          <button
            type="button"
            className="guide-image-lightbox-rotate"
            onClick={event => {
              event.stopPropagation();
              setRotation(current => (current + 90) % 360);
            }}
            aria-label="Rotate image 90 degrees"
          >
            Rotate
          </button>
          <div className="guide-image-lightbox-stage" onClick={event => event.stopPropagation()}>
            <img
              src={src}
              alt={label}
              className="guide-image-lightbox-image"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          </div>
        </div>
      ) : null}
    </figure>
  );
}

export type GuideImageItem = { label: string; caption?: string; src?: string };

type GuideImagePlaceholderGridProps = {
  items: GuideImageItem[];
  /**
   * When set, lightbox prev/next walks this full list instead of only `items`.
   * Use to browse every image on a page across multiple grids.
   */
  navigationItems?: GuideImageItem[];
  ratio?: "landscape" | "square" | "natural";
  className?: string;
};

function galleryFromItems(items: GuideImageItem[]) {
  return items
    .map((item, index) => ({ item, index }))
    .filter((entry): entry is { item: GuideImageItem & { src: string }; index: number } =>
      Boolean(entry.item.src)
    );
}

export function GuideImagePlaceholderGrid({
  items,
  navigationItems,
  ratio = "landscape",
  className,
}: GuideImagePlaceholderGridProps) {
  const localGallery = galleryFromItems(items);
  const navigationGallery = galleryFromItems(navigationItems ?? items);
  const gallery = navigationGallery.length > 0 ? navigationGallery : localGallery;

  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const active = activeGalleryIndex === null ? null : gallery[activeGalleryIndex];

  useEffect(() => {
    setRotation(0);
  }, [activeGalleryIndex]);

  useEffect(() => {
    if (activeGalleryIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveGalleryIndex(null);
        return;
      }
      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        setRotation(current => (current + 90) % 360);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveGalleryIndex(current =>
          current === null ? current : (current - 1 + gallery.length) % gallery.length
        );
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveGalleryIndex(current =>
          current === null ? current : (current + 1) % gallery.length
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeGalleryIndex, gallery.length]);

  const openItem = (itemIndex: number) => {
    const local = localGallery.find(entry => entry.index === itemIndex);
    if (!local?.item.src) return;

    const galleryIndex = gallery.findIndex(entry => entry.item.src === local.item.src);
    if (galleryIndex >= 0) {
      setActiveGalleryIndex(galleryIndex);
    }
  };

  const showPrev = () => {
    setActiveGalleryIndex(current =>
      current === null ? current : (current - 1 + gallery.length) % gallery.length
    );
  };

  const showNext = () => {
    setActiveGalleryIndex(current =>
      current === null ? current : (current + 1) % gallery.length
    );
  };

  return (
    <>
      <div className={["guide-image-placeholder-grid", className].filter(Boolean).join(" ")}>
        {items.map((item, index) => (
          <figure key={`${item.label}-${index}`} className="guide-image-placeholder">
            {item.src ? (
              <button
                type="button"
                className={[
                  "guide-image-media",
                  ratio === "square" ? "guide-image-media-square" : "",
                  ratio === "natural" ? "guide-image-media-natural" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => openItem(index)}
                aria-label={`View larger image: ${item.label}`}
              >
                <img src={item.src} alt={item.label} loading="lazy" />
              </button>
            ) : (
              <div
                className="guide-image-placeholder-frame"
                role="img"
                aria-label={`Placeholder for ${item.label}`}
              >
                <span className="guide-image-placeholder-tag">Image placeholder</span>
                <strong>{item.label}</strong>
              </div>
            )}
            {item.caption ? <figcaption>{item.caption}</figcaption> : null}
          </figure>
        ))}
      </div>

      {active ? (
        <div
          className="guide-image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.item.label}
          onClick={() => setActiveGalleryIndex(null)}
        >
          <button
            type="button"
            className="guide-image-lightbox-close"
            onClick={() => setActiveGalleryIndex(null)}
            aria-label="Close larger image"
          >
            Close
          </button>
          <button
            type="button"
            className="guide-image-lightbox-rotate"
            onClick={event => {
              event.stopPropagation();
              setRotation(current => (current + 90) % 360);
            }}
            aria-label="Rotate image 90 degrees"
          >
            Rotate
          </button>

          {gallery.length > 1 ? (
            <>
              <button
                type="button"
                className="guide-image-lightbox-nav guide-image-lightbox-nav-prev"
                onClick={event => {
                  event.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                className="guide-image-lightbox-nav guide-image-lightbox-nav-next"
                onClick={event => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
              >
                ›
              </button>
            </>
          ) : null}

          <div
            className="guide-image-lightbox-stage"
            onClick={event => event.stopPropagation()}
          >
            <img
              src={active.item.src}
              alt={active.item.label}
              className="guide-image-lightbox-image"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
            <p className="guide-image-lightbox-caption">
              {active.item.caption ?? active.item.label}
              {gallery.length > 1 ? (
                <span className="guide-image-lightbox-count">
                  {" "}
                  ({activeGalleryIndex! + 1} / {gallery.length})
                </span>
              ) : null}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
