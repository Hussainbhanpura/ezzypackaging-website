"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { EnhancedProductCard } from "@/components/enhanced-product-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IconSearch, IconFilter, IconGrid3x3, IconList, IconSparkles, IconRocket, IconHeadset, IconPackage, IconTruck, IconShieldCheck } from "@tabler/icons-react";
import type { Product } from "@/lib/products";
import { SITE_URL } from "@/site.config";
import { SEO } from "@/components/SEO";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: productsRef, inView: productsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    // Load products from static data
    import("@/data/products.json").then(data => {
      setProducts(data.default as Product[]);
    }).catch(() => {
      // Fallback if import fails
      setProducts([]);
    });
  }, []);

  useEffect(() => {
    let filtered = products;
    
    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.spec?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category).filter(Boolean))) as string[]];
  const isMirrorBacking = selectedCategory === "Mirror Backing Films" || (searchQuery.toLowerCase().includes("mirror") && selectedCategory === "All");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <SEO 
        title={isMirrorBacking ? "Mirror Backing Films | Protective Films Supplier Mumbai" : "Glass Etching Films | Decorative & Privacy Films Manufacturer India"}
        description={isMirrorBacking 
          ? "High-quality mirror backing films designed to protect glass from shattering. Ezzy Packaging Solutions delivers safe & reliable protection films Pan-India."
          : "Explore premium glass etching films with easy installation, scratch resistance & frosted finish. Perfect for offices & homes. Request samples from Ezzy Packaging Solutions."}
      />
      {/* JSON-LD Product list for visible products (limited fields) */}
      {/* Note: keep lightweight to avoid oversized HTML */}
      {filteredProducts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              filteredProducts.slice(0, 12).map((p) => ({
                "@context": "https://schema.org",
                "@type": "Product",
                name: p.title,
                image: p.image ? (p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`) : undefined,
                description: p.spec,
                sku: p.slug,
                brand: { "@type": "Organization", name: "Ezzy Packaging Solutions" },
                offers: {
                  "@type": "Offer",
                  url: `${SITE_URL}/products/${p.slug}`,
                  priceCurrency: "INR",
                  availability: "https://schema.org/InStock",
                },
              }))
            ),
          }}
        />
      )}
      {/* Modern Hero Section */}
      <section ref={heroRef} className="relative pt-28 pb-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -right-20 w-72 h-72 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Modern badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Badge className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-0 backdrop-blur-sm">
                <IconSparkles size={16} className="mr-2" />
                Premium Glass Film Solutions
              </Badge>
            </motion.div>
            
            {/* Refined title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent"
            >
              Product Collection
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
            >
              Explore our comprehensive range of high-performance glass films, 
              engineered for excellence and trusted by industry leaders.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-10 max-w-2xl mx-auto"
            >
              {[
                { icon: <IconPackage size={24} />, value: "50+", label: "Products" },
                { icon: <IconTruck size={24} />, value: "24hr", label: "Delivery" },
                { icon: <IconShieldCheck size={24} />, value: "100%", label: "Quality" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -5 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-2 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Filters Section */}
      <section className="sticky top-20 z-40 py-4 bg-white/80 backdrop-blur-lg border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search with better styling */}
            <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
              <div className="relative w-full max-w-md group">
                <IconSearch size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl bg-gray-50 focus:bg-white transition-all"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                  <IconFilter size={18} className="text-primary" />
                  <span className="text-sm font-medium text-gray-700">Filter</span>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl bg-white">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Enhanced view toggle */}
            <div className="flex items-center bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl p-1.5 shadow-sm">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === "grid" 
                    ? "bg-white shadow-md text-primary" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <IconGrid3x3 size={18} className="mr-2" />
                Grid
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === "list" 
                    ? "bg-white shadow-md text-primary" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <IconList size={18} className="mr-2" />
                List
              </Button>
            </div>
          </div>
          
          {/* Enhanced results summary */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Showing</span>
              <span className="px-2 py-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg text-sm font-semibold text-primary">
                {filteredProducts.length}
              </span>
              <span className="text-sm text-gray-600">of {products.length} products</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-600">All items in stock</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid with better spacing */}
      <section ref={productsRef} className="py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 mb-6">
                <IconSearch size={40} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No products found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
              <Button 
                onClick={() => {setSearchQuery(""); setSelectedCategory("All");}} 
                className="px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Clear all filters
              </Button>
            </motion.div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1 max-w-4xl mx-auto"
            }`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={productsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    delay: Math.min(index * 0.08, 0.3), 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                >
                  <EnhancedProductCard 
                    product={product} 
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Section badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-block mb-6"
            >
              <Badge className="px-4 py-2 bg-gradient-to-r from-accent/10 to-primary/10 text-accent border-0">
                <IconSparkles size={16} className="mr-2" />
                Custom Solutions Available
              </Badge>
            </motion.div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Need something specific?
            </h2>
            
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              We create tailored solutions for unique requirements. From custom dimensions 
              to specialized performance specifications.
            </p>
            
            {/* Feature cards with colors */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              {[
                { 
                  icon: <IconRocket size={28} />, 
                  title: "Custom Solutions", 
                  desc: "Tailored to your specs",
                  color: "from-blue-500 to-blue-600"
                },
                { 
                  icon: <IconTruck size={28} />, 
                  title: "Fast Delivery", 
                  desc: "Quick turnaround",
                  color: "from-green-500 to-green-600"
                },
                { 
                  icon: <IconHeadset size={28} />, 
                  title: "Expert Support", 
                  desc: "Technical assistance",
                  color: "from-purple-500 to-purple-600"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all" />
                  <div className="relative p-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* CTA buttons with gradient */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="lg" className="px-8 py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <a href="tel:+919930775152" className="flex items-center gap-2">
                    <IconHeadset size={20} />
                    Call +91 9930775152
                  </a>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="lg" variant="outline" className="px-8 py-4 border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                  <a href="/contact" className="flex items-center gap-2">
                    <IconSparkles size={20} />
                    Get Custom Quote
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Trust indicators with better design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-200"
            >
              {[
                { value: "2000+", label: "Happy Clients", color: "text-blue-600" },
                { value: "10+ Years", label: "Experience", color: "text-green-600" },
                { value: "28 States", label: "Coverage", color: "text-purple-600" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -3 }}
                  className="text-center"
                >
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
    </section>
    </div>
  );
}