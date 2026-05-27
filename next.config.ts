import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Fix: Next.js detectó múltiples lockfiles y eligió el directorio incorrecto.
    // Forzamos la raíz del proyecto para que use el package-lock.json correcto.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
