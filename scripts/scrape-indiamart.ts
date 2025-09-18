/*
  Simple IndiaMART scraper for Ezzy Packaging Solutions
  - Reads the main profile and products page
  - Extracts product cards: title, image, spec, price if available
  - Writes to src/data/products.json and downloads images to public/products
*/
import axios from "axios";
import { load as cheerioLoad } from "cheerio";
import path from "node:path";
import fs from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";
import sanitize from "sanitize-filename";

type OutProduct = { slug: string; title: string; image?: string; spec?: string; price?: string; category?: string };

const BASE = "https://www.indiamart.com/ezzypackagingsolutions/";
const PRODUCTS = "https://www.indiamart.com/ezzypackagingsolutions/products-and-services.html";

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function downloadImage(url: string, destPath: string) {
  const res = await axios.get(url, { responseType: "arraybuffer" });
  await fs.writeFile(destPath, res.data);
}

async function scrapeProducts(): Promise<OutProduct[]> {
  const { data } = await axios.get(PRODUCTS, { headers: { "User-Agent": "Mozilla/5.0" } });
  const $ = cheerioLoad(data);
  const out: OutProduct[] = [];

  const categoryBlocks = $(".prd-block, .prd-serv, .clp-categories, .listview");
  categoryBlocks.each((_, el) => {
    const categoryTitle = $(el).find("h2,h3,.hd").first().text().trim();
    $(el).find(".prd-lst, .pr-lst, .prd, .catg, li, .grid .prd").each((__ , item) => {
      const title = $(item).find(".prd-name, h3, h4, a").first().text().trim();
      if (!title) return;
      const img = $(item).find("img").attr("src") || $(item).find("img").attr("data-src");
      const spec = $(item).find(".prd-desc, .desc, p").first().text().trim();
      const price = $(item).find(".price, .p-price, .prc").first().text().trim();
      const slug = sanitize(title.toLowerCase().replace(/\s+/g, "-")).slice(0, 80);
      out.push({ slug, title, image: img, spec, price, category: categoryTitle || undefined });
    });
  });

  return out;
}

async function main() {
  const products = await scrapeProducts();
  const dataDir = path.join(process.cwd(), "src", "data");
  const publicDir = path.join(process.cwd(), "public", "products");
  await ensureDir(dataDir);
  await ensureDir(publicDir);

  const withLocalImages: OutProduct[] = [];
  for (const p of products) {
    if (p.image && /^https?:\/\//.test(p.image)) {
      const ext = path.extname(new URL(p.image).pathname) || ".jpg";
      const file = sanitize(`${p.slug}${ext}`);
      const filePath = path.join(publicDir, file);
      try {
        await downloadImage(p.image, filePath);
        withLocalImages.push({ ...p, image: `/products/${file}` });
      } catch (e) {
        withLocalImages.push(p);
      }
      await sleep(200);
    } else {
      withLocalImages.push(p);
    }
  }

  await fs.writeFile(path.join(dataDir, "products.json"), JSON.stringify(withLocalImages, null, 2));
  console.log(`Saved ${withLocalImages.length} products.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


