import React, { useEffect, useState } from "react";
import PekerjaanCardFilter from "./PekerjaanCardFilter";

export default function DaftarPekerjaan() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/talenthub/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs || []))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div className="w-full md:w-3/4 px-5">
      <div className="flex justify-between items-center mb-5">
        <div>
          <label className="mr-2 text-gray-700 font-medium">Tampilkan</label>
          <select className="border rounded-md px-3 py-2">
            <option>10</option>
            <option>20</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Cari Lowongan"
          className="border rounded-md px-3 py-2 w-64"
        />
      </div>

      {jobs.length > 0 ? (
        jobs.map((job) => <PekerjaanCardFilter key={job.job_id} job={job} />)
      ) : (
        <p className="text-gray-500 text-center">Tidak ada lowongan tersedia.</p>
      )}
    </div>
  );
}
