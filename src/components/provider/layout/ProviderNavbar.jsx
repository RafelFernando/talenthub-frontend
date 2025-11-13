// src/components/admin/AdminNavbar.jsx
import React, { useState, useEffect } from "react";
import { Bell, User, Menu, X, LogOut, LogIn } from "lucide-react";

export default function ProviderNavbar({ onToggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // Simulasi status login

  useEffect(() => {
    // Cek login dari localStorage / sessionStorage
    const storedUser = sessionStorage.getItem("adminName");
    if (storedUser) setUser(storedUser);
  }, []);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    if (onToggleSidebar) onToggleSidebar();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminName");
    setUser(null);
    setDropdownOpen(false);
  };

  const handleLogin = () => {
    // Arahkan ke halaman login admin
    window.location.href = "/admin/login";
  };

  return (
    <nav className="w-full bg-white shadow-md flex justify-between items-center px-4 md:px-6 py-3 sticky top-0 z-50">
      {/* LEFT: Logo + Title */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={handleMenuClick}
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>

        <img
          src="/logo-stp.png"
          alt="Logo"
          className="w-16 h-8 object-contain"
        />
        <h1 className="hidden sm:block text-lg md:text-xl font-bold text-[#193F7A]">
          Job Provider
        </h1>
      </div>

      {/* RIGHT: Notifikasi & Profil */}
      <div className="flex items-center gap-4 md:gap-6 relative">
        {/* Notifikasi */}
        <button className="relative">
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-[#193F7A] transition" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex justify-center items-center">
            0
          </span>
        </button>

        {/* Kondisi login */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-lg transition"
            >
              <User className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              <span className="hidden sm:block text-gray-700 font-medium">
                {user}
              </span>
            </button>

            {/* Dropdown Logout */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-100">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 bg-[#193F7A] text-white px-3 py-1.5 rounded-lg hover:bg-[#1a3562] transition"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden sm:block">Login</span>
          </button>
        )}
      </div>
    </nav>
  );
}