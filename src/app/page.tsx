"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link"; 
import { CheckCircle, Shield, Zap, Globe, Lock } from "lucide-react"; 

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    setIsClient(true);
    checkGlobalLimit();
  }, []);

  const checkGlobalLimit = () => {
    // 1. Cek VIP
    const isPremium = localStorage.getItem("guidify_premium_status") === "active";
    if (isPremium) return;

    // 2. Cek Limit Global
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem("guidify_last_date");

    if (lastDate !== today) {
      setIsLimitReached(false);
    } else {
      const globalCount = parseInt(localStorage.getItem("guidify_global_limit") || "0");
      if (globalCount >= 1) {
        setIsLimitReached(true);
      }
    }
  };

  const handleDownloadClick = (url: string) => {
    if (!isClient) return;
    // Set limit jadi habis
    localStorage.setItem("guidify_global_limit", "1");
    localStorage.setItem("guidify_last_date", new Date().toDateString());
    setIsLimitReached(true);
    window.open(url, '_blank');
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black font-outfit text-white selection:bg-amber-500 selection:text-black flex flex-col">
        
        {/* BACKGROUND EFFECT MEWAH */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center pt-32 pb-10">
          
          <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
             <span className="py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-[0.3em] uppercase text-amber-500 font-bold">
                Premium Media Tools
             </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold mb-6 font-cinzel tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Guidify<span className="text-amber-500">.</span>
          </h1>

          <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            The Ultimate All-in-One Social Media Downloader. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 font-bold">Fast. Secure. Unlimited.</span>
          </p>
          
          {/* STATUS LIMIT BAR */}
          <div className="mb-12 animate-in fade-in zoom-in duration-1000 delay-300">
             {isLimitReached ? (
                <div className="inline-flex items-center gap-3 bg-red-950/40 border border-red-500/30 px-6 py-3 rounded-2xl backdrop-blur-md">
                   <Lock className="w-4 h-4 text-red-500" />
                   <span className="text-red-400 text-xs font-bold tracking-widest uppercase">Daily Limit Reached (0/1)</span>
                </div>
             ) : (
                <div className="inline-flex items-center gap-3 bg-green-950/40 border border-green-500/30 px-6 py-3 rounded-2xl backdrop-blur-md">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-green-400 text-xs font-bold tracking-widest uppercase">Free Access Available (1/1)</span>
                </div>
             )}
          </div>

          {/* MENU KARTU (DIV BUTTON) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10 mb-20 animate-in fade-in zoom-in duration-1000 delay-300">
              
              {/* TIKTOK */}
              <div className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] flex flex-col">
                  <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform shadow-lg">🎵</div>
                  <h3 className="text-2xl font-bold mb-2 text-white font-cinzel">TikTok Downloader</h3>
                  <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed">Download video tanpa watermark dengan kualitas HD & 4K.</p>
                  
                  {isLimitReached ? (
                      <Link href="/upgrade" className="block w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all text-sm shadow-lg">
                         🔒 Upgrade to Unlock
                      </Link>
                  ) : (
                      <div onClick={() => handleDownloadClick("https://tiktok.guidify.app")} className="block w-full bg-white text-black hover:bg-amber-500 hover:text-white font-bold py-4 rounded-xl transition-all cursor-pointer text-sm shadow-lg">
                         Open Tool →
                      </div>
                  )}
              </div>

              {/* INSTAGRAM */}
              <div className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-pink-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)] flex flex-col">
                  <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform shadow-lg">📸</div>
                  <h3 className="text-2xl font-bold mb-2 text-white font-cinzel">Instagram Saver</h3>
                  <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed">Simpan Reels, Stories & Foto Profile dalam sekejap.</p>
                  
                  {isLimitReached ? (
                      <Link href="/upgrade" className="block w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all text-sm shadow-lg">
                         🔒 Upgrade to Unlock
                      </Link>
                  ) : (
                      <div onClick={() => handleDownloadClick("https://insta.guidify.app")} className="block w-full bg-white text-black hover:bg-pink-500 hover:text-white font-bold py-4 rounded-xl transition-all cursor-pointer text-sm shadow-lg">
                         Open Tool →
                      </div>
                  )}
              </div>

              {/* YOUTUBE */}
              <div className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-red-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] flex flex-col">
                  <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform shadow-lg">▶️</div>
                  <h3 className="text-2xl font-bold mb-2 text-white font-cinzel">YouTube Converter</h3>
                  <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed">Convert video ke format MP4 & MP3 dengan cepat.</p>
                  
                  {isLimitReached ? (
                      <Link href="/upgrade" className="block w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all text-sm shadow-lg">
                         🔒 Upgrade to Unlock
                      </Link>
                  ) : (
                      <div onClick={() => handleDownloadClick("https://youtube.guidify.app")} className="block w-full bg-white text-black hover:bg-red-500 hover:text-white font-bold py-4 rounded-xl transition-all cursor-pointer text-sm shadow-lg">
                         Open Tool →
                      </div>
                  )}
              </div>
          </div>

          {/* TEKS SEO MEWAH (High Content) */}
          <section className="w-full max-w-6xl text-left border-t border-white/10 pt-24 animate-in fade-in duration-1000 delay-500">
              <div className="flex flex-col md:flex-row gap-16">
                  
                  {/* Kolom Kiri: Judul & Intro */}
                  <div className="md:w-1/2">
                      <h2 className="text-4xl font-bold text-white mb-8 font-cinzel leading-tight">
                          The Premier <br/> <span className="text-amber-500">Universal Downloader</span>
                      </h2>
                      <p className="text-gray-400 mb-6 leading-relaxed text-base font-light">
                          Guidify is engineered to be your single, powerful destination for saving media content from the internet. In an era where content is fragmented across TikTok, Instagram, and YouTube, switching between multiple ad-heavy websites is frustrating. 
                      </p>
                      <p className="text-gray-400 leading-relaxed text-base font-light">
                          Guidify solves this with a unified, high-performance platform that prioritizes speed, quality, and user privacy above all else.
                      </p>
                  </div>

                  {/* Kolom Kanan: Features Grid */}
                  <div className="md:w-1/2 grid grid-cols-1 gap-6">
                      <div className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors group">
                          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                            <Zap className="w-5 h-5 text-amber-500" /> Lightning Fast Speed
                          </h3>
                          <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors">
                              Powered by premium cloud servers to ensure your downloads start instantly without queue times.
                          </p>
                      </div>

                      <div className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors group">
                           <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                             <Shield className="w-5 h-5 text-amber-500" /> Privacy First
                           </h3>
                          <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors">
                              No logs. No history. Files are processed in real-time and delivered directly to you.
                          </p>
                      </div>

                      <div className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors group">
                           <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                             <Globe className="w-5 h-5 text-amber-500" /> Universal Support
                           </h3>
                          <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors">
                              Works seamlessly on iPhone (iOS), Android, Windows, and MacOS via any modern browser.
                          </p>
                      </div>
                  </div>
              </div>
          </section>

        </div>
        <Footer />
      </main>
    </>
  );
}