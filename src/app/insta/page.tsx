"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CheckCircle, Download, Camera, HelpCircle, Loader2, Lock, Instagram } from "lucide-react";

export default function InstagramPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mediaData, setMediaData] = useState<any>(null);
  
  // State Limit Global
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    checkGlobalLimit();
  }, []);

  // --- 1. CEK LIMIT (DOMPET GLOBAL) ---
  const checkGlobalLimit = () => {
    const isPremium = localStorage.getItem("guidify_premium_status") === "active";
    if (isPremium) return; 

    const today = new Date().toDateString();
    const lastDate = localStorage.getItem("guidify_last_date");
    
    if (lastDate !== today) {
      // Reset Hari Baru
      localStorage.setItem("guidify_last_date", today);
      localStorage.setItem("guidify_global_limit", "0");
      setIsLimitReached(false);
    } else {
      // Cek apakah kuota sudah dipakai di App lain (TikTok/YouTube)
      const count = parseInt(localStorage.getItem("guidify_global_limit") || "0");
      if (count >= 1) {
        setIsLimitReached(true);
      }
    }
  };

  // --- 2. PROSES FETCH KE BACKEND ---
  const handleProcess = async () => {
    // A. Cek Limit Dulu
    if (isLimitReached) {
      if (confirm("⚠️ Daily Quota Reached!\n\nUpgrade to Premium for unlimited access?")) {
          window.location.href = "/upgrade";
      }
      return;
    }

    // B. Validasi Input
    if (!url.includes("instagram.com")) {
      setError("Please paste a valid Instagram link.");
      return;
    }

    setIsLoading(true);
    setError("");
    setMediaData(null);

    try {
      const response = await fetch('/api/instagram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: url })
      });

      const result = await response.json();

      if (!response.ok) {
          throw new Error(result.message || "Failed to fetch content.");
      }

      setMediaData(result.data);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed. Account might be Private.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. DOWNLOAD & POTONG KUOTA ---
  const handleDownloadFile = (downloadUrl: string) => {
    if (isLimitReached) {
        window.location.href = "/upgrade";
        return;
    }

    // Buka Link
    window.open(downloadUrl, '_blank');
    
    // Potong Kuota Global
    localStorage.setItem("guidify_global_limit", "1");
    localStorage.setItem("guidify_last_date", new Date().toDateString());
    setIsLimitReached(true);
  };

  return (
    <main className="min-h-screen bg-black font-outfit text-white flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-20 relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-black to-black"></div>

        {/* STATUS LIMIT BAR */}
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

        <div className="text-center max-w-3xl z-10 w-full">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500">
            Guidify<span className="text-white">.Insta</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-12 font-light tracking-wide">
            Premium Downloader for Reels, Stories & Photos.
          </p>

          {/* INPUT BOX (SINGLE & CLEAN) */}
          <div className="w-full bg-[#111] border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl relative group mb-10 shadow-pink-900/10">
            <input 
              type="text" 
              placeholder="Paste Instagram link here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="relative flex-1 bg-transparent border-none outline-none text-white px-6 py-4 placeholder:text-gray-500 text-lg"
            />
            
            <button 
              onClick={handleProcess}
              disabled={isLoading}
              className={`relative px-8 py-3 rounded-xl font-bold transition-all text-white flex items-center justify-center gap-2 text-base ${
                isLimitReached 
                ? "bg-red-600 hover:bg-red-500" 
                : "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500" 
              }`}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : isLimitReached ? <><Lock className="w-4 h-4"/> Unlock</> : "Process"}
            </button>
          </div>

          {error && (
             <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl mb-8 text-base">
                ⚠️ {error}
             </div>
          )}

          {/* RESULT CARD */}
          {mediaData && !isLimitReached && (
            <div className="w-full max-w-2xl mx-auto bg-[#1a1a1a] border border-pink-500/30 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 mb-20">
                <div className="flex flex-col md:flex-row">
                    {/* Thumbnail */}
                    <div className="md:w-1/3 h-64 md:h-auto relative bg-black flex items-center justify-center overflow-hidden">
                        <img src={mediaData.thumbnail} alt="Thumbnail" className="w-full h-full object-cover opacity-80" />
                        {mediaData.type === 'Video' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Instagram className="w-12 h-12 text-white fill-white opacity-80" />
                            </div>
                        )}
                    </div>

                    {/* Info & Download Button */}
                    <div className="p-8 md:w-2/3 flex flex-col justify-center text-left">
                        <span className="text-xs font-bold text-pink-500 tracking-widest uppercase mb-2">
                            {mediaData.type} FOUND
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                            {mediaData.author}
                        </h3>
                        <p className="text-gray-400 text-sm mb-8 line-clamp-1">{mediaData.title}</p>

                        <button 
                            onClick={() => handleDownloadFile(mediaData.downloadUrl)}
                            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 text-lg shadow-lg"
                        >
                            <Download className="w-6 h-6" /> Download {mediaData.type}
                        </button>
                    </div>
                </div>
            </div>
          )}

          {/* SEO SECTION (Standard Luxury) */}
          <div className="text-left border-t border-white/10 pt-20 mt-10 w-full max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-10 font-cinzel text-center">
                The Ultimate Instagram Saver
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-pink-500/30 transition-colors">
                      <h3 className="text-2xl font-bold text-pink-500 mb-6">Premium Features</h3>
                      <ul className="space-y-4 text-base text-gray-300">
                        <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0"/> Save Reels, Stories & Photos</li>
                        <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0"/> Full HD Original Quality</li>
                        <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0"/> 100% Anonymous & Secure</li>
                      </ul>
                  </div>
                  
                  <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-white mb-6 pl-2">FAQ</h3>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                          <h4 className="font-bold text-pink-500 text-lg mb-2 flex items-center gap-3">
                            <HelpCircle className="w-5 h-5"/> Login Required?
                          </h4>
                          <p className="text-gray-300 text-base font-light">
                            No. Just paste the link. We respect your privacy.
                          </p>
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                          <h4 className="font-bold text-pink-500 text-lg mb-2 flex items-center gap-3">
                            <HelpCircle className="w-5 h-5"/> Private Accounts?
                          </h4>
                          <p className="text-gray-300 text-base font-light">
                            Currently we only support downloading from Public accounts for privacy reasons.
                          </p>
                      </div>
                  </div>
              </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}