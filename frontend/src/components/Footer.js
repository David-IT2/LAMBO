import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* Top CTA strip */}
      <div className="border-b border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="sec-label mb-3" style={{color:"#2d8f53"}}>Limited Rooms Available</p>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to move in?
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link to="/booking" className="btn-brand px-8 py-4 rounded-full text-sm">Book Now</Link>
            <Link to="/contact" className="btn-outline-white px-8 py-4 rounded-full text-sm">Get in Touch</Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand col */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center">
                <span className="font-display text-white font-black text-base italic">C</span>
              </div>
              <p className="font-display text-xl font-bold text-white">Consolata Hostel</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Students accommodation in Karen, Nairobi. Designed for academic excellence and comfortable living.
            </p>
            <div className="flex gap-3 mt-6">
              {["f", "in", "tw"].map(s => (
                <button key={s} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-white/40 hover:text-white transition-all text-xs font-bold">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2 md:col-start-6">
            <p className="text-white/30 text-[10px] font-bold tracking-[.18em] uppercase mb-5">Navigate</p>
            <ul className="space-y-3">
              {[["Home","/"],["Rooms","/rooms"],["About","/about"],["Contact","/contact"],["Book Now","/booking"]].map(([l,p])=>(
                <li key={p}><Link to={p} className="text-sm text-white/55 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Rooms */}
          <div className="md:col-span-2">
            <p className="text-white/30 text-[10px] font-bold tracking-[.18em] uppercase mb-5">Room Types</p>
            <ul className="space-y-3">
              {[["Single Ensuite","/rooms/single-ensuite"],["Shared Double","/rooms/shared-double"],["Bedsitter Studio","/rooms/bedsitter"]].map(([l,p])=>(
                <li key={p}><Link to={p} className="text-sm text-white/55 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="text-white/30 text-[10px] font-bold tracking-[.18em] uppercase mb-5">Find Us</p>
            <ul className="space-y-3 text-sm text-white/55">
              <li className="flex gap-2"><span>📍</span><span>Ushirika Rd, Karen, Nairobi</span></li>
              <li className="flex gap-2"><span>📞</span><span>+254 707 850 858</span></li>
              <li className="flex gap-2"><span>✉️</span><span>Consolata@gmail.com</span></li>
              <li className="flex gap-2"><span>🕐</span><span>Mon–Sat, 8am – 6pm</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} Consolata Hostel Ltd. All rights reserved.</p>
          <p className="text-white/25 text-xs">Designed for student excellence · Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}
