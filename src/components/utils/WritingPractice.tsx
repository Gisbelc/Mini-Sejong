"use client";

import { useState } from "react";
import AudioButton from "@/components/quiz/AudioButton";

/* ── Tipos ── */
interface Exercise {
  id: string;
  prompt: string;
  hint?: string;
  answers: string[];
}

interface UnitSection {
  unit: number;
  emoji: string;
  title: string;
  titleEs: string;
  color: string;
  headerBg: string;
  titleColor: string;
  subtitleColor: string;
  badge: string;
  countColor: string;
  exercises: Exercise[];
}

/* ── Datos ── */
const UNITS: UnitSection[] = [
  {
    unit: 1, emoji: "🎓",
    title: "저는 학생이에요",
    titleEs: "Saludos · presentaciones · profesiones",
    color: "border-emerald-200", headerBg: "bg-emerald-50",
    titleColor: "text-emerald-800", subtitleColor: "text-emerald-400",
    badge: "bg-emerald-600 text-white", countColor: "text-emerald-400",
    exercises: [
      { id: "u1e1",  prompt: "Hola (formal)",                              answers: ["안녕하세요"] },
      { id: "u1e2",  prompt: "¿Cómo estás? (formal)",                      answers: ["잘 지내세요?", "잘 지내요?"] },
      { id: "u1e3",  prompt: "Estoy bien",                                  answers: ["잘 지내요", "네 잘 지내요", "네, 잘 지내요"] },
      { id: "u1e4",  prompt: "Mucho gusto en conocerte",                    answers: ["만나서 반갑습니다", "반갑습니다"] },
      { id: "u1e5",  prompt: "¿Cómo te llamas?",                            answers: ["이름이 뭐예요?"] },
      { id: "u1e6",  prompt: "¿Cuál es tu profesión?",                      answers: ["직업이 뭐예요?"] },
      { id: "u1e7",  prompt: "Yo soy estudiante",           hint: "저는 ___ 이에요/예요",       answers: ["저는 학생이에요"] },
      { id: "u1e8",  prompt: "Yo soy doctor/a",             hint: "저는 ___ 이에요/예요",       answers: ["저는 의사예요", "저는 의사이에요"] },
      { id: "u1e9",  prompt: "Soy de Colombia",             hint: "저는 ___ 사람이에요",        answers: ["저는 콜롬비아 사람이에요"] },
      { id: "u1e10", prompt: "Adiós (a quien se va)",                        answers: ["안녕히 가세요"] },
      { id: "u1e11", prompt: "Adiós (a quien se queda)",                     answers: ["안녕히 계세요"] },
    ],
  },
  {
    unit: 2, emoji: "🏃",
    title: "어디에 가요?",
    titleEs: "Verbos · lugares · actividades",
    color: "border-blue-200", headerBg: "bg-blue-50",
    titleColor: "text-blue-800", subtitleColor: "text-blue-400",
    badge: "bg-blue-600 text-white", countColor: "text-blue-400",
    exercises: [
      { id: "u2e1", prompt: "¿A dónde vas?",                               answers: ["어디에 가요?"] },
      { id: "u2e2", prompt: "Voy a la cafetería",       hint: "___ 에 가요", answers: ["카페에 가요"] },
      { id: "u2e3", prompt: "Voy al hospital",          hint: "___ 에 가요", answers: ["병원에 가요"] },
      { id: "u2e4", prompt: "¿Qué haces ahora?",                           answers: ["지금 뭐 해요?"] },
      { id: "u2e5", prompt: "Estudio hoy",                                  answers: ["오늘 공부해요"] },
      { id: "u2e6", prompt: "Normalmente descanso",                         answers: ["보통 쉬어요"] },
      { id: "u2e7", prompt: "Como (ahora)",                                  answers: ["지금 먹어요"] },
      { id: "u2e8", prompt: "¿Qué haces el fin de semana?",                 answers: ["주말에 뭐 해요?"] },
    ],
  },
  {
    unit: 3, emoji: "🔢",
    title: "숫자",
    titleEs: "Números · precios · pisos",
    color: "border-indigo-200", headerBg: "bg-indigo-50",
    titleColor: "text-indigo-800", subtitleColor: "text-indigo-400",
    badge: "bg-indigo-600 text-white", countColor: "text-indigo-400",
    exercises: [
      { id: "u3e1", prompt: "¿Cuánto cuesta?",                              answers: ["얼마예요?"] },
      { id: "u3e2", prompt: "Son 5.000 wones",                              answers: ["오천 원이에요"] },
      { id: "u3e3", prompt: "Son 20.000 wones",                             answers: ["이만 원이에요"] },
      { id: "u3e4", prompt: "Es barato",                                    answers: ["싸요"] },
      { id: "u3e5", prompt: "Es caro",                                      answers: ["비싸요"] },
      { id: "u3e6", prompt: "¿Qué tal? / ¿Cómo está?",                     answers: ["어때요?"] },
      { id: "u3e7", prompt: "Está en el segundo piso",  hint: "___ 층에 있어요", answers: ["2층에 있어요", "이층에 있어요"] },
    ],
  },
  {
    unit: 4, emoji: "🏠",
    title: "어디에 있어요?",
    titleEs: "Ubicaciones · preposiciones · posesivos",
    color: "border-orange-200", headerBg: "bg-orange-50",
    titleColor: "text-orange-800", subtitleColor: "text-orange-400",
    badge: "bg-orange-500 text-white", countColor: "text-orange-400",
    exercises: [
      { id: "u4e1", prompt: "¿Dónde está el celular?",                      answers: ["휴대폰이 어디에 있어요?"] },
      { id: "u4e2", prompt: "¿Dónde está el libro?",                        answers: ["책이 어디에 있어요?"] },
      { id: "u4e3", prompt: "El libro está sobre el escritorio", hint: "___ 이/가 ___ 위에 있어요", answers: ["책이 책상 위에 있어요"] },
      { id: "u4e4", prompt: "El celular está al lado de la cama",           answers: ["휴대폰이 침대 옆에 있어요"] },
      { id: "u4e5", prompt: "¿Estás en casa?",                              answers: ["집에 있어요?"] },
      { id: "u4e6", prompt: "Sí, estoy en casa",                            answers: ["네, 집에 있어요", "네 집에 있어요"] },
      { id: "u4e7", prompt: "No, no estoy en casa",                         answers: ["아니요, 집에 없어요", "아니요 집에 없어요"] },
      { id: "u4e8", prompt: "Mi celular",                  hint: "나의 ___ / 내 ___", answers: ["나의 휴대폰", "내 휴대폰"] },
    ],
  },
  {
    unit: 5, emoji: "🍎",
    title: "사과하고 오렌지가 맛있어요",
    titleEs: "Comida · 하고 · 주세요 · contadores",
    color: "border-pink-200", headerBg: "bg-pink-50",
    titleColor: "text-pink-800", subtitleColor: "text-pink-400",
    badge: "bg-pink-500 text-white", countColor: "text-pink-400",
    exercises: [
      { id: "u5e1", prompt: "Leche y pan, por favor",    hint: "___ 하고 ___ 주세요", answers: ["우유하고 빵 주세요"] },
      { id: "u5e2", prompt: "Manzana y fresa, por favor",                   answers: ["사과하고 딸기 주세요"] },
      { id: "u5e3", prompt: "¿Hay leche?",                hint: "___ 이/가 있어요?",  answers: ["우유가 있어요?"] },
      { id: "u5e4", prompt: "No, no hay",                                   answers: ["아니요, 없어요"] },
      { id: "u5e5", prompt: "La fresa está deliciosa",                      answers: ["딸기가 맛있어요", "딸기가 맛있어요!"] },
      { id: "u5e6", prompt: "¿Cuántos hermanos tienes?",                    answers: ["형제가 몇 명이에요?"] },
      { id: "u5e7", prompt: "¿Cuántos años tienes?",                        answers: ["나이가 몇 살이에요?", "몇 살이에요?"] },
      { id: "u5e8", prompt: "Dos tazas de café, por favor",                 answers: ["커피 두 잔 주세요"] },
      { id: "u5e9", prompt: "Una botella de agua, por favor",               answers: ["물 한 병 주세요"] },
    ],
  },
];

/* ── Validación ── */
function normalize(s: string) {
  return s.trim().replace(/[?.!,。·~]/g, "").replace(/\s+/g, " ");
}

/* ── ExerciseCard ── */
function ExerciseCard({ ex, unitColor }: { ex: Exercise; unitColor: string }) {
  const [input, setInput]   = useState("");
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);

  function check() {
    if (!input.trim()) return;
    const ok = ex.answers.some((a) => normalize(a) === normalize(input));
    setResult(ok ? "correct" : "incorrect");
  }

  function retry() {
    setInput("");
    setResult(null);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <p className="font-bold text-gray-800 text-sm mb-1">{ex.prompt}</p>
      {ex.hint && (
        <p className="text-xs text-gray-400 italic mb-3">💡 {ex.hint}</p>
      )}

      {result === null && (
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="Escribe en coreano…"
            className={`flex-1 border-2 rounded-xl px-3 py-2 text-sm font-medium
              focus:outline-none transition-colors bg-gray-50 ${unitColor}
              placeholder:text-gray-300`}
          />
          <button
            onClick={check}
            disabled={!input.trim()}
            className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold
              disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors"
          >
            ✓
          </button>
        </div>
      )}

      {result === "correct" && (
        <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-3 border border-green-100">
          <div>
            <p className="text-green-600 font-bold text-xs mb-0.5">¡Correcto! 🎉</p>
            <p className="text-green-800 font-bold text-base">{input}</p>
          </div>
          <div className="flex items-center gap-2">
            <AudioButton text={ex.answers[0]} size="sm" />
            <button onClick={retry} className="text-xs text-green-400 hover:text-green-600 font-medium">↺</button>
          </div>
        </div>
      )}

      {result === "incorrect" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between bg-red-50 rounded-xl px-4 py-2.5 border border-red-100">
            <p className="text-red-400 text-sm line-through">{input}</p>
            <button onClick={retry} className="text-xs text-red-400 hover:text-red-600 font-medium ml-3 flex-shrink-0">
              ↺ intentar
            </button>
          </div>
          <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-2.5 border border-emerald-100">
            <div>
              <p className="text-xs text-emerald-400 mb-0.5">Respuesta correcta</p>
              <p className="text-emerald-800 font-bold">{ex.answers[0]}</p>
            </div>
            <AudioButton text={ex.answers[0]} size="sm" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── UnitAccordion ── */
function UnitAccordion({ unit }: { unit: UnitSection }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-2xl border-2 ${unit.color} overflow-hidden bg-white`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-5 py-3.5 ${unit.headerBg} hover:brightness-[0.97] transition-all`}
      >
        <div className="flex items-center gap-2.5">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${unit.badge}`}>
            U{unit.unit}
          </span>
          <div className="text-left">
            <p className={`font-bold text-sm ${unit.titleColor}`}>
              {unit.emoji} {unit.title}
            </p>
            <p className={`text-xs ${unit.subtitleColor} italic`}>{unit.titleEs}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs font-medium ${unit.countColor}`}>
            {unit.exercises.length} frases
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-3 flex flex-col gap-3">
          {unit.exercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              ex={ex}
              unitColor={`focus:${unit.color.replace("border-", "border-")}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Componente principal ── */
export default function WritingPractice() {
  return (
    <div className="flex flex-col gap-3">
      {UNITS.map((unit) => (
        <UnitAccordion key={unit.unit} unit={unit} />
      ))}
    </div>
  );
}
