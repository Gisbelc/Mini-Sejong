export default function KoreanGirlBanner() {
  return (
    <div className="flex flex-col items-center gap-4 py-8 px-4">
      <div className="flex items-end gap-4">
        {/* Korean girl SVG illustration */}
        <svg
          width="120"
          height="160"
          viewBox="0 0 120 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
          aria-label="Chica coreana animada"
        >
          {/* Hair */}
          <ellipse cx="60" cy="48" rx="36" ry="38" fill="#2d1a0e" />
          {/* Face */}
          <ellipse cx="60" cy="55" rx="28" ry="30" fill="#fde8c8" />
          {/* Hair sides */}
          <rect x="24" y="42" width="14" height="35" rx="7" fill="#2d1a0e" />
          <rect x="82" y="42" width="14" height="35" rx="7" fill="#2d1a0e" />
          {/* Hair top detail */}
          <ellipse cx="60" cy="22" rx="28" ry="10" fill="#2d1a0e" />
          {/* Hair bow */}
          <ellipse cx="60" cy="18" rx="10" ry="6" fill="#f472b6" />
          <ellipse cx="50" cy="16" rx="8" ry="5" fill="#f472b6" transform="rotate(-20 50 16)" />
          <ellipse cx="70" cy="16" rx="8" ry="5" fill="#f472b6" transform="rotate(20 70 16)" />
          <circle cx="60" cy="17" r="4" fill="#ec4899" />
          {/* Eyes */}
          <ellipse cx="49" cy="53" rx="5" ry="6" fill="#2d1a0e" />
          <ellipse cx="71" cy="53" rx="5" ry="6" fill="#2d1a0e" />
          <circle cx="51" cy="51" r="2" fill="white" />
          <circle cx="73" cy="51" r="2" fill="white" />
          {/* Eyebrows */}
          <path d="M44 46 Q49 43 54 46" stroke="#2d1a0e" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M66 46 Q71 43 76 46" stroke="#2d1a0e" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Blush */}
          <ellipse cx="41" cy="62" rx="7" ry="4" fill="#fca5a5" opacity="0.5" />
          <ellipse cx="79" cy="62" rx="7" ry="4" fill="#fca5a5" opacity="0.5" />
          {/* Smile */}
          <path d="M52 67 Q60 74 68 67" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Neck */}
          <rect x="52" y="83" width="16" height="14" rx="4" fill="#fde8c8" />
          {/* School uniform body */}
          <rect x="28" y="96" width="64" height="55" rx="12" fill="#7c3aed" />
          {/* Collar white */}
          <path d="M52 96 L60 108 L68 96" fill="white" />
          {/* Ribbon/bow on uniform */}
          <path d="M54 100 L60 106 L66 100" stroke="#f472b6" strokeWidth="2" fill="none" />
          {/* Arms */}
          <rect x="10" y="97" width="20" height="44" rx="10" fill="#7c3aed" />
          <rect x="90" y="97" width="20" height="44" rx="10" fill="#7c3aed" />
          {/* Hands */}
          <ellipse cx="20" cy="144" rx="10" ry="9" fill="#fde8c8" />
          <ellipse cx="100" cy="144" rx="10" ry="9" fill="#fde8c8" />
          {/* Book in left hand */}
          <rect x="6" y="136" width="20" height="14" rx="2" fill="#60a5fa" />
          <rect x="8" y="138" width="6" height="10" rx="1" fill="#93c5fd" />
          <text x="16" y="147" fontSize="6" fill="white" fontWeight="bold">가</text>
        </svg>

        {/* Speech bubble */}
        <div className="relative bg-white rounded-2xl rounded-bl-sm shadow-lg px-5 py-4 max-w-[240px] border-2 border-emerald-200">
          <p className="text-emerald-800 font-bold text-base leading-snug">
            ¡Hola! 안녕하세요!
          </p>
          <p className="text-emerald-600 text-sm mt-1">
            Vamos a aprender coreano 🇰🇷
          </p>
          {/* Bubble tail */}
          <div className="absolute -left-3 bottom-4 w-3 h-4 overflow-hidden">
            <div className="w-4 h-4 bg-white border-l-2 border-b-2 border-emerald-200 rotate-45 translate-x-1 -translate-y-1" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-emerald-900 tracking-tight">
        Mini Sejong
      </h1>
      <p className="text-emerald-500 text-sm font-medium">
        미니 세종 · Tu academia de coreano
      </p>
    </div>
  );
}
