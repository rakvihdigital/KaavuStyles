"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroBanner() {
  const { banners, isLoading } = useStore();
  const activeBanners = banners.filter((b) => b.isActive);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (activeBanners.length <= 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (isLoading || activeBanners.length === 0) {
    return (
      <div className="relative w-full h-[52vh] sm:h-[62vh] lg:h-[70vh] min-h-[380px] sm:min-h-[460px] max-h-[640px] bg-[#2B0B14] overflow-hidden flex flex-col items-center justify-center text-center p-6 space-y-4 border-b-2 border-gold/40 animate-pulse z-0">
        <div className="w-16 h-16 rounded-full border-2 border-gold/40 p-1 bg-[#2B0B14]">
          <div className="w-full h-full rounded-full bg-gold/20" />
        </div>
        <div className="h-3.5 w-36 sm:w-44 bg-gold/30 rounded mx-auto" />
        <div className="h-8 sm:h-12 w-64 sm:w-[450px] bg-gold/40 rounded mx-auto" />
        <div className="h-10 w-44 bg-crimson/60 rounded border border-gold/40 mx-auto mt-3" />
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
    <div data-home-hero className="relative w-full h-[52vh] sm:h-[62vh] lg:h-[70vh] min-h-[380px] sm:min-h-[460px] max-h-[640px] bg-ink overflow-hidden group">
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
      <div className={`relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-8 sm:pb-12 md:pb-14 items-center text-center text-ivory ${desktopAlignClass}`}>
        <div key={banner.id} className={`hero-entrance max-w-2xl space-y-3 sm:space-y-5 mx-auto flex flex-col items-center text-center ${desktopAlignClass}`}>
          <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#E5C378] font-bold drop-shadow-md">
            {banner.subtitle || "KAAVU STYLES EXCLUSIVE"}
          </p>

          <h1
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            style={{ color: banner.textColor || "#FFFFFF" }}
          >
            {banner.title.split(" ").map((word, i) => (
              <span key={i} className={i % 2 === 1 ? "text-[#E5C378] italic font-normal" : "text-white font-light"}>
                {word}{" "}
              </span>
            ))}
          </h1>

          <div className={`pt-2 sm:pt-3 flex items-center justify-center space-x-6 w-full ${desktopCtaAlignClass}`}>
            <Link
              href={banner.ctaLink || "/shop"}
              className="px-6 py-3 sm:px-8 sm:py-3.5 bg-crimson hover:bg-crimson-800 text-ivory text-[11px] sm:text-xs uppercase tracking-[0.24em] font-semibold transition-all shadow-luxury hover:scale-105"
            >
              {banner.ctaText || "Explore Collection"}
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
