"use client";
import { useState, useRef, useEffect } from "react";
import Confetti from "@/components/Confetti";

function getStoredImages() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("shared-birthday-2025-photos") || "[]");
  } catch {
    return [];
  }
}

export default function Birthday2025() {
  const [images, setImages] = useState<string[]>(getStoredImages());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shared-birthday-2025-photos", JSON.stringify(images));
    }
  }, [images]);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const readers = Array.from(files).map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(newImages => {
      setImages(prev => [...newImages, ...prev]);
    });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  function handleRemove(idx: number) {
    setImages(prev => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-pink-50">
      <Confetti />
      <div className="w-full max-w-5xl bg-white/80 rounded-3xl shadow-2xl border-2 border-pink-200 p-6 sm:p-12 mt-10 mb-8 flex flex-col items-center gap-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-600 text-center mb-2 tracking-wide">🎂 Sasa&apos;s Birthday 2025</h1>
        <video
          className="rounded-2xl w-full max-h-96 shadow-lg border-4 border-pink-300"
          controls
          poster="/birthday-poster.jpg"
        >
          <source src="/birthday-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="w-full bg-pink-100/70 border-l-4 border-pink-400 rounded-xl p-4 shadow text-pink-700 text-lg font-medium">
          Happy birthday bibobbb!! i love you tomattttt &lt;3 <br />
          Wishing you the happiest birthday, my love. Here&apos;s to more memories, laughter, and adventures together!
        </div>
      </div>
      <div className="w-full max-w-5xl bg-white/80 rounded-3xl shadow-xl border-2 border-pink-100 p-6 sm:p-12 flex flex-col items-center gap-6 mb-12">
        <h2 className="text-2xl font-bold text-pink-500 mb-2">Birthday Photo Gallery</h2>
        <div
          className="w-full min-h-[120px] bg-pink-50 border-2 border-dashed border-pink-200 rounded-xl flex flex-col items-center justify-center text-pink-300 italic p-4 cursor-pointer hover:bg-pink-100 transition"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          <span className="mb-2">Click or drag & drop to upload birthday photos</span>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
        </div>
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {images.map((src, idx) => (
              <div key={idx} className="relative group rounded-2xl overflow-hidden border-4 border-pink-200 shadow-lg bg-pink-50">
                <img src={src} alt={`Birthday photo ${idx + 1}`} className="object-cover w-full h-64" />
                <button
                  className="absolute top-2 right-2 bg-white/80 text-pink-500 rounded-full p-1 shadow hover:bg-pink-200 transition"
                  onClick={() => handleRemove(idx)}
                  title="Remove photo"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-pink-300 italic">(No birthday photos yet)</div>
        )}
      </div>
    </div>
  );
} 