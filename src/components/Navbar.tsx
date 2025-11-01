"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type MenuItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const menu: MenuItem[] = [
  { label: "Anasayfa", href: "/" },
  {
    label: "Kurumsal",
    href: "/kurumsal",
    children: [
      { label: "Hakkımızda", href: "/kurumsal#hakkimizda" },
      { label: "Tarihçemiz", href: "/kurumsal#tarihcemiz" },
      { label: "Kurucumuz", href: "/kurumsal#kurucumuz" },
      { label: "Misyonumuz", href: "/kurumsal#misyonumuz" },
      { label: "Vizyonumuz", href: "/kurumsal#vizyonumuz" },
      { label: "Felsefemiz", href: "/kurumsal#felsefemiz" },
      { label: "Ekibimiz", href: "/kurumsal#ekibimiz" },
    ],
  },
  {
    label: "Eğitim Modelimiz",
    href: "/egitim-modelimiz",
    children: [
      { label: "Derslerimiz", href: "/egitim-modelimiz#derslerimiz" },
      {
        label: "Günümüz Nasıl Geçer",
        href: "/egitim-modelimiz#gunumuz-nasil-gecer",
      },
      {
        label: "Ölçme Değerlendirme",
        href: "/egitim-modelimiz#olcme-degerlendirme",
      },
      { label: "Rehberlik", href: "/egitim-modelimiz#rehberlik" },
      {
        label: "Veli Bilgilendirme",
        href: "/egitim-modelimiz#veli-bilgilendirme",
      },
      {
        label: "Sosyal Etkinlikler",
        href: "/egitim-modelimiz#sosyal-etkinlikler",
      },
    ],
  },
  {
    label: "Neden Minikler Köyü?",
    href: "/neden-minikler-koyu",
    children: [
      { label: "Beslenme", href: "/neden-minikler-koyu#beslenme" },
      {
        label: "Fiziksel Koşullar",
        href: "/neden-minikler-koyu#fiziksel-kosullar",
      },
      { label: "Güvenlik", href: "/neden-minikler-koyu#guvenlik" },
    ],
  },
  { label: "Medya", href: "/medya" },
  { label: "İletişim", href: "/iletisim" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeHash, setActiveHash] = useState<string>("");

  // URL hash değişimini takip et
  useEffect(() => {
    const onHash = () => setActiveHash(window.location.hash || "");
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Not: Link tıklamalarında zaten menüyü kapatıyoruz; ek bir effect ile
  // senkron setState tetiklemeyerek gereksiz tekrar renderları önlüyoruz.

  // Aktif kontrolü (route + hash)
  const isActive = (href: string) => {
    // hash'li linkler için: path aynıysa ve hash eşleşiyorsa aktif
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      return pathname === path && activeHash === `#${hash}`;
    }
    // düz path için:
    return pathname === href;
  };

  // Anasayfa kontrolü
  const isHomePage = pathname === "/";

  // Anasayfada şeffaf, diğer sayfalarda beyaz
  const headerBg = isHomePage
    ? "bg-transparent border-transparent"
    : "bg-white shadow-md border-b border-gray-200";

  const linkColor = isHomePage ? "text-white" : "text-gray-700";

  // Desktop menü öğesi sınıfı
  const itemClass = (href: string) => {
    if (isHomePage) {
      return `px-3 py-2 text-sm font-medium rounded-lg transition
        ${
          isActive(href)
            ? "text-white bg-white/20"
            : "text-white hover:bg-white/10"
        }`;
    }
    return `px-3 py-2 text-sm font-medium rounded-lg transition
      ${
        isActive(href)
          ? "text-[color:var(--primary)] bg-orange-50"
          : "text-gray-700 hover:bg-orange-50 hover:text-[color:var(--primary)]"
      }`;
  };

  // Alt menü link sınıfı
  const subItemClass = (href: string) =>
    `block rounded-md px-3 py-2 text-sm transition
     ${
       isActive(href)
         ? "text-[color:var(--primary)] bg-[color:var(--neutral-light)]"
         : "text-foreground hover:bg-[color:var(--neutral-light)] hover:text-[color:var(--primary)]"
     }`;

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isHomePage ? "absolute top-0 left-0" : "relative"
      } z-50 ${headerBg}`}
      style={{ height: "var(--header-height)" }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-3 py-2 transition-opacity hover:opacity-80"
        >
          <div className="relative h-22 w-22 flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="Varda Minikler Köyü Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <span
            className={`text-base md:text-lg font-bold transition-colors ${linkColor}`}
          >
            Minikler Köyü
          </span>
        </Link>

        {/* Desktop */}
        <nav
          className="relative hidden items-center gap-1 md:flex"
          aria-label="Ana menü"
        >
          {menu.map((item) => (
            <div key={item.label} className="relative group">
              <Link href={item.href} className={itemClass(item.href)}>
                {item.label}
              </Link>

              {item.children && (
                <div
                  // pointer-events ile daha pürüzsüz hover
                  className="pointer-events-none absolute left-0 mt-2 min-w-64 rounded-xl border border-border
                             bg-card text-card-foreground shadow-lg opacity-0 translate-y-1
                             transition group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                             focus-within:opacity-100 focus-within:translate-y-0 focus-within:pointer-events-auto z-50"
                  role="menu"
                  aria-label={`${item.label} alt menü`}
                >
                  <ul className="p-2">
                    {item.children.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className={subItemClass(sub.href)}
                          role="menuitem"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <Link
            href="/iletisim"
            className={`ml-2 inline-flex items-center rounded-full px-5 py-2.5 font-medium shadow-sm transition ${
              isHomePage
                ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                : "border-2 border-[color:var(--primary)] text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white"
            }`}
          >
            Ön Kayıt
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`md:hidden inline-flex items-center justify-center rounded-lg p-2 border transition-colors ${
            isHomePage
              ? "border-white/30"
              : "border-gray-300 hover:border-[color:var(--primary)]"
          }`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menüyü aç/kapat"
          aria-expanded={mobileOpen}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={linkColor}
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="mx-auto max-w-6xl px-2 py-2">
            {menu.map((item) => {
              const opened = openItem === item.label;
              const hasChildren = !!item.children?.length;

              return (
                <li key={item.label} className="py-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className={`px-2 py-2 rounded-md ${
                        isActive(item.href)
                          ? "text-[color:var(--primary)] bg-[color:var(--neutral-light)]"
                          : ""
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        className="px-2 py-2"
                        onClick={() =>
                          setOpenItem((cur) =>
                            cur === item.label ? null : item.label
                          )
                        }
                        aria-label={`${item.label} alt menü`}
                        aria-expanded={opened}
                      >
                        {opened ? "−" : "+"}
                      </button>
                    )}
                  </div>

                  {hasChildren && opened && (
                    <ul className="ml-2 border-l pl-3">
                      {item.children!.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className={`block py-2 text-sm rounded-md ${
                              isActive(sub.href)
                                ? "text-[color:var(--primary)] bg-[color:var(--neutral-light)]"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}

            <li className="pt-2">
              <Link
                href="/iletisim"
                onClick={() => setMobileOpen(false)}
                className={`inline-flex items-center rounded-lg px-4 py-2 font-medium transition ${
                  isHomePage
                    ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                    : "border-2 border-[color:var(--primary)] text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white"
                }`}
              >
                Ön Kayıt
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
