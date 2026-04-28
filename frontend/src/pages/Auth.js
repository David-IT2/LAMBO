import { useState } from "react";
import { Link } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({name:"",email:"",password:"",confirm:"",phone:""});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = f => e => setForm(p=>({...p,[f]:e.target.value}));

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (mode==="signup" && form.password !== form.confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setError("Demo mode — connect backend to enable login."); }, 1500);
  };

  const inputCls = "w-full bg-parchment border border-stone rounded-xl px-4 py-3.5 text-sm focus:bg-white transition-colors";
  const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85"
          alt="" className="img-cover"/>
        <div className="absolute inset-0" style={{background:"linear-gradient(135deg,rgba(10,10,10,0.7),rgba(26,107,60,0.5))"}}/>
        <div className="relative z-10 flex flex-col p-14">
          <Link to="/" className="flex items-center gap-3 mb-auto">
            <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center">
              <span className="font-display text-white font-black text-base italic">C</span>
            </div>
            <span className="font-display text-white font-bold text-xl">Consolata Hostel</span>
          </Link>
          <div>
            <h2 className="font-display text-5xl font-black text-white leading-tight mb-4">
              Your home.<br/><em className="font-light italic" style={{color:"#a8f0c6"}}>Your future.</em>
            </h2>
            <p className="text-white/55 text-lg">Join 200+ students already living their best student life.</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-parchment flex flex-col justify-center px-6 py-12">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center">
              <span className="font-display text-white font-black text-base italic">C</span>
            </div>
            <span className="font-display text-ink font-bold text-xl">Consolata Hostel</span>
          </Link>

          <h1 className="font-display text-3xl font-bold text-ink mb-1">
            {mode==="login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            {mode==="login" ? "Sign in to manage your booking." : "Get started in minutes."}
          </p>

          {/* Toggle */}
          <div className="flex bg-stone rounded-2xl p-1 mb-8">
            {["login","signup"].map(m=>(
              <button key={m} onClick={()=>{setMode(m);setError("");}}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                  mode===m ? "bg-white text-ink shadow-sm" : "text-gray-500"
                }`}>
                {m==="login"?"Sign In":"Sign Up"}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode==="signup" && (
              <div><label className={labelCls}>Full Name *</label>
                <input required value={form.name} onChange={set("name")} placeholder="Jane Wanjiku" className={inputCls}/></div>
            )}
            <div><label className={labelCls}>Email *</label>
              <input required type="email" value={form.email} onChange={set("email")} placeholder="jane@email.com" className={inputCls}/></div>
            {mode==="signup" && (
              <div><label className={labelCls}>Phone</label>
                <input value={form.phone} onChange={set("phone")} placeholder="0712 345 678" className={inputCls}/></div>
            )}
            <div><label className={labelCls}>Password *</label>
              <input required type="password" value={form.password} onChange={set("password")} placeholder="••••••••" className={inputCls}/></div>
            {mode==="signup" && (
              <div><label className={labelCls}>Confirm Password *</label>
                <input required type="password" value={form.confirm} onChange={set("confirm")} placeholder="••••••••" className={inputCls}/></div>
            )}
            {mode==="login" && (
              <div className="text-right">
                <button type="button" className="text-xs text-brand hover:underline font-semibold">Forgot password?</button>
              </div>
            )}
            <button type="submit" disabled={loading}
              className={`w-full font-semibold py-4 rounded-xl text-sm mt-2 transition-all ${loading?"bg-gray-200 text-gray-400 cursor-not-allowed":"btn-brand"}`}>
              {loading ? "Please wait..." : mode==="login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {mode==="login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={()=>setMode(mode==="login"?"signup":"login")}
              className="text-brand font-semibold hover:underline">
              {mode==="login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
