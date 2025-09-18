"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  IconShoppingCart, 
  IconPhone, 
  IconMail, 
  IconDownload,
  IconCheck,
  IconStar,
  IconTruck,
  IconShield,
  IconCertificate,
  IconZoomIn,
  IconChevronLeft,
  IconChevronRight,
  IconAward,
  IconMapPin,
  IconChevronDown,
  IconPlayerPlay,
  IconPackage,
  IconClock,
  IconHeartHandshake,
  IconBrandWhatsapp
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SITE_URL } from "@/site.config";

export function ProductDetailClient({ product }: { product: Product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showFAQ, setShowFAQ] = useState<number | null>(null);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [mediaMode, setMediaMode] = useState<"image" | "video">("image");

  // Mock image carousel data (in real app, this would come from product data)
  const productImages = [
    product.image || "/placeholder.svg",
    product.image || "/placeholder.svg", // You can add more images here
    product.image || "/placeholder.svg"
  ];

  // Related products (mock data)
  const relatedProducts = [
    { slug: "green-glass-etching-film", title: "Green Glass Etching Film", price: "₹ On Request", image: "/images/green_roll.jpeg" },
    { slug: "white-premium-clear-film", title: "White Premium Clear Film", price: "₹ On Request", image: "/images/white_roll.jpeg" }
  ].filter(p => p.slug !== product.slug);

  // FAQ Data
  const faqs = [  
    {
      question: "How easy is it to apply this glass etching film?",
      answer: "Our glass etching film is designed for easy application with minimal air bubbles. Simply clean the surface, peel and apply with a squeezy for professional results."
    },
    {
      question: "Is the film removable without leaving residue?",
      answer: "Yes, our premium adhesive ensures clean removal without leaving any residue on the glass surface, making it perfect for temporary applications."
    },
    {
      question: "Can I get custom sizes and colors?",
      answer: "Absolutely! We offer custom sizes, colors, and specifications to meet your specific project requirements. Contact us for custom quotes."
    },
    {
      question: "What is the shelf life and durability?",
      answer: "Our glass etching films have excellent UV resistance and can last 5-7 years in indoor applications. They maintain their adhesive properties for up to 2 years in storage."
    }
  ];

  // Sticky CTA scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsStickyVisible(scrolled > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* SEO-optimized structured data (Product JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: productImages.map((img) => (img.startsWith("http") ? img : `${SITE_URL}${img}`)),
            description: product.spec,
            brand: { "@type": "Organization", name: "Ezzy Packaging Solutions" },
            manufacturer: { "@type": "Organization", name: "Ezzy Packaging Solutions" },
            sku: product.slug,
            offers: {
              "@type": "Offer",
              url: `${SITE_URL}/products/${product.slug}`,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock"
            }
          })
        }}
      />

      <div className="min-h-screen relative">
        {/* Enhanced Product Hero */}
        <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Enhanced Image Carousel */}
              <div className="space-y-4">
                <div className="relative">
                  <motion.div 
                    className="group relative aspect-square bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {mediaMode === 'image' && (
                      <Image 
                        src={productImages[currentImageIndex]} 
                        alt={`Buy 80 Micron Glass Etching Film Roll for Glass - ${product.title}`}
                        fill 
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        className={`object-cover transition-transform duration-500 ${isZoomed ? 'scale-110' : 'scale-100'}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    )}
                    {mediaMode === 'video' && (
                      <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                        <div className="relative aspect-video w-11/12 max-w-xl bg-black rounded-xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-primary/10" />
                          <button className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white text-primary shadow-xl flex items-center justify-center">
                            <IconPlayerPlay size={28} className="ml-1" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Zoom overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      onClick={() => setIsZoomed(!isZoomed)}
                    >
                      <div className="bg-white/90 p-3 rounded-full">
                        <IconZoomIn size={24} className="text-gray-800" />
                      </div>
                    </motion.div>

                    {/* Media mode toggle */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      {(["image","video"] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setMediaMode(mode)}
                          className={`px-2.5 py-1 text-xs rounded-full backdrop-blur border ${mediaMode === mode ? 'bg-white text-gray-900 border-white' : 'bg-white/60 text-gray-700 border-white/80 hover:bg-white'}`}
                        >
                          {mode === 'image' ? 'Image'  : 'Video'}
                        </button>
                      ))}
                    </div>

                    {/* Category Badge */}
                    {product.category && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-white shadow-lg">
                          {product.category}
                        </Badge>
                      </div>
                    )}

                    {/* Subtle trust overlay */}
                    <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-white/60 shadow">
                      <IconShield size={16} className="text-green-600" />
                      <span className="text-xs font-medium text-gray-800">Trusted by 500+ Clients</span>
                    </div>

                    {/* Carousel Navigation */}
                    {productImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        >
                          <IconChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % productImages.length)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        >
                          <IconChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </motion.div>

                  {/* Image Thumbnails */}
                  <div className="flex gap-2 mt-4">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index ? 'border-primary' : 'border-gray-200'
                        }`}
                      >
                        <Image src={img} alt={`Product view ${index + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Trust Badges - glassmorphism horizontal cards */}
                <div className="flex gap-4 overflow-x-auto py-1">
                  <motion.div 
                    className="min-w-[200px] flex-1 bg-white/50 backdrop-blur-md p-4 rounded-xl text-left border border-white/60 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center gap-3">
                      <IconCertificate size={24} className="text-green-600" />
                      <div>
                      <div className="text-sm font-semibold text-gray-900">Quality Assured</div>
                        <div className="text-sm font-semibold text-gray-900">Guranteed Length</div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="min-w-[200px] flex-1 bg-white/50 backdrop-blur-md p-4 rounded-xl text-left border border-white/60 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center gap-3">
                      <IconMapPin size={24} className="text-orange-600" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Made in India</div>
                        <div className="text-xs text-gray-600">Premium Quality</div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="min-w-[200px] flex-1 bg-white/50 backdrop-blur-md p-4 rounded-xl text-left border border-white/60 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center gap-3">
                      <IconHeartHandshake size={24} className="text-blue-600" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">24/7 Support</div>
                        <div className="text-xs text-gray-600">Expert Help</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Product Details */}
              <div className="space-y-6">
                {/* Title + Inline Rating */}
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <h1 className="text-3xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
                      {product.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <IconStar key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-1 text-sm font-medium text-gray-600">4.8/5</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-base">
                    Buy online at best price • Fast delivery • Premium quality
                  </p>
                  <Badge variant="outline" className="text-green-600 border-green-200 mt-2">
                    ✓ Premium Quality
                  </Badge>
                </div>

                {/* Premium Price Card */}
                <Card className="relative p-6 bg-gradient-to-br from-rose-50 via-white to-pink-50 border border-rose-100 shadow-xl">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl font-extrabold text-rose-600">{product.price}</span>
                    {product.priceUnit && (
                      <span className="text-lg text-rose-600/70">{product.priceUnit}</span>
                    )}
                    <Button variant="outline" size="sm" className="ml-auto text-rose-600 border-rose-200 hover:bg-rose-50">
                      Get Latest Price
                    </Button>
                  </div>
                  {product.discountPercent && (
                    <Badge className="absolute top-3 right-3 bg-rose-600 text-white shadow">-{product.discountPercent}% OFF</Badge>
                  )}
                  {product.minOrder && (
                    <p className="text-sm text-muted-foreground mb-3">
                      Minimum Order: <span className="font-semibold text-foreground">{product.minOrder}</span>
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <IconTruck size={16} className="text-green-600" />
                      <span>Free Delivery</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IconShield size={16} className="text-blue-600" />
                      <span>Quality Guaranteed</span>
                    </div>
                  </div>
                </Card>

                {/* CTAs */}
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                      <IconShoppingCart size={24} className="mr-3" />
                      Yes, I am Interested!
                    </Button>
                  </motion.div>
                  <Button asChild variant="outline" className="w-full border-2 border-gray-300 text-gray-800 py-4 font-semibold hover:bg-gray-100">
                    <a href={`mailto:info@ezzypackagingsolutions.com?subject=Request%20Free%20Sample%20-%20${encodeURIComponent(product.title)}`}>
                      <IconMail size={18} className="mr-2" />
                      Request a Free Sample
                    </a>
                  </Button>
                </div>

                {/* Key Features as 2x2 Icon Grid */}
                {product.features && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <IconAward size={20} className="text-primary" />
                      Key Features
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                              <IconCheck size={18} />
                            </div>
                            <span className="font-medium text-gray-800">{feature}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Accordion Tabs: Description, Specifications, Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Product Information</h2>
            </div>
            <Accordion type="single" collapsible className="bg-white rounded-xl shadow border">
              <AccordionItem value="description" className="px-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-2 text-base font-semibold"><IconPackage size={18} className="text-primary" /> Description</div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.spec}
                  </p>
                </AccordionContent>
              </AccordionItem>
              {product.specifications && (
                <AccordionItem value="specs" className="px-4">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2 text-base font-semibold"><IconShield size={18} className="text-primary" /> Specifications</div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b last:border-b-0">
                          <span className="text-sm text-muted-foreground font-medium">{key}</span>
                          <span className="text-sm font-bold text-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
              {product.features && (
                <AccordionItem value="features" className="px-4">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2 text-base font-semibold"><IconAward size={18} className="text-primary" /> Features</div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid grid-cols-2 gap-3">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <IconCheck size={16} className="text-green-600" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </section>

        {/* FAQ Section (standalone) */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Get answers to common questions about our glass etching films</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    <IconChevronDown 
                      size={20} 
                      className={`transition-transform ${showFAQ === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {showFAQ === index && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Related Products */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Related Products</h2>
              <p className="text-muted-foreground">Explore our other premium glass etching solutions</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.slug}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{relatedProduct.title}</h3>
                    <p className="text-primary font-bold text-xl mb-4">{relatedProduct.price}</p>
                    <Button asChild className="w-full">
                      <Link href={`/products/${relatedProduct.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Contact Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
              <p className="text-white/90 mb-8 text-lg">
                Get the best quote for {product.title}. Our experts are ready to help with 
                bulk orders, custom specifications, and nationwide delivery.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <motion.div 
                  className="bg-white/10 backdrop-blur p-6 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <IconPhone size={32} className="mx-auto mb-3" />
                  <div className="font-semibold mb-1">Call Us</div>
                  <div className="text-sm text-white/80">+91 9930775152</div>
                </motion.div>
                <motion.div 
                  className="bg-white/10 backdrop-blur p-6 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <IconMail size={32} className="mx-auto mb-3" />
                  <div className="font-semibold mb-1">Email Us</div>
                  <div className="text-sm text-white/80">Quick Response</div>
                </motion.div>
                <motion.div 
                  className="bg-white/10 backdrop-blur p-6 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <IconHeartHandshake size={32} className="mx-auto mb-3" />
                  <div className="font-semibold mb-1">Expert Support</div>
                  <div className="text-sm text-white/80">Technical Guidance</div>
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 shadow-lg">
                  <a href="tel:+919930775152">
                    <IconPhone size={20} className="mr-2" />
                    Call: +91 9930775152
                  </a>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary shadow-lg">
                  <a href="mailto:info@ezzypackagingsolutions.com">
                    <IconMail size={20} className="mr-2" />
                    Email Enquiry
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky CTA Bar */}
        <AnimatePresence>
          {isStickyVisible && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur border-t shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">{product.price}</span> {product.priceUnit}
                </div>
                <div className="ml-auto flex w-full sm:w-auto gap-2">
                  <Button asChild variant="outline" className="flex-1 sm:flex-none">
                    <a href="tel:+919930775152">
                      <IconPhone size={18} className="mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="hidden sm:inline-flex">
                    <a href={`mailto:info@ezzypackagingsolutions.com?subject=Get%20Quote%20-%20${encodeURIComponent(product.title)}`}>
                      Get Quote
                    </a>
                  </Button>
                  <Button asChild className="bg-green-600 hover:bg-green-700 text-white sm:hidden">
                    <a href={`https://wa.me/919930775152?text=${encodeURIComponent('Hi, I am interested in ' + product.title)}`} target="_blank" rel="noopener noreferrer">
                      <IconBrandWhatsapp size={18} className="mr-2" /> WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
