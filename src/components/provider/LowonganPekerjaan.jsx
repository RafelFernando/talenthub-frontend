import React, { useState, useMemo } from "react";
import { Plus, RefreshCw, Eye, Edit2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TambahLowonganForm from "./LowonganPekerjaan/TambahLowonganForm";
import EditLowonganForm from "./LowonganPekerjaan/EditLowonganForm";

export default function LowonganPekerjaan() {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Dummy data (nanti bisa diganti dari API)
  const lowonganList = [
    {
      id: 1,
      judul: "Frontend Developer ReactJS",
      kategori: "Content Writer",
      lokasi: "Sukoharjo - Jawa Tengah",
      dilihat: 52,
      status: "Tidak Aktif",
    },
    {
      id: 2,
      judul: "Cyber Security Officer",
      kategori: "IT Security",
      lokasi: "Solo - Jawa Tengah",
      dilihat: 37,
      status: "Aktif",
    },
    {
      id: 3,
      judul: "Digital Creative Designer",
      kategori: "Design & Creative",
      lokasi: "Sukoharjo - Jawa Tengah",
      dilihat: 16,
      status: "Aktif",
    },
    {
      id: 4,
      judul: "Marketing Specialist",
      kategori: "Sales & Marketing",
      lokasi: "Surakarta - Jawa Tengah",
      dilihat: 23,
      status: "Aktif",
    },
  ];

  // 🔍 Filter pencarian
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return lowonganList;
    return lowonganList.filter(
      (l) =>
        l.judul.toLowerCase().includes(q) ||
        l.kategori.toLowerCase().includes(q) ||
        l.lokasi.toLowerCase().includes(q)
    );
  }, [search, lowonganList]);

  // 📄 Pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(currentPage, totalPages);
  const startIndex = (current - 1) * perPage;
  const jobsToShow = filtered.slice(startIndex, startIndex + perPage);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleTambah = () => {
    setEditData(null); // 🔹 Reset edit data
    setShowModal(true);
  };

  const handleEdit = (data) => {
    setEditData(data); // 🔹 Simpan data yang ingin diedit
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className=" rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Lowongan Pekerjaan
          </h2>

          <div className="flex gap-3">
            <button
              onClick={handleTambah}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all"
            >
              <Plus size={18} />
              Tambah Lowongan
            </button>

            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all">
              <RefreshCw size={18} />
              Menyegarkan Tampilan
            </button>
          </div>
        </div>

        {/* 🔹 Kontrol Pencarian dan Filter */}
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span>Tampilkan</span>
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span>entri</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span>Cari:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 w-56"
              placeholder="Cari lowongan..."
            />
          </div>
        </div>

        {/* 🔹 Daftar Lowongan */}
        {jobsToShow.length === 0 ? (
          <p className="text-center text-gray-500 py-5">
            Tidak ada data ditemukan.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {jobsToShow.map((lowongan) => (
              <div
                key={lowongan.id}
                className="border border-green-500 rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white hover:shadow-md transition"
              >
                <div className="flex items-start gap-3">
                  <img
                    src="https://i.pravatar.cc/60"
                    alt={lowongan.judul}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-red-600 font-semibold text-lg">
                      {lowongan.judul}
                    </h3>
                    <p className="text-gray-700 text-sm">{lowongan.kategori}</p>
                    <p className="text-gray-600 text-sm mt-1 flex items-center gap-1">
                      📍 {lowongan.lokasi}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Dilihat{" "}
                      <span className="font-semibold">{lowongan.dilihat}x</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-3 sm:mt-0">
                  <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1.5 rounded-md shadow transition-all">
                    <Eye size={14} /> Detail
                  </button>

                  <button
                    onClick={() => handleEdit(lowongan)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-md shadow transition-all"
                  >
                    <Edit2 size={14} /> Edit
                  </button>

                  <button
                    className={`flex items-center gap-1 ${
                      lowongan.status === "Aktif"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-500 hover:bg-gray-600"
                    } text-white text-sm px-3 py-1.5 rounded-md shadow transition-all`}
                  >
                    {lowongan.status === "Aktif" ? (
                      <>
                        <XCircle size={14} /> Tidak Aktif
                      </>
                    ) : (
                      <>Aktif</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🔹 Pagination */}
        {jobsToShow.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 text-sm text-gray-600 gap-3">
            <p>
              Menampilkan {startIndex + 1} sampai{" "}
              {Math.min(startIndex + jobsToShow.length, total)} dari {total} entri
            </p>

            <div className="flex gap-1 items-center">
              <button
                onClick={() => goToPage(1)}
                className="px-2 py-1 border rounded hover:bg-gray-200"
              >
                &lt;&lt;
              </button>
              <button
                onClick={() => goToPage(current - 1)}
                className="px-2 py-1 border rounded hover:bg-gray-200"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, current - 3), Math.min(totalPages, current + 2))
                .map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`px-2 py-1 border rounded ${
                      p === current
                        ? "bg-green-600 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}

              <button
                onClick={() => goToPage(current + 1)}
                className="px-2 py-1 border rounded hover:bg-gray-200"
              >
                &gt;
              </button>
              <button
                onClick={() => goToPage(totalPages)}
                className="px-2 py-1 border rounded hover:bg-gray-200"
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🔹 Modal Tambah/Edit */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/5 backdrop-blur-sm flex items-center justify-center">
            <motion.div
              key="modalBox"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-[90%] max-w-3xl"
            >
              {editData ? (
                <EditLowonganForm
                  onClose={handleCloseModal}
                  editData={editData}
                />
              ) : (
                <TambahLowonganForm onClose={handleCloseModal} />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
