import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{product.title}</h3>
          {product.price && <Badge variant="secondary">{product.price}</Badge>}
        </div>
        {product.spec && <p className="text-sm text-muted-foreground line-clamp-3">{product.spec}</p>}
        <div className="flex gap-2">
          <Button asChild size="sm"><Link href={`/products/${product.slug}`}>Details</Link></Button>
          <Button asChild size="sm" variant="outline"><Link href="/contact">Enquire</Link></Button>
        </div>
      </CardContent>
    </Card>
  );
}


