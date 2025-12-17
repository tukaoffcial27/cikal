"use client";

// KITA MATIKAN IMPORT ICON DULU (Sering bikin crash di Next.js baru)
// import { X, Check, Zap } from "lucide-react"; 

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  // Debugging: Cek di console apakah modal dipanggil
  if (isOpen) console.log("🟢 MODAL RENDERED: TRUE");

  if (!isOpen) return null;

  const CHECKOUT_URL = "https://guidify.lemonsqueezy.com/buy/5eb36fb5-4bf6-4813-8cbd-536eb6a0d726";

  return (
    // LAYER 1: Background Gelap (Pakai Style Manual agar Z-Index tembus langit)
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.85)',
      zIndex: 2147483647, // Angka z-index tertinggi yang mungkin di browser
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(5px)'
    }}>
      
      {/* LAYER 2: Kotak Modal */}
      <div style={{
        backgroundColor: '#111',
        border: '1px solid #d97706', // Warna Amber
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '90%',
        width: '400px',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 0 50px rgba(217, 119, 6, 0.3)'
      }}>

        {/* Tombol Close (Pakai Text X) */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#888',
            fontSize: '24px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ✕
        </button>

        {/* Header (Pakai Emoji ⚡) */}
        <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>⚡</div>
            <h2 style={{ fontSize: '24px', margin: '0 0 10px 0', fontFamily: 'serif' }}>
              Daily Limit Reached
            </h2>
            <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
              Jatah download gratis harian habis.
            </p>
        </div>

        {/* Kotak Harga */}
        <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '15px',
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
                <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 'bold' }}>Premium</div>
                    <span style={{ background: '#d97706', color: 'black', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>BEST</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '28px', fontWeight: 'bold' }}>$4.99</span>
                    <span style={{ color: '#888', fontSize: '12px' }}>/mo</span>
                </div>
            </div>

            {/* List Fitur (Pakai Emoji ✅) */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', textAlign: 'left', fontSize: '14px', color: '#ccc' }}>
                <li style={{ marginBottom: '8px' }}>✅ Unlimited Downloads</li>
                <li style={{ marginBottom: '8px' }}>✅ High-Speed Server</li>
                <li style={{ marginBottom: '8px' }}>✅ No Ads & Popups</li>
            </ul>

            {/* Tombol Bayar */}
            <a 
                href={CHECKOUT_URL}
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                    display: 'block',
                    width: '100%',
                    backgroundColor: '#d97706', // Amber-600
                    color: 'black',
                    fontWeight: 'bold',
                    padding: '15px 0',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                Unlock Unlimited Access ⚡
            </a>
        </div>

      </div>
    </div>
  );
}