"use client";

import { X, Check, Zap } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  // Jika logika false, stop render sama sekali
  if (!isOpen) return null;

  // LINK BARU YANG SUDAH DI-UPDATE
  const CHECKOUT_URL = "https://guidify.lemonsqueezy.com/buy/5eb36fb5-4bf6-4813-8cbd-536eb6a0d726";

  return (
    // PERBAIKAN VISUAL (CSS):
    // 1. z-[9999]: Memastikan layer ini ada di atas segalanya (Navbar, Background, dll).
    // 2. fixed inset-0: Memenuhi satu layar penuh.
    // 3. HAPUS 'animate-in': Ini biang kerok kenapa popup transparan kemarin.
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      
      {/* BACKGROUND GELAP (Overlay) */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
        onClick={onClose} // Klik area gelap untuk tutup
      ></div>

      {/* KARTU MODAL UTAMA */}
      <div className="relative z-[10000] bg-[#111] border border-amber-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl shadow-amber-500/10 flex flex-col gap-6">
        
        {/* Tombol Close (Silang) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Icon & Teks */}
        <div className="text-center pt-2">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Zap className="w-8 h-8 fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 font-cinzel">Daily Limit Reached</h2>
            <p className="text-gray-400 text-sm px-4">
              You've used your free download for today. Upgrade to continue instantly.
            </p>
        </div>

        {/* Pricing Card (Kotak Harga) */}
        <div className="bg-gradient-to-b from-[#1a1a1a] to-transparent border border-white/5 rounded-2xl p-5">
            <div className="flex justify-between items-end mb-4 pb-4 border-b border-white/5">
                <div>
                    <h3 className="text-lg font-bold text-white">Premium Suite</h3>
                    <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 inline-block px-2 py-1 rounded mt-1">
                      Best Value
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-bold text-white">$4.99</span>
                    <span className="text-gray-500 text-sm font-medium">/mo</span>
                </div>
            </div>

            <ul className="space-y-3 mb-6">
                {[
                    "Unlimited Downloads (All Tools)",
                    "Priority High-Speed Server",
                    "No Ads & Popups",
                    "Support Our Development"
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <div className="mt-0.5 bg-amber-500/20 rounded-full p-0.5">
                            <Check className="w-3 h-3 text-amber-500 stroke-[3]" />
                        </div>
                        {item}
                    </li>
                ))}
            </ul>

            {/* TOMBOL BAYAR (Checkout) */}
            <a 
                href={CHECKOUT_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl text-center transition-all transform active:scale-95 shadow-lg shadow-amber-500/20"
            >
                Unlock Unlimited Access ⚡
            </a>
            
            <p className="text-center text-[10px] text-gray-600 mt-3">
                Secure payment via Lemon Squeezy. Cancel anytime.
            </p>
        </div>
      </div>
    </div>
  );
}