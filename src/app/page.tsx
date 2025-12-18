"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link"; 

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    setIsClient(true);
    checkGlobalLimit();
  }, []);

  // --- FUNGSI CEK LIMIT (SINKRON DENGAN TIKTOK) ---
  const checkGlobalLimit = () => {
    // 1. Cek VIP
    const isPremium = localStorage.getItem("guidify_premium_status") === "active";
    if (isPremium) return;

    // 2. Cek Key Global
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem("guidify_last_date");

    if (lastDate !== today) {
      // Jika hari baru, tampilan Home pasti Hijau
      setIsLimitReached(false);
    } else {
      // Jika hari sama, cek status global
      const globalCount = parseInt(localStorage.getItem("guidify_global_limit") || "0");
      if (globalCount >= 1) {
        setIsLimitReached(true); // Jika TikTok bilang habis, Home juga habis
      }
    }
  };

  // --- AKSI SAAT KLIK DOWNLOAD DI HOME ---
  const handleDownloadClick = (url: string) => {
    if (!isClient) return;

    // Set Global Limit jadi Habis (1)
    localStorage.setItem("guidify_global_limit", "1");
    localStorage.setItem("guidify_last_date", new Date().toDateString());
    
    setIsLimitReached(true);
    
    // Buka Link
    window.open(url, '_blank');
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
          
          {/* INFO KUOTA (SINKRON) */}
          <div className="mb-10">
             {isLimitReached ? (
                <span className="bg-red-900/30 text-red-500 border border-red-500/50 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase animate-pulse">
                   🔒 Daily Quota Reached (0/1)
                </span>
             ) : (
                <span className="bg-green-900/30 text-green-500 border border-green-500/50 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                   ✅ Free Daily Quota Available (1/1)
                </span>
             )}
          </div>

          {/* MENU KARTU */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10 mb-20 animate-in fade-in zoom-in duration-1000 delay-300">
              
              {/* TIKTOK */}
              <div className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-amber-500 transition-colors duration-300">
                  <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl">🎵</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">TikTok Downloader</h3>
                  <p className="text-gray-500 text-sm mb-6">Download video tanpa watermark.</p>
                  
                  {isLimitReached ? (
                      <Link href="/upgrade" className="block w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all text-sm">
                         🔒 Upgrade to Unlock
                      </Link>
                  ) : (
                      <div onClick={() => handleDownloadClick("https://tiktok.guidify.app")} className="block w-full bg-white text-black hover:bg-amber-500 hover:text-white font-bold py-3 rounded-xl transition-all cursor-pointer text-sm">
                         Open Tool →
                      </div>
                  )}
              </div>

              {/* INSTAGRAM (Logic Sama) */}
              <div className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-pink-500 transition-colors duration-300">
                  <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl">📸</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Instagram Saver</h3>
                  <p className="text-gray-500 text-sm mb-6">Simpan Reels & Stories HD.</p>
                  
                  {isLimitReached ? (
                      <Link href="/upgrade" className="block w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all text-sm">
                         🔒 Upgrade to Unlock
                      </Link>
                  ) : (
                      <div onClick={() => handleDownloadClick("https://insta.guidify.app")} className="block w-full bg-white text-black hover:bg-pink-500 hover:text-white font-bold py-3 rounded-xl transition-all cursor-pointer text-sm">
                         Open Tool →
                      </div>
                  )}
              </div>

              {/* YOUTUBE (Logic Sama) */}
              <div className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-red-500 transition-colors duration-300">
                  <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl">▶️</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">YouTube Converter</h3>
                  <p className="text-gray-500 text-sm mb-6">Convert ke MP4 & MP3 cepat.</p>
                  
                  {isLimitReached ? (
                      <Link href="/upgrade" className="block w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all text-sm">
                         🔒 Upgrade to Unlock
                      </Link>
                  ) : (
                      <div onClick={() => handleDownloadClick("https://youtube.guidify.app")} className="block w-full bg-white text-black hover:bg-red-500 hover:text-white font-bold py-3 rounded-xl transition-all cursor-pointer text-sm">
                         Open Tool →
                      </div>
                  )}
              </div>
          </div>

          {/* TEKS SEO (TETAP SAMA) */}
          <section className="w-full max-w-4xl text-left border-t border-white/10 pt-16 animate-in fade-in duration-1000 delay-500">
              <div className="mx-auto">
                  <h2 className="text-3xl font-bold text-white mb-6 font-cinzel">The Universal Social Media Downloader</h2>
                  <p className="text-gray-300 mb-6 leading-relaxed text-base">
                      Guidify is designed to be your single destination for saving media content from the internet. In an era where content is spread across multiple apps like TikTok, Instagram, and YouTube, jumping between different websites to download videos can be frustrating. Guidify solves this by providing a unified, high-speed, and secure platform.
                  </p>
                  {/* ... Sisa konten SEO sama ... */}
              </div>
          </section>

        </div>
        <Footer />
      </main>
    </>
  );
}