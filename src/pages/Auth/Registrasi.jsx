import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Terms from "../../components/Terms";

export default function Registrasi() {
  const [formData, setFormData] = useState({
    name: "",
    telp: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [role, setRole] = useState("pencari"); // default: Pencari Kerja
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    if (!formData.agree) {
      alert("Anda harus menyetujui kebijakan privasi.");
      return;
    }

    alert(`Registrasi berhasil sebagai ${role === "pencari" ? "Pencari Kerja" : "Penyedia Pekerjaan"}!`);
    navigate("/");
  };

  return (
    <>
      <div className="flex min-h-screen bg-white font-[Segoe_UI]">
        {/* Panel kiri */}
        <div className="flex-1 hidden md:block">
          <img
            src="/stp.png"
            alt="Solo Technopark"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Panel kanan */}
        <div className="flex flex-1 justify-center items-center p-8">
          <form
            className="w-full max-w-md space-y-4"
            onSubmit={handleSubmit}
          >
            {/* Judul */}
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Daftar Sekarang
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-5">
              Untuk mengakses e-Training, Talent Hub, e-Commerce, dan Metaverse dalam satu ekosistem digital.
            </p>

            {/* Role Buttons */}
            <div className="flex gap-3 mb-5">
              <button
                type="button"
                onClick={() => setRole("pencari")}
                className={`flex-1 py-3 rounded-lg font-medium border transition ${role === "pencari"
                  ? "bg-[#193F7A] text-white border-[#193F7A]"
                  : "bg-white text-[#193F7A] border-[#193F7A] hover:bg-[#193F7A]/10"
                  }`}
              >
                Pencari Kerja
              </button>

              <button
                type="button"
                onClick={() => setRole("penyedia")}
                className={`flex-1 py-3 rounded-lg font-medium border transition ${role === "penyedia"
                  ? "bg-[#193F7A] text-white border-[#193F7A]"
                  : "bg-white text-[#193F7A] border-[#193F7A] hover:bg-[#193F7A]/10"
                  }`}
              >
                Penyedia Pekerjaan
              </button>
            </div>

            {/* Input Nama */}
            <div>
              <label className="block text-[#193F7A] font-semibold mt-5">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                required
                className="w-full border border-[#B8C3D6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#193F7A]"
              />
            </div>

            {/* Input No Telp */}
            <div>
              <label className="block text-[#193F7A] font-semibold mt-5">
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="telp"
                value={formData.telp}
                onChange={handleChange}
                placeholder="Telepon"
                required
                className="w-full border border-[#B8C3D6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#193F7A]"
              />
            </div>

            {/* Input Email */}
            <div>
              <label className="block text-[#193F7A] font-semibold mt-5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email@gmail.com"
                required
                className="w-full border border-[#B8C3D6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#193F7A]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#193F7A] font-semibold mt-5">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full border border-[#B8C3D6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#193F7A]"
              />
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-[#193F7A] font-semibold mt-5">
                Konfirmasi Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Konfirmasi Password"
                required
                className="w-full border border-[#B8C3D6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#193F7A]"
              />
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-3 mt-4 text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1 scale-110 accent-[#193F7A]"
              />
              <p className="text-gray-700 leading-snug">
                Saya menyetujui{" "}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-[#193F7A] font-semibold hover:underline"
                >
                  Syarat & kebijakan privasi
                </button>
              </p>
            </label>

            {/* Tombol Submit */}
            <button
              type="submit"
              className="w-full bg-[#193F7A] text-white py-3 rounded-lg font-semibold text-base hover:bg-[#152f5a] transition-all duration-300 mt-3"
            >
              Daftar
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 text-gray-500 text-sm my-6">
              <div className="flex-1 h-[1px] bg-gray-300" />
              <span>Register Dengan</span>
              <div className="flex-1 h-[1px] bg-gray-300" />
            </div>

            {/* Tombol Sosial */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
              >
                <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
                <span>Lanjutkan dengan Google</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
              >
                <img src="/apple-icon.png" alt="Facebook" className="w-5 h-5" />
                <span>Lanjutkan dengan Facebook</span>
              </button>
            </div>

            {/* Link ke Login */}
            <p className="text-center text-gray-700 text-sm mt-6">
              Sudah memiliki akun?{" "}
              <a
                href="/Auth/Login"
                className="text-[#193F7A] font-bold hover:underline"
              >
                Masuk disini
              </a>
            </p>
          </form>
        </div>
      </div>
      <Terms isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </>
  );
}
