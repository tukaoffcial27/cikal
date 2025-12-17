"use client";

import { useState } from "react";
import { Zap } from "lucide-react"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PricingModal from "../components/PricingModal";

export default function HomePage() {
  // --- STATE (MEMORY) ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0); // Hitungan klik

  // --- LOGIKA UTAMA: UNTUK KARTU TOOLS ---
  const handleCardClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault(); // Matikan link bawaan

    console.log("Card diklik. Hitungan saat ini:", clickCount);

    // LOGIKA LIMIT:
    // Jika user sudah pernah klik 1 kali atau lebih -> Munculkan Popup
    if (clickCount >= 1) {
      setIsModalOpen(true);
    } else {
      // Jika belum, tambah hitungan jadi 1, lalu buka link
      setClickCount(prev => prev + 1);
      window.open(url, '_blank');
    }
  };

  return (
    <main className="min-h-screen bg-black font-outfit text-white selection:bg-amber-500 selection:text-black flex flex-col">
      <Navbar />

      {/* BACKGROUND EFFECT */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50"></div>

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center pt-32 pb-10">
        
        {/* JUDUL UTAMA (HERO) */}
        <h1 className="text-5xl md:text-8xl font-bold mb-6 font-cinzel tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Guidify<span className="text-amber-500">.</span>
        </h1>

        <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          The Ultimate All-in-One Social Media Downloader. <br/>
          <span className="text-amber-500/80">Fast. Secure. Unlimited.</span>
        </p>

        {/* --- MENU PILIHAN TOOLS (KARTU SAJA - TANPA INPUT BOX) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10 mb-20 animate-in fade-in zoom-in duration-1000 delay-300">
            
            {/* TIKTOK */}
            <a 
              href="https://tiktok.guidify.app" 
              onClick={(e) => handleCardClick(e, "https://tiktok.guidify.app")} 
              className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-amber-500 transition-colors duration-300 cursor-pointer"
            >
                <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-105 transition-transform">
                    🎵
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">TikTok Downloader</h3>
                <p className="text-gray-500 text-sm">Download video tanpa watermark.</p>
                <div className="mt-6 text-amber-500 font-bold flex items-center gap-2 text-sm">
                    Open Tool →
                </div>
            </a>

            {/* INSTAGRAM */}
            <a 
              href="https://insta.guidify.app" 
              onClick={(e) => handleCardClick(e, "https://insta.guidify.app")} 
              className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-pink-500 transition-colors duration-300 cursor-pointer"
            >
                <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-105 transition-transform">
                    📸
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Instagram Saver</h3>
                <p className="text-gray-500 text-sm">Simpan Reels & Stories HD.</p>
                <div className="mt-6 text-pink-500 font-bold flex items-center gap-2 text-sm">
                    Open Tool →
                </div>
            </a>

            {/* YOUTUBE */}
            <a 
              href="https://youtube.guidify.app" 
              onClick={(e) => handleCardClick(e, "https://youtube.guidify.app")} 
              className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-red-500 transition-colors duration-300 cursor-pointer"
            >
                <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-105 transition-transform">
                    ▶️
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">YouTube Converter</h3>
                <p className="text-gray-500 text-sm">Convert ke MP4 & MP3 cepat.</p>
                <div className="mt-6 text-red-500 font-bold flex items-center gap-2 text-sm">
                    Open Tool →
                </div>
            </a>
        </div>

        {/* --- TEKS SEO (YANG WAJIB ADA) --- */}
        <section className="w-full max-w-4xl text-left border-t border-white/10 pt-16 animate-in fade-in duration-1000 delay-500">
            <article className="prose prose-invert lg:prose-xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-6 font-cinzel">The Universal Social Media Downloader</h2>
                <p className="text-gray-400 mb-6 leading-relaxed text-base">
                    Guidify is designed to be your single destination for saving media content from the internet. In an era where content is spread across multiple apps like TikTok, Instagram, and YouTube, jumping between different websites to download videos can be frustrating. Guidify solves this by providing a unified, high-speed, and secure platform.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-10">
                    <div>
                        <h3 className="text-xl font-bold text-amber-500 mb-3">Why Guidify is Different?</h3>
                        <p className="text-gray-400 text-sm">
                            Unlike other tools that are cluttered with popup ads and slow servers, Guidify focuses on User Experience (UX). We use premium cloud servers to ensure your downloads start instantly.
                        </p>
                    </div>
                    <div>
                         <h3 className="text-xl font-bold text-amber-500 mb-3">Privacy First Policy</h3>
                        <p className="text-gray-400 text-sm">
                            We do not store your download history. The videos are processed in real-time and delivered directly to your device. Your privacy is our top priority.
                        </p>
                    </div>
                </div>
            </article>
        </section>

      </div>
      <Footer />
      
      {/* POPUP MODAL */}
      <PricingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </main>
  );
}