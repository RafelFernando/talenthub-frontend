# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
"# talenthub-frontend" 

# 💼 TalentHub Frontend — Platform Pencarian & Manajemen Pekerjaan

TalentHub adalah aplikasi web berbasis React.js + Vite yang dirancang untuk menghubungkan Job Seeker, Job Provider (Perusahaan), dan Admin dalam satu sistem terpadu.
Aplikasi ini memungkinkan pencarian pekerjaan, pengelolaan lowongan, pelacakan lamaran, serta manajemen akun dan laporan pengguna secara efisien.

#⚡ React + Vite

Proyek ini dibangun menggunakan Vite untuk kecepatan build dan pengembangan.

Vite menyediakan konfigurasi minimal agar React dapat berjalan dengan Hot Module Replacement (HMR) dan beberapa aturan ESLint bawaan.

Plugin yang Digunakan:

@vitejs/plugin-react
 → menggunakan Babel
 untuk Fast Refresh.

@vitejs/plugin-react-swc
 → menggunakan SWC
 untuk Fast Refresh.

Jika kamu mengembangkan aplikasi production, disarankan menggunakan TypeScript dengan aturan lint berbasis tipe.
Lihat template TypeScript resmi Vite
 dan panduan typescript-eslint
.
# 🚀 Teknologi yang Digunakan
| Kategori               | Teknologi                         |
| ---------------------- | --------------------------------- |
| **Frontend**           | React.js (Vite)                   |
| **Routing**            | React Router DOM                  |
| **Styling**            | Tailwind CSS / CSS Modules        |
| **Ikon**               | Lucide-react / React-icons        |
| **State Management**   | React Hooks (useState, useEffect) |
| **Layout Management**  | Custom Layout Components          |
| **Linting**            | ESLint                            |

src/
│
├── components/
│   ├── Admin/
│   │   ├── DashboardAdmin.jsx
│   │   ├── RolesAdmin.jsx
│   │   ├── JobProviderAdmin.jsx
│   │   ├── JobSeekerAdmin.jsx
│   │   ├── JobPostingAdmin.jsx
│   │   ├── FiturPremiumAdmin.jsx
│   │   ├── ReportAdmin.jsx
│   │   ├── LaporanUserAdmin.jsx
│   │   ├── NotifikasiAdmin.jsx
│   │   └── Layout/
│   │       └── AdminLayout.jsx
│   │
│   ├── provider/
│   │   ├── ProviderDashboard.jsx
│   │   ├── ProfilPerusahaan.jsx
│   │   ├── LowonganPekerjaan.jsx
│   │   ├── PelamarPekerjaan.jsx
│   │   ├── KebijakanPrivasi.jsx
│   │   ├── SyaratDanKetentuan.jsx
│   │   ├── layout/
│   │   │   └── ProviderLayout.jsx
│   │   └── Profil/
│   │       ├── EditDataDiri.jsx
│   │       └── EditKataSandi.jsx
│   │
│   ├── JobSeekerUser/
│   │   ├── DashboardSeeker.jsx
│   │   ├── CvSeeker.jsx
│   │   ├── LamaranSaya.jsx
│   │   ├── PekerjaanDisimpan.jsx
│   │   ├── Profil/
│   │   │   ├── EditDataDiri.jsx
│   │   │   ├── EditKataSandi.jsx
│   │   │   └── EditBiodata.jsx
│   │   └── Layout/
│   │       └── UserLayout.jsx
│
├── pages/
│   ├── BerandaPage.jsx
│   ├── CariPekerjaanPage.jsx
│   ├── KontakPage.jsx
│   ├── TentangPage.jsx
│   ├── DetailPekerjaanPage.jsx
│   ├── NotFoundPage.jsx
│   └── Auth/
│       ├── Login.jsx
│       └── Registrasi.jsx
│
├── App.jsx
└── main.jsx

