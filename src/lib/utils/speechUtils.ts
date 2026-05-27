let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
      resolve(voices);
      return;
    }
    // Voices load asynchronously — wait for the event
    window.speechSynthesis.addEventListener(
      "voiceschanged",
      () => {
        cachedVoices = window.speechSynthesis.getVoices();
        resolve(cachedVoices);
      },
      { once: true }
    );
  });
}

export async function speakKorean(text: string): Promise<void> {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const voices = cachedVoices.length > 0
    ? cachedVoices
    : await loadVoices();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.60;
  utterance.pitch = 1;

  // Prefer a Korean voice; fall back to any available voice
  const koreanVoice =
    voices.find((v) => v.lang === "ko-KR") ??
    voices.find((v) => v.lang.startsWith("ko"));

  if (koreanVoice) {
    utterance.voice = koreanVoice;
  }

  window.speechSynthesis.speak(utterance);
}

// Call once on app init to trigger voice loading early
export function preloadVoices(): void {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    loadVoices();
  }
}
