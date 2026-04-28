import { useEffect } from "react";
import { Link } from "react-router-dom";

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".sr").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

const VALUES = [
  {icon:"🔒",title:"Safety First",desc:"Round-the-clock security so students and families have total peace of mind."},
  {icon:"📖",title:"Academic Focus",desc:"Quiet zones, fast internet, and study spaces built for learning."},
  {icon:"🤝",title:"Community",desc:"A warm, inclusive student community that feels like a second family."},
  {icon:"✨",title:"Quality Living",desc:"Quality furnishings, clean spaces, reliable maintenance — always."},
];

export default function About() {
  useScrollReveal();
  return (
    <main className="pt-[72px]">
      {/* Header */}
      <section className="relative bg-ink py-24 px-6 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80"
          alt="" className="absolute inset-0 img-cover opacity-15" />
        <div className="absolute inset-0" style={{background:"rgba(10,10,10,0.7)"}} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="sec-label mb-4" style={{color:"#6ee6a0"}}>Our Story</p>
          <h1 className="font-display text-white font-black leading-[.95]"
            style={{fontSize:"clamp(3rem,8vw,6.5rem)"}}>
            About<br/><em className="font-light italic" style={{color:"#a8f0c6"}}>Us.</em>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 bg-parchment">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="rule sr mb-6" />
            <h2 className="sr font-display text-4xl md:text-5xl font-bold text-ink mb-6 leading-tight">
              Rooted in care,<br/><em className="text-brand font-light italic">built for students.</em>
            </h2>
            <div className="space-y-4 text-gray-500 text-base leading-relaxed">
              <p className="sr">Founded in 2015, Consolata Hostel was built on a simple belief: every student deserves a safe, affordable, and comfortable home away from home. Nestled in Kilimani — one of Nairobi's most accessible neighbourhoods — we've grown from 20 rooms to one of the city's most trusted student residences.</p>
              <p className="sr">Our name honours the Consolata Missionaries, whose legacy of education and community continues to inspire how we operate. We believe when students feel truly at home, they perform better and grow into confident individuals.</p>
              <p className="sr">Today we house over 200 students from universities across Nairobi, creating a vibrant, diverse, academically-driven community.</p>
            </div>
          </div>
          <div className="sr grid grid-cols-2 gap-3 h-[460px]">
            <div className="rounded-2xl overflow-hidden row-span-2">
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=85" alt="" className="img-cover h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=85" alt="" className="img-cover h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=85" alt="" className="img-cover h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-20 px-6 bg-ink">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {emoji:"🎯",label:"Our Mission",bg:"bg-brand",text:"To provide premium, affordable student accommodation that fosters academic excellence, personal growth, and genuine community — empowering every student to achieve their full potential."},
            {emoji:"🔭",label:"Our Vision",bg:"bg-white/5 border border-white/10",text:"To be Nairobi's most trusted student residence — known for safety, comfort, and the success of every student who calls Consolata home."},
          ].map(item=>(
            <div key={item.label} className={`sr rounded-3xl p-10 ${item.bg}`}>
              <p className="text-4xl mb-5">{item.emoji}</p>
              <p className="sec-label mb-3 text-white/50">{item.label}</p>
              <p className="text-white/80 text-lg leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="sec-label sr mb-3">What Guides Us</p>
          <h2 className="sr font-display text-4xl font-bold text-ink mb-12">Core Values.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v,i)=>(
              <div key={v.title} className={`sr sr-delay-${i+1} bg-parchment rounded-2xl p-7`}>
                <p className="text-3xl mb-4">{v.icon}</p>
                <h3 className="font-semibold text-ink text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-brand text-center">
        <div className="max-w-2xl mx-auto sr">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Come see it yourself.</h2>
          <p className="text-white/70 text-lg mb-8">Schedule a free tour or book directly online.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/booking" className="bg-white text-brand font-bold px-8 py-4 rounded-full text-sm hover:bg-parchment transition-colors">Book a Room</Link>
            <Link to="/contact" className="btn-outline-white px-8 py-4 rounded-full text-sm">Schedule a Tour</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
