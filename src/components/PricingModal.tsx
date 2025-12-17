"use client";

export default function PricingModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop Gelap & Blur */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md" 
        onClick={onClose}
      ></div>

      {/* Konten Modal */}
      <div className="relative bg-[#0a0a0a] border border-amber-500/50 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(245,158,11,0.2)] transform transition-all scale-100">
        
        {/* Badge Premium */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-bold px-8 py-2 rounded-full shadow-lg shadow-amber-500/40 tracking-widest text-sm">
            LIMIT REACHED
        </div>

        <h2 className="text-3xl font-bold text-white mt-8 mb-4 font-cinzel">
            Unlock Unlimited <span className="text-amber-500">Power</span>
        </h2>
        
        <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            You've used your free daily download. <br/>
            Upgrade now to remove all limits and access high-speed servers.
        </p>

        {/* Pricing Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left hover:border-amber-500/50 transition-colors cursor-pointer group">
            <div className="flex justify-between items-end mb-2">
                <span className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">Pro Creator</span>
                <span className="text-3xl font-bold text-amber-500">$4.99<span className="text-xs text-gray-500 font-normal ml-1">/mo</span></span>
            </div>
            <div className="h-px w-full bg-white/10 my-4"></div>
            <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex gap-3"><span className="text-amber-500">✓</span> <strong>Unlimited</strong> Downloads 24/7</li>
                <li className="flex gap-3"><span className="text-amber-500">✓</span> <strong>4K Ultra HD</strong> Quality</li>
                <li className="flex gap-3"><span className="text-amber-500">✓</span> <strong>No Ads</strong> & Priority Speed</li>
            </ul>
        </div>

        {/* Tombol CTA */}
        <button 
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-xl mb-4 text-lg"
            onClick={() => window.open('https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20mau%20upgrade%20Premium%20Guidify', '_blank')}
        >
            UPGRADE NOW
        </button>

        <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-400 text-xs tracking-wider uppercase font-semibold"
        >
            I'll wait until tomorrow
        </button>
      </div>
    </div>
  );
}