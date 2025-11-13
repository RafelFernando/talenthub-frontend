import React, { useState } from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function PekerjaanCardFilter({ jobs = [], filters }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔍 Filter berdasarkan pencarian
  let filteredJobs = jobs.filter((job) => {
    const title = job.title?.toLowerCase() || "";
    const employer = job.users?.full_name?.toLowerCase() || "";
    return (
      title.includes(searchTerm.toLowerCase()) ||
      employer.includes(searchTerm.toLowerCase())
    );
  });

  // 🔧 Filter tambahan berdasarkan input FilterPekerjaan
  if (filters) {
    const { sort, kategori, provinsi, kota, gaji } = filters;

    if (kategori)
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.job_categories?.name?.toLowerCase() === kategori.toLowerCase()
      );

    if (provinsi)
      filteredJobs = filteredJobs.filter((job) =>
        job.location?.toLowerCase().includes(provinsi.toLowerCase())
      );

    if (kota)
      filteredJobs = filteredJobs.filter((job) =>
        job.location?.toLowerCase().includes(kota.toLowerCase())
      );

    if (gaji)
      filteredJobs = filteredJobs.filter(
        (job) => parseInt(job.salary_min || 0) >= parseInt(gaji)
      );

    if (sort === "terbaru")
      filteredJobs.sort(
        (a, b) => new Date(b.posted_at) - new Date(a.posted_at)
      );
    else if (sort === "terlama")
      filteredJobs.sort(
        (a, b) => new Date(a.posted_at) - new Date(b.posted_at)
      );
  }

  // 📄 Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = filteredJobs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full bg-gray-50 py-10 px-4 flex flex-col">
      {/* 🔎 Input Pencarian */}
      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Cari lowongan..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
        />
      </div>

      {/* 🧾 Daftar Job */}
      <div className="flex flex-col gap-6 w-full">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <div
              key={job.job_id}
              className="bg-white border border-blue-900 rounded-3xl p-5 flex flex-col justify-between gap-4 shadow-sm transform transition-transform duration-200 hover:-translate-y-1"
            >
              <Link
                to={`/pekerjaan/${job.job_id}`}
                className="block no-underline text-inherit"
              >
                <div className="flex items-center gap-4 mb-4 job-header">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center job-logo">
                    <img
                      src={
                        job.users?.profile_picture || "/default-logo.png"
                      }
                      alt={job.users?.full_name || "Perusahaan"}
                      className="w-6 h-6 object-contain rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-blue-900 font-semibold text-lg mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-900 text-sm flex items-center gap-1">
                      {job.users?.full_name || "Perusahaan"}{" "}
                      <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex flex-wrap gap-2 text-sm job-info">
                {job.employment_type && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                    <BriefcaseIcon className="w-4 h-4 text-gray-600" />{" "}
                    {job.employment_type}
                  </span>
                )}
                {job.location && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                    <MapPinIcon className="w-4 h-4 text-gray-600" />{" "}
                    {job.location}
                  </span>
                )}
                {(job.salary_min || job.salary_max) && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                    <CurrencyDollarIcon className="w-4 h-4 text-gray-600" />
                    {job.salary_min
                      ? `Rp ${parseInt(job.salary_min).toLocaleString()}`
                      : "-"}{" "}
                    {job.salary_max
                      ? `- Rp ${parseInt(job.salary_max).toLocaleString()}`
                      : ""}
                  </span>
                )}
                {job.job_categories?.name && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                    <BuildingOfficeIcon className="w-4 h-4 text-gray-600" />{" "}
                    {job.job_categories.name}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center text-base font-medium text-black-600 mt-4 job-footer">
                <div className="flex flex-col gap-1 job-footer-left">
                  <small>
                    Diposting{" "}
                    {job.posted_at
                      ? new Date(job.posted_at).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "-"}
                  </small>
                  <strong className="text-gray-500 text-xs font-medium">
                    Lamar Sebelum{" "}
                    {job.deadline
                      ? new Date(job.deadline).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "Belum ditentukan"}
                  </strong>
                </div>
                <button className="bg-blue-900 text-white px-4 py-2 rounded-2xl font-semibold transition-all duration-300 hover:bg-yellow-600 hover:text-white">
                  Lamar Cepat
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Tidak ada lowongan yang cocok.
          </p>
        )}
      </div>
    </div>
  );
}
