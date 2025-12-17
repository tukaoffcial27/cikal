"use client";

// KITA PAKE EMOJI DULU BIAR 100% AMAN DARI ERROR ICON
// Nanti kalau sudah muncul, baru kita nyalakan lagi Lucide-nya.

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  // Debug Log
  if (isOpen) console.log("Rendering PricingModal...");
  
  if (!isOpen) return null;

  // Link Lemon Squeezy Baru Kamu
  const CHECKOUT_URL = "https://guidify.lemonsqueezy.com/buy/5eb36fb5-4bf6-4813-8cbd-536eb6a0d726";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      
      {/* Background Gelap (Overlay) */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Konten Modal */}
      <div className="relative z-[10000] bg-[#111] border border-amber-500/50 rounded-3xl p-6 max-w-md w-full shadow-2xl shadow-amber-500/20 flex flex-col gap-6">
        
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-xl font-bold p-2"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center pt-2">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20 text-amber-500 text-3xl shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                ⚡
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 font-cinzel">Daily Limit Reached</h2>
            <p className="text-gray-400 text-sm px-4">
              Jatah download gratis harian habis. Upgrade sekarang untuk akses tanpa batas.
            </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-gradient-to-b from-[#1a1a1a] to-transparent border border-white/10 rounded-2xl p-5">
            <div className="flex justify-between items-end mb-4 pb-4 border-b border-white/10">
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
                <li className="flex items-start gap-3 text-sm text-gray-300">
                    ✅ Unlimited Downloads (All Tools)
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                    ✅ Priority High-Speed Server
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                    ✅ No Ads & Popups
                </li>
            </ul>

            {/* Tombol Bayar */}
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