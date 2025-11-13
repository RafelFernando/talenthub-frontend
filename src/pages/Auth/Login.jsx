import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState("pencari"); // default: pencari kerja
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
    alert(`Login sebagai ${role === "pencari" ? "Pencari Kerja" : "Penyedia Pekerjaan"} berhasil!`);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-white font-[Segoe_UI]">
      {/* LEFT PANEL */}
      <div className="flex-1 hidden md:block">
        <img
          src="/stp.png"
          alt="Solo Technopark"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 justify-center items-center px-6 md:px-16">
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-5">
          {/* Judul */}
          <h2 className="text-4xl font-semibold text-gray-900">Masuk Sekarang</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Untuk mengakses e-Training, Talent Hub, e-Commerce, dan Metaverse dalam satu ekosistem digital.
          </p>

          {/* Role Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setRole("pencari")}
              className={`flex-1 py-3 rounded-lg font-medium border transition ${
                role === "pencari"
                  ? "bg-[#193F7A] text-white border-[#193F7A]"
                  : "bg-white text-[#193F7A] border-[#193F7A] hover:bg-[#193F7A]/10"
              }`}
            >
              Pencari Kerja
            </button>

            <button
              type="button"
              onClick={() => setRole("penyedia")}
              className={`flex-1 py-3 rounded-lg font-medium border transition ${
                role === "penyedia"
                  ? "bg-[#193F7A] text-white border-[#193F7A]"
                  : "bg-white text-[#193F7A] border-[#193F7A] hover:bg-[#193F7A]/10"
              }`}
            >
              Penyedia Pekerjaan
            </button>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#193F7A] font-semibold mt-5 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email@gmail.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#193F7A] font-semibold mt-5 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full bg-[#193F7A] text-white py-3 rounded-lg mt-6 hover:bg-blue-900 transition duration-300 font-medium"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-gray-500 text-sm my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span>Login Dengan</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Tombol Sosial */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
              Lanjutkan dengan Google
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <img src="/apple-icon.png" alt="Facebook" className="w-5 h-5" />
              Lanjutkan dengan Facebook
            </button>
          </div>

          {/* Link ke Registrasi */}
          <p className="text-center text-gray-700 mt-6">
            Belum memiliki akun?{" "}
            <a
              href="/Auth/Registrasi"
              className="text-[#193F7A] font-semibold hover:underline"
            >
              Daftar disini
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}