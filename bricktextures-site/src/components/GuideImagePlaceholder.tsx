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

  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
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
          <img
            src={src}
            alt={label}
            className="guide-image-lightbox-image"
            onClick={event => event.stopPropagation()}
          />
        </div>
      ) : null}
    </figure>
  );
}

type GuideImagePlaceholderGridProps = {
  items: { label: string; caption?: string; src?: string }[];
  ratio?: "landscape" | "square" | "natural";
};

export function GuideImagePlaceholderGrid({
  items,
  ratio = "landscape",
}: GuideImagePlaceholderGridProps) {
  return (
    <div className="guide-image-placeholder-grid">
      {items.map((item, index) => (
        <GuideImagePlaceholder
          key={`${item.label}-${index}`}
          label={item.label}
          caption={item.caption}
          src={item.src}
          ratio={ratio}
        />
      ))}
    </div>
  );
}
