"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black font-outfit text-gray-300">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-cinzel">Privacy Policy</h1>
        <p className="mb-8 text-sm text-gray-500">Last Updated: December 2025</p>

        <article className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
                <h3 className="text-2xl font-bold text-white mb-4">1. Introduction</h3>
                <p>Welcome to Guidify ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share your information when you visit our website.</p>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h3>
                <p>We collect minimal data to provide our services:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Usage Data:</strong> We use Local Storage on your browser to track your daily download count to enforce our fair usage policy.</li>
                    <li><strong>Payment Information:</strong> If you upgrade to Premium, your payment is processed by our secure partner (Lemon Squeezy/PayPal). We do NOT store your credit card details on our servers.</li>
                    <li><strong>Cookies:</strong> We use cookies to analyze traffic and serve personalized advertisements via Google AdSense.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">3. Third-Party Services</h3>
                <p>We may employ third-party companies due to the following reasons:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Google AdSense:</strong> To serve advertisements. Google uses the DART cookie to serve ads based on your visit to our site and other sites on the internet.</li>
                    <li><strong>Lemon Squeezy / PayPal:</strong> To process secure payments for our Premium subscriptions.</li>
                    <li><strong>RapidAPI:</strong> To process the video conversion requests.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">4. Data Security</h3>
                <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet is 100% secure.</p>
            </section>
        </article>
      </div>

      <Footer />
    </main>
  );
}