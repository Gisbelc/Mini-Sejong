"use client";

import { useState, ReactNode } from "react";
import AudioButton from "@/components/quiz/AudioButton";

/* ── Acordeón reutilizable ── */
function Section({ emoji, title, color, children, defaultOpen = false }: {
  emoji: string; title: string; color: string; children: ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`rounded-2xl border-2 ${color} overflow-hidden bg-white`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
      >
        <span className="font-bold text-gray-800 text-sm flex items-center gap-2">
          {emoji} {title}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 pt-1">{children}</div>}
    </div>
  );
}

/* ── Datos ── */
const verbs = [
  { korean: "앉아요",     meaning: "Me siento" },
  { korean: "먹어요",     meaning: "Como" },
  { korean: "마셔요",     meaning: "Bebo" },
  { korean: "운동해요",   meaning: "Me ejercito" },
  { korean: "전화해요",   meaning: "Hablo por teléfono" },
  { korean: "쉬어요",     meaning: "Descanso" },
  { korean: "일해요",     meaning: "Trabajo" },
  { korean: "가요",       meaning: "Voy" },
  { korean: "읽어요",     meaning: "Leo" },
  { korean: "이야기해요", meaning: "Converso" },
  { korean: "써요",       meaning: "Escribo" },
  { korean: "인사해요",   meaning: "Saludo" },
];

const places = [
  { korean: "집",        meaning: "Casa" },
  { korean: "학교",      meaning: "Escuela" },
  { korean: "교실",      meaning: "Salón de clases" },
  { korean: "사무실",    meaning: "Oficina" },
  { korean: "화장실",    meaning: "Baño" },
  { korean: "카페",      meaning: "Cafetería" },
  { korean: "옷 가게",   meaning: "Tienda de ropa" },
  { korean: "가게",      meaning: "Tienda" },
  { korean: "과일 가게", meaning: "Frutería" },
  { korean: "채소 가게", meaning: "Verdulería" },
  { korean: "가방 가게", meaning: "Tienda de carteras" },
  { korean: "편의점",    meaning: "Tienda de conveniencia" },
];

/* ── Componente principal ── */
export default function DailyActionsLesson() {
  return (
    <div className="flex flex-col gap-3 mb-4">

      {/* Diálogo */}
      <Section emoji="💬" title="Diálogo del día" color="border-cyan-100" defaultOpen>
        <div className="flex flex-col gap-3 pt-1">
          {[
            { s:"A", k:"어디에 가요?",          m:"¿A dónde vas?",               r:false },
            { s:"B", k:"카페에 가요.",           m:"Voy a la cafetería.",          r:true  },
            { s:"A", k:"지금 뭐 해요?",          m:"¿Qué estás haciendo ahora?",  r:false },
            { s:"B", k:"커피 마셔요.",            m:"Estoy bebiendo café.",         r:true  },
            { s:"A", k:"오늘 뭐 해요?",          m:"¿Qué haces hoy?",             r:false },
            { s:"B", k:"공부하고 운동해요.",      m:"Estudio y me ejercito.",       r:true  },
          ].map((l, i) => (
            <div key={i} className={`flex items-start gap-2 ${l.r ? "flex-row-reverse" : ""}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white
                ${l.r ? "bg-cyan-500" : "bg-emerald-500"}`}>{l.s}</div>
              <div className={`flex-1 rounded-2xl px-3 py-2 max-w-[85%] border
                ${l.r ? "bg-cyan-50 border-cyan-200" : "bg-emerald-50 border-emerald-200"}`}>
                <div className="flex items-center justify-between gap-2">
                  <p className={`font-bold text-sm ${l.r ? "text-cyan-800" : "text-emerald-800"}`}>{l.k}</p>
                  <AudioButton text={l.k} size="sm" />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{l.m}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Gramática */}
      <Section emoji="📌" title="아요 / 어요 / 해요 — presente educado" color="border-emerald-100">
        <p className="text-xs text-emerald-500 mb-3 pt-1">
          Terminaciones del <strong>presente educado</strong>. Describen una acción o estado.
        </p>
        <div className="flex flex-col gap-2">
          {[
            { rule:"Vocal ㅏ o ㅗ → 아요",  ex:"오다 → 와요",       note:"Vengo / Viene" },
            { rule:"Otras vocales → 어요",   ex:"먹다 → 먹어요",     note:"Como / Estoy comiendo" },
            { rule:"Verbo 하다 → 해요",      ex:"운동하다 → 운동해요",note:"Me ejercito" },
          ].map((r, i) => (
            <div key={i} className="bg-emerald-50 rounded-xl px-4 py-3">
              <p className="text-emerald-500 text-xs font-semibold">{r.rule}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-emerald-900 font-bold text-base">{r.ex}</p>
                <AudioButton text={r.ex.split("→")[1].trim()} size="sm" />
              </div>
              <p className="text-emerald-400 text-xs">{r.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Verbos */}
      <Section emoji="🏃" title="Verbos cotidianos" color="border-cyan-100">
        <div className="grid grid-cols-2 gap-2 pt-1">
          {verbs.map((v) => (
            <div key={v.korean} className="flex items-center justify-between bg-cyan-50 rounded-xl px-3 py-2">
              <div>
                <p className="text-cyan-800 font-bold text-base leading-tight">{v.korean}</p>
                <p className="text-cyan-500 text-xs">{v.meaning}</p>
              </div>
              <AudioButton text={v.korean} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Lugares */}
      <Section emoji="📍" title="Lugares" color="border-green-100">
        <div className="grid grid-cols-2 gap-2 pt-1">
          {places.map((p) => (
            <div key={p.korean} className="flex items-center justify-between bg-green-50 rounded-xl px-3 py-2">
              <div>
                <p className="text-green-800 font-bold text-base leading-tight">{p.korean}</p>
                <p className="text-green-500 text-xs">{p.meaning}</p>
              </div>
              <AudioButton text={p.korean} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* 에 가요 */}
      <Section emoji="📌" title="에 가요 — movimiento hacia un destino" color="border-blue-100">
        <p className="text-xs text-blue-500 mb-3 pt-1">
          <strong>에</strong> indica <strong>dirección o destino</strong> con el verbo <strong>가요</strong>.
          <br /><span className="text-blue-400">Lugar + 에 가요 = Voy a [lugar]</span>
        </p>
        <div className="flex flex-col gap-2">
          {[
            { k:"학교에 가요",     m:"Voy a la escuela" },
            { k:"카페에 가요",     m:"Voy a la cafetería" },
            { k:"집에 가요",       m:"Voy a casa" },
            { k:"사무실에 가요",   m:"Voy a la oficina" },
            { k:"어디에 가요?",      m:"¿A dónde vas?" },
            { k:"오늘 어디에 가요?", m:"¿A dónde vas hoy?" },
          ].map((ex) => (
            <div key={ex.k} className="flex items-center justify-between bg-blue-50 rounded-xl px-3 py-2.5">
              <div>
                <p className="text-blue-800 font-bold text-sm">{ex.k}</p>
                <p className="text-blue-500 text-xs mt-0.5">{ex.m}</p>
              </div>
              <AudioButton text={ex.k} size="sm" />
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}
