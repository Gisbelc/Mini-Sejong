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

/* ── Vocabulario ── */
const fruits = [
  { korean: "사과",   meaning: "Manzana",  emoji: "🍎" },
  { korean: "딸기",   meaning: "Fresa",    emoji: "🍓" },
  { korean: "포도",   meaning: "Uva",      emoji: "🍇" },
  { korean: "바나나", meaning: "Banana",   emoji: "🍌" },
];

const drinks = [
  { korean: "우유",  meaning: "Leche",      emoji: "🥛" },
  { korean: "주스",  meaning: "Jugo",       emoji: "🧃" },
  { korean: "커피",  meaning: "Café",       emoji: "☕" },
  { korean: "콜라",  meaning: "Coca-cola",  emoji: "🥤" },
];

const food = [
  { korean: "빵",    meaning: "Pan",          emoji: "🍞" },
  { korean: "과자",  meaning: "Snack",        emoji: "🍪" },
  { korean: "햄버거",meaning: "Hamburguesa",  emoji: "🍔" },
];

const bathroom = [
  { korean: "칫솔", meaning: "Cepillo de dientes", emoji: "🪥" },
  { korean: "치약", meaning: "Pasta de dientes",   emoji: "🧴" },
  { korean: "비누", meaning: "Jabón",               emoji: "🧼" },
  { korean: "수건", meaning: "Toalla",              emoji: "🏳️" },
];

export default function FoodLesson() {
  return (
    <div className="flex flex-col gap-3 mb-4">

      {/* Diálogo */}
      <Section emoji="💬" title="Diálogo" color="border-emerald-100" defaultOpen>
        <div className="flex flex-col gap-3 pt-1">
          {[
            { s:"A", k:"뭐 드릴까요?",                         m:"¿Qué desea? / ¿Qué le doy?",               r:false },
            { s:"B", k:"우유하고 빵 주세요!",                   m:"¡Leche y pan, por favor!",                 r:true  },
            { s:"A", k:"과일도 드릴까요?",                      m:"¿Le doy fruta también?",                   r:false },
            { s:"B", k:"네! 사과하고 딸기 주세요.",             m:"¡Sí! Manzana y fresa, por favor.",         r:true  },
            { s:"A", k:"치약이 어디에 있어요?",                 m:"¿Dónde está la pasta de dientes?",         r:false },
            { s:"B", k:"비누 위에 있어요.",                     m:"Está encima del jabón.",                   r:true  },
            { s:"A", k:"우유가 있어요?",                        m:"¿Hay leche?",                              r:false },
            { s:"B", k:"네, 있어요. 사과하고 오렌지도 맛있어요!", m:"Sí, hay. ¡Las manzanas y naranjas también están deliciosas!", r:true },
          ].map((l, i) => (
            <div key={i} className={`flex items-start gap-2 ${l.r ? "flex-row-reverse" : ""}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white
                ${l.r ? "bg-emerald-500" : "bg-orange-400"}`}>{l.s}</div>
              <div className={`flex-1 rounded-2xl px-3 py-2 max-w-[85%] border
                ${l.r ? "bg-emerald-50 border-emerald-200" : "bg-orange-50 border-orange-200"}`}>
                <div className="flex items-center justify-between gap-2">
                  <p className={`font-bold text-sm ${l.r ? "text-emerald-800" : "text-orange-800"}`}>{l.k}</p>
                  <AudioButton text={l.k} size="sm" />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{l.m}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 하고 — A y B */}
      <Section emoji="🔗" title="하고 — unir sustantivos con 'y'" color="border-orange-100">
        <p className="text-xs text-orange-500 mb-3 pt-1">
          <strong>하고</strong> se pega al primer sustantivo para decir <em>"A y B"</em>.
          No cambia según consonante o vocal.
        </p>
        <div className="bg-orange-50 rounded-xl px-4 py-3 border border-orange-100 mb-3">
          <p className="text-xs text-orange-600 font-bold mb-1">Estructura</p>
          <p className="text-sm font-mono text-orange-900">
            <span className="text-orange-600 font-bold">[A]</span> + 하고 + <span className="text-orange-600 font-bold">[B]</span>
          </p>
          <p className="text-xs text-orange-400 italic mt-0.5">→ A y B</p>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { k:"우유하고 주스",           m:"leche y jugo" },
            { k:"사과하고 바나나",         m:"manzana y banana" },
            { k:"커피하고 빵",             m:"café y pan" },
            { k:"칫솔하고 치약",           m:"cepillo y pasta de dientes" },
            { k:"사과하고 오렌지가 맛있어요!", m:"¡Las manzanas y las naranjas están deliciosas!" },
          ].map((ex) => (
            <div key={ex.k} className="flex items-center justify-between bg-orange-50 rounded-xl px-3 py-2.5 border border-orange-100">
              <div>
                <p className="text-orange-900 font-bold text-sm">{ex.k}</p>
                <p className="text-orange-400 text-xs mt-0.5">{ex.m}</p>
              </div>
              <AudioButton text={ex.k} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* 맛있어요 */}
      <Section emoji="😋" title="맛있어요 — es delicioso / está rico" color="border-pink-100">
        <p className="text-xs text-pink-500 mb-3 pt-1">
          Usa <strong>이/가</strong> antes de 맛있어요 según si el sustantivo termina en consonante o vocal.
        </p>
        <div className="flex gap-2 mb-3">
          <div className="flex-1 bg-pink-50 rounded-xl px-3 py-2.5 border border-pink-200 text-center">
            <p className="text-pink-800 font-extrabold text-base">+ 이 맛있어요</p>
            <p className="text-pink-500 text-xs mt-1">termina en consonante</p>
            <p className="text-pink-700 text-xs mt-0.5 font-mono">빵이 맛있어요</p>
          </div>
          <div className="flex-1 bg-pink-50 rounded-xl px-3 py-2.5 border border-pink-200 text-center">
            <p className="text-pink-800 font-extrabold text-base">+ 가 맛있어요</p>
            <p className="text-pink-500 text-xs mt-1">termina en vocal</p>
            <p className="text-pink-700 text-xs mt-0.5 font-mono">사과가 맛있어요</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { k:"사과가 맛있어요!",             m:"¡La manzana está deliciosa!" },
            { k:"딸기가 맛있어요!",             m:"¡La fresa está deliciosa!" },
            { k:"햄버거가 맛있어요!",           m:"¡La hamburguesa está deliciosa!" },
            { k:"빵이 맛있어요!",               m:"¡El pan está delicioso!" },
            { k:"사과하고 딸기가 맛있어요!",   m:"¡Las manzanas y las fresas están deliciosas!" },
          ].map((ex) => (
            <div key={ex.k} className="flex items-center justify-between bg-pink-50 rounded-xl px-3 py-2.5 border border-pink-100">
              <div>
                <p className="text-pink-900 font-bold text-sm">{ex.k}</p>
                <p className="text-pink-400 text-xs mt-0.5">{ex.m}</p>
              </div>
              <AudioButton text={ex.k} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* 있어요/없어요 — ¿hay? */}
      <Section emoji="🔍" title="¿Hay...? — 있어요 / 없어요" color="border-cyan-100">
        <p className="text-xs text-cyan-500 mb-3 pt-1">
          Para preguntar si algo existe o está disponible. Recuerda la partícula <strong>이/가</strong> según la última letra.
        </p>
        <div className="flex flex-col gap-2">
          {[
            { k:"치약이 있어요?",    m:"¿Hay pasta de dientes?",           note:"치약 → termina en consonante → 이" },
            { k:"네, 있어요.",       m:"Sí, hay.",                          note:"" },
            { k:"아니요, 없어요.",   m:"No, no hay.",                       note:"" },
            { k:"비누가 있어요?",    m:"¿Hay jabón?",                      note:"비누 → termina en vocal → 가" },
            { k:"우유가 있어요?",    m:"¿Hay leche?",                      note:"우유 → termina en vocal → 가" },
            { k:"수건이 있어요?",    m:"¿Hay toalla?",                     note:"수건 → termina en consonante → 이" },
          ].map((ex) => (
            <div key={ex.k} className="bg-cyan-50 rounded-xl px-3 py-2.5 border border-cyan-100">
              <div className="flex items-center justify-between gap-2">
                <p className="text-cyan-900 font-bold text-sm">{ex.k}</p>
                <AudioButton text={ex.k} size="sm" />
              </div>
              <p className="text-cyan-500 text-xs mt-0.5">{ex.m}</p>
              {ex.note && <p className="text-cyan-300 text-xs italic">{ex.note}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* 어디에 있어요? + 위에 */}
      <Section emoji="📍" title="¿Dónde está? — 어디에 있어요?" color="border-emerald-100">
        <p className="text-xs text-emerald-500 mb-3 pt-1">
          Pregunta dónde está algo. La respuesta usa preposiciones de la Unidad 4 + <strong>에 있어요</strong>.
        </p>
        <div className="flex flex-col gap-2">
          {[
            { k:"치약이 어디에 있어요?",   m:"¿Dónde está la pasta de dientes?" },
            { k:"비누 위에 있어요.",        m:"Está encima del jabón." },
            { k:"수건이 어디에 있어요?",   m:"¿Dónde está la toalla?" },
            { k:"의자 위에 있어요.",        m:"Está encima de la silla." },
            { k:"커피가 어디에 있어요?",   m:"¿Dónde está el café?" },
            { k:"냉장고 안에 있어요.",      m:"Está dentro de la nevera." },
          ].map((ex) => (
            <div key={ex.k} className="flex items-center justify-between bg-emerald-50 rounded-xl px-3 py-2.5 border border-emerald-100">
              <div>
                <p className="text-emerald-900 font-bold text-sm">{ex.k}</p>
                <p className="text-emerald-400 text-xs mt-0.5">{ex.m}</p>
              </div>
              <AudioButton text={ex.k} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* 뭐 줄까요? / 주세요 */}
      <Section emoji="🙏" title="뭐 줄까요? / 주세요 — ¿Qué quieres? / Por favor" color="border-violet-100">
        <p className="text-xs text-violet-500 mb-3 pt-1">
          <strong>뭐 줄까요?</strong> es "¿qué le doy?" y <strong>주세요</strong> es "deme / por favor" para pedir cosas.
        </p>
        <div className="flex flex-col gap-2 mb-3">
          <div className="bg-violet-50 rounded-xl px-4 py-3 border border-violet-100">
            <p className="text-xs text-violet-600 font-bold mb-1">Pregunta</p>
            <div className="flex items-center justify-between">
              <p className="text-violet-900 font-bold">뭐 줄까요? / 뭐 드릴까요?</p>
              <AudioButton text="뭐 드릴까요?" size="sm" />
            </div>
            <p className="text-violet-400 text-xs italic mt-0.5">¿Qué quieres? / ¿Qué le doy? (더 formal)</p>
          </div>
          <div className="bg-violet-50 rounded-xl px-4 py-3 border border-violet-100">
            <p className="text-xs text-violet-600 font-bold mb-1">Respuesta</p>
            <div className="flex items-center justify-between">
              <p className="text-violet-900 font-bold">[cosa] + 주세요</p>
              <AudioButton text="주세요" size="sm" />
            </div>
            <p className="text-violet-400 text-xs italic mt-0.5">Deme [cosa] / [cosa], por favor</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { k:"커피 주세요.",             m:"Café, por favor." },
            { k:"우유하고 빵 주세요.",      m:"Leche y pan, por favor." },
            { k:"사과하고 딸기 주세요!",   m:"¡Manzana y fresa, por favor!" },
            { k:"콜라하고 햄버거 주세요.", m:"Coca-cola y hamburguesa, por favor." },
          ].map((ex) => (
            <div key={ex.k} className="flex items-center justify-between bg-violet-50 rounded-xl px-3 py-2.5 border border-violet-100">
              <div>
                <p className="text-violet-900 font-bold text-sm">{ex.k}</p>
                <p className="text-violet-400 text-xs mt-0.5">{ex.m}</p>
              </div>
              <AudioButton text={ex.k} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Frutas */}
      <Section emoji="🍎" title="Vocabulario — Frutas" color="border-red-100">
        <div className="grid grid-cols-2 gap-2 pt-1">
          {fruits.map((f) => (
            <div key={f.korean} className="flex items-center justify-between bg-red-50 rounded-xl px-3 py-2">
              <div>
                <p className="text-xs">{f.emoji}</p>
                <p className="text-red-800 font-bold text-base leading-tight">{f.korean}</p>
                <p className="text-red-400 text-xs">{f.meaning}</p>
              </div>
              <AudioButton text={f.korean} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Bebidas */}
      <Section emoji="🥛" title="Vocabulario — Bebidas" color="border-blue-100">
        <div className="grid grid-cols-2 gap-2 pt-1">
          {drinks.map((d) => (
            <div key={d.korean} className="flex items-center justify-between bg-blue-50 rounded-xl px-3 py-2">
              <div>
                <p className="text-xs">{d.emoji}</p>
                <p className="text-blue-800 font-bold text-base leading-tight">{d.korean}</p>
                <p className="text-blue-400 text-xs">{d.meaning}</p>
              </div>
              <AudioButton text={d.korean} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Comida */}
      <Section emoji="🍔" title="Vocabulario — Comida" color="border-amber-100">
        <div className="grid grid-cols-2 gap-2 pt-1">
          {food.map((f) => (
            <div key={f.korean} className="flex items-center justify-between bg-amber-50 rounded-xl px-3 py-2">
              <div>
                <p className="text-xs">{f.emoji}</p>
                <p className="text-amber-800 font-bold text-base leading-tight">{f.korean}</p>
                <p className="text-amber-400 text-xs">{f.meaning}</p>
              </div>
              <AudioButton text={f.korean} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Artículos de baño */}
      <Section emoji="🧼" title="Vocabulario — Artículos de baño" color="border-teal-100">
        <div className="grid grid-cols-2 gap-2 pt-1">
          {bathroom.map((b) => (
            <div key={b.korean} className="flex items-center justify-between bg-teal-50 rounded-xl px-3 py-2">
              <div>
                <p className="text-xs">{b.emoji}</p>
                <p className="text-teal-800 font-bold text-base leading-tight">{b.korean}</p>
                <p className="text-teal-400 text-xs">{b.meaning}</p>
              </div>
              <AudioButton text={b.korean} size="sm" />
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}
