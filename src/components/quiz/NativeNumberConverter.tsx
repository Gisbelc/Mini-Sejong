"use client";

import { useState } from "react";
import AudioButton from "./AudioButton";

const nativeMap: Record<number, { pure: string; counter: string; romanization: string }> = {
  1:  { pure: "하나", counter: "한 개", romanization: "hana / han gae" },
  2:  { pure: "둘",   counter: "두 개", romanization: "dul / du gae" },
  3:  { pure: "셋",   counter: "세 개", romanization: "set / se gae" },
  4:  { pure: "넷",   counter: "네 개", romanization: "net / ne gae" },
  5:  { pure: "다섯", counter: "다섯 개", romanization: "daseot gae" },
  6:  { pure: "여섯", counter: "여섯 개", romanization: "yeoseot gae" },
  7:  { pure: "일곱", counter: "일곱 개", romanization: "ilgop gae" },
  8:  { pure: "여덟", counter: "여덟 개", romanization: "yeodeol gae" },
  9:  { pure: "아홉", counter: "아홉 개", romanization: "ahop gae" },
  10: { pure: "열",   counter: "열 개",  romanization: "yeol gae" },
};

export default function NativeNumberConverter() {
  const [value, setValue] = useState("");

  const num = value !== "" ? parseInt(value, 10) : null;
  const result = num !== null && !isNaN(num) ? nativeMap[num] ?? null : null;
  const isOutOfRange = num !== null && !isNaN(num) && !nativeMap[num];

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl border-2 border-emerald-200 p-5 shadow-sm">
      <h3 className="font-bold text-emerald-800 text-base mb-1 flex items-center gap-2">
        1️⃣ Conversor — Números coreanos nativos
      </h3>
      <p className="text-xs text-emerald-500 mb-3">
        Escribe un número del 1 al 10 y mira cómo se dice en coreano puro
      </p>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, 2))}
        placeholder="ej. 3"
        className="w-full border-2 border-emerald-200 rounded-xl px-4 py-2.5 text-lg font-mono
          focus:outline-none focus:border-emerald-500 transition-colors bg-emerald-50
          placeholder:text-emerald-300"
      />

      {result && (
        <div className="mt-4 space-y-3 animate-fade-in">
          {/* Forma pura */}
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

          {/* Romanización */}
          <div className="bg-orange-50 rounded-xl px-4 py-3">
            <p className="text-xs text-orange-400 font-medium mb-0.5">Romanización</p>
            <p className="text-base font-semibold text-orange-700 italic">{result.romanization}</p>
          </div>
        </div>
      )}

      {isOutOfRange && (
        <p className="mt-3 text-red-400 text-sm">
          Ingresa un número entre 1 y 10
        </p>
      )}
    </div>
  );
}
