"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black font-outfit text-gray-300">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-cinzel">Contact Support</h1>
        <p className="mb-12 text-lg text-gray-400">
            Have questions about your Premium plan or need technical help? <br/>
            Our team is ready to assist you.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Kartu Email */}
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl hover:border-amber-500/50 transition-colors">
                <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                <p className="text-sm text-gray-500 mb-4">For general inquiries and partnership.</p>
                <a href="mailto:support@guidify.app" className="text-amber-500 font-bold text-lg hover:underline">
                    support@guidify.app
                </a>
            </div>

            {/* Kartu WhatsApp/Chat */}
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl hover:border-amber-500/50 transition-colors">
                <h3 className="text-xl font-bold text-white mb-2">Technical Issues</h3>
                <p className="text-sm text-gray-500 mb-4">Report bugs or payment issues.</p>
                <a href="#" className="text-amber-500 font-bold text-lg hover:underline">
                    Chat on WhatsApp
                </a>
            </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}