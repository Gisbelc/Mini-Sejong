import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./config";
import type { QuizUnit, QuizResult } from "../types";

// Fetches a full unit with all its questions in ONE read (free tier friendly)
export async function fetchUnit(unitId: string): Promise<QuizUnit | null> {
  const ref = doc(db, "units", unitId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as QuizUnit;
}

// Fetches only unit metadata (no questions array) for the home page cards
export async function fetchUnitsMeta(): Promise<Omit<QuizUnit, "questions">[]> {
  const snap = await getDocs(collection(db, "units"));
  return snap.docs
    .map((d) => {
      const data = d.data() as QuizUnit;
      const { questions: _q, ...meta } = data;
      return meta;
    })
    .sort((a, b) => a.order - b.order);
}

export async function saveResult(userId: string, result: QuizResult) {
  const ref = doc(db, "users", userId, "results", result.unitId);
  await setDoc(ref, { ...result, completedAt: new Date() }, { merge: true });
}
