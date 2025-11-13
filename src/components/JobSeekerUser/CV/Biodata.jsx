import React from "react";
import { Edit3 } from "lucide-react";

export default function Biodata() {
    return (
        <div className="bg-white p-8 flex flex-col md:flex-row gap-8 items-start">
            {/* Foto Profil */}
            <div className="flex-shrink-0">
                <img
                    src="/albert.jpg"
                    alt="Albertus Rafel Fernando"
                    className="w-40 h-40 object-cover rounded-xl border-4 border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                />
            </div>

            {/* Biodata */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-9">
                    <h2 className="text-2xl font-semibold text-gray-800 pb-2 border-gray-200">
                        Biodata
                    </h2>

                    <a
                        href="/Seeker/EditBiodata"
                        className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
                    >
                        <Edit3 size={18} /> Edit
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">NIK</p>
                        <p className="font-semibold text-gray-800">3275023405670001</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 font-medium">Nama Lengkap</p>
                        <p className="font-semibold text-gray-800">
                            Albertus Rafel Fernando
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 font-medium">
                            Tempat, Tanggal Lahir
                        </p>
                        <p className="font-semibold text-gray-800">
                            Bandung, 12 Juni 2002
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 font-medium">Jenis Kelamin</p>
                        <p className="font-semibold text-gray-800">Laki-laki</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 font-medium">Agama</p>
                        <p className="font-semibold text-gray-800">Islam</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 font-medium">Pendidikan</p>
                        <p className="font-semibold text-gray-800">SMA/SLTA/SMA</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
