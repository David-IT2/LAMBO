import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ROOMS } from "../data";

const STEPS = ["Your Details","Room & Dates","Payment"];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [mpesaState, setMpesaState] = useState("idle");
  const [form, setForm] = useState({
    name:"", email:"", phone:"", roomSlug: searchParams.get("room")||"",
    moveIn:"", duration:"3", paymentMethod:"mpesa", mpesaNumber:"", notes:""
  });
  const [errors, setErrors] = useState({});
  const set = f => e => setForm(p=>({...p,[f]:e.target.value}));
  const room = ROOMS.find(r=>r.slug===form.roomSlug);

  const validate = () => {
    const e = {};
    if (step===0) {
      if (!form.name.trim()) e.name="Required";
      if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email="Valid email required";
      if (!form.phone.match(/^(\+?254|0)[17]\d{8}$/)) e.phone="Valid Kenyan phone required";
    }
    if (step===1) {
      if (!form.roomSlug) e.roomSlug="Please select a room";
      if (!form.moveIn) e.moveIn="Required";
    }
    if (step===2 && form.paymentMethod==="mpesa") {
      if (!form.mpesaNumber.match(/^(\+?254|0)[17]\d{8}$/)) e.mpesaNumber="Valid M-Pesa number required";
    }
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const next = () => { if (validate()) setStep(s=>s+1); };
  const simulateMpesa = () => {
    if (!validate()) return;
    setMpesaState("pending");
    setTimeout(()=>{ setMpesaState("success"); setTimeout(()=>setSubmitted(true),1500); },3000);
  };

  const inputCls = (field) => `w-full bg-parchment border rounded-xl px-4 py-3.5 text-sm transition-all ${errors[field]?"border-red-400 bg-red-50":"border-stone"}`;
  const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2";

  if (submitted) return (
    <main className="pt-[72px] min-h-screen bg-parchment flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-12 shadow-xl border border-stone">
        <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🎉</div>
        <h2 className="font-display text-3xl font-bold text-ink mb-3">Booking Confirmed!</h2>
        <p className="text-gray-500 mb-6">Thank you, <strong>{form.name}</strong>. We'll be in touch within 24 hours to finalise your move-in.</p>
        <div className="bg-parchment rounded-2xl p-5 text-left mb-6 space-y-2 text-sm">
          <p><span className="font-semibold text-ink">Room:</span> <span className="text-gray-500">{room?.type}</span></p>
          <p><span className="font-semibold text-ink">Move-in:</span> <span className="text-gray-500">{form.moveIn}</span></p>
          <p><span className="font-semibold text-ink">Duration:</span> <span className="text-gray-500">{form.duration} months</span></p>
          <p><span className="font-semibold text-ink">Total:</span> <span className="text-brand font-bold">KSh {((room?.price||0)*parseInt(form.duration)).toLocaleString()}</span></p>
        </div>
        <Link to="/" className="btn-brand inline-block px-8 py-3.5 rounded-full text-sm font-semibold">Back to Home</Link>
      </div>
    </main>
  );

  return (
    <main className="pt-[72px] min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-ink py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="sec-label mb-3" style={{color:"#6ee6a0"}}>Accommodation</p>
          <h1 className="font-display text-white font-black text-5xl leading-tight">Book Your Room.</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Step indicator */}
        <div className="flex items-center mb-10">
          {STEPS.map((s,i)=>(
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i<step?"bg-brand text-white":i===step?"bg-ink text-white ring-4 ring-ink/20":"bg-stone text-gray-400"
                }`}>
                  {i<step ? "✓" : i+1}
                </div>
                <span className={`text-xs mt-1.5 font-semibold hidden sm:block ${i<=step?"text-ink":"text-gray-400"}`}>{s}</span>
              </div>
              {i<STEPS.length-1 && (
                <div className={`flex-1 h-0.5 mx-3 transition-all ${i<step?"bg-brand":"bg-stone"}`}/>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-stone p-8 md:p-10">
          {/* Step 0 */}
          {step===0 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl font-bold text-ink mb-6">Your Details</h2>
              <div><label className={labelCls}>Full Name *</label>
                <input value={form.name} onChange={set("name")} placeholder="Jane Wanjiku" className={inputCls("name")}/>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}</div>
              <div><label className={labelCls}>Email *</label>
                <input type="email" value={form.email} onChange={set("email")} placeholder="jane@email.com" className={inputCls("email")}/>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}</div>
              <div><label className={labelCls}>Phone *</label>
                <input value={form.phone} onChange={set("phone")} placeholder="0712 345 678" className={inputCls("phone")}/>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}</div>
              <div><label className={labelCls}>Notes (optional)</label>
                <textarea value={form.notes} onChange={set("notes")} rows={3} placeholder="Any special requests..."
                  className="w-full bg-parchment border border-stone rounded-xl px-4 py-3 text-sm resize-none"/></div>
            </div>
          )}

          {/* Step 1 */}
          {step===1 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl font-bold text-ink mb-6">Room & Dates</h2>
              <div>
                <label className={labelCls}>Room Type *</label>
                <select value={form.roomSlug} onChange={set("roomSlug")} className={inputCls("roomSlug")}>
                  <option value="">-- Choose a room --</option>
                  {ROOMS.map(r=>(
                    <option key={r.id} value={r.slug} disabled={!r.available}>
                      {r.type} — KSh {r.price.toLocaleString()}/mo {!r.available?"(Fully Booked)":""}
                    </option>
                  ))}
                </select>
                {errors.roomSlug && <p className="text-red-500 text-xs mt-1">{errors.roomSlug}</p>}
              </div>

              {room && (
                <div className="flex gap-4 bg-parchment rounded-2xl p-4 items-center">
                  <img src={room.image} alt={room.type} className="w-16 h-16 rounded-xl object-cover flex-shrink-0"/>
                  <div>
                    <p className="font-semibold text-ink">{room.type}</p>
                    <p className="text-brand text-sm font-semibold">KSh {room.price.toLocaleString()}/mo</p>
                    <p className="text-gray-400 text-xs">{room.size} · {room.occupancy===1?"Single":"Shared"}</p>
                  </div>
                </div>
              )}

              <div>
                <label className={labelCls}>Move-in Date *</label>
                <input type="date" value={form.moveIn} onChange={set("moveIn")}
                  min={new Date().toISOString().split("T")[0]} className={inputCls("moveIn")}/>
                {errors.moveIn && <p className="text-red-500 text-xs mt-1">{errors.moveIn}</p>}
              </div>

              <div>
                <label className={labelCls}>Duration</label>
                <select value={form.duration} onChange={set("duration")} className={inputCls("")}>
                  {["1","2","3","6","12"].map(m=>(
                    <option key={m} value={m}>{m} month{m!=="1"?"s":""}</option>
                  ))}
                </select>
              </div>

              {room && (
                <div className="bg-ink rounded-2xl p-5">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/50">{room.type} × {form.duration} months</span>
                    <span className="text-white">KSh {(room.price*parseInt(form.duration)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-white/50">Security deposit (1 month)</span>
                    <span className="text-white">KSh {room.price.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between font-bold">
                    <span className="text-white">Total Due</span>
                    <span className="text-brand-light text-lg">KSh {(room.price*(parseInt(form.duration)+1)).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2 */}
          {step===2 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl font-bold text-ink mb-6">Payment</h2>
              <div className="grid grid-cols-2 gap-3">
                {[{k:"mpesa",label:"M-Pesa",emoji:"📱",sub:"Mobile money"},{k:"bank",label:"Bank Transfer",emoji:"🏦",sub:"Direct deposit"}].map(m=>(
                  <button key={m.k} onClick={()=>setForm(f=>({...f,paymentMethod:m.k}))}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${form.paymentMethod===m.k?"border-brand bg-brand/5":"border-stone hover:border-gray-300"}`}>
                    <p className="text-2xl mb-2">{m.emoji}</p>
                    <p className="font-semibold text-ink text-sm">{m.label}</p>
                    <p className="text-xs text-gray-400">{m.sub}</p>
                  </button>
                ))}
              </div>

              {form.paymentMethod==="mpesa" && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white font-black text-sm">M</div>
                    <div>
                      <p className="font-bold text-green-800 text-sm">M-Pesa STK Push</p>
                      <p className="text-green-600 text-xs">A prompt will be sent to your phone</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className={labelCls}>M-Pesa Number *</label>
                    <input value={form.mpesaNumber} onChange={set("mpesaNumber")} placeholder="0712 345 678"
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-sm ${errors.mpesaNumber?"border-red-400":"border-green-200"}`}/>
                    {errors.mpesaNumber && <p className="text-red-500 text-xs mt-1">{errors.mpesaNumber}</p>}
                  </div>
                  <ol className="text-xs text-green-700 space-y-1 list-decimal list-inside">
                    <li>Enter your M-Pesa registered number</li>
                    <li>Click "Send Payment Request"</li>
                    <li>Check your phone and enter PIN</li>
                    <li>Booking confirmed instantly ✓</li>
                  </ol>
                  {mpesaState==="pending" && (
                    <div className="mt-4 bg-white rounded-xl p-4 flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"/>
                      <p className="text-sm text-gray-600">Waiting for confirmation...</p>
                    </div>
                  )}
                  {mpesaState==="success" && (
                    <div className="mt-4 bg-white rounded-xl p-4 flex items-center gap-3">
                      <span className="text-2xl">✅</span>
                      <p className="text-sm text-brand font-semibold">Payment received! Confirming booking...</p>
                    </div>
                  )}
                </div>
              )}

              {form.paymentMethod==="bank" && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-2 text-sm">
                  <p className="font-bold text-ink mb-3">Bank Transfer Details</p>
                  {[["Bank","Equity Bank Kenya"],["Account Name","Consolata Hostel Ltd"],["Account No.","0123456789012"],["Branch","Kilimani, Nairobi"],["Reference",form.name||"Your Full Name"]].map(([k,v])=>(
                    <div key={k} className="flex justify-between">
                      <span className="text-gray-500">{k}</span>
                      <span className="font-semibold text-ink">{v}</span>
                    </div>
                  ))}
                  <p className="text-xs text-gray-400 pt-2">Email deposit receipt to info@consolatahostel.co.ke</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step>0 && (
              <button onClick={()=>setStep(s=>s-1)}
                className="flex-1 border-2 border-stone text-gray-600 font-semibold py-4 rounded-xl hover:border-gray-300 transition-colors text-sm">
                ← Back
              </button>
            )}
            {step<2 ? (
              <button onClick={next} className="flex-1 btn-brand py-4 rounded-xl text-sm font-semibold">Continue →</button>
            ) : form.paymentMethod==="mpesa" ? (
              <button onClick={simulateMpesa} disabled={mpesaState!=="idle"}
                className={`flex-1 font-semibold py-4 rounded-xl text-sm transition-all ${mpesaState!=="idle"?"bg-gray-200 text-gray-400 cursor-not-allowed":"bg-green-600 text-white hover:bg-green-700"}`}>
                {mpesaState==="idle"?"📱 Send Payment Request":"Processing..."}
              </button>
            ) : (
              <button onClick={()=>{if(validate())setSubmitted(true);}}
                className="flex-1 btn-brand py-4 rounded-xl text-sm font-semibold">Confirm Booking</button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400">
          <span>🔒 Secure</span><span>✓ No hidden fees</span><span>📞 24/7 support</span>
        </div>
      </div>
    </main>
  );
}
