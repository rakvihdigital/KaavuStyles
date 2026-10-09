import type { Product, OrderItem } from "./mockData";

export function resolveProductColor(product: Product, selected: unknown): string {
  const colors = product.colors || [];
  if (!colors.length) return "Standard";
  const requested = typeof selected === "string" ? selected.trim() : "";
  const match = colors.find(color => color.trim().toLowerCase() === requested.toLowerCase());
  if (match) return match;
  if ((!requested || requested === "Standard") && colors.length === 1) return colors[0];
  throw new Error(`${product.name}: the saved color is no longer available. Remove this item from your cart and add it again with your preferred color.`);
}

export function stockForSize(product: Product, size: string): number {
  return Math.max(0, Math.min(product.stock, product.sizeStock ? product.sizeStock[size] ?? 0 : product.stock));
}

export function reduceInventory(products: Product[], items: OrderItem[]): Product[] {
  const next = products.map(product => ({ ...product, sizeStock: product.sizeStock ? { ...product.sizeStock } : undefined }));
  for (const item of items) {
    const product = next.find(value => value.id === item.productId);
    if (!product || !Number.isInteger(item.quantity) || item.quantity <= 0) throw new Error("Invalid order item.");
    if (!(product.sizes.length ? product.sizes : ["Standard"]).includes(item.size)) throw new Error("Please select an available size.");
    if (!(product.colors.length ? product.colors : ["Standard"]).includes(item.color)) throw new Error("Please select an available color.");
    if (stockForSize(product, item.size) < item.quantity || product.stock < item.quantity) throw new Error(`${product.name}: size ${item.size} has insufficient stock.`);
    if (product.sizeStock) product.sizeStock[item.size] -= item.quantity;
    product.stock -= item.quantity;
  }
  return next;
}
