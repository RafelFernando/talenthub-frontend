import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // 👈 state untuk tampilkan password

  const navigate = useNavigate();

  // Mengubah input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Harap isi semua kolom!");
      return;
    }

    // Simulasi login
    alert("Login berhasil!");
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-white font-[Segoe_UI]">
      {/* LEFT PANEL */}
      <div className="flex-1 hidden md:block bg-[#193F7A]">
        <img
          src="/gambar.png"
          alt="Solo Technopark"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 justify-center items-center px-6 md:px-16">
        <form className="w-full max-w-lg space-y-5" onSubmit={handleSubmit}>
          {/* Judul */}
          <h2 className="text-4xl font-bold text-gray-900 flex justify-center">
            Admin
          </h2>
          <p className="text-gray-600 font-bold text-2xl flex justify-center leading-relaxed">
            Solo Techno Park - Talent Hub
          </p>

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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // 👈 toggle show/hide
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Checkbox untuk toggle */}
              <label className="flex items-center gap-2 mt-3 text-sm text-gray-600 select-none">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="accent-[#193F7A] cursor-pointer scale-110"
                />
                Tampilkan Password
              </label>
            </div>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full bg-[#193F7A] text-white py-3 rounded-lg mt-6 hover:bg-blue-900 transition duration-300 font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
