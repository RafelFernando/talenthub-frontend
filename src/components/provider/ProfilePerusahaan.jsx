import React, { useState } from "react";
import { PlusCircle, RefreshCcw, Search, X } from "lucide-react";
import TambahLowonganForm from "./TambahLowonganForm";

export default function ProfilePerusahaan() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [entries, setEntries] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    
    const handleRefresh = () => {
        window.location.reload();
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearchChange) onSearchChange(value);
    };
    
    const handleEntriesChange = (e) => {
    setEntries(Number(e.target.value));
    console.log("Menampilkan:", e.target.value, "entri");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Lowongan baru berhasil ditambahkan!");
        setIsModalOpen(false);
    };
    



  return (
    <div className="p-3">
        <h1 className="text-2xl font-bold text-blue-900 tracking-wide text-center mb-6">
            Lowongan Pekerjaan
        </h1>

        <div className="flex items-center gap-4 mb-6">
            <button
                className="group flex items-center justify-center gap-2 bg-[#77B55A] hover:bg-[#68A04B] text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover shadow-lg hover:shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#77B55A] focus:ring-opacity-50 w-56"
                onClick={() => setIsModalOpen(true)}
            >
                <PlusCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                <span className="whitespace-nowrap font-semibold tracking-wide text-sm">
                    Tambah Lowongan
                </span>
            </button>
            
            <button
                onClick={handleRefresh}
                className="group flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover shadow-md hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-56"
            >
                <RefreshCcw className="w-6 h-6 text-white transition-transform duration-500 group-hover:rotate-180" />
                <span className="whitespace-nowrap font-semibold tracking-wide text-sm">
                    Menyegarkan Kembali
                </span>
            </button>
        </div>

        <div className="flex items-center gap-3">
            {/* Dropdown jumlah entri */}
            <div className="flex items-center gap-2">
                <label htmlFor="entries" className="text-sm font-medium text-gray-700">
                    Tampilkan
                </label>
                <select
                    id="entries"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    onChange={handleEntriesChange}
                    defaultValue="10"
                >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>

            {/* Search Bar di sebelah kanan dropdown */}
            <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Cari data..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none w-56"
                />
            </div>
        </div>

        {isModalOpen && <TambahLowonganForm onClose={() => setIsModalOpen(false)} />}


    </div>
  );
}
