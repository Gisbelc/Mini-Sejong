"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { signOut } from "@/lib/firebase/auth";
import { preloadVoices } from "@/lib/utils/speechUtils";
import MascotBanner from "@/components/ui/MascotBanner";
import UnitCard from "@/components/ui/UnitCard";
import { QUIZ_UNITS } from "@/data/quizData";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [courseOpen, setCourseOpen] = useState(false);

  useEffect(() => {
    preloadVoices();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-cyan-400 text-lg animate-pulse font-medium">
          Cargando...
        </div>
      </div>
    );
  }

  const displayName = user?.displayName ?? user?.email?.split("@")[0] ?? "";

  return (
    <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 pb-10">

      {/* Top bar */}
      <div className="flex items-center justify-end pt-4 pb-2">
        <button
          onClick={() => signOut().then(() => router.replace("/login"))}
          className="text-xs text-emerald-700 hover:text-emerald-900 transition-colors
            font-semibold border border-emerald-300 hover:border-emerald-500
            rounded-full px-4 py-1.5"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Mascot */}
      <MascotBanner userName={displayName} />

      {/* ── Unidades de estudio ── */}
      <section className="mt-2">
        <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-3 px-1">
          Unidades de estudio
        </h2>

        {/* Curso 1A */}
        <div className="rounded-2xl border-2 border-emerald-100 overflow-hidden mb-3">
          <button
            onClick={() => setCourseOpen((o) => !o)}
            className="w-full flex items-center justify-between px-5 py-3.5
              bg-white hover:bg-emerald-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="bg-emerald-600 text-white text-xs font-extrabold
                px-2.5 py-1 rounded-full tracking-wide">
                1A
              </span>
              <span className="font-semibold text-emerald-800 text-sm">
                Coreano básico 1A
              </span>
              <span className="text-xs text-emerald-400 font-medium">
                {QUIZ_UNITS.length} unidades
              </span>
            </div>
            <svg
              className={`w-4 h-4 text-emerald-400 transition-transform duration-200
                ${courseOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {courseOpen && (
            <div className="px-4 pb-4 pt-2 flex flex-col gap-3 bg-emerald-50/30">
              {QUIZ_UNITS.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Utilidades ── */}
      <section className="mt-4">
        <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-3 px-1">
          Utilidades
        </h2>

        <Link href="/utilidades">
          <div className="rounded-2xl border-2 border-cyan-100 bg-white px-5 py-4
            flex items-center gap-4 hover:bg-cyan-50 transition-colors cursor-pointer">
            <span className="text-2xl">🔨</span>
            <div className="flex-1">
              <p className="font-bold text-cyan-800 text-sm">Constructor de oraciones</p>
              <p className="text-xs text-cyan-400 mt-0.5">
                Arma oraciones básicas con vocabulario de U1–U4
              </p>
            </div>
            <svg
              className="w-5 h-5 text-cyan-300 flex-shrink-0"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </section>

      <footer className="mt-10 text-center text-xs text-cyan-300 font-medium">
        Mini Sejong · 미니 세종 · Aprende coreano 🇰🇷
      </footer>
    </main>
  );
}
