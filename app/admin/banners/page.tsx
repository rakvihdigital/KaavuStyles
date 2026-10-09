"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import ImageUploader from "@/components/ImageUploader";
import { useStore } from "@/context/StoreContext";
import { Banner } from "@/lib/mockData";
import Image from "next/image";
import { Plus, Trash2, X, AlignLeft, AlignCenter, AlignRight, Pencil } from "lucide-react";

export default function AdminBannersPage() {
  const { banners, addBanner, updateBanner, deleteBanner } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const [mobileImages, setMobileImages] = useState<string[]>([]);
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const [ctaText, setCtaText] = useState("EXPLORE COLLECTION");
  const [ctaLink, setCtaLink] = useState("/shop");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left");
  const [textColor, setTextColor] = useState<string>("#F8F3EC");
  const [isActive, setIsActive] = useState<boolean>(true);

  const handleOpenAdd = () => {
    setEditingBannerId(null);
    setTitle("");
    setSubtitle("");
    setBannerImages([]);
    setMobileImages([]);
    setSaveError("");
    setCtaText("EXPLORE COLLECTION");
    setCtaLink("/shop");
    setTextAlign("left");
    setTextColor("#F8F3EC");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (banner: Banner) => {
    setEditingBannerId(banner.id);
    setTitle(banner.title);
    setSubtitle(banner.subtitle || "");
    setBannerImages(banner.imageUrl ? [banner.imageUrl] : []);
    setMobileImages(banner.mobileImageUrl ? [banner.mobileImageUrl] : []);
    setSaveError("");
    setCtaText(banner.ctaText || "EXPLORE COLLECTION");
    setCtaLink(banner.ctaLink || "/shop");
    setTextAlign(banner.textAlign || "left");
    setTextColor(banner.textColor || "#F8F3EC");
    setIsActive(banner.isActive ?? true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || bannerImages.length === 0) return;

    setSaving(true);
    setSaveError("");
    try {
    if (editingBannerId) {
      await updateBanner(editingBannerId, {
        title,
        subtitle,
        imageUrl: bannerImages[0],
        mobileImageUrl: mobileImages[0] || "",
        ctaText,
        ctaLink,
        textAlign,
        textColor,
        isActive,
      });
    } else {
      await addBanner({
        title,
        subtitle,
        imageUrl: bannerImages[0],
        mobileImageUrl: mobileImages[0] || "",
        ctaText,
        ctaLink,
        isActive,
        orderNum: banners.length + 1,
        textAlign,
        textColor,
      });
    }

    setIsModalOpen(false);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not save banner. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-ivory-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader title="Home Page Hero Banners Management" />

        <main className="p-4 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-between sm:items-center bg-ivory p-4 border border-ivory-300">
            <div>
              <h2 className="font-serif text-xl text-ink uppercase" suppressHydrationWarning>Home Hero Banners ({banners.length})</h2>
              <p className="text-xs text-ink-muted">Manage homepage image slider banners, text alignments, and colors. Upload landscape images at 1600 × 500 px and mobile images at 800 × 1000 px.</p>
            </div>
            <button
              onClick={handleOpenAdd}
              className="px-6 py-3 bg-crimson hover:bg-crimson-800 text-ivory text-xs uppercase tracking-[0.2em] font-semibold flex items-center space-x-2 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Hero Banner</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((b) => (
              <div
                key={b.id}
                className="bg-ivory border border-ivory-300 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-[1600/500] w-full bg-ink">
                  <Image
                    src={b.imageUrl}
                    alt={b.title}
                    fill
                    className="object-cover object-top opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div
                    className={`absolute bottom-4 left-4 right-4 text-ivory space-y-1 ${
                      b.textAlign === "center"
                        ? "text-center"
                        : b.textAlign === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    <span className="text-[10px] text-gold uppercase tracking-widest block font-semibold">
                      {b.subtitle}
                    </span>
                    <h3
                      className="font-serif text-2xl uppercase font-bold"
                      style={{ color: b.textColor || "#F8F3EC" }}
                    >
                      {b.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-ivory-50 border-t border-ivory-300 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={b.isActive}
                        onChange={(e) => updateBanner(b.id, { isActive: e.target.checked })}
                        className="accent-crimson"
                      />
                      <span className="text-[11px] font-semibold text-ink uppercase">Active Slide</span>
                    </label>

                    {/* Quick Alignment Switcher */}
                    <div className="flex items-center space-x-1 border border-ivory-300 rounded p-0.5 bg-ivory">
                      <button
                        onClick={() => updateBanner(b.id, { textAlign: "left" })}
                        className={`p-1 rounded ${
                          (b.textAlign || "left") === "left"
                            ? "bg-crimson text-ivory font-bold"
                            : "text-ink-muted hover:text-ink"
                        }`}
                        title="Left Align Text"
                      >
                        <AlignLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateBanner(b.id, { textAlign: "center" })}
                        className={`p-1 rounded ${
                          b.textAlign === "center"
                            ? "bg-crimson text-ivory font-bold"
                            : "text-ink-muted hover:text-ink"
                        }`}
                        title="Center Align Text"
                      >
                        <AlignCenter className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateBanner(b.id, { textAlign: "right" })}
                        className={`p-1 rounded ${
                          b.textAlign === "right"
                            ? "bg-crimson text-ivory font-bold"
                            : "text-ink-muted hover:text-ink"
                        }`}
                        title="Right Align Text"
                      >
                        <AlignRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleOpenEdit(b)}
                      className="px-3 py-1.5 bg-ink text-ivory hover:bg-gold hover:text-ink font-semibold flex items-center space-x-1.5 transition-colors shadow-sm text-xs"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit Banner</span>
                    </button>
                    <button
                      onClick={() => deleteBanner(b.id)}
                      className="text-crimson hover:underline flex items-center space-x-1 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Sleek Horizontal Rectangular Banner Configurator Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-ivory border-2 border-gold shadow-2xl rounded-none my-auto overflow-hidden">
            {/* Rectangular Header */}
            <div className="bg-ink text-ivory px-6 py-4 flex items-center justify-between border-b-2 border-gold">
              <div>
                <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-semibold block">
                  HERO BANNER CONFIGURATOR
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-ivory uppercase">
                  {editingBannerId ? "Edit Hero Banner" : "Add New Hero Banner"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-none bg-ivory/10 hover:bg-crimson text-ivory transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Controls Column */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-ink mb-1">
                        Banner Headline Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. KAAVU STYLES ROYAL SILKS"
                        className="w-full border border-ivory-300 bg-white p-3 text-xs text-ink focus:border-gold outline-none shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-ink mb-1">
                        Subtitle Eyebrow Text
                      </label>
                      <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="e.g. HANDCRAFTED HERITAGE ELEGANCE"
                        className="w-full border border-ivory-300 bg-white p-3 text-xs text-ink focus:border-gold outline-none shadow-inner"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-ink mb-1">
                          Button CTA Text
                        </label>
                        <input
                          type="text"
                          value={ctaText}
                          onChange={(e) => setCtaText(e.target.value)}
                          className="w-full border border-ivory-300 bg-white p-3 text-xs text-ink focus:border-gold outline-none shadow-inner"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-ink mb-1">
                          Button CTA Link
                        </label>
                        <input
                          type="text"
                          value={ctaLink}
                          onChange={(e) => setCtaLink(e.target.value)}
                          className="w-full border border-ivory-300 bg-white p-3 text-xs text-ink focus:border-gold outline-none shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Text Alignment Choice */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-ink mb-1">
                        Text Position & Alignment
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "left", label: "Left Side", icon: AlignLeft },
                          { id: "center", label: "Center", icon: AlignCenter },
                          { id: "right", label: "Right Side", icon: AlignRight },
                        ].map(({ id, label, icon: Icon }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setTextAlign(id as "left" | "center" | "right")}
                            className={`py-2.5 px-3 border flex items-center justify-center space-x-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                              textAlign === id
                                ? "bg-crimson text-ivory border-crimson shadow-md"
                                : "bg-white border-ivory-300 text-ink hover:border-ink"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Headline Text Color Choice */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-ink mb-1">
                        Headline Text Color
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: "Ivory Cream", hex: "#F8F3EC" },
                          { label: "Antique Gold", hex: "#E5C378" },
                          { label: "Deep Crimson", hex: "#5E1A2D" },
                          { label: "Pure White", hex: "#FFFFFF" },
                          { label: "Velvet Charcoal", hex: "#121212" },
                        ].map((color) => (
                          <button
                            key={color.hex}
                            type="button"
                            onClick={() => setTextColor(color.hex)}
                            className={`px-3 py-2 border text-xs flex items-center space-x-2 transition-all ${
                              textColor === color.hex
                                ? "border-gold bg-ink text-gold font-bold shadow"
                                : "border-ivory-300 bg-white text-ink hover:border-ink"
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-ink/20 shadow-inner"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span>{color.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Status Toggle */}
                    <div className="flex items-center space-x-3 pt-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                          className="w-4 h-4 accent-crimson cursor-pointer"
                        />
                        <span className="text-xs font-bold uppercase tracking-wider text-ink">
                          Set Banner as Active in Hero Slider
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Right Live Preview & Upload Column */}
                  <div className="lg:col-span-5 space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-ink mb-1">
                        Live Widescreen Banner Preview
                      </label>
                      <div className="relative aspect-[1600/500] w-full bg-ink border-2 border-gold overflow-hidden shadow-lg group">
                        {bannerImages[0] ? (
                          <Image
                            src={bannerImages[0]}
                            alt="Banner Preview"
                            fill
                            className="object-cover object-top opacity-80"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-ivory-400 p-4 text-center">
                            <span className="text-xs uppercase tracking-widest text-gold font-mono">No Image Uploaded Yet</span>
                            <span className="text-[10px] text-ivory-500 mt-1">Upload a 1600 × 500 px banner below</span>
                          </div>
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />

                        {/* Dynamic Text Preview */}
                        <div
                          className={`absolute bottom-4 left-4 right-4 space-y-1 ${
                            textAlign === "center"
                              ? "text-center"
                              : textAlign === "right"
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          {subtitle && (
                            <span className="text-[9px] text-gold uppercase tracking-[0.25em] font-bold block">
                              {subtitle}
                            </span>
                          )}
                          <h4
                            className="font-serif text-lg uppercase font-bold leading-tight drop-shadow"
                            style={{ color: textColor }}
                          >
                            {title || "YOUR BANNER TITLE"}
                          </h4>
                          {ctaText && (
                            <span className="inline-block mt-2 px-3 py-1 bg-gold text-ink text-[9px] font-bold uppercase tracking-widest">
                              {ctaText} →
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-2">Mobile Preview — 800 × 1000 px</p>
                      <div className="relative aspect-[4/5] w-40 mx-auto bg-ink border border-gold overflow-hidden">
                        {(mobileImages[0] || bannerImages[0]) ? <Image src={mobileImages[0] || bannerImages[0]} alt="Mobile banner preview" fill sizes="160px" className="object-cover object-top" /> : <p className="p-4 text-xs text-ivory">Upload a mobile photo below</p>}
                      </div>
                    </div>
                    <ImageUploader images={mobileImages} onChange={setMobileImages} single={true} noOptimize={true} label="Mobile Banner — 800 × 1000 px (optional)" />
                    <p className="text-xs text-ink-muted">Mobile uses the landscape image when no mobile photo is uploaded.</p>
                    {/* Image Uploader (Raw Original Quality - No Optimization) */}
                    <ImageUploader
                      images={bannerImages}
                      onChange={setBannerImages}
                      single={true}
                      noOptimize={true}
                      label="Landscape Banner — 1600 × 500 px"
                    />
                  </div>
                </div>

                {saveError && <p role="alert" className="text-sm text-crimson">{saveError}</p>}
                {/* Bottom Action Row */}
                <div className="pt-4 border-t border-ivory-300 flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 border border-ink text-ink hover:bg-ink hover:text-ivory text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit" disabled={saving}
                    className="px-8 py-3 bg-crimson hover:bg-crimson-800 text-ivory text-xs uppercase tracking-[0.2em] font-semibold shadow-lg transition-colors flex items-center space-x-2"
                  >
                    <span>{saving ? "Saving…" : editingBannerId ? "Save Banner Changes" : "Create Hero Banner"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
