export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#111111]">
      <nav className="border-b border-black/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-sm font-semibold tracking-tight">
            David Bahia
          </a>

          <div className="flex gap-6 text-sm">
            <a href="/about" className="hover:underline">
              About
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <section className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-black/50">
            Product · Publishing Systems · Workflow Automation
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            I build systems that help editorial teams move faster.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-black/70">
            Senior Product Manager focused on CMS platforms, content workflows,
            syndication systems, automation, and revenue-driving publishing tools.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/about"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/80"
            >
              About Me
            </a>

            <a
              href="/contact"
              className="rounded-full border border-black/20 px-6 py-3 text-sm font-medium transition hover:border-black"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="aspect-[4/5] rounded-3xl border border-black/10 bg-black/10 p-6 shadow-sm">
            <div className="flex h-full items-end rounded-2xl bg-[#ded8cc] p-6">
              <p className="text-sm text-black/50">
                Image placeholder
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-2xl bg-[#d8d2c5]" />
            <div className="aspect-square rounded-2xl bg-[#c8c0b2]" />
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-white/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            What I work on
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Content Systems</h3>
              <p className="mt-4 leading-7 text-black/65">
                CMS tools, editorial workflows, assignment systems, publishing
                automation, and reporting interfaces.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Revenue Workflows</h3>
              <p className="mt-4 leading-7 text-black/65">
                Product work tied to publishing throughput, syndication,
                ad impressions, affiliate outcomes, and operational scale.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">AI-Assisted Tools</h3>
              <p className="mt-4 leading-7 text-black/65">
                Practical AI workflows for content operations, image generation,
                automation, and internal tooling.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-[2rem] bg-black p-8 text-white md:p-12">
          <p className="text-sm uppercase tracking-[0.25em] text-white/50">
            Current focus
          </p>

          <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Building better systems for high-volume digital publishing.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            I specialize in turning messy editorial operations into scalable
            product systems: cleaner workflows, fewer manual steps, better
            visibility, and faster publishing.
          </p>
        </div>
      </section>
    </main>
  );
}