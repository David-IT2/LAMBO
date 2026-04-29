import { useState } from "react";
import { Link } from "react-router-dom";
import { ROOMS } from "../data";

// ── Dummy data ────────────────────────────────────────────────────────────────
const DUMMY_BOOKINGS = [
  { id:1, name:"Amina Odhiambo", email:"amina@gmail.com", phone:"0712345678", room:"Single Ensuite", moveIn:"2025-09-01", status:"confirmed", amount:30000, duration:3 },
  { id:2, name:"Brian Kamau",    email:"brian@gmail.com", phone:"0723456789", room:"Shared Single",  moveIn:"2025-09-05", status:"pending",   amount:6500,  duration:6 },
  { id:3, name:"Fatuma Hassan",  email:"fatuma@gmail.com",phone:"0734567890", room:"Bedsitter Studio",moveIn:"2025-08-15",status:"confirmed", amount:30000, duration:3 },
  { id:4, name:"Kevin Mwangi",   email:"kevin@gmail.com", phone:"0745678901", room:"Shared Single",  moveIn:"2025-09-10", status:"confirmed", amount:6500,  duration:12},
  { id:5, name:"Linda Achieng",  email:"linda@gmail.com", phone:"0756789012", room:"Single Ensuite", moveIn:"2025-10-01", status:"waitlist",  amount:30000, duration:3 },
];

const DUMMY_MESSAGES = [
  { id:1, name:"James Njoroge",  email:"james@gmail.com",  subject:"Room Enquiry",    message:"Hi, I would like to know more about the single ensuite room. Is it still available?", date:"2025-04-20", read:false },
  { id:2, name:"Aisha Mwenda",   email:"aisha@gmail.com",  subject:"Hostel Tour",     message:"Can I schedule a tour this weekend? I'm interested in the bedsitter.", date:"2025-04-21", read:false },
  { id:3, name:"Peter Ochieng",  email:"peter@gmail.com",  subject:"Booking Support", message:"I made a booking but haven't received confirmation. Please help.", date:"2025-04-22", read:true  },
];

const STATUS_STYLES = {
  confirmed: "bg-green-100 text-green-700",
  pending:   "bg-amber-100 text-amber-700",
  waitlist:  "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-600",
};

// ── Admin Login Screen ────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [form, setForm]     = useState({ email:"", password:"" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simple hardcoded check — replace with real API call when ready
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
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center">
              <span className="font-display text-white font-black text-xl italic">C</span>
            </div>
          </Link>
          <h1 className="font-display text-white text-4xl font-black">Admin Portal</h1>
          <p className="text-white/40 text-sm mt-2">Consolata Hostel Management</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Email</label>
              <input required type="email" value={form.email} onChange={set("email")}
                placeholder="admin@consolatahostel.co.ke"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:border-brand focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Password</label>
              <input required type="password" value={form.password} onChange={set("password")}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:border-brand focus:outline-none transition-colors" />
            </div>
            <button type="submit" disabled={loading}
              className={`w-full font-semibold py-4 rounded-xl text-sm mt-2 transition-all ${
                loading ? "bg-white/10 text-white/30 cursor-not-allowed" : "btn-brand"
              }`}>
              {loading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <Link to="/" className="text-white/30 text-xs hover:text-white/60 transition-colors">
              ← Back to website
            </Link>
          </div>
        </div>

        {/* Demo hint */}
        <p className="text-center text-white/20 text-xs mt-6">
          Demo: admin@consolatahostel.co.ke / admin1234
        </p>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [authed, setAuthed]       = useState(false);
  const [tab, setTab]             = useState("overview");
  const [bookings, setBookings]   = useState(DUMMY_BOOKINGS);
  const [messages, setMessages]   = useState(DUMMY_MESSAGES);
  const [rooms, setRooms]         = useState(ROOMS);
  const [search, setSearch]       = useState("");

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const updateBookingStatus = (id, status) =>
    setBookings(b => b.map(bk => bk.id === id ? { ...bk, status } : bk));

  const toggleRoomAvailability = (id) =>
    setRooms(r => r.map(room => room.id === id ? { ...room, available: !room.available } : room));

  const markMessageRead = (id) =>
    setMessages(m => m.map(msg => msg.id === id ? { ...msg, read: true } : msg));

  const filteredBookings = bookings.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.room.toLowerCase().includes(search.toLowerCase()) ||
    b.status.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label:"Total Bookings",  value: bookings.length,                                          icon:"📋", bg:"bg-blue-50",   text:"text-blue-700"   },
    { label:"Confirmed",       value: bookings.filter(b=>b.status==="confirmed").length,         icon:"✅", bg:"bg-green-50",  text:"text-green-700"  },
    { label:"Pending Review",  value: bookings.filter(b=>b.status==="pending").length,           icon:"⏳", bg:"bg-amber-50",  text:"text-amber-700"  },
    { label:"Monthly Revenue", value:`KSh ${bookings.filter(b=>b.status==="confirmed").reduce((s,b)=>s+b.amount,0).toLocaleString()}`, icon:"💰", bg:"bg-purple-50", text:"text-purple-700" },
    { label:"Total Rooms",     value: rooms.length,                                              icon:"🏠", bg:"bg-indigo-50", text:"text-indigo-700" },
    { label:"Unread Messages", value: messages.filter(m=>!m.read).length,                        icon:"✉️", bg:"bg-rose-50",   text:"text-rose-700"   },
  ];

  const TABS = [
    { key:"overview",  label:"Overview",  icon:"📊" },
    { key:"bookings",  label:"Bookings",  icon:"📋" },
    { key:"rooms",     label:"Rooms",     icon:"🏠" },
    { key:"messages",  label:"Messages",  icon:"✉️", badge: messages.filter(m=>!m.read).length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Top bar ── */}
      <header className="bg-ink text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
            <span className="font-display text-white font-black text-base italic">C</span>
          </div>
          <div>
            <p className="font-display font-bold text-white text-lg leading-none">Consolata</p>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-white/40 text-xs hover:text-white transition-colors hidden sm:block">
            ← View Website
          </Link>
          <div className="w-9 h-9 bg-brand rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
          <button onClick={() => setAuthed(false)}
            className="text-white/40 text-xs hover:text-white/70 transition-colors hidden sm:block">
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Tab navigation ── */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                tab === t.key ? "bg-ink text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}>
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

        {/* ══ OVERVIEW ══════════════════════════════════════════════════════ */}
        {tab === "overview" && (
          <div>
            <h2 className="font-display text-2xl font-bold text-ink mb-6">Good day, Admin 👋</h2>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {stats.map(s => (
                <div key={s.label} className={`${s.bg} rounded-2xl p-5`}>
                  <p className="text-2xl mb-2">{s.icon}</p>
                  <p className={`text-2xl font-black ${s.text}`}>{s.value}</p>
                  <p className="text-gray-500 text-xs mt-1 font-medium">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Recent bookings */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-ink">Recent Bookings</h3>
                <button onClick={() => setTab("bookings")} className="text-brand text-xs font-semibold hover:underline">View all →</button>
              </div>
              <div className="divide-y divide-gray-50">
                {bookings.slice(0,3).map(b => (
                  <div key={b.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-ink text-sm">{b.name}</p>
                      <p className="text-gray-400 text-xs">{b.room} · Move in: {b.moveIn}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-brand font-semibold text-sm hidden sm:block">KSh {b.amount.toLocaleString()}</p>
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
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-ink">Unread Messages</h3>
                  <button onClick={() => setTab("messages")} className="text-brand text-xs font-semibold hover:underline">View all →</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {messages.filter(m=>!m.read).map(m => (
                    <div key={m.id} className="px-6 py-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-ink text-sm">{m.name} <span className="text-gray-400 font-normal">· {m.subject}</span></p>
                        <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                      </div>
                      <p className="text-gray-500 text-xs truncate">{m.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ BOOKINGS ══════════════════════════════════════════════════════ */}
        {tab === "bookings" && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-ink text-lg">All Bookings</h2>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search name, room, status..."
                className="border border-gray-200 rounded-xl px-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:border-brand" />
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden divide-y divide-gray-100">
              {filteredBookings.map(b => (
                <div key={b.id} className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-ink">{b.name}</p>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                  </div>
                  <p className="text-gray-500 text-xs mb-1">{b.room} · Move in: {b.moveIn}</p>
                  <p className="text-gray-500 text-xs mb-1">{b.email} · {b.phone}</p>
                  <p className="text-brand font-semibold text-sm mb-3">KSh {b.amount.toLocaleString()} ({b.duration} months)</p>
                  <select value={b.status} onChange={e => updateBookingStatus(b.id, e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs w-full">
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
                  <tr className="border-b border-gray-100 text-left bg-gray-50">
                    {["#","Name & Contact","Room","Move-in","Duration","Amount","Status","Action"].map(h => (
                      <th key={h} className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredBookings.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-gray-400 font-mono text-xs">#{b.id}</td>
                      <td className="py-4 px-4">
                        <p className="font-semibold text-ink">{b.name}</p>
                        <p className="text-gray-400 text-xs">{b.email}</p>
                        <p className="text-gray-400 text-xs">{b.phone}</p>
                      </td>
                      <td className="py-4 px-4 text-gray-600 font-medium">{b.room}</td>
                      <td className="py-4 px-4 text-gray-600">{b.moveIn}</td>
                      <td className="py-4 px-4 text-gray-600">{b.duration} mo</td>
                      <td className="py-4 px-4 font-semibold text-brand">KSh {b.amount.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${STATUS_STYLES[b.status]}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <select value={b.status} onChange={e => updateBookingStatus(b.id, e.target.value)}
                          className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-ink focus:outline-none focus:border-brand">
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
                <p className="text-center text-gray-400 py-12">No bookings found.</p>
              )}
            </div>
          </div>
        )}

        {/* ══ ROOMS ══════════════════════════════════════════════════════════ */}
        {tab === "rooms" && (
          <div>
            <h2 className="font-semibold text-ink text-lg mb-6">Room Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {rooms.map(r => (
                <div key={r.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="relative h-44 overflow-hidden">
                    <img src={r.image} alt={r.type} className="img-cover" />
                    <span className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
                      r.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}>
                      {r.available ? "Available" : "Booked"}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-ink text-base mb-1">{r.type}</h3>
                    <p className="text-brand font-semibold text-sm mb-1">KSh {r.price.toLocaleString()}/mo</p>
                    <p className="text-gray-400 text-xs mb-4">{r.size} · {r.occupancy === 1 ? "Single" : "Shared"}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 border border-gray-200 text-gray-600 text-xs font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                        Edit Details
                      </button>
                      <button onClick={() => toggleRoomAvailability(r.id)}
                        className={`flex-1 text-xs font-semibold py-2.5 rounded-xl transition-colors ${
                          r.available
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}>
                        Mark {r.available ? "Booked" : "Available"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ MESSAGES ══════════════════════════════════════════════════════ */}
        {tab === "messages" && (
          <div>
            <h2 className="font-semibold text-ink text-lg mb-6">
              Contact Messages
              {messages.filter(m=>!m.read).length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {messages.filter(m=>!m.read).length} new
                </span>
              )}
            </h2>
            <div className="space-y-4">
              {messages.map(m => (
                <div key={m.id}
                  className={`bg-white rounded-2xl border p-6 transition-all ${
                    m.read ? "border-gray-100" : "border-brand/30 bg-brand/[0.02]"
                  }`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-parchment flex items-center justify-center font-bold text-ink text-sm flex-shrink-0">
                        {m.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-ink text-sm">{m.name}</p>
                        <p className="text-gray-400 text-xs">{m.email} · {m.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!m.read && <span className="w-2 h-2 bg-red-500 rounded-full" />}
                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">{m.subject}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{m.message}</p>
                  <div className="flex gap-2">
                    {!m.read && (
                      <button onClick={() => markMessageRead(m.id)}
                        className="text-xs font-semibold text-brand hover:underline">
                        Mark as Read
                      </button>
                    )}
                    <a href={`mailto:${m.email}`}
                      className="text-xs font-semibold bg-ink text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                      Reply via Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}