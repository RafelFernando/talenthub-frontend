import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function DashboardAdmin() {
  // Data dummy untuk grafik
  const data = [
    { tanggal: "2025-10-01", jumlah: 10 },
    { tanggal: "2025-10-02", jumlah: 14 },
    { tanggal: "2025-10-03", jumlah: 13 },
    { tanggal: "2025-10-06", jumlah: 1 },
    { tanggal: "2025-10-09", jumlah: 3 },
    { tanggal: "2025-10-10", jumlah: 6 },
    { tanggal: "2025-10-30", jumlah: 8 },
  ];

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Header Dashboard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
        {/* <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow text-center">
          Generate Report
        </button> */}
      </div>

      {/* Statistik Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-white shadow rounded-lg p-5 border-l-4 border-blue-600">
          <p className="text-sm font-semibold text-blue-700">JOB PROVIDER</p>
          <h2 className="text-2xl font-bold text-gray-700 mt-2">7</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-5 border-l-4 border-green-600">
          <p className="text-sm font-semibold text-green-700">JOB SEEKER</p>
          <h2 className="text-2xl font-bold text-gray-700 mt-2">25</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-5 border-l-4 border-sky-500">
          <p className="text-sm font-semibold text-sky-600">JOB POSTING</p>
          <h2 className="text-2xl font-bold text-gray-700 mt-2">15</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-5 border-l-4 border-yellow-500">
          <p className="text-sm font-semibold text-yellow-600">VISITOR</p>
          <h2 className="text-2xl font-bold text-gray-700 mt-2">2500</h2>
        </div>
      </div>

      {/* Grafik Section */}
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h2 className="text-sm font-semibold text-gray-700">
            Grafik jumlah orang melihat postingan lowongan pekerjaan
          </h2>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <select className="border border-gray-300 rounded px-3 py-2 text-sm w-full sm:w-auto">
              <option>Pilih Bulan</option>
              <option>Oktober</option>
            </select>
            <select className="border border-gray-300 rounded px-3 py-2 text-sm w-full sm:w-auto">
              <option>Pilih Tahun</option>
              <option>2025</option>
            </select>
            <button className="bg-[#E84118] hover:bg-red-700 text-white px-4 py-2 text-sm rounded w-full sm:w-auto">
              Tampilkan
            </button>
          </div>
        </div>

        {/* Grafik */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tanggal" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="jumlah" fill="#E84118" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4">
          <button className="bg-[#E84118] hover:bg-red-700 text-white text-sm px-4 py-2 rounded">
            Lihat Detail Per Postingan
          </button>
        </div>
      </div>
    </div>
  );
}
