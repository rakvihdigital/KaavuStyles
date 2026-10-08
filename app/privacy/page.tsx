"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 bg-ivory-200 border border-ivory-300 py-12 px-6">
        <span className="text-xs uppercase tracking-[0.35em] text-gold font-semibold">
          Legal & Privacy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-ink uppercase font-light">
          Privacy Policy
        </h1>
        <p className="text-xs text-ink-muted max-w-md mx-auto">
          Kaavu Styles is committed to protecting your privacy and personal information.
        </p>
      </div>

      {/* Content */}
      <div className="bg-ivory-50 border border-ivory-300 p-8 sm:p-12 space-y-6 text-xs text-ink-muted leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-ink uppercase">1. Information We Collect</h2>
          <p>
            When you visit Kaavu Styles boutique storefront or place an order, we collect information necessary to complete your purchase, including your name, delivery address, contact phone number, and email address.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-ink uppercase">2. Use of Information</h2>
          <p>
            Your information is strictly used for order processing, customer concierge support, and dispatching bespoke clothing collections across our flagship boutiques in Hyderabad, India and Bengaluru, Karnataka.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-ink uppercase">3. Data Protection & Security</h2>
          <p>
            We deploy secure Supabase database infrastructure and encrypted IP sessions. We do not sell, rent, or share customer data with third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-ink uppercase">4. Contacting Our Privacy Officer</h2>
          <p>
            If you have questions regarding your personal data or wish to request data deletion, contact us at <span className="text-crimson font-medium">care@kavvustyle.com</span> or follow us on Instagram at <span className="text-gold font-medium">@kaavu.styles</span>.
          </p>
        </section>

        <div className="pt-6 border-t border-ivory-300 flex justify-between items-center text-xs">
          <Link href="/story" className="text-crimson font-medium hover:underline flex items-center">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Return to Our Story</span>
          </Link>
          <span className="text-[10px] uppercase text-gold tracking-widest">
            Last Updated: October 2026
          </span>
        </div>
      </div>
    </div>
  );
}
