"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PricingModal from "../../components/PricingModal"; // Import Modal
import { useState, useEffect } from "react";

export default function InstagramPage() {
  const [activeTab, setActiveTab] = useState<'downloader' | 'profile'>('downloader');
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);

  // State Subscription
  const [showModal, setShowModal] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);

  // Cek Kuota (Menggunakan "dompet" yang sama dengan TikTok)
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

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // CEK LIMIT
    if (dailyCount >= 1) {
        setShowModal(true);
        return;
    }

    setError("");
    setResult(null);

    if (!inputValue) {
        setError("Please enter a link or username.");
        return;
    }

    let targetUrl = inputValue;
    if (activeTab === 'profile') {
        const username = inputValue.replace('@', '').trim();
        targetUrl = `https://www.instagram.com/${username}/`;
    }

    setIsLoading(true);

    try {
        const response = await fetch('/api/instagram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: targetUrl }),
        });

        const data = await response.json();

        if (response.ok) {
            setResult(data.data);
            setInputValue(""); 
            
            // UPDATE KUOTA (Instagram juga mengurangi jatah harian)
            const newCount = dailyCount + 1;
            setDailyCount(newCount);
            localStorage.setItem("guidify_count", newCount.toString());

        } else {
            setError(data.message || 'Failed to download.');
        }
    } catch (err) {
        setError("Network Error. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black font-outfit text-white flex flex-col overflow-x-hidden">
      <Navbar />
      
      {/* Tampilkan Modal jika limit habis */}
      {showModal && <PricingModal onClose={() => setShowModal(false)} />}

      <div className="fixed top-[-10%] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/20 via-red-500/20 to-pink-500/20 rounded-full blur-[120px] z-0 pointer-events-none"></div>

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center pt-32 pb-20">
        
        {/* Indikator Kuota */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
            <span className={`w-2 h-2 rounded-full ${dailyCount >= 1 ? 'bg-red-500' : 'bg-green-500'}`}></span>
            <span className="text-xs tracking-[0.2em] font-bold text-gray-300 uppercase">
                Daily Quota: {1 - dailyCount} Left
            </span>
        </div>

        <div className="mb-8 animate-fade-in-down">
            <h1 className="text-5xl md:text-7xl font-bold font-cinzel mb-2">
                Guidify<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-red-500 to-pink-500">.Insta</span>
            </h1>
            <p className="text-gray-400 text-lg">Premium Instagram Saver for Reels, Stories & Photos</p>
        </div>

        <div className="w-full max-w-xl bg-[#121212] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl shadow-pink-900/10">
            <div className="flex bg-white/5 p-1 rounded-xl mb-8">
                <button 
                    onClick={() => { setActiveTab('downloader'); setError(""); setResult(null); }}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'downloader' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    Downloader
                </button>
                <button 
                    onClick={() => { setActiveTab('profile'); setError(""); setResult(null); }}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'profile' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    Profile HD
                </button>
            </div>

            <form onSubmit={handleDownload} className="flex flex-col gap-4">
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {activeTab === 'downloader' ? '🔗' : '@'}
                    </div>
                    <input 
                        type="text" 
                        placeholder={activeTab === 'downloader' ? "Paste Instagram Link..." : "Enter Username..."}
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-gray-600"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-amber-500 via-red-500 to-pink-500 hover:opacity-90 transition-all shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? "Processing..." : (activeTab === 'downloader' ? "DOWNLOAD NOW" : "GET PROFILE HD")}
                </button>
            </form>

            {error && (
                <div className="mt-6 p-3 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {result && (
                <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl animate-fade-in-up text-left">
                    <div className="flex gap-4 items-center mb-4">
                        <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 to-pink-600">
                            <img src={result.thumbnail} alt="Thumb" className="w-full h-full rounded-full object-cover border-2 border-black" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">{result.username || 'Instagram User'}</h3>
                            <span className="text-xs text-pink-400 bg-pink-900/30 px-2 py-1 rounded-full border border-pink-500/30">
                                {result.type} Found
                            </span>
                        </div>
                    </div>

                    <a 
                        href={result.downloadUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Download HD Image/Video
                    </a>
                </div>
            )}
        </div>
      </div>
      {/* --- SEO CONTENT SECTION (WAJIB UNTUK ADSENSE) --- */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-left text-gray-300">
        <article className="prose prose-invert lg:prose-xl mx-auto">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-red-500 to-pink-500 mb-6 font-cinzel">
                Download Instagram Reels, Stories & Photos Anonymously
            </h2>
            <p className="mb-6 leading-relaxed">
                Instagram does not allow users to download content directly within the app. Guidify.Insta bridges this gap by providing a secure, anonymous, and high-quality downloader for all Instagram media types. Save your favorite Reels, IGTV, Carousel posts, and even Profile Pictures in full HD resolution.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">All-in-One Instagram Tool Features</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-400">
                <li><strong>Reels Downloader:</strong> Save entertaining short videos with audio intact.</li>
                <li><strong>Story Saver:</strong> Download stories from public accounts before they disappear in 24 hours.</li>
                <li><strong>Profile Picture Zoom (DP):</strong> View and download profile pictures in their original full size.</li>
                <li><strong>100% Anonymous:</strong> The account owner will never know you viewed or downloaded their content.</li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                    <h4 className="font-bold text-pink-500 mb-1">Do I need to login with my Instagram account?</h4>
                    <p className="text-sm">No! Guidify puts your privacy first. We never ask for your Instagram password or login credentials. Just paste the link, and you are good to go.</p>
                </div>
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                    <h4 className="font-bold text-pink-500 mb-1">Can I download from Private Accounts?</h4>
                    <p className="text-sm">Currently, our tool respects Instagram's privacy policy and only supports downloading media from Public accounts.</p>
                </div>
            </div>
        </article>
      </section>
      <Footer />
    </main>
  );
}