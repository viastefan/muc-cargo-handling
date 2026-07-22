import Image from "next/image";

type ImageItem = {
  src: string;
  alt: string;
  caption?: string;
};

export function HomeImagePair({ images }: { images: readonly ImageItem[] }) {
  if (images.length < 2) return null;

  return (
    <div className="home-image-pair">
      {images.slice(0, 2).map((item, index) => (
        <figure
          key={item.src}
          className={`home-image-pair__item${index === 1 ? " home-image-pair__item--offset" : ""}`}
        >
          <div className="home-image-pair__frame">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {item.caption && <figcaption className="home-image-pair__caption">{item.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
