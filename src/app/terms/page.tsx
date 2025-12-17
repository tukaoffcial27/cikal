"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black font-outfit text-gray-300">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-cinzel">Terms of Service</h1>
        <p className="mb-8 text-sm text-gray-500">Last Updated: December 2025</p>

        <article className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
                <h3 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h3>
                <p>By accessing and using Guidify, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">2. Use License</h3>
                <p>Guidify allows you to download videos for <strong>Personal Use Only</strong> (e.g., offline viewing). You are strictly prohibited from:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Using the downloaded content for commercial purposes without the original creator's permission.</li>
                    <li>Claiming ownership of the content downloaded via our tool.</li>
                    <li>Using our service to infringe on copyright laws.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">3. Premium Subscription</h3>
                <p>If you choose to purchase our Premium plan:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>The fee is billed monthly or as a one-time payment depending on your selection.</li>
                    <li>We reserve the right to modify our pricing with prior notice.</li>
                    <li>Refunds are handled on a case-by-case basis through our payment processor (Lemon Squeezy).</li>
                </ul>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">4. Disclaimer</h3>
                <p>The materials on Guidify's website are provided on an 'as is' basis. We do not host any video content; all videos are served directly from their respective platforms (TikTok, Instagram, YouTube) via public APIs.</p>
            </section>
        </article>
      </div>

      <Footer />
    </main>
  );
}