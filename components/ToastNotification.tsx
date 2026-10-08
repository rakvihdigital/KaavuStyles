"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { ShoppingBag, Heart, X, ChevronRight } from "lucide-react";

export default function ToastNotification() {
  const { toastMessage, hideToast } = useStore();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toastMessage, hideToast]);

  if (!toastMessage) return null;

  const isCart = toastMessage.type === "cart";
  const isWishlist = toastMessage.type === "wishlist";

  return (
    <div className="fixed top-4 right-4 sm:top-20 sm:right-6 z-[100] w-[calc(100%-2rem)] sm:w-auto sm:max-w-md animate-fadeIn transition-all duration-300">
      <div className="bg-[#2B0B14] border-2 border-gold/70 text-ivory p-4 rounded-md shadow-luxury relative overflow-hidden flex items-center space-x-3.5 border-l-4 border-l-gold">
        {/* Progress Bar Timer */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold/20 overflow-hidden">
          <div className="h-full bg-gold animate-marquee" style={{ animationDuration: "4s" }} />
        </div>

        {/* Thumbnail Image */}
        {toastMessage.imageUrl ? (
          <div className="relative w-12 h-14 bg-ink rounded overflow-hidden border border-gold/40 flex-shrink-0 shadow-md">
            <Image
              src={toastMessage.imageUrl}
              alt={toastMessage.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full border border-gold bg-crimson flex items-center justify-center text-gold flex-shrink-0 shadow-md">
            {isCart && <ShoppingBag className="w-5 h-5 text-gold" />}
            {isWishlist && <Heart className="w-5 h-5 text-gold fill-current" />}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0 pr-6 space-y-0.5">
          <div className="flex items-center space-x-1.5">
            {isCart && <ShoppingBag className="w-3.5 h-3.5 text-gold flex-shrink-0" />}
            {isWishlist && <Heart className="w-3.5 h-3.5 text-gold fill-current flex-shrink-0" />}
            <h4 className="font-serif text-sm uppercase tracking-wider text-[#E5C378] font-medium truncate">
              {toastMessage.title}
            </h4>
          </div>
          <p className="text-xs text-ivory-200 font-sans truncate leading-tight">
            {toastMessage.message}
          </p>

          {/* Action Button */}
          {toastMessage.actionText && (
            <button
              onClick={() => {
                if (toastMessage.onAction) toastMessage.onAction();
                hideToast();
              }}
              className="inline-flex items-center space-x-1 text-[11px] uppercase tracking-[0.2em] text-gold font-bold hover:text-white pt-1 transition-colors cursor-pointer"
            >
              <span>{toastMessage.actionText}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={hideToast}
          className="absolute top-2.5 right-2.5 p-1 text-ivory-300 hover:text-white transition-colors cursor-pointer"
          title="Close Notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
