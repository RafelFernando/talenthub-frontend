import React, { useState } from "react";
import { Edit3, X, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Bahasa() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [languages, setLanguages] = useState([
        { bahasa: "Indonesia" },
        { bahasa: "English" },
        { bahasa: "Japan" },
    ]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addLanguage = () => {
        setLanguages([...languages, { bahasa: "" }]);
    };

    const removeLanguage = (index) => {
        setLanguages(languages.filter((_, i) => i !== index));
    };

    const handleChange = (index, value) => {
        const updated = [...languages];
        updated[index].bahasa = value;
        setLanguages(updated);
    };

    const handleSave = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Kartu Bahasa */}
            <div className="bg-white p-8 mt-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-semibold text-gray-800">
                        Bahasa yang Dikuasai
                    </span>
                    <button
                        onClick={openModal}
                        className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
                    >
                        <Edit3 size={18} /> Edit
                    </button>
                </div>
                <hr className="h-px bg-gray-300 border-0" />
                <div className="mt-4">
                    <ul className="flex flex-wrap gap-3">
                        {languages.map((item, i) => (
                            <li
                                key={i}
                                className="px-4 py-2 border border-blue-500 text-blue-600 text-sm rounded-lg bg-white hover:bg-blue-500 hover:text-white transition duration-300 cursor-pointer"
                            >
                                {item.bahasa}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Modal Box */}
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
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 30 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Edit Bahasa yang Dikuasai
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-4">
                                {languages.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-end gap-3"
                                    >
                                        <div className="w-full">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Bahasa
                                            </label>
                                            <input
                                                type="text"
                                                value={item.bahasa}
                                                onChange={(e) =>
                                                    handleChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Masukkan bahasa..."
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            />
                                        </div>

                                        <div className="flex gap-2 mb-1">
                                            <button
                                                onClick={() =>
                                                    removeLanguage(index)
                                                }
                                                className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-md"
                                            >
                                                <Minus size={18} />
                                            </button>
                                            {index === languages.length - 1 && (
                                                <button
                                                    onClick={addLanguage}
                                                    className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-md"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 p-6 border-t">
                                <button
                                    onClick={closeModal}
                                    className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                >
                                    BATAL
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                >
                                    UBAH
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
