"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { trackPreRegistrationStart, trackPreRegistrationComplete, trackFormSubmit } from "@/lib/analytics";

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
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [recaptchaError, setRecaptchaError] = useState<string>("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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
      setRecaptchaError("");

      // Form submit başlatıldı - GA4'e bildir
      trackPreRegistrationStart();

      // reCAPTCHA token kontrolü
      const recaptchaToken = recaptchaRef.current?.getValue();
      if (!recaptchaToken) {
        setRecaptchaError("Lütfen robot olmadığınızı doğrulayın");
        trackFormSubmit("Pre-Registration", false);
        return;
      }

      // API route'a gönder (Firestore + Email + reCAPTCHA)
      const response = await fetch("/api/pre-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Başvuru gönderilemedi");
      }

      // Başarılı form gönderimi - GA4'e bildir
      trackPreRegistrationComplete();
      trackFormSubmit("Pre-Registration", true);

      setSubmitStatus("success");
      reset();
      recaptchaRef.current?.reset(); // reCAPTCHA'yı sıfırla

      // 5 saniye sonra success mesajını kaldır
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (e) {
      console.error(e);
      // Hatalı form gönderimi - GA4'e bildir
      trackFormSubmit("Pre-Registration", false);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const labelBase = "text-sm font-medium text-foreground";
  const inputBase =
    "w-full rounded-xl border border-border bg-card px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring";
  const errText = "text-xs text-destructive";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Başlık bloğu */}
      <div className="rounded-2xl border border-border bg-neutral-light/60 p-4">
        <h3 className="text-lg font-semibold text-primary">ÖN KAYIT FORMU</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Sorularınız için:{" "}
          <a
            className="text-primary underline underline-offset-4"
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
            Veli Adı-Soyadı <span className="text-destructive">*</span>
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
            Çocuk Adı-Soyadı <span className="text-destructive">*</span>
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
            Çocuk Doğum Tarihi <span className="text-destructive">*</span>
          </label>
          <input type="date" {...register("birthDate")} className={inputBase} />
          {errors.birthDate && (
            <p className={errText}>{errors.birthDate.message}</p>
          )}
        </div>
        <div>
          <label className={labelBase}>
            Veli Tel <span className="text-destructive">*</span>
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
            Veli E-posta Adresi <span className="text-destructive">*</span>
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
              className="text-primary underline underline-offset-4"
              href="/kvkk"
              target="_blank"
            >
              KVKK Aydınlatma Metni
            </a>{" "}
            ve{" "}
            <a
              className="text-primary underline underline-offset-4"
              href="/kvkk"
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

      {/* reCAPTCHA */}
      <div className="flex flex-col items-end">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          onChange={() => setRecaptchaError("")}
        />
        {recaptchaError && (
          <p className={`${errText} mt-2`}>{recaptchaError}</p>
        )}
      </div>

      {/* Gönder butonu */}
      <div className="space-y-4">
        {/* Success/Error Messages */}
        {submitStatus === "success" && (
          <div className="p-4 rounded-xl bg-green-50 border-2 border-green-200">
            <p className="text-green-800 font-semibold text-center">
              ✅ Ön kayıt başvurunuz alındı! En kısa sürede size dönüş
              yapacağız.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200">
            <p className="text-red-800 font-semibold text-center">
              ❌ Bir hata oluştu. Lütfen tekrar deneyin veya telefon ile
              iletişime geçin.
            </p>
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center rounded-xl px-8 py-3 bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isSubmitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
          </button>
        </div>
      </div>
    </form>
  );
}
