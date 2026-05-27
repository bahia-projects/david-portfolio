"use client";

import { useCallback, useEffect, useState } from "react";

export type PortfolioImage = {
  src: string;
  alt: string;
};

export type PortfolioProjectDetails = {
  problem: string;
  solution: string;
  outcome: string;
};

type PortfolioProjectCardProps = {
  title: string;
  summary: string;
  details: PortfolioProjectDetails;
  images: PortfolioImage[];
};

function DetailBlock({ label, text }: { label: string; text: string }) {
  if (!text.trim()) return null;

  return (
    <div>
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-black/45">
        {label}
      </p>
      <p className="mt-2 text-sm leading-7 text-black/80 md:text-[15px] md:leading-8">
        {text}
      </p>
    </div>
  );
}

export default function PortfolioProjectCard({
  title,
  summary,
  details,
  images,
}: PortfolioProjectCardProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const hasImages = images.length > 0;
  const cover = images[0];
  const multiImage = images.length > 1;

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
      <article className="group flex h-full flex-col">
        {hasImages ? (
          <button
            type="button"
            onClick={openGallery}
            className="relative block w-full cursor-zoom-in overflow-hidden rounded-3xl border border-black/10 bg-[#ebe6de] text-left shadow-sm transition-[border-color,box-shadow] duration-300 ease-out group-hover:border-black/20 group-hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            aria-label={`Open project: ${title}`}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={cover.src}
                alt={cover.alt}
                className="image-hover-pop h-full w-full object-cover will-change-transform"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            />
            {multiImage ? (
              <span className="absolute right-3 bottom-3 rounded-full border border-white/25 bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {images.length} images
              </span>
            ) : null}
          </button>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-dashed border-black/15 bg-[#ebe6de] text-3xl text-black/25">
            +
          </div>
        )}

        {hasImages ? (
          <button
            type="button"
            onClick={openGallery}
            className="mt-4 flex flex-1 cursor-pointer flex-col rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            aria-label={`View project: ${title}`}
          >
            <h2 className="text-lg font-semibold tracking-tight transition-colors duration-200 group-hover:text-black">
              {title}
            </h2>

            {summary ? (
              <div className="mt-3 flex flex-1 flex-col rounded-2xl border border-black/[0.08] bg-white/70 px-4 py-3.5 shadow-sm transition-[border-color,box-shadow,background-color] duration-300 group-hover:border-black/15 group-hover:bg-white group-hover:shadow-md">
                <p className="text-sm leading-relaxed text-black/70">{summary}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-black/40 transition-colors duration-200 group-hover:text-black/60">
                  View project →
                </p>
              </div>
            ) : (
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                View project →
              </p>
            )}
          </button>
        ) : (
          <div className="mt-4 flex flex-1 flex-col">
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            {summary ? (
              <div className="mt-3 flex flex-1 flex-col rounded-2xl border border-black/[0.08] bg-white/70 px-4 py-3.5 shadow-sm">
                <p className="text-sm leading-relaxed text-black/70">{summary}</p>
              </div>
            ) : null}
          </div>
        )}
      </article>

      {open && current ? (
        <div
          className="animate-backdrop-in fixed inset-0 z-50 flex flex-col bg-black/90"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} project details`}
        >
          <div className="flex shrink-0 items-center justify-between px-4 py-3 md:px-6">
            <p className="text-sm font-medium text-white/70">{title}</p>
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/20"
              aria-label="Close"
            >
              Close
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col">
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-2 md:px-8">
              {multiImage ? (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/20 md:left-4"
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/20 md:right-4"
                    aria-label="Next image"
                  >
                    →
                  </button>
                </>
              ) : null}

              <img
                key={index}
                src={current.src}
                alt={current.alt}
                className="animate-image-in max-h-full max-w-full object-contain"
              />

              {multiImage ? (
                <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
                  <p className="text-sm text-white/60">
                    {index + 1} / {images.length}
                  </p>
                  <div className="flex gap-1.5" role="tablist" aria-label="Gallery images">
                    {images.map((image, imageIndex) => (
                      <button
                        key={image.src}
                        type="button"
                        role="tab"
                        aria-selected={imageIndex === index}
                        aria-label={`Image ${imageIndex + 1}`}
                        onClick={() => setIndex(imageIndex)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          imageIndex === index
                            ? "w-6 bg-white"
                            : "w-1.5 bg-white/35 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="animate-panel-up max-h-[50vh] shrink-0 overflow-y-auto border-t border-black/10 bg-[#f7f4ef] px-8 py-6 md:px-12 md:py-7 lg:px-16">
              <h2 className="text-xl font-semibold tracking-tight text-black/90 md:text-2xl">
                {title}
              </h2>
              <div className="mt-5 grid gap-6 md:mt-6 md:grid-cols-3 md:gap-8 lg:gap-10">
                <DetailBlock label="Problem" text={details.problem} />
                <DetailBlock label="Solution" text={details.solution} />
                <DetailBlock label="Outcome" text={details.outcome} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
