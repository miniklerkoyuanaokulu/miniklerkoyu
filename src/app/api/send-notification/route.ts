import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email transporter oluştur
function createTransporter() {
  // Gmail kullanıyorsanız:
  // 1. Gmail hesabınızda "2-Step Verification" açık olmalı
  // 2. "App Password" oluşturmalısınız: https://myaccount.google.com/apppasswords
  
  return nodemailer.createTransport({
    service: "gmail", // veya "outlook", "yahoo", vb.
    auth: {
      user: process.env.EMAIL_USER, // Örn: info@vardaokullari.com
      pass: process.env.EMAIL_PASSWORD, // App Password
    },
  });
}

// Email template
function generatePreRegistrationEmail(data: {
  parentName: string;
  childName: string;
  birthDate: string;
  phone: string;
  email: string;
  message?: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f97316 0%, #fb923c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-row { margin: 15px 0; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #f97316; }
    .label { font-weight: bold; color: #f97316; margin-bottom: 5px; }
    .value { color: #333; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e5e5; text-align: center; color: #666; font-size: 14px; }
    .badge { display: inline-block; padding: 5px 15px; background: #10b981; color: white; border-radius: 20px; font-size: 12px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🌳 Yeni Ön Kayıt Başvurusu</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Vardalı Minikler Köyü</p>
    </div>
    
    <div class="content">
      <p style="margin-top: 0;"><span class="badge">YENİ</span></p>
      
      <div class="info-row">
        <div class="label">👤 Veli Adı-Soyadı:</div>
        <div class="value">${data.parentName}</div>
      </div>
      
      <div class="info-row">
        <div class="label">👶 Çocuk Adı-Soyadı:</div>
        <div class="value">${data.childName}</div>
      </div>
      
      <div class="info-row">
        <div class="label">🎂 Doğum Tarihi:</div>
        <div class="value">${data.birthDate}</div>
      </div>
      
      <div class="info-row">
        <div class="label">📞 Telefon:</div>
        <div class="value"><a href="tel:${data.phone}" style="color: #f97316; text-decoration: none;">${data.phone}</a></div>
      </div>
      
      <div class="info-row">
        <div class="label">📧 E-posta:</div>
        <div class="value"><a href="mailto:${data.email}" style="color: #f97316; text-decoration: none;">${data.email}</a></div>
      </div>
      
      ${data.message ? `
      <div class="info-row">
        <div class="label">💬 Mesaj:</div>
        <div class="value">${data.message}</div>
      </div>
      ` : ''}
      
      <div class="footer">
        <p><strong>Vardalı Minikler Köyü Anaokulu</strong></p>
        <p>Bu başvuruyu admin panelinden yönetebilirsiniz.</p>
        <p style="font-size: 12px; color: #999; margin-top: 10px;">
          Gönderim: ${new Date().toLocaleString("tr-TR")}
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Email konfigürasyonu kontrol
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn("Email konfigürasyonu eksik - email gönderilmedi");
      return NextResponse.json({
        success: true,
        emailSent: false,
        message: "Email konfigürasyonu eksik",
      });
    }

    const transporter = createTransporter();

    // Email gönder
    const mailOptions = {
      from: `"Vardalı Minikler Köyü" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_NOTIFICATION_TO || process.env.EMAIL_USER,
      subject: `🌳 Yeni Ön Kayıt: ${body.data.childName}`,
      html: generatePreRegistrationEmail(body.data),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      emailSent: true,
      message: "Email başarıyla gönderildi",
    });
  } catch (error) {
    console.error("Email gönderme hatası:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Email gönderilemedi",
      },
      { status: 500 }
    );
  }
}

