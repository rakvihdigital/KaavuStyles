"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { User, ExternalLink, Shield } from "lucide-react";

export default function AdminHeader({ title }: { title: string }) {
  const { currentUser } = useStore();

  return (
    <header className="bg-ivory-200 border-b border-ivory-300 py-4 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div>
        <h1 className="font-serif text-2xl text-ink uppercase tracking-wide">
          {title}
        </h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-semibold">
          Kaavu Styles Control Center
        </p>
      </div>

      <div className="flex items-center space-x-6">
        <Link
          href="/"
          target="_blank"
          className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-ink hover:text-crimson transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-gold" />
        </Link>

        <div className="flex items-center space-x-2 bg-ivory border border-ivory-300 px-3 py-1.5 rounded">
          <Shield className="w-4 h-4 text-crimson" />
          <span className="text-xs text-ink font-medium">
            {currentUser?.name || "Demo Admin"}
          </span>
        </div>
      </div>
    </header>
  );
}
