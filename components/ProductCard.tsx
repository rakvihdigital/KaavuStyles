"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/mockData";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import { Heart, ShoppingBag } from "lucide-react";
import ProductDetailModal from "@/components/ProductDetailModal";

export default function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  return (
    <>
      <div
        onClick={() => setIsDetailOpen(true)}
        className="group relative flex flex-col bg-ivory-50 border border-ivory-300 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury cursor-pointer"
      >
        {/* Product Image */}
        <div className="relative aspect-[4/5] w-full bg-ivory-200 overflow-hidden">
          <Image
            src={product.images[0] || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600"}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />

          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Top Right Action Buttons: Wishlist & Add to Cart */}
          <div className="absolute top-2.5 right-2.5 flex flex-col space-y-2 z-10">
            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                isWishlisted
                  ? "bg-crimson text-ivory"
                  : "bg-ivory/80 text-ink hover:text-crimson hover:bg-ivory"
              }`}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="p-2 rounded-full bg-ivory/80 text-ink hover:text-crimson hover:bg-ivory backdrop-blur-md transition-all shadow-md cursor-pointer"
              title="Add to Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold block">
              {product.category}
            </span>
            <h3 className="font-serif text-base text-ink font-normal leading-tight group-hover:text-crimson transition-colors line-clamp-1 mt-0.5">
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

      {/* Product Detail Modal */}
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
