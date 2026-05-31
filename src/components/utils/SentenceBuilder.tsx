"use client";

import { useState } from "react";
import AudioButton from "@/components/quiz/AudioButton";

/* ── Helpers de gramática ── */
function hasBatchim(word: string): boolean {
  const last = word.trim().slice(-1);
  const code = last.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}
const iGa  = (w: string) => hasBatchim(w) ? "이" : "가";
const ieyo = (w: string) => hasBatchim(w) ? "이에요" : "예요";

/* ── Tipos ── */
interface Option { k: string; es: string }
interface SlotDef { label: string; options: Option[] }
interface AssembledResult { ko: string; es: string }
interface PatternDef {
  id: string;
  unit: string;
  unitBadge: string;
  border: string;
  headerBg: string;
  chipSel: string;
  chipUnsel: string;
  chipText: string;
  resultBg: string;
  resultText: string;
  title: string;
  titleEs: string;
  hasToggle?: boolean;
  slots: SlotDef[];
  assemble: (chosen: Option[], negative?: boolean) => AssembledResult;
}
interface UnitGroup {
  id: string;
  order: number;
  emoji: string;
  title: string;
  titleEs: string;
  color: string;
  headerBg: string;
  titleColor: string;
  subtitleColor: string;
  badge: string;
  countColor: string;
  patternIds: string[];
}

/* ── Patrones ── */
const PATTERNS: PatternDef[] = [

  /* ── U1 ── */
  {
    id: "p1",
    unit: "U1",
    unitBadge: "bg-emerald-600 text-white",
    border: "border-emerald-200",
    headerBg: "bg-emerald-50",
    chipSel: "bg-emerald-600 text-white",
    chipUnsel: "bg-white border-emerald-200 text-emerald-800",
    chipText: "text-emerald-800",
    resultBg: "bg-emerald-100",
    resultText: "text-emerald-900",
    title: "저는 ___ 이에요/예요",
    titleEs: "Yo soy ___",
    slots: [
      {
        label: "Profesión",
        options: [
          { k: "학생",   es: "estudiante" },
          { k: "선생님", es: "maestro/a" },
          { k: "의사",   es: "doctor/a" },
          { k: "간호사", es: "enfermero/a" },
          { k: "회사원", es: "empleado/a" },
          { k: "요리사", es: "cocinero/a" },
          { k: "변호사", es: "abogado/a" },
        ],
      },
    ],
    assemble: ([prof]) => ({
      ko: `저는 ${prof.k}${ieyo(prof.k)}`,
      es: `Yo soy ${prof.es}.`,
    }),
  },
  {
    id: "p2",
    unit: "U1",
    unitBadge: "bg-green-600 text-white",
    border: "border-green-200",
    headerBg: "bg-green-50",
    chipSel: "bg-green-600 text-white",
    chipUnsel: "bg-white border-green-200 text-green-800",
    chipText: "text-green-800",
    resultBg: "bg-green-100",
    resultText: "text-green-900",
    title: "저는 ___ 사람이에요",
    titleEs: "Soy de ___",
    slots: [
      {
        label: "País",
        options: [
          { k: "한국",       es: "Corea" },
          { k: "미국",       es: "EE.UU." },
          { k: "콜롬비아",   es: "Colombia" },
          { k: "베네수엘라", es: "Venezuela" },
          { k: "멕시코",     es: "México" },
          { k: "스페인",     es: "España" },
          { k: "브라질",     es: "Brasil" },
          { k: "칠레",       es: "Chile" },
          { k: "아르헨티나", es: "Argentina" },
        ],
      },
    ],
    assemble: ([country]) => ({
      ko: `저는 ${country.k} 사람이에요`,
      es: `Soy de ${country.es}.`,
    }),
  },

  /* ── U2 ── */
  {
    id: "p3",
    unit: "U2",
    unitBadge: "bg-blue-600 text-white",
    border: "border-blue-200",
    headerBg: "bg-blue-50",
    chipSel: "bg-blue-600 text-white",
    chipUnsel: "bg-white border-blue-200 text-blue-800",
    chipText: "text-blue-800",
    resultBg: "bg-blue-100",
    resultText: "text-blue-900",
    title: "___ 에 가요",
    titleEs: "Voy a ___",
    slots: [
      {
        label: "Lugar",
        options: [
          { k: "학교",   es: "la escuela" },
          { k: "카페",   es: "la cafetería" },
          { k: "집",     es: "casa" },
          { k: "사무실", es: "la oficina" },
          { k: "병원",   es: "el hospital" },
          { k: "화장실", es: "el baño" },
          { k: "가게",   es: "la tienda" },
        ],
      },
    ],
    assemble: ([place]) => ({
      ko: `${place.k}에 가요`,
      es: `Voy a ${place.es}.`,
    }),
  },
  {
    id: "p9",
    unit: "U2",
    unitBadge: "bg-blue-600 text-white",
    border: "border-blue-200",
    headerBg: "bg-blue-50",
    chipSel: "bg-blue-600 text-white",
    chipUnsel: "bg-white border-blue-200 text-blue-800",
    chipText: "text-blue-800",
    resultBg: "bg-blue-100",
    resultText: "text-blue-900",
    title: "___ 뭐 해요?",
    titleEs: "¿Qué haces ___?",
    slots: [
      {
        label: "Tiempo",
        options: [
          { k: "지금",   es: "ahora" },
          { k: "오늘",   es: "hoy" },
          { k: "내일",   es: "mañana" },
          { k: "보통",   es: "normalmente" },
          { k: "주말에", es: "el fin de semana" },
        ],
      },
    ],
    assemble: ([time]) => ({
      ko: `${time.k} 뭐 해요?`,
      es: `¿Qué haces ${time.es}?`,
    }),
  },
  {
    id: "p14",
    unit: "U2",
    unitBadge: "bg-sky-600 text-white",
    border: "border-sky-200",
    headerBg: "bg-sky-50",
    chipSel: "bg-sky-600 text-white",
    chipUnsel: "bg-white border-sky-200 text-sky-800",
    chipText: "text-sky-800",
    resultBg: "bg-sky-100",
    resultText: "text-sky-900",
    title: "___ ___ 해요/아요/어요",
    titleEs: "Respondo: [tiempo] + [actividad]",
    slots: [
      {
        label: "Tiempo",
        options: [
          { k: "지금",   es: "ahora" },
          { k: "오늘",   es: "hoy" },
          { k: "내일",   es: "mañana" },
          { k: "보통",   es: "normalmente" },
          { k: "주말에", es: "el fin de semana" },
        ],
      },
      {
        label: "Actividad",
        options: [
          { k: "공부해요",   es: "estudio" },
          { k: "일해요",     es: "trabajo" },
          { k: "먹어요",     es: "como" },
          { k: "마셔요",     es: "bebo" },
          { k: "쉬어요",     es: "descanso" },
          { k: "운동해요",   es: "me ejercito" },
          { k: "읽어요",     es: "leo" },
          { k: "이야기해요", es: "converso" },
        ],
      },
    ],
    assemble: ([time, verb]) => ({
      ko: `${time.k} ${verb.k}`,
      es: `${verb.es.charAt(0).toUpperCase() + verb.es.slice(1)} ${time.es}.`,
    }),
  },

  /* ── U3 ── */
  {
    id: "p10",
    unit: "U3",
    unitBadge: "bg-indigo-600 text-white",
    border: "border-indigo-200",
    headerBg: "bg-indigo-50",
    chipSel: "bg-indigo-600 text-white",
    chipUnsel: "bg-white border-indigo-200 text-indigo-800",
    chipText: "text-indigo-800",
    resultBg: "bg-indigo-100",
    resultText: "text-indigo-900",
    title: "___ 이/가 얼마예요?",
    titleEs: "¿Cuánto cuesta ___?",
    slots: [
      {
        label: "Objeto / Cosa",
        options: [
          { k: "이거",   es: "esto" },
          { k: "안경",   es: "los lentes" },
          { k: "가방",   es: "la bolsa" },
          { k: "책",     es: "el libro" },
          { k: "커피",   es: "el café" },
          { k: "휴대폰", es: "el celular" },
          { k: "시계",   es: "el reloj" },
          { k: "옷",     es: "la ropa" },
        ],
      },
    ],
    assemble: ([obj]) => ({
      ko: `${obj.k}${iGa(obj.k)} 얼마예요?`,
      es: `¿Cuánto cuesta ${obj.es}?`,
    }),
  },
  {
    id: "p15",
    unit: "U3",
    unitBadge: "bg-indigo-500 text-white",
    border: "border-indigo-200",
    headerBg: "bg-indigo-50",
    chipSel: "bg-indigo-500 text-white",
    chipUnsel: "bg-white border-indigo-200 text-indigo-800",
    chipText: "text-indigo-800",
    resultBg: "bg-indigo-100",
    resultText: "text-indigo-900",
    title: "___ 원이에요",
    titleEs: "Son ___ wones",
    slots: [
      {
        label: "Precio",
        options: [
          { k: "천",   es: "1.000" },
          { k: "이천", es: "2.000" },
          { k: "오천", es: "5.000" },
          { k: "만",   es: "10.000" },
          { k: "이만", es: "20.000" },
          { k: "오만", es: "50.000" },
          { k: "십만", es: "100.000" },
        ],
      },
    ],
    assemble: ([price]) => ({
      ko: `${price.k} 원이에요`,
      es: `Son ${price.es} wones.`,
    }),
  },

  /* ── U4 ── */
  {
    id: "p4",
    unit: "U4",
    unitBadge: "bg-teal-600 text-white",
    border: "border-teal-200",
    headerBg: "bg-teal-50",
    chipSel: "bg-teal-600 text-white",
    chipUnsel: "bg-white border-teal-200 text-teal-800",
    chipText: "text-teal-800",
    resultBg: "bg-teal-100",
    resultText: "text-teal-900",
    title: "___ 에 있어요 / 없어요",
    titleEs: "Estoy / No estoy en ___",
    hasToggle: true,
    slots: [
      {
        label: "Lugar",
        options: [
          { k: "집",     es: "casa" },
          { k: "방",     es: "la habitación" },
          { k: "거실",   es: "la sala" },
          { k: "부엌",   es: "la cocina" },
          { k: "학교",   es: "la escuela" },
          { k: "카페",   es: "la cafetería" },
          { k: "병원",   es: "el hospital" },
          { k: "사무실", es: "la oficina" },
        ],
      },
    ],
    assemble: ([place], neg) => ({
      ko: neg ? `아니요, ${place.k}에 없어요` : `네, ${place.k}에 있어요`,
      es: neg ? `No, no estoy en ${place.es}.` : `Sí, estoy en ${place.es}.`,
    }),
  },
  {
    id: "p5",
    unit: "U4",
    unitBadge: "bg-orange-500 text-white",
    border: "border-orange-200",
    headerBg: "bg-orange-50",
    chipSel: "bg-orange-500 text-white",
    chipUnsel: "bg-white border-orange-200 text-orange-800",
    chipText: "text-orange-800",
    resultBg: "bg-orange-100",
    resultText: "text-orange-900",
    title: "___ 이/가 ___ ___ 에 있어요",
    titleEs: "[objeto] está [prep] [referencia]",
    slots: [
      {
        label: "Objeto",
        options: [
          { k: "책",    es: "el libro" },
          { k: "지갑",  es: "la billetera" },
          { k: "휴대폰",es: "el celular" },
          { k: "안경",  es: "los lentes" },
          { k: "시계",  es: "el reloj" },
          { k: "꽃",    es: "la flor" },
          { k: "달력",  es: "el calendario" },
          { k: "필통",  es: "la cartuchera" },
        ],
      },
      {
        label: "Referencia",
        options: [
          { k: "책상",   es: "el escritorio" },
          { k: "침대",   es: "la cama" },
          { k: "소파",   es: "el sofá" },
          { k: "냉장고", es: "la nevera" },
          { k: "의자",   es: "la silla" },
          { k: "탁자",   es: "la mesa de centro" },
        ],
      },
      {
        label: "Preposición",
        options: [
          { k: "위",   es: "sobre" },
          { k: "아래", es: "debajo de" },
          { k: "옆",   es: "al lado de" },
          { k: "앞",   es: "delante de" },
          { k: "뒤",   es: "detrás de" },
          { k: "안",   es: "dentro de" },
          { k: "밖",   es: "fuera de" },
          { k: "사이", es: "entre" },
        ],
      },
    ],
    assemble: ([obj, ref, prep]) => ({
      ko: `${obj.k}${iGa(obj.k)} ${ref.k} ${prep.k}에 있어요`,
      es: `${obj.es} está ${prep.es} ${ref.es}.`,
    }),
  },
  {
    id: "p6",
    unit: "U4",
    unitBadge: "bg-cyan-500 text-white",
    border: "border-cyan-200",
    headerBg: "bg-cyan-50",
    chipSel: "bg-cyan-500 text-white",
    chipUnsel: "bg-white border-cyan-200 text-cyan-800",
    chipText: "text-cyan-800",
    resultBg: "bg-cyan-100",
    resultText: "text-cyan-900",
    title: "___ 의 ___",
    titleEs: "el/la [objeto] de [dueño]",
    slots: [
      {
        label: "Dueño",
        options: [
          { k: "나",     es: "mi" },
          { k: "저",     es: "mi (formal)" },
          { k: "친구",   es: "de mi amigo/a" },
          { k: "선생님", es: "del/de la maestro/a" },
          { k: "엄마",   es: "de mamá" },
          { k: "아빠",   es: "de papá" },
        ],
      },
      {
        label: "Objeto",
        options: [
          { k: "방",     es: "habitación" },
          { k: "책상",   es: "escritorio" },
          { k: "휴대폰", es: "celular" },
          { k: "지갑",   es: "billetera" },
          { k: "책",     es: "libro" },
          { k: "가방",   es: "bolsa" },
          { k: "시계",   es: "reloj" },
          { k: "안경",   es: "lentes" },
        ],
      },
    ],
    assemble: ([owner, thing]) => {
      const isPronoun = owner.k === "나" || owner.k === "저";
      const es = isPronoun ? `${owner.es} ${thing.es}` : `${thing.es} ${owner.es}`;
      return { ko: `${owner.k}의 ${thing.k}`, es };
    },
  },
  {
    id: "p7",
    unit: "U4",
    unitBadge: "bg-orange-500 text-white",
    border: "border-orange-200",
    headerBg: "bg-orange-50",
    chipSel: "bg-orange-500 text-white",
    chipUnsel: "bg-white border-orange-200 text-orange-800",
    chipText: "text-orange-800",
    resultBg: "bg-orange-100",
    resultText: "text-orange-900",
    title: "___ 이/가 어디에 있어요?",
    titleEs: "¿Dónde está ___?",
    slots: [
      {
        label: "Objeto",
        options: [
          { k: "책",     es: "el libro" },
          { k: "지갑",   es: "la billetera" },
          { k: "휴대폰", es: "el celular" },
          { k: "안경",   es: "los lentes" },
          { k: "시계",   es: "el reloj" },
          { k: "꽃",     es: "la flor" },
          { k: "달력",   es: "el calendario" },
          { k: "열쇠",   es: "la llave" },
        ],
      },
    ],
    assemble: ([obj]) => ({
      ko: `${obj.k}${iGa(obj.k)} 어디에 있어요?`,
      es: `¿Dónde está ${obj.es}?`,
    }),
  },
  {
    id: "p8",
    unit: "U4",
    unitBadge: "bg-teal-600 text-white",
    border: "border-teal-200",
    headerBg: "bg-teal-50",
    chipSel: "bg-teal-600 text-white",
    chipUnsel: "bg-white border-teal-200 text-teal-800",
    chipText: "text-teal-800",
    resultBg: "bg-teal-100",
    resultText: "text-teal-900",
    title: "___ 에 있어요?",
    titleEs: "¿Estás en ___?",
    slots: [
      {
        label: "Lugar",
        options: [
          { k: "집",     es: "casa" },
          { k: "방",     es: "la habitación" },
          { k: "거실",   es: "la sala" },
          { k: "부엌",   es: "la cocina" },
          { k: "학교",   es: "la escuela" },
          { k: "카페",   es: "la cafetería" },
          { k: "병원",   es: "el hospital" },
          { k: "사무실", es: "la oficina" },
        ],
      },
    ],
    assemble: ([place]) => ({
      ko: `${place.k}에 있어요?`,
      es: `¿Estás en ${place.es}?`,
    }),
  },

  /* ── U5 ── */
  {
    id: "p11",
    unit: "U5",
    unitBadge: "bg-pink-500 text-white",
    border: "border-pink-200",
    headerBg: "bg-pink-50",
    chipSel: "bg-pink-500 text-white",
    chipUnsel: "bg-white border-pink-200 text-pink-800",
    chipText: "text-pink-800",
    resultBg: "bg-pink-100",
    resultText: "text-pink-900",
    title: "___ 하고 ___ 가/이 맛있어요!",
    titleEs: "[A] y [B] están deliciosos",
    slots: [
      {
        label: "Primero (A)",
        options: [
          { k: "사과",   es: "manzana" },
          { k: "딸기",   es: "fresa" },
          { k: "바나나", es: "banana" },
          { k: "포도",   es: "uva" },
          { k: "오렌지", es: "naranja" },
          { k: "커피",   es: "café" },
          { k: "빵",     es: "pan" },
          { k: "햄버거", es: "hamburguesa" },
        ],
      },
      {
        label: "Segundo (B)",
        options: [
          { k: "사과",   es: "manzana" },
          { k: "딸기",   es: "fresa" },
          { k: "바나나", es: "banana" },
          { k: "포도",   es: "uva" },
          { k: "오렌지", es: "naranja" },
          { k: "우유",   es: "leche" },
          { k: "주스",   es: "jugo" },
          { k: "과자",   es: "snack" },
        ],
      },
    ],
    assemble: ([a, b]) => ({
      ko: `${a.k}하고 ${b.k}${iGa(b.k)} 맛있어요!`,
      es: `¡${a.es.charAt(0).toUpperCase() + a.es.slice(1)} y ${b.es} están deliciosos!`,
    }),
  },
  {
    id: "p12",
    unit: "U5",
    unitBadge: "bg-violet-500 text-white",
    border: "border-violet-200",
    headerBg: "bg-violet-50",
    chipSel: "bg-violet-500 text-white",
    chipUnsel: "bg-white border-violet-200 text-violet-800",
    chipText: "text-violet-800",
    resultBg: "bg-violet-100",
    resultText: "text-violet-900",
    title: "___ 하고 ___ 주세요!",
    titleEs: "[A] y [B], por favor",
    slots: [
      {
        label: "Primero (A)",
        options: [
          { k: "우유",   es: "leche" },
          { k: "커피",   es: "café" },
          { k: "주스",   es: "jugo" },
          { k: "콜라",   es: "cola" },
          { k: "빵",     es: "pan" },
          { k: "사과",   es: "manzana" },
          { k: "과자",   es: "snack" },
          { k: "햄버거", es: "hamburguesa" },
        ],
      },
      {
        label: "Segundo (B)",
        options: [
          { k: "우유",   es: "leche" },
          { k: "커피",   es: "café" },
          { k: "주스",   es: "jugo" },
          { k: "빵",     es: "pan" },
          { k: "사과",   es: "manzana" },
          { k: "딸기",   es: "fresa" },
          { k: "과자",   es: "snack" },
          { k: "햄버거", es: "hamburguesa" },
        ],
      },
    ],
    assemble: ([a, b]) => ({
      ko: `${a.k}하고 ${b.k} 주세요!`,
      es: `¡${a.es.charAt(0).toUpperCase() + a.es.slice(1)} y ${b.es}, por favor!`,
    }),
  },
  {
    id: "p13",
    unit: "U5",
    unitBadge: "bg-emerald-500 text-white",
    border: "border-emerald-200",
    headerBg: "bg-emerald-50",
    chipSel: "bg-emerald-500 text-white",
    chipUnsel: "bg-white border-emerald-200 text-emerald-800",
    chipText: "text-emerald-800",
    resultBg: "bg-emerald-100",
    resultText: "text-emerald-900",
    title: "___ 이/가 어디에 있어요?",
    titleEs: "¿Dónde está ___? (comida/baño)",
    slots: [
      {
        label: "Objeto",
        options: [
          { k: "치약",   es: "la pasta de dientes" },
          { k: "칫솔",   es: "el cepillo de dientes" },
          { k: "비누",   es: "el jabón" },
          { k: "수건",   es: "la toalla" },
          { k: "우유",   es: "la leche" },
          { k: "커피",   es: "el café" },
          { k: "주스",   es: "el jugo" },
          { k: "사과",   es: "la manzana" },
          { k: "햄버거", es: "la hamburguesa" },
        ],
      },
    ],
    assemble: ([obj]) => ({
      ko: `${obj.k}${iGa(obj.k)} 어디에 있어요?`,
      es: `¿Dónde está ${obj.es}?`,
    }),
  },
  {
    id: "p16",
    unit: "U5",
    unitBadge: "bg-rose-500 text-white",
    border: "border-rose-200",
    headerBg: "bg-rose-50",
    chipSel: "bg-rose-500 text-white",
    chipUnsel: "bg-white border-rose-200 text-rose-800",
    chipText: "text-rose-800",
    resultBg: "bg-rose-100",
    resultText: "text-rose-900",
    title: "___ 이/가 있어요?",
    titleEs: "¿Hay ___?",
    slots: [
      {
        label: "Alimento / Artículo",
        options: [
          { k: "우유",   es: "leche" },
          { k: "주스",   es: "jugo" },
          { k: "커피",   es: "café" },
          { k: "사과",   es: "manzana" },
          { k: "딸기",   es: "fresa" },
          { k: "빵",     es: "pan" },
          { k: "치약",   es: "pasta de dientes" },
          { k: "수건",   es: "toalla" },
        ],
      },
    ],
    assemble: ([item]) => ({
      ko: `${item.k}${iGa(item.k)} 있어요?`,
      es: `¿Hay ${item.es}?`,
    }),
  },
  {
    id: "p17",
    unit: "U5",
    unitBadge: "bg-fuchsia-500 text-white",
    border: "border-fuchsia-200",
    headerBg: "bg-fuchsia-50",
    chipSel: "bg-fuchsia-500 text-white",
    chipUnsel: "bg-white border-fuchsia-200 text-fuchsia-800",
    chipText: "text-fuchsia-800",
    resultBg: "bg-fuchsia-100",
    resultText: "text-fuchsia-900",
    title: "___ ___ 잔 주세요",
    titleEs: "___ vasos/tazas de ___, por favor",
    slots: [
      {
        label: "Bebida",
        options: [
          { k: "커피", es: "café" },
          { k: "주스", es: "jugo" },
          { k: "우유", es: "leche" },
          { k: "콜라", es: "cola" },
          { k: "물",   es: "agua" },
        ],
      },
      {
        label: "Cantidad (잔)",
        options: [
          { k: "한 잔",   es: "uno" },
          { k: "두 잔",   es: "dos" },
          { k: "세 잔",   es: "tres" },
          { k: "네 잔",   es: "cuatro" },
          { k: "다섯 잔", es: "cinco" },
        ],
      },
    ],
    assemble: ([drink, qty]) => ({
      ko: `${drink.k} ${qty.k} 주세요`,
      es: qty.es === "uno"
        ? `Un ${drink.es}, por favor.`
        : `${qty.es.charAt(0).toUpperCase() + qty.es.slice(1)} ${drink.es}s, por favor.`,
    }),
  },
  {
    id: "p18",
    unit: "U5",
    unitBadge: "bg-cyan-500 text-white",
    border: "border-cyan-200",
    headerBg: "bg-cyan-50",
    chipSel: "bg-cyan-500 text-white",
    chipUnsel: "bg-white border-cyan-200 text-cyan-800",
    chipText: "text-cyan-800",
    resultBg: "bg-cyan-100",
    resultText: "text-cyan-900",
    title: "___ ___ 병 주세요",
    titleEs: "___ botellas de ___, por favor",
    slots: [
      {
        label: "Bebida",
        options: [
          { k: "물",   es: "agua" },
          { k: "주스", es: "jugo" },
          { k: "콜라", es: "cola" },
          { k: "우유", es: "leche" },
        ],
      },
      {
        label: "Cantidad (병)",
        options: [
          { k: "한 병",   es: "1 botella de" },
          { k: "두 병",   es: "2 botellas de" },
          { k: "세 병",   es: "3 botellas de" },
          { k: "네 병",   es: "4 botellas de" },
          { k: "다섯 병", es: "5 botellas de" },
        ],
      },
    ],
    assemble: ([drink, qty]) => ({
      ko: `${drink.k} ${qty.k} 주세요`,
      es: `${qty.es} ${drink.es}, por favor.`,
    }),
  },
  {
    id: "p19",
    unit: "U5",
    unitBadge: "bg-amber-500 text-white",
    border: "border-amber-200",
    headerBg: "bg-amber-50",
    chipSel: "bg-amber-500 text-white",
    chipUnsel: "bg-white border-amber-200 text-amber-800",
    chipText: "text-amber-800",
    resultBg: "bg-amber-100",
    resultText: "text-amber-900",
    title: "___ ___ 권 주세요",
    titleEs: "___ libros/revistas, por favor",
    slots: [
      {
        label: "Libro / Revista",
        options: [
          { k: "책",   es: "libro" },
          { k: "잡지", es: "revista" },
          { k: "공책", es: "cuaderno" },
        ],
      },
      {
        label: "Cantidad (권)",
        options: [
          { k: "한 권",   es: "1" },
          { k: "두 권",   es: "2" },
          { k: "세 권",   es: "3" },
          { k: "네 권",   es: "4" },
          { k: "다섯 권", es: "5" },
        ],
      },
    ],
    assemble: ([book, qty]) => ({
      ko: `${book.k} ${qty.k} 주세요`,
      es: qty.es === "1"
        ? `1 ${book.es}, por favor.`
        : `${qty.es} ${book.es}s, por favor.`,
    }),
  },
  {
    id: "p20",
    unit: "U5",
    unitBadge: "bg-lime-600 text-white",
    border: "border-lime-200",
    headerBg: "bg-lime-50",
    chipSel: "bg-lime-600 text-white",
    chipUnsel: "bg-white border-lime-200 text-lime-800",
    chipText: "text-lime-800",
    resultBg: "bg-lime-100",
    resultText: "text-lime-900",
    title: "___ ___ 장 주세요",
    titleEs: "___ hojas/tickets, por favor",
    slots: [
      {
        label: "Objeto",
        options: [
          { k: "종이", es: "hoja" },
          { k: "티켓", es: "ticket" },
          { k: "표",   es: "boleto" },
        ],
      },
      {
        label: "Cantidad (장)",
        options: [
          { k: "한 장",   es: "1" },
          { k: "두 장",   es: "2" },
          { k: "세 장",   es: "3" },
          { k: "네 장",   es: "4" },
          { k: "다섯 장", es: "5" },
        ],
      },
    ],
    assemble: ([item, qty]) => ({
      ko: `${item.k} ${qty.k} 주세요`,
      es: qty.es === "1"
        ? `1 ${item.es}, por favor.`
        : `${qty.es} ${item.es}s, por favor.`,
    }),
  },
];

/* ── Grupos por unidad ── */
const UNIT_GROUPS: UnitGroup[] = [
  {
    id: "u1", order: 1, emoji: "🎓",
    title: "저는 학생이에요",
    titleEs: "Presentaciones · profesiones · países",
    color: "border-emerald-200", headerBg: "bg-emerald-50",
    titleColor: "text-emerald-800", subtitleColor: "text-emerald-400",
    badge: "bg-emerald-600 text-white", countColor: "text-emerald-400",
    patternIds: ["p1", "p2"],
  },
  {
    id: "u2", order: 2, emoji: "🏃",
    title: "어디에 가요?",
    titleEs: "Verbos · lugares · actividades",
    color: "border-blue-200", headerBg: "bg-blue-50",
    titleColor: "text-blue-800", subtitleColor: "text-blue-400",
    badge: "bg-blue-600 text-white", countColor: "text-blue-400",
    patternIds: ["p3", "p9", "p14"],
  },
  {
    id: "u3", order: 3, emoji: "🔢",
    title: "숫자",
    titleEs: "Números · precios · wones",
    color: "border-indigo-200", headerBg: "bg-indigo-50",
    titleColor: "text-indigo-800", subtitleColor: "text-indigo-400",
    badge: "bg-indigo-600 text-white", countColor: "text-indigo-400",
    patternIds: ["p10", "p15"],
  },
  {
    id: "u4", order: 4, emoji: "🏠",
    title: "어디에 있어요?",
    titleEs: "Ubicaciones · preposiciones · posesivos",
    color: "border-orange-200", headerBg: "bg-orange-50",
    titleColor: "text-orange-800", subtitleColor: "text-orange-400",
    badge: "bg-orange-500 text-white", countColor: "text-orange-400",
    patternIds: ["p4", "p5", "p6", "p7", "p8"],
  },
  {
    id: "u5", order: 5, emoji: "🍎",
    title: "사과하고 오렌지가 맛있어요",
    titleEs: "Comida · 하고 · 주세요 · contadores",
    color: "border-pink-200", headerBg: "bg-pink-50",
    titleColor: "text-pink-800", subtitleColor: "text-pink-400",
    badge: "bg-pink-500 text-white", countColor: "text-pink-400",
    patternIds: ["p11", "p12", "p13", "p16", "p17", "p18", "p19", "p20"],
  },
];

/* ── PatternCard ── */
function PatternCard({ pattern }: { pattern: PatternDef }) {
  const [selections, setSelections] = useState<(string | null)[]>(
    pattern.slots.map(() => null)
  );
  const [negative, setNegative] = useState(false);

  const allFilled = selections.every((s) => s !== null);

  const assembled: AssembledResult | null = allFilled
    ? pattern.assemble(
        selections.map((s, i) => pattern.slots[i].options.find((o) => o.k === s)!),
        negative
      )
    : null;

  function pick(slotIdx: number, k: string) {
    setSelections((prev) => {
      const next = [...prev];
      next[slotIdx] = next[slotIdx] === k ? null : k;
      return next;
    });
  }

  function reset() {
    setSelections(pattern.slots.map(() => null));
    setNegative(false);
  }

  return (
    <div className={`rounded-2xl border-2 ${pattern.border} overflow-hidden bg-white`}>
      {/* Header */}
      <div className={`${pattern.headerBg} px-4 py-3 flex items-center justify-between`}>
        <div>
          <p className={`font-bold text-sm ${pattern.chipText}`}>{pattern.title}</p>
          <p className="text-xs text-gray-400 italic">{pattern.titleEs}</p>
        </div>
        {(allFilled || selections.some(Boolean)) && (
          <button
            onClick={reset}
            className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors ml-3 flex-shrink-0"
          >
            ↺ reset
          </button>
        )}
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Slots */}
        {pattern.slots.map((slot, si) => (
          <div key={si}>
            <p className={`text-xs font-bold mb-2 ${pattern.chipText}`}>
              {si + 1}. {slot.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {slot.options.map((opt) => {
                const sel = selections[si] === opt.k;
                return (
                  <button
                    key={opt.k}
                    onClick={() => pick(si, opt.k)}
                    className={`px-3 py-1.5 rounded-xl text-sm font-semibold border-2 transition-all
                      ${sel ? pattern.chipSel : `${pattern.chipUnsel} border-2`}`}
                  >
                    {opt.k}
                    <span className={`text-xs ml-1.5 ${sel ? "text-white/70" : "opacity-50"}`}>
                      {opt.es}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Toggle 있어요/없어요 */}
        {pattern.hasToggle && (
          <div>
            <p className={`text-xs font-bold mb-2 ${pattern.chipText}`}>
              {pattern.slots.length + 1}. Positivo / Negativo
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setNegative(false)}
                className={`px-4 py-1.5 rounded-xl text-sm font-bold border-2 transition-all
                  ${!negative ? pattern.chipSel : `${pattern.chipUnsel} border-2`}`}
              >
                있어요 ✅
              </button>
              <button
                onClick={() => setNegative(true)}
                className={`px-4 py-1.5 rounded-xl text-sm font-bold border-2 transition-all
                  ${negative ? "bg-red-500 text-white" : "bg-white border-red-200 text-red-700"}`}
              >
                없어요 ❌
              </button>
            </div>
          </div>
        )}

        {/* Resultado */}
        {assembled ? (
          <div className={`${pattern.resultBg} rounded-2xl px-5 py-4 flex flex-col gap-1`}>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
              Tu oración
            </p>
            <div className="flex items-center justify-between gap-3">
              <p className={`text-2xl font-extrabold ${pattern.resultText} leading-tight`}>
                {assembled.ko}
              </p>
              <AudioButton text={assembled.ko} />
            </div>
            <p className="text-sm text-gray-500 italic mt-1">{assembled.es}</p>
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 px-5 py-4 text-center">
            <p className="text-sm text-gray-300 font-medium">
              Selecciona {pattern.slots.length === 1 ? "una opción" : "todas las opciones"} para armar tu oración
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── UnitSection (acordeón) ── */
function UnitSection({ unit }: { unit: UnitGroup }) {
  const [open, setOpen] = useState(false);
  const patterns = PATTERNS.filter((p) => unit.patternIds.includes(p.id));

  return (
    <div className={`rounded-2xl border-2 ${unit.color} overflow-hidden bg-white`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-5 py-3.5 ${unit.headerBg} hover:brightness-[0.97] transition-all`}
      >
        <div className="flex items-center gap-2.5">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${unit.badge}`}>
            U{unit.order}
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
            {patterns.length} {patterns.length === 1 ? "patrón" : "patrones"}
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
        <div className="px-4 pb-4 pt-3 flex flex-col gap-4">
          {patterns.map((p) => (
            <PatternCard key={p.id} pattern={p} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Componente principal ── */
export default function SentenceBuilder() {
  return (
    <div className="flex flex-col gap-3">
      {UNIT_GROUPS.map((unit) => (
        <UnitSection key={unit.id} unit={unit} />
      ))}
    </div>
  );
}
