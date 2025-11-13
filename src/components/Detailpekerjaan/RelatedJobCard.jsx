import {
  BookmarkIcon,
  MapPinIcon,
  BriefcaseIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export default function RelatedJobCard({ related, navigate }) {
  return (
    <div
      key={related.id}
      onClick={() => navigate(`/pekerjaan/${related.job_id}`)}
      className="border p-4 rounded-xl mb-3 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex justify-between items-center gap-3">
        {related.company_logo ? (
          <img
            src={related.company_logo}
            alt={related.company_name}
            className="w-10 h-10 rounded-md object-contain"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-md">
            {related.company_name?.[0] || "?"}
          </div>
        )}
        <div className="flex-1">
          <p className="font-semibold text-sm">{related.title}</p>
          <p className="text-gray-600 text-xs">{related.company_name}</p>
        </div>
        <BookmarkIcon className="w-5 h-5 text-gray-500" />
      </div>

      <div className="text-xs text-gray-600 mt-2 space-y-1">
        <p>
          <MapPinIcon className="inline w-4 h-4 mr-1" />
          {related.job_type || "Penuh Waktu"} • {related.location || "Tidak diketahui"}
        </p>
        <p>
          <BriefcaseIcon className="inline w-4 h-4 mr-1" />
          {related.experience || "Semua level"}
        </p>
        <p>
          <UserIcon className="inline w-4 h-4 mr-1" />
          {related.employment_type || "Kontrak"}
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Lamar sebelum{" "}
        {related.deadline
          ? new Date(related.deadline).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "Belum ditentukan"}
      </p>
    </div>
  );
}
