export default function JobDetailBody({ job }) {
  // Ubah string dengan newline jadi array
  const descriptionList = typeof job.description === "string"
    ? job.description.split("\n").filter(line => line.trim() !== "")
    : job.description;

  const qualificationList = typeof job.requirements === "string"
    ? job.requirements.split("\n").filter(line => line.trim() !== "")
    : job.requirements;

  const nilaiTambahList = typeof job.detail?.nilai_tambah === "string"
    ? job.detail.nilai_tambah.split("\n").filter(line => line.trim() !== "")
    : job.detail?.nilai_tambah;

  return (
    <div className="bg-gray-50 p-6 rounded-2xl border mt-6">
      {/* Deskripsi Pekerjaan */}
      <h3 className="text-lg font-semibold mb-2">Deskripsi Pekerjaan</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {Array.isArray(descriptionList)
          ? descriptionList.map((item, i) => <li key={i}>{item}</li>)
          : <li>-</li>}
      </ul>

      {/* Kualifikasi */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Kualifikasi</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {Array.isArray(qualificationList)
          ? qualificationList.map((item, i) => <li key={i}>{item}</li>)
          : <li>-</li>}
      </ul>

      {/* Nilai Tambah */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Nilai Tambah</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {Array.isArray(nilaiTambahList)
          ? nilaiTambahList.map((item, i) => <li key={i}>{item}</li>)
          : <li>-</li>}
      </ul>

      {/* Penempatan */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Penempatan</h3>
      <p className="text-gray-700">{job.location ?? "-"}</p>
    </div>
  );
}
