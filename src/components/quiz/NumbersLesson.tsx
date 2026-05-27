"use client";

import { useState, ReactNode } from "react";
import AudioButton from "@/components/quiz/AudioButton";
import NumberConverter from "@/components/quiz/NumberConverter";

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
const numbers = [
  { korean: "일", value: "1" }, { korean: "이", value: "2" },
  { korean: "삼", value: "3" }, { korean: "사", value: "4" },
  { korean: "오", value: "5" }, { korean: "육", value: "6" },
  { korean: "칠", value: "7" }, { korean: "팔", value: "8" },
  { korean: "구", value: "9" }, { korean: "십", value: "10" },
];

const units = [
  { korean: "백",   value: "100",        note: "cien" },
  { korean: "천",   value: "1.000",      note: "mil" },
  { korean: "만",   value: "10.000",     note: "diez mil" },
  { korean: "십만", value: "100.000",    note: "cien mil" },
  { korean: "백만", value: "1.000.000",  note: "un millón" },
];

const objects = [
  { korean: "안경",   meaning: "Gafas / Lentes" },
  { korean: "모자",   meaning: "Sombrero / Gorra" },
  { korean: "가방",   meaning: "Bolso / Cartera" },
  { korean: "지갑",   meaning: "Billetera" },
  { korean: "빵",     meaning: "Pan" },
  { korean: "컴퓨터", meaning: "Computadora" },
  { korean: "휴대폰", meaning: "Celular" },
  { korean: "우산",   meaning: "Paraguas" },
  { korean: "신발",   meaning: "Zapatos" },
  { korean: "옷",     meaning: "Ropa" },
  { korean: "책",     meaning: "Libro" },
  { korean: "열쇠",   meaning: "Llave" },
];

const emergency = [
  { number: "119",  desc: "Bomberos / Ambulancia" },
  { number: "112",  desc: "Policía" },
  { number: "1330", desc: "Turismo (información)" },
  { number: "110",  desc: "Gobierno / Atención general" },
  { number: "114",  desc: "Información telefónica" },
];

export default function NumbersLesson() {
  return (
    <div className="flex flex-col gap-3 mb-4">

      {/* Diálogo */}
      <Section emoji="💬" title="Diálogo" color="border-cyan-100" defaultOpen>
        <div className="flex flex-col gap-3 pt-1">
          {[
            { s:"A", k:"안경이 얼마예요?",         m:"¿Cuánto cuestan las gafas?",        r:false },
            { s:"B", k:"이만 원이에요.",             m:"Son 20.000 wones.",                 r:true  },
            { s:"A", k:"어때요?",                   m:"¿Qué tal? / ¿Cómo está?",           r:false },
            { s:"B", k:"좋아요! 싸요.",              m:"¡Está bien! Es barato.",             r:true  },
            { s:"A", k:"화장실이 어디에 있어요?",    m:"¿Dónde está el baño?",              r:false },
            { s:"B", k:"지하 1층에 있어요.",         m:"Está en el sótano 1.",              r:true  },
            { s:"A", k:"전화번호가 뭐예요?",         m:"¿Cuál es tu número de teléfono?",   r:false },
            { s:"B", k:"공일공-일이삼사-오육칠팔이에요.", m:"Es 010-1234-5678.",            r:true  },
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

      {/* Números 1-10 */}
      <Section emoji="🔢" title="Números 1-10 (sino-coreano)" color="border-emerald-100">
        <p className="text-xs text-emerald-400 mb-3 pt-1">
          Sistema usado para precios, pisos, teléfonos y fechas.
        </p>
        <div className="grid grid-cols-5 gap-2">
          {numbers.map((n) => (
            <div key={n.korean} className="flex flex-col items-center bg-emerald-50 rounded-xl py-2 px-1">
              <p className="text-emerald-800 font-extrabold text-lg">{n.korean}</p>
              <p className="text-emerald-500 text-xs font-bold">{n.value}</p>
              <AudioButton text={n.korean} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Unidades numéricas */}
      <Section emoji="💯" title="Unidades numéricas — 백, 천, 만" color="border-indigo-100">
        <p className="text-xs text-indigo-400 mb-3 pt-1">
          Se combinan con los números básicos para formar cantidades mayores.
        </p>
        <div className="flex flex-col gap-2">
          {units.map((u) => (
            <div key={u.korean} className="flex items-center justify-between bg-indigo-50 rounded-xl px-4 py-2.5">
              <div className="flex items-center gap-3">
                <p className="text-indigo-800 font-extrabold text-xl whitespace-nowrap">{u.korean}</p>
                <div>
                  <p className="text-indigo-700 font-bold text-base">{u.value}</p>
                  <p className="text-indigo-400 text-xs">{u.note}</p>
                </div>
              </div>
              <AudioButton text={u.korean} size="sm" />
            </div>
          ))}
        </div>
        <div className="mt-3 bg-indigo-50 rounded-xl px-4 py-3 border border-indigo-100">
          <p className="text-xs text-indigo-600 font-semibold mb-1">Ejemplos:</p>
          {[
            { k:"삼백",         m:"300" },
            { k:"오천",         m:"5.000" },
            { k:"이만 오천",    m:"25.000" },
            { k:"십만",         m:"100.000" },
          ].map((ex) => (
            <div key={ex.k} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <AudioButton text={ex.k} size="sm" />
                <p className="text-indigo-800 font-bold text-sm">{ex.k}</p>
              </div>
              <p className="text-indigo-500 text-sm">= {ex.m}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 이/가 */}
      <Section emoji="📌" title="이/가 — marcador de sujeto" color="border-orange-100">
        <p className="text-xs text-orange-500 mb-3 pt-1">
          Marcan el <strong>sujeto</strong> de la oración, a diferencia de <strong>은/는</strong> que marca el tema.
        </p>
        <div className="flex gap-2 mb-3">
          <div className="flex-1 bg-orange-50 rounded-xl px-4 py-3 border border-orange-200 text-center">
            <p className="text-orange-800 font-extrabold text-xl">이</p>
            <p className="text-orange-600 text-xs font-semibold mt-1">Después de consonante</p>
            <p className="text-orange-400 text-xs">con 받침</p>
          </div>
          <div className="flex-1 bg-orange-50 rounded-xl px-4 py-3 border border-orange-200 text-center">
            <p className="text-orange-800 font-extrabold text-xl">가</p>
            <p className="text-orange-600 text-xs font-semibold mt-1">Después de vocal</p>
            <p className="text-orange-400 text-xs">sin 받침</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { k:"전화번호가 뭐예요?",   m:"전화번호 termina en vocal → 가",   note:"¿Cuál es tu número de teléfono?" },
            { k:"이름이 뭐예요?",       m:"이름 termina en ㅁ → 이",          note:"¿Cuál es tu nombre?" },
            { k:"가방이 얼마예요?",     m:"가방 termina en ㅇ → 이",          note:"¿Cuánto cuesta la bolsa?" },
            { k:"안경이 어디에 있어요?",m:"안경 termina en ㅇ → 이",          note:"¿Dónde están las gafas?" },
            { k:"화장실이 어디에 있어요?",m:"화장실 termina en ㄹ → 이",      note:"¿Dónde está el baño?" },
          ].map((ex) => (
            <div key={ex.k} className="bg-orange-50 rounded-xl px-3 py-2.5 border border-orange-100">
              <div className="flex items-center justify-between gap-2">
                <p className="text-orange-900 font-bold text-sm">{ex.k}</p>
                <AudioButton text={ex.k} size="sm" />
              </div>
              <p className="text-orange-500 text-xs mt-0.5">{ex.m}</p>
              <p className="text-gray-400 text-xs italic">{ex.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 어때요 */}
      <Section emoji="❓" title="어때요? — ¿Qué tal? / ¿Cómo está?" color="border-teal-100">
        <p className="text-xs text-teal-500 mb-3 pt-1">
          Se usa para pedir una opinión o describir cómo es algo.
        </p>
        <div className="flex flex-col gap-2">
          {[
            { k:"어때요?",             m:"¿Qué tal? / ¿Cómo está?" },
            { k:"이 모자 어때요?",     m:"¿Qué tal este sombrero?" },
            { k:"이 가방 어때요?",     m:"¿Qué te parece esta bolsa?" },
            { k:"가격이 어때요?",      m:"¿Qué tal el precio?" },
            { k:"좋아요! / 별로예요.", m:"¡Está bien! / No mucho." },
          ].map((ex) => (
            <div key={ex.k} className="flex items-center justify-between bg-teal-50 rounded-xl px-3 py-2.5">
              <div>
                <p className="text-teal-800 font-bold text-sm">{ex.k}</p>
                <p className="text-teal-500 text-xs mt-0.5">{ex.m}</p>
              </div>
              <AudioButton text={ex.k} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Pisos */}
      <Section emoji="🏢" title="Pisos — 층 / 지하" color="border-blue-100">
        <p className="text-xs text-blue-500 mb-3 pt-1">
          <strong>층</strong> = piso / planta &nbsp;·&nbsp; <strong>지하</strong> = sótano / subterráneo
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { k:"1층",    m:"Primer piso / Planta baja" },
            { k:"2층",    m:"Segundo piso" },
            { k:"3층",    m:"Tercer piso" },
            { k:"4층",    m:"Cuarto piso" },
            { k:"지하 1층", m:"Sótano 1" },
            { k:"지하 2층", m:"Sótano 2" },
          ].map((ex) => (
            <div key={ex.k} className="flex items-center justify-between bg-blue-50 rounded-xl px-3 py-2.5">
              <div>
                <p className="text-blue-800 font-bold text-sm">{ex.k}</p>
                <p className="text-blue-500 text-xs">{ex.m}</p>
              </div>
              <AudioButton text={ex.k} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Precios */}
      <Section emoji="💰" title="Precios en wones — 원" color="border-green-100">
        <p className="text-xs text-green-500 mb-3 pt-1">
          <strong>원</strong> = won (moneda coreana) &nbsp;·&nbsp; <strong>얼마예요?</strong> = ¿Cuánto cuesta?
        </p>
        <div className="flex flex-col gap-2">
          {[
            { k:"얼마예요?",        m:"¿Cuánto cuesta?" },
            { k:"천 원이에요.",      m:"Son 1.000 wones." },
            { k:"오천 원이에요.",    m:"Son 5.000 wones." },
            { k:"이만 원이에요.",    m:"Son 20.000 wones." },
            { k:"비싸요.",          m:"Es caro." },
            { k:"싸요.",            m:"Es barato." },
            { k:"할인돼요?",        m:"¿Hay descuento?" },
            { k:"거스름돈이에요.",   m:"Es el cambio / vuelto." },
          ].map((ex) => (
            <div key={ex.k} className="flex items-center justify-between bg-green-50 rounded-xl px-3 py-2.5">
              <div>
                <p className="text-green-800 font-bold text-sm">{ex.k}</p>
                <p className="text-green-500 text-xs">{ex.m}</p>
              </div>
              <AudioButton text={ex.k} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Emergencias */}
      <Section emoji="🚨" title="Números de emergencia y turismo" color="border-red-100">
        <div className="flex flex-col gap-2 pt-1">
          {emergency.map((e) => (
            <div key={e.number} className="flex items-center justify-between bg-red-50 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-red-700 font-extrabold text-xl w-14">{e.number}</span>
                <p className="text-red-600 text-sm font-medium">{e.desc}</p>
              </div>
              <AudioButton text={e.number} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Objetos */}
      <Section emoji="🛍️" title="Vocabulario — Objetos" color="border-cyan-100">
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

      {/* Conversor */}
      <Section emoji="🔢" title="Conversor de números" color="border-emerald-100">
        <div className="pt-2">
          <NumberConverter />
        </div>
      </Section>

    </div>
  );
}
