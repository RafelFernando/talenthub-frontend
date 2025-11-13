import React, { useState, useEffect, useMemo } from "react";
import { Edit2, PlusCircle } from "lucide-react";

export default function JobSeekerAdmin() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Fetch data dari backend API
  useEffect(() => {
    const fetchJobSeekers = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/talenthub/job-seeker");
        if (!res.ok) throw new Error("Gagal memuat data Job Seeker");
        const data = await res.json();
        setRoles(data); // pastikan data yang dikembalikan berupa array
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobSeekers();
  }, []);

  // 🔍 Filter pencarian
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return roles;
    return roles.filter(
      (r) =>
        r.name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.phone?.toLowerCase().includes(q)
    );
  }, [roles, search]);

  // 📄 Pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(currentPage, totalPages);
  const startIndex = (current - 1) * perPage;
  const rolesToShow = filtered.slice(startIndex, startIndex + perPage);

  const handleToggleActive = (id) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleEdit = (id) => {
    console.log("Edit job seeker id:", id);
    alert("Fungsi edit placeholder (cek console).");
  };

  const handleAdd = () => {
    alert("Tombol tambah nanti diarahkan ke form registrasi Job Seeker");
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h2 className="text-lg font-semibold text-[#193F7A]">Data Job Seeker</h2>
          
        </div>

        {/* Filter dan search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Tampilkan</span>
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span className="text-sm text-gray-600">entri</span>
          </div>

          <div>
            <input
              type="text"
              placeholder="Cari nama, email atau telepon..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-1 text-sm w-56"
            />
          </div>
        </div>

        {/* Tabel */}
        {loading ? (
          <p className="text-center py-10 text-gray-500">Memuat data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead>
                <tr className="bg-[#E84118] text-white text-left">
                  <th className="px-3 py-2 border-r">No</th>
                  <th className="px-3 py-2 border-r">Nama Lengkap</th>
                  <th className="px-3 py-2 border-r">Email</th>
                  <th className="px-3 py-2 border-r">Telepon</th>
                  <th className="px-3 py-2 border-r">Foto</th>
                  <th className="px-3 py-2 border-r text-center">Status</th>
                  <th className="px-3 py-2 text-center">Opsi</th>
                </tr>
              </thead>
              <tbody>
                {rolesToShow.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-3 py-6 text-center text-gray-500">
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  rolesToShow.map((r, i) => (
                    <tr
                      key={r.id}
                      className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}
                    >
                      <td className="px-3 py-2">{startIndex + i + 1}</td>
                      <td className="px-3 py-2">{r.name}</td>
                      <td className="px-3 py-2">{r.email}</td>
                      <td className="px-3 py-2">{r.phone}</td>

                      <td className="px-3 py-2">
                        <img
                          src={
                            r.photo
                              ? `http://localhost:5000/uploads/${r.photo}`
                              : "/placeholder-person.png"
                          }
                          alt={r.name}
                          className="w-10 h-10 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-person.png";
                          }}
                        />
                      </td>

                      <td className="px-3 py-2 text-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={r.active}
                            onChange={() => handleToggleActive(r.id)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#193F7A] relative transition-all">
                            <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-full"></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-700">
                            {r.active ? "Aktif" : "Nonaktif"}
                          </span>
                        </label>
                      </td>

                      <td className="px-3 py-2 text-center">
                        <button
                          onClick={() => handleEdit(r.id)}
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
