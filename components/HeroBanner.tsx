"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroBanner() {
  const { banners } = useStore();
  const activeBanners = banners.filter((b) => b.isActive);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (activeBanners.length <= 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) {
    return (
      <div data-home-hero className="relative w-full h-[85vh] min-h-[600px] max-h-[850px] bg-ink overflow-hidden flex items-end justify-center pb-16 sm:pb-20 md:pb-24 border-b border-ivory-300">
        <div className="absolute inset-0 bg-gradient-to-r from-crimson-900/60 via-ink to-ink" />
        <div className="hero-entrance relative max-w-4xl mx-auto px-6 text-center space-y-6 text-ivory">
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.4em] text-gold font-semibold">
            Kaavu Styles Boutique
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl uppercase font-light leading-tight">
            Made For Every <br />
            <em className="text-gold italic font-normal">Version Of You</em>
          </h1>
          <p className="text-xs sm:text-sm text-ivory-300 max-w-xl mx-auto font-sans leading-relaxed">
            Rich maroon, soft gold, unhurried silhouettes. Clothing and adornment that belongs to every mood, every day.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block px-10 py-4 bg-crimson hover:bg-crimson-800 text-ivory text-xs uppercase tracking-[0.24em] font-semibold transition-all shadow-luxury"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const banner = activeBanners[currentIdx];
  const textAlign = banner.textAlign?.toLowerCase() || "left";

  const desktopAlignClass =
    textAlign === "right"
      ? "lg:items-end lg:text-right lg:ml-auto lg:mr-0"
      : textAlign === "center"
      ? "lg:items-center lg:text-center lg:mx-auto"
      : "lg:items-start lg:text-left lg:mx-0";

  const desktopCtaAlignClass =
    textAlign === "right"
      ? "lg:justify-end"
      : textAlign === "center"
      ? "lg:justify-center"
      : "lg:justify-start";

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % activeBanners.length);
  };

  return (
    <div data-home-hero className="relative w-full h-[88vh] min-h-[650px] max-h-[900px] bg-ink overflow-hidden group">
      {/* Background Banner Image & Dark Vignette Overlay */}
      <div className="hero-drift absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <Image
          src={banner.imageUrl}
          alt={banner.title}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-center opacity-75 scale-105 transform transition-transform duration-[8000ms]"
        />
        {/* Dark Vignette & Gradient Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
      </div>

      {/* Hero Content Overlay (Centered on Mobile, Respects text_align on Desktop) */}
      <div className={`relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-16 sm:pb-20 md:pb-24 items-center text-center text-ivory ${desktopAlignClass}`}>
        <div key={banner.id} className={`hero-entrance max-w-2xl space-y-6 mx-auto flex flex-col items-center text-center ${desktopAlignClass}`}>
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.35em] text-[#E5C378] font-bold drop-shadow-md">
            {banner.subtitle || "KAAVU STYLES EXCLUSIVE"}
          </p>

          <h1
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-tight tracking-tight uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            style={{ color: banner.textColor || "#FFFFFF" }}
          >
            {banner.title.split(" ").map((word, i) => (
              <span key={i} className={i % 2 === 1 ? "text-[#E5C378] italic font-normal" : "text-white font-light"}>
                {word}{" "}
              </span>
            ))}
          </h1>

          <div className={`pt-4 flex items-center justify-center space-x-6 w-full ${desktopCtaAlignClass}`}>
            <Link
              href={banner.ctaLink || "/shop"}
              className="px-8 py-4 bg-crimson hover:bg-crimson-800 text-ivory text-xs uppercase tracking-[0.24em] font-semibold transition-all shadow-luxury hover:scale-105"
            >
              {banner.ctaText || "Explore Collection"}
            </Link>
            <Link
              href="/about"
              className="text-xs uppercase tracking-[0.24em] border-b border-gold text-gold hover:text-ivory hover:border-ivory pb-1 transition-colors"
            >
              Our Heritage
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-ivory/20 hover:bg-ivory text-ivory hover:text-ink backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-ivory/20 hover:bg-ivory text-ivory hover:text-ink backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-3">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`h-1.5 transition-all rounded-full ${
                  currentIdx === idx ? "w-8 bg-gold" : "w-3 bg-ivory/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
