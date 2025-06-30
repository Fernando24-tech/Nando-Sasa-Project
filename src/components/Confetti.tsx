"use client";
import { useEffect, useState } from "react";

const CONFETTI_COLORS = [
  "#f472b6", // pink
  "#f9a8d4", // light pink
  "#fde68a", // gold
  "#fff",    // white
  "#fbbf24", // yellow
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface ConfettiPiece {
  id: number;
  left: number;
  size: number;
  duration: number;
  color: string;
  rotate: number;
}

export default function Confetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    let id = 0;
    const interval = setInterval(() => {
      setConfetti((prev) => [
        ...prev,
        {
          id: id++,
          left: randomBetween(2, 98),
          size: randomBetween(10, 22),
          duration: randomBetween(3, 6),
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          rotate: randomBetween(-30, 30),
        },
      ]);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Remove confetti after animation
  useEffect(() => {
    if (confetti.length > 100) {
      setConfetti((prev) => prev.slice(-100));
    }
  }, [confetti]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {confetti.map((piece) => (
        <span
          key={piece.id}
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size * 0.6,
            animationDuration: `${piece.duration}s`,
            background: piece.color,
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            transform: `rotate(${piece.rotate}deg)`,
            opacity: 0.85,
            position: "absolute" as const,
          }}
          className="top-0 animate-confetti"
        />
      ))}
      <style jsx global>{`
        @keyframes confetti {
          0% {
            top: -5vh;
            opacity: 0.7;
          }
          80% {
            opacity: 1;
          }
          100% {
            top: 110vh;
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
} 