"use client";

import { useState } from "react";
import { speakKorean } from "@/lib/utils/speechUtils";

interface AudioButtonProps {
  text: string;
  size?: "sm" | "md";
}

export default function AudioButton({ text, size = "md" }: AudioButtonProps) {
  const [playing, setPlaying] = useState(false);

  async function handleClick() {
    setPlaying(true);
    await speakKorean(text);
    setTimeout(() => setPlaying(false), 1200);
  }

  const sizeClass = size === "sm"
    ? "w-7 h-7 text-base"
    : "w-9 h-9 text-lg";

  return (
    <button
      onClick={handleClick}
      title={`Escuchar pronunciación de "${text}"`}
      className={`${sizeClass} rounded-full flex items-center justify-center transition-all
        ${playing
          ? "bg-emerald-600 text-white scale-110 shadow-md"
          : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:scale-105"
        }`}
    >
      {playing ? "🔊" : "🔈"}
    </button>
  );
}
