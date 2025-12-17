"use client";

import { useState } from "react";
import { Zap, Download, Search } from "lucide-react";
// PERBAIKAN DI BAWAH INI: Menggunakan "../" bukan "@/"
import PricingModal from "../components/PricingModal"; 

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const [inputUrl, setInputUrl] = useState("");

  const handleDownloadAction = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputUrl) return alert("Please paste a URL first!");

    if (downloadCount >= 1) {
      setIsModalOpen(true);
      return;
    }

    alert("Analysing video... Your download will start shortly!");
    
    setDownloadCount(prev => prev + 1);
    setInputUrl("");
  };

  return (
    <div className="min-h-screen bg-black text-white font-outfit">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-12 flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold mb-6 tracking-widest uppercase">
          <Zap className="w-3 h-3 fill-current" />
          Premium Suite
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 font-cinzel bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Guidify Suite
        </h1>
        <p className="text-gray-400 text-center text-lg max-w-xl mb-12">
          Download high-quality videos from TikTok, Instagram, and YouTube without watermarks.
        </p>

        <form 
          onSubmit={handleDownloadAction}
          className="w-full max-w-2xl bg-[#111] border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl"
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
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            <Download className="w-5 h-5" />
            Download
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Free Daily Limit: <span className={downloadCount >= 1 ? "text-red-500 font-bold" : "text-amber-500"}>
            {downloadCount}/1
          </span>
        </p>

      </main>

      <PricingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}