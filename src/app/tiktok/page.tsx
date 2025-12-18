"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CheckCircle, Download, Play, HelpCircle, Loader2 } from "lucide-react";

export default function TikTokPage() {
  // State Input
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // State Data Video (Hasil Fetch)
  const [videoData, setVideoData] = useState<any>(null);

  // State Limit
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    checkGlobalLimit();
  }, []);

  // --- 1. CEK LIMIT (SINKRON DENGAN HOME) ---
  const checkGlobalLimit = () => {
    const isPremium = localStorage.getItem("guidify_premium_status") === "active";
    if (isPremium) return; 

    const today = new Date().toDateString();
    const lastDate = localStorage.getItem("guidify_last_date");
    
    if (lastDate !== today) {
      // Reset jika hari baru
      localStorage.setItem("guidify_last_date", today);
      localStorage.setItem("guidify_global_limit", "0");
      setIsLimitReached(false);
    } else {
      // Cek limit
      const count = parseInt(localStorage.getItem("guidify_global_limit") || "0");
      if (count >= 1) {
        setIsLimitReached(true);
      }
    }
  };

  // --- 2. FUNGSI FETCH VIDEO (PROCESS) ---
  const handleProcess = async () => {
    // A. Cek Limit Dulu
    if (isLimitReached) {
      if (confirm("⚠️ Daily Quota Reached!\n\nUpgrade to Premium for unlimited access?")) {
          window.location.href = "/upgrade";
      }
      return;
    }

    // B. Validasi URL
    if (!url.includes("tiktok.com")) {
      setError("Please paste a valid TikTok link.");
      return;
    }

    setIsLoading(true);
    setError("");
    setVideoData(null);

    try {
      // ============================================================
      // ⚠️ AREA KODE API SNAPTIK / RAPIDAPI ANDA
      // ============================================================
      
      // Karena saya tidak punya API Key Anda, ini adalah SIMULASI SUKSES.
      // Nanti Anda ganti bagian ini dengan `fetch('/api/tiktok', ...)`
      
      // Simulasi delay jaringan
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulasi Data Video Ditemukan (GANTI INI DENGAN RESPONSE API ASLI)
      const mockData = {
        title: "TikTok Video Viral No Watermark",
        cover: "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/7e97b396996944eeb9c61453d5a4a584~tplv-tiktok-play.jpeg", // Contoh Thumbnail
        author: "Tiktok User",
        // GANTI URL INI DENGAN URL DOWNLOAD ASLI DARI API ANDA
        download_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" 
      };

      setVideoData(mockData);
      // ============================================================

    } catch (err) {
      setError("Failed to fetch video. Please check the link.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. FUNGSI DOWNLOAD FINAL (KURANGI KUOTA) ---
  const handleDownloadFile = (downloadUrl: string) => {
    // Cek limit terakhir kali sebelum download
    if (isLimitReached) {
        window.location.href = "/upgrade";
        return;
    }

    // 1. Buka Link Download
    window.open(downloadUrl, '_blank');

    // 2. Catat Kuota Terpakai (Disinilah kuota berkurang!)
    localStorage.setItem("guidify_global_limit", "1");
    localStorage.setItem("guidify_last_date", new Date().toDateString());
    
    // 3. Update Tampilan jadi Merah
    setIsLimitReached(true);
  };

  return (
    <main className="min-h-screen bg-black font-outfit text-white flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>

        {/* STATUS BAR KUOTA */}
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
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
            TikTok <span className="text-amber-500">Premium</span>
          </h1>
          <p className="text-gray-400 text-lg mb-12">
            Download videos without watermark in HD.
          </p>

          {/* AREA INPUT */}
          <div className="w-full bg-[#111] border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl relative group mb-10">
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
              className={`relative px-8 py-3 rounded-xl font-bold transition-all text-black flex items-center justify-center gap-2 ${
                isLimitReached 
                ? "bg-red-600 hover:bg-red-500 text-white" 
                : "bg-white hover:bg-gray-200" 
              }`}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : isLimitReached ? "🔒 Unlock" : "Process"}
            </button>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
             <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-8">
                ⚠️ {error}
             </div>
          )}

          {/* --- RESULT CARD (MIRIP YOUTUBE) --- */}
          {/* Ini hanya muncul jika videoData sudah ada */}
          {videoData && !isLimitReached && (
            <div className="w-full max-w-2xl mx-auto bg-[#1a1a1a] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8">
                <div className="flex flex-col md:flex-row">
                    {/* Thumbnail */}
                    <div className="md:w-1/3 h-48 md:h-auto relative bg-black">
                        <img src={videoData.cover} alt="Thumbnail" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="w-12 h-12 text-white fill-white opacity-80" />
                        </div>
                    </div>

                    {/* Info & Tombol */}
                    <div className="p-6 md:w-2/3 flex flex-col justify-center text-left">
                        <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{videoData.title}</h3>
                        <p className="text-gray-400 text-sm mb-6">By: {videoData.author}</p>

                        <button 
                            onClick={() => handleDownloadFile(videoData.download_url)}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
                        >
                            <Download className="w-5 h-5" /> Download No Watermark
                        </button>
                        <p className="text-[10px] text-gray-500 mt-2 text-center">
                           *Clicking download will use your daily quota.
                        </p>
                    </div>
                </div>
            </div>
          )}

          {/* SEO SECTION */}
          <div className="text-left border-t border-white/10 pt-16 mt-20 w-full">
              <h2 className="text-3xl font-bold text-white mb-8 font-cinzel text-center">
                The Ultimate TikTok Downloader
              </h2>
              
              <div className="grid md:grid-cols-2 gap-10 mb-12">
                  <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                      <h3 className="text-xl font-bold text-amber-500 mb-4">Why Guidify?</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        Guidify TikTok removes the distracting watermark instantly, ensuring your video looks professional for reposting on Instagram Reels or YouTube Shorts.
                      </p>
                      <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500"/> No Watermark Guarantee</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500"/> Original Quality Preserved</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500"/> 100% Secure & Anonymous</li>
                      </ul>
                  </div>
                  
                  <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                          <h4 className="font-bold text-amber-500 text-sm mb-1 flex items-center gap-2"><HelpCircle className="w-4 h-4"/> Do I need to login?</h4>
                          <p className="text-gray-400 text-xs">No. Just paste the link. We never ask for your password.</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                          <h4 className="font-bold text-amber-500 text-sm mb-1 flex items-center gap-2"><HelpCircle className="w-4 h-4"/> Is it free?</h4>
                          <p className="text-gray-400 text-xs">Yes, you have a daily free quota. For unlimited access, upgrade to Premium.</p>
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