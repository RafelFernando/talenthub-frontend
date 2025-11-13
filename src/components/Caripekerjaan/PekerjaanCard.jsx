import React, { useEffect, useState } from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  Squares2X2Icon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function PekerjaanCard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/talenthub/jobs");
      if (!res.ok) throw new Error("Gagal mengambil data lowongan");
      const data = await res.json();
      console.log("DATA API:", data); // 🔍 Cek struktur data
      setJobs(data.jobs || data); // pastikan ini sesuai format API
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, []);


  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="w-full bg-gray-50 py-10 px-12 flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-blue-900 rounded-3xl p-5 flex flex-col justify-between gap-4 shadow-sm transform transition-transform duration-200 hover:-translate-y-1"
            >
              <Link
                key={job.job_id}
                to={`/pekerjaan/${job.job_id}`}
                className="block no-underline text-inherit"
              >
                <div className="flex items-center gap-4 mb-4 job-header">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center job-logo">
                    <img
                      src={job.company_logo || "/default-logo.png"}
                      alt={job.company_name || "Perusahaan"}
                      className="w-6 h-6 object-contain rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-blue-900 font-semibold text-lg mb-1">{job.title}</h3>
                    <p className="text-gray-900 text-sm flex items-center gap-1">
                      ini untuk nama perusahaan dan centang verified
                      {job.company_name}
                      {job.company_verified && (
                        <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
                      )}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex flex-wrap gap-2 text-sm job-info">
                {job.employment_type && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                    <BriefcaseIcon className="w-4 h-4 text-gray-600" /> {job.employment_type}
                  </span>
                )}
                {(job.location || job.job_type) && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                    <MapPinIcon className="w-4 h-4 text-gray-600" /> {job.job_type}{job.location}
                  </span>
                )}
                {job.experience && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                    <Squares2X2Icon className="w-4 h-4 text-gray-600" />{job.experience}
                  </span>
                )}
                {(job.salary_min || job.salary_max) && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                    <CurrencyDollarIcon className="w-4 h-4 text-gray-600" />
                    {job.salary_min ? `Rp ${job.salary_min.toLocaleString()}` : "-"}{" "}
                    {job.salary_max ? `- Rp ${job.salary_max.toLocaleString()}` : ""}{" "}
                    {job.salary_negotiable ? "(Nego)" : ""}
                  </span>
                )}
                {job.industry && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                    <BuildingOfficeIcon className="w-4 h-4 text-gray-600" /> {job.industry}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center text-base font-medium text-black-600 mt-4 job-footer">
                <div className="flex flex-col gap-1 job-footer-left">
                  <small>
                    Diposting {(() => {
                      const postDate = job.posted_at || job.created_at || job.tanggal_post;
                      if (!postDate) return "-";
                      const diff = Date.now() - new Date(postDate).getTime();
                      const minutes = Math.floor(diff / (1000 * 60));
                      const hours = Math.floor(diff / (1000 * 60 * 60));
                      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                      if (minutes < 1) return "baru saja";
                      if (minutes < 60) return `${minutes} menit yang lalu`;
                      if (hours < 24) return `${hours} jam yang lalu`;
                      return `${days} hari yang lalu`;
                    })()}
                  </small>

                  <strong className="text-gray-500 text-xs font-medium">
                    Lamar Sebelum{" "}
                    {job.deadline
                      ? new Date(job.deadline).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Belum ditentukan"}
                  </strong>
                </div>
                <button className="bg-blue-900 text-white px-4 py-2 rounded-2xl font-semibold transition-all duration-300 hover:bg-yellow-600 hover:text-white lamar-btn">
                  Lamar Cepat
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">Tidak ada lowongan yang cocok.</p>
        )}
      </div>
    </div>
  );
}