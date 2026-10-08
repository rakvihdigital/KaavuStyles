"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import ImageUploader from "@/components/ImageUploader";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Plus, Trash2, Edit, Search, X } from "lucide-react";

export default function AdminProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct, lifestyleTags, sizes, colors } = useStore();
  const [search, setSearch] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [selectedStockFilter, setSelectedStockFilter] = useState("all");
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Stock Metrics
  const totalProductsCount = products.length;
  const inStockCount = products.filter((p) => p.stock > 5).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStockCount = products.filter((p) => p.stock <= 0).length;

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState(categories[0]?.name || "Royal Sarees");
  const [stock, setStock] = useState("10");
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["S", "M", "L"]);
  const [selectedColors, setSelectedColors] = useState<string[]>(["Crimson Maroon", "Antique Gold"]);
  const [selectedTags, setSelectedTags] = useState<string[]>(["Festive", "Ethnic"]);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [isLatest, setIsLatest] = useState(true);
  const [isFeatured, setIsFeatured] = useState(true);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCategoryFilter === "all" ||
      p.category.toLowerCase() === selectedCategoryFilter.toLowerCase() ||
      p.categoryId === selectedCategoryFilter;
    const matchesStock =
      selectedStockFilter === "all" ||
      (selectedStockFilter === "in_stock" && p.stock > 5) ||
      (selectedStockFilter === "low_stock" && p.stock > 0 && p.stock <= 5) ||
      (selectedStockFilter === "out_of_stock" && p.stock <= 0);

    return matchesSearch && matchesCat && matchesStock;
  });

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPrice("");
    setOriginalPrice("");
    setCategory(categories[0]?.name || "Royal Sarees");
    setStock("10");
    setSelectedSizes(["S", "M", "L"]);
    setSelectedColors(["Crimson Maroon", "Antique Gold"]);
    setSelectedTags(["Festive", "Ethnic"]);
    setProductImages([]);
    setIsLatest(true);
    setIsFeatured(true);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setDescription(p.description);
    setPrice(p.price.toString());
    setOriginalPrice(p.originalPrice ? p.originalPrice.toString() : "");
    setCategory(p.category);
    setStock(p.stock.toString());
    setSelectedSizes(p.sizes);
    setSelectedColors(p.colors);
    setSelectedTags(p.lifestyleTags);
    setProductImages(p.images);
    setIsLatest(p.isLatest);
    setIsFeatured(p.isFeatured);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const catObj = categories.find((c) => c.name === category);

    const productPayload = {
      name,
      description,
      price: parseFloat(price) || 0,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      category,
      categoryId: catObj?.id || "cat-1",
      stock: parseInt(stock) || 10,
      sizes: selectedSizes,
      colors: selectedColors,
      lifestyleTags: selectedTags,
      images: productImages.length > 0 ? productImages : ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800"],
      isLatest,
      isFeatured,
    };

    if (editingId) {
      await updateProduct(editingId, productPayload);
    } else {
      await addProduct(productPayload);
    }

    setIsModalOpen(false);
  };

  const toggleSize = (s: string) => {
    setSelectedSizes((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  const toggleColor = (c: string) => {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const toggleTag = (t: string) => {
    setSelectedTags((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    );
  };

  return (
    <div className="flex min-h-screen bg-ivory-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader title="Products & Stock Management" />

        <main className="p-8 space-y-6">
          {/* Stock Metrics Count Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-ivory border border-ivory-300 p-4 space-y-1 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest font-bold text-ink-muted">Total Products</span>
              <p className="font-serif text-2xl font-bold text-ink" suppressHydrationWarning>
                {isMounted ? totalProductsCount : 0}
              </p>
              <span className="text-[9px] text-gold uppercase font-bold">Catalog Total</span>
            </div>
            <div className="bg-emerald-50/50 border border-emerald-200 p-4 space-y-1 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-800">In Stock (&gt;5)</span>
              <p className="font-serif text-2xl font-bold text-emerald-700" suppressHydrationWarning>
                {isMounted ? inStockCount : 0}
              </p>
              <span className="text-[9px] text-emerald-600 uppercase font-bold">Healthy Stock</span>
            </div>
            <div className="bg-amber-50/50 border border-amber-200 p-4 space-y-1 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-800">Low Stock (1-5)</span>
              <p className="font-serif text-2xl font-bold text-amber-700" suppressHydrationWarning>
                {isMounted ? lowStockCount : 0}
              </p>
              <span className="text-[9px] text-amber-600 uppercase font-bold">Needs Reorder</span>
            </div>
            <div className="bg-rose-50/50 border border-rose-200 p-4 space-y-1 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest font-bold text-rose-800">Out of Stock (0)</span>
              <p className="font-serif text-2xl font-bold text-crimson" suppressHydrationWarning>
                {isMounted ? outOfStockCount : 0}
              </p>
              <span className="text-[9px] text-rose-600 uppercase font-bold">Unavailable</span>
            </div>
          </div>

          {/* Top Bar with Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-ivory p-4 border border-ivory-300">
            <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
              {/* Search input */}
              <div className="relative flex-1 border border-ivory-300 rounded bg-ivory-50 p-2 flex items-center">
                <Search className="w-4 h-4 text-gold mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search products by title or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-xs text-ink outline-none"
                />
              </div>

              {/* Category Filter Dropdown */}
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="border border-ivory-300 rounded bg-ivory p-2.5 text-xs text-ink uppercase tracking-wider outline-none focus:border-gold font-semibold"
              >
                <option value="all">All Categories ({products.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Stock Filter Dropdown */}
              <select
                value={selectedStockFilter}
                onChange={(e) => setSelectedStockFilter(e.target.value)}
                className="border border-ivory-300 rounded bg-ivory p-2.5 text-xs text-ink uppercase tracking-wider outline-none focus:border-gold font-semibold"
              >
                <option value="all">All Stock Statuses ({products.length})</option>
                <option value="in_stock">In Stock ({inStockCount})</option>
                <option value="low_stock">Low Stock ({lowStockCount})</option>
                <option value="out_of_stock">Out of Stock ({outOfStockCount})</option>
              </select>
            </div>

            <button
              onClick={openAddModal}
              className="px-6 py-3 bg-crimson hover:bg-crimson-800 text-ivory text-xs uppercase tracking-[0.2em] font-semibold flex items-center space-x-2 shadow-sm flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-ivory border border-ivory-300 shadow-sm overflow-hidden">
            <div className="p-3 bg-ivory-200/60 border-b border-ivory-300 flex justify-between items-center text-xs font-semibold text-ink">
              <span>Showing {filteredProducts.length} of {products.length} products</span>
              {(selectedStockFilter !== "all" || selectedCategoryFilter !== "all" || search) && (
                <button
                  onClick={() => {
                    setSelectedStockFilter("all");
                    setSelectedCategoryFilter("all");
                    setSearch("");
                  }}
                  className="text-[10px] text-crimson hover:underline uppercase font-bold"
                >
                  Clear Filters
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-ivory-300 uppercase tracking-wider text-[10px] text-ink-muted bg-ivory-200">
                    <th className="py-3.5 px-4">Image</th>
                    <th className="py-3.5 px-4">Product Name</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Stock Status</th>
                    <th className="py-3.5 px-4">Tags</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ivory-200">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-ivory-200/50">
                      <td className="py-3 px-4">
                        <div className="relative w-12 h-16 bg-ivory-200 border border-ivory-300 overflow-hidden">
                          <Image
                            src={p.images[0] || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400"}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-serif text-sm text-ink block font-medium">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-ink-muted font-sans line-clamp-1">
                          {p.description}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gold uppercase tracking-wider font-semibold">
                        {p.category}
                      </td>
                      <td className="py-3 px-4 font-semibold text-crimson">
                        {formatPrice(p.price)}
                      </td>
                      <td className="py-3 px-4">
                        {p.stock <= 0 ? (
                          <span className="px-2.5 py-1 bg-rose-100 text-rose-800 border border-rose-300 text-[10px] rounded font-bold uppercase tracking-wider">
                            Out of Stock
                          </span>
                        ) : p.stock <= 5 ? (
                          <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] rounded font-bold uppercase tracking-wider">
                            Low Stock ({p.stock})
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] rounded font-bold uppercase tracking-wider">
                            In Stock ({p.stock})
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {p.lifestyleTags.map((t) => (
                            <span key={t} className="text-[9px] bg-ivory-200 px-1.5 py-0.5 border">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 text-ink hover:text-crimson border border-ivory-300 rounded"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-crimson hover:bg-crimson/10 border border-crimson/30 rounded"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-ivory rounded-none border border-gold shadow-2xl p-6 space-y-6 my-8">
            <div className="flex justify-between items-center border-b border-ivory-300 pb-3">
              <h3 className="font-serif text-2xl text-ink uppercase">
                {editingId ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-ink hover:text-crimson">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 text-xs">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted mb-1">
                  Product Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kanjeevaram Crimson Silk Saree"
                  className="w-full border border-ivory-300 rounded p-2.5 text-xs text-ink outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Crafting details, weave type, silk purity..."
                  className="w-full border border-ivory-300 rounded p-2.5 text-xs text-ink outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted mb-1">
                    Price (INR ₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-ivory-300 rounded p-2.5 text-xs text-ink outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted mb-1">
                    Original Price (MRP)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full border border-ivory-300 rounded p-2.5 text-xs text-ink outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full border border-ivory-300 rounded p-2.5 text-xs text-ink outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-ivory-300 rounded p-2.5 text-xs text-ink outline-none uppercase"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sizes Selection */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted mb-1">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((sz) => (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => toggleSize(sz.code)}
                      className={`px-3 py-1 text-xs border rounded ${
                        selectedSizes.includes(sz.code)
                          ? "bg-crimson text-ivory border-crimson font-semibold"
                          : "bg-ivory border-ivory-300 text-ink"
                      }`}
                    >
                      {sz.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lifestyle Tags Selection */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted mb-1">
                  Lifestyle Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {lifestyleTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.name)}
                      className={`px-3 py-1 text-xs border rounded ${
                        selectedTags.includes(tag.name)
                          ? "bg-gold text-ivory border-gold font-semibold"
                          : "bg-ivory border-ivory-300 text-ink"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors Selection */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted mb-1">
                  Available Colors
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((col) => (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => toggleColor(col.name)}
                      className={`px-3 py-1 text-xs border rounded ${
                        selectedColors.includes(col.name)
                          ? "bg-ink text-ivory border-ink font-semibold"
                          : "bg-ivory border-ivory-300 text-ink"
                      }`}
                    >
                      {col.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* IMAGE FILE UPLOADER (No raw URL typing required!) */}
              <ImageUploader
                images={productImages}
                onChange={setProductImages}
                label="Product Images (Select Image Files from Device)"
              />

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isLatest}
                    onChange={(e) => setIsLatest(e.target.checked)}
                    className="accent-crimson"
                  />
                  <span>Mark as New Arrival</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-crimson"
                  />
                  <span>Feature on Home Page</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-crimson text-ivory text-xs uppercase tracking-[0.24em] font-semibold shadow-md mt-4 hover:bg-crimson-800 transition-all"
              >
                {editingId ? "Save Product Changes to Supabase" : "Create Product Now in Supabase"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
