"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

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

export default function KVKKPage() {
  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="KVKK"
        description="Kişisel Verilerin Korunması ve İşlenmesi Hakkında Bilgilendirme"
      />

      <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        {/* Geri Dön Butonu */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/iletisim#on-kayit"
            className="inline-flex items-center gap-2 text-[color:var(--primary)] hover:text-[color:var(--secondary)] font-medium transition-colors"
          >
            <LuArrowLeft className="w-5 h-5" />
            Ön Kayıt Formuna Dön
          </Link>
        </motion.div>

        {/* KVKK Aydınlatma Metni */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="p-6 md:p-8 border-2 border-blue-200">
            <h2 className="text-2xl md:text-3xl font-bold text-[color:var(--primary)] mb-6">
              KVKK Aydınlatma Metni
            </h2>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  1. Veri Sorumlusu
                </h2>
                <p>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu
                  (&quot;KVKK&quot;) uyarınca, kişisel verileriniz; veri
                  sorumlusu olarak Varda Minikler Köyü (Fuar Alanı Kavşağı,
                  Prof. Dr. Necmettin Erbakan Bulvarı 262/1A, ÇUKUROVA/ADANA)
                  tarafından aşağıda açıklanan kapsamda işlenecektir.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  2. Kişisel Verilerin İşlenme Amacı
                </h2>
                <p>
                  Ön kayıt formunda paylaştığınız kişisel verileriniz, eğitim
                  hizmeti sunumu, iletişim, randevu planlaması, bilgilendirme ve
                  kayıt işlemleri gibi amaçlarla işlenecektir.
                </p>
                <p className="mt-2">İşlenen veriler:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Veli adı-soyadı</li>
                  <li>Çocuk adı-soyadı ve doğum tarihi</li>
                  <li>Telefon numarası</li>
                  <li>E-posta adresi</li>
                  <li>Mesaj içeriği (opsiyonel)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  3. Kişisel Verilerin Aktarımı
                </h2>
                <p>
                  Toplanan kişisel verileriniz, yukarıda belirtilen amaçların
                  yerine getirilmesi doğrultusunda ve KVKK&apos;nın 8. ve 9.
                  maddelerinde belirtilen kişisel veri işleme şartları ve
                  amaçları çerçevesinde, yalnızca gerekli olması halinde üçüncü
                  kişilerle paylaşılabilecektir.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  4. Veri Güvenliği
                </h2>
                <p>
                  Kişisel verileriniz, KVKK kapsamında güvenli bir şekilde
                  saklanmakta ve yetkisiz erişimlere karşı gerekli teknik ve
                  idari tedbirler alınmaktadır.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  5. Kişisel Veri Sahibinin Hakları
                </h2>
                <p>
                  KVKK&apos;nın 11. maddesi uyarınca, kişisel veri sahipleri
                  olarak aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>
                    Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme
                  </li>
                  <li>
                    Kişisel verilerinizin işlenme amacını ve bunların amacına
                    uygun kullanılıp kullanılmadığını öğrenme
                  </li>
                  <li>
                    Kişisel verilerinizin yurt içinde veya yurt dışında
                    aktarıldığı üçüncü kişileri bilme
                  </li>
                  <li>
                    Kişisel verilerinizin eksik veya yanlış işlenmiş olması
                    hâlinde bunların düzeltilmesini isteme
                  </li>
                  <li>
                    KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde
                    kişisel verilerinizin silinmesini veya yok edilmesini isteme
                  </li>
                  <li>
                    Düzeltme, silme veya yok edilme işlemlerinin kişisel
                    verilerinizin aktarıldığı üçüncü kişilere bildirilmesini
                    isteme
                  </li>
                  <li>
                    İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla
                    analiz edilmesi suretiyle aleyhinize bir sonucun ortaya
                    çıkmasına itiraz etme
                  </li>
                  <li>
                    Kişisel verilerinizin kanuna aykırı olarak işlenmesi
                    sebebiyle zarara uğramanız hâlinde zararın giderilmesini
                    talep etme
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  6. İletişim
                </h2>
                <p>
                  KVKK kapsamındaki taleplerinizi, tarafımıza aşağıdaki iletişim
                  bilgileri üzerinden ulaştırabilirsiniz:
                </p>
                <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-semibold">Varda Minikler Köyü</p>
                  <p className="mt-1">
                    Adres: Fuar Alanı Kavşağı, Prof. Dr. Necmettin Erbakan
                    Bulvarı 262/1A, ÇUKUROVA/ADANA
                  </p>
                  <p className="mt-1">Telefon: 0552 289 71 91</p>
                  <p className="mt-1">E-posta: info@vardaokullari.com</p>
                </div>
              </section>
            </div>
          </Card>
        </motion.section>

        {/* Açık Rıza Metni */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6 md:p-8 border-2 border-orange-200">
            <h2 className="text-2xl md:text-3xl font-bold text-[color:var(--secondary)] mb-6">
              Açık Rıza Metni
            </h2>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
              <section>
                <p>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca,
                  <strong> Varda Minikler Köyü</strong> tarafından hazırlanan
                  KVKK Aydınlatma Metni&apos;ni okudum, anladım ve kabul
                  ediyorum.
                </p>
              </section>

              <section>
                <p>
                  Ön kayıt formunda paylaştığım kişisel verilerimin (veli
                  adı-soyadı, çocuk adı-soyadı ve doğum tarihi, telefon
                  numarası, e-posta adresi ve mesaj içeriği) aşağıdaki amaçlarla
                  işlenmesine açık rıza veriyorum:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Eğitim hizmeti sunumu ve kayıt işlemleri</li>
                  <li>İletişim ve bilgilendirme faaliyetleri</li>
                  <li>Randevu planlama ve organizasyon</li>
                  <li>Müşteri hizmetleri ve destek süreçleri</li>
                </ul>
              </section>

              <section>
                <p>
                  Kişisel verilerimin yukarıda belirtilen amaçlar doğrultusunda
                  işlenmesine ve saklanmasına, KVKK ve ilgili mevzuat kapsamında
                  onay veriyorum.
                </p>
              </section>

              <section>
                <p className="text-sm text-gray-600 italic mt-6">
                  Bu onay metni, ön kayıt formunu göndermekle birlikte kabul
                  edilmiş sayılır. KVKK kapsamındaki haklarınızı kullanmak için
                  yukarıda belirtilen iletişim bilgileri üzerinden bizimle
                  iletişime geçebilirsiniz.
                </p>
              </section>
            </div>
          </Card>
        </motion.section>

        {/* Alt Bilgilendirme */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">Son güncelleme: Kasım 2025</p>
        </motion.div>
      </main>
    </>
  );
}
