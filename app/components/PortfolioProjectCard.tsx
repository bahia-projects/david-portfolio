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
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
        {label}
      </h3>
      <p className="mt-2 text-sm leading-7 text-black/75 md:text-base">{text}</p>
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
            aria-label={`Open project: ${title}`}
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
        {summary ? (
          <p className="mt-2 text-sm leading-6 text-black/65">{summary}</p>
        ) : null}
        {hasImages ? (
          <p className="mt-2 text-sm text-black/45">Click to view details</p>
        ) : null}
      </article>

      {open && current ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/90"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} project details`}
        >
          <div className="flex shrink-0 items-center justify-between px-4 py-3 md:px-6">
            <p className="text-sm font-medium text-white/70">{title}</p>
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label="Close"
            >
              Close
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col">
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-2 md:px-8">
              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 md:left-4"
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 md:right-4"
                    aria-label="Next image"
                  >
                    →
                  </button>
                  <p className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 text-sm text-white/60">
                    {index + 1} / {images.length}
                  </p>
                </>
              ) : null}

              <img
                src={current.src}
                alt={current.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="max-h-[50vh] shrink-0 overflow-y-auto border-t border-black/10 bg-[#f7f4ef] px-6 py-6 md:px-10 md:py-8">
              <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
              <div className="mt-6 space-y-6">
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
