import React, { useState, useEffect, useMemo } from "react";
import { Eye, Trash2 } from "lucide-react";

export default function PekerjaanDisimpan() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // 🔹 Ganti URL di bawah dengan endpoint API kamu
    const API_URL = "http://localhost:5000/api/talenthub/jobs";

    // Fetch data dari backend
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Gagal memuat data lowongan");
                const data = await response.json();

                // ✅ Pastikan yang diset adalah array
                const jobsArray = Array.isArray(data) ? data : data.jobs || data.data || [];
                setJobs(jobsArray);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);


    // 🔹 Filter pencarian
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return jobs;
        return jobs.filter(
            (job) =>
                job.title?.toLowerCase().includes(q) ||
                job.position?.toLowerCase().includes(q) ||
                job.location?.toLowerCase().includes(q)
        );
    }, [search, jobs]);

    // 🔹 Pagination
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

    // 🔹 Tampilan utama
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-lg shadow p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-5">Pekerjaan Disimpan</h2>

                {/* Kontrol atas */}
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
                            placeholder="Cari pekerjaan..."
                        />
                    </div>
                </div>

                {/* Isi tabel atau card list */}
                {loading ? (
                    <p className="text-center text-gray-500 py-5">Memuat data...</p>
                ) : error ? (
                    <p className="text-center text-red-500 py-5">{error}</p>
                ) : jobsToShow.length === 0 ? (
                    <p className="text-center text-gray-500 py-5">Tidak ada data ditemukan.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {jobsToShow.map((job) => (
                            <div
                                key={job.id}
                                className="border border-blue-400 rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white hover:shadow-md transition"
                            >
                                <div className="flex items-start gap-3">
                                    <img
                                        src={job.companyLogo || "/default-logo.png"}
                                        alt={job.title}
                                        className="w-14 h-14 object-contain rounded"
                                        onError={(e) => (e.currentTarget.src = "/default-logo.png")}
                                    />
                                    <div>
                                        <h3 className="text-red-600 font-semibold text-lg">{job.title}</h3>
                                        <p className="text-gray-700 text-sm">{job.position}</p>
                                        <p className="text-gray-600 text-sm mt-1 flex items-center gap-1">
                                            📍 {job.location}
                                        </p>
                                        <p className="text-gray-600 text-sm mt-1">
                                            Dilihat <span className="font-semibold">{job.views || 0}x</span>
                                        </p>
                                    </div>
                                    <div className="flex gap-6">
                                        <span className="bg-greem">{job.status}</span>
                                        <span>{job.created_at}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                                    {/* Tombol Detail */}
                                    <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition">
                                        <Eye size={16} /> Detail
                                    </button>

                                    {/* Tombol Hapus */}
                                    <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition">
                                        <Trash2 size={16} /> Hapus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && !error && jobsToShow.length > 0 && (
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
                                        className={`px-2 py-1 border rounded ${p === current ? "bg-green-600 text-white" : "hover:bg-gray-200"
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
        </div>
    );
}
