"use client";
import Link from "next/link";
import { useState } from "react";
import LicenseModal from "./LicenseModal"; // Import komponen yang baru kita buat

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Menu HP
  const [isLicenseOpen, setIsLicenseOpen] = useState(false); // Menu Lisensi

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* LOGO */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex flex-col group">
                <span className="font-cinzel text-2xl font-bold text-white tracking-widest group-hover:text-amber-500 transition-colors">
                  GUIDIFY
                </span>
                <span className="text-[10px] font-outfit text-amber-500 tracking-[0.3em] uppercase">
                  Premium Suite
                </span>
              </Link>
            </div>

            {/* MENU DESKTOP */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <NavLink href="/tiktok" text="TikTok" />
                <NavLink href="/insta" text="Instagram" />
                <NavLink href="/youtube" text="YouTube" />
                
                {/* TOMBOL ACTIVATE (Buka Modal) */}
                <button 
                  onClick={() => setIsLicenseOpen(true)}
                  className="bg-white/10 text-white border border-white/20 px-6 py-2 rounded-full font-bold hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 text-sm"
                >
                  Activate License
                </button>
              </div>
            </div>

            {/* TOMBOL HP */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-amber-500 p-2 transition-colors"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* MENU HP DROP DOWN */}
        {isOpen && (
          <div className="md:hidden bg-black border-b border-white/10 slide-down-animation">
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              <MobileNavLink href="/tiktok" text="TikTok Downloader" />
              <MobileNavLink href="/insta" text="Instagram Saver" />
              <MobileNavLink href="/youtube" text="YouTube Tools" />
              <button 
                onClick={() => {
                    setIsOpen(false);
                    setIsLicenseOpen(true);
                }}
                className="text-left text-amber-500 font-bold block px-3 py-4 rounded-lg text-base font-outfit"
              >
                 🔑 Activate License
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* RENDER MODAL LISENSI DI SINI */}
      <LicenseModal 
        isOpen={isLicenseOpen} 
        onClose={() => setIsLicenseOpen(false)} 
      />
    </>
  );
}

function NavLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-amber-400 px-3 py-2 text-sm font-medium transition-all font-outfit tracking-wide">
      {text}
    </Link>
  );
}

function MobileNavLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white hover:bg-white/10 block px-3 py-4 rounded-lg text-base font-medium font-outfit">
      {text}
    </Link>
  );
}