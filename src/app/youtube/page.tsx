"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PricingModal from "../../components/PricingModal"; // Import Modal
import { useState, useEffect } from "react";

export default function YoutubePage() {
  // State Utama
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadingFile, setIsDownloadingFile] = useState(false); // State download
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);

  // State Subscription
  const [showModal, setShowModal] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);

  // 1. CEK KUOTA (Menggunakan "dompet" yang sama: guidify_count)
  useEffect(() => {
    const storedDate = localStorage.getItem("guidify_date");
    const storedCount = localStorage.getItem("guidify_count");
    const today = new Date().toDateString();

    if (storedDate !== today) {
        localStorage.setItem("guidify_date", today);
        localStorage.setItem("guidify_count", "0");
        setDailyCount(0);
    } else {
        setDailyCount(Number(storedCount) || 0);
    }
  }, []);

  // FUNGSI 1: FETCH DATA (Cek Limit Awal)
  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // CEK LIMIT SEBELUM REQUEST API
    if (dailyCount >= 1) {
        setShowModal(true);
        return;
    }

    setError("");
    setResult(null);

    if (!url.includes("youtu")) {
        setError("Please enter a valid YouTube link.");
        return;
    }

    setIsLoading(true);

    try {
        const response = await fetch('/api/youtube', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (response.ok) {
            setResult(data.data);
            setUrl(""); 
            // Kita BELUM kurangi kuota di sini, tunggu user klik tombol download file
        } else {
            setError(data.message || 'Failed to download.');
        }
    } catch (err) {
        setError("Network Error. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  // FUNGSI 2: FORCE DOWNLOAD & KURANGI KUOTA
  const forceDownload = async (fileUrl: string, fileName: string, fileType: 'video' | 'audio') => {
    
    // Cek limit lagi (Double Protection)
    if (dailyCount >= 1) {
        setShowModal(true);
        return;
    }

    setIsDownloadingFile(true);

    try {
        // Teknik Blob agar browser tidak memutar video
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);

        // --- UPDATE KUOTA DI SINI ---
        const newCount = dailyCount + 1;
        setDailyCount(newCount);
        localStorage.setItem("guidify_count", newCount.toString());
        // ----------------------------

        console.log(`Download ${fileType} Success. Usage:`, newCount);

    } catch (err) {
        console.error("Auto-download failed, fallback to new tab", err);
        window.open(fileUrl, '_blank');
        
        // Tetap hitung kuota karena user dapat videonya
        const newCount = dailyCount + 1;
        setDailyCount(newCount);
        localStorage.setItem("guidify_count", newCount.toString());
    } finally {
        setIsDownloadingFile(false);
    }
  };

  return (
    <main className="min-h-screen bg-black font-outfit text-white flex flex-col overflow-x-hidden selection:bg-red-500 selection:text-white">
      <Navbar />

      {/* Tampilkan Modal Paywall */}
      {showModal && <PricingModal onClose={() => setShowModal(false)} />}

      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-red-900/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-red-800/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center pt-32 pb-20">
        
        {/* Indikator Kuota */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
            <span className={`w-2 h-2 rounded-full ${dailyCount >= 1 ? 'bg-red-500' : 'bg-green-500'}`}></span>
            <span className="text-xs tracking-[0.2em] font-bold text-gray-300 uppercase">
                Daily Quota: {1 - dailyCount} Left
            </span>
        </div>

        <div className="mb-10 animate-fade-in-down">
            <h1 className="text-5xl md:text-7xl font-bold font-cinzel mb-4">
                Guidify<span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">.Tube</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Convert YouTube videos to MP4 & MP3 instantly. <br/>
                Experience the fastest cinematic downloader.
            </p>
        </div>

        <div className="w-full max-w-2xl bg-[#0a0a0a] border border-red-900/30 rounded-3xl p-2 shadow-2xl shadow-red-900/10">
            <form onSubmit={handleDownload} className="flex flex-col md:flex-row gap-2">
                <input 
                    type="text" 
                    placeholder="Paste YouTube Link here..." 
                    className="flex-1 bg-white/5 border border-transparent rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-600 focus:bg-black transition-all"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isLoading}
                />
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
                >
                    {isLoading ? "..." : "Convert"}
                </button>
            </form>
        </div>

        {error && (
            <div className="mt-6 px-6 py-3 bg-red-950/50 border border-red-600/50 text-red-200 rounded-xl">
                ⚠️ {error}
            </div>
        )}

        {result && (
            <div className="mt-12 w-full max-w-2xl animate-fade-in-up">
                <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="relative h-64 md:h-80 w-full">
                        <img src={result.thumbnail} alt="Thumbnail" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2 leading-tight mb-2 text-left">
                                {result.title}
                            </h3>
                            <div className="flex gap-2">
                                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">HD</span>
                                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded font-bold">Video</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 grid gap-4">
                        {/* TOMBOL VIDEO (Force Download + Hitung Kuota) */}
                        {result.videoUrl && (
                            <button 
                                onClick={() => forceDownload(result.videoUrl, `Guidify-YouTube-${Date.now()}.mp4`, 'video')}
                                disabled={isDownloadingFile}
                                className="flex items-center justify-between w-full bg-white text-black hover:bg-gray-200 py-4 px-6 rounded-xl font-bold transition-all group disabled:opacity-50"
                            >
                                <span>{isDownloadingFile ? "Saving..." : "Download Video (MP4)"}</span>
                                {!isDownloadingFile && <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>}
                            </button>
                        )}
                        
                        {/* TOMBOL AUDIO (Force Download + Hitung Kuota) */}
                        {result.audioUrl && (
                            <button 
                                onClick={() => forceDownload(result.audioUrl, `Guidify-Audio-${Date.now()}.mp3`, 'audio')}
                                disabled={isDownloadingFile}
                                className="flex items-center justify-between w-full bg-[#222] text-white hover:bg-[#333] py-4 px-6 rounded-xl font-semibold transition-all group border border-white/10"
                            >
                                <span>{isDownloadingFile ? "Saving..." : "Download Audio (MP3)"}</span>
                                {!isDownloadingFile && <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v14M9 19C7.234 19 6 17.5 6 15S7.234 11 9 11s3 1.5 3 3-1.234 3-3 3zM21 17c-1.766 0-3-1.5-3-3s1.234-3 3-3 3 1.5 3 3-1.234 3-3 3z"></path></svg>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )}

      </div>
     {/* --- SEO CONTENT SECTION (WAJIB UNTUK ADSENSE) --- */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-left text-gray-300">
        <article className="prose prose-invert lg:prose-xl mx-auto">
            <h2 className="text-3xl font-bold text-red-600 mb-6 font-cinzel">
                Fastest YouTube to MP4 & MP3 Converter
            </h2>
            <p className="mb-6 leading-relaxed">
                Guidify.Tube is the ultimate tool for converting YouTube videos into offline files. Whether you need a video tutorial saved as an MP4 for a presentation, or a music video converted to MP3 for your playlist, our cinematic engine processes it in seconds. Experience buffer-free offline viewing today.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">Supported Formats & Quality</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#111] p-4 rounded-lg border border-red-900/30">
                    <h4 className="font-bold text-red-500">Video (MP4)</h4>
                    <p className="text-sm text-gray-500">Supports 360p, 720p (HD), 1080p (Full HD), and even 4K when available.</p>
                </div>
                <div className="bg-[#111] p-4 rounded-lg border border-red-900/30">
                    <h4 className="font-bold text-red-500">Audio (MP3)</h4>
                    <p className="text-sm text-gray-500">Extracts crystal clear audio at 128kbps, 192kbps, and 320kbps bitrates.</p>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">How to Save YouTube Videos?</h3>
            <ol className="list-decimal pl-6 mb-8 space-y-2 text-gray-400">
                <li>Copy the URL of the YouTube video from your browser or app.</li>
                <li>Paste the link into Guidify's red search bar.</li>
                <li>Click "Convert" and wait for our servers to analyze the media.</li>
                <li>Select your preferred format (Video or Audio) and click Download.</li>
            </ol>
            
            <p className="text-xs text-gray-600 mt-8 italic">
                Disclaimer: Guidify.Tube is not affiliated with Google or YouTube. This tool is intended for personal use only. Please respect the copyright of content creators.
            </p>
        </article>
      </section>
      <Footer />
    </main>
  );
}