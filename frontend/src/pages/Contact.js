import { useState, useEffect } from "react";

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

export default function Contact() {
  const [form, setForm] = useState({name:"",email:"",phone:"",subject:"",message:""});
  const [sent, setSent] = useState(false);
  const set = f => e => setForm(p=>({...p,[f]:e.target.value}));
  useScrollReveal();

  return (
    <main className="pt-[72px]">
      {/* Header */}
      <section className="relative bg-ink py-24 px-6">
        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80"
          alt="" className="absolute inset-0 img-cover opacity-15" />
        <div className="absolute inset-0" style={{background:"rgba(10,10,10,0.7)"}} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="sec-label mb-4" style={{color:"#6ee6a0"}}>Get In Touch</p>
          <h1 className="font-display text-white font-black leading-[.95]"
            style={{fontSize:"clamp(3rem,8vw,6.5rem)"}}>
            Contact<br/><em className="font-light italic" style={{color:"#a8f0c6"}}>Us.</em>
          </h1>
        </div>
      </section>

      <section className="py-20 px-6 bg-parchment">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="rule sr mb-5"/>
              <h2 className="sr font-display text-3xl font-bold text-ink mb-2">We'd love to<br/><em className="text-brand font-light italic">hear from you.</em></h2>
            </div>
            {[
              {icon:"📍",title:"Address",lines:["Ushirika Rd","Karen, Nairobi, Kenya"]},
              {icon:"📞",title:"Phone",lines:["+254 707 850 858"]},
              {icon:"✉️",title:"Email",lines:["Consolata@gmail.com"]},
              {icon:"🕐",title:"Office Hours",lines:["Mon–Fri: 8am – 6pm","Saturday: 9am – 4pm"]},
            ].map(item=>(
              <div key={item.title} className="sr flex gap-4">
                <div className="w-11 h-11 bg-brand/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="font-semibold text-ink text-sm mb-1">{item.title}</p>
                  {item.lines.map(l=><p key={l} className="text-gray-500 text-sm">{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3 sr">
            {sent ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-display text-2xl font-bold text-ink mb-3">Message Sent!</h3>
                <p className="text-gray-500 mb-6">We'll get back to you within 24 hours.</p>
                <button onClick={()=>{setSent(false);setForm({name:"",email:"",phone:"",subject:"",message:""});}}
                  className="btn-brand px-7 py-3 rounded-full text-sm">Send Another</button>
              </div>
            ) : (
              <form onSubmit={e=>{e.preventDefault();setSent(true);}}
                className="bg-white rounded-3xl p-8 border border-stone space-y-5">
                <h3 className="font-display text-2xl font-bold text-ink">Send a Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Full Name *</label>
                    <input required value={form.name} onChange={set("name")} placeholder="john doe"
                      className="w-full bg-parchment border border-stone rounded-xl px-4 py-3 text-sm"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email *</label>
                    <input required type="email" value={form.email} onChange={set("email")} placeholder="jane@email.com"
                      className="w-full bg-parchment border border-stone rounded-xl px-4 py-3 text-sm"/>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone</label>
                    <input value={form.phone} onChange={set("phone")} placeholder="0712 345 678"
                      className="w-full bg-parchment border border-stone rounded-xl px-4 py-3 text-sm"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Subject *</label>
                    <select required value={form.subject} onChange={set("subject")}
                      className="w-full bg-parchment border border-stone rounded-xl px-4 py-3 text-sm">
                      <option value="">Select topic...</option>
                      <option>Room Enquiry</option>
                      <option>Booking Support</option>
                      <option>Hostel Tour</option>
                      <option>Maintenance</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={set("message")}
                    placeholder="How can we help?"
                    className="w-full bg-parchment border border-stone rounded-xl px-4 py-3 text-sm resize-none"/>
                </div>
                <button type="submit" className="w-full btn-brand py-4 rounded-xl text-sm font-semibold">
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <div className="h-80 bg-stone relative overflow-hidden">
        <iframe title="Consolata Hostel Location"
          src="https://maps.google.com/maps?q=Ushirika+Road+Karen+Nairobi+Kenya&output=embed"
          className="w-full h-full border-0" allowFullScreen loading="lazy"/>
        <div className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-xl p-4 max-w-xs">
          <p className="font-semibold text-ink text-sm">Consolata Hostel</p>
          <p className="text-gray-500 text-xs mt-0.5">Ushirika Rd, Karen, Nairobi</p>
          <a href="https://maps.google.com/?q=Ushirika+Road+Karen+Nairobi+Kenya" target="_blank" rel="noreferrer"
            className="text-brand text-xs font-semibold hover:underline mt-1.5 block">Get Directions →</a>
        </div>
      </div>
    </main>
  );
}