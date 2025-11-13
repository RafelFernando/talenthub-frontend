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


---

## 🧭 Routing Aplikasi

Aplikasi menggunakan **React Router DOM** dengan sistem multi-role.  
Berikut pembagian route berdasarkan role:

---

### 🏠 **Umum (Public)**

| Path | Komponen |
|------|-----------|
| `/` | BerandaPage |
| `/CariPekerjaan` | CariPekerjaanPage |
| `/Tentang` | TentangPage |
| `/Kontak` | KontakPage |
| `/pekerjaan/:id` | DetailPekerjaanPage |
| `/Auth/Registrasi` | Registrasi |
| `/Auth/Login` | Login |
| `*` | NotFoundPage |

---

### 🔐 **Admin**

Semua halaman admin dibungkus dengan **`<AdminLayout>`**.

| Path | Komponen |
|------|-----------|
| `/Admin` | AdminLogin |
| `/Admin/Dashboard` | DashboardAdmin |
| `/Admin/Roles` | RolesAdmin |
| `/Admin/JobProvider` | JobProviderAdmin |
| `/Admin/JobSeeker` | JobSeekerAdmin |
| `/Admin/JobPosting` | JobPostingAdmin |
| `/Admin/FiturPremium` | FiturPremiumAdmin |
| `/Admin/ReportAdmin` | ReportAdmin |
| `/Admin/LaporanUser` | LaporanUserAdmin |
| `/Admin/Notifikasi` | NotifikasiAdmin |

---

### 🏢 **Job Provider (Perusahaan)**

Semua halaman provider dibungkus dengan **`<ProviderLayout>`**.

| Path | Komponen |
|------|-----------|
| `/Provider/Dashboard` | ProviderDashboard |
| `/Provider/ProfilPerusahaan` | ProfilPerusahaan |
| `/Provider/LowonganPekerjaan` | LowonganPekerjaan |
| `/Provider/PelamarPekerjaan` | PelamarPekerjaan |
| `/Provider/EditDataDiri` | EditDataDiri |
| `/Provider/EditKataSandi` | EditKataSandi |
| `/Provider/KebijakanPrivasi` | KebijakanPrivasi |
| `/Provider/SyaratKetentuan` | SyaratDanKetentuan |

---

### 👤 **Job Seeker (Pencari Kerja)**

Semua halaman seeker dibungkus dengan **`<UserLayout>`**.

| Path | Komponen |
|------|-----------|
| `/Seeker/Dashboard` | DashboardSeeker |
| `/Seeker/CV` | CvSeeker |
| `/Seeker/LamaranSaya` | LamaranSaya |
| `/Seeker/PekerjaanDisimpan` | PekerjaanDisimpan |
| `/Seeker/EditDataDiri` | EditDataDiriSeeker |
| `/Seeker/EditKataSandi` | EditKataSandiSeeker |
| `/Seeker/EditBiodata` | EditBiodata |
| `/Seeker/KebijakanPrivasi` | KebijakanPrivasi |
| `/Seeker/SyaratKetentuan` | SyaratDanKetentuan |

---

