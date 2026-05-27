"use client";

import { useState } from "react";
import { toSinoKorean } from "@/lib/utils/numberConverter";
import AudioButton from "./AudioButton";

export default function NumberConverter() {
  const [value, setValue] = useState("");
  const result = value !== "" ? toSinoKorean(Number(value)) : null;
  const isValid = value !== "" && !isNaN(Number(value)) && result?.hangul !== "—";

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl border-2 border-emerald-200 p-5 shadow-sm">
      <h3 className="font-bold text-emerald-800 text-base mb-3 flex items-center gap-2">
        🔢 Conversor de Números
      </h3>
      <p className="text-xs text-emerald-500 mb-3">
        Escribe un número y mira cómo se dice en coreano (sistema sino-coreano)
      </p>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => {
          const onlyDigits = e.target.value.replace(/\D/g, "");
          setValue(onlyDigits);
        }}
        placeholder="ej. 5000"
        className="w-full border-2 border-emerald-200 rounded-xl px-4 py-2.5 text-lg font-mono
          focus:outline-none focus:border-emerald-500 transition-colors bg-emerald-50
          placeholder:text-emerald-300"
      />

      {isValid && result && (
        <div className="mt-4 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3">
            <div>
              <p className="text-xs text-emerald-400 font-medium mb-0.5">Hangul</p>
              <p className="text-2xl font-bold text-emerald-900 tracking-wide">
                {result.hangul}
              </p>
            </div>
            <AudioButton text={result.audioText} />
          </div>

          <div className="bg-cyan-50 rounded-xl px-4 py-3">
            <p className="text-xs text-cyan-400 font-medium mb-0.5">Romanización</p>
            <p className="text-lg font-semibold text-cyan-700 italic">
              {result.romanization}
            </p>
          </div>
        </div>
      )}

      {value !== "" && !isValid && (
        <p className="mt-3 text-red-400 text-sm">
          Ingresa un número entre 0 y 999.999.999
        </p>
      )}
    </div>
  );
}
