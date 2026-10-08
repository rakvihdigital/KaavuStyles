"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import HomeMotion from "@/components/HomeMotion";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import {
  ArrowRight,
  Instagram,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Truck,
  ShieldCheck,
  RefreshCw,
  Award,
} from "lucide-react";

export default function HomePage() {
  const { products, categories, instagramPosts, lifestyleTags, isLoading } = useStore();
  const [activeTag, setActiveTag] = useState("all");
  const [pageLoading, setPageLoading] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const lifestyleSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasShown = sessionStorage.getItem("ks_splash_shown");
      if (!hasShown) {
        setPageLoading(true);
        const timer = setTimeout(() => {
          setPageLoading(false);
          sessionStorage.setItem("ks_splash_shown", "true");
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // 4-second Auto-scrolling for Latest Products Slider
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (sliderRef.current) {
        const container = sliderRef.current;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 15) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 360, behavior: "smooth" });
        }
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 4-second Auto-scrolling for Shop By Lifestyle Slider
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (lifestyleSliderRef.current) {
        const container = lifestyleSliderRef.current;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 15) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 360, behavior: "smooth" });
        }
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);



  // 10 Latest Products for Horizontal Slider
  const latestTenProducts = products.filter((p) => p.isLatest || p.isFeatured).slice(0, 10);
  const displayLatest = latestTenProducts.length > 0 ? latestTenProducts : products.slice(0, 10);

  // Products filtered by selected Lifestyle Tag
  const lifestyleFilteredProducts =
    activeTag === "all"
      ? products
      : products.filter((p) =>
          p.lifestyleTags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
        );

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 15) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 360, behavior: "smooth" });
      }
    }
  };

  const scrollLeftLifestyle = () => {
    if (lifestyleSliderRef.current) {
      lifestyleSliderRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRightLifestyle = () => {
    if (lifestyleSliderRef.current) {
      const container = lifestyleSliderRef.current;
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 15) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 360, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {pageLoading && (
        <div className="fixed inset-0 z-50 bg-[#2B0B14] flex flex-col items-center justify-center text-ivory space-y-6">
          <div className="relative w-24 h-24 rounded-full border-2 border-gold p-1.5 animate-pulse shadow-2xl bg-[#2B0B14]">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image src="/icon.jpeg" alt="Kaavu Styles Emblem" fill className="object-cover" priority />
            </div>
          </div>
          <div className="text-center space-y-1.5 px-4">
            <h1 className="font-serif text-3xl sm:text-4xl uppercase tracking-[0.25em] text-[#E5C378] font-light">
              KAAVU STYLES
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-ivory-300 font-sans font-medium">
              For Every Version Of You
            </p>
          </div>
          <div className="w-48 h-1 bg-ivory/10 rounded-full overflow-hidden relative border border-gold/30">
            <div className="absolute inset-y-0 bg-gold animate-marquee w-full" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold/80 font-sans font-semibold pt-2">
            Loading Exclusive Ensembles...
          </span>
        </div>
      )}
      <HomeMotion>
      {/* 1. HERO BANNER SLIDER WITH PARALLAX MOTION */}
      <HeroBanner />

      {/* 2. CATEGORIES SECTION (EXPLORE OUR ETHNIC WEAR COLLECTION) */}
      <section className="w-full px-4 sm:px-6 lg:px-12 space-y-6 pt-4">
        <div data-reveal="up" className="flex flex-col md:flex-row md:items-end justify-between border-b border-ivory-300 pb-3 gap-2">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Curated Heritage</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl uppercase font-light text-ink">
              Explore Our <span className="text-crimson font-normal italic">Ethnic Wear Collection</span>
            </h2>
          </div>
          <Link
            href="/catory"
            className="mt-2 md:mt-0 text-xs uppercase tracking-[0.24em] text-crimson font-bold hover:text-gold transition-colors flex items-center space-x-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {categories.slice(0, 5).map((cat, index) => (
            <Link
              key={cat.id}
              data-reveal="up"
              style={{ transitionDelay: `${index * 80}ms` }}
              href={`/shop?category=${cat.slug}`}
              className="group relative h-72 sm:h-96 bg-ivory rounded-t-[999px] border-2 border-gold p-1.5 shadow-luxury transition-all duration-500 hover-lift flex flex-col overflow-hidden [&:nth-child(5)]:col-span-2 sm:[&:nth-child(5)]:col-span-1 [&:nth-child(5)]:w-1/2 sm:[&:nth-child(5)]:w-full [&:nth-child(5)]:mx-auto"
            >
              <div className="relative w-full h-full rounded-t-[990px] overflow-hidden bg-ink">
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-85 group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />
                <div className="absolute bottom-4 left-3 right-3 text-ivory space-y-1 z-10 text-center">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-sans font-bold block">
                    Collection
                  </span>
                  <h3 className="font-serif text-sm sm:text-2xl uppercase font-light tracking-wide group-hover:text-gold transition-colors line-clamp-1 text-center">
                    {cat.name}
                  </h3>
                  <span className="inline-flex items-center justify-center text-[9px] uppercase tracking-[0.2em] text-ivory-300 group-hover:text-ivory font-semibold">
                    Shop Ensemble <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. LUXURY TRUST & ESSENCE HALLMARK BAR */}
      <section className="w-full bg-[#2B0B14] border-y-2 border-gold/40 text-ivory py-8 sm:py-10 px-4 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#E5C378_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        <div className="relative z-10 w-full px-2 sm:px-6 lg:px-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div data-reveal="up" className="bg-ivory/5 border border-gold/30 p-3.5 sm:p-6 text-center space-y-1.5 sm:space-y-2 group hover:border-gold hover:bg-ivory/10 transition-all shadow-md">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-gold bg-[#2B0B14] flex items-center justify-center text-gold mx-auto group-hover:scale-110 transition-transform shadow-inner">
              <Award className="w-4 h-4 sm:w-6 sm:h-6 text-[#E5C378]" />
            </div>
            <h4 className="font-serif text-xs sm:text-base uppercase tracking-wider text-white font-normal">Artisanal Handcraft</h4>
            <p className="text-[9px] sm:text-[11px] text-[#E5C378] uppercase tracking-widest font-sans font-semibold">Pure Silks & Handloom Sarees</p>
          </div>

          <div data-reveal="up" style={{ transitionDelay: "100ms" }} className="bg-ivory/5 border border-gold/30 p-3.5 sm:p-6 text-center space-y-1.5 sm:space-y-2 group hover:border-gold hover:bg-ivory/10 transition-all shadow-md">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-gold bg-[#2B0B14] flex items-center justify-center text-gold mx-auto group-hover:scale-110 transition-transform shadow-inner">
              <Truck className="w-4 h-4 sm:w-6 sm:h-6 text-[#E5C378]" />
            </div>
            <h4 className="font-serif text-xs sm:text-base uppercase tracking-wider text-white font-normal">Express Delivery</h4>
            <p className="text-[9px] sm:text-[11px] text-[#E5C378] uppercase tracking-widest font-sans font-semibold">Free Shipping Across India</p>
          </div>

          <div data-reveal="up" style={{ transitionDelay: "200ms" }} className="bg-ivory/5 border border-gold/30 p-3.5 sm:p-6 text-center space-y-1.5 sm:space-y-2 group hover:border-gold hover:bg-ivory/10 transition-all shadow-md">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-gold bg-[#2B0B14] flex items-center justify-center text-gold mx-auto group-hover:scale-110 transition-transform shadow-inner">
              <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6 text-[#E5C378]" />
            </div>
            <h4 className="font-serif text-xs sm:text-base uppercase tracking-wider text-white font-normal">Cash On Delivery</h4>
            <p className="text-[9px] sm:text-[11px] text-[#E5C378] uppercase tracking-widest font-sans font-semibold">100% Safe Payment Verification</p>
          </div>

          <div data-reveal="up" style={{ transitionDelay: "300ms" }} className="bg-ivory/5 border border-gold/30 p-3.5 sm:p-6 text-center space-y-1.5 sm:space-y-2 group hover:border-gold hover:bg-ivory/10 transition-all shadow-md">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-gold bg-[#2B0B14] flex items-center justify-center text-gold mx-auto group-hover:scale-110 transition-transform shadow-inner">
              <RefreshCw className="w-4 h-4 sm:w-6 sm:h-6 text-[#E5C378]" />
            </div>
            <h4 className="font-serif text-xs sm:text-base uppercase tracking-wider text-white font-normal">Bespoke Guarantee</h4>
            <p className="text-[9px] sm:text-[11px] text-[#E5C378] uppercase tracking-widest font-sans font-semibold">Tailored Fit Assistance</p>
          </div>
        </div>
      </section>

      {/* 4. OUR STORY NARRATIVE SECTION WITH LUXURY ARCH FRAME */}
      <section className="w-full px-3 sm:px-6 lg:px-12 py-4 overflow-hidden">
        <div className="bg-ivory-200 border-2 border-gold/40 p-4 sm:p-8 lg:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center hover:shadow-luxury transition-shadow duration-500 relative overflow-hidden max-w-full rounded-sm">
          {/* Background dot grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#8F6E3A_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* Left Arch Frame with Floating Motion & Pulse Glow */}
          <div data-reveal="left" className="lg:col-span-5 flex flex-col items-center justify-center relative z-10 w-full max-w-full">
            <div className="relative w-40 sm:w-full max-w-[200px] sm:max-w-xs aspect-[3/4] rounded-t-[999px] border-2 border-gold p-1.5 sm:p-2 bg-ivory shadow-2xl overflow-hidden group founder-motion mx-auto">
              <div className="relative w-full h-full rounded-t-[990px] overflow-hidden">
                <Image
                  src="/founderphoto.jpg"
                  alt="Kaavu Styles Founder & Drapery"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
              </div>
            </div>
            <span className="mt-2.5 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gold font-bold bg-ivory px-3 sm:px-4 py-1 border border-gold/40 shadow-sm text-center max-w-full truncate">
              Kaavu Styles Founder & Drapery
            </span>
          </div>

          {/* Right Text Content */}
          <div data-reveal="right" className="lg:col-span-7 space-y-3.5 sm:space-y-5 text-ink relative z-10 text-center lg:text-left w-full max-w-full break-words">
            <div className="space-y-1.5 sm:space-y-2 max-w-full">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold font-bold flex items-center justify-center lg:justify-start space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>Our Story Narrative</span>
              </span>
              <h2 className="font-serif text-xl sm:text-4xl lg:text-5xl uppercase font-light leading-tight text-ink break-words">
                Made for every <br className="hidden sm:inline" />
                <em className="text-crimson font-normal italic">version of you.</em>
              </h2>
              <div className="w-16 sm:w-24 h-0.5 bg-gold my-2 mx-auto lg:mx-0" />
            </div>

            <p className="text-xs sm:text-base text-ink font-normal leading-relaxed font-sans max-w-full break-words">
              Kaavu Styles began with a simple idea: getting dressed should feel like a quiet ritual, not a decision. Each piece is chosen for its fall, its finish, and the way it makes you feel.
            </p>

            <div className="bg-ivory/80 border-l-2 border-gold p-3 sm:p-4 text-left my-2 max-w-full rounded-r overflow-hidden">
              <p className="text-xs sm:text-sm text-burgundy font-serif italic font-medium leading-normal break-words">
                &ldquo;Rich maroon, soft gold, unhurried silhouettes. Clothing and adornment that belongs to every mood, every day.&rdquo;
              </p>
            </div>

            <div className="pt-1 sm:pt-2 flex justify-center lg:justify-start max-w-full">
              <Link
                href="/story"
                className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-crimson hover:bg-crimson-800 text-ivory text-xs uppercase tracking-[0.24em] font-bold transition-all shadow-md hover:scale-105 cursor-pointer border border-gold/40"
              >
                <span>Read Full Story</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LATEST PRODUCTS ADDED (HORIZONTAL SCROLL SLIDER) */}
      <section className="w-full px-4 sm:px-6 lg:px-12 space-y-6">
        <div data-reveal="up" className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-ivory-300 pb-3 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold">
              Fresh From Our Atelier
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-ink uppercase font-light">
              Latest Products Added
            </h2>
          </div>

          {/* Slider Arrows & View All */}
          <div className="flex items-center space-x-3">
            <button
              onClick={scrollLeft}
              className="p-2.5 border border-gold/50 bg-ivory text-gold hover:bg-crimson hover:text-ivory hover:border-crimson transition-colors rounded-full shadow-sm cursor-pointer"
              title="Previous Products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2.5 border border-gold/50 bg-ivory text-gold hover:bg-crimson hover:text-ivory hover:border-crimson transition-colors rounded-full shadow-sm cursor-pointer"
              title="Next Products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-[0.2em] text-crimson font-bold hover:text-gold transition-colors pl-2"
            >
              View All ({products.length})
            </Link>
          </div>
        </div>

        {/* 10-Product Horizontal Scroll Carousel */}
        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-x-auto scrollbar-none scroll-smooth pb-4"
        >
          {displayLatest.map((product, index) => (
            <div
              key={product.id}
              data-reveal="up"
              style={{ transitionDelay: `${(index % 5) * 70}ms` }}
              className="w-[calc(50%-8px)] sm:w-[calc(33.33%-11px)] lg:w-[calc(20%-13px)] flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 6. SHOP BY LIFESTYLE TAGS SECTION */}
      <section className="w-full px-4 sm:px-6 lg:px-12 space-y-6 bg-ivory-200 border-y border-ivory-300 py-10">
        <div data-reveal="up" className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-ivory-300 pb-3 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold">
              Curated Lifestyle Aesthetics
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-ink uppercase font-light">
              Shop By Lifestyle
            </h2>
          </div>

          {/* Slider Arrows */}
          <div className="flex items-center space-x-3">
            <button
              onClick={scrollLeftLifestyle}
              className="p-2.5 border border-gold/50 bg-ivory text-gold hover:bg-crimson hover:text-ivory hover:border-crimson transition-colors rounded-full shadow-sm cursor-pointer"
              title="Previous Lifestyle Products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRightLifestyle}
              className="p-2.5 border border-gold/50 bg-ivory text-gold hover:bg-crimson hover:text-ivory hover:border-crimson transition-colors rounded-full shadow-sm cursor-pointer"
              title="Next Lifestyle Products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lifestyle Tag Tabs */}
        <div className="flex justify-start sm:justify-center space-x-3 sm:space-x-4 overflow-x-auto scrollbar-none pb-2 text-xs uppercase tracking-[0.2em]">
          <button
            onClick={() => {
              setActiveTag("all");
              if (lifestyleSliderRef.current) lifestyleSliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
            }}
            className={`px-5 py-2.5 border transition-all cursor-pointer ${
              activeTag === "all"
                ? "bg-crimson text-ivory border-crimson font-bold shadow-md"
                : "bg-ivory border-ivory-300 text-ink-muted hover:text-ink hover:bg-ivory-300"
            }`}
          >
            All Lifestyles
          </button>
          {lifestyleTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => {
                setActiveTag(tag.name);
                if (lifestyleSliderRef.current) lifestyleSliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
              }}
              className={`px-5 py-2.5 border transition-all whitespace-nowrap cursor-pointer ${
                activeTag.toLowerCase() === tag.name.toLowerCase()
                  ? "bg-crimson text-ivory border-crimson font-bold shadow-md"
                  : "bg-ivory border-ivory-300 text-ink-muted hover:text-ink hover:bg-ivory-300"
              }`}
            >
              #{tag.name}
            </button>
          ))}
        </div>

        {/* Tag Filtered Horizontal Slider Carousel */}
        {lifestyleFilteredProducts.length === 0 ? (
          <div className="text-center py-12 text-ink-muted text-sm font-sans">
            No products found under #{activeTag}. Explore other lifestyle tags or view all products.
          </div>
        ) : (
          <div
            ref={lifestyleSliderRef}
            className="flex space-x-4 overflow-x-auto scrollbar-none scroll-smooth pb-4"
          >
            {lifestyleFilteredProducts.map((product, index) => (
              <div
                key={product.id}
                data-reveal="up"
                style={{ transitionDelay: `${(index % 5) * 70}ms` }}
                className="w-[calc(50%-8px)] sm:w-[calc(33.33%-11px)] lg:w-[calc(20%-13px)] flex-shrink-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 7. INSTAGRAM JOURNAL & GALLERY SECTION */}
      <section className="bg-ivory border-b border-ivory-300 py-12 space-y-8">
        <div data-reveal="up" className="w-full px-4 sm:px-6 lg:px-12 text-center space-y-3">
          <div className="flex items-center justify-center space-x-2 text-crimson">
            <Instagram className="w-5 h-5 text-gold" />
            <span className="text-xs uppercase tracking-[0.3em] font-bold">
              @kaavu_styles On Instagram
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-ink uppercase font-light">
            Follow Our Style Journal
          </h2>
          <p className="text-xs text-ink-muted max-w-md mx-auto">
            Tag #KaavuStyles on Instagram to be featured on our official gallery.
          </p>
        </div>

        {/* Instagram Grid or Official Follow Card */}
        {instagramPosts.length === 0 ? (
          <div data-reveal="up" className="max-w-xl mx-auto px-4">
            <a
              href="https://www.instagram.com/kaavu_styles?stkn=MWR6eWVtamh2cGZyag=="
              target="_blank"
              rel="noreferrer"
              className="group bg-ivory border border-gold/40 p-8 text-center block space-y-4 shadow-luxury hover:border-crimson transition-all"
            >
              <Instagram className="w-10 h-10 text-crimson mx-auto group-hover:scale-110 transition-transform" />
              <div className="space-y-1">
                <h3 className="font-serif text-xl uppercase text-ink">Connect With @kaavu_styles</h3>
                <p className="text-xs text-ink-muted">
                  Discover our latest saree drapes, artisanal kurtis, and flagship collections on Instagram.
                </p>
              </div>
              <span className="inline-block px-6 py-2.5 bg-crimson text-ivory text-xs uppercase tracking-[0.2em] font-bold group-hover:bg-crimson-800 transition-colors">
                Follow On Instagram →
              </span>
            </a>
          </div>
        ) : (
          <div className="w-full px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPosts.map((post, index) => (
              <a
                key={post.id}
                data-reveal="up"
                style={{ transitionDelay: `${(index % 4) * 90}ms` }}
                href={post.postUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square bg-ink overflow-hidden border border-ivory-300 block hover-lift"
              >
                <Image
                  src={post.imageUrl}
                  alt={post.caption || "Instagram"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-[#2B0B14]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-5 text-ivory">
                  <Instagram className="w-5 h-5 text-gold" />
                  <p className="text-xs line-clamp-3 font-sans leading-relaxed">
                    {post.caption}
                  </p>
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                    View Post →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </HomeMotion>
    </>
  );
}
