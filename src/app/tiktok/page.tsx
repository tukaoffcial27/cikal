"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TikTokPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    checkLimit();
  }, []);

  const checkLimit = () => {
    // 1. Cek Apakah User VIP?
    const isPremium = localStorage.getItem("guidify_premium_status") === "active";
    if (isPremium) return; 

    // 2. Cek Tanggal & Limit (GUNAKAN KEY GLOBAL YANG BARU)
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem("guidify_last_date");
    
    if (lastDate !== today) {
      localStorage.setItem("guidify_last_date", today);
      localStorage.setItem("guidify_global_limit", "0"); // Reset jadi 0 (belum dipakai)
      setIsLimitReached(false);
    } else {
      // Cek apakah sudah dipakai (1 artinya habis)
      const count = parseInt(localStorage.getItem("guidify_global_limit") || "0");
      if (count >= 1) {
        setIsLimitReached(true);
      }
    }
  };

  const handleProcess = () => {
    // --- PERBAIKAN LOGIKA TOMBOL ---
    // 1. CEK LIMIT DULUAN (Prioritas Utama)
    if (isLimitReached) {
      if (confirm("⚠️ Daily Quota Reached!\n\nYou have reached your daily free limit. Upgrade to Premium for unlimited access?")) {
          window.location.href = "/upgrade";
      }
      return; // Stop di sini, jangan tanya link
    }

    // 2. BARU CEK LINK (Kalau kuota masih ada)
    if (!url) {
      alert("Please paste a valid TikTok link!");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      alert("✅ Video Found! Downloading...");
      
      // Catat Penggunaan Global (1 = Habis)
      localStorage.setItem("guidify_global_limit", "1");
      localStorage.setItem("guidify_last_date", new Date().toDateString()); // Update tanggal
      setIsLimitReached(true); 
      
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-black font-outfit text-white flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>

        {/* Info Kuota */}
        <div className="mb-8 z-10">
           {isLimitReached ? (
              <span className="bg-red-900/30 text-red-500 border border-red-500/50 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase animate-pulse">
                 🔴 Daily Quota: 0 Left
              </span>
           ) : (
              <span className="bg-green-900/30 text-green-500 border border-green-500/50 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                 🟢 Daily Quota: 1 Left
              </span>
           )}
        </div>

        <div className="text-center max-w-3xl z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
            TikTok <span className="text-amber-500">Premium</span> <br/> Downloader
          </h1>
          <p className="text-gray-400 text-lg mb-12">
            Download videos without watermark at lightning speed. <br/>
            Preserve original HD quality for your professional content creation.
          </p>

          {/* INPUT BOX */}
          <div className="w-full bg-[#111] border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl relative group mb-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-amber-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-lg"></div>
            
            <input 
              type="text" 
              placeholder="Paste TikTok video link here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="relative flex-1 bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-gray-600"
            />
            
            <button 
              onClick={handleProcess}
              disabled={isLoading}
              className={`relative px-8 py-3 rounded-xl font-bold transition-all text-black ${
                isLimitReached 
                ? "bg-red-600 hover:bg-red-500 text-white" 
                : "bg-white hover:bg-gray-200" 
              }`}
            >
              {isLoading ? "Processing..." : isLimitReached ? "🔒 Unlock Limit" : "Process"}
            </button>
          </div>

          {/* --- PERBAIKAN SEO (DESAIN MEWAH SEPERTI IG) --- */}
          <div className="text-left border-t border-white/10 pt-16 max-w-4xl mx-auto w-full">
              <h2 className="text-3xl font-bold text-white mb-6 font-cinzel text-center md:text-left">
                The Ultimate TikTok Downloader Without Watermark
              </h2>
              
              <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-500">Why Choose Guidify?</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Guidify TikTok is the premier solution for content creators. We detect and remove the floating TikTok ID instantly, ensuring your video looks professional and clean for reposting on Instagram Reels or YouTube Shorts.
                      </p>
                  </div>
                  
                  <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-500">Premium Features</h3>
                      <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex items-center gap-2">
                           <span className="text-green-500">✔</span> No Watermark Guarantee
                        </li>
                        <li className="flex items-center gap-2">
                           <span className="text-green-500">✔</span> Original HD/4K Quality
                        </li>
                        <li className="flex items-center gap-2">
                           <span className="text-green-500">✔</span> Works on iOS, Android & PC
                        </li>
                        <li className="flex items-center gap-2">
                           <span className="text-green-500">✔</span> 100% Secure & Anonymous
                        </li>
                      </ul>
                  </div>
              </div>
          </div>
          {/* ----------------------------------------------- */}

        </div>
      </div>
      <Footer />
    </main>
  );
}