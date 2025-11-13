import { useRef } from "react";
import KarirListData from "../../data/karirlist.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function KarirList() {
  const scrollRef = useRef(null);

  // Geser ke kanan
  const nextSlide = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" }); // 300px card + padding
    }
  };

  // Geser ke kiri
  const prevSlide = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  return (
    <div className="m-4 md:m-10">
      {/* Header */}
      <div className="header flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-3xl font-bold text-black leading-snug mb-4">
            5.000+ Karir Tercapai Melalui TalentHub
          </h1>
          <p className="text-[16px] mt-3 font-normal">
            Kalau ribuan talenta bisa temukan kerja lewat Talent Hub, kamu juga bisa!
          </p>
        </div>

        {/* Tombol geser */}
        <div className="button-geser flex gap-3">
          <button
            onClick={prevSlide}
            className="border-[1px] text-[#193F7A] p-2 rounded-full hover:bg-yellow-500 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="border-[1px] text-[#193F7A] p-2 rounded-full hover:bg-yellow-500 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth mt-6 gap-4 pb-4 no-scrollbar"
      >
        {KarirListData.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 h-[380px] w-[300px] p-2 rounded-2xl"
          >
            <div className="h-full w-full bg-gradient-to-b from-white/80 via-gray-100/70 to-blue-900/80 flex flex-col rounded-2xl border-[1px] border-gray-400 shadow-lg backdrop-blur-sm">
              <div className="flex-[1.3] flex items-center justify-center">
                <img
                  src={`/${item.image}`}
                  alt={item.name}
                  className="h-[237px] object-cover "
                />
              </div>

              <div className="flex-[0.6] bg-gradient-to-b from-[#193F7A99] to-[#0E234399] rounded-b-2xl p-2 bg-opacity-20">
                <p className="text-white text-[1.2rem] font-semibold">
                  {item.name} | {item.pekerjaan}
                </p>
                <p className="text-white text-[1rem]">{item.komentar}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
