import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BerandaPage from "./pages/BerandaPage";
import CariPekerjaanPage from "./pages/CariPekerjaanPage";
import KontakPage from "./pages/KontakPage";
import TentangPage from "./pages/TentangPage";
import DetailPekerjaanPage from "./pages/DetailPekerjaanPage";
import Registrasi from "./pages/Auth/Registrasi";
import Login from "./pages/Auth/Login";
import NotFoundPage from "./pages/NotFoundPage";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./components/Admin/Layout/AdminLayout";
import DashboardAdmin from "./components/Admin/DashboardAdmin";
import RolesAdmin from "./components/Admin/RolesAdmin";
import JobProviderAdmin from "./components/Admin/JobProviderAdmin";
import JobSeekerAdmin from './components/Admin/JobSeekerAdmin';
import JobPostingAdmin from './components/Admin/JobPostingAdmin';
import FiturPremiumAdmin from './components/Admin/FiturPremiumAdmin';
import ReportAdmin from './components/Admin/ReportAdmin';
import LaporanUserAdmin from './components/Admin/LaporanUserAdmin';
import NotifikasiAdmin from './components/Admin/NotifikasiAdmin';
import ProviderLayout from './components/provider/layout/ProviderLayout';
import ProviderDashboard from './components/provider/ProviderDashboard';
import KebijakanPrivasi from './components/provider/KebijakanPrivasi';
import ProfilPerusahaan from './components/provider/ProfilPerusahaan';
import LowonganPekerjaan from './components/provider/LowonganPekerjaan';
import UserLayout from './components/JobSeekerUser/Layout/UserLayout';
import DashboardSeeker from './components/JobSeekerUser/DashboardSeeker';
import CvSeeker from './components/JobSeekerUser/CvSeeker';
import LamaranSaya from './components/JobSeekerUser/LamaranSaya';
import PekerjaanDisimpan from './components/JobSeekerUser/PekerjaanDisimpan';
import PelamarPekerjaan from './components/provider/PelamarPekerjaan';
import EditDataDiri from './components/provider/Profil/EditDataDiri';
import EditKataSandi from './components/provider/Profil/EditKataSandi';
import SyaratDanKetentuan from './components/provider/SyaratDanKetentuan';
import EditDataDiriSeeker from './components/JobSeekerUser/Profil/EditDataDiri';
import EditKataSandiSeeker from './components/JobSeekerUser/Profil/EditKataSandi';
import EditBiodata from './components/JobSeekerUser/Profil/EditBiodata';



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BerandaPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/Caripekerjaan" element={<CariPekerjaanPage />}></Route>
      <Route path="/Tentang" element={<TentangPage />}></Route>
      <Route path="/Kontak" element={<KontakPage />}></Route>
      <Route path="/pekerjaan/:id" element={<DetailPekerjaanPage />}></Route>
      <Route path="/Auth/Registrasi" element={<Registrasi />}></Route>
      <Route path="/Auth/Login" element={<Login />}></Route>

      {/* Admin */}
      <Route path="/Admin" element={<AdminLogin />}></Route>
      <Route path="/Admin/Dashboard" element={
        <AdminLayout>
          <DashboardAdmin />
        </AdminLayout>
      }/>
      <Route path="/Admin/Roles" element={
        <AdminLayout>
          <RolesAdmin />
        </AdminLayout>
      }/>
      <Route path="/Admin/JobProvider" element={
        <AdminLayout>
          <JobProviderAdmin />
        </AdminLayout>
      }/>
      <Route path="/Admin/JobSeeker" element={
        <AdminLayout>
          <JobSeekerAdmin />
        </AdminLayout>
      }/>
      <Route path="/Admin/JobPosting" element={
        <AdminLayout>
          <JobPostingAdmin />
        </AdminLayout>
      }/>
      <Route path="/Admin/FiturPremium" element={
        <AdminLayout>
          <FiturPremiumAdmin />
        </AdminLayout>
      }/>
      <Route path="/Admin/ReportAdmin" element={
        <AdminLayout>
          <ReportAdmin />
        </AdminLayout>
      }/>
      <Route path="/Admin/LaporanUser" element={
        <AdminLayout>
          <LaporanUserAdmin />
        </AdminLayout>
      }/>
      <Route path="/Admin/Notifikasi" element={
        <AdminLayout>
          <NotifikasiAdmin />
        </AdminLayout>
      }/>

      {/* Provider */}
      <Route path="/Provider/Dashboard" element={
        <ProviderLayout>
          <ProviderDashboard />
        </ProviderLayout>
      }/>

      <Route path="/Provider/ProfilPerusahaan" element={
        <ProviderLayout>
          <ProfilPerusahaan />
        </ProviderLayout>
      }/>

      <Route path="/Provider/LowonganPekerjaan" element={
        <ProviderLayout>
          <LowonganPekerjaan />
        </ProviderLayout>
      }/>

      <Route path="/Provider/KebijakanPrivasi" element={
        <ProviderLayout>
          <KebijakanPrivasi />
        </ProviderLayout>
      }/>

      <Route path="/Provider/PelamarPekerjaan" element={
        <ProviderLayout>
          <PelamarPekerjaan />
        </ProviderLayout>
      }/>

      <Route path="/Provider/EditDataDiri" element={
        <ProviderLayout>
          <EditDataDiri />
        </ProviderLayout>
      }/>

      <Route path="/Provider/EditKataSandi" element={
        <ProviderLayout>
          <EditKataSandi />
        </ProviderLayout>
      }/>

      <Route path="/Provider/SyaratKetentuan" element={
        <ProviderLayout>
          <SyaratDanKetentuan />
        </ProviderLayout>
      }/>


      {/* Job Seeker */}
      <Route path="/Seeker/Dashboard" element={
        <UserLayout>
          <DashboardSeeker />
        </UserLayout>
      }/>
      <Route path="/Seeker/CV" element={
        <UserLayout>
          <CvSeeker />
        </UserLayout>
      }/>
      <Route path="/Seeker/LamaranSaya" element={
        <UserLayout>
          <LamaranSaya />
        </UserLayout>
      }/>
      <Route path="/Seeker/PekerjaanDisimpan" element={
        <UserLayout>
          <PekerjaanDisimpan />
        </UserLayout>
      }/>
      <Route path="/Seeker/SyaratKetentuan" element={
        <UserLayout>
          <SyaratDanKetentuan />
        </UserLayout>
      }/>
      <Route path="/Seeker/KebijakanPrivasi" element={
        <UserLayout>
          <KebijakanPrivasi />
        </UserLayout>
      }/>
      <Route path="/Seeker/EditDataDiri" element={
        <UserLayout>
          <EditDataDiriSeeker />
        </UserLayout>
      }/>
      <Route path="/Seeker/EditKataSandi" element={
        <UserLayout>
          <EditKataSandiSeeker />
        </UserLayout>
      }/>
      <Route path="/Seeker/EditBiodata" element={
        <UserLayout>
          <EditBiodata />
        </UserLayout>
      }/>
    </Routes>
  );
}
