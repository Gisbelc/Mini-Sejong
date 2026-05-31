"use client";

import { useState, ReactNode } from "react";
import AudioButton from "@/components/quiz/AudioButton";
import NativeNumberConverter from "@/components/quiz/NativeNumberConverter";

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
  { korean: "사과",    meaning: "Manzana",    emoji: "🍎" },
  { korean: "딸기",    meaning: "Fresa",      emoji: "🍓" },
  { korean: "포도",    meaning: "Uva",        emoji: "🍇" },
  { korean: "바나나",  meaning: "Banana",     emoji: "🍌" },
  { korean: "오렌지",  meaning: "Naranja",    emoji: "🍊" },
  { korean: "수박",    meaning: "Sandía",     emoji: "🍉" },
  { korean: "복숭아",  meaning: "Durazno",    emoji: "🍑" },
  { korean: "배",      meaning: "Pera",       emoji: "🍐" },
  { korean: "키위",    meaning: "Kiwi",       emoji: "🥝" },
  { korean: "망고",    meaning: "Mango",      emoji: "🥭" },
  { korean: "귤",      meaning: "Mandarina",  emoji: "🍊" },
  { korean: "파인애플",meaning: "Piña",       emoji: "🍍" },
];

const vegetables = [
  { korean: "당근",   meaning: "Zanahoria",  emoji: "🥕" },
  { korean: "양파",   meaning: "Cebolla",    emoji: "🧅" },
  { korean: "감자",   meaning: "Papa",       emoji: "🥔" },
  { korean: "고구마", meaning: "Camote",     emoji: "🍠" },
  { korean: "토마토", meaning: "Tomate",     emoji: "🍅" },
  { korean: "오이",   meaning: "Pepino",     emoji: "🥒" },
  { korean: "상추",   meaning: "Lechuga",    emoji: "🥬" },
  { korean: "버섯",   meaning: "Hongo",      emoji: "🍄" },
  { korean: "옥수수", meaning: "Maíz",       emoji: "🌽" },
  { korean: "브로콜리",meaning: "Brócoli",   emoji: "🥦" },
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

      {/* ¿Qué hay alrededor? / ¿Quién está en el aula? */}
      <Section emoji="🏫" title="주변에 뭐가 있어요? / 누가 있어요?" color="border-indigo-100">
        <p className="text-xs text-indigo-400 mb-3 pt-1">
          <strong>뭐가</strong> = qué (sujeto) &nbsp;·&nbsp; <strong>누가</strong> = quién (sujeto) &nbsp;·&nbsp; <strong>도</strong> = también
        </p>

        {/* Diálogo alrededor del Sejong */}
        <p className="text-xs font-bold text-indigo-600 mb-2">🗺️ Alrededor de la academia Sejong</p>
        <div className="flex flex-col gap-2 mb-4">
          {[
            { k:"세종 학당 주변에 뭐가 있어요?", m:"¿Qué hay alrededor de la academia Sejong?", q:true },
            { k:"편의점이 있어요.",              m:"Hay una tienda de conveniencia.",          q:false },
            { k:"카페도 있어요.",                m:"También hay un café.",                    q:false },
            { k:"약국하고 식당도 있어요.",       m:"También hay una farmacia y un restaurante.", q:false },
          ].map((ex) => (
            <div key={ex.k} className={`flex items-center justify-between rounded-xl px-3 py-2.5 border
              ${ex.q ? "bg-indigo-50 border-indigo-200" : "bg-white border-indigo-100"}`}>
              <div>
                <p className={`font-bold text-sm ${ex.q ? "text-indigo-800" : "text-indigo-700"}`}>{ex.k}</p>
                <p className="text-indigo-400 text-xs mt-0.5">{ex.m}</p>
              </div>
              <AudioButton text={ex.k} size="sm" />
            </div>
          ))}
        </div>

        {/* Diálogo en el aula */}
        <p className="text-xs font-bold text-indigo-600 mb-2">🏫 En el aula de clases</p>
        <div className="flex flex-col gap-2 mb-4">
          {[
            { k:"교실에 누가 있어요?",       m:"¿Quién está en el aula?",           q:true  },
            { k:"선생님이 있어요.",           m:"Está la maestra / el maestro.",      q:false },
            { k:"학생들이 있어요.",           m:"Están los estudiantes.",             q:false },
            { k:"친구도 있어요?",             m:"¿Tu amigo/a también está?",          q:true  },
            { k:"네, 친구도 있어요.",         m:"Sí, mi amigo/a también está.",       q:false },
          ].map((ex) => (
            <div key={ex.k} className={`flex items-center justify-between rounded-xl px-3 py-2.5 border
              ${ex.q ? "bg-indigo-50 border-indigo-200" : "bg-white border-indigo-100"}`}>
              <div>
                <p className={`font-bold text-sm ${ex.q ? "text-indigo-800" : "text-indigo-700"}`}>{ex.k}</p>
                <p className="text-indigo-400 text-xs mt-0.5">{ex.m}</p>
              </div>
              <AudioButton text={ex.k} size="sm" />
            </div>
          ))}
        </div>

        {/* Vocabulario de lugares */}
        <p className="text-xs font-bold text-indigo-600 mb-2">📍 Lugares comunes</p>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { k:"편의점", m:"Tienda de conveniencia" },
            { k:"식당",   m:"Restaurante" },
            { k:"카페",   m:"Cafetería / Café" },
            { k:"약국",   m:"Farmacia" },
            { k:"은행",   m:"Banco" },
            { k:"서점",   m:"Librería" },
            { k:"공원",   m:"Parque" },
            { k:"마트",   m:"Supermercado" },
          ].map((p) => (
            <div key={p.k} className="flex items-center justify-between bg-indigo-50 rounded-xl px-3 py-2 border border-indigo-100">
              <div>
                <p className="text-indigo-800 font-bold text-sm">{p.k}</p>
                <p className="text-indigo-400 text-xs">{p.m}</p>
              </div>
              <AudioButton text={p.k} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Vocabulario */}
      <Section emoji="📖" title="Vocabulario" color="border-emerald-100">
        <div className="flex flex-col gap-4 pt-1">
          {[
            { label: "🍎 Frutas",             items: fruits,     bg: "bg-red-50",    text: "text-red-800",    sub: "text-red-400"    },
            { label: "🥦 Verduras",            items: vegetables, bg: "bg-green-50",  text: "text-green-800",  sub: "text-green-500"  },
            { label: "🥛 Bebidas",             items: drinks,     bg: "bg-blue-50",   text: "text-blue-800",   sub: "text-blue-400"   },
            { label: "🍔 Comida",              items: food,       bg: "bg-amber-50",  text: "text-amber-800",  sub: "text-amber-400"  },
            { label: "🧼 Artículos de baño",   items: bathroom,   bg: "bg-teal-50",   text: "text-teal-800",   sub: "text-teal-500"   },
          ].map(({ label, items, bg, text, sub }) => (
            <div key={label}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{label}</p>
              <div className="grid grid-cols-2 gap-2">
                {items.map((item) => (
                  <div key={item.korean} className={`flex items-center justify-between ${bg} rounded-xl px-3 py-2`}>
                    <div>
                      <p className="text-xs">{item.emoji}</p>
                      <p className={`${text} font-bold text-base leading-tight`}>{item.korean}</p>
                      <p className={`${sub} text-xs`}>{item.meaning}</p>
                    </div>
                    <AudioButton text={item.korean} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contadores — 개 명 마리 잔 살 */}
      <Section emoji="🔢" title="몇 개예요? — Contadores (분류사)" color="border-amber-100">
        <p className="text-xs text-amber-600 mb-3 pt-1">
          En coreano el número va <strong>detrás del sustantivo</strong> y lleva un <strong>contador</strong> que cambia según lo que se cuente. Se usan los números nativos (하나, 둘…).
        </p>

        {/* Tabla de contadores */}
        <div className="flex flex-col gap-2 mb-4">
          {([
            { counter: "개",   romanization: "gae",   emoji: "📦", usage: "Objetos en general", examples: ["사과 두 개 — dos manzanas", "과자 세 개 — tres snacks"] },
            { counter: "명",   romanization: "myeong", emoji: "👤", usage: "Personas (formal)",  examples: ["학생 세 명 — tres estudiantes", "친구 두 명 — dos amigos"] },
            { counter: "마리", romanization: "mari",   emoji: "🐱", usage: "Animales",            examples: ["고양이 한 마리 — un gato", "강아지 두 마리 — dos perros"] },
            { counter: "잔",   romanization: "jan",    emoji: "☕", usage: "Tazas / Vasos",       examples: ["커피 한 잔 — una taza de café", "주스 두 잔 — dos vasos de jugo"] },
            { counter: "병",   romanization: "byeong", emoji: "🍶", usage: "Botellas",            examples: ["물 한 병 — una botella de agua", "콜라 두 병 — dos botellas de cola"] },
            { counter: "권",   romanization: "gwon",   emoji: "📚", usage: "Libros / Volúmenes",  examples: ["책 한 권 — un libro", "잡지 두 권 — dos revistas"] },
            { counter: "장",   romanization: "jang",   emoji: "📄", usage: "Hojas / Tickets",     examples: ["종이 한 장 — una hoja", "티켓 두 장 — dos tickets"] },
            { counter: "살",   romanization: "sal",    emoji: "🎂", usage: "Años de edad",        examples: ["스물두 살 — 22 años", "열 살 — 10 años"] },
          ] as { counter: string; romanization: string; emoji: string; usage: string; examples: string[] }[]).map((c) => (
            <div key={c.counter} className="bg-amber-50 rounded-xl px-3 py-3 border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{c.emoji}</span>
                <p className="text-amber-900 font-extrabold text-xl">{c.counter}</p>
                <p className="text-amber-400 text-xs font-mono">({c.romanization})</p>
                <AudioButton text={c.counter} size="sm" />
                <p className="text-amber-700 text-xs font-semibold ml-auto">{c.usage}</p>
              </div>
              <div className="flex flex-col gap-0.5 pl-8">
                {c.examples.map((ex) => (
                  <p key={ex} className="text-amber-600 text-xs">• {ex}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Nota: 개 como comodín */}
        <div className="bg-emerald-50 rounded-xl px-4 py-3 border border-emerald-100 mb-4">
          <p className="text-xs text-emerald-700 font-bold mb-0.5">💡 개 como comodín</p>
          <p className="text-xs text-emerald-600">
            Si no recuerdas el contador específico de un <strong>objeto sólido</strong>, usa <strong>개</strong> — se entiende.
            Ej: 꽃 두 개 (dos flores) es válido aunque el contador "correcto" sea 송이.
          </p>
        </div>

        {/* Formas antes de contador */}
        <div className="bg-orange-50 rounded-xl px-4 py-3 border border-orange-100 mb-4">
          <p className="text-xs text-orange-700 font-bold mb-2">⚡ Los números 1–4 y 20 cambian al ir antes de un contador</p>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1">
            {([["하나", "한"], ["둘", "두"], ["셋", "세"], ["넷", "네"], ["스물", "스무"]] as [string, string][]).map(([solo, before]) => (
              <p key={solo} className="text-xs text-orange-600">
                {solo} → <strong className="text-orange-800">{before}</strong>
              </p>
            ))}
          </div>
        </div>

        {/* Patrón 몇 */}
        <div className="bg-amber-50 rounded-xl px-4 py-3 border border-amber-200 mb-4">
          <p className="text-xs text-amber-600 font-bold mb-1">Estructura — ¿cuántos...?</p>
          <p className="text-sm font-mono text-amber-900">
            <span className="text-amber-600 font-bold">[sust.]</span>이/가 +{" "}
            <span className="text-orange-600 font-bold">몇</span>{" "}
            <span className="text-amber-600 font-bold">[contador]</span>이에요/예요?
          </p>
          <p className="text-xs text-amber-400 italic mt-0.5">→ ¿Cuántos [sustantivos] hay/tienes?</p>
        </div>

        {/* Q&A práctica */}
        <div className="flex flex-col gap-2">
          {([
            { q: "형제가 몇 명이에요?",   qm: "¿Cuántos hermanos tienes?",      a: "두 명이에요.",       am: "Tengo dos hermanos." },
            { q: "나이가 몇 살이에요?",   qm: "¿Cuántos años tienes?",          a: "스물다섯 살이에요.", am: "Tengo 25 años." },
            { q: "고양이가 몇 마리예요?", qm: "¿Cuántos gatos tienes/hay?",     a: "세 마리예요.",       am: "Hay tres." },
            { q: "사과가 몇 개예요?",     qm: "¿Cuántas manzanas hay?",         a: "다섯 개예요.",       am: "Hay cinco." },
            { q: "커피 몇 잔 드릴까요?",  qm: "¿Cuántas tazas de café le doy?", a: "두 잔 주세요.",      am: "Dos tazas, por favor." },
          ] as { q: string; qm: string; a: string; am: string }[]).map((ex) => (
            <div key={ex.q} className="rounded-xl border border-amber-100 overflow-hidden">
              <div className="flex items-center justify-between bg-amber-50 px-3 py-2 border-b border-amber-100">
                <div>
                  <p className="text-amber-900 font-bold text-sm">{ex.q}</p>
                  <p className="text-amber-400 text-xs">{ex.qm}</p>
                </div>
                <AudioButton text={ex.q} size="sm" />
              </div>
              <div className="flex items-center justify-between bg-white px-3 py-2">
                <div>
                  <p className="text-amber-700 font-semibold text-sm">{ex.a}</p>
                  <p className="text-amber-400 text-xs">{ex.am}</p>
                </div>
                <AudioButton text={ex.a} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Números coreanos nativos — siempre al final */}
      <Section emoji="1️⃣" title="Números coreanos nativos — 하나, 둘, 셋…" color="border-emerald-100">
        <p className="text-xs text-emerald-400 mb-3 pt-1">
          Distintos de los sino-coreanos (일, 이, 삼…). Se usan para <strong>contar objetos</strong> (개),
          personas (명) y decir la <strong>hora</strong> (시).
        </p>
        <NativeNumberConverter />
      </Section>

    </div>
  );
}
