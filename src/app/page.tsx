"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Zap, Check, X } from "lucide-react"; 

// --- 1. KOMPONEN MODAL (INLINE - STRUKTUR SAMA DENGAN "TEST POPUP" YANG BERHASIL) ---
function InlinePricingModal({ onClose }: { onClose: () => void }) {
  const CHECKOUT_URL = "https://guidify.lemonsqueezy.com/buy/5eb36fb5-4bf6-4813-8cbd-536eb6a0d726";

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} // Force CSS agar menutupi layar
    >
      {/* Background Gelap */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Konten Modal */}
      <div className="relative z-[100000] bg-[#111] border border-amber-500/50 rounded-3xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in duration-300">
        
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center pt-2">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20 text-amber-500 text-3xl">
                <Zap className="w-8 h-8 fill-current" />
            </div>
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
                <li className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-amber-500" /> Unlimited Downloads
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-amber-500" /> High-Speed Server
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-amber-500" /> No Ads & Popups
                </li>
            </ul>

            {/* Tombol Bayar */}
            <a 
                href={CHECKOUT_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl text-center transition-all shadow-lg"
            >
                Unlock Access ⚡
            </a>
        </div>
      </div>
    </div>
  );
}

// --- 2. HALAMAN UTAMA ---
export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Cek apakah kode dijalankan di browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  // LOGIKA LIMIT REAL
  const handleCardClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();

    if (!isClient) return;

    // Cek Memori Browser
    const saved = localStorage.getItem("guidify_limit_real");
    const isLimitReached = saved === "true";

    if (isLimitReached) {
      // JIKA LIMIT SUDAH HABIS -> MUNCULKAN POPUP
      setShowPopup(true);
    } else {
      // JIKA BELUM -> CATAT LIMIT DAN BUKA LINK
      localStorage.setItem("guidify_limit_real", "true");
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

          {/* --- TEKS SEO (YANG DULUNYA HILANG) --- */}
          {/* SAYA SUDAH PERBAIKI CLASSNYA AGAR MUNCUL TANPA PLUGIN */}
          <section className="w-full max-w-4xl text-left border-t border-white/10 pt-16 animate-in fade-in duration-1000 delay-500">
              <div className="mx-auto">
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