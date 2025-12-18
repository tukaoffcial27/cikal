"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CheckCircle, Download, Play, HelpCircle, Loader2, Lock } from "lucide-react";

export default function TikTokPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoData, setVideoData] = useState<any>(null);
  
  // STATE LIMIT KHUSUS TIKTOK (INDEPENDEN)
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    checkTikTokLimit();
  }, []);

  // --- 1. CEK LIMIT KHUSUS TIKTOK ---
  const checkTikTokLimit = () => {
    // Cek status premium user
    const isPremium = localStorage.getItem("guidify_premium_status") === "active";
    if (isPremium) return; 

    const today = new Date().toDateString();
    // Gunakan Key Penyimpanan Khusus TikTok
    const lastDate = localStorage.getItem("guidify_tiktok_last_date");
    
    if (lastDate !== today) {
      // Reset Hari Baru khusus TikTok
      localStorage.setItem("guidify_tiktok_last_date", today);
      localStorage.setItem("guidify_tiktok_limit", "0");
      setIsLimitReached(false);
    } else {
      // Cek dompet khusus TikTok
      const count = parseInt(localStorage.getItem("guidify_tiktok_limit") || "0");
      if (count >= 1) {
        setIsLimitReached(true);
      }
    }
  };

  const handleProcess = async () => {
    // 1. Cek Limit TikTok
    if (isLimitReached) {
      if (confirm("⚠️ TikTok Daily Quota Reached!\n\nUpgrade to Premium for unlimited access?")) {
          window.location.href = "/upgrade";
      }
      return;
    }

    // 2. Validasi URL
    if (!url.includes("tiktok.com")) {
      setError("Please paste a valid TikTok link.");
      return;
    }

    setIsLoading(true);
    setError("");
    setVideoData(null);

    try {
      // Panggil Backend API TikTok
      const response = await fetch('/api/tiktok', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: url })
      });

      const result = await response.json();

      if (!response.ok) {
          throw new Error(result.error || "Failed to fetch data");
      }

      setVideoData({
          title: result.data.title || "TikTok Video No Watermark",
          cover: result.data.thumbnail || result.data.cover,
          author: result.data.author || "User",
          download_url: result.data.downloadUrl 
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch video. Please check the link.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadFile = (downloadUrl: string) => {
    if (isLimitReached) {
        window.location.href = "/upgrade";
        return;
    }
    window.open(downloadUrl, '_blank');
    
    // CATAT KUOTA KHUSUS TIKTOK
    localStorage.setItem("guidify_tiktok_limit", "1");
    localStorage.setItem("guidify_tiktok_last_date", new Date().toDateString());
    setIsLimitReached(true);
  };

  return (
    <main className="min-h-screen bg-black font-outfit text-white flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-20 relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>

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
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
            TikTok <span className="text-amber-500">Premium</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-12 font-light tracking-wide">
            Download videos without watermark in HD Quality.
          </p>

          {/* INPUT BOX */}
          <div className="w-full bg-[#111] border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl relative group mb-10">
            <input 
              type="text" 
              placeholder="Paste TikTok video link here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="relative flex-1 bg-transparent border-none outline-none text-white px-6 py-4 placeholder:text-gray-500 text-lg"
            />
            
            <button 
              onClick={handleProcess}
              disabled={isLoading}
              className={`relative px-8 py-3 rounded-xl font-bold transition-all text-black flex items-center justify-center gap-2 text-base ${
                isLimitReached 
                ? "bg-red-600 hover:bg-red-500 text-white" 
                : "bg-white hover:bg-gray-200" 
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
          {videoData && !isLimitReached && (
            <div className="w-full max-w-2xl mx-auto bg-[#1a1a1a] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 mb-20">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto relative bg-black">
                        <img src={videoData.cover} alt="Thumbnail" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="w-12 h-12 text-white fill-white opacity-80" />
                        </div>
                    </div>
                    <div className="p-8 md:w-2/3 flex flex-col justify-center text-left">
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{videoData.title}</h3>
                        <p className="text-gray-400 text-base mb-8">By: <span className="text-amber-500">{videoData.author}</span></p>

                        <button 
                            onClick={() => handleDownloadFile(videoData.download_url)}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 text-lg"
                        >
                            <Download className="w-6 h-6" /> Download No Watermark
                        </button>
                    </div>
                </div>
            </div>
          )}

          {/* SEO SECTION */}
          <div className="text-left border-t border-white/10 pt-20 mt-10 w-full max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-10 font-cinzel text-center">
                The Ultimate TikTok Downloader
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                  {/* KOLOM KIRI: FITUR */}
                  <div className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-amber-500/30 transition-colors">
                      <h3 className="text-2xl font-bold text-amber-500 mb-6">Why Guidify?</h3>
                      <p className="text-gray-300 text-base leading-relaxed mb-6 font-light">
                        Guidify TikTok removes the distracting watermark instantly, ensuring your video looks professional for reposting on Instagram Reels or YouTube Shorts.
                      </p>
                      <ul className="space-y-4 text-base text-gray-300">
                        <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0"/> No Watermark Guarantee</li>
                        <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0"/> Original Quality Preserved (HD)</li>
                        <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0"/> 100% Secure & Anonymous</li>
                      </ul>
                  </div>
                  
                  {/* KOLOM KANAN: FAQ */}
                  <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-white mb-6 pl-2">Frequently Asked Questions</h3>
                      
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                          <h4 className="font-bold text-amber-500 text-lg mb-2 flex items-center gap-3">
                            <HelpCircle className="w-5 h-5"/> Do I need an account?
                          </h4>
                          <p className="text-gray-300 text-base font-light">
                            No account required for free downloads. Premium users only need a <b>License Key</b> to activate features.
                          </p>
                      </div>
                      
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                          <h4 className="font-bold text-amber-500 text-lg mb-2 flex items-center gap-3">
                            <HelpCircle className="w-5 h-5"/> How to activate Premium?
                          </h4>
                          <p className="text-gray-300 text-base font-light">
                            Use the License Key sent to your email after purchase. Click "Activate License" in the menu.
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