import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Zap, Check } from "lucide-react";

export default function UpgradePage() {
  const CHECKOUT_URL = "https://guidify.lemonsqueezy.com/buy/5eb36fb5-4bf6-4813-8cbd-536eb6a0d726";

  return (
    <main className="min-h-screen bg-black font-outfit text-white flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black"></div>

        <div className="relative z-10 max-w-md w-full bg-[#111] border border-amber-500/50 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 text-center animate-in fade-in zoom-in duration-500">
            
            {/* Icon Petir */}
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-2 border border-amber-500/20 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Zap className="w-10 h-10 fill-current" />
            </div>

            <div>
                <h1 className="text-3xl font-bold text-white mb-2 font-cinzel">Daily Limit Reached</h1>
                <p className="text-gray-400">
                  Anda telah mencapai batas download gratis harian.
                </p>
            </div>

            {/* Pricing Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
                <div className="flex justify-between items-end mb-6 pb-6 border-b border-white/10">
                    <div>
                        <h3 className="text-xl font-bold text-white">Premium Suite</h3>
                        <p className="text-amber-500 text-xs font-bold uppercase tracking-widest bg-amber-500/10 inline-block px-2 py-1 rounded mt-2">Best Value</p>
                    </div>
                    <div className="text-right">
                        <span className="text-4xl font-bold text-white">$4.99</span>
                        <span className="text-gray-500 text-sm font-medium">/mo</span>
                    </div>
                </div>

                <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-amber-500" /> <span>Unlimited Downloads</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-amber-500" /> <span>High-Speed Server</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-amber-500" /> <span>No Ads & Popups</span>
                    </li>
                </ul>

                <a 
                    href={CHECKOUT_URL}
                    className="block w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl text-center transition-all shadow-lg hover:shadow-amber-500/25 transform hover:scale-[1.02]"
                >
                    Unlock Premium Access ⚡
                </a>
                
                <p className="text-center text-xs text-gray-500 mt-4">
                    Secure payment via Lemon Squeezy. Cancel anytime.
                </p>
            </div>

            <a href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
                ← Back to Home
            </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}