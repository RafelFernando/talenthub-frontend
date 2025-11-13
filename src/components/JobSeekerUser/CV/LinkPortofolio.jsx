import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LinkPortofolio() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [namaPortofolio, setNamaPortofolio] = useState("");
    const [linkPortofolio, setLinkPortofolio] = useState("");
    const [portfolios, setPortfolios] = useState([
        { nama: "YouTube", link: "https://youtube.com" },
        { nama: "MyPorto", link: "https://myporto.com" },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!namaPortofolio || !linkPortofolio) return;
        setPortfolios([
            ...portfolios,
            { nama: namaPortofolio, link: linkPortofolio },
        ]);
        setNamaPortofolio("");
        setLinkPortofolio("");
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Main Section */}
            <section className="bg-white p-8 mt-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Link Portofolio
                    </h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
                    >
                        <Plus size={18} /> Tambahkan Portofolio
                    </button>
                </div>

                <hr className="h-px bg-gray-300 border-0" />

                {/* Daftar Portofolio */}
                <div className="mt-4 flex flex-wrap gap-3">
                    {portfolios.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center px-4 py-2 border border-blue-500 text-blue-600 rounded-lg bg-white hover:bg-blue-500 hover:text-white transition duration-300 shadow-sm hover:shadow-md"
                        >
                            {item.nama}
                        </a>
                    ))}
                </div>
            </section>

            {/* Modal Form */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 30 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            {/* Header Modal */}
                            <div className="flex items-center justify-between p-6 border-b">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Tambahkan Portofolio
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Form Input */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Portofolio
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nama portofolio"
                                        value={namaPortofolio}
                                        onChange={(e) =>
                                            setNamaPortofolio(e.target.value)
                                        }
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Link Portofolio
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://contoh-link.com"
                                        value={linkPortofolio}
                                        onChange={(e) =>
                                            setLinkPortofolio(e.target.value)
                                        }
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Footer */}
                                <div className="flex justify-end gap-3 pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                    >
                                        BATAL
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                    >
                                        SIMPAN
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
