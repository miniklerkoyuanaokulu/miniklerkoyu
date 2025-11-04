"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { FaSignOutAlt, FaArrowLeft } from "react-icons/fa";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  const isLoginPage = pathname === "/admin/login";

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [user, loading, isLoginPage, router]);

  // Login sayfası için özel layout (navbar/footer yok)
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Auth kontrolü
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect happening
  }

  const handleSignOut = async () => {
    if (confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      await signOut();
      router.push("/admin/login");
    }
  };

  const isDashboard = pathname === "/admin";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b-2 border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Sol: Geri Butonu (sadece alt sayfalarda) + Başlık */}
            <div className="flex items-center gap-4">
              {!isDashboard && (
                <button
                  onClick={() => router.push("/admin")}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                >
                  <FaArrowLeft />
                  Geri Dön
                </button>
              )}

              <div>
                <div className="text-lg font-bold text-gray-800">
                  Yönetim Paneli
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>

            {/* Sağ: Çıkış Butonu */}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              <FaSignOutAlt />
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-6">{children}</main>
    </div>
  );
}
