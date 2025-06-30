"use client";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";
import { Gift } from "lucide-react";

const PHOTOS = [
  "/home-photo-1.jpeg",
  "/home-photo-2.jpeg",
  "/home-photo-3.jpeg",
];

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(
    typeof window !== "undefined" && window.sessionStorage.getItem("sasa-birthday-popup") !== "shown"
  );

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
    // Show popup only for Sasa Cantiq, only once per session
    if (user === "Sasa Cantiq" && typeof window !== "undefined") {
      if (!window.sessionStorage.getItem("sasa-birthday-popup")) {
        setShowPopup(true);
        window.sessionStorage.setItem("sasa-birthday-popup", "shown");
      }
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-pink-50 overflow-hidden font-sans">
      <FloatingHearts />
      {user === "Sasa Cantiq" && showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-pink-200 p-8 flex flex-col items-center gap-6 max-w-md w-full animate-pop">
            <Confetti />
            <h2 className="text-3xl font-extrabold text-pink-600 text-center mb-2 tracking-wide">Happy Birthday bebbb!</h2>
            <p className="text-lg text-pink-500 text-center mb-2">Tekan box di bawah pake jempol gemoi nya, buat buka hadiah nya yaa h3h3h3 :).</p>
            <button
              className="mt-2 animate-bounce-slow focus:outline-none"
              onClick={() => {
                setShowPopup(false);
                router.push("/events/birthday-2025");
              }}
              aria-label="Open Birthday Gift"
            >
              <Gift className="w-16 h-16 text-pink-400 drop-shadow-lg transition-transform hover:scale-110 hover:text-pink-500" fill="#f472b6" />
            </button>
          </div>
          <style jsx global>{`
            @keyframes pop {
              0% { transform: scale(0.7); opacity: 0; }
              80% { transform: scale(1.05); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
            .animate-pop { animation: pop 0.5s cubic-bezier(.68,-0.55,.27,1.55); }
          `}</style>
        </div>
      )}
      <div className="z-10 w-full max-w-5xl flex flex-col items-center gap-8 px-2 sm:px-8 py-8 bg-white/80 rounded-3xl shadow-2xl border-2 border-pink-200 mt-12 mb-8">
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold text-pink-600 text-center drop-shadow-sm mb-2 tracking-wide font-sans"
          style={{
            letterSpacing: "0.04em",
            textShadow: "0 2px 8px #fff, 0 0px 2px #fff, 0 0px 12px #fff"
          }}
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          HELLO SAYANGGG
        </motion.h1>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-pink-500 text-center mb-4 tracking-wide font-sans border-b-4 border-pink-200 inline-block px-4"
          style={{ letterSpacing: "0.03em" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Welcome to our safe place
        </motion.h2>
        <motion.p
          className="text-xl sm:text-2xl text-pink-400 text-center mb-6 font-medium tracking-normal font-sans"
          style={{ letterSpacing: "0.01em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          This website is all about Nando and Sasa.<br />
          Coba klik-klik dan explore website nya dulu bebb<br />
          More content and activities coming soon yaaaa (ga cukup waktu selesain soalnya WWKWKWKWK).
        </motion.p>
        <div className="flex flex-col gap-10 w-full items-center">
          {PHOTOS.map((src, i) => (
            <motion.div
              key={i}
              className="w-full max-w-4xl aspect-[16/9] bg-pink-100 rounded-3xl overflow-hidden flex items-center justify-center border-8 border-pink-400 shadow-2xl group"
              whileHover={{ scale: 1.03, boxShadow: "0 0 0 8px #f472b6" }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <img src={src} alt={`Nando & Sasa ${i + 1}`} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
            </motion.div>
          ))}
        </div>
        {/* Scroll Down Indicator */}
        <div className="flex flex-col items-center mt-6 animate-bounce-slow">
          <span className="text-pink-400 text-3xl">↓</span>
          <span className="text-pink-300 text-xs mt-1">Scroll down for more</span>
        </div>
      </div>
    </div>
  );
}
