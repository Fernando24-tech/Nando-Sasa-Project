"use client";
import { useEffect, useState } from "react";

const HEART_COLORS = [
  "#ffb6c1", // light pink
  "#ff69b4", // hot pink
  "#ff6f91", // soft red
  "#f06292", // pink
  "#f8bbd0", // pale pink
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  color: string;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    let id = 0;
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: id++,
          left: randomBetween(5, 95),
          size: randomBetween(24, 48),
          duration: randomBetween(4, 8),
          color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        },
      ]);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          style={{
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
            animationDuration: `${heart.duration}s`,
            color: heart.color,
          }}
          className="absolute bottom-0 animate-floatHeart opacity-80"
        >
          <svg viewBox="0 0 32 29.6" fill="currentColor" width={heart.size} height={heart.size}>
            <path d="M23.6,0c-2.7,0-5.1,1.3-6.6,3.3C15.5,1.3,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4c0,11.1,16,19.2,16,19.2s16-8.1,16-19.2
	C32,4.7,27.3,0,23.6,0z"/>
          </svg>
        </span>
      ))}
      <style jsx global>{`
        @keyframes floatHeart {
          0% {
            transform: translateY(0) scale(1) rotate(-10deg);
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-90vh) scale(1.2) rotate(10deg);
            opacity: 0;
          }
        }
        .animate-floatHeart {
          animation: floatHeart linear forwards;
        }
      `}</style>
    </div>
  );
} 