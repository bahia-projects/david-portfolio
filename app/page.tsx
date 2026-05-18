import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
    <Navbar />
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="text-6xl font-bold mb-6">
          David Bahia
        </h1>

        <p className="text-2xl max-w-2xl mb-10">
          Product leader building content systems, publishing workflows,
          and scalable editorial tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
  <div className="aspect-square bg-gray-200 rounded-xl" />
  <div className="aspect-square bg-gray-200 rounded-xl" />
  <div className="aspect-square bg-gray-200 rounded-xl" />
</div>

      </section>
    </main>
  );
}
