import fs from "node:fs/promises";
import path from "node:path";

export type Product = {
  slug: string;
  title: string;
  image?: string;
  category?: string;
  spec?: string;
  price?: string;
  priceUnit?: string;
  minOrder?: string;
  features?: string[];
  specifications?: Record<string, string>;
  additionalInfo?: Record<string, string>;
  discountPercent?: number;
};

export async function loadProducts(): Promise<Product[]> {
  const dataFile = path.join(process.cwd(), "src", "data", "products.json");
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw) as Product[];
    return parsed;
  } catch {
    // return example if not scraped yet
    return [
      {
        slug: "corrugated-box-3ply",
        title: "Corrugated Box (3 Ply)",
        image: "/placeholder.svg",
        category: "Corrugated Boxes",
        spec: "Durable 3-ply corrugated shipping box for lightweight goods",
        price: "₹ On Request",
      },
      {
        slug: "stretch-film-roll",
        title: "Stretch Film Roll",
        image: "/placeholder.svg",
        category: "Stretch Films & Tapes",
        spec: "High clarity stretch film for pallet wrapping and protection",
        price: "₹ On Request",
      },
    ];
  }
}


