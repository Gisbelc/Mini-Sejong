export default function HangulBackground() {
  const chars =
    "가나다라마바사아자차카타파하갈날달랄말발살알잘찰칼탈팔할감남담람맘밤삼암잠참캄탐팜함";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden select-none"
    >
      <div className="flex flex-wrap gap-6 p-6 min-h-screen opacity-[0.12]">
        {Array.from({ length: 800 }).map((_, i) => (
          <span
            key={i}
            className="text-emerald-600 font-bold text-3xl leading-none"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
          >
            {chars[i % chars.length]}
          </span>
        ))}
      </div>
    </div>
  );
}
