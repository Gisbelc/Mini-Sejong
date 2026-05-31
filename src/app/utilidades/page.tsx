"use client";

import Link from "next/link";
import SentenceBuilder from "@/components/utils/SentenceBuilder";

export default function UtilidadesPage() {
  return (
    <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="text-emerald-400 hover:text-emerald-600 transition-colors"
          aria-label="Volver"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <p className="text-xs text-emerald-400 font-semibold uppercase tracking-widest">
            Utilidades
          </p>
          <h1 className="text-lg font-extrabold text-emerald-900 leading-tight">
            🔨 Constructor de oraciones
          </h1>
        </div>
      </div>

      {/* Intro SentenceBuilder */}
      <div className="bg-emerald-50 border-2 border-emerald-100 rounded-2xl px-5 py-4 mb-6">
        <p className="text-sm text-emerald-700 font-medium">
          Selecciona las piezas y arma oraciones en coreano.
          Organizado por unidad — abre la que quieras practicar.
        </p>
      </div>

      <SentenceBuilder />

      <footer className="mt-10 text-center text-xs text-cyan-300 font-medium">
        Mini Sejong · 미니 세종 · Aprende coreano 🇰🇷
      </footer>
    </main>
  );
}
