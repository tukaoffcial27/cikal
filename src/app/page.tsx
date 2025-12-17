"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- 1. MODAL (INLINE - FINAL DESIGN) ---
function InlinePricingModal({ onClose }: { onClose: () => void }) {
  const CHECKOUT_URL = "https://guidify.lemonsqueezy.com/buy/5eb36fb5-4bf6-4813-8cbd-536eb6a0d726";

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Background Gelap */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Konten Modal */}
      <div className="relative z-[100000] bg-[#111] border border-amber-500/50 rounded-3xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in duration-300">
        
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-xl transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center pt-2">
            <div className="text-4xl mb-4">⚡</div>
            <h2 className="text-2xl font-bold text-white mb-2 font-cinzel">Daily Limit Reached</h2>
            <p className="text-gray-400 text-sm px-4">
              Jatah download gratis harian habis. Upgrade sekarang.
            </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-gradient-to-b from-[#1a1a1a] to-transparent border border-white/10 rounded-2xl p-5">
            <div className="flex justify-between items-end mb-4 pb-4 border-b border-white/10">
                <div>
                    <h3 className="text-lg font-bold text-white">Premium Suite</h3>
                    <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 inline-block px-2 py-1 rounded mt-1">Best Value</p>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-bold text-white">$4.99</span>
                    <span className="text-gray-500 text-sm font-medium">/mo</span>
                </div>
            </div>

            <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-center gap-3 text-sm text-gray-300">✅ Unlimited Downloads</li>
                <li className="flex items-center gap-3 text-sm text-gray-300">✅ High-Speed Server</li>
                <li className="flex items-center gap-3 text-sm text-gray-300">✅ No Ads & Popups</li>
            </ul>

            {/* Tombol Bayar */}
            <a 
                href={CHECKOUT_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl text-center transition-all shadow-lg hover:shadow-amber-500/20"
            >
                Unlock Access ⚡
            </a>
        </div>
      </div>
    </div>
  );
}

// --- 2. HALAMAN UTAMA (BERSIH) ---
export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // LOGIKA LIMIT (TANPA DEBUG)
  const handleCardClick = (url: string) => {
    if (!isClient) return;

    // Gunakan Key Baru biar bersih dari tes sebelumnya
    const STORAGE_KEY = "guidify_daily_limit_v1"; 
    
    const saved = localStorage.getItem(STORAGE_KEY);
    const current = saved ? parseInt(saved) : 0;

    if (current >= 1) {
      // JIKA SUDAH KLIK 1X ATAU LEBIH -> MUNCULKAN POPUP
      setShowPopup(true);
    } else {
      // JIKA BELUM -> CATAT DAN BUKA LINK
      const newCount = current + 1;
      localStorage.setItem(STORAGE_KEY, newCount.toString());
      window.open(url, '_blank');
    }
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

          {/* MENU KARTU - TETAP PAKAI DIV AGAR LOGIKA POPUP LANCAR */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10 mb-20 animate-in fade-in zoom-in duration-1000 delay-300">
              
              {/* TIKTOK */}
              <div 
                onClick={() => handleCardClick("https://tiktok.guidify.app")} 
                className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-amber-500 transition-colors duration-300 cursor-pointer"
              >
                  <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">🎵</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">TikTok Downloader</h3>
                  <p className="text-gray-500 text-sm">Download video tanpa watermark.</p>
                  <div className="mt-6 text-amber-500 font-bold flex items-center gap-2 text-sm">
                    Open Tool →
                  </div>
              </div>

              {/* INSTAGRAM */}
              <div 
                onClick={() => handleCardClick("https://insta.guidify.app")} 
                className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-pink-500 transition-colors duration-300 cursor-pointer"
              >
                  <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">📸</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Instagram Saver</h3>
                  <p className="text-gray-500 text-sm">Simpan Reels & Stories HD.</p>
                  <div className="mt-6 text-pink-500 font-bold flex items-center gap-2 text-sm">
                    Open Tool →
                  </div>
              </div>

              {/* YOUTUBE */}
              <div 
                onClick={() => handleCardClick("https://youtube.guidify.app")} 
                className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-red-500 transition-colors duration-300 cursor-pointer"
              >
                  <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">▶️</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">YouTube Converter</h3>
                  <p className="text-gray-500 text-sm">Convert ke MP4 & MP3 cepat.</p>
                  <div className="mt-6 text-red-500 font-bold flex items-center gap-2 text-sm">
                    Open Tool →
                  </div>
              </div>
          </div>

          {/* TEKS SEO LENGKAP (Low Content Fix) */}
          <section className="w-full max-w-4xl text-left border-t border-white/10 pt-16 animate-in fade-in duration-1000 delay-500">
              <div className="mx-auto">
                  <h2 className="text-3xl font-bold text-white mb-6 font-cinzel">The Universal Social Media Downloader</h2>
                  <p className="text-gray-300 mb-6 leading-relaxed text-base">
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
              </div>
          </section>

        </div>
        <Footer />
      </main>

      {/* RENDER MODAL */}
      {showPopup && <InlinePricingModal onClose={() => setShowPopup(false)} />}
    </>
  );
}