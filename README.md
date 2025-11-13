# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
"# talenthub-frontend" 

# 💼 JobFinder — Platform Pencarian & Manajemen Pekerjaan

JobFinder adalah aplikasi web berbasis **React.js** yang menghubungkan **Job Seeker**, **Job Provider (Perusahaan)**, dan **Admin** dalam satu sistem terpadu.  
Aplikasi ini menyediakan fitur pencarian pekerjaan, manajemen lowongan, profil perusahaan, lamaran kerja, serta dashboard admin untuk pengawasan dan pelaporan.

---

## 🚀 Teknologi yang Digunakan

| Kategori | Teknologi |
|-----------|------------|
| Frontend | React.js |
| Routing | React Router DOM |
| Styling | TailwindCSS / Bootstrap (opsional) |
| Ikon | Lucide-react / React-icons |
| State Management | React Hooks (useState, useEffect) |
| Backend (opsional) | Node.js / Flask / Laravel |

---

## 📁 Struktur Folder
src/
│
├── components/
│ ├── Admin/
│ │ ├── DashboardAdmin.jsx
│ │ ├── RolesAdmin.jsx
│ │ ├── JobProviderAdmin.jsx
│ │ ├── JobSeekerAdmin.jsx
│ │ ├── JobPostingAdmin.jsx
│ │ ├── FiturPremiumAdmin.jsx
│ │ ├── ReportAdmin.jsx
│ │ ├── LaporanUserAdmin.jsx
│ │ ├── NotifikasiAdmin.jsx
│ │ └── Layout/
│ │ └── AdminLayout.jsx
│ │
│ ├── provider/
│ │ ├── ProviderDashboard.jsx
│ │ ├── ProfilPerusahaan.jsx
│ │ ├── LowonganPekerjaan.jsx
│ │ ├── PelamarPekerjaan.jsx
│ │ ├── KebijakanPrivasi.jsx
│ │ ├── SyaratDanKetentuan.jsx
│ │ ├── layout/
│ │ │ └── ProviderLayout.jsx
│ │ └── Profil/
│ │ ├── EditDataDiri.jsx
│ │ └── EditKataSandi.jsx
│ │
│ ├── JobSeekerUser/
│ │ ├── DashboardSeeker.jsx
│ │ ├── CvSeeker.jsx
│ │ ├── LamaranSaya.jsx
│ │ ├── PekerjaanDisimpan.jsx
│ │ ├── Profil/
│ │ │ ├── EditDataDiri.jsx
│ │ │ ├── EditKataSandi.jsx
│ │ │ └── EditBiodata.jsx
│ │ └── Layout/
│ │ └── UserLayout.jsx
│
├── pages/
│ ├── BerandaPage.jsx
│ ├── CariPekerjaanPage.jsx
│ ├── KontakPage.jsx
│ ├── TentangPage.jsx
│ ├── DetailPekerjaanPage.jsx
│ ├── NotFoundPage.jsx
│ └── Auth/
│ ├── Login.jsx
│ └── Registrasi.jsx
│
├── App.jsx
└── main.jsx

