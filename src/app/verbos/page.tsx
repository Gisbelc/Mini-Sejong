"use client";

import Link from "next/link";

const VERBS = [
  { es: "beber",                    base: "마시다",   haeyo: "마셔요"   },
  { es: "caminar",                  base: "걷다",     haeyo: "걸어요"   },
  { es: "comer",                    base: "먹다",     haeyo: "먹어요"   },
  { es: "comprar",                  base: "사다",     haeyo: "사요"     },
  { es: "conocer / encontrarse",    base: "만나다",   haeyo: "만나요"   },
  { es: "dar",                      base: "주다",     haeyo: "줘요"     },
  { es: "descansar",                base: "쉬다",     haeyo: "쉬어요"   },
  { es: "dormir",                   base: "자다",     haeyo: "자요"     },
  { es: "escribir",                 base: "쓰다",     haeyo: "써요"     },
  { es: "escuchar",                 base: "듣다",     haeyo: "들어요"   },
  { es: "estar / haber / tener",    base: "있다",     haeyo: "있어요"   },
  { es: "estar cansado/a",          base: "피곤하다", haeyo: "피곤해요" },
  { es: "estar delicioso/a",        base: "맛있다",   haeyo: "맛있어요" },
  { es: "estar ocupado/a",          base: "바쁘다",   haeyo: "바빠요"   },
  { es: "estudiar",                 base: "공부하다", haeyo: "공부해요" },
  { es: "gustar / ser bueno/a",     base: "좋다",     haeyo: "좋아요"   },
  { es: "hacer",                    base: "하다",     haeyo: "해요"     },
  { es: "ir",                       base: "가다",     haeyo: "가요"     },
  { es: "leer",                     base: "읽다",     haeyo: "읽어요"   },
  { es: "llamar por teléfono",      base: "전화하다", haeyo: "전화해요" },
  { es: "mirar / ver",              base: "보다",     haeyo: "봐요"     },
  { es: "no estar / no haber",      base: "없다",     haeyo: "없어요"   },
  { es: "no gustar",                base: "싫다",     haeyo: "싫어요"   },
  { es: "no saber",                 base: "모르다",   haeyo: "몰라요"   },
  { es: "pararse / levantarse",     base: "서다",     haeyo: "서요"     },
  { es: "saber / conocer algo",     base: "알다",     haeyo: "알아요"   },
  { es: "sentarse",                 base: "앉다",     haeyo: "앉아요"   },
  { es: "trabajar",                 base: "일하다",   haeyo: "일해요"   },
  { es: "venir",                    base: "오다",     haeyo: "와요"     },
  { es: "vivir",                    base: "살다",     haeyo: "살아요"   },
];

export default function VerbosPage() {
  return (
    <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="text-amber-400 hover:text-amber-600 transition-colors"
          aria-label="Volver"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest">
            Utilidades
          </p>
          <h1 className="text-lg font-extrabold text-amber-900 leading-tight">
            📋 Verbos — 동사
          </h1>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-amber-50 border-2 border-amber-100 rounded-2xl px-5 py-4 mb-6">
        <p className="text-sm text-amber-700 font-medium">
          {VERBS.length} verbos esenciales del 1A ordenados A–Z.
          Forma base (기본형) y conjugación formal (해요체).
        </p>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border-2 border-amber-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-amber-50 border-b border-amber-100">
                <th className="text-left text-xs font-bold text-amber-400 uppercase tracking-wide px-5 py-3">
                  Español
                </th>
                <th className="text-left text-xs font-bold text-amber-400 uppercase tracking-wide px-4 py-3">
                  기본형
                </th>
                <th className="text-left text-xs font-bold text-amber-400 uppercase tracking-wide px-4 py-3">
                  해요체
                </th>
              </tr>
            </thead>
            <tbody>
              {VERBS.map((v, i) => (
                <tr
                  key={v.es}
                  className={`border-b border-gray-50 hover:bg-amber-50/40 transition-colors ${
                    i % 2 === 0 ? "" : "bg-gray-50/30"
                  }`}
                >
                  <td className="py-2.5 px-5 text-gray-700">{v.es}</td>
                  <td className="py-2.5 px-4 font-bold text-amber-700">{v.base}</td>
                  <td className="py-2.5 px-4 font-bold text-amber-900">{v.haeyo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="mt-10 text-center text-xs text-cyan-300 font-medium">
        Mini Sejong · 미니 세종 · Aprende coreano 🇰🇷
      </footer>
    </main>
  );
}
