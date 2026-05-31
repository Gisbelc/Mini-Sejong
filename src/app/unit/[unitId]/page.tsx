"use client";

import { useState, useCallback, use } from "react";
import Link from "next/link";
import { QUIZ_UNITS } from "@/data/quizData";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizResults from "@/components/quiz/QuizResults";
import IntroLesson from "@/components/quiz/IntroLesson";
import DailyActionsLesson from "@/components/quiz/DailyActionsLesson";
import NumbersLesson from "@/components/quiz/NumbersLesson";
import LocationLesson from "@/components/quiz/LocationLesson";
import FoodLesson from "@/components/quiz/FoodLesson";
import type { QuizQuestion as QuizQuestionType } from "@/lib/types";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions(q: QuizQuestionType): QuizQuestionType {
  const correct = q.options[q.correctAnswer];
  const shuffled = shuffleArray([...q.options]);
  return { ...q, options: shuffled, correctAnswer: shuffled.indexOf(correct) };
}

function prepareQuestions(questions: QuizQuestionType[]): QuizQuestionType[] {
  return shuffleArray(questions).map(shuffleOptions);
}

interface Props {
  params: Promise<{ unitId: string }>;
}

export default function UnitPage({ params }: Props) {
  const { unitId } = use(params);
  const unit = QUIZ_UNITS.find((u) => u.id === unitId);

  const [lessonOpen, setLessonOpen] = useState(true);
  const [quizOpen, setQuizOpen]     = useState(false);

  const [questions, setQuestions] = useState<QuizQuestionType[]>(() =>
    unit ? prepareQuestions(unit.questions) : []
  );
  const [currentIdx, setCurrentIdx]         = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore]                   = useState(0);
  const [finished, setFinished]             = useState(false);

  const handleAnswer = useCallback(
    (idx: number) => {
      setSelectedAnswer(idx);
      if (idx === questions[currentIdx].correctAnswer) {
        setScore((s) => s + 1);
      }
    },
    [currentIdx, questions]
  );

  function handleNext() {
    if (currentIdx + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
    }
  }

  function handleRetry() {
    setQuestions(unit ? prepareQuestions(unit.questions) : []);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
    setLessonOpen(true);
    setQuizOpen(false);
  }

  if (!unit) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-emerald-600 font-semibold">Unidad no encontrada.</p>
        <Link href="/" className="text-emerald-500 underline text-sm">
          Volver al inicio
        </Link>
      </main>
    );
  }

  const hasLesson = ["unit1", "unit2", "unit3", "unit4", "unit5"].includes(unit.id);

  return (
    <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-6">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-5">
        <Link
          href="/"
          className="text-emerald-400 hover:text-emerald-600 transition-colors"
          aria-label="Volver"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <p className="text-xs text-emerald-400 font-semibold uppercase tracking-widest">
            Unidad {unit.order}
          </p>
          <h1 className="text-lg font-extrabold text-emerald-900 leading-tight">
            {unit.emoji} {unit.titleEs}
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-3">

        {/* ── Sección: Lección ── */}
        {hasLesson && !finished && (
          <section className="rounded-2xl border-2 border-emerald-100 overflow-hidden">
            <button
              onClick={() => setLessonOpen((o) => !o)}
              className="w-full flex items-center justify-between px-5 py-4
                bg-white hover:bg-emerald-50 transition-colors"
            >
              <span className="font-bold text-emerald-800 text-base flex items-center gap-2">
                📚 Lección
              </span>
              <svg
                className={`w-5 h-5 text-emerald-400 transition-transform duration-200
                  ${lessonOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {lessonOpen && (
              <div className="px-4 pb-4 pt-1 bg-emerald-50/40">
                {unit.id === "unit1" && <IntroLesson />}
                {unit.id === "unit2" && <DailyActionsLesson />}
                {unit.id === "unit3" && <NumbersLesson />}
                {unit.id === "unit4" && <LocationLesson />}
                {unit.id === "unit5" && <FoodLesson />}

                <button
                  onClick={() => { setQuizOpen(true); setLessonOpen(false); }}
                  className="w-full mt-2 bg-cyan-500 hover:bg-cyan-600 text-white
                    font-bold py-3 rounded-2xl transition-colors"
                >
                  Ir al Quiz →
                </button>
              </div>
            )}
          </section>
        )}

        {/* ── Sección: Quiz ── */}
        <section className="rounded-2xl border-2 border-cyan-100 overflow-hidden">
          <button
            onClick={() => setQuizOpen((o) => !o)}
            className="w-full flex items-center justify-between px-5 py-4
              bg-white hover:bg-cyan-50 transition-colors"
          >
            <span className="font-bold text-cyan-700 text-base flex items-center gap-2">
              ✏️ Quiz
              <span className="text-xs font-medium text-cyan-400">
                {questions.length} preguntas
              </span>
            </span>
            <svg
              className={`w-5 h-5 text-cyan-400 transition-transform duration-200
                ${quizOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {quizOpen && (
            <div className="px-4 pb-4 pt-2 bg-cyan-50/30">
              {finished ? (
                <QuizResults
                  score={score}
                  total={questions.length}
                  unitTitle={unit.titleEs}
                  onRetry={handleRetry}
                />
              ) : (
                <div className="flex flex-col gap-4">
                  <QuizQuestion
                    question={questions[currentIdx]}
                    questionNumber={currentIdx + 1}
                    total={questions.length}
                    selectedAnswer={selectedAnswer}
                    onAnswer={handleAnswer}
                  />
                  {selectedAnswer !== null && (
                    <button
                      onClick={handleNext}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white
                        font-bold py-3.5 rounded-2xl transition-colors animate-fade-in"
                    >
                      {currentIdx + 1 >= questions.length ? "Ver resultados" : "Siguiente →"}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
