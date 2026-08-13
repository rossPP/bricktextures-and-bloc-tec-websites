type AppearanceCardMediaProps = {
  tone: string;
  image?: string;
};

export function AppearanceCardMedia({ tone, image }: AppearanceCardMediaProps) {
  if (image) {
    return (
      <span className="appearance-swatch appearance-swatch-image" aria-hidden="true">
        <img src={image} alt="" draggable={false} />
      </span>
    );
  }

  return <span className={`appearance-swatch appearance-swatch-${tone}`} aria-hidden="true" />;
}
