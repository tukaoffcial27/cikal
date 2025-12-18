import type { Metadata } from "next";
import { Outfit, Cinzel } from "next/font/google"; 
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: "--font-cinzel",
});

// --- PENGATURAN SEO & IDENTITAS WEBSITE ---
export const metadata: Metadata = {
  // Judul yang muncul di Tab Browser & Google
  title: "Guidify - Premium Social Media Downloader (No Watermark)",
  
  // Deskripsi di bawah judul Google
  description: "The ultimate tool to download TikTok videos without watermark, save Instagram Reels, and convert YouTube to MP4/MP3. Fast, secure, and high quality.",
  
  // Kode Verifikasi Google Search Console (SUDAH BENAR DISINI)
  verification: {
    google: "F8-qAir322zBSKzxINGeb_ahWPg-JPWwtIBUBm-Osik",
  },

  // Agar tampilan cantik saat link dishare di WA/FB (OpenGraph)
  openGraph: {
    title: "Guidify - Premium Downloader",
    description: "Download TikTok, Instagram & YouTube without watermark.",
    url: "https://guidify.app",
    siteName: "Guidify",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${cinzel.variable} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}