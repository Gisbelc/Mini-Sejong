"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthTabs() {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <div className="flex">
      <Link
        href="/login"
        className={`flex-1 text-center py-4 text-sm font-bold transition-all border-b-2 ${
          isLogin
            ? "text-cyan-700 border-cyan-500 bg-cyan-50/60"
            : "text-cyan-300 border-cyan-100 hover:text-cyan-500 hover:bg-cyan-50/30"
        }`}
      >
        Iniciar sesión
      </Link>
      <Link
        href="/register"
        className={`flex-1 text-center py-4 text-sm font-bold transition-all border-b-2 ${
          !isLogin
            ? "text-cyan-700 border-cyan-500 bg-cyan-50/60"
            : "text-cyan-300 border-cyan-100 hover:text-cyan-500 hover:bg-cyan-50/30"
        }`}
      >
        Registrarse
      </Link>
    </div>
  );
}
