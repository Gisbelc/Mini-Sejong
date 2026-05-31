"use client";

import Link from "next/link";
import WritingPractice from "@/components/utils/WritingPractice";

export default function EscrituraPage() {
  return (
    <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="text-violet-400 hover:text-violet-600 transition-colors"
          aria-label="Volver"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest">
            Práctica
          </p>
          <h1 className="text-lg font-extrabold text-violet-900 leading-tight">
            ✍️ 한국어 쓰기
          </h1>
          <p className="text-xs text-violet-400 italic mt-0.5">Escritura en coreano</p>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-violet-50 border-2 border-violet-100 rounded-2xl px-5 py-4 mb-6">
        <p className="text-sm text-violet-700 font-medium">
          Lee la frase en español, escríbela en coreano y comprueba tu respuesta.
          Puedes escuchar el audio cuando la aciertes. ¡Inténtalo!
        </p>
      </div>

      <WritingPractice />

      <footer className="mt-10 text-center text-xs text-cyan-300 font-medium">
        Mini Sejong · 미니 세종 · Aprende coreano 🇰🇷
      </footer>
    </main>
  );
}
