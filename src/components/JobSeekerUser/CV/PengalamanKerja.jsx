import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PengalamanKerja() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pengalaman, setPengalaman] = useState([
    {
      tanggal: "Agustus 2022 - Agustus 2022",
      jabatan: "IT Staff",
      perusahaan: "Minyak",
      deskripsi:
        "Bertanggung jawab terhadap pemeliharaan sistem IT perusahaan dan dukungan teknis harian.",
    },
    {
      tanggal: "November 2025 - Januari 2026",
      jabatan: "IT Support",
      perusahaan: "PT Juan Sejahtera",
      deskripsi:
        "Membantu tim dalam pengembangan front-end aplikasi internal dan pemeliharaan jaringan.",
    },
  ]);

  const [formData, setFormData] = useState({
    posisi: "",
    level: "",
    perusahaan: "",
    mulai: "",
    selesai: "",
    masihBekerja: false,
    deskripsi: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    const tanggal = formData.masihBekerja
      ? `${formData.mulai} - Sekarang`
      : `${formData.mulai} - ${formData.selesai}`;
    const newData = {
      tanggal,
      jabatan: formData.posisi || "Posisi Tidak Diketahui",
      perusahaan: formData.perusahaan || "-",
      deskripsi: formData.deskripsi || "-",
    };
    setPengalaman([...pengalaman, newData]);
    setIsModalOpen(false);
    setFormData({
      posisi: "",
      level: "",
      perusahaan: "",
      mulai: "",
      selesai: "",
      masihBekerja: false,
      deskripsi: "",
    });
  };

  return (
    <>
      {/* Main Section */}
      <section className="w-full mt-4 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
            Pengalaman Kerja
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center text-[15px] bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            <Plus size={18} /> Tambah Pengalaman
          </button>
        </div>

        {/* List Pengalaman */}
        <div className="grid gap-6">
          {pengalaman.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-5 bg-white"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.jabatan}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {item.perusahaan}
                  </p>
                </div>
                <span className="text-sm text-gray-500 italic">
                  {item.tanggal}
                </span>
              </div>
              <p className="text-gray-700 text-sm mt-3 leading-relaxed">
                {item.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800">
                  Tambah Pengalaman Kerja
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form */}
              <div className="p-6 space-y-4">
                {/* Baris 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Posisi
                    </label>
                    <input
                      name="posisi"
                      type="text"
                      value={formData.posisi}
                      onChange={handleChange}
                      placeholder="Masukkan posisi pekerjaan"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Level
                    </label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">Pilih Level Pekerjaan</option>
                      <option value="Junior">Junior</option>
                      <option value="Middle">Middle</option>
                      <option value="Senior">Senior</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>
                </div>

                {/* Baris 2 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Perusahaan
                  </label>
                  <input
                    name="perusahaan"
                    type="text"
                    value={formData.perusahaan}
                    onChange={handleChange}
                    placeholder="Masukkan nama perusahaan"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Baris 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal Mulai
                    </label>
                    <input
                      name="mulai"
                      type="date"
                      value={formData.mulai}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal Selesai
                    </label>
                    <input
                      name="selesai"
                      type="date"
                      value={formData.selesai}
                      onChange={handleChange}
                      disabled={formData.masihBekerja}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                    />
                    <label className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <input
                        type="checkbox"
                        name="masihBekerja"
                        checked={formData.masihBekerja}
                        onChange={handleChange}
                      />
                      Saya masih bekerja di perusahaan ini
                    </label>
                  </div>
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    name="deskripsi"
                    rows="5"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    placeholder="Deskripsi pekerjaan..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 p-6 border-t">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  BATAL
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  SIMPAN
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
