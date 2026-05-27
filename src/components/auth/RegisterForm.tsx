"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/firebase/auth";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      await registerUser(email, password, name);
      router.push("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      console.error("[RegisterForm] Firebase error:", err);
      if (msg.includes("email-already-in-use")) {
        setError("Este correo ya está registrado.");
      } else if (msg.includes("api-key-not-valid") || msg.includes("invalid-api-key")) {
        setError("❌ Firebase no está configurado. Revisa el .env.local");
      } else if (msg.includes("auth/")) {
        setError(`Error Firebase: ${msg}`);
      } else {
        setError(`Error: ${msg || "Desconocido"}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-semibold text-cyan-700 mb-1.5">
          Nombre
        </label>
        <input
          type="text" required value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          className="w-full border-2 border-emerald-200 rounded-xl px-4 py-2.5 text-sm
            text-gray-800 focus:outline-none focus:border-emerald-500 transition-colors bg-white
            placeholder:text-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-cyan-700 mb-1.5">
          Correo electrónico
        </label>
        <input
          type="email" required value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className="w-full border-2 border-emerald-200 rounded-xl px-4 py-2.5 text-sm
            text-gray-800 focus:outline-none focus:border-emerald-500 transition-colors bg-white
            placeholder:text-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-cyan-700 mb-1.5">
          Contraseña
        </label>
        <input
          type="password" required value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mín. 6 caracteres"
          className="w-full border-2 border-emerald-200 rounded-xl px-4 py-2.5 text-sm
            text-gray-800 focus:outline-none focus:border-emerald-500 transition-colors bg-white
            placeholder:text-gray-300"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm font-medium bg-red-50 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit" disabled={loading}
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3
          rounded-2xl transition-colors disabled:opacity-60 mt-1"
      >
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
}
