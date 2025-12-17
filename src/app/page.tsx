"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// KITA TARUH KODE MODAL LANGSUNG DI SINI (INLINE)
// Supaya tidak ada alasan "File tidak ketemu" atau "Props tidak nyambung"
function InlineModal({ onClose }: { onClose: () => void }) {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999, /* Z-Index Tertinggi */
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)'
      }}
    >
      <div className="bg-[#111] border border-amber-500 rounded-2xl p-8 max-w-sm w-full text-center relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 text-xl font-bold"
        >
          ✕
        </button>
        
        <div className="text-4xl mb-4">⚡</div>
        <h2 className="text-2xl font-bold text-white mb-2">TEST POPUP</h2>
        <p className="text-gray-400 text-sm mb-6">
          Jika Anda melihat ini, berarti sistem VISUAL normal. <br/>
          Masalah sebelumnya hanya di logika "Kapan Muncul".
        </p>

        <a 
          href="https://guidify.lemonsqueezy.com/buy/5eb36fb5-4bf6-4813-8cbd-536eb6a0d726"
          target="_blank"
          className="block w-full bg-amber-500 text-black font-bold py-3 rounded-xl"
        >
          Tes Tombol Bayar
        </a>
      </div>
    </div>
  );
}

export default function HomePage() {
  // KITA SET DEFAULT 'TRUE' -> Supaya pas dibuka LANGSUNG MUNCUL
  const [showPopup, setShowPopup] = useState(true);

  // Fungsi Logika Limit (Disimpan dulu, kita tes visual dulu)
  const handleCardClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    // Untuk tes ini, kita paksa munculkan popup setiap kali klik
    setShowPopup(true);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black font-outfit text-white selection:bg-amber-500 selection:text-black flex flex-col">
        
        {/* BACKGROUND */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50"></div>

        <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center pt-32 pb-10">
          
          <h1 className="text-5xl md:text-8xl font-bold mb-6 font-cinzel tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Guidify<span className="text-amber-500">.</span>
          </h1>

          <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            The Ultimate All-in-One Social Media Downloader.
          </p>

          {/* TOMBOL TEST MANUAL */}
          <button 
            onClick={() => setShowPopup(true)}
            className="mb-10 bg-red-600 text-white px-6 py-2 rounded-full font-bold z-50 relative"
          >
            🔴 KLIK SAYA UNTUK MUNCLUKAN POPUP
          </button>

          {/* MENU KARTU */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10 mb-20 animate-in fade-in zoom-in duration-1000 delay-300">
              
              {/* TIKTOK */}
              <a href="#" onClick={(e) => handleCardClick(e, "https://tiktok.guidify.app")} className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-amber-500 transition-colors duration-300 cursor-pointer">
                  <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl">🎵</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">TikTok Downloader</h3>
                  <p className="text-gray-500 text-sm">Download video tanpa watermark.</p>
              </a>

              {/* INSTAGRAM */}
              <a href="#" onClick={(e) => handleCardClick(e, "https://insta.guidify.app")} className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-pink-500 transition-colors duration-300 cursor-pointer">
                  <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl">📸</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Instagram Saver</h3>
                  <p className="text-gray-500 text-sm">Simpan Reels & Stories HD.</p>
              </a>

              {/* YOUTUBE */}
              <a href="#" onClick={(e) => handleCardClick(e, "https://youtube.guidify.app")} className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-red-500 transition-colors duration-300 cursor-pointer">
                  <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl">▶️</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">YouTube Converter</h3>
                  <p className="text-gray-500 text-sm">Convert ke MP4 & MP3 cepat.</p>
              </a>
          </div>

          {/* TEKS SEO */}
          <section className="w-full max-w-4xl text-left border-t border-white/10 pt-16 animate-in fade-in duration-1000 delay-500">
             <p className="text-gray-500 text-sm text-center">Section SEO Content...</p>
          </section>

        </div>
        <Footer />
      </main>

      {/* RENDER MODAL SECARA LANGSUNG JIKA STATE TRUE */}
      {showPopup && <InlineModal onClose={() => setShowPopup(false)} />}
    </>
  );
}