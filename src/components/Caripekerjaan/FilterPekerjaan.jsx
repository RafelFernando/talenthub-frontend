import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";

export default function FilterPekerjaan({ onFilter }) {
  const [filters, setFilters] = useState({
    sort: "",
    kategori: "",
    provinsi: "",
    kota: "",
    gaji: "",
  });

  const [provinsiList, setProvinsiList] = useState([]);
  const [kotaList, setKotaList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [loadingProv, setLoadingProv] = useState(false);
  const [loadingKota, setLoadingKota] = useState(false);

  // 🔹 Ambil daftar provinsi dari proxy Vite
  useEffect(() => {
    const fetchProvinsi = async () => {
      setLoadingProv(true);
      try {
        const res = await fetch("/wilayah-api/api/provinces.json");
        const result = await res.json();

        if (result?.data && Array.isArray(result.data)) {
          setProvinsiList(result.data);
        } else {
          console.error("Format data provinsi tidak sesuai:", result);
        }
      } catch (err) {
        console.error("Gagal mengambil data provinsi:", err);
      } finally {
        setLoadingProv(false);
      }
    };
    fetchProvinsi();
  }, []);

  // 🔹 Ambil daftar kota berdasarkan provinsi yang dipilih
  useEffect(() => {
    const fetchKota = async () => {
      if (!filters.provinsi) {
        setKotaList([]);
        return;
      }
      setLoadingKota(true);
      try {
        const res = await fetch(`/wilayah-api/api/regencies/${filters.provinsi}.json`);
        const result = await res.json();

        if (result?.data && Array.isArray(result.data)) {
          setKotaList(result.data);
        } else {
          console.error("Format data kota tidak sesuai:", result);
        }
      } catch (err) {
        console.error("Gagal mengambil data kota:", err);
      } finally {
        setLoadingKota(false);
      }
    };

    fetchKota();
  }, [filters.provinsi]);

  // 🔹 Kategori manual
  useEffect(() => {
    setKategoriList([
      { id: "it", name: "Information Technology" },
      { id: "finance", name: "Finance" },
      { id: "marketing", name: "Marketing" },
      { id: "education", name: "Education" },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "provinsi" ? { kota: "" } : {}),
    }));
  };

  const handleSearch = () => {
    if (onFilter) onFilter(filters);
  };

  return (
    <div className="w-full md:w-1/4 border rounded-lg p-5 shadow-sm bg-white space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Filter className="text-red-500 w-5 h-5" /> Filter Pekerjaan
      </h3>

      {/* Sortir */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium">Sortir</label>
        <select
          name="sort"
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-red-500"
          value={filters.sort}
        >
          <option value="">Tidak ada</option>
          <option value="terlama">Terlama</option>
          <option value="terbaru">Terbaru</option>
        </select>
      </div>

      {/* Kategori */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium">Kategori</label>
        <select
          name="kategori"
          onChange={handleChange}
          value={filters.kategori}
          className="w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-red-500"
        >
          <option value="">Semua Kategori</option>
          {kategoriList.map((kat) => (
            <option key={kat.id} value={kat.id}>
              {kat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Provinsi & Kota */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Provinsi</label>
          <select
            name="provinsi"
            onChange={handleChange}
            value={filters.provinsi}
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-red-500"
          >
            <option value="">Semua Provinsi</option>
            {loadingProv ? (
              <option disabled>Memuat data...</option>
            ) : (
              provinsiList.map((prov) => (
                <option key={prov.code} value={prov.code}>
                  {prov.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Kota / Kabupaten</label>
          <select
            name="kota"
            onChange={handleChange}
            value={filters.kota}
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-red-500"
            disabled={!filters.provinsi}
          >
            <option value="">Semua Kabupaten / Kota</option>
            {loadingKota ? (
              <option disabled>Memuat data...</option>
            ) : (
              kotaList.map((kota) => (
                <option key={kota.code} value={kota.code}>
                  {kota.name}
                </option>
              ))
            )}
          </select>
        </div>

        <p className="text-xs text-gray-500">
          *Pilih "Semua Provinsi" untuk mereset kota
        </p>
      </div>

      {/* Gaji */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium">Gaji</label>
        <select
          name="gaji"
          onChange={handleChange}
          value={filters.gaji}
          className="w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-red-500"
        >
          <option value="">Tampilkan Semua</option>
          <option value="5000000">Rp 5.000.000+</option>
          <option value="10000000">Rp 10.000.000+</option>
        </select>
      </div>

      {/* Tombol */}
      <button
        onClick={handleSearch}
        className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition"
      >
        Cari
      </button>
    </div>
  );
}
