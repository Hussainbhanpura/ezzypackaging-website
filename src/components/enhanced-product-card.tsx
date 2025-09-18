"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconStar, IconCheck, IconPhone, IconEye } from "@tabler/icons-react";
import type { Product } from "@/lib/products";

interface EnhancedProductCardProps {
  product: Product;
  index: number;
}

export function EnhancedProductCard({ product, index }: EnhancedProductCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group h-full"
    >
      <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50/50">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-white">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <Image 
              src={product.image || "/placeholder.svg"} 
              alt={product.title}
              fill 
              className="object-cover group-hover:brightness-105 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category badge */}
          {product.category && (
            <div className="absolute top-4 left-4">
              <Badge 
                variant="secondary" 
                className="bg-white/90 backdrop-blur-sm text-primary border-0 shadow-md hover:bg-white transition-colors"
              >
                {product.category}
              </Badge>
            </div>
          )}
          
          {/* Price badge */}
          {product.price && (
            <div className="absolute top-4 right-4">
              <Badge 
                variant="outline" 
                className="bg-primary/90 backdrop-blur-sm text-white border-primary hover:bg-primary transition-colors"
              >
                {product.price}
              </Badge>
            </div>
          )}
          
          {/* Hover overlay with quick actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex gap-2">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Button size="sm" variant="secondary" className="bg-white/90 text-primary hover:bg-white">
                  <IconEye size={16} className="mr-1" />
                  View
                </Button>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <IconPhone size={16} className="mr-1" />
                  Call
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Title and rating */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
              {product.title}
            </h3>
            
            {/* Star rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <IconStar size={16} className="fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
              <span className="text-sm text-muted-foreground ml-2">Premium Quality</span>
            </div>
          </div>
          
          {/* Specifications */}
          {product.spec && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {product.spec}
            </p>
          )}
          
          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">Key Features:</div>
              <div className="grid grid-cols-2 gap-1">
                {product.features.slice(0, 4).map((feature, idx) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                  >
                    <IconCheck size={12} className="text-primary flex-shrink-0" />
                    <span className="truncate">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
                <Link href={`/products/${product.slug}`}>
                  <IconEye size={16} className="mr-2" />
                  View Details
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white hover:border-primary">
                <Link href="/contact">
                  <IconPhone size={16} className="mr-1" />
                  Enquire
                </Link>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
