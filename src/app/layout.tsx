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

export const metadata: Metadata = {
  title: "Guidify Suite",
  description: "Premium Social Media Tools",
  // INI BAGIAN PENTING YANG SUDAH DIPERBAIKI:
  verification: {
    google: "F8-qAir322zBSKzxINGeb_ahWPg-JPWwtIBUBm-Osik",
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