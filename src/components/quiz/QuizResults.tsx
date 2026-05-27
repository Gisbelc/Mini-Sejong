"use client";

import Link from "next/link";

interface Props {
  score: number;
  total: number;
  unitTitle: string;
  onRetry: () => void;
}

export default function QuizResults({ score, total, unitTitle, onRetry }: Props) {
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 70;

  let emoji = "😔";
  let msg = "¡Sigue practicando!";
  if (pct >= 90) { emoji = "🏆"; msg = "¡Excelente! Dominas este tema."; }
  else if (pct >= 70) { emoji = "🎉"; msg = "¡Muy bien! Ya casi lo dominas."; }
  else if (pct >= 50) { emoji = "💪"; msg = "¡Buen intento! Un poco más de práctica."; }

  return (
    <div className="w-full max-w-sm mx-auto text-center">
      <div className="bg-white rounded-3xl shadow-lg p-8 border border-emerald-100">
        <div className="text-6xl mb-4">{emoji}</div>
        <h2 className="text-2xl font-extrabold text-emerald-900 mb-1">
          {unitTitle}
        </h2>
        <p className="text-emerald-500 text-sm mb-6">Resultado del quiz</p>

        {/* Score circle */}
        <div className={`w-28 h-28 rounded-full mx-auto flex flex-col items-center justify-center mb-6
          ${passed ? "bg-emerald-100 border-4 border-emerald-400" : "bg-red-50 border-4 border-red-300"}`}>
          <span className={`text-3xl font-black ${passed ? "text-emerald-700" : "text-red-500"}`}>
            {pct}%
          </span>
          <span className="text-xs text-emerald-400 mt-0.5">{score}/{total}</span>
        </div>

        <p className="text-gray-600 font-medium mb-8">{msg}</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onRetry}
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-2xl
              hover:bg-emerald-700 transition-colors"
          >
            🔄 Intentar de nuevo
          </button>
          <Link
            href="/"
            className="w-full bg-emerald-50 text-emerald-700 font-bold py-3 rounded-2xl
              hover:bg-emerald-100 transition-colors text-center block"
          >
            🏠 Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
