import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h2 className="text-xl font-extrabold text-cyan-800 mb-1">
        Bienvenida de nuevo
      </h2>
      <p className="text-cyan-400 text-sm mb-6">
        Inicia sesión para seguir aprendiendo 🇰🇷
      </p>
      <LoginForm />
    </>
  );
}
