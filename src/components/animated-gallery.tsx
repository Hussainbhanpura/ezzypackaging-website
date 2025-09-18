"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function AnimatedGallery() {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    fetch("/api/indiamart-images").then(r => r.json()).then(d => setImages(d.images || [])).catch(() => setImages([]));
  }, []);

  if (!images.length) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-2xl font-semibold">From IndiaMART</h2>
        <div className="h-2 w-28 bg-gradient-to-r from-primary to-accent rounded-full" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((src: string, idx: number) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.6) }}
            className="relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-border"
          >
            <Image src={src} alt="IndiaMART image" fill className="object-cover" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}


