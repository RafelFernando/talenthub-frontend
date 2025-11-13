import React, { useState } from "react";
import { Edit3, X, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillKeahlian() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [skills, setSkills] = useState([
        { skill: "Adobe Photoshop", level: "Beginner" },
        { skill: "Codeigniter", level: "Beginner" },
        { skill: "Hacking", level: "Professional" },
    ]);

    // buka/tutup modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // tambah skill baru
    const addSkill = () => {
        setSkills([...skills, { skill: "", level: "Beginner" }]);
    };

    // hapus skill tertentu
    const removeSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    // ubah isi form
    const handleChange = (index, field, value) => {
        const updated = [...skills];
        updated[index][field] = value;
        setSkills(updated);
    };

    const handleSave = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="bg-white p-8 mt-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-semibold text-gray-800">
                        Skill / Keahlian
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
                        {skills.map((item, i) => (
                            <li
                                key={i}
                                className="px-4 py-2 border border-blue-500 text-blue-600 text-sm rounded-lg bg-white hover:bg-blue-500 hover:text-white transition duration-300 cursor-pointer"
                            >
                                {item.skill} — {item.level}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Modal box */}
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
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 30 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Edit Skill / Keahlian
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
                                {skills.map((item, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Skill
                                            </label>
                                            <input
                                                type="text"
                                                value={item.skill}
                                                onChange={(e) =>
                                                    handleChange(
                                                        index,
                                                        "skill",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Masukkan skill..."
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Level
                                            </label>
                                            <select
                                                value={item.level}
                                                onChange={(e) =>
                                                    handleChange(
                                                        index,
                                                        "level",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            >
                                                <option>Beginner</option>
                                                <option>Intermediate</option>
                                                <option>Professional</option>
                                            </select>
                                        </div>

                                        <div className="flex gap-2 mb-1">
                                            <button
                                                onClick={() => removeSkill(index)}
                                                className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-md"
                                            >
                                                <Minus size={18} />
                                            </button>
                                            {index === skills.length - 1 && (
                                                <button
                                                    onClick={addSkill}
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
