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

    // 2. Cek Tanggal & Limit
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem("guidify_last_date");
    
    if (lastDate !== today) {
      localStorage.setItem("guidify_last_date", today);
      localStorage.setItem("guidify_daily_count", "0");
      setIsLimitReached(false);
    } else {
      const count = parseInt(localStorage.getItem("guidify_daily_count") || "0");
      if (count >= 1) {
        setIsLimitReached(true);
      }
    }
  };

  const handleProcess = () => {
    if (!url) {
      alert("Please paste a valid TikTok link!");
      return;
    }

    if (isLimitReached) {
      // --- PERBAIKAN BAHASA (FULL INGGRIS) ---
      if (confirm("⚠️ Daily Quota Reached!\n\nYou have reached your daily free limit. Upgrade to Premium for unlimited access?")) {
          window.location.href = "/upgrade";
      }
      return; 
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      alert("✅ Video Found! Downloading...");
      
      localStorage.setItem("guidify_daily_count", "1");
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

          {/* --- PERBAIKAN SEO (YANG TADI HILANG) --- */}
          <div className="text-left border-t border-white/10 pt-16">
              <h2 className="text-2xl font-bold text-white mb-4 font-cinzel">Why use Guidify for TikTok?</h2>
              <div className="grid md:grid-cols-2 gap-8 text-gray-400 text-sm leading-relaxed">
                  <p>
                    Guidify offers the fastest way to save TikTok videos without the distracting watermark. Our premium servers ensure that you get the original quality file (HD/4K) directly to your device.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>No Watermark Guarantee</li>
                    <li>Fastest Download Speed</li>
                    <li>Secure & Anonymous</li>
                    <li>Compatible with iOS, Android & PC</li>
                  </ul>
              </div>
          </div>
          {/* ---------------------------------------- */}

        </div>
      </div>
      <Footer />
    </main>
  );
}