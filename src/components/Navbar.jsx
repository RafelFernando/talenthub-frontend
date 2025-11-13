import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (path) =>
    `block px-4 py-2 rounded-full transition-all duration-300 font-medium ${
      location.pathname === path
        ? "bg-white text-[#193F7A] shadow-md font-semibold"
        : "text-[#193F7A] hover:text-yellow-500"
    }`;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-6 py-4">
        {/* LOGO */}
        <div className="flex items-center">
          <img src="/logo-stp.png" alt="Logo" className="w-20" />
        </div>

        {/* NAV LINKS (Desktop) */}
        <div className="hidden md:flex gap-4 items-center bg-gray-100 px-3 py-1 rounded-full">
          <Link to="/" className={linkClass("/")}>
            Beranda
          </Link>
          <Link to="/Caripekerjaan" className={linkClass("/Caripekerjaan")}>
            Cari Pekerjaan
          </Link>
          <Link to="/Tentang" className={linkClass("/Tentang")}>
            Tentang
          </Link>
          <Link to="/Kontak" className={linkClass("/Kontak")}>
            Kontak
          </Link>
        </div>

        {/* BUTTON (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/Auth/Login"
            className="px-5 py-2 rounded-full border border-[#193F7A] text-[#193F7A] hover:bg-[#193F7A] hover:text-white transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/Auth/Registrasi"
            className="px-5 py-2 rounded-full bg-[#193F7A] text-white hover:bg-yellow-500 transition-all duration-300"
          >
            Registrasi
          </Link>
        </div>

        {/* HAMBURGER (Mobile) */}
        <button
          className={`md:hidden flex flex-col justify-between w-7 h-6 relative z-50 transition 
            ${isOpen ? "scale-110 text-yellow-500" : "text-[#193F7A]"}`}
          onClick={toggleMenu}
        >
          <span className="block h-[2px] w-7 bg-current rounded transition-all"></span>
          <span className="block h-[2px] w-7 bg-current rounded transition-all"></span>
          <span className="block h-[2px] w-7 bg-current rounded transition-all"></span>
        </button>
      </div>

      {/* SIDEBAR (Mobile) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-30"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="md:hidden fixed top-0 left-0 w-full bg-white shadow-lg rounded-b-2xl z-40"
            >
              <div className="flex flex-col items-center py-8 space-y-6 text-lg font-medium">
                <Link to="/" className={linkClass("/")} onClick={toggleMenu}>
                  Beranda
                </Link>
                <Link
                  to="/Caripekerjaan"
                  className={linkClass("/Caripekerjaan")}
                  onClick={toggleMenu}
                >
                  Cari Pekerjaan
                </Link>
                <Link
                  to="/Tentang"
                  className={linkClass("/Tentang")}
                  onClick={toggleMenu}
                >
                  Tentang
                </Link>
                <Link
                  to="/Kontak"
                  className={linkClass("/Kontak")}
                  onClick={toggleMenu}
                >
                  Kontak
                </Link>

                <Link
                  to="/login"
                  className="px-6 py-2 rounded-full border border-[#193F7A] text-[#193F7A] hover:bg-[#193F7A] hover:text-white transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Login
                </Link>

                <Link
                  to="/profile"
                  className="px-6 py-2 rounded-full bg-[#193F7A] text-white hover:bg-yellow-500 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Profil
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
