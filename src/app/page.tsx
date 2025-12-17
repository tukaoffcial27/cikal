"use client";

import { useState } from "react";
import { Zap, Download, Search, Loader2 } from "lucide-react"; // Import Icon
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PricingModal from "../components/PricingModal";

export default function HomePage() {
  // State Logika
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  // State Input & Loading
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- LOGIKA 1: UNTUK TOMBOL DOWNLOAD KUNING ---
  const handleMainDownload = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman

    // Cek apakah input kosong
    if (!inputUrl.trim()) {
      alert("Please paste a valid video URL!");
      return;
    }

    // CEK LIMIT: Jika sudah pernah download 1x, munculkan Popup
    if (clickCount >= 1) {
      setIsModalOpen(true);
      return;
    }

    // JIKA MASIH GRATIS: Jalankan Efek Loading
    setIsLoading(true);
    
    // Simulasi proses download (tunggu 2 detik)
    setTimeout(() => {
      setIsLoading(false);
      alert("🚀 Video found! Download starting..."); // Feedback ke user
      setClickCount(prev => prev + 1); // Tambah hitungan limit
      setInputUrl(""); // Kosongkan input
    }, 2000);
  };

  // --- LOGIKA 2: UNTUK KARTU (TikTok/IG/YT) ---
  const handleCardClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();

    if (clickCount >= 1) {
      setIsModalOpen(true);
    } else {
      setClickCount(prev => prev + 1);
      window.open(url, '_blank');
    }
  };

  return (
    <main className="min-h-screen bg-black font-outfit text-white selection:bg-amber-500 selection:text-black flex flex-col">
      <Navbar />

      {/* Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50"></div>

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center pt-32 pb-10">
        
        {/* Badge Premium */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold mb-6 tracking-widest uppercase animate-in fade-in slide-in-from-bottom-4">
          <Zap className="w-3 h-3 fill-current" />
          Premium Suite
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-8xl font-bold mb-6 font-cinzel tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Guidify<span className="text-amber-500">.</span>
        </h1>

        <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Download high-quality videos from TikTok, Instagram, and YouTube without watermarks.
        </p>

        {/* --- FORM INPUT UTAMA (YANG WARNA KUNING) --- */}
        <form 
          onSubmit={handleMainDownload}
          className="w-full max-w-2xl bg-[#111] border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl mb-20 animate-in fade-in zoom-in duration-1000 delay-300"
        >
          <div className="flex-1 flex items-center px-4 gap-3">
            <Search className="text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Paste video link here..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="bg-transparent border-none outline-none w-full py-3 text-white placeholder:text-gray-600"
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading} // Matikan tombol saat loading
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download
              </>
            )}
          </button>
        </form>

        {/* --- MENU PILIHAN TOOLS (KARTU) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10 mb-20">
            {/* KARTU TIKTOK */}
            <a 
              href="https://tiktok.guidify.app" 
              onClick={(e) => handleCardClick(e, "https://tiktok.guidify.app")}
              className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-amber-500 transition-colors duration-300 cursor-pointer"
            >
                <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-105 transition-transform">🎵</div>
                <h3 className="text-2xl font-bold mb-2 text-white">TikTok Downloader</h3>
                <p className="text-gray-500 text-sm">Download video tanpa watermark.</p>
            </a>

            {/* KARTU INSTAGRAM */}
            <a 
              href="https://insta.guidify.app"
              onClick={(e) => handleCardClick(e, "https://insta.guidify.app")}
              className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-pink-500 transition-colors duration-300 cursor-pointer"
            >
                <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-105 transition-transform">📸</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Instagram Saver</h3>
                <p className="text-gray-500 text-sm">Simpan Reels & Stories HD.</p>
            </a>

            {/* KARTU YOUTUBE */}
            <a 
              href="https://youtube.guidify.app"
              onClick={(e) => handleCardClick(e, "https://youtube.guidify.app")}
              className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-red-500 transition-colors duration-300 cursor-pointer"
            >
                <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-105 transition-transform">▶️</div>
                <h3 className="text-2xl font-bold mb-2 text-white">YouTube Converter</h3>
                <p className="text-gray-500 text-sm">Convert ke MP4 & MP3 cepat.</p>
            </a>
        </div>

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