"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import ProductDetailModal from "@/components/ProductDetailModal";
export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { products, isLoading } = useStore();
  const product = products.find(value => value.id === id);
  if (isLoading) return <p className="p-12 text-center">Loading product…</p>;
  if (!product) return <div className="p-12 text-center"><h1 className="font-serif text-3xl">Product not found</h1><Link href="/shop" className="text-crimson">Browse the collection</Link></div>;
  return <ProductDetailModal key={product.id} product={product} isOpen onClose={() => router.push("/shop")} />;
}
