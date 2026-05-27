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
const vocab = [
  { korean: "저",      meaning: "Yo (formal/humilde)" },
  { korean: "저는",    meaning: "Yo soy… (formal + tema)" },
  { korean: "나는",    meaning: "Yo soy… (informal, con amigos)" },
  { korean: "이름",    meaning: "Nombre" },
  { korean: "학생",    meaning: "Estudiante" },
  { korean: "선생님",  meaning: "Maestro/a" },
  { korean: "의사",    meaning: "Doctor/a" },
  { korean: "간호사",  meaning: "Enfermero/a" },
  { korean: "회사원",  meaning: "Empleado de empresa" },
  { korean: "직업",    meaning: "Profesión / Trabajo" },
  { korean: "요리사",  meaning: "Chef / Cocinero/a" },
  { korean: "변호사",  meaning: "Abogado/a" },
];

const countries = [
  { korean: "나라",      meaning: "País" },
  { korean: "사람",      meaning: "Persona / Gente" },
  { korean: "한국",      meaning: "Corea del Sur" },
  { korean: "미국",      meaning: "Estados Unidos" },
  { korean: "콜롬비아",  meaning: "Colombia" },
  { korean: "멕시코",    meaning: "México" },
  { korean: "베네수엘라",meaning: "Venezuela" },
  { korean: "브라질",    meaning: "Brasil" },
  { korean: "아르헨티나",meaning: "Argentina" },
  { korean: "칠레",      meaning: "Chile" },
  { korean: "스페인",    meaning: "España" },
  { korean: "일본",      meaning: "Japón" },
  { korean: "중국",      meaning: "China" },
];

function hasBatchim(char: string): boolean {
  const code = char.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}

/* ── Componente principal ── */
export default function IntroLesson() {
  const [name, setName] = useState("");

  const lastChar   = name.trim().slice(-1);
  const ending     = lastChar && hasBatchim(lastChar) ? "이에요" : "예요";
  const namePhrase = name.trim() ? `저는 ${name.trim()}${ending}.` : "저는 [tu nombre]이에요 / 예요.";
  const nameMeaning= name.trim() ? `Yo me llamo ${name.trim()}.` : "Yo me llamo [tu nombre].";

  return (
    <div className="flex flex-col gap-3 mb-4">

      {/* Diálogo */}
      <Section emoji="💬" title="¿Cómo presentarse?" color="border-cyan-100" defaultOpen>
        <p className="text-xs text-cyan-400 mb-3">Escribe tu nombre y arma tu presentación</p>
        <input
          type="text" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="ej. 지수"
          className="w-full border-2 border-cyan-200 rounded-xl px-4 py-2.5 text-base mb-4
            focus:outline-none focus:border-cyan-400 bg-cyan-50 placeholder:text-cyan-300"
        />
        <div className="flex flex-col gap-3">
          {[
            { s:"A", k:"안녕하세요!",       m:"¡Hola!",                        r:false },
            { s:"B", k:"안녕하세요!",       m:"¡Hola!",                        r:true  },
            { s:"A", k:namePhrase,          m:nameMeaning,                     r:false, hi:true },
            { s:"A", k:"저는 학생이에요.",  m:"Yo soy estudiante.",            r:false },
            { s:"B", k:"만나서 반갑습니다!",m:"¡Mucho gusto en conocerte!",    r:true  },
            { s:"A", k:"직업이 뭐예요?",    m:"¿Cuál es tu profesión?",        r:false },
            { s:"B", k:"저는 선생님이에요.",m:"Yo soy maestra.",               r:true  },
          ].map((l, i) => (
            <div key={i} className={`flex items-start gap-2 ${l.r ? "flex-row-reverse" : ""}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white
                ${l.r ? "bg-cyan-500" : "bg-emerald-500"}`}>{l.s}</div>
              <div className={`flex-1 rounded-2xl px-3 py-2 max-w-[85%] border
                ${"hi" in l && l.hi ? "bg-cyan-100 border-cyan-300 border-2"
                  : l.r ? "bg-cyan-50 border-cyan-200" : "bg-emerald-50 border-emerald-200"}`}>
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

      {/* Vocabulario */}
      <Section emoji="📚" title="Vocabulario" color="border-emerald-100">
        <div className="grid grid-cols-2 gap-2 pt-1">
          {vocab.map((v) => (
            <div key={v.korean} className="flex items-center justify-between bg-emerald-50 rounded-xl px-3 py-2">
              <div>
                <p className="text-emerald-800 font-bold text-base leading-tight">{v.korean}</p>
                <p className="text-emerald-500 text-xs">{v.meaning}</p>
              </div>
              <AudioButton text={v.korean} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Países */}
      <Section emoji="🌎" title="Países" color="border-green-100">
        <p className="text-xs text-green-500 mb-3 pt-1">
          <span className="font-semibold">저는 [país] 사람이에요</span> = Soy de [país]
        </p>
        <div className="grid grid-cols-2 gap-2">
          {countries.map((c) => (
            <div key={c.korean} className="flex items-center justify-between bg-green-50 rounded-xl px-3 py-2">
              <div>
                <p className="text-green-800 font-bold text-base leading-tight">{c.korean}</p>
                <p className="text-green-500 text-xs">{c.meaning}</p>
              </div>
              <AudioButton text={c.korean} size="sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Partícula 에 */}
      <Section emoji="📌" title="La partícula 에 (ubicación)" color="border-blue-100">
        <p className="text-xs text-blue-500 mb-3 pt-1">
          Indica <strong>dónde está</strong> algo o alguien. Equivale a <em>"en"</em> o <em>"a"</em>.
          <br /><span className="text-blue-400">Lugar + 에 + 있어요 = Estoy en [lugar]</span>
        </p>
        <div className="flex flex-col gap-2">
          {[
            { k:"학교에 있어요",    m:"Estoy en la escuela" },
            { k:"집에 있어요",      m:"Estoy en casa" },
            { k:"병원에 있어요",    m:"Estoy en el hospital" },
            { k:"회사에 있어요",    m:"Estoy en la empresa" },
            { k:"어디에 있어요?",   m:"¿Dónde estás?" },
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

      {/* 은 / 는 */}
      <Section emoji="📌" title="은 / 는 — marcador de tema" color="border-orange-100">
        <p className="text-xs text-orange-500 mb-3 pt-1">
          Se ponen después del <strong>sujeto o tema</strong> de la oración.
          La elección depende de si la palabra termina en consonante o vocal.
        </p>
        <div className="flex gap-2 mb-3">
          <div className="flex-1 bg-orange-50 rounded-xl px-4 py-3 border border-orange-200 text-center">
            <p className="text-orange-800 font-extrabold text-xl">은</p>
            <p className="text-orange-600 text-xs font-semibold mt-1">Después de consonante</p>
            <p className="text-orange-400 text-xs">con 받침</p>
          </div>
          <div className="flex-1 bg-orange-50 rounded-xl px-4 py-3 border border-orange-200 text-center">
            <p className="text-orange-800 font-extrabold text-xl">는</p>
            <p className="text-orange-600 text-xs font-semibold mt-1">Después de vocal</p>
            <p className="text-orange-400 text-xs">sin 받침</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { korean: "저는 학생이에요",         meaning: "저 termina en vocal → 는",      note: "Yo soy estudiante" },
            { korean: "나는 의사예요",            meaning: "나 termina en vocal → 는",      note: "Yo soy doctor/a (informal)" },
            { korean: "선생님은 누구예요?",       meaning: "선생님 termina en ㅁ → 은",     note: "¿Quién es el/la maestro/a?" },
            { korean: "이름은 뭐예요?",           meaning: "이름 termina en ㅁ → 은",       note: "¿Cuál es tu nombre?" },
            { korean: "의사는 어디에 있어요?",    meaning: "의사 termina en vocal → 는",    note: "¿Dónde está el doctor/a?" },
            { korean: "학생은 학교에 있어요",     meaning: "학생 termina en ㅇ → 은",       note: "El/la estudiante está en la escuela" },
          ].map((ex) => (
            <div key={ex.korean} className="bg-orange-50 rounded-xl px-3 py-2.5 border border-orange-100">
              <div className="flex items-center justify-between gap-2">
                <p className="text-orange-900 font-bold text-sm">{ex.korean}</p>
                <AudioButton text={ex.korean} size="sm" />
              </div>
              <p className="text-orange-500 text-xs mt-0.5">{ex.meaning}</p>
              <p className="text-gray-400 text-xs italic">{ex.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 저는 vs 나는 */}
      <Section emoji="⚠️" title="저는 vs 나는" color="border-amber-200">
        <div className="flex flex-col gap-2 pt-1">
          {[
            { word:"저는", label:"Formal / Educado", desc:"Con personas mayores, desconocidos o en situaciones formales", color:"text-amber-700" },
            { word:"나는", label:"Informal",          desc:"Solo con amigos cercanos o personas de menor edad",          color:"text-amber-500" },
          ].map((item) => (
            <div key={item.word} className="flex items-center gap-3 bg-amber-50 rounded-xl px-4 py-3 border border-amber-200">
              <span className={`text-2xl font-bold ${item.color}`}>{item.word}</span>
              <div>
                <p className={`text-sm font-semibold ${item.color}`}>{item.label}</p>
                <p className="text-xs text-amber-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}
