// src/components/admin/AdminSidebar.jsx
import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Bell,
  Mail,
  Flag,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
 
  const menuItems = [
    { name: "Dashboard", path: "/Admin/Dashboard", icon: <LayoutDashboard /> },
    { name: "Admin Role", path: "/Admin/Roles", icon: <ShieldCheck /> },
    { name: "Job Provider", path: "/Admin/JobProvider", icon: <Briefcase /> },
    { name: "Job Seeker", path: "/admin/JobSeeker", icon: <Users /> },
    { name: "Job Posting", path: "/admin/JobPosting", icon: <FileText /> },
    { name: "Fitur Premium", path: "/admin/FiturPremium", icon: <Flag /> },
    { name: "Notifikasi", path: "/admin/Notifikasi", icon: <Bell /> },
    { name: "Report", path: "/admin/ReportAdmin", icon: <FileText /> },
    { name: "Laporan User", path: "/admin/LaporanUser", icon: <Users /> },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-[#193F7A] text-white min-h-screen flex flex-col transition-all duration-300 shadow-lg`}
    >
      {/* Header Sidebar */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-blue-600">
        {isOpen && <h2 className="font-bold text-lg">Admin Panel</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-[#1f4b91] transition"
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Menu Navigasi */}
      <div className="flex flex-col mt-4 space-y-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 px-5 py-3 rounded-md mx-2 transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-white text-[#193F7A] font-semibold shadow-md"
                : "text-gray-200 hover:bg-[#1f4b91]"
            }`}
          >
            <div className="text-lg">{item.icon}</div>
            <span className={`${!isOpen && "hidden"} text-sm`}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Tombol Logout */}
      <div className="mt-auto mb-6 px-5">
        <button className="flex items-center gap-3 w-full py-3 px-4 rounded-md bg-[#1f4b91] hover:bg-[#163665] transition">
          <LogOut className="w-5 h-5 text-gray-100" />
          <span className={`${!isOpen && "hidden"} text-sm`}>Logout</span>
        </button>
      </div>
    </div>
  );
}
