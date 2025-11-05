"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      router.push("/admin");
    } catch (error) {
      console.error("Login hatası:", error);
      setError("E-posta veya şifre hatalı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-100 via-amber-50 to-orange-100">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-orange-200">
          {/* Header */}
          <div className="bg-linear-to-r from-orange-500 to-amber-500 p-8 text-center text-white">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <FaLock className="text-4xl" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Yönetim Paneli</h1>
            <p className="text-white/90">Vardalı Minikler Köyü</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200">
                <p className="text-red-800 text-center font-medium">
                  ❌ {error}
                </p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-posta
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vardaokullari.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>

            {/* Anasayfa Butonu */}
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-3 bg-white border-2 border-orange-500 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all duration-300"
            >
              <FaHome />
              Anasayfaya Dön
            </Link>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-6 text-gray-600 text-sm">
          Giriş yapmak için yönetici hesabınızı kullanın
        </p>
      </motion.div>
    </div>
  );
}
