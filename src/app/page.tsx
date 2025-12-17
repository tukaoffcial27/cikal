"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black font-outfit text-white selection:bg-amber-500 selection:text-black flex flex-col">
      <Navbar />

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center pt-32 pb-10">
        
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]"></div>
        </div>

        <h1 className="text-5xl md:text-8xl font-bold mb-6 font-cinzel tracking-tight relative z-10">
          Guidify<span className="text-amber-500">.</span>
        </h1>

        <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
          The Ultimate All-in-One Social Media Downloader. <br/>
          Premium Quality. No Watermark. Unlimited Speed.
        </p>

        {/* MENU PILIHAN TOOLS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10 mb-20">
            
            {/* KARTU TIKTOK */}
            <a href="https://tiktok.guidify.app" className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-amber-500 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-900/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                    🎵
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">TikTok Downloader</h3>
                <p className="text-gray-500 text-sm">Download video tanpa watermark & audio MP3 viral.</p>
                <div className="mt-6 text-amber-500 font-bold flex items-center gap-2">
                    Open Tool <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </a>

            {/* KARTU INSTAGRAM */}
            <a href="https://insta.guidify.app" className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-pink-500 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-900/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                    📸
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Instagram Saver</h3>
                <p className="text-gray-500 text-sm">Simpan Reels, Stories, dan Foto Profile HD.</p>
                <div className="mt-6 text-pink-500 font-bold flex items-center gap-2">
                    Open Tool <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </a>

            {/* KARTU YOUTUBE */}
            <a href="https://youtube.guidify.app" className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-red-500 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-900/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 bg-black border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                    ▶️
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">YouTube Converter</h3>
                <p className="text-gray-500 text-sm">Convert video ke MP4 & MP3 tercepat.</p>
                <div className="mt-6 text-red-500 font-bold flex items-center gap-2">
                    Open Tool <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </a>
        </div>

        {/* --- SEO CONTENT SECTION (WAJIB UNTUK ADSENSE) --- */}
        <section className="w-full max-w-4xl text-left border-t border-white/10 pt-16">
            <article className="prose prose-invert lg:prose-xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-6 font-cinzel">The Universal Social Media Downloader</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                    Guidify is designed to be your single destination for saving media content from the internet. In an era where content is spread across multiple apps like TikTok, Instagram, and YouTube, jumping between different websites to download videos can be frustrating. Guidify solves this by providing a unified, high-speed, and secure platform.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-10">
                    <div>
                        <h3 className="text-xl font-bold text-amber-500 mb-3">Why Guidify is Different?</h3>
                        <p className="text-gray-400 text-sm">
                            Unlike other tools that are cluttered with popup ads and slow servers, Guidify focuses on User Experience (UX). We use premium cloud servers to ensure your downloads start instantly, and we strictly maintain a clean interface.
                        </p>
                    </div>
                    <div>
                         <h3 className="text-xl font-bold text-amber-500 mb-3">Privacy First Policy</h3>
                        <p className="text-gray-400 text-sm">
                            We do not store your download history. The videos are processed in real-time and delivered directly to your device. Your privacy is our top priority, making Guidify the safest choice for anonymous downloading.
                        </p>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">Supported Features</h3>
                <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-400">
                    <li><strong>Cross-Platform Support:</strong> Works perfectly on iOS (iPhone/iPad), Android, Windows, and macOS.</li>
                    <li><strong>High Definition (HD):</strong> We always fetch the highest quality available (up to 4K) from the source server.</li>
                    <li><strong>Audio Extraction:</strong> Easily convert video clips into MP3 audio files for your music playlist.</li>
                    <li><strong>No Watermark:</strong> Specifically for TikTok, our algorithm removes the bouncing logo automatically.</li>
                </ul>

                <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                        <h4 className="font-bold text-white mb-1">Is this service free?</h4>
                        <p className="text-sm text-gray-400">Yes, Guidify offers a free tier for all users. For power users who need unlimited bulk downloads, we offer a Premium plan.</p>
                    </div>
                    <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                        <h4 className="font-bold text-white mb-1">Where are the videos saved?</h4>
                        <p className="text-sm text-gray-400">On mobile, videos are saved to your Gallery or Photos app. On PC, they are usually found in the "Downloads" folder.</p>
                    </div>
                </div>
            </article>
        </section>

      </div>
      <Footer />
    </main>
  );
}