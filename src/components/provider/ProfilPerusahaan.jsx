import React, { useState } from "react";
import { Edit2, Mail, MapPin, Phone, Globe, X } from "lucide-react";

export default function ProfilPerusahaan() {
  const [perusahaan, setPerusahaan] = useState({
    nama: "Perusahaan Test",
    alamat: "Jl. Surya III No. 07",
    email: "testprovider@gmail.com",
    telepon: "081264997200",
    website: "www.test.co.id",
    deskripsi: "Perusahaan penyedia jasa IT konsultan",
    banner: "/logo-stp.png",
    logo: "/natalie.jpg",
  });

  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(""); // "banner" atau "logo"
  const [preview, setPreview] = useState("");

  const handleEditClick = (type) => {
    setEditTarget(type);
    setPreview(perusahaan[type]);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };

  const handleSave = () => {
    setPerusahaan((prev) => ({ ...prev, [editTarget]: preview }));
    setShowModal(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">
          Profil Perusahaan
        </h1>
      </div>

      {/* Card Utama */}
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        {/* Banner */}
        <div className="relative h-56 w-full">
          <img
            src={perusahaan.banner}
            alt="Banner Perusahaan"
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => handleEditClick("banner")}
            className="absolute top-3 right-3 bg-white text-gray-800 px-3 py-1 rounded-lg shadow hover:bg-gray-100 flex items-center gap-2 text-sm cursor-pointer transition"
          >
            <Edit2 size={16} /> Edit
          </button>

          {/* Foto Profil */}
          <div className="absolute -bottom-14 left-10">
            <div className="relative">
              <img
                src={perusahaan.logo}
                alt="Logo Perusahaan"
                className="w-28 h-28 rounded-xl border-4 border-white shadow-md object-cover"
              />
              <button
                onClick={() => handleEditClick("logo")}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white text-gray-800 px-3 py-1 rounded-md shadow hover:bg-gray-100 flex items-center gap-1 text-xs cursor-pointer transition"
              >
                <Edit2 size={14} /> Edit
              </button>
            </div>
          </div>
        </div>

        {/* Info Perusahaan */}
        <div className="pt-16 pb-8 px-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            {/* Deskripsi */}
            <div className="flex-1 mb-6 lg:mb-0">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Tentang Perusahaan
              </h2>
              <p className="text-gray-600">{perusahaan.deskripsi}</p>
            </div>

            {/* Detail Kontak */}
            <div className="w-full lg:w-1/3 text-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {perusahaan.nama}
              </h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-500" />
                  {perusahaan.alamat}
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-500" />
                  {perusahaan.email}
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-500" />
                  {perusahaan.telepon}
                </li>
                <li className="flex items-center gap-2">
                  <Globe size={16} className="text-gray-500" />
                  {perusahaan.website}
                </li>
              </ul>
              <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 text-sm cursor-pointer transition">
                <Edit2 size={16} /> Edit Profil
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Edit Gambar */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex justify-center items-center z-50 animate-fadeIn"
          onClick={(e) => {
            if (e.target.classList.contains("bg-black/20")) setShowModal(false);
          }}
        >
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-lg p-6 relative transform transition-all duration-300 scale-95 opacity-0 animate-popupIn">
            {/* Tombol X */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Edit {editTarget === "banner" ? "Banner" : "Logo"} Perusahaan
            </h2>

            {/* Gambar Preview */}
            <div className="flex justify-center mb-4">
              <label htmlFor="fileInput" className="cursor-pointer">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-64 h-40 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition"
                  title="Klik untuk ganti gambar"
                />
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer transition"
              >
                Tutup
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow cursor-pointer transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animasi */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease forwards; }
        .animate-popupIn { animation: popupIn 0.3s ease forwards; }
      `}</style>
    </div>
  );
}
