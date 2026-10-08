"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function OurStoryPage() {
  return (
    <div className="space-y-20 pb-24">
      {/* Story Header Hero Banner (#2B0B14 BURGUNDY BACKGROUND) */}
      <section className="relative bg-[#2B0B14] border-b-2 border-gold/40 text-ivory py-20 px-4 text-center overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#E5C378] font-bold">
            Kaavu Styles Narrative
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl uppercase font-light text-white tracking-wide">
            Our Story
          </h1>
          <p className="font-serif italic text-[#E5C378] text-lg tracking-wider">
            "Made for every version of you."
          </p>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(#E5C378_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />
      </section>

      {/* Main Story Showcase Layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Elegant Arch Image Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-t-[999px] border-2 border-gold p-2.5 bg-ivory-200 shadow-2xl overflow-hidden group">
            <div className="relative w-full h-full rounded-t-[990px] overflow-hidden">
              <Image
                src="/founderphoto.jpg"
                alt="Kaavu Styles Founder Arch Drapery"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-crimson/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Right Side: Exact Customer Copy & Typography */}
        <div className="lg:col-span-7 space-y-8 text-ink pl-0 lg:pl-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-gold font-semibold">
              Our Philosophy
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl uppercase font-light leading-tight">
              Made for every <br />
              <em className="text-crimson font-normal">version of you.</em>
            </h2>
            <div className="w-16 h-0.5 bg-gold my-4" />
          </div>

          <div className="space-y-6 text-sm text-ink-muted leading-relaxed font-sans font-light">
            <p className="text-base text-ink font-normal leading-relaxed">
              Kaavu Styles began with a simple idea: getting dressed should feel like a quiet ritual, not a decision. Each piece is chosen for its fall, its finish, and the way it makes you feel.
            </p>
            <p className="text-base text-ink font-normal leading-relaxed">
              Rich maroon, soft gold, unhurried silhouettes. Clothing and adornment that belongs to every mood, every day.
            </p>
            <p className="text-xs text-ink-muted leading-relaxed pt-2">
              From our flagship boutique in Jubilee Hills to discerning patrons worldwide, we honor the legacy of Indian textiles with modern tailored aesthetics.
            </p>
          </div>

          <div className="pt-4 flex items-center space-x-6">
            <Link
              href="/shop"
              className="px-8 py-4 bg-crimson hover:bg-crimson-800 text-ivory text-xs uppercase tracking-[0.24em] font-semibold transition-all shadow-luxury"
            >
              Explore Collection
            </Link>
            <Link
              href="/contact"
              className="text-xs uppercase tracking-[0.24em] text-gold border-b border-gold hover:text-crimson hover:border-crimson pb-1 transition-colors"
            >
              Visit Our Boutique
            </Link>
          </div>
        </div>
      </section>

      {/* Craftsmanship Highlights */}
      <section className="bg-ivory-200 border-y border-ivory-300 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
              Artisan Standards
            </span>
            <h3 className="font-serif text-3xl uppercase font-light text-ink">
              Quiet Rituals, Timeless Design
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-ivory border border-ivory-300 space-y-3 text-center shadow-sm">
              <span className="text-gold font-serif text-3xl font-light">I</span>
              <h4 className="font-serif text-xl uppercase text-ink">The Fall & Finish</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Selected for weightless grace and effortless drape against every body shape.
              </p>
            </div>
            <div className="p-8 bg-ivory border border-ivory-300 space-y-3 text-center shadow-sm">
              <span className="text-gold font-serif text-3xl font-light">II</span>
              <h4 className="font-serif text-xl uppercase text-ink">Rich Maroon & Soft Gold</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Color palettes tuned to quiet luxury, warm ivory backdrop, and royal celebration.
              </p>
            </div>
            <div className="p-8 bg-ivory border border-ivory-300 space-y-3 text-center shadow-sm">
              <span className="text-gold font-serif text-3xl font-light">III</span>
              <h4 className="font-serif text-xl uppercase text-ink">Unhurried Silhouettes</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Clothing and adornment created for endurance, memory, and everyday elegance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
