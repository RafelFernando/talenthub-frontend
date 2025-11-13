import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Map() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div
      className="relative w-full h-[350px] overflow-hidden"
      data-aos="fade-up"
    >
      {/* Gradient atas */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>

      {/* Iframe Google Maps */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.8334!2d110.8493506!3d-7.5554372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a168e21d64033%3A0x2a38d47d18c6e0c7!2sSolo%20Techno%20Park!5e0!3m2!1sen!2sid!4v1695560000000!5m2!1sen!2sid"
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps - Solo Technopark"
      ></iframe>

      {/* Gradient bawah */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}
