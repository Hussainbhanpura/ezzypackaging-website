import { notFound } from "next/navigation";
import { loadProducts } from "@/lib/products";
import { ProductDetailClient } from "./product-detail-client";
import { SEO } from "@/components/SEO";

// Server Component for data fetching
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductDetailPage({ params }: any) {
  const { slug } = await params;
  const products = await loadProducts();
  const product = products.find(p => p.slug === slug);
  
  if (!product) return notFound();

  // Custom meta for specific products
  const customMeta: Record<string, { title: string; description: string }> = {
    "c1-glass-etching-film": {
      title: "C1 Glass Etching Film 80 Micron | Ezzy Packaging Solutions",
      description:
        "Durable 80 micron C1 glass etching film with platinum-coated paper. Ideal for partitions & facades. Manufactured in Mumbai. Order now for Pan-India delivery.",
    },
    "c2-glass-etching-film": {
      title: "C2 Glass Etching Film | Privacy & Design Solutions India",
      description:
        "Premium C2 glass etching film for elegant frosted finish. Easy to apply, residue-free removal. Supplied across India by Ezzy Packaging Solutions.",
    },
  };

  const meta = customMeta[product.slug] || {
    title: `${product.title} | Ezzy Packaging Solutions`,
    description: product.spec || "Premium glass etching film by Ezzy Packaging Solutions.",
  };

  return (
    <>
      <SEO title={meta.title} description={meta.description} />
      <ProductDetailClient product={product} />
    </>
  );
}

export async function generateStaticParams() {
  const products = await loadProducts();
  return products.map(p => ({ slug: p.slug }));
}
