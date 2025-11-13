import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import JobDetailHeader from "../components/Detailpekerjaan/JobDetailHeader";
import JobDetailBody from "../components/Detailpekerjaan/JobDetailBody";
import JobDetailFooter from "../components/Detailpekerjaan/JobDetailFooter";
import TipsMenjagaDiri from "../components/Detailpekerjaan/TipsMenjagaDiri";
import CompanyInfoCard from "../components/Detailpekerjaan/CompanyInfoCard";
import Sidebar from "../components/Detailpekerjaan/Sidebar";
import LamarCard from "../components/Detailpekerjaan/LamarCard";
import Map from "../components/Map";
import Footer from "../components/Footer";

export default function DetailPekerjaanPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarkActive, setBookmarkActive] = useState(false);
  const [isShareActive, setShareActive] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  // ✅ Ambil data lowongan berdasarkan ID
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/talenthub/jobs/${id}`);
        const data = await res.json();
        const jobData = data.job || data;
        setJob(jobData);

        // Ambil semua job
        const relatedRes = await fetch(`http://127.0.0.1:5000/api/talenthub/jobs`);
        const relatedData = await relatedRes.json();

        const allJobs = relatedData.jobs || [];

        // ❗ Gunakan job_id bukan id
        const filtered = allJobs.filter((j) => j.job_id !== jobData.job_id);

        console.log("Job aktif:", jobData);
        console.log("Related jobs:", filtered);

        setRelatedJobs(filtered);
      } catch (e) {
        console.error("Gagal fetch data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);


  if (loading)
    return <p className="text-center mt-10 text-gray-500">Memuat detail...</p>;
  if (!job)
    return <p className="text-center mt-10 text-gray-500">Lowongan tidak ditemukan.</p>;

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 mt-[70px]">
        {/* Bagian Kiri */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <JobDetailHeader
            job={job}
            isBookmarkActive={isBookmarkActive}
            isShareActive={isShareActive}
            setBookmarkActive={setBookmarkActive}
            setShareActive={setShareActive}
            onLamar={() => setModalOpen(true)}
          />

          <JobDetailBody job={job} />
          <JobDetailFooter job={job} />
          <TipsMenjagaDiri />

          {/* ✅ Card Informasi Perusahaan (dari database) */}
          {company && <CompanyInfoCard company={company} />}
        </div>

        {/* Bagian Kanan */}
        <Sidebar job={job} relatedJobs={relatedJobs} navigate={navigate} />
      </div>

      {/* Modal Lamar */}
      <LamarCard isOpen={isModalOpen} onClose={() => setModalOpen(false)} job={job} />

      <Map />
      <Footer />
    </>
  );
}
