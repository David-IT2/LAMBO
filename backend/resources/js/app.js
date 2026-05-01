import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();

  // Hide navbar and footer on admin page
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/rooms"       element={<Rooms />} />
        <Route path="/rooms/:slug" element={<RoomDetails />} />
        <Route path="/booking"     element={<Booking />} />
        <Route path="/about"       element={<About />} />
        <Route path="/contact"     element={<Contact />} />
        <Route path="/admin"       element={<AdminDashboard />} />
        <Route path="*" element={
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20">
            <p className="font-display text-8xl font-black text-gray-100 mb-4">404</p>
            <h1 className="font-display text-3xl font-bold text-ink mb-3">Page not found</h1>
            <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
            <a href="/" className="btn-brand px-8 py-3.5 rounded-full font-semibold text-sm inline-block">Go Home</a>
          </div>
        } />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}