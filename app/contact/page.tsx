import Navbar from "../components/Navbar";

export default function ContactPage() {
    return (
      <main className="min-h-screen bg-[#f7f4ef] text-[#111111]">
        <section className="mx-auto max-w-4xl px-6 py-24">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-black/50">
            Contact
          </p>
  
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            Let’s connect.
          </h1>
  
          <p className="mt-6 max-w-2xl text-xl leading-8 text-black/65">
            Feel free to reach out regarding product leadership,
            platform systems, AI automation, API's, consulting,
            or collaboration opportunities.
          </p>
  
          <div className="mt-16 grid gap-6">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                Email
              </p>
  
              <a
                href="mailto:davidhbahia@gmail.com"
                className="mt-3 block text-2xl font-medium hover:underline"
              >
                davidhbahia@gmail.com
              </a>
            </div>
  
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                LinkedIn
              </p>
  
              <a
                href="https://www.linkedin.com/in/david-bahia/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-3 text-xl font-medium hover:underline"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                  alt="LinkedIn"
                  className="h-6 w-6"
                />
  
                linkedin.com/in/david-bahia
              </a>
            </div>
  
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                  Phone
                </p>
  
                <a
                  href="tel:+14159378585"
                  className="mt-3 block text-xl font-medium hover:underline"
                >
                  (415) 937-8585
                </a>
              </div>
  
              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                  Location
                </p>
  
                <p className="mt-3 text-xl font-medium">
                  Portland, Oregon
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }