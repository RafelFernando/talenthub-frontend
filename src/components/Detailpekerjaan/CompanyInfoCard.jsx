import { CheckCircleIcon, BriefcaseIcon, UserGroupIcon, StarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function CompanyInfoCard({ company }) {
  if (!company) return <p className="mt-6 text-gray-500">Informasi perusahaan tidak tersedia.</p>;

  return (
    <div className="border p-6 rounded-2xl mt-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img src={company.logoUrl} alt={company.perusahaan} className="w-20" />
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-1">
              {company.perusahaan}
              {company.companyVerified === "true" && <CheckCircleIcon className="w-5 h-5 text-blue-500" />}
            </h3>
          </div>
        </div>
        <a href={company.link} target="_blank" rel="noopener noreferrer" className="text-[#193F7A] text-sm font-semibold flex items-center gap-1">
          Selengkapnya <ChevronRightIcon className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <div className="flex items-center gap-1 mb-1">
          <StarIcon className="w-5 h-5 text-yellow-500" />
          <span>{company.rating.score}/5 ({company.rating.reviews} ulasan)</span>
        </div>
        <p className="flex items-center gap-1"><BriefcaseIcon className="w-4 h-4"/> {company.industri}</p>
        <p className="flex items-center gap-1"><UserGroupIcon className="w-4 h-4"/> {company.karyawan}</p>
        <p className="mt-2">{company.deskripsi}</p>
      </div>
    </div>
  );
}
