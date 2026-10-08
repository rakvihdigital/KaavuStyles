"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import {
  LayoutDashboard,
  ShoppingBag,
  Grid,
  ClipboardList,
  Image as ImageIcon,
  Tag,
  Instagram,
  LogOut,
  ArrowLeft,
  Shield,
  Ticket,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout, currentUser } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const links = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Categories", href: "/admin/categories", icon: Grid },
    { name: "Products & Stock", href: "/admin/products", icon: ShoppingBag },
    { name: "Order Listing", href: "/admin/orders", icon: ClipboardList },
    { name: "Hero Banners", href: "/admin/banners", icon: ImageIcon },
    { name: "Coupons & Offers", href: "/admin/coupons", icon: Ticket },
    { name: "Tags, Sizes & Colors", href: "/admin/attributes", icon: Tag },
    { name: "Instagram Links", href: "/admin/instagram", icon: Instagram },
  ];

  return (
    <aside className="sticky top-0 h-screen w-64 flex-shrink-0 bg-ink text-ivory flex flex-col justify-between border-r border-gold/30 z-40 overflow-y-auto">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-ink-light bg-ink-light/40 sticky top-0 bg-ink z-10">
          <Link href="/admin/dashboard" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full border border-gold overflow-hidden flex-shrink-0">
              <Image src="/icon.jpeg" alt="Icon" fill className="object-cover" />
            </div>
            <div>
              <span className="font-serif text-lg tracking-[0.16em] uppercase text-ivory block leading-tight">
                Kaavu Admin
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-sans block mt-0.5">
                Management Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 text-xs uppercase tracking-[0.15em] font-sans">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded transition-colors ${
                  isActive
                    ? "bg-crimson text-ivory font-semibold shadow-sm"
                    : "text-ivory/80 hover:bg-ink-light hover:text-gold"
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-gold" : "text-ivory/60"}`} />
                <span className="truncate">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User info */}
      <div className="p-4 border-t border-ink-light bg-ink-light/20 space-y-3 sticky bottom-0 bg-ink z-10">
        <div className="flex items-center space-x-2 text-xs text-gold">
          <Shield className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{isMounted && currentUser?.email ? currentUser.email : "Admin Mode Active"}</span>
        </div>

        <Link
          href="/"
          className="flex items-center space-x-2 text-xs text-ivory/70 hover:text-ivory transition-colors pt-2 border-t border-ink-light"
        >
          <ArrowLeft className="w-4 h-4 text-gold flex-shrink-0" />
          <span>View Live Storefront</span>
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center space-x-2 text-xs text-crimson-100 hover:text-crimson transition-colors pt-1"
        >
          <LogOut className="w-4 h-4 text-crimson flex-shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
