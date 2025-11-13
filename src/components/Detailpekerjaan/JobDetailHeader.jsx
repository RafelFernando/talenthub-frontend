import { UserIcon, MapPinIcon, BriefcaseIcon, CurrencyDollarIcon, CheckCircleIcon, BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline";

export default function JobDetailHeader({ job, isBookmarkActive, isShareActive, setBookmarkActive, setShareActive, onLamar }) {
  return (
    <div className="flex flex-col gap-6 p-6 border rounded-2xl bg-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          {job.logoUrl ? (
            <img src={job.logoUrl} alt={job.perusahaan} className="w-16 h-16 rounded-lg object-contain" />
          ) : (
            <div className="w-16 h-16 bg-gray-200 flex justify-center items-center rounded-lg font-bold">
              {job.perusahaan?.[0] ?? "?"}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-700 font-medium"> ini untuk nama perusahaan
              {job.perusahaan}{" "}
              {job.companyVerified && <CheckCircleIcon className="inline w-5 h-5 text-blue-500 ml-1" />}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setBookmarkActive(!isBookmarkActive)}
            className={`p-3 rounded-full border ${isBookmarkActive ? "border-orange-500 text-orange-500" : "border-gray-400 text-gray-600"} transition`}
          >
            <BookmarkIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShareActive(!isShareActive)}
            className={`p-3 rounded-full border ${isShareActive ? "bg-blue-600 text-white border-blue-600" : "border-gray-400 text-gray-600"} transition`}
          >
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        {job.employment_type && <span className="bg-blue-100 px-3 py-1 rounded-lg flex items-center gap-1"><UserIcon className="w-4 h-4"/> {job.employment_type}</span>}
        {job.location && <span className="bg-blue-100 px-3 py-1 rounded-lg flex items-center gap-1"><MapPinIcon className="w-4 h-4"/> {job.location}</span>}
        {job.experience && <span className="bg-blue-100 px-3 py-1 rounded-lg flex items-center gap-1"><BriefcaseIcon className="w-4 h-4"/> {job.experience}</span>}
        {job.salary_min && <span className="bg-blue-100 px-3 py-1 rounded-lg flex items-center gap-1"><CurrencyDollarIcon className="w-4 h-4"/> {job.salary_min}</span>}
        <button 
          onClick={onLamar}
          className="ml-auto bg-[#193F7A] text-white px-4 py-2 rounded-lg hover:bg-[#162f5c]"
        >
          Lamar Cepat
        </button>
      </div>
    </div>
  );
}
