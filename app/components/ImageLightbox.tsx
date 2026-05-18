"use client";

import { useCallback, useEffect, useState } from "react";

type ImageLightboxProps = {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
};

export default function ImageLightbox({
  src,
  alt,
  className = "h-full w-full object-cover",
  wrapperClassName = "block h-full w-full",
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`cursor-zoom-in transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 ${wrapperClassName}`}
        aria-label={`View full size: ${alt}`}
      >
        <img src={src} alt={alt} className={className} />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Close"
          >
            Close
          </button>

          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[min(90vw,1200px)] rounded-2xl object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
