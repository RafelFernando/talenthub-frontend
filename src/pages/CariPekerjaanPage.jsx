import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Map from "../components/Map";
import FilterPekerjaan from "../components/Caripekerjaan/FilterPekerjaan";
import PekerjaanCardFilter from "../components/Caripekerjaan/PekerjaanCardFilter";

export default function CariPekerjaanPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const handleFilter = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    try {
      let url = "http://localhost:5000/api/talenthub/Jobs";
      const params = new URLSearchParams();jobs

      if (filters.keyword) params.append("keyword", filters.keyword);
      if (filters.kategori) params.append("kategori", filters.kategori);
      if (filters.provinsi) params.append("provinsi", filters.provinsi);
      if (filters.gaji) params.append("gaji_min", filters.gaji);
      if ([...params].length > 0) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // fetch ulang saat filter berubah
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      fetchJobs(filters);
    }
  }, [filters]);

  return (
    <>
      <Navbar />
      <div className="w-[85%] mx-auto flex flex-col md:flex-row gap-10 mt-[100px] mb-20">
        <FilterPekerjaan onFilter={handleFilter} />
        {loading ? (
          <p className="flex-1 text-center mt-10 text-gray-500">
            Memuat data lowongan...
          </p>
        ) : (
          <PekerjaanCardFilter jobs={jobs} filters={filters} />
        )}
      </div>
      <Map />
      <Footer />
    </>
  );
}
