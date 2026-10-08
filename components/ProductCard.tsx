"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/mockData";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import ProductDetailModal from "@/components/ProductDetailModal";

export default function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <>
      <div className="group relative flex flex-col bg-ivory-50 border border-ivory-300 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury">
        {/* Product Image & Badges */}
        <div
          onClick={() => setIsDetailOpen(true)}
          className="relative aspect-[4/5] w-full bg-ivory-200 overflow-hidden cursor-pointer"
        >
          <Image
            src={product.images[0] || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600"}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />

          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-1 z-10">
            {product.isLatest && (
              <span className="px-2.5 py-1 bg-crimson text-ivory text-[9px] font-sans uppercase tracking-[0.2em] font-semibold shadow-sm">
                New Arrival
              </span>
            )}
            {discountPercent && (
              <span className="px-2.5 py-1 bg-gold text-ivory text-[9px] font-sans uppercase tracking-[0.2em] font-semibold shadow-sm">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
              isWishlisted
                ? "bg-crimson text-ivory shadow-md"
                : "bg-ivory/80 text-ink hover:text-crimson hover:bg-ivory"
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
          </button>

          {/* Quick View Floating Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDetailOpen(true);
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-ivory/90 hover:bg-ivory text-crimson text-[10px] uppercase tracking-[0.2em] font-semibold backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all shadow-md flex items-center space-x-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          {/* Add to Bag Hover Banner */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="absolute bottom-0 left-0 right-0 py-3 bg-crimson hover:bg-crimson-800 text-ivory text-[10px] uppercase tracking-[0.24em] font-semibold transition-transform duration-300 translate-y-full group-hover:translate-y-0 flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold block">
              {product.category}
            </span>
            <h3
              onClick={() => setIsDetailOpen(true)}
              className="font-serif text-lg text-ink font-normal leading-tight hover:text-crimson transition-colors line-clamp-1 cursor-pointer mt-0.5"
            >
              {product.name}
            </h3>
          </div>

          <div className="flex items-baseline justify-between pt-1 border-t border-ivory-200">
            <div className="flex items-baseline space-x-2">
              <span className="font-sans text-sm font-semibold text-crimson">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-ink-muted line-through font-normal">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">In Stock</span>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {isDetailOpen && (
        <ProductDetailModal
          product={product}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </>
  );
}
