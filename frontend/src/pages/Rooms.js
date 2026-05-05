import { useState, useEffect } from "react";
import { ROOMS } from "../data";
import RoomCard from "../components/RoomCard";

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

export default function Rooms() {
  const [filter, setFilter] = useState("all");
  useScrollReveal();

  const filtered = filter === "available" ? ROOMS.filter(r=>r.available)
    : filter === "booked" ? ROOMS.filter(r=>!r.available) : ROOMS;

  return (
    <main className="pt-[72px]">
      {/* Header */}
      <section className="relative bg-ink py-24 px-6 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80"
          alt="" className="absolute inset-0 img-cover opacity-20" />
        <div className="absolute inset-0" style={{background:"linear-gradient(135deg,rgba(0,0,0,0.6),rgba(26,107,60,0.3))"}} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="sec-label mb-4" style={{color:"#6ee6a0"}}>Accommodation</p>
          <h1 className="font-display text-white font-black leading-tight"
            style={{fontSize:"clamp(3rem,8vw,6rem)"}}>
            Our<br/><em className="font-light italic" style={{color:"#a8f0c6"}}>Rooms.</em>
          </h1>
          <p className="text-white/60 text-xl mt-4 max-w-lg">
            Three thoughtfully designed spaces — find the one that fits your life and budget.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-stone py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto">
          {[["all","All Rooms"],["available","✓ Available"],["booked","Fully Booked"]].map(([k,l])=>(
            <button key={k} onClick={()=>setFilter(k)}
              className={`flex-shrink-0 text-sm font-semibold px-5 py-2 rounded-full transition-all ${
                filter===k ? "bg-ink text-white" : "bg-parchment text-gray-600 hover:bg-stone"
              }`}>{l}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 flex-shrink-0 font-medium">
            {filtered.length} room{filtered.length!==1?"s":""}
          </span>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 px-6 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((room,i)=>(
              <div key={room.id} className={`sr sr-delay-${i+1}`}>
                <RoomCard room={room} />
              </div>
            ))}
          </div>
          {filtered.length===0 && (
            <p className="text-center text-gray-400 py-20 text-lg">No rooms match the selected filter.</p>
          )}
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="sec-label sr mb-3">Compare</p>
          <h2 className="sr font-display text-4xl font-bold text-ink mb-12">Side by side.</h2>
          <div className="sr overflow-x-auto rounded-2xl border border-stone">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ink">
                  <th className="text-left py-4 px-6 text-white/60 text-xs font-semibold uppercase tracking-widest">Feature</th>
                  {ROOMS.map(r=>(
                    <th key={r.id} className="py-4 px-4 text-center">
                      <p className="text-white font-display font-bold text-base">{r.type}</p>
                      <p className="text-brand-light text-xs font-medium mt-0.5">KSh {r.price.toLocaleString()}/mo</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Occupancy",...ROOMS.map(r=>r.occupancy===1?"Single":`${r.occupancy} people`)],
                  ["Bathroom","En-suite","Shared floor","En-suite"],
                  ["WiFi","✓","✓","✓"],
                  ["Bed & Mattress","✓","✓","✓"],
                  ["Kitchenette","✓","✓","✓"],
                  ["Study Desk","✓","✓","✓"],
                ].map(([label,...vals],i)=>(
                  <tr key={label} className={i%2===0?"bg-parchment/50":"bg-white"}>
                    <td className="py-3.5 px-6 font-medium text-ink">{label}</td>
                    {vals.map((v,j)=>(
                      <td key={j} className={`py-3.5 px-4 text-center font-medium ${v==="✓"?"text-brand":v==="—"?"text-gray-300":"text-gray-600"}`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
