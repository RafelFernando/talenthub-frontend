import React, { useState } from "react";
import { Edit3, Upload, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FileCv() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setIsUploading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsUploading(false);
        setIsModalOpen(false);
        setSelectedFile(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFile(null);
        setIsDragging(false);
    };

    return (
        <>
            <div className="container bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <span className="flex-1 text-center text-xl font-semibold text-gray-800 pb-2 border-gray-200">
                        File CV
                    </span>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
                    >
                        <Edit3 size={18} /> Edit
                    </button>
                </div>

                <hr className="h-px bg-gray-300 border-0" />
                <div className="mt-7 flex w-full gap-3">
                    <a
                        href="#"
                        className="flex-1 text-[15px] bg-red-700 text-white py-3 text-center rounded-[5px] hover:bg-red-800 transition"
                    >
                        File CV Terupload
                    </a>
                    <a
                        href="#"
                        className="flex-1 text-[15px] bg-blue-700 text-white py-3 text-center rounded-[5px] hover:bg-blue-800 transition"
                    >
                        Unduh PDF
                    </a>
                </div>
            </div>

            {/* Modal dengan animasi */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <Upload className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        Upload File CV
                                    </h3>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                                        isDragging
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-300 bg-gray-50"
                                    }`}
                                >
                                    <input
                                        type="file"
                                        id="fileInput"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />

                                    {selectedFile ? (
                                        <div className="space-y-4">
                                            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                                                <FileText className="w-10 h-10 text-blue-600" />
                                                <div className="flex-1 text-left">
                                                    <p className="font-medium text-gray-800 truncate">
                                                        {selectedFile.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {(selectedFile.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => setSelectedFile(null)}
                                                    className="text-red-500 hover:text-red-700 p-2"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                            <p className="text-lg font-medium text-gray-700 mb-2">
                                                Drag & Drop file di sini
                                            </p>
                                            <p className="text-sm text-gray-500 mb-4">atau</p>
                                            <label
                                                htmlFor="fileInput"
                                                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition"
                                            >
                                                Pilih File
                                            </label>
                                            <p className="text-xs text-gray-400 mt-4">
                                                Format: PDF, DOC, DOCX (Max 5MB)
                                            </p>
                                        </>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleUpload}
                                        disabled={!selectedFile || isUploading}
                                        className={`flex-1 px-4 py-3 font-medium rounded-lg transition ${
                                            selectedFile && !isUploading
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                    >
                                        {isUploading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Mengupload...
                                            </span>
                                        ) : (
                                            "Upload"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
