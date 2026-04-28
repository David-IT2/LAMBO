import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ROOMS, FEATURES, TESTIMONIALS } from "../data";
import RoomCard from "../components/RoomCard";

const SLIDES = [
  { img:"https://images.unsplash.com/photo-1562664377-709f2c337eb2?w=1800&q=85", label:"Kilimani, Nairobi" },
  { img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&q=85", label:"Premium Rooms" },
  { img:"https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1800&q=85", label:"Study & Thrive" },
];

const TICKER_ITEMS = ["Premium Student Living","Free High-Speed WiFi","24/7 Security","Fully Furnished","Book Online Today"];

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".sr").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  useScrollReveal();

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s+1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <main>

      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[640px] overflow-hidden">
        {SLIDES.map((s,i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1200 ${i===slide?"opacity-100":"opacity-0"}`}
            style={{transition:"opacity 1.2s ease"}}>
            <img src={s.img} alt="" className="img-cover" />
          </div>
        ))}
        <div className="hero-grad absolute inset-0" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-24">
          <div className="max-w-7xl mx-auto w-full">
            <p className="sec-label anim-1 mb-4" style={{color:"#6ee6a0"}}>{SLIDES[slide].label}</p>
            <h1 className="font-display text-white font-black leading-[.95] anim-2"
              style={{fontSize:"clamp(3.2rem,9vw,8rem)"}}>
              Your home<br/>
              <em className="font-light italic" style={{color:"#a8f0c6"}}>away from</em><br/>
              home.
            </h1>
            <p className="text-white/65 text-lg md:text-xl max-w-xl mt-6 mb-10 leading-relaxed anim-3">
              student accommodation in Karen — where comfort, security, and academic excellence meet.
            </p>
            <div className="flex flex-wrap gap-3 anim-4">
              <Link to="/rooms" className="btn-brand px-8 py-4 rounded-full text-base">Explore Rooms →</Link>
              <Link to="/booking" className="btn-outline-white px-8 py-4 rounded-full text-base">Book Now</Link>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-8 right-10 z-10 flex gap-2">
          {SLIDES.map((_,i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`hdot ${i===slide?"on":""}`} aria-label={`Slide ${i+1}`} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-6 md:left-16 z-10 flex items-center gap-3 text-white/40">
          <div className="w-px h-12 bg-white/20" />
          <span className="text-xs tracking-[.2em] uppercase font-medium">Scroll to explore</span>
        </div>
      </section>

      {/* ═══ TICKER STRIP ═══════════════════════════════════════════════ */}
      <div className="bg-brand overflow-hidden py-3.5 border-y border-brand-dark">
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-white font-semibold text-sm tracking-wide px-8 flex items-center gap-3 whitespace-nowrap">
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ INTRO ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="sec-label sr mb-4">About Consolata</p>
            <h2 className="sr font-display text-5xl md:text-6xl font-bold text-ink leading-tight mb-6">
              Built for students.<br/>
              <em className="font-light italic text-brand">Designed for life.</em>
            </h2>
            <p className="sr text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              Since 2015, Consolata Hostel has provided Nairobi's students with a safe, comfortable, and inspiring place to live and grow. We're more than a hostel — we're a community.
            </p>
            <div className="sr grid grid-cols-2 gap-4 mb-10">
              {[["200+","Students Housed"],["3","Room Types"],["5★","Average Rating"],["10+","Years Running"]].map(([n,l])=>(
                <div key={l} className="bg-parchment rounded-2xl p-5">
                  <p className="font-display text-3xl font-black text-ink">{n}</p>
                  <p className="text-gray-500 text-sm mt-1">{l}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="sr btn-outline inline-block px-8 py-4 rounded-full text-sm">Our Story →</Link>
          </div>

          {/* Image collage */}
          <div className="sr grid grid-cols-2 gap-3 h-[500px]">
            <div className="rounded-2xl overflow-hidden row-span-2">
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=85" alt="" className="img-cover h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&q=85" alt="" className="img-cover h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=700&q=85" alt="" className="img-cover h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-ink">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <p className="sec-label sr mb-3" style={{color:"#6ee6a0"}}>Why Consolata</p>
              <h2 className="sr font-display text-4xl md:text-5xl font-bold text-white leading-tight">
                Everything you need,<br/><em className="font-light italic" style={{color:"#6ee6a0"}}>all in one place.</em>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f,i)=>(
              <div key={f.title}
                className={`sr sr-delay-${Math.min(i+1,4)} rounded-2xl p-7 border transition-all duration-300 hover:border-brand/50 cursor-default`}
                style={{background:"rgba(255,255,255,0.04)", borderColor:"rgba(255,255,255,0.08)"}}>
                <div className="text-3xl mb-5">{f.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ROOMS ══════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <p className="sec-label sr mb-3">Our Spaces</p>
              <h2 className="sr font-display text-4xl md:text-5xl font-bold text-ink">
                Choose your<br/><em className="text-brand font-light italic">perfect room.</em>
              </h2>
            </div>
            <Link to="/rooms" className="sr mt-6 md:mt-0 text-sm font-semibold text-brand hover:underline underline-offset-4">
              View all rooms →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROOMS.map((room,i)=>(
              <div key={room.id} className={`sr sr-delay-${i+1}`}>
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FULL-BLEED LIFESTYLE BANNER ═════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1800&q=85"
          alt="" className="absolute inset-0 img-cover" />
        <div className="absolute inset-0" style={{background:"rgba(10,10,10,0.72)"}} />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <p className="sec-label sr mb-5" style={{color:"#6ee6a0"}}>Student Life at Consolata</p>
          <blockquote className="sr font-display font-bold text-white leading-tight mb-8"
            style={{fontSize:"clamp(2.2rem,5.5vw,4.5rem)"}}>
            "A place where ambition<br/>meets <em className="font-light italic" style={{color:"#a8f0c6"}}>comfort."</em>
          </blockquote>
          <p className="sr text-white/60 text-xl mb-10 max-w-lg mx-auto">
            Join 200+ students who've made Consolata their academic home.
          </p>
          <Link to="/booking" className="sr btn-brand inline-block px-10 py-4 rounded-full text-base">
            Secure Your Spot Today
          </Link>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="sec-label sr mb-3">Residents Say</p>
            <h2 className="sr font-display text-4xl md:text-5xl font-bold text-ink">
              Real stories from<br/><em className="text-brand font-light italic">real students.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t,i)=>(
              <div key={t.name}
                className={`sr sr-delay-${i+1} rounded-2xl p-8 border border-stone`}
                style={{background:"#faf9f6"}}>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({length:5},(_,j)=>(
                    <span key={j} className={j<t.rating?"text-amber-400 text-xl":"text-gray-200 text-xl"}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-base leading-relaxed mb-7 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`${t.color} w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-brand">
        <div className="max-w-3xl mx-auto text-center sr">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to call Consolata home?
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Rooms fill up fast. Book now to lock in your spot for the next academic year.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/booking" className="bg-white text-brand font-bold px-10 py-4 rounded-full hover:bg-parchment transition-colors text-sm">
              Book a Room
            </Link>
            <Link to="/contact" className="btn-outline-white px-10 py-4 rounded-full text-sm">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
