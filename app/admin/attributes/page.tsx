"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useStore } from "@/context/StoreContext";
import { Plus, Trash2, Tag, Layers, Palette } from "lucide-react";

export default function AdminAttributesPage() {
  const {
    lifestyleTags,
    addTag,
    deleteTag,
    sizes,
    addSize,
    deleteSize,
    colors,
    addColor,
    deleteColor,
  } = useStore();

  const [newTag, setNewTag] = useState("");

  const [newSizeName, setNewSizeName] = useState("");
  const [newSizeCode, setNewSizeCode] = useState("");

  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#5E1A2D");

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag) return;
    addTag(newTag);
    setNewTag("");
  };

  const handleAddSize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSizeName || !newSizeCode) return;
    addSize(newSizeName, newSizeCode);
    setNewSizeName("");
    setNewSizeCode("");
  };

  const handleAddColor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColorName) return;
    addColor(newColorName, newColorHex);
    setNewColorName("");
  };

  return (
    <div className="flex min-h-screen bg-ivory-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader title="Lifestyle Tags, Sizes & Colors Management" />

        <main className="p-4 sm:p-8 space-y-8">
          {/* SECTION 1: LIFESTYLE TAGS */}
          <div className="bg-ivory border border-ivory-300 p-6 space-y-6 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-ivory-300 pb-3">
              <Tag className="w-5 h-5 text-crimson" />
              <h2 className="font-serif text-xl text-ink uppercase">Lifestyle Tags ({lifestyleTags.length})</h2>
            </div>

            <form onSubmit={handleAddTag} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="text"
                required
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="e.g. Bridal, Festive, Partywear..."
                className="flex-1 border border-ivory-300 rounded p-2.5 text-xs text-ink outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-crimson text-ivory text-xs uppercase tracking-wider font-semibold"
              >
                Add Tag
              </button>
            </form>

            <div className="flex flex-wrap gap-3 pt-2">
              {lifestyleTags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center space-x-2 bg-ivory-200 border border-ivory-300 px-3 py-1.5 rounded text-xs"
                >
                  <span className="font-medium text-ink">#{tag.name}</span>
                  <button
                    onClick={() => deleteTag(tag.id)}
                    className="text-crimson hover:text-crimson-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: SIZES MANAGEMENT */}
          <div className="bg-ivory border border-ivory-300 p-6 space-y-6 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-ivory-300 pb-3">
              <Layers className="w-5 h-5 text-gold" />
              <h2 className="font-serif text-xl text-ink uppercase">Size Options ({sizes.length})</h2>
            </div>

            <form onSubmit={handleAddSize} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg">
              <input
                type="text"
                required
                value={newSizeName}
                onChange={(e) => setNewSizeName(e.target.value)}
                placeholder="Name (e.g. Medium)"
                className="border border-ivory-300 rounded p-2.5 text-xs text-ink outline-none"
              />
              <input
                type="text"
                required
                value={newSizeCode}
                onChange={(e) => setNewSizeCode(e.target.value)}
                placeholder="Code (e.g. M)"
                className="border border-ivory-300 rounded p-2.5 text-xs text-ink outline-none"
              />
              <button
                type="submit"
                className="py-2.5 bg-gold text-ivory text-xs uppercase tracking-wider font-semibold"
              >
                Add Size
              </button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {sizes.map((sz) => (
                <div
                  key={sz.id}
                  className="p-3 bg-ivory-200 border border-ivory-300 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-ink block">{sz.code}</span>
                    <span className="text-[10px] text-ink-muted">{sz.name}</span>
                  </div>
                  <button onClick={() => deleteSize(sz.id)} className="text-crimson">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: COLORS MANAGEMENT */}
          <div className="bg-ivory border border-ivory-300 p-6 space-y-6 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-ivory-300 pb-3">
              <Palette className="w-5 h-5 text-crimson" />
              <h2 className="font-serif text-xl text-ink uppercase">Color Palette Options ({colors.length})</h2>
            </div>

            <form onSubmit={handleAddColor} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg">
              <input
                type="text"
                required
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="Color Name (e.g. Crimson Maroon)"
                className="border border-ivory-300 rounded p-2.5 text-xs text-ink outline-none"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className="w-10 h-10 border rounded cursor-pointer p-0"
                />
                <span className="text-xs font-mono text-ink">{newColorHex}</span>
              </div>
              <button
                type="submit"
                className="py-2.5 bg-crimson text-ivory text-xs uppercase tracking-wider font-semibold"
              >
                Add Color
              </button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              {colors.map((col) => (
                <div
                  key={col.id}
                  className="p-3 bg-ivory-200 border border-ivory-300 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-5 h-5 rounded-full border border-gold"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="font-medium text-ink">{col.name}</span>
                  </div>
                  <button onClick={() => deleteColor(col.id)} className="text-crimson">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
