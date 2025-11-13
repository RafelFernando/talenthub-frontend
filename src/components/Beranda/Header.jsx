import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Header() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen mt-[70px]">
      {/* Bagian Teks */}
      <div
        className="flex flex-col flex-1 md:w-3/5 m-5 order-1"
        data-aos="fade-right"
      >
        <div className="m-4 md:m-8 text-center md:text-left">
          <h1 className="text-[clamp(2.2rem,4vw,4.2rem)] text-black">
            Mulai Langkah Karier
          </h1>
          <h1 className="text-[clamp(2.2rem,4vw,4.2rem)] text-black">
            Anda Bersama
          </h1>
          <span className="text-[#193F7A] text-[clamp(3rem,5vw,4.2rem)] font-bold">
            Talent{" "}
          </span>
          <span className="text-[#D9A91A] text-[clamp(3rem,5vw,4.2rem)] font-bold">
            Hub
          </span>
        </div>

        <div className="ml-0 md:ml-8 text-lg md:text-xl font-medium space-y-1 text-center md:text-left">
          <p>Pelatihan, peluang kerja, dan mentoring</p>
          <p>untuk meningkatkan kompetensi di dunia</p>
          <p>digital dan industri kreatif</p>
        </div>
      </div>

      {/* Bagian Gambar */}
      <div
        className="flex w-full md:w-2/5 m-5 relative order-2"
        data-aos="fade-left"
      >
        <div className="flex items-center justify-center relative w-full">
          <img
            className="max-w-[85%] md:max-w-full h-auto"
            src="/img-berandatalent.png"
            alt="berandatalent"
          />
        </div>
      </div>
    </div>
  );
}
