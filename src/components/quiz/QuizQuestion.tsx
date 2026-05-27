"use client";

import AudioButton from "./AudioButton";
import type { QuizQuestion as QuizQuestionType } from "@/lib/types";

interface Props {
  question: QuizQuestionType;
  questionNumber: number;
  total: number;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  total,
  selectedAnswer,
  onAnswer,
}: Props) {
  const isAnswered = selectedAnswer !== null;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-emerald-400 mb-1 font-medium">
          <span>Pregunta {questionNumber} de {total}</span>
          <span>{Math.round((questionNumber / total) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-500"
            style={{ width: `${(questionNumber / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-emerald-100">
        {/* Korean word + audio */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-3xl font-bold text-emerald-800 tracking-wide">
            {question.korean}
          </span>
          <AudioButton text={question.audioText ?? question.korean} />
        </div>

        {question.romanization && (
          <p className="text-center text-emerald-400 italic text-sm mb-1">
            /{question.romanization}/
          </p>
        )}

        <p className="text-center text-gray-700 font-medium text-lg mt-4 mb-6">
          {question.questionEs}
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option, idx) => {
            let style =
              "border-2 border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-400 hover:bg-emerald-100";

            if (isAnswered) {
              if (idx === question.correctAnswer) {
                style = "border-2 border-green-400 bg-green-50 text-green-800 font-semibold";
              } else if (idx === selectedAnswer && idx !== question.correctAnswer) {
                style = "border-2 border-red-400 bg-red-50 text-red-700 line-through";
              } else {
                style = "border-2 border-gray-200 bg-gray-50 text-gray-400";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => !isAnswered && onAnswer(idx)}
                disabled={isAnswered}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium
                  ${style} ${!isAnswered ? "cursor-pointer" : "cursor-default"}`}
              >
                <span className="text-emerald-400 font-bold mr-2">
                  {["A", "B", "C", "D"][idx]}.
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div
            className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium text-center
              ${selectedAnswer === question.correctAnswer
                ? "bg-green-100 text-green-700"
                : "bg-red-50 text-red-600"
              }`}
          >
            {selectedAnswer === question.correctAnswer
              ? "¡Correcto! 🎉"
              : `Respuesta correcta: ${question.options[question.correctAnswer]}`}
          </div>
        )}
      </div>
    </div>
  );
}
