import Link from "next/link";
import AuthTabs from "@/components/auth/AuthTabs";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <h1 className="text-3xl font-extrabold text-emerald-900 group-hover:text-emerald-700 transition-colors">
              Mini Sejong
            </h1>
            <p className="text-emerald-500 text-sm mt-1">미니 세종</p>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-cyan-100 overflow-hidden">
          <AuthTabs />
          <div className="p-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
