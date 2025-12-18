"use client";
import { useState } from "react";
import { X, Key, CheckCircle, Loader2 } from "lucide-react";

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LicenseModal({ isOpen, onClose }: LicenseModalProps) {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleActivate = () => {
    if (!key) return;
    setStatus("loading");

    // SIMULASI REQUEST KE SERVER LEMON SQUEEZY
    // Nanti diganti dengan API Validasi sungguhan
    setTimeout(() => {
      // Untuk tes: Kita anggap kode "VIP-MEMBER" itu benar
      if (key.trim().length > 5) {
        // Simpan stempel VIP
        localStorage.setItem("guidify_premium_status", "active");
        setStatus("success");
        setTimeout(() => {
            onClose();
            window.location.href = "/"; // Refresh ke home
        }, 2000);
      } else {
        setStatus("error");
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Kotak Modal */}
      <div className="relative z-10 bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500 border border-amber-500/20">
                <Key className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white font-cinzel mb-2">Activate Premium</h2>
            <p className="text-gray-400 text-sm">
                Enter the license key sent to your email after purchase.
            </p>
        </div>

        {status === "success" ? (
            <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-6 rounded-xl text-center font-bold flex flex-col items-center gap-2 animate-in fade-in">
                <CheckCircle className="w-8 h-8" />
                <span>License Activated Successfully!</span>
            </div>
        ) : (
            <div className="space-y-4">
                <input 
                    type="text" 
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded-xl p-4 text-white focus:border-amber-500 outline-none text-center tracking-widest uppercase transition-all"
                />
                
                {status === "error" && (
                    <p className="text-red-500 text-xs text-center font-bold animate-pulse">
                        ❌ Invalid License Key. Please check again.
                    </p>
                )}

                <button 
                    onClick={handleActivate}
                    disabled={status === "loading" || !key}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {status === "loading" ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</>
                    ) : (
                        "Activate License"
                    )}
                </button>
            </div>
        )}
      </div>
    </div>
  );
}