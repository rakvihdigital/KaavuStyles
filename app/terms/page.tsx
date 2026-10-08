"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 bg-ivory-200 border border-ivory-300 py-12 px-6">
        <span className="text-xs uppercase tracking-[0.35em] text-gold font-semibold">
          Boutique Agreement
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-ink uppercase font-light">
          Terms of Service
        </h1>
        <p className="text-xs text-ink-muted max-w-md mx-auto">
          Terms governing purchases, bespoke tailoring, and boutique concierge at Kaavu Styles.
        </p>
      </div>

      {/* Content */}
      <div className="bg-ivory-50 border border-ivory-300 p-8 sm:p-12 space-y-6 text-xs text-ink-muted leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-ink uppercase">1. Authentic Handcrafted Products</h2>
          <p>
            Every Kanjeevaram saree, designer kurti, bridal lehenga, and Indo-Western drape set at Kaavu Styles is handcrafted using authentic silk threads and fine zari brocade. Slight variations in weave texture are inherent markers of genuine handloom artistry.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-ink uppercase">2. Order Placement & Authorization</h2>
          <p>
            Orders placed online or at our flagship boutique locations in Hyderabad (Jubilee Hills) and Bengaluru, Karnataka require client sign-in verification prior to dispatch.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-ink uppercase">3. Custom Tailoring & Returns</h2>
          <p>
            Unstitched sarees and standard ready-to-wear silhouettes can be exchanged within 7 days of delivery. Custom-stitched blouses and bespoke bridal lehengas are crafted specifically to your dimensions and cannot be returned once tailored.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-ink uppercase">4. Customer Concierge Contact</h2>
          <p>
            For boutique consultations or custom orders, visit our Flagship Boutiques or connect via Instagram <span className="text-gold font-medium">@kaavu.styles</span> or email <span className="text-crimson font-medium">care@kavvustyle.com</span>.
          </p>
        </section>

        <div className="pt-6 border-t border-ivory-300 flex justify-between items-center text-xs">
          <Link href="/contact" className="text-crimson font-medium hover:underline flex items-center">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Return to Contact Us</span>
          </Link>
          <span className="text-[10px] uppercase text-gold tracking-widest">
            Effective Date: October 2026
          </span>
        </div>
      </div>
    </div>
  );
}
