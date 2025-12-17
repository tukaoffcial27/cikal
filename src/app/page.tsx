"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Kita TIDAK PANGGIL PricingModal dulu untuk tes ini
// import PricingModal from "../components/PricingModal"; 

export default function HomePage() {
  // State untuk memunculkan Banner Peringatan
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  // LOGIKA LIMIT
  const handleCardClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault(); // Tahan link asli

    let currentCount = 0;
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("guidify_clicks");
      currentCount = saved ? parseInt(saved) : 0;
    }

    console.log("Cek Limit. Hitungan:", currentCount);

    if (currentCount >= 1) {
      // JIKA LIMIT HABIS:
      // Jangan buka Modal, tapi NYALAKAN BANNER MERAH
      setShowLimitWarning(true);
      
      // Opsional: Scroll ke atas sedikit biar bannernya kelihatan
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // JIKA MASIH AMAN:
      if (typeof window !== "undefined") {
        localStorage.setItem("guidify_clicks", "1");
      }
      window.open(url, '_blank');
    }
  };

  // Fungsi Reset (Untuk keperluan testing Anda biar gampang)
  const resetLimit = () => {
    localStorage.removeItem("guidify_clicks");
    setShowLimitWarning(false);
    alert("Limit di-reset! Silakan coba klik lagi.");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black font-outfit text-white selection:bg-amber-500 selection:text-black flex flex-col">
        
        {/* BACKGROUND EFFECT */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50"></div>

        <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center pt-32 pb-10">
          
          {/* JUDUL UTAMA */}
          <h1 className="text-5xl md:text-8xl font-bold mb-6 font-cinzel tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Guidify<span className="text-amber-500">.</span>
          </h1>

          <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            The Ultimate All-in-One Social Media Downloader. <br/>
            <span className="text-amber-500/80">Fast. Secure. Unlimited.</span>
          </p>

          {/* --- FITUR ALTERNATIF: BANNER PERINGATAN --- */}
          {/* Ini hanya muncul jika state showLimitWarning = true */}
          {showLimitWarning && (
            <div className="w-full max-w-2xl bg-red-900/20 border border-red-500 rounded-2xl p-6 mb-10 animate-in fade-in zoom-in duration-300">
              <h3 className="text-2xl font-bold text-red-500 mb-2">⚠️ Daily Limit Reached</h3>
              <p className="text-gray-300 mb-6">
                Anda sudah menggunakan jatah gratis hari ini. Silakan upgrade untuk akses tanpa batas.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <a 
                  href="https://guidify.lemonsqueezy.com/buy/5eb36fb5-4bf6-4813-8cbd-536eb6a0d726"
                  target="_blank"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-xl transition-all"
                >
                  Upgrade Premium ($4.99)
                </a>
                
                {/* Tombol Debug Khusus Anda (Bisa dihapus nanti) */}
                <button 
                  onClick={resetLimit}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-400 font-bold py-3 px-8 rounded-xl transition-all border border-gray-600"
                >
                  🔄 Reset Limit (Test)
                </button>
              </div>
            </div>
          )}
          {/* ------------------------------------------- */}

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

          {/* SEO SECTION */}
          <section className="w-full max-w-4xl text-left border-t border-white/10 pt-16 animate-in fade-in duration-1000 delay-500">
             {/* Isi SEO text tetap sama... */}
             <p className="text-gray-500 text-sm text-center">Section SEO Content...</p>
          </section>

        </div>
        <Footer />
      </main>
    </>
  );
}