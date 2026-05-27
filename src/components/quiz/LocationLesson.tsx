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
const furniture = [
  { korean: "침대",    meaning: "Cama" },
  { korean: "의자",    meaning: "Silla" },
  { korean: "책상",    meaning: "Escritorio" },
  { korean: "컴퓨터",  meaning: "Computadora" },
  { korean: "노트북",  meaning: "Notebook / Laptop" },
  { korean: "소파",    meaning: "Sofá" },
  { korean: "탁자",    meaning: "Mesa de centro" },
  { korean: "식탁",    meaning: "Mesa de comer" },
  { korean: "냉장고",  meaning: "Nevera" },
  { korean: "텔레비전",meaning: "Televisión" },
];

const rooms = [
  { korean: "거실",   meaning: "Sala / Sala de estar" },
  { korean: "방",     meaning: "Habitación / Cuarto" },
  { korean: "부엌",   meaning: "Cocina" },
  { korean: "화장실", meaning: "Baño" },
];

const objects = [
  { korean: "책",    meaning: "Libro" },
  { korean: "과자",  meaning: "Snack / Golosina" },
  { korean: "필통",  meaning: "Cartuchera / Estuche" },
  { korean: "시계",  meaning: "Reloj" },
  { korean: "달력",  meaning: "Calendario" },
  { korean: "꽃",    meaning: "Flor" },
  { korean: "지갑",  meaning: "Billetera" },
  { korean: "휴대폰",meaning: "Teléfono celular" },
  { korean: "안경",  meaning: "Lentes / Gafas" },
];

const prepositions = [
  { korean: "안",  meaning: "Dentro / Interior",   emoji: "📦",  example: "가방 안에 있어요",   exMeaning: "Está dentro de la bolsa." },
  { korean: "밖",  meaning: "Fuera / Exterior",    emoji: "🌿",  example: "집 밖에 있어요",     exMeaning: "Está fuera de la casa." },
  { korean: "옆",  meaning: "Al lado",             emoji: "↔️",  example: "소파 옆에 있어요",   exMeaning: "Está al lado del sofá." },
  { korean: "앞",  meaning: "Al frente / Delante", emoji: "⬆️",  example: "책상 앞에 있어요",   exMeaning: "Está delante del escritorio." },
  { korean: "뒤",  meaning: "Detrás / Atrás",      emoji: "⬇️",  example: "텔레비전 뒤에 있어요",exMeaning: "Está detrás del televisor." },
  { korean: "위",  meaning: "Sobre / Arriba",      emoji: "⬆️",  example: "책상 위에 있어요",   exMeaning: "Está sobre el escritorio." },
  { korean: "아래",meaning: "Debajo / Abajo",      emoji: "⬇️",  example: "침대 아래에 있어요", exMeaning: "Está debajo de la cama." },
  { korean: "밑",  meaning: "Debajo (= 아래)",    emoji: "⬇️",  example: "책상 밑에 있어요",   exMeaning: "Está debajo del escritorio." },
  { korean: "사이",meaning: "Entre / En medio",   emoji: "↔️",  example: "소파와 탁자 사이에 있어요", exMeaning: "Está entre el sofá y la mesa de centro." },
];

export default function LocationLesson() {
  return (
    <div className="flex flex-col gap-3 mb-4">

      {/* Diálogo */}
      <Section emoji="💬" title="Diálogo" color="border-cyan-100" defaultOpen>
        <div className="flex flex-col gap-3 pt-1">
          {[
            { s:"A", k:"지금 집에 있어요?",          m:"¿Estás en casa ahora?",                r:false },
            { s:"B", k:"네, 집에 있어요.",             m:"Sí, estoy en casa.",                   r:true  },
            { s:"A", k:"휴대폰이 어디에 있어요?",     m:"¿Dónde está tu celular?",              r:false },
            { s:"B", k:"책상 위에 있어요.",            m:"Está sobre el escritorio.",            r:true  },
            { s:"A", k:"지갑이 어디에 있어요?",       m:"¿Dónde está la billetera?",            r:false },
            { s:"B", k:"소파 옆에 있어요.",            m:"Está al lado del sofá.",               r:true  },
            { s:"A", k:"안경이 있어요?",               m:"¿Tienes los lentes?",                  r:false },
            { s:"B", k:"아니요, 없어요.",              m:"No, no tengo.",                        r:true  },
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

      {/* Gramática 있어요 / 없어요 */}
      <Section emoji="📌" title="있어요 / 없어요 — estar / no estar" color="border-emerald-100">
        <p className="text-xs text-emerald-400 mb-3 pt-1">
          Se combinan con la partícula <strong>에</strong> para indicar dónde está algo o alguien.
        </p>
        <div className="flex gap-2 mb-4">
          <div className="flex-1 bg-emerald-50 rounded-xl px-4 py-3 border border-emerald-200 text-center">
            <p className="text-emerald-800 font-extrabold text-xl">있어요</p>
            <p className="text-emerald-600 text-xs font-semibold mt-1">Está / Hay / Tengo</p>
          </div>
          <div className="flex-1 bg-cyan-50 rounded-xl px-4 py-3 border border-cyan-200 text-center">
            <p className="text-cyan-800 font-extrabold text-xl">없어요</p>
            <p className="text-cyan-600 text-xs font-semibold mt-1">No está / No hay / No tengo</p>
          </div>
        </div>

        {/* Estructura */}
        <div className="bg-emerald-50 rounded-xl px-4 py-3 border border-emerald-100 mb-3">
          <p className="text-xs text-emerald-600 font-bold mb-2">Estructura</p>
          <p className="text-sm text-emerald-900 font-mono mb-1">
            <span className="text-cyan-600 font-bold">[objeto]</span> + 이/가 + <span className="text-emerald-600 font-bold">[lugar]</span> + 에 있어요
          </p>
          <p className="text-xs text-emerald-400 italic">→ [El objeto] está en [lugar]</p>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { k:"집에 있어요?",            m:"¿Estás en casa?" },
            { k:"네, 집에 있어요.",         m:"Sí, estoy en casa." },
            { k:"아니요, 집에 없어요.",     m:"No, no estoy en casa." },
            { k:"책이 어디에 있어요?",      m:"¿Dónde está el libro?" },
            { k:"책상 위에 있어요.",         m:"Está sobre el escritorio." },
            { k:"냉장고 안에 있어요.",       m:"Está dentro de la nevera." },
          ].map((ex) => (
            <div key={ex.k} className="flex items-center justify-between bg-emerald-50 rounded-xl px-3 py-2.5">
              <div>
                <p className="text-emerald-900 font-bold text-sm">{ex.k}</p>
                <p className="text-emerald-400 text-xs mt-0.5">{ex.m}</p>
              </div>
              <AudioButton text={ex.k} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* 의 — partícula posesiva */}
      <Section emoji="🔗" title="의 — partícula posesiva (de / 's)" color="border-green-100">
        <p className="text-xs text-green-600 mb-3 pt-1">
          Indica <strong>posesión o pertenencia</strong>. Equivale a <em>"de"</em> en español o el <em>"'s"</em> del inglés.
        </p>

        {/* Estructura */}
        <div className="bg-green-50 rounded-xl px-4 py-3 border border-green-100 mb-3">
          <p className="text-xs text-green-700 font-bold mb-1">Estructura</p>
          <p className="text-sm font-mono text-green-900">
            <span className="text-cyan-600 font-bold">[dueño]</span> + 의 + <span className="text-emerald-600 font-bold">[objeto]</span>
          </p>
          <p className="text-xs text-green-400 italic mt-0.5">→ el [objeto] de [dueño]</p>
        </div>

        {/* Contracciones clave */}
        <p className="text-xs text-green-600 font-bold mb-2">⚡ Contracciones en el habla</p>
        <div className="flex gap-2 mb-4">
          <div className="flex-1 bg-green-50 rounded-xl px-3 py-2.5 border border-green-200 text-center">
            <p className="text-green-800 font-extrabold text-base whitespace-nowrap">나의 → 내</p>
            <p className="text-green-600 text-xs mt-1">mi (informal)</p>
          </div>
          <div className="flex-1 bg-green-50 rounded-xl px-3 py-2.5 border border-green-200 text-center">
            <p className="text-green-800 font-extrabold text-base whitespace-nowrap">저의 → 제</p>
            <p className="text-green-600 text-xs mt-1">mi (formal)</p>
          </div>
        </div>

        {/* Ejemplos */}
        <div className="flex flex-col gap-2">
          {[
            { k:"나의 방",                   m:"mi habitación",                   note:"나의 → 내 en habla rápida" },
            { k:"나의 책상",                  m:"mi escritorio",                   note:"" },
            { k:"친구의 휴대폰",              m:"el celular de mi amigo/a",        note:"친구 = amigo/a" },
            { k:"선생님의 책",                m:"el libro del/de la maestro/a",    note:"" },
            { k:"우리의 집",                  m:"nuestra casa",                    note:"우리 = nosotros / nuestro" },
            { k:"제 지갑이 어디에 있어요?",   m:"¿Dónde está mi billetera?",       note:"제 = 저의 (formal, habla cotidiana)" },
          ].map((ex) => (
            <div key={ex.k} className="bg-green-50 rounded-xl px-3 py-2.5 border border-green-100">
              <div className="flex items-center justify-between gap-2">
                <p className="text-green-900 font-bold text-sm">{ex.k}</p>
                <AudioButton text={ex.k} size="sm" />
              </div>
              <p className="text-green-600 text-xs mt-0.5">{ex.m}</p>
              {ex.note && <p className="text-green-400 text-xs italic">{ex.note}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* Preposiciones */}
      <Section emoji="📍" title="Preposiciones de ubicación" color="border-orange-100">
        <p className="text-xs text-orange-500 mb-3 pt-1">
          Van <strong>entre el objeto de referencia y 에</strong>: 책상 <strong>위</strong>에 있어요
        </p>
        <div className="flex flex-col gap-2">
          {prepositions.map((p) => (
            <div key={p.korean} className="bg-orange-50 rounded-xl px-4 py-3 border border-orange-100">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <p className="text-orange-800 font-extrabold text-2xl whitespace-nowrap">{p.korean}</p>
                  <p className="text-orange-600 font-semibold text-sm">{p.meaning}</p>
                </div>
                <AudioButton text={p.korean} size="sm" />
              </div>
              <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-orange-100">
                <div>
                  <p className="text-orange-900 font-bold text-xs">{p.example}</p>
                  <p className="text-orange-400 text-xs italic">{p.exMeaning}</p>
                </div>
                <AudioButton text={p.example} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Muebles */}
      <Section emoji="🛋️" title="Vocabulario — Muebles" color="border-blue-100">
        <div className="grid grid-cols-2 gap-2 pt-1">
          {furniture.map((f) => (
            <div key={f.korean} className="flex items-center justify-between bg-blue-50 rounded-xl px-3 py-2">
              <div>
                <p className="text-blue-800 font-bold text-base leading-tight">{f.korean}</p>
                <p className="text-blue-500 text-xs">{f.meaning}</p>
              </div>
              <AudioButton text={f.korean} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Habitaciones */}
      <Section emoji="🚪" title="Vocabulario — Habitaciones" color="border-teal-100">
        <div className="grid grid-cols-2 gap-2 pt-1">
          {rooms.map((r) => (
            <div key={r.korean} className="flex items-center justify-between bg-teal-50 rounded-xl px-3 py-2">
              <div>
                <p className="text-teal-800 font-bold text-base leading-tight">{r.korean}</p>
                <p className="text-teal-500 text-xs">{r.meaning}</p>
              </div>
              <AudioButton text={r.korean} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Objetos */}
      <Section emoji="🎒" title="Vocabulario — Objetos" color="border-cyan-100">
        <div className="grid grid-cols-2 gap-2 pt-1">
          {objects.map((o) => (
            <div key={o.korean} className="flex items-center justify-between bg-cyan-50 rounded-xl px-3 py-2">
              <div>
                <p className="text-cyan-800 font-bold text-base leading-tight">{o.korean}</p>
                <p className="text-cyan-500 text-xs">{o.meaning}</p>
              </div>
              <AudioButton text={o.korean} size="sm" />
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}
