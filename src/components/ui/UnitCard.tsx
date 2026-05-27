import Link from "next/link";
import type { QuizUnit } from "@/lib/types";

type UnitMeta = Omit<QuizUnit, "questions">;

interface Props {
  unit: UnitMeta;
}

export default function UnitCard({ unit }: Props) {
  return (
    <Link
      href={`/unit/${unit.id}`}
      className="group block bg-cyan-400 hover:bg-cyan-500 rounded-2xl shadow-md
        hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 p-5"
    >
      <div className="flex items-center gap-4">
        <span className="text-4xl flex-shrink-0">{unit.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-cyan-100 font-semibold uppercase tracking-widest mb-0.5">
            Unidad {unit.order}
          </p>
          <h2 className="text-white font-extrabold text-lg leading-tight truncate">
            {unit.titleEs}
          </h2>
          <p className="text-cyan-100 text-sm mt-0.5 font-medium">
            {unit.title}
          </p>
          <p className="text-cyan-50 text-xs mt-1 leading-snug line-clamp-1">
            {unit.description}
          </p>
        </div>
        <svg
          className="w-5 h-5 text-cyan-100 group-hover:text-white transition-colors flex-shrink-0"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
