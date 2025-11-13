import React, { useState, useEffect, useMemo } from "react";

export default function LaporanUserAdmin() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("All User");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);

  // Ambil data dari API backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/users");
        if (!res.ok) throw new Error("Gagal mengambil data user");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter berdasarkan pencarian, tanggal, dan role
  const filtered = useMemo(() => {
    let result = [...users];

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.nama?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q) ||
          u.telepon?.toLowerCase().includes(q)
      );
    }

    if (roleFilter !== "All User") {
      result = result.filter((u) => u.role === roleFilter);
    }

    if (fromDate) {
      result = result.filter((u) => new Date(u.tanggal) >= new Date(fromDate));
    }

    if (toDate) {
      result = result.filter((u) => new Date(u.tanggal) <= new Date(toDate));
    }

    return result;
  }, [users, search, roleFilter, fromDate, toDate]);

  // Pagination
  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const visibleUsers = filtered.slice(startIndex, startIndex + perPage);

  // Tombol cetak
  const handleCetak = () => {
    window.print();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6 bg-gray-100 min-h-screen">
      {/* Sidebar Filter */}
      <div className="bg-white shadow rounded-lg p-4 w-full sm:w-1/4">
        <h3 className="font-semibold text-[#193F7A] mb-3">Laporan Data User</h3>

        <label className="text-sm text-gray-700">Dari Tanggal</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 mb-2"
        />
        <small className="text-xs text-gray-500 block mb-3">
          Harus sebelum tanggal “Sampai Tanggal”
        </small>

        <label className="text-sm text-gray-700">Sampai Tanggal</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 mb-2"
        />
        <small className="text-xs text-gray-500 block mb-3">
          Harus sesudah tanggal “Dari Tanggal”
        </small>

        <label className="text-sm text-gray-700">Sebagai</label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 mb-3"
        >
          <option>All User</option>
          <option>Admin</option>
          <option>Provider</option>
          <option>Seeker</option>
        </select>

        <button
          onClick={handleCetak}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Cetak
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow rounded-lg p-4 flex-1">
        <h3 className="font-semibold text-[#193F7A] mb-4">Data User</h3>

        {/* Filter atas tabel */}
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
            placeholder="Search:"
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
          <p className="text-center text-gray-500 py-8">Memuat data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead>
                <tr className="bg-[#E84118] text-white text-left">
                  <th className="px-3 py-2 border-r">No</th>
                  <th className="px-3 py-2 border-r">Tanggal Pendaftaran</th>
                  <th className="px-3 py-2 border-r">Nama Lengkap</th>
                  <th className="px-3 py-2 border-r">Email</th>
                  <th className="px-3 py-2 border-r">Telepon</th>
                  <th className="px-3 py-2 border-r">Sebagai</th>
                </tr>
              </thead>
              <tbody>
                {visibleUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                ) : (
                  visibleUsers.map((u, i) => (
                    <tr
                      key={u.id}
                      className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } border-b`}
                    >
                      <td className="px-3 py-2">{startIndex + i + 1}</td>
                      <td className="px-3 py-2">{u.tanggal}</td>
                      <td className="px-3 py-2">{u.nama}</td>
                      <td className="px-3 py-2">{u.email}</td>
                      <td className="px-3 py-2">{u.telepon}</td>
                      <td className="px-3 py-2">{u.role}</td>
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
