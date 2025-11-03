// app/(site)/iletisim/page.tsx
// İletişim sayfası – adres/sosyal kartları + geliştirilmiş Ön Kayıt Formu (KVKK & Açık Rıza)

"use client";

import { motion } from "framer-motion";
import { LuMapPin, LuPhone, LuMail, LuExternalLink } from "react-icons/lu";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { PageHero } from "@/components/PageHero";
import PreRegistrationForm from "@/components/PreRegistrationForm";

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card text-card-foreground shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export default function IletisimPage() {
  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="İletişim"
        description="Bize ulaşın, soruların yanıtını alın ve Minikler Köyü ailesinin bir parçası olun"
      />

      <main className="mx-auto max-w-6xl px-4">
        {/*  */}

        {/* İLETİŞİM KARTLARI */}
        <section className="py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Bize Ulaşın
            </h2>
            <p className="text-gray-600 text-lg">
              Gelin, birlikte çocuğunuzun dünyasını keşfedelim. &apos;Varda
              Minikler Köyü&apos;nde, minik kalplerin doğayla büyüdüğü bu
              masalın bir parçası olun.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Adres */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="p-6 h-full border-2 hover:border-green-300 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <LuMapPin />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Adres
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Fuar Alanı Kavşağı, Prof. Dr. Necmettin Erbakan Bulvarı
                    262/1A
                    <br />
                    ÇUKUROVA/ADANA
                  </p>
                  <a
                    href="https://maps.app.goo.gl/SKsmZ6aNSgemcR4m9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    Haritada Gör <LuExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Card>
            </motion.div>

            {/* Telefon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="p-6 h-full border-2 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <LuPhone />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Telefon
                  </h3>
                  <a
                    href="tel:05522897191"
                    className="text-sm text-gray-700 hover:text-blue-600 font-medium mb-2 transition-colors"
                  >
                    0552 289 71 91
                  </a>
                  <a
                    href="mailto:info@vardaokullari.com"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
                  >
                    <LuMail className="w-4 h-4" />
                    info@vardaokullari.com
                  </a>
                </div>
              </Card>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <a
                href="https://wa.me/905522897191"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="p-6 h-full border-2 hover:border-green-400 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <FaWhatsapp />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      WhatsApp
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Hızlı iletişim için
                    </p>
                    <span className="text-sm text-green-600 font-medium">
                      Mesaj Gönder →
                    </span>
                  </div>
                </Card>
              </a>
            </motion.div>

            {/* Instagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <a
                href="https://www.instagram.com/vardaliminiklerkoyu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="p-6 h-full border-2 hover:border-pink-300 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <FaInstagram />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Instagram
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      @vardaliminiklerkoyu
                    </p>
                    <span className="text-sm text-purple-600 font-medium">
                      Takip Et →
                    </span>
                  </div>
                </Card>
              </a>
            </motion.div>
          </div>

          {/* Çalışma Saatleri - Tam Genişlik */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card className="p-8 border-2 border-orange-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="flex items-center justify-center gap-4 flex-wrap text-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Ziyaret Günleri
                  </h3>
                  <p className="text-gray-700">
                    Hafta içi her gün ve Cumartesi günleri randevu ile okul
                    tanıtımı yapılmaktadır.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* HARITA */}
        <section className="pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Konumumuz
            </h2>
            <p className="text-gray-600 text-lg">
              Fuar Alanı Kavşağı&apos;nda, kolay ulaşılabilir konumdayız
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden border-2 border-blue-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300">
              <div className="relative w-full h-[400px] md:h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3183.977348220757!2d35.24460307585013!3d37.05802297217478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152889346d026415%3A0x737ea527e966c7dc!2zVmFyZGFsxLEgTWluaWtsZXIgS8O2ecO8!5e0!3m2!1str!2str!4v1762176462875!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vardalı Minikler Köyü Konumu"
                  className="w-full h-full"
                />
              </div>

              {/* Harita altı bilgi kartı */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-t-2 border-blue-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <LuMapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">
                        Fuar Alanı Kavşağı
                      </h4>
                      <p className="text-sm text-gray-600">
                        Prof. Dr. Necmettin Erbakan Bulvarı 262/1A
                        <br />
                        ÇUKUROVA/ADANA
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://maps.app.goo.gl/SKsmZ6aNSgemcR4m9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                      aria-label="Vardalı Minikler Köyü için yol tarifi al"
                    >
                      <LuExternalLink />
                      Yol Tarifi Al
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* ÖN KAYIT FORMU */}
        <section id="on-kayit" className="pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Ön Kayıt Formu
            </h2>
            <p className="text-gray-600 text-lg">
              Minikler Köyü ailesine katılmak için ilk adımı atın
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 md:p-8 border-2 border-orange-200 shadow-xl">
              <PreRegistrationForm />
            </Card>
          </motion.div>

          {/* Alt CTA - Şimdilik yorumda */}
          {/*
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <Card className="relative overflow-hidden border-2 border-green-200 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl" />

              <div className="relative z-10 p-8 md:p-12 text-center">
                <div className="mx-auto max-w-3xl">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white text-4xl mb-6 shadow-xl">
                    🌳
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Doğanın İçinde Büyüyen Çocuklar
                  </h3>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                    Gelin, birlikte çocuğunuzun dünyasını keşfedelim.
                    <br />
                    <span className="text-green-600 font-bold">
                      Varda Minikler Köyü
                    </span>
                    &apos;nde, minik kalplerin doğayla büyüdüğü bu masalın bir
                    parçası olun.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                      href="tel:05522897191"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                    >
                      <LuPhone />
                      Hemen Arayın
                    </a>
                    <a
                      href="https://wa.me/905522897191"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-green-500 text-green-600 font-semibold rounded-xl shadow-lg hover:bg-green-50 transition-all duration-300"
                    >
                      <FaWhatsapp />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          */}
        </section>
      </main>
    </>
  );
}
