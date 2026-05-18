import Navbar from "../components/Navbar";

export default function AboutPage() {
    return (
      <main className="min-h-screen bg-white text-black">
      <Navbar />
        <section className="max-w-3xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold mb-8">
            About
          </h1>
  
          <div className="space-y-6 text-lg leading-8">
            <p>
            Senior Product Manager with 9+ years of experience building scalable platform products, workflow infrastructure, 
            and monetization systems across enterprise digital ecosystems including Gen Digital, Forbes Advisor, Red Ventures, and Healthline Media. 
            </p>
  
            <p>
            Proven track record leading cross-functional teams to modernize legacy platforms, drive platform migrations, 
            develop AI-enabled operational tooling, and deliver high-impact product initiatives supporting millions of users and large-scale revenue growth. 
            </p>
  
            <p>
            Experienced in platform strategy, systems integration, automation, product discovery,
            and translating complex business problems into scalable technical solutions.
            </p>
          </div>
        </section>
      </main>
    );
  }