import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-8 mt-20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Copyright */}
        <div className="text-gray-500 text-sm font-outfit">
          &copy; {new Date().getFullYear()} Guidify Suite. All rights reserved.
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm font-outfit font-medium">
          <Link href="/privacy" className="text-gray-400 hover:text-amber-500 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-400 hover:text-amber-500 transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-gray-400 hover:text-amber-500 transition-colors">
            Contact Us
          </Link>
        </div>

      </div>
    </footer>
  );
}