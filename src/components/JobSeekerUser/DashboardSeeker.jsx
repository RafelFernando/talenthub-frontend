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

export default function DashboardSeeker() {

    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
            {/* Header Dashboard */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
            </div>

            <div className="overflow-hidden h-[220px] w-full rounded-xl mb-8">
                <img
                    src="/slider.png"
                    alt="slider"
                    className="w-full object-cover object-top h-[300px]"
                />
            </div>

            {/* Statistik Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                <div className="bg-white shadow rounded-lg p-5 border-l-4 border-blue-600">
                    <p className="text-sm font-semibold text-blue-700">Aplikasi</p>
                    <h2 className="text-2xl font-bold text-gray-700 mt-2">7</h2>
                </div>

                <div className="bg-white shadow rounded-lg p-5 border-l-4 border-green-600">
                    <p className="text-sm font-semibold text-green-700">Pekerjaan Disimpan</p>
                    <h2 className="text-2xl font-bold text-gray-700 mt-2">25</h2>
                </div>

                <div className="bg-white shadow rounded-lg p-5 border-l-4 border-sky-500">
                    <p className="text-sm font-semibold text-sky-600">Laporan</p>
                    <h2 className="text-2xl font-bold text-gray-700 mt-2">15</h2>
                </div>

                <div className="bg-white shadow rounded-lg p-5 border-l-4 border-yellow-500">
                    <p className="text-sm font-semibold text-yellow-600">Pengunjung</p>
                    <h2 className="text-2xl font-bold text-gray-700 mt-2">2500</h2>
                </div>
            </div>
        </div>
    );
}
