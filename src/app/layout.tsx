import type { Metadata } from "next";
import { Outfit, Cinzel } from "next/font/google"; 
import "./globals.css";

// Setup Font Modern (Teks Body)
const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

// Setup Font Mewah (Judul/Logo)
const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "Guidify Suite",
  description: "Premium Social Media Tools",
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