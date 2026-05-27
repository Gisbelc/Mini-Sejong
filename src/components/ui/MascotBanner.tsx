import Image from "next/image";

interface MascotBannerProps {
  userName?: string;
}

export default function MascotBanner({ userName }: MascotBannerProps) {
  const greeting = userName ? `¡Hola, ${userName}!` : "¡Aprende conmigo!";

  return (
    <div className="flex flex-col items-center gap-4 py-8 px-4">
      <div className="flex items-end gap-3">

        {/* Korean flag image */}
        <Image
          src="/flag.png"
          alt="Bandera de Corea del Sur"
          width={120}
          height={120}
          className="drop-shadow-lg"
          priority
        />

        {/* Speech bubble */}
        <div className="relative bg-white rounded-2xl rounded-bl-sm shadow-lg
          px-5 py-4 max-w-[180px] border-2 border-cyan-200 mb-6">
          <p className="text-cyan-700 font-extrabold text-base leading-snug">
            안녕하세요! 👋
          </p>
          <p className="text-cyan-500 text-sm mt-1 leading-snug">
            {greeting}
          </p>
          {/* Bubble tail (left side) */}
          <div className="absolute -left-3 bottom-4 w-3 h-4 overflow-hidden">
            <div className="w-4 h-4 bg-white border-l-2 border-b-2 border-cyan-200
              rotate-45 translate-x-1 -translate-y-1" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-emerald-900 tracking-tight">
        Mini Sejong
      </h1>
      <p className="text-emerald-500 text-sm font-medium">
        미니 세종
      </p>
    </div>
  );
}
