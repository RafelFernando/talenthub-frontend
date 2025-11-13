import React, { useEffect, useState, useMemo } from "react";

export default function ReportAdmin() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Ambil data dari API backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/reports");
        if (!res.ok) throw new Error("Gagal mengambil data laporan");
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // 🔍 Filter pencarian
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return reports;
    return reports.filter(
      (r) =>
        r.reporter?.toLowerCase().includes(q) ||
        r.reported?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q)
    );
  }, [reports, search]);

  // 📄 Pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(currentPage, totalPages);
  const startIndex = (current - 1) * perPage;
  const visibleReports = filtered.slice(startIndex, startIndex + perPage);

  // 🧩 Fungsi tombol
  const handleApprove = (id) => alert(`Setujui laporan ID: ${id}`);
  const handleReject = (id) => alert(`Tolak laporan ID: ${id}`);
  const handleReset = (id) => alert(`Reset status laporan ID: ${id}`);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold text-[#193F7A] mb-4">Data Report</h2>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Tampilkan</span>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span className="text-sm text-gray-600">entri</span>
          </div>

          <input
            type="text"
            placeholder="Cari laporan..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-1 text-sm w-56"
          />
        </div>

        {/* Tabel */}
        {loading ? (
          <p className="text-center py-8 text-gray-500">Memuat data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead>
                <tr className="bg-[#E84118] text-white text-left">
                  <th className="px-3 py-2 border-r">No</th>
                  <th className="px-3 py-2 border-r">Tanggal</th>
                  <th className="px-3 py-2 border-r">Reporter</th>
                  <th className="px-3 py-2 border-r">Reported</th>
                  <th className="px-3 py-2 border-r">Keterangan</th>
                  <th className="px-3 py-2 border-r text-center">Status</th>
                  <th className="px-3 py-2 text-center">Opsi</th>
                </tr>
              </thead>
              <tbody>
                {visibleReports.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500">
                      Tidak ada laporan ditemukan
                    </td>
                  </tr>
                ) : (
                  visibleReports.map((r, i) => (
                    <tr
                      key={r.id}
                      className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } border-b`}
                    >
                      <td className="px-3 py-2">{startIndex + i + 1}</td>
                      <td className="px-3 py-2">{r.date}</td>
                      <td className="px-3 py-2">{r.reporter}</td>
                      <td className="px-3 py-2 font-semibold text-[#193F7A]">
                        {r.reported}
                      </td>
                      <td className="px-3 py-2">{r.description}</td>
                      <td className="px-3 py-2 text-center">
                        {r.status === "Pending" ? (
                          <span className="bg-blue-600 text-white px-3 py-1 rounded text-xs">
                            Pending
                          </span>
                        ) : r.status === "Disetujui" ? (
                          <span className="bg-green-600 text-white px-3 py-1 rounded text-xs">
                            Disetujui
                          </span>
                        ) : (
                          <span className="bg-red-600 text-white px-3 py-1 rounded text-xs">
                            Ditolak
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center flex justify-center gap-2">
                        {r.status === "Pending" ? (
                          <>
                            <button
                              onClick={() => handleReject(r.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                            >
                              Tolak
                            </button>
                            <button
                              onClick={() => handleApprove(r.id)}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                            >
                              Setujui
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleReset(r.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Reset
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <p>
            Menampilkan {startIndex + 1} sampai{" "}
            {Math.min(startIndex + perPage, total)} dari {total} entri
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
