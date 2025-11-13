import Navbar from "../components/Navbar";
import Header from "../components/Beranda/Header";
import CaraKerja from "../components/Beranda/CaraKerja";
import RekomendasiPekerjaan from "../components/Beranda/RekomendasiPekerjaan";
import Mitra from "../components/Beranda/Mitra";
import KarirList from "../components/Beranda/KarirList";
import Map from "../components/Map";
import Footer from "../components/Footer";
import PekerjaanCard from "../components/Caripekerjaan/PekerjaanCard";

export default function BerandaPage() {
    return (
        <>
            <Navbar />
            <Header />
            <CaraKerja />
            <PekerjaanCard />
            <KarirList />
            <Mitra />
            <Map />
            <Footer />
        </>
    );
}