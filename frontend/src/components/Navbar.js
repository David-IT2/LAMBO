import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { label: "Home", path: "/" },
  { label: "Rooms", path: "/rooms" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const dark = !isHome || scrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${dark ? "nav-scrolled" : "nav-hero"}`}>
      <div className="max-w-7xl mx-auto px-6 xl:px-10 flex items-center justify-between" style={{height:"72px"}}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
            <span className="font-display text-white font-black text-base italic">C</span>
          </div>
          <div>
            <p className="font-display text-white font-bold text-lg leading-none tracking-tight">Consolata</p>
            <p className="text-white/50 text-[10px] tracking-[.18em] uppercase font-medium">Hostel</p>
          </div>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map(l => (
            <Link key={l.path} to={l.path}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 relative ${
                pathname === l.path ? "text-white" : "text-white/65 hover:text-white"
              }`}>
              {l.label}
              {pathname === l.path && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-light rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right — Book Now only */}
        <div className="hidden md:flex items-center">
          <Link to="/booking" className="btn-brand text-sm px-6 py-2.5 rounded-full">
            Book a Room
          </Link>
        </div>

        {/* Burger */}
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5">
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0 w-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-ink ${open ? "max-h-screen" : "max-h-0"}`}>
        <div className="px-6 pt-2 pb-6 space-y-1 border-t border-white/10">
          {LINKS.map(l => (
            <Link key={l.path} to={l.path}
              className={`block py-3.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                pathname === l.path ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}>
              {l.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 mt-3">
            <Link to="/booking" className="block btn-brand text-center text-sm py-3.5 px-4 rounded-xl">
              Book a Room
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}