import { ProductCard } from "@/components/product-card";
import { loadProducts } from "@/lib/products";

export async function ProductsGrid() {
  const products = await loadProducts();
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}


