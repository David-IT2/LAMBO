import { useState } from "react";
import { Link } from "react-router-dom";
import { ROOMS } from "../data";

const DUMMY_BOOKINGS = [
  { id:1, name:"Amina Odhiambo", email:"amina@gmail.com", phone:"0712345678", room:"Single Ensuite",  moveIn:"2025-09-01", status:"confirmed", amount:30000, duration:3  },
  { id:2, name:"Brian Kamau",    email:"brian@gmail.com", phone:"0723456789", room:"Shared Single",   moveIn:"2025-09-05", status:"pending",   amount:6500,  duration:6  },
  { id:3, name:"Fatuma Hassan",  email:"fatuma@gmail.com",phone:"0734567890", room:"Bedsitter Studio",moveIn:"2025-08-15", status:"confirmed", amount:30000, duration:3  },
  { id:4, name:"Kevin Mwangi",   email:"kevin@gmail.com", phone:"0745678901", room:"Shared Single",   moveIn:"2025-09-10", status:"confirmed", amount:6500,  duration:12 },
  { id:5, name:"Linda Achieng",  email:"linda@gmail.com", phone:"0756789012", room:"Single Ensuite",  moveIn:"2025-10-01", status:"waitlist",  amount:30000, duration:3  },
];

const DUMMY_MESSAGES = [
  { id:1, name:"James Njoroge", email:"james@gmail.com", subject:"Room Enquiry",    message:"Hi, I would like to know more about the single ensuite room. Is it still available?", date:"2025-04-20", read:false },
  { id:2, name:"Aisha Mwenda",  email:"aisha@gmail.com", subject:"Hostel Tour",     message:"Can I schedule a tour this weekend? I'm interested in the bedsitter.", date:"2025-04-21", read:false },
  { id:3, name:"Peter Ochieng", email:"peter@gmail.com", subject:"Booking Support", message:"I made a booking but haven't received confirmation. Please help.", date:"2025-04-22", read:true  },
];

const STATUS_STYLES = {
  confirmed: "bg-brand/15 text-brand",
  pending:   "bg-amber-400/15 text-amber-600",
  waitlist:  "bg-white/10 text-white/50",
  cancelled: "bg-red-400/15 text-red-400",
};

// ── Admin Login ───────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [form, setForm]       = useState({ email:"", password:"" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (form.email === "admin@consolatahostel.co.ke" && form.password === "admin1234") {
        onLogin();
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-ink flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85"
          alt="" className="img-cover" />
        <div className="absolute inset-0" style={{background:"linear-gradient(135deg,rgba(10,10,10,0.85),rgba(26,107,60,0.6))"}} />
        <div className="relative z-10 flex flex-col justify-between p-14">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center">
              <span className="font-display text-white font-black text-lg italic">C</span>
            </div>
            <div>
              <p className="font-display text-white font-bold text-xl leading-none">Consolata</p>
              <p className="text-white/40 text-[10px] tracking-[.18em] uppercase">Hostel</p>
            </div>
          </Link>
          <div>
            <p className="sec-label mb-4" style={{color:"#6ee6a0"}}>Management Portal</p>
            <h2 className="font-display text-5xl font-black text-white leading-tight mb-4">
              Admin<br/><em className="font-light italic" style={{color:"#a8f0c6"}}>Dashboard.</em>
            </h2>
            <p className="text-white/45 text-lg">Manage bookings, rooms, and messages all in one place.</p>
          </div>
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center">
              <span className="font-display text-white font-black text-lg italic">C</span>
            </div>
            <div>
              <p className="font-display text-white font-bold text-xl leading-none">Consolata</p>
              <p className="text-white/40 text-[10px] tracking-[.18em] uppercase">Hostel</p>
            </div>
          </Link>

          <p className="sec-label mb-3" style={{color:"#6ee6a0"}}>Restricted Access</p>
          <h1 className="font-display text-4xl font-black text-white mb-2">
            Sign In
          </h1>
          <p className="text-white/40 text-sm mb-10">Admin access only. Unauthorised entry is prohibited.</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">Email Address</label>
              <input required type="email" value={form.email} onChange={set("email")}
                placeholder="admin@consolatahostel.co.ke"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm placeholder-white/15 transition-all"
                style={{outline:"none"}}
                onFocus={e => e.target.style.borderColor="#1a6b3c"}
                onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">Password</label>
              <input required type="password" value={form.password} onChange={set("password")}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm placeholder-white/15 transition-all"
                style={{outline:"none"}}
                onFocus={e => e.target.style.borderColor="#1a6b3c"}
                onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"} />
            </div>
            <button type="submit" disabled={loading}
              className={`w-full font-semibold py-4 rounded-xl text-sm mt-2 transition-all ${
                loading ? "bg-white/5 text-white/20 cursor-not-allowed" : "btn-brand"
              }`}>
              {loading ? "Signing in..." : "Access Dashboard →"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <Link to="/" className="text-white/25 text-xs hover:text-white/50 transition-colors">
              ← Back to website
            </Link>
            <p className="text-white/15 text-xs">Consolata Hostel © {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [authed, setAuthed]     = useState(false);
  const [tab, setTab]           = useState("overview");
  const [bookings, setBookings] = useState(DUMMY_BOOKINGS);
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [rooms, setRooms]       = useState(ROOMS);
  const [search, setSearch]     = useState("");

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const updateStatus   = (id, status) => setBookings(b => b.map(bk => bk.id===id ? {...bk,status} : bk));
  const toggleRoom     = (id) => setRooms(r => r.map(rm => rm.id===id ? {...rm,available:!rm.available} : rm));
  const markRead       = (id) => setMessages(m => m.map(mg => mg.id===id ? {...mg,read:true} : mg));

  const filteredBookings = bookings.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.room.toLowerCase().includes(search.toLowerCase()) ||
    b.status.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label:"Total Bookings",   value: bookings.length,                                                                                    icon:"📋" },
    { label:"Confirmed",        value: bookings.filter(b=>b.status==="confirmed").length,                                                  icon:"✅" },
    { label:"Pending Review",   value: bookings.filter(b=>b.status==="pending").length,                                                    icon:"⏳" },
    { label:"Monthly Revenue",  value:`KSh ${bookings.filter(b=>b.status==="confirmed").reduce((s,b)=>s+b.amount,0).toLocaleString()}`,    icon:"💰" },
    { label:"Total Rooms",      value: rooms.length,                                                                                       icon:"🏠" },
    { label:"Unread Messages",  value: messages.filter(m=>!m.read).length,                                                                 icon:"✉️" },
  ];

  const TABS = [
    { key:"overview",  label:"Overview",  icon:"📊" },
    { key:"bookings",  label:"Bookings",  icon:"📋" },
    { key:"rooms",     label:"Rooms",     icon:"🏠" },
    { key:"messages",  label:"Messages",  icon:"✉️", badge: messages.filter(m=>!m.read).length },
  ];

  return (
    <div className="min-h-screen" style={{background:"#0f0f0f"}}>

      {/* ── Top bar ── */}
      <header className="border-b border-white/8 px-6 py-4 flex items-center justify-between sticky top-0 z-40"
        style={{background:"rgba(10,10,10,0.97)", backdropFilter:"blur(20px)", borderColor:"rgba(255,255,255,0.08)"}}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
            <span className="font-display text-white font-black text-base italic">C</span>
          </div>
          <div>
            <p className="font-display font-bold text-white text-lg leading-none">Consolata</p>
            <p className="text-white/30 text-[10px] uppercase tracking-widest font-medium">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/" className="text-white/30 text-xs hover:text-white/60 transition-colors hidden sm:block font-medium">
            ← View Website
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center text-white font-bold text-xs">A</div>
            <span className="text-white/40 text-xs hidden sm:block">Admin</span>
          </div>
          <button onClick={() => setAuthed(false)}
            className="text-white/25 text-xs hover:text-white/50 transition-colors hidden sm:block font-medium">
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Page title ── */}
        <div className="mb-8">
          <p className="sec-label mb-2" style={{color:"#6ee6a0"}}>Management</p>
          <h1 className="font-display text-4xl font-black text-white">
            {tab === "overview"  ? "Overview"         :
             tab === "bookings"  ? "Bookings"         :
             tab === "rooms"     ? "Room Management"  : "Messages"}
          </h1>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                tab === t.key
                  ? "bg-brand text-white"
                  : "text-white/50 hover:text-white border border-white/10 hover:border-white/20"
              }`}
              style={tab !== t.key ? {background:"rgba(255,255,255,0.04)"} : {}}>
              <span>{t.icon}</span>
              <span>{t.label}</span>
              {t.badge > 0 && (
                <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ══ OVERVIEW ════════════════════════════════════════════════════ */}
        {tab === "overview" && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {stats.map((s,i) => (
                <div key={s.label}
                  className="rounded-2xl p-6 border"
                  style={{background:"rgba(255,255,255,0.04)", borderColor:"rgba(255,255,255,0.08)"}}>
                  <p className="text-2xl mb-3">{s.icon}</p>
                  <p className="font-display text-3xl font-black text-white mb-1">{s.value}</p>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Recent bookings */}
            <div className="rounded-2xl border overflow-hidden mb-5"
              style={{background:"rgba(255,255,255,0.03)", borderColor:"rgba(255,255,255,0.08)"}}>
              <div className="flex items-center justify-between px-6 py-4 border-b"
                style={{borderColor:"rgba(255,255,255,0.08)"}}>
                <h3 className="font-semibold text-white">Recent Bookings</h3>
                <button onClick={() => setTab("bookings")}
                  className="text-brand text-xs font-semibold hover:underline">View all →</button>
              </div>
              <div className="divide-y" style={{borderColor:"rgba(255,255,255,0.06)"}}>
                {bookings.slice(0,4).map(b => (
                  <div key={b.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-sm flex-shrink-0">
                        {b.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{b.name}</p>
                        <p className="text-white/35 text-xs">{b.room} · {b.moveIn}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <p className="text-brand font-semibold text-sm hidden sm:block">
                        KSh {b.amount.toLocaleString()}
                      </p>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${STATUS_STYLES[b.status]}`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unread messages */}
            {messages.filter(m=>!m.read).length > 0 && (
              <div className="rounded-2xl border overflow-hidden"
                style={{background:"rgba(255,255,255,0.03)", borderColor:"rgba(255,255,255,0.08)"}}>
                <div className="flex items-center justify-between px-6 py-4 border-b"
                  style={{borderColor:"rgba(255,255,255,0.08)"}}>
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    Unread Messages
                    <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {messages.filter(m=>!m.read).length}
                    </span>
                  </h3>
                  <button onClick={() => setTab("messages")}
                    className="text-brand text-xs font-semibold hover:underline">View all →</button>
                </div>
                {messages.filter(m=>!m.read).map(m => (
                  <div key={m.id} className="px-6 py-4 border-b last:border-0"
                    style={{borderColor:"rgba(255,255,255,0.06)"}}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-white text-sm">
                        {m.name} <span className="text-white/35 font-normal">· {m.subject}</span>
                      </p>
                      <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                    </div>
                    <p className="text-white/35 text-xs truncate">{m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ BOOKINGS ════════════════════════════════════════════════════ */}
        {tab === "bookings" && (
          <div className="rounded-2xl border overflow-hidden"
            style={{background:"rgba(255,255,255,0.03)", borderColor:"rgba(255,255,255,0.08)"}}>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between px-6 py-4 border-b"
              style={{borderColor:"rgba(255,255,255,0.08)"}}>
              <p className="text-white/50 text-sm font-medium">{filteredBookings.length} bookings</p>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search name, room, status..."
                className="w-full sm:w-64 text-sm px-4 py-2.5 rounded-xl text-white placeholder-white/20 border border-white/10 focus:border-brand"
                style={{background:"rgba(255,255,255,0.05)", outline:"none"}} />
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden divide-y" style={{borderColor:"rgba(255,255,255,0.06)"}}>
              {filteredBookings.map(b => (
                <div key={b.id} className="p-5">
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold text-white">{b.name}</p>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                  </div>
                  <p className="text-white/35 text-xs mb-1">{b.room} · Move in: {b.moveIn}</p>
                  <p className="text-white/35 text-xs mb-1">{b.email} · {b.phone}</p>
                  <p className="text-brand font-semibold text-sm mb-3">KSh {b.amount.toLocaleString()} ({b.duration} months)</p>
                  <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg text-white border border-white/10"
                    style={{background:"rgba(255,255,255,0.08)", outline:"none"}}>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="waitlist">Waitlist</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{borderColor:"rgba(255,255,255,0.08)"}}>
                    {["#","Name & Contact","Room","Move-in","Duration","Amount","Status","Action"].map(h => (
                      <th key={h} className="py-3.5 px-4 text-left text-xs font-semibold uppercase tracking-wider text-white/25">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map(b => (
                    <tr key={b.id} className="border-b transition-colors"
                      style={{borderColor:"rgba(255,255,255,0.05)"}}
                      onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.03)"}
                      onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                      <td className="py-4 px-4 text-white/20 font-mono text-xs">#{b.id}</td>
                      <td className="py-4 px-4">
                        <p className="font-semibold text-white">{b.name}</p>
                        <p className="text-white/30 text-xs">{b.email}</p>
                        <p className="text-white/30 text-xs">{b.phone}</p>
                      </td>
                      <td className="py-4 px-4 text-white/60 font-medium">{b.room}</td>
                      <td className="py-4 px-4 text-white/60">{b.moveIn}</td>
                      <td className="py-4 px-4 text-white/60">{b.duration} mo</td>
                      <td className="py-4 px-4 font-semibold text-brand">KSh {b.amount.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xs px-3 py-1.5 rounded-full font-semibold capitalize ${STATUS_STYLES[b.status]}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                          className="text-xs px-3 py-2 rounded-lg text-white border border-white/10"
                          style={{background:"rgba(255,255,255,0.08)", outline:"none"}}>
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="waitlist">Waitlist</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredBookings.length === 0 && (
                <p className="text-center text-white/20 py-16 text-sm">No bookings found.</p>
              )}
            </div>
          </div>
        )}

        {/* ══ ROOMS ═══════════════════════════════════════════════════════ */}
        {tab === "rooms" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {rooms.map(r => (
              <div key={r.id} className="rounded-2xl border overflow-hidden"
                style={{background:"rgba(255,255,255,0.03)", borderColor:"rgba(255,255,255,0.08)"}}>
                <div className="relative h-48 overflow-hidden">
                  <img src={r.image} alt={r.type} className="img-cover" />
                  <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(0,0,0,0.6), transparent)"}} />
                  <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1.5 rounded-full ${
                    r.available ? "bg-brand text-white" : "bg-red-500 text-white"
                  }`}>
                    {r.available ? "Available" : "Booked"}
                  </span>
                  <p className="absolute bottom-3 left-4 font-display font-bold text-white text-xl">{r.type}</p>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-brand font-semibold">KSh {r.price.toLocaleString()}/mo</p>
                    <p className="text-white/30 text-xs">{r.size} · {r.occupancy===1?"Single":"Shared"}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 text-xs font-semibold py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all">
                      Edit Details
                    </button>
                    <button onClick={() => toggleRoom(r.id)}
                      className={`flex-1 text-xs font-semibold py-2.5 rounded-xl transition-all ${
                        r.available
                          ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                          : "bg-brand/10 text-brand hover:bg-brand/20 border border-brand/20"
                      }`}>
                      Mark {r.available ? "Booked" : "Available"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══ MESSAGES ════════════════════════════════════════════════════ */}
        {tab === "messages" && (
          <div className="space-y-4">
            {messages.map(m => (
              <div key={m.id} className="rounded-2xl border p-6 transition-all"
                style={{
                  background: m.read ? "rgba(255,255,255,0.02)" : "rgba(26,107,60,0.06)",
                  borderColor: m.read ? "rgba(255,255,255,0.07)" : "rgba(26,107,60,0.25)"
                }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-sm flex-shrink-0">
                      {m.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{m.name}</p>
                      <p className="text-white/30 text-xs">{m.email} · {m.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!m.read && <span className="w-2 h-2 bg-brand rounded-full" />}
                    <span className="text-xs px-3 py-1 rounded-full font-medium text-white/50 border border-white/10"
                      style={{background:"rgba(255,255,255,0.05)"}}>
                      {m.subject}
                    </span>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-4 pl-13">{m.message}</p>
                <div className="flex gap-3 pl-13">
                  {!m.read && (
                    <button onClick={() => markRead(m.id)}
                      className="text-xs font-semibold text-brand hover:underline transition-colors">
                      Mark as Read
                    </button>
                  )}
                  <a href={`mailto:${m.email}`}
                    className="text-xs font-semibold px-4 py-2 rounded-lg text-white transition-all"
                    style={{background:"rgba(255,255,255,0.08)"}}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.14)"}
                    onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.08)"}>
                    Reply via Email →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}