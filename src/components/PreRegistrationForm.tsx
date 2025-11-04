"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  parentName: z.string().min(3, "Veli adı-soyadı gerekli"),
  childName: z.string().min(3, "Çocuk adı-soyadı gerekli"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Doğum tarihini giriniz"),
  phone: z
    .string()
    .min(10, "Geçerli bir telefon giriniz")
    .max(20)
    .transform((v) => v.trim()),
  email: z.string().email("Geçerli bir e-posta giriniz"),
  message: z.string().max(1000).optional(),
  consentApproved: z
    .boolean()
    .refine((v) => v === true, { message: "Tüm onaylar gerekli" }),
});

export type PreAppFormValues = z.infer<typeof schema>;

export default function PreRegistrationForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PreAppFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      consentApproved: false,
    },
  });

  const onSubmit = async (values: PreAppFormValues) => {
    try {
      setSubmitStatus("idle");
      
      // API route'a gönder (Firestore + Email)
      const response = await fetch("/api/pre-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Başvuru gönderilemedi");
      }

      setSubmitStatus("success");
      reset();
      
      // 5 saniye sonra success mesajını kaldır
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (e) {
      console.error(e);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const labelBase = "text-sm font-medium text-foreground";
  const inputBase =
    "w-full rounded-xl border border-border bg-card px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring";
  const errText = "text-xs text-[color:var(--destructive)]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Başlık bloğu */}
      <div className="rounded-2xl border border-border bg-[color:var(--neutral-light)]/60 p-4">
        <h3 className="text-lg font-semibold text-[color:var(--primary)]">
          ÖN KAYIT FORMU
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Sorularınız için:{" "}
          <a
            className="text-[color:var(--primary)] underline underline-offset-4"
            href="tel:05522897191"
          >
            0552 289 71 91
          </a>
        </p>
      </div>

      {/* Veli / Çocuk isimleri */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelBase}>
            Veli Adı-Soyadı{" "}
            <span className="text-[color:var(--destructive)]">*</span>
          </label>
          <input
            type="text"
            {...register("parentName")}
            className={inputBase}
          />
          {errors.parentName && (
            <p className={errText}>{errors.parentName.message}</p>
          )}
        </div>
        <div>
          <label className={labelBase}>
            Çocuk Adı-Soyadı{" "}
            <span className="text-[color:var(--destructive)]">*</span>
          </label>
          <input type="text" {...register("childName")} className={inputBase} />
          {errors.childName && (
            <p className={errText}>{errors.childName.message}</p>
          )}
        </div>
      </div>

      {/* Tarih / Telefon / E-posta */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className={labelBase}>
            Çocuk Doğum Tarihi{" "}
            <span className="text-[color:var(--destructive)]">*</span>
          </label>
          <input type="date" {...register("birthDate")} className={inputBase} />
          {errors.birthDate && (
            <p className={errText}>{errors.birthDate.message}</p>
          )}
        </div>
        <div>
          <label className={labelBase}>
            Veli Tel <span className="text-[color:var(--destructive)]">*</span>
          </label>
          <input
            type="tel"
            placeholder="5xx xxx xx xx"
            inputMode="tel"
            {...register("phone")}
            className={inputBase}
          />
          {errors.phone && <p className={errText}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelBase}>
            Veli E-posta Adresi{" "}
            <span className="text-[color:var(--destructive)]">*</span>
          </label>
          <input type="email" {...register("email")} className={inputBase} />
          {errors.email && <p className={errText}>{errors.email.message}</p>}
        </div>
      </div>

      {/* Mesaj */}
      <div>
        <label className={labelBase}>Mesajınız (opsiyonel)</label>
        <textarea rows={4} {...register("message")} className={inputBase} />
      </div>

      {/* Onaylar */}
      <div>
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            {...register("consentApproved")}
            className="mt-1"
          />
          <span className="text-sm text-muted-foreground">
            <a
              className="text-[color:var(--primary)] underline underline-offset-4"
              href="/aydinlatma-metni"
              target="_blank"
            >
              Aydınlatma Metni
            </a>
            ,{" "}
            <a
              className="text-[color:var(--primary)] underline underline-offset-4"
              href="/kvkk"
              target="_blank"
            >
              KVKK Aydınlatma Metni
            </a>{" "}
            ve{" "}
            <a
              className="text-[color:var(--primary)] underline underline-offset-4"
              href="/acik-riza-metni"
              target="_blank"
            >
              Açık Rıza Metni
            </a>
            &apos;ni okudum ve kabul ediyorum.
          </span>
        </label>
        {errors.consentApproved && (
          <p className={errText}>{errors.consentApproved.message}</p>
        )}
      </div>

      {/* Gönder butonu */}
      <div className="space-y-4">
        {/* Success/Error Messages */}
        {submitStatus === "success" && (
          <div className="p-4 rounded-xl bg-green-50 border-2 border-green-200">
            <p className="text-green-800 font-semibold text-center">
              ✅ Ön kayıt başvurunuz alındı! En kısa sürede size dönüş yapacağız.
            </p>
          </div>
        )}
        
        {submitStatus === "error" && (
          <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200">
            <p className="text-red-800 font-semibold text-center">
              ❌ Bir hata oluştu. Lütfen tekrar deneyin veya telefon ile iletişime geçin.
            </p>
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center rounded-xl px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isSubmitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
          </button>
        </div>
      </div>
    </form>
  );
}
