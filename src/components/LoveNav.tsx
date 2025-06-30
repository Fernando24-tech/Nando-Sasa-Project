"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cake, Heart, Gift, MessageCircle, Crown, Home as HomeIcon, LogOut } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";

const mainNav = [
  {
    label: "Sasa's Birthday 2025",
    href: "/events/birthday-2025",
    icon: <Cake className="w-5 h-5" />,
  },
  {
    label: "Anniversary",
    href: "/events/anniversary",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    label: "Christmas",
    href: "/events/christmas",
    icon: <Gift className="w-5 h-5" />,
  },
];

const activitiesNav = [
  {
    label: "Notes & Letters",
    href: "/events/notes",
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    label: "POM",
    href: "/pom",
    icon: <Crown className="w-5 h-5" />,
  },
];

export default function LoveNav() {
  const pathname = usePathname();
  const [showMain, setShowMain] = useState(true);
  const [showActivities, setShowActivities] = useState(true);
  const { logout } = useAuth();

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden sm:fixed sm:z-20 sm:left-0 sm:top-0 sm:h-full sm:w-56 sm:bg-white/80 sm:border-r sm:border-pink-100 sm:shadow-lg sm:flex sm:flex-col sm:items-stretch sm:py-8 sm:gap-2 sm:rounded-tr-3xl sm:rounded-br-3xl sm:select-none">
        {/* SANDO Logo & Home Button */}
        <div className="flex flex-col items-center mb-4">
          <Link href="/" className="flex flex-col items-center group">
            <motion.div
              whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mb-1"
            >
              <svg width="36" height="36" viewBox="0 0 32 29.6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M23.6,0c-2.7,0-5.1,1.3-6.6,3.3C15.5,1.3,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4c0,11.1,16,19.2,16,19.2s16-8.1,16-19.2C32,4.7,27.3,0,23.6,0z"
                  fill="#ec4899"
                  animate={{ scale: [1, 1.1, 1], y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
            <span className="text-xl font-extrabold text-pink-600 tracking-wide group-hover:underline">SANDO</span>
          </Link>
        </div>
        {/* Home Button */}
        <div className="flex flex-col items-center mb-2">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-xl text-pink-600 font-bold hover:bg-pink-100/70 transition-all">
            <HomeIcon className="w-5 h-5" />
            <span className="text-base">Home</span>
          </Link>
        </div>
        {/* Moments Captured Section */}
        <button
          className="px-4 pb-2 text-xs font-bold text-pink-400 tracking-widest uppercase flex items-center gap-2 focus:outline-none"
          onClick={() => setShowMain((v) => !v)}
          aria-expanded={showMain}
        >
          Moments Captured
          <span className={`transition-transform ${showMain ? "rotate-90" : "rotate-0"}`}>▶</span>
        </button>
        {showMain && (
          <div className="flex flex-col gap-1 px-4">
            {mainNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all font-semibold text-pink-600 hover:bg-pink-100/70 hover:text-pink-700 ${
                    active ? "bg-pink-200/70 text-pink-700 shadow" : ""
                  }`}
                >
                  {item.icon}
                  <span className="text-base">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
        <div className="my-4 border-t border-pink-100 mx-4" />
        {/* Activities Section */}
        <button
          className="px-4 pb-2 text-xs font-bold text-pink-400 tracking-widest uppercase flex items-center gap-2 focus:outline-none"
          onClick={() => setShowActivities((v) => !v)}
          aria-expanded={showActivities}
        >
          Activities
          <span className={`transition-transform ${showActivities ? "rotate-90" : "rotate-0"}`}>▶</span>
        </button>
        {showActivities && (
          <div className="flex flex-col gap-1 px-4">
            {activitiesNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all font-semibold text-pink-600 hover:bg-pink-100/70 hover:text-pink-700 ${
                    active ? "bg-pink-200/70 text-pink-700 shadow" : ""
                  }`}
                >
                  {item.icon}
                  <span className="text-base">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
        <button
          onClick={logout}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-xl text-pink-500 font-bold bg-white/80 border border-pink-200 shadow hover:bg-pink-100 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
      {/* Mobile Topbar */}
      <nav className="sm:hidden fixed top-0 left-0 w-full z-30 bg-white/90 border-b border-pink-100 shadow flex flex-row items-center justify-between px-2 py-2 select-none">
        <Link href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 32 29.6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.6,0c-2.7,0-5.1,1.3-6.6,3.3C15.5,1.3,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4c0,11.1,16,19.2,16,19.2s16-8.1,16-19.2C32,4.7,27.3,0,23.6,0z" fill="#ec4899" />
          </svg>
          <span className="text-lg font-extrabold text-pink-600 tracking-wide">SANDO</span>
        </Link>
        <div className="flex gap-2 overflow-x-auto whitespace-nowrap max-w-full px-1">
          <Link href="/" className="flex flex-col items-center text-pink-600 hover:text-pink-700 px-2">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="flex flex-col items-center text-pink-600 hover:text-pink-700 px-2">
              {item.icon}
              <span className="text-xs">{item.label.split(" ")[0]}</span>
            </Link>
          ))}
          {activitiesNav.map((item) => (
            <Link key={item.href} href={item.href} className="flex flex-col items-center text-pink-600 hover:text-pink-700 px-2">
              {item.icon}
              <span className="text-xs">{item.label.split(" ")[0]}</span>
            </Link>
          ))}
          <button
            onClick={logout}
            className="flex flex-col items-center text-pink-500 hover:text-pink-700 px-2"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-xs">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
} 