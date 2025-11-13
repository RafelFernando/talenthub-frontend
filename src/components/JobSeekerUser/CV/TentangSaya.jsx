import React, { useState } from "react";
import { Edit3, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TentangSaya() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deskripsi, setDeskripsi] = useState("Ini deskripsi saya");

    const [tempDeskripsi, setTempDeskripsi] = useState(deskripsi);

    const handleSave = () => {
        setDeskripsi(tempDeskripsi);
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTempDeskripsi(deskripsi);
    };

    return (
        <>
            <div className="bg-white p-8 mt-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-semibold text-gray-800">
                        Tentang Saya
                    </span>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
                    >
                        <Edit3 size={18} /> Edit
                    </button>
                </div>

                <hr className="h-px bg-gray-300 border-0" />

                <div className="mt-4 text-gray-700 leading-relaxed">
                    {deskripsi}
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
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 30 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Edit Tentang Saya
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                <label
                                    htmlFor="deskripsi"
                                    className="block text-xl font-medium text-gray-700 mb-2"
                                >
                                    Deskripsi
                                </label>
                                <textarea
                                    id="deskripsi"
                                    rows="5"
                                    value={tempDeskripsi}
                                    onChange={(e) => setTempDeskripsi(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
                                    placeholder="Tulis deskripsi tentang diri Anda..."
                                ></textarea>

                                {/* Footer */}
                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Simpan
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
