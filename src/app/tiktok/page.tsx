"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PricingModal from "../../components/PricingModal";
import { useState, useEffect } from "react"; 

export default function TiktokPage() {
  // State Utama
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadingFile, setIsDownloadingFile] = useState(false); // State baru untuk proses save file
  const [error, setError] = useState("");
  const [downloadData, setDownloadData] = useState<{
    title: string;
    thumbnail: string;
    noWatermark: string;
    audio: string;
  } | null>(null); 

  // State Subscription (Kuota)
  const [showModal, setShowModal] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);

  // 1. CEK KUOTA SAAT HALAMAN DIBUKA
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

  // FUNGSI 1: MENGAMBIL DATA DARI API (Tanpa mengurangi kuota dulu)
  const handleFetchData = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    // Cek limit sebelum fetch
    if (dailyCount >= 1) {
        setShowModal(true); 
        return;
    }

    setError("");
    setDownloadData(null);
    
    if (!url || typeof url !== 'string' || !url.includes('tiktok.com')) {
        setError("Please enter a valid TikTok video link.");
        return;
    }
    
    setIsLoading(true);

    try {
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });

        const result = await response.json();

        if (response.ok) {
            setDownloadData(result.data);
            // Kita BELUM menambah counter di sini, counter ditambah saat user klik tombol hijau (Final Download)
        } else {
            setError(result.message || 'Failed to fetch video data.');
        }

    } catch (err) {
        console.error("Fetch Error:", err);
        setError("Network error. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  // FUNGSI 2: PAKSA DOWNLOAD FILE (Counter bertambah di sini)
  const forceDownload = async (fileUrl: string, fileName: string, fileType: 'video' | 'audio') => {
    
    // Cek limit lagi untuk keamanan ganda
    if (dailyCount >= 1) {
        setShowModal(true);
        return;
    }

    setIsDownloadingFile(true);

    try {
        // Teknik Blob: Mengambil file sebagai data biner agar tidak diputar browser
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        // Membuat link palsu dan mengkliknya otomatis
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName; // Nama file hasil download
        document.body.appendChild(a);
        a.click();
        
        // Bersihkan memori
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);

        // --- UPDATE KUOTA (Hanya bertambah jika sukses download) ---
        const newCount = dailyCount + 1;
        setDailyCount(newCount);
        localStorage.setItem("guidify_count", newCount.toString());
        // ----------------------------------------------------------

        console.log(`Download ${fileType} Success. Usage today:`, newCount);

    } catch (err) {
        console.error("Auto-download failed, falling back to new tab", err);
        // Jika cara otomatis gagal (karena isu keamanan browser), buka di tab baru sebagai cadangan
        window.open(fileUrl, '_blank');
        
        // Tetap hitung kuota karena user mendapatkan videonya
        const newCount = dailyCount + 1;
        setDailyCount(newCount);
        localStorage.setItem("guidify_count", newCount.toString());
    } finally {
        setIsDownloadingFile(false);
    }
  };

  return (
    <main className="min-h-screen bg-black font-outfit text-white selection:bg-amber-500 selection:text-black flex flex-col">
      <Navbar />
      
      {showModal && <PricingModal onClose={() => setShowModal(false)} />}

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center pt-32 pb-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
            <span className={`w-2 h-2 rounded-full ${dailyCount >= 1 ? 'bg-red-500' : 'bg-green-500'}`}></span>
            <span className="text-xs tracking-[0.2em] font-bold text-gray-300 uppercase">
                Daily Quota: {1 - dailyCount} Left
            </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-cinzel text-white leading-tight">
          TikTok <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">Premium</span> <br/>
          Downloader
        </h1>

        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
          Download videos without watermark at lightning speed. <br/>
          Preserve original HD quality for your professional content creation.
        </p>

        {/* FORM INPUT */}
        <form onSubmit={handleFetchData} className="w-full max-w-2xl p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl flex flex-col md:flex-row gap-2 shadow-2xl shadow-black/50 hover:border-amber-500/30 transition-all duration-500">
            <input 
                type="text" 
                placeholder="Paste TikTok video link here..." 
                className="flex-1 bg-transparent border-none text-white px-6 py-4 focus:ring-0 focus:outline-none placeholder:text-gray-600 text-lg font-outfit"
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                disabled={isLoading}
            />
            <button 
                type="submit"
                className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                disabled={isLoading}
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    "Process"
                )}
            </button>
        </form>

        {error && (
            <div className="mt-6 text-red-500 bg-red-900/20 px-4 py-2 rounded-lg max-w-2xl w-full border border-red-500">
                {error}
            </div>
        )}
        
        {/* HASIL DATA & TOMBOL DOWNLOAD */}
        {downloadData && (
            <div className="mt-10 w-full max-w-2xl p-6 bg-white/5 border border-amber-500/50 rounded-2xl backdrop-blur-xl shadow-2xl shadow-amber-500/10 text-left transition-all duration-500 animate-fade-in-up">
                <h3 className="text-xl font-cinzel text-amber-500 mb-4">Ready to Download</h3>
                
                <div className="flex gap-4 mb-6 items-center">
                    {downloadData.thumbnail && (
                         <img src={downloadData.thumbnail} alt="Cover" className="w-16 h-16 rounded-lg object-cover border border-white/10" />
                    )}
                    <p className="text-gray-300 text-sm truncate flex-1">{downloadData.title || "Untitled Video"}</p>
                </div>
                
                <div className="flex flex-col gap-4">
                    {/* TOMBOL VIDEO - Menggunakan forceDownload */}
                    <button 
                        onClick={() => forceDownload(downloadData.noWatermark, `Guidify-TikTok-${Date.now()}.mp4`, 'video')}
                        disabled={isDownloadingFile}
                        className="flex justify-between items-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
                    >
                        <span>
                            {isDownloadingFile ? "Saving to Device..." : "Download Video (No Watermark)"}
                        </span>
                        {!isDownloadingFile && (
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        )}
                    </button>
                    
                    {/* TOMBOL AUDIO - Menggunakan forceDownload */}
                    <button 
                       onClick={() => forceDownload(downloadData.audio, `Guidify-Audio-${Date.now()}.mp3`, 'audio')}
                       className="flex justify-between items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300"
                    >
                        <span>Download Audio Only (.MP3)</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v14M9 19C7.234 19 6 17.5 6 15S7.234 11 9 11s3 1.5 3 3-1.234 3-3 3zM21 17c-1.766 0-3-1.5-3-3s1.234-3 3-3 3 1.5 3 3-1.234 3-3 3z"></path></svg>
                    </button>
                </div>
            </div>
        )}

      </div>
     {/* --- SEO CONTENT SECTION (WAJIB UNTUK ADSENSE) --- */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-left text-gray-300">
        <article className="prose prose-invert lg:prose-xl mx-auto">
            <h2 className="text-3xl font-bold text-amber-500 mb-6 font-cinzel">The Ultimate TikTok Downloader Without Watermark</h2>
            <p className="mb-6 leading-relaxed">
                Guidify TikTok is the premier solution for content creators, marketers, and social media enthusiasts looking to save TikTok videos in pristine quality. Unlike other tools, our advanced algorithm strips away the distracting TikTok watermark/logo, leaving you with a clean, high-definition MP4 file ready for reposting or editing.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">Why Choose Guidify for TikTok?</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-400">
                <li><strong>No Watermark Technology:</strong> We detect and remove the floating TikTok ID, ensuring your video looks professional.</li>
                <li><strong>Original Quality Preservation:</strong> Whether the video is 720p, 1080p, or 4K, we save it exactly as uploaded.</li>
                <li><strong>Fastest Server Speeds:</strong> Our optimized cloud infrastructure ensures downloads start in milliseconds.</li>
                <li><strong>Multi-Device Support:</strong> Works seamlessly on iPhone (iOS), Android, Windows, and macOS directly from your browser.</li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">How to Download TikTok Videos?</h3>
            <ol className="list-decimal pl-6 mb-8 space-y-2 text-gray-400">
                <li>Open the TikTok app and find the video you want to save.</li>
                <li>Tap the "Share" button and select "Copy Link".</li>
                <li>Paste the link into the Guidify search box above.</li>
                <li>Click "Process" and choose "Download Video (No Watermark)".</li>
            </ol>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-8">
                <h4 className="text-xl font-bold text-amber-500 mb-2">Is it legal to download TikTok videos?</h4>
                <p className="text-sm">Yes, downloading videos for personal use (offline viewing) is legal. However, if you plan to repost the content, you must credit the original creator or obtain permission, respecting copyright laws.</p>
            </div>
        </article>
      </section>
      <Footer />
    </main>
  );
}