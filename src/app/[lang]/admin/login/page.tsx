"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";
import { isAdminEmail } from "@/lib/admin";
import { Lock, AlertCircle, Chrome } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const { lang } = useParams() as { lang: string };
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        const email = data.session.user.email;

        if (!isAdminEmail(email)) {
          await supabase.auth.signOut();
          setError("Akun ini tidak memiliki akses admin.");
          return;
        }

        router.replace(`/${lang}/admin/dashboard`);
      }
    };

    checkSession();
  }, [router, lang]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/${lang}/admin/login`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-5 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/5 backdrop-blur-xl p-8  shadow-2xl border border-white/10">
          {/* Logo/Icon Section */}
          <div className="flex justify-center mb-8">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <Lock className="w-8 h-8 text-black" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-white text-sm">
              Masuk untuk mengakses dashboard admin
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-white/5 border border-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3 group"
          >
            <Chrome className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Login dengan Google
          </button>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <p className="text-white text-xs">
              Hanya akun admin yang terdaftar yang dapat mengakses
            </p>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}