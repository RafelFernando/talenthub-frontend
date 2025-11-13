import React, { useState } from "react";
import { Edit2, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TambahRole from "./RolesAdmin/TambahRole";
import EditRole from "./RolesAdmin/EditRole";

export default function RolesAdmin() {
  const [roles, setRoles] = useState([
    { id: 1, nama: "Superadmin", email: "superadmin@mail.com", level: "admin", telepon: "+6281234567890", status: true },
    { id: 2, nama: "Romi", email: "romi@mail.com", level: "admin", telepon: "+6289988776655", status: true },
    { id: 3, nama: "Dewi", email: "dewi@mail.com", level: "moderator", telepon: "+6287772223344", status: false },
  ]);

  const [showTambah, setShowTambah] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [notif, setNotif] = useState({ show: false, msg: "", type: "success" });

  const handleToggleStatus = (id) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: !r.status } : r))
    );
  };

  const handleTambah = (newRole) => {
    setRoles((prev) => [...prev, { id: prev.length + 1, ...newRole }]);
    showNotif("Role berhasil ditambahkan!");
  };

  const handleEdit = (updated) => {
    setRoles((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    showNotif("Role berhasil diperbarui!");
  };

  const showNotif = (msg, type = "success") => {
    setNotif({ show: true, msg, type });
    setTimeout(() => setNotif({ show: false, msg: "", type }), 2000);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen relative">
      {/* 🔔 Notifikasi */}
      {notif.show && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white flex items-center gap-2 z-50 transition-all ${
            notif.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <span>✅</span>
          <span>{notif.msg}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h2 className="text-lg font-semibold text-[#193F7A]">
            Data Admin Role
          </h2>
          <button
            onClick={() => setShowTambah(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow text-sm"
          >
            <PlusCircle size={16} /> Tambah Data Role
          </button>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead>
              <tr className="bg-[#E84118] text-white text-left">
                <th className="px-3 py-2 border-r">No</th>
                <th className="px-3 py-2 border-r">Nama Lengkap</th>
                <th className="px-3 py-2 border-r">Email</th>
                <th className="px-3 py-2 border-r">Level</th>
                <th className="px-3 py-2 border-r">Telepon</th>
                <th className="px-3 py-2 border-r text-center">Status</th>
                <th className="px-3 py-2 text-center">Opsi</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r, i) => (
                <tr
                  key={r.id}
                  className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}
                >
                  <td className="px-3 py-2">{i + 1}</td>
                  <td className="px-3 py-2">{r.nama}</td>
                  <td className="px-3 py-2">{r.email}</td>
                  <td className="px-3 py-2 capitalize">{r.level}</td>
                  <td className="px-3 py-2">{r.telepon}</td>
                  <td className="px-3 py-2 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={r.status}
                        onChange={() => handleToggleStatus(r.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#193F7A] relative transition-all">
                        <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-full"></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-700">
                        {r.status ? "Aktif" : "Nonaktif"}
                      </span>
                    </label>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => {
                        setEditData(r);
                        setShowEdit(true);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition"
                    >
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 Modal Tambah */}
      <AnimatePresence>
        {showTambah && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl"
            >
              <TambahRole
                onClose={() => setShowTambah(false)}
                onSave={handleTambah}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Modal Edit */}
      <AnimatePresence>
        {showEdit && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl"
            >
              <EditRole
                data={editData}
                onClose={() => setShowEdit(false)}
                onSave={handleEdit}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
