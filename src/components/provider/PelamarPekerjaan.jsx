import { useState } from 'react';
import { MapPin, Download, MessageCircle, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Mail, Phone } from 'lucide-react';

export default function PelamarPekerjaan() {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(2);
    const [showModal, setShowModal] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [assessment, setAssessment] = useState('Assessment');

    const jobCards = [
        { id: 1, title: 'Test posting lowongan', location: 'Sukoharjo' },
        { id: 2, title: 'Makan nasi padang', location: 'Sukoharjo' },
        { id: 3, title: 'Data Analysis', location: 'Sukoharjo' },
    ];

    const allApplicants = [
        {
            id: 1,
            name: 'REFI AHMAD FAUZI',
            jobId: 2,
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
            cv: 'CV_Refi_Ahmad.pdf',
            phone: '+6289900741799',
            email: 'schenariafahmad@gmail.com',
            location: 'Ciamis - Jawa Barat',
            status: 'Accepted',
            date: '15 Sep 2025, 11:17:33',
            fullName: 'Refi Ahmad Fauzi',
            nik: '3207090512990002',
            birthPlace: 'Ciamis, 1999-12-05',
            education: 'SMK N 1 Kawali',
            address: 'Desa Winduraja',
            skills: ['Adobe Photoshop - Beginner', 'Codeigniter - Beginner', 'Hacking - Professional']
        },
        {
            id: 2,
            name: 'BUDI SANTOSO',
            jobId: 2,
            photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
            cv: 'CV_Budi_Santoso.pdf',
            phone: '+6281234567890',
            email: 'budi.santoso@gmail.com',
            location: 'Bandung - Jawa Barat',
            status: 'Pending',
            date: '14 Sep 2025, 10:30:15',
            fullName: 'Budi Santoso',
            nik: '3273011234567890',
            birthPlace: 'Bandung, 1995-05-15',
            education: 'Universitas Padjajaran',
            address: 'Jl. Soekarno Hatta No. 456',
            skills: ['React - Advanced', 'Node.js - Intermediate', 'UI/UX Design - Beginner']
        },
        {
            id: 3,
            name: 'SITI NURHALIZA',
            jobId: 2,
            photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
            cv: 'CV_Siti_Nurhaliza.pdf',
            phone: '+6287654321098',
            email: 'siti.nurhaliza@gmail.com',
            location: 'Jakarta - DKI Jakarta',
            status: 'Rejected',
            date: '13 Sep 2025, 09:15:42',
            fullName: 'Siti Nurhaliza',
            nik: '3171234567890123',
            birthPlace: 'Jakarta, 1997-08-20',
            education: 'Universitas Indonesia',
            address: 'Jl. Sudirman No. 789',
            skills: ['Data Analysis - Professional', 'Python - Advanced', 'Machine Learning - Intermediate']
        },
    ];

    const filteredApplicants = allApplicants.filter(applicant => {
        const matchesJob = selectedJob ? applicant.jobId === selectedJob : true;
        const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || applicant.status.toLowerCase() === filterStatus;
        return matchesJob && matchesSearch && matchesStatus;
    });

    const totalEntries = filteredApplicants.length;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);
    const currentApplicants = filteredApplicants.slice(startIndex, endIndex);

    const handleFirstPage = () => setCurrentPage(1);
    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const handleLastPage = () => setCurrentPage(totalPages);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'accepted': return 'bg-green-100 text-green-700 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const handleOpenModal = (applicant) => {
        setSelectedApplicant(applicant);
        setShowModal(true);
        setAssessment('Assessment');
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedApplicant(null);
    };

    const handleSave = () => {
        console.log('Saving assessment:', assessment, 'for', selectedApplicant?.name);
        handleCloseModal();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-2xl font-semibold text-gray-700">Pelamar Pekerjaan</h1>
                </div>

                {/* Job Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {jobCards.map((job) => (
                        <div
                            key={job.id}
                            onClick={() => setSelectedJob(job.id)}
                            className={`bg-white rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                selectedJob === job.id
                                    ? 'ring-2 ring-red-500 shadow-md'
                                    : 'shadow hover:shadow-md'
                            }`}
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                {job.title}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-5 h-5 text-red-500" />
                                <span className="text-sm">{job.location}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Tampilkan</span>
                            <select
                                value={entriesPerPage}
                                onChange={(e) => {
                                    setEntriesPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                            <span className="text-sm text-gray-600">entri</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Filter Status:</span>
                            <select
                                value={filterStatus}
                                onChange={(e) => {
                                    setFilterStatus(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value="all">Show All</option>
                                <option value="accepted">Accepted</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Cari:</span>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-48"
                                placeholder="Cari nama..."
                            />
                        </div>
                    </div>
                </div>

                {/* Applicants List */}
                <div className="space-y-4 mb-6">
                    {currentApplicants.length > 0 ? (
                        currentApplicants.map((applicant) => (
                            <div
                                key={applicant.id}
                                className="bg-white rounded-lg shadow-sm border-l-4 border-green-500 p-5 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex gap-4 flex-1">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={applicant.photo}
                                                alt={applicant.name}
                                                className="w-20 h-20 rounded-lg object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-bold text-red-600 mb-2">
                                                {applicant.name}
                                            </h3>

                                            <div className="space-y-1.5 mb-3">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="font-medium text-gray-700">Download CV</span>
                                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                                                        {applicant.phone}
                                                    </span>
                                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                                                        {applicant.email}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{applicant.location}</span>
                                                </div>

                                                <div className="flex items-center gap-3 text-sm">
                                                    <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${getStatusColor(applicant.status)}`}>
                                                        {applicant.status}
                                                    </span>
                                                    <span className="text-gray-500">{applicant.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleOpenModal(applicant)}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm font-medium transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Cek
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <div className="text-gray-400 mb-2">
                                <MapPin className="w-12 h-12 mx-auto" />
                            </div>
                            <p className="text-gray-600 font-medium">Tidak ada data yang sesuai</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-600">
                            Menampilkan {totalEntries > 0 ? startIndex + 1 : 0} sampai {endIndex} dari {totalEntries} entri
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleFirstPage}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="Halaman Pertama"
                            >
                                <ChevronsLeft className="w-4 h-4" />
                            </button>

                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="Sebelumnya"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <div className="px-4 py-1.5 bg-blue-500 text-white rounded font-medium text-sm min-w-[60px] text-center">
                                {currentPage}
                            </div>

                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="Selanjutnya"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={handleLastPage}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="Halaman Terakhir"
                            >
                                <ChevronsRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Detail Pelamar */}
            {showModal && selectedApplicant && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/5 backdrop-blur-sm animate-fadeIn"
                        onClick={handleCloseModal}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                            <h2 className="text-2xl font-bold text-gray-800">Detail Pelamar</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Photo */}
                                <div className="md:col-span-1">
                                    <img
                                        src={selectedApplicant.photo}
                                        alt={selectedApplicant.name}
                                        className="w-full h-64 object-cover rounded-xl shadow-lg"
                                    />
                                </div>

                                {/* Details */}
                                <div className="md:col-span-2 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Nama Lengkap</label>
                                            <p className="text-gray-800 font-medium">{selectedApplicant.fullName}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">NIK</label>
                                            <p className="text-gray-800 font-medium">{selectedApplicant.nik}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Tempat, Tanggal Lahir</label>
                                            <p className="text-gray-800 font-medium">{selectedApplicant.birthPlace}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Email</label>
                                            <p className="text-gray-800 font-medium">{selectedApplicant.email}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">No Telp</label>
                                            <p className="text-gray-800 font-medium">{selectedApplicant.phone}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Pendidikan Terakhir</label>
                                            <p className="text-gray-800 font-medium">{selectedApplicant.education}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Alamat</label>
                                            <p className="text-gray-800 font-medium">{selectedApplicant.address}</p>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div>
                                        <label className="text-sm text-gray-500 mb-2 block">Keahlian</label>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedApplicant.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Assessment */}
                            <div className="mt-6">
                                <label className="text-sm text-gray-500 mb-2 block">Pilih</label>
                                <select
                                    value={assessment}
                                    onChange={(e) => setAssessment(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                >
                                    <option value="Assessment">Assessment</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                            >
                                Simpan
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Animasi CSS */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(20px) scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }

                .animate-slideUp {
                    animation: slideUp 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}