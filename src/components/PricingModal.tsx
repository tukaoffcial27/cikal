"use client";

import { X, Check, Zap } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  // Jika logika false, stop render
  if (!isOpen) return null;

  const CHECKOUT_URL = "https://guidify.lemonsqueezy.com/buy/e86f0e0a-a8dd-4c54-819f-6906fd6f08f2";

  return (
    // PERBAIKAN PENTING:
    // 1. Menghapus 'animate-in fade-in' (karena plugin tailwindcss-animate TIDAK ADA di package.json Anda)
    // 2. Menggunakan 'fixed inset-0 z-[100]' agar menimpa Navbar (yang biasanya z-10/z-20)
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* BACKGROUND GELAP (Overlay) */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose} // Klik background untuk tutup
      ></div>

      {/* KONTEN MODAL */}
      <div className="relative z-[101] bg-[#111] border border-amber-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl shadow-amber-900/40">
        
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8 pt-4">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20 text-amber-500">
                <Zap className="w-8 h-8 fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 font-cinzel">Daily Limit Reached</h2>
            <p className="text-gray-400 text-sm">You've used your free download for today.</p>
        </div>

        {/* Pricing Card */}
        <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-6 mb-6">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h3 className="text-lg font-bold text-white">Premium Access</h3>
                    <p className="text-amber-500 text-xs font-bold uppercase tracking-wider">Most Popular</p>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-bold text-white">$4.99</span>
                    <span className="text-gray-400 text-sm">/mo</span>
                </div>
            </div>

            <ul className="space-y-3 mb-6">
                {[
                    "Unlimited Downloads (TikTok, IG, YT)",
                    "Priority High-Speed Server",
                    "No Ads & Popups",
                    "Support Original Creators"
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="bg-amber-500 rounded-full p-0.5">
                            <Check className="w-3 h-3 text-black font-bold" />
                        </div>
                        {item}
                    </li>
                ))}
            </ul>

            {/* TOMBOL BAYAR */}
            <a 
                href={CHECKOUT_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold py-4 rounded-xl text-center transition-all transform hover:scale-[1.02] shadow-lg shadow-amber-500/25"
            >
                Unlock Unlimited Access ⚡
            </a>
            
            <p className="text-center text-xs text-gray-500 mt-4">
                Secure payment via Lemon Squeezy. Cancel anytime.
            </p>
        </div>

      </div>
    </div>
  );
}