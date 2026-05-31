"use client";

import { useState } from "react";
import AudioButton from "./AudioButton";

/* ── Generador de números coreanos nativos (1–99) ── */
const ones        = ["","하나","둘","셋","넷","다섯","여섯","일곱","여덟","아홉"];
const onesCounter = ["","한",  "두","세","네","다섯","여섯","일곱","여덟","아홉"];
const tens        = ["","열","스물","서른","마흔","쉰","예순","일흔","여든","아흔"];

function toNative(n: number): { pure: string; counter: string } | null {
  if (n < 1 || n > 99 || isNaN(n)) return null;

  const t = Math.floor(n / 10);
  const o = n % 10;

  if (t === 0) {
    // 1-9
    return { pure: ones[o], counter: onesCounter[o] + " 개" };
  }
  if (o === 0) {
    // 10, 20, 30 … exactos
    // 스물 solo → 스무 개 (veinte objetos)
    const counterTens = t === 2 ? "스무" : tens[t];
    return { pure: tens[t], counter: counterTens + " 개" };
  }
  // 11-99
  return {
    pure:    tens[t] + ones[o],
    counter: tens[t] + onesCounter[o] + " 개",
  };
}

export default function NativeNumberConverter() {
  const [value, setValue] = useState("");

  const num    = value !== "" ? parseInt(value, 10) : null;
  const result = num !== null ? toNative(num) : null;
  const isOutOfRange = num !== null && !isNaN(num) && result === null;

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl border-2 border-emerald-200 p-5 shadow-sm">
      <h3 className="font-bold text-emerald-800 text-base mb-1 flex items-center gap-2">
        1️⃣ Conversor — Números coreanos nativos
      </h3>
      <p className="text-xs text-emerald-500 mb-3">
        Escribe un número del 1 al 99 y mira cómo se dice en coreano puro
      </p>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, 2))}
        placeholder="ej. 27"
        className="w-full border-2 border-emerald-200 rounded-xl px-4 py-2.5 text-lg font-mono
          focus:outline-none focus:border-emerald-500 transition-colors bg-emerald-50
          placeholder:text-emerald-300"
      />

      {result && (
        <div className="mt-4 space-y-3 animate-fade-in">
          {/* Forma sola */}
          <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3">
            <div>
              <p className="text-xs text-emerald-400 font-medium mb-0.5">Forma sola</p>
              <p className="text-3xl font-bold text-emerald-900 tracking-wide">{result.pure}</p>
            </div>
            <AudioButton text={result.pure} />
          </div>

          {/* Con 개 */}
          <div className="flex items-center justify-between bg-cyan-50 rounded-xl px-4 py-3">
            <div>
              <p className="text-xs text-cyan-400 font-medium mb-0.5">Contando objetos (개)</p>
              <p className="text-3xl font-bold text-cyan-800 tracking-wide">{result.counter}</p>
            </div>
            <AudioButton text={result.counter} />
          </div>

          {/* Nota de formas que cambian (solo para 1-4 y 20) */}
          {(num === 1 || num === 2 || num === 3 || num === 4 || num === 20) && (
            <div className="bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
              <p className="text-xs text-amber-700 font-semibold">
                ⚡ {result.pure} cambia a <span className="font-extrabold">{result.counter.replace(" 개","")}</span> antes de un contador
              </p>
            </div>
          )}
        </div>
      )}

      {isOutOfRange && (
        <p className="mt-3 text-red-400 text-sm">Ingresa un número entre 1 y 99</p>
      )}

      {/* Nota informativa */}
      <div className="mt-4 bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
        <p className="text-xs text-amber-700 font-bold mb-0.5">📌 Dato</p>
        <p className="text-xs text-amber-600">
          Los números coreanos nativos solo llegan hasta el 99.
          A partir del 100 se usan los números sino-coreanos (백, 천, 만…)
          que viste en la Unidad 3.
        </p>
      </div>
    </div>
  );
}
