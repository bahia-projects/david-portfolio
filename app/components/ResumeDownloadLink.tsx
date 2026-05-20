"use client";

type ResumeDownloadLinkProps = {
  className?: string;
};

declare global {
  function gtag(...args: unknown[]): void;
}

export default function ResumeDownloadLink({ className }: ResumeDownloadLinkProps) {
  return (
    <a
      href="/resume.pdf"
      download="David-Bahia-Resume.pdf"
      className={className}
      onClick={() => {
        gtag("event", "resume_download");
      }}
    >
      Résumé
    </a>
  );
}
