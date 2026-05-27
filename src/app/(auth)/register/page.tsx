import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <h2 className="text-xl font-extrabold text-cyan-800 mb-1">
        Crea tu cuenta
      </h2>
      <p className="text-cyan-400 text-sm mb-6">
        Comienza tu viaje al coreano hoy 🇰🇷
      </p>
      <RegisterForm />
    </>
  );
}
