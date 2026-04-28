import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ROOMS } from "../data";

export default function RoomDetails() {
  const { slug } = useParams();
  const room = ROOMS.find(r=>r.slug===slug);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(()=>{ window.scrollTo(0,0); },[slug]);

  if (!room) return <Navigate to="/rooms" replace />;

  return (
    <main className="pt-[72px] bg-parchment min-h-screen">
      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden bg-ink">
        <img src={room.gallery[activeImg]} alt={room.type} className="img-cover transition-all duration-700"/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)"}}/>
        {/* Arrows */}
        <button onClick={()=>setActiveImg(i=>(i-1+room.gallery.length)%room.gallery.length)}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-lg transition-all">←</button>
        <button onClick={()=>setActiveImg(i=>(i+1)%room.gallery.length)}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-lg transition-all">→</button>
        {/* Bottom info overlay */}
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            {room.badge && <span className="pill bg-brand text-white mb-2 block w-fit">{room.badge}</span>}
            <h1 className="font-display text-white font-black text-4xl md:text-5xl">{room.type}</h1>
          </div>
          <span className={`pill ${room.available?"bg-white text-ink":"bg-red-500 text-white"}`}>
            {room.available ? "✓ Available" : "Fully Booked"}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="bg-ink px-6 pb-4 flex gap-2 overflow-x-auto">
        {room.gallery.map((img,i)=>(
          <button key={i} onClick={()=>setActiveImg(i)}
            className={`flex-shrink-0 rounded-xl overflow-hidden transition-all ${i===activeImg?"ring-2 ring-brand-light ring-offset-2 ring-offset-ink opacity-100":"opacity-50 hover:opacity-80"}`}
            style={{width:"72px",height:"52px"}}>
            <img src={img} alt="" className="img-cover"/>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left */}
        <div className="lg:col-span-2">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8 font-medium">
            <Link to="/" className="hover:text-ink transition-colors">Home</Link>
            <span>/</span><Link to="/rooms" className="hover:text-ink transition-colors">Rooms</Link>
            <span>/</span><span className="text-ink">{room.type}</span>
          </nav>

          <div className="rule mb-5"/>
          <p className="text-gray-500 text-lg mb-8">{room.tagline}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[["👤", room.occupancy===1?"Single":room.occupancy+" people", "Occupancy"],["📐",room.size,"Room Size"],["🏠",room.type.includes("Bedsit")?"Studio":"Standard","Layout"],["⭐","4.9/5","Rating"]].map(([icon,val,label])=>(
              <div key={label} className="bg-white rounded-2xl p-4 text-center border border-stone">
                <p className="text-2xl mb-1">{icon}</p>
                <p className="font-bold text-ink text-sm">{val}</p>
                <p className="text-gray-400 text-xs">{label}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl font-bold text-ink mb-4">About this room</h2>
          <p className="text-gray-500 leading-relaxed mb-10">{room.description}</p>

          <h2 className="font-display text-2xl font-bold text-ink mb-5">Amenities</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {room.amenities.map(a=>(
              <li key={a} className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-stone">
                <span className="w-6 h-6 bg-brand/10 text-brand rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                <span className="text-sm text-gray-700 font-medium">{a}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sticky booking sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl border border-stone p-7 shadow-sm">
            <div className="bg-parchment rounded-2xl p-5 mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Monthly Rent</p>
              <p className="font-display text-4xl font-black text-ink">KSh {room.price.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">All utilities included</p>
            </div>

            <ul className="space-y-2.5 mb-6">
              {["All bills included","Move in ready","Flexible contracts","24/7 security"].map(f=>(
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <span className="text-brand font-bold">✓</span>{f}
                </li>
              ))}
            </ul>

            {room.available ? (
              <Link to={`/booking?room=${room.slug}`}
                className="block w-full text-center btn-brand py-4 rounded-xl font-semibold text-sm mb-3">
                Book This Room →
              </Link>
            ) : (
              <div className="space-y-3">
                <p className="text-center text-sm text-red-600 font-semibold bg-red-50 py-3 rounded-xl">Currently Fully Booked</p>
                <Link to="/booking" className="block w-full text-center btn-outline py-4 rounded-xl text-sm font-semibold">
                  Join Waitlist
                </Link>
              </div>
            )}

            <Link to="/contact" className="block w-full text-center text-sm text-gray-500 hover:text-ink font-medium mt-3 transition-colors">
              📞 Ask a question
            </Link>
          </div>
        </div>
      </div>

      {/* Other rooms */}
      <section className="border-t border-stone py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-ink mb-8">Other Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ROOMS.filter(r=>r.id!==room.id).map(r=>(
              <Link key={r.id} to={`/rooms/${r.slug}`}
                className="flex gap-4 bg-white rounded-2xl p-4 border border-stone hover:border-gray-300 transition-all items-center group">
                <img src={r.image} alt={r.type} className="w-20 h-20 object-cover rounded-xl flex-shrink-0"/>
                <div className="flex-1">
                  <p className="font-bold text-ink group-hover:text-brand transition-colors">{r.type}</p>
                  <p className="text-brand font-semibold text-sm">KSh {r.price.toLocaleString()}/mo</p>
                  <p className={`text-xs mt-1 font-semibold ${r.available?"text-brand":"text-red-500"}`}>
                    {r.available?"✓ Available":"Fully Booked"}
                  </p>
                </div>
                <span className="text-gray-300 group-hover:text-brand transition-colors text-xl">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
