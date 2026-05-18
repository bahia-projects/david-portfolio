export default function Navbar() {
    return (
      <nav className="w-full border-b border-black/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex gap-6">
          <a href="/" className="hover:underline">
            Home
          </a>
  
          <a href="/about" className="hover:underline">
            About
          </a>
  
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
      </nav>
    );
  }