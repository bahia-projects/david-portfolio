"use client";

import { useCallback, useEffect, useState } from "react";

export type PortfolioImage = {
  src: string;
  alt: string;
};

type PortfolioProjectCardProps = {
  title: string;
  images: PortfolioImage[];
};

export default function PortfolioProjectCard({
  title,
  images,
}: PortfolioProjectCardProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const hasImages = images.length > 0;
  const cover = images[0];

  const close = useCallback(() => setOpen(false), []);

  const goPrev = useCallback(() => {
    setIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }, [images.length]);

  const openGallery = () => {
    if (!hasImages) return;
    setIndex(0);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close, goPrev, goNext]);

  const current = images[index];

  return (
    <>
      <article>
        {hasImages ? (
          <button
            type="button"
            onClick={openGallery}
            className="block w-full cursor-zoom-in overflow-hidden rounded-3xl border border-black/10 bg-[#f7f4ef] text-left transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            aria-label={`Open gallery: ${title}`}
          >
            <div className="aspect-[4/3]">
              <img
                src={cover.src}
                alt={cover.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </button>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-black/10 bg-[#f7f4ef] text-3xl text-black/25">
            +
          </div>
        )}

        <h2 className="mt-4 text-lg font-semibold tracking-tight">{title}</h2>
        {hasImages && images.length > 1 ? (
          <p className="mt-1 text-sm text-black/50">
            {images.length} images — click to view
          </p>
        ) : null}
      </article>

      {open && current ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Close gallery"
          >
            Close
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goPrev();
                }}
                className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goNext();
                }}
                className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                aria-label="Next image"
              >
                →
              </button>
              <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-sm text-white/70">
                {index + 1} / {images.length}
              </p>
            </>
          ) : null}

          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[85vh] max-w-[min(90vw,1200px)] rounded-2xl object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
