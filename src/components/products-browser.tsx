"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/product-card";

export function ProductsBrowser({ products }: { products: Product[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) if (p.category) set.add(p.category);
    return ["All", ...Array.from(set)];
  }, [products]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return products.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || (p.spec?.toLowerCase().includes(q) ?? false);
      const matchesCat = category === "All" || p.category === category;
      return matchesQuery && matchesCat;
    });
  }, [products, query, category]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-3">
        <Input placeholder="Search products" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Select value={category} onValueChange={(v) => setCategory(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ProductsGridWrapper products={filtered} />
    </div>
  );
}

function ProductsGridWrapper({ products }: { products: Product[] }) {
  // Separate wrapper so ProductsGrid can stay async for server data load in other contexts
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}



