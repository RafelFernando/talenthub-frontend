import React, { useEffect, useState, useMemo } from "react";
import { PlusCircle, RefreshCw } from "lucide-react"; // ✅ icon dari lucide-react

export default function Notifikasi() {
  const [notifikasi, setNotifikasi] = useState([]);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data dari API backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/notifikasi");
        if (!res.ok) throw new Error("Gagal mengambil data notifikasi");
        const data = await res.json();
        setNotifikasi(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔹 Filter pencarian
  const filtered = useMemo(() => {
    let result = [...notifikasi];
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.judul?.toLowerCase().includes(q) ||
          n.isi?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [notifikasi, search]);

  // 🔹 Pagination
  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const visible = filtered.slice(startIndex, startIndex + perPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-5">
        {/* 🔸 Header Tombol */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <div className="flex gap-2">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-all">
              <PlusCircle className="w-4 h-4" /> Tambah Notifikasi
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Refresh Data
            </button>
          </div>
        </div>

        {/* 🔸 Filter atas tabel */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span>Show</span>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span>entries</span>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-1 text-sm w-56"
          />
        </div>

        {/* 🔸 Tabel Notifikasi */}
        {loading ? (
          <p className="text-center text-gray-500 py-8 animate-pulse">
            Memuat data...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead>
                <tr className="bg-[#E84118] text-white text-left">
                  <th className="px-3 py-2 border-r w-10">No</th>
                  <th className="px-3 py-2 border-r">Judul</th>
                  <th className="px-3 py-2 border-r">Isi</th>
                  <th className="px-3 py-2 border-r">Lampiran</th>
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                ) : (
                  visible.map((n, i) => (
                    <tr
                      key={n.id}
                      className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } border-b`}
                    >
                      <td className="px-3 py-2">{startIndex + i + 1}</td>
                      <td className="px-3 py-2">{n.judul}</td>
                      <td className="px-3 py-2">{n.isi}</td>
                      <td className="px-3 py-2">
                        {n.lampiran ? (
                          <a
                            href={n.lampiran}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Lihat
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 🔸 Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <p>
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + perPage, total)} of {total} entries
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {"<<"}
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {"<"}
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {">"}
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
