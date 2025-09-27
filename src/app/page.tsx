"use client";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { CustomVideoPlayer } from "@/components/custom-video-player";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  IconShield, 
  IconShieldCheck,
  IconUsers, 
  IconAward,
  IconBuildingFactory,
  IconCertificate,
  IconStar,
  
  IconClock
} from "@tabler/icons-react";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const { ref: aboutRef, inView: aboutInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // GSAP refs
  const statsGsapRef = useRef<HTMLDivElement | null>(null);
  const productsGsapRef = useRef<HTMLDivElement | null>(null);

  const { ref: whyUsRef, inView: whyUsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Mobile detection to speed up/stagger animations earlier on small screens
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 640px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    // initial
    setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const baseDuration = isMobile ? 0.35 : 0.6;
  const gridDelay = isMobile ? 0.05 : 0.2;
  const itemBaseDelay = isMobile ? 0.1 : 0.3;
  const itemStagger = isMobile ? 0.05 : 0.1;
  const springStiffness = isMobile ? 250 : 200;

  // GSAP animations (staggered reveal on scroll)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (statsGsapRef.current) {
        const cards = statsGsapRef.current.querySelectorAll("[data-stat-card]");
        gsap.from(cards, {
          opacity: 0,
          y: 18,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsGsapRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
      if (productsGsapRef.current) {
        const cards = productsGsapRef.current.querySelectorAll("[data-product-card]");
        gsap.from(cards, {
          opacity: 0,
          y: 26,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: productsGsapRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: <IconBuildingFactory size={28} />, number: "10+", label: "Years of Excellence", subtitle: "Industry Leadership", color: "bg-gradient-to-br from-primary to-primary/80" },
    { icon: <IconShieldCheck size={28} />, number: "2000+", label: "Enterprise Clients", subtitle: "Trusted Corporate Partners", color: "bg-gradient-to-br from-accent to-accent/80" },
    { icon: <IconClock size={28} />, number: "24h", label: "Express Delivery", subtitle: "Pan-India Network", color: "bg-gradient-to-br from-secondary to-secondary/80" },
    { icon: <IconUsers size={28} />, number: "100%", label: "Quality Guarantee", subtitle: "Zero Defect Policy", color: "bg-gradient-to-br from-primary to-accent" },
  ];

  const whyUsFeatures = [
    { icon: <IconCertificate size={20} />, title: "Virgin Ultra Clear PVC", desc: "Premium PVC for a professional frosted and acid-wash finish" },
    { icon: <IconAward size={20} />, title: "Platinum-Coated Release Paper", desc: "Flawless release for clean, consistent results" },
    { icon: <IconShieldCheck size={20} />, title: "Industry-Best Adhesives", desc: "Effortless adhesion with residue-free removal" },
    { icon: <IconShield size={20} />, title: "Durable, Non-Transferable Finish", desc: "Flawless application with long-lasting performance" },
    { icon: <IconBuildingFactory size={20} />, title: "Designed for Real Projects", desc: "Ideal for partitions, windows, facades, and interiors" },
    { icon: <IconUsers size={20} />, title: "Trusted by Glass Professionals & Designers", desc: "Preferred by designers, architects, and glass experts" },
  ];

  return (
    <div>
      <SEO
        title="Glass Etching Films & Surface Protection | Ezzy Packaging Solutions"
        description="Premium glass etching, mirror backing & surface protection films made in Mumbai. Pan-India delivery. Trusted by architects & glass fabricators. Get a quote today."
      />
      <Hero />
      
      {/* Manufacturing Process Video Section */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Custom Video Player */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <CustomVideoPlayer 
                  videoSrc="zzn1nehPTZY"
                  title="Factory Manufacturing Process"
                />
              </motion.div>
              
              {/* Right Side - Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-1 lg:order-2 text-center lg:text-left"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                  Our Manufacturing Process
                </h2>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  From raw material to final packaging, every step at our factory is backed by advanced machinery, and eco-friendly process.
                </p>
                
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                      <Link href="/contact">
                        Visit Our Factory
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Company Overview Section */}
      <section ref={aboutRef} className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={aboutInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <Badge variant="outline" className="px-4 py-2 text-primary border-primary/20">
                Est. 2013 • Mumbai Based
              </Badge>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-black mb-8 text-center">
              <span className="text-premium">INDUSTRY LEADERSHIP</span>
              <br />
              <span className="text-secondary">& INNOVATION</span>
            </h2>
            <p className="text-foreground leading-relaxed text-xl mb-8 font-medium text-center leading-8">
              As India&#39;s premier glass etching film manufacturer, we lead the industry with 
              cutting-edge technology, uncompromising quality standards, and 
              innovative solutions that set global benchmarks. Our state-of-the-art facility in Mumbai serves as the 
              nerve center for premium glass etching sticker production across India.
            </p>
            <p className="text-foreground leading-relaxed text-lg text-center max-w-4xl mx-auto leading-8">
              Since 2013, we have revolutionized the glass etching industry through breakthrough innovations, 
              strategic partnerships with leading corporate clients, and an unwavering commitment to excellence. Today, we stand as 
               the most trusted name in premium glass etching film, setting industry standards 
              that others aspire to achieve.
            </p>
          </motion.div>

          {/* Subtle Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={aboutInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-16"
          />

          {/* Stats Section */}
          <div ref={statsGsapRef}>
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: baseDuration, delay: gridDelay }}
              className="grid md:grid-cols-4 gap-6 mb-16"
            >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: itemBaseDelay + index * itemStagger, type: "spring", stiffness: springStiffness }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
                data-stat-card
              >
                <Card className="card-premium text-center p-5 md:p-8 group cursor-pointer overflow-hidden relative hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div 
                    className={`w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-3xl ${stat.color} flex items-center justify-center text-white transition-transform duration-300 shadow-lg relative z-10`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-2xl md:text-4xl font-black text-primary mb-1 md:mb-2 relative z-10">{stat.number}</div>
                  <div className="text-sm md:text-base font-bold text-foreground mb-1 relative z-10">{stat.label}</div>
                  <div className="text-[10px] md:text-xs text-accent font-semibold tracking-wide relative z-10">{stat.subtitle}</div>
                </Card>
              </motion.div>
            ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: baseDuration }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="px-4 py-2 text-primary border-primary/30 mb-4">
              🎨 Our Product Range
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Premium <span className="text-primary">Ezzy Rolls</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover our complete range of high-quality glass etching and surface protection films, 
              manufactured with precision in Mumbai.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto" ref={productsGsapRef}>
            {[
              {
                title: "Pink PVC Plotter Film",
                image: "/images/pink_roll.jpeg",
                category: "Surface Protection",
                description: "High-quality pink film with superior adhesion and easy removal",
                features: ["120 Micron Pink PVC", "110 GSM Platinum - Coated Paper", "Industrial Grade Adhesive"],
                color: "from-pink-500 to-pink-600"
              },
              {
                title: "C0 Glass Etching Film", 
                image: "/images/white_roll.jpeg",
                category: "Glass Etching",
                description: "Premium clear film for decorative and privacy applications",
                features: ["50 Micron Ultra Clear PVC", "60 GSM Platinum - Coated Paper", "Industrial Grade Adhesive"],
                color: "from-green-500 to-green-600"
              },
              {
                title: "C1 Glass Etching Film", 
                image: "/images/white_roll.jpeg",
                category: "Glass Etching",
                description: "Premium clear film for decorative and privacy applications",
                features: ["80 Micron Ultra Clear PVC", "60 GSM Platinum - Coated Paper", "Industrial Grade Adhesive"],
                color: "from-green-500 to-green-600"
              },
              {
                title: "C2 Glass Etching Film", 
                image: "/images/white_roll.jpeg",
                category: "Glass Etching",
                description: "Premium clear film for decorative and privacy applications",
                features: ["100 Micron Ultra Clear PVC", "60 GSM Platinum - Coated Paper", "Industrial Grade Adhesive"],
                color: "from-green-500 to-green-600"
              },
              {
                title: "G1 Glass Etching Film", 
                image: "/images/green_roll.jpeg",
                category: "Glass Etching",
                description: "Premium green film for decorative and privacy applications",
                features: ["80 Micron Ultra Clear Green PVC", "60 GSM Platinum - Coated Paper", "Industrial Grade Adhesive"],
                color: "from-green-500 to-green-600"
              },
              {
                title: "G2 Glass Etching Film", 
                image: "/images/green_roll.jpeg",
                category: "Glass Etching",
                description: "Premium green film for decorative and privacy applications",
                features: ["100 Micron Ultra Clear Green PVC", "60 GSM Platinum - Coated Paper", "Industrial Grade Adhesive"],
                color: "from-green-500 to-green-600"
              },
              {
                title: "M1 Glass Backing Film",
                image: "/images/white_roll.jpeg", 
                category: "Premium Clear",
                description: "Crystal clear film with superior optical clarity",
                features: ["80 Micron Milky White PVC", "60 GSM Platinum - Coated Paper", "Industrial Grade Adhesive"],
                color: "from-gray-400 to-gray-500"
              },
              {
                title: "Glass Protection Film",
                image: "/images/glass_protection.jpeg", 
                category: "Premium Clear",
                description: "Crystal clear film with superior optical clarity",
                features: ["Crystal Clear", "Professional Grade", "Long-Lasting"],
                color: "from-gray-400 to-gray-500"
              },
              {
                title: "Furniture Protection Film",
                image: "/images/Furniture_protection.jpg", 
                category: "Surface Protection",
                description: "48 cm × 500cm PVC material, waterproof, oil-proof, and easy to clean",
                features: ["48 cm × 500cm PVC material", "Waterproof and oil-proof", "Easy to clean", "No marks when removed", "Suitable for furniture, walls, and surfaces"],
                color: "from-blue-500 to-blue-600"
              }
            ].map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: baseDuration, 
                  delay: (isMobile ? 0.05 : 0.2) * index,
                  type: "spring",
                  stiffness: isMobile ? 180 : 100
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
                data-product-card
              >
                <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      >
                      <Image
                        src={product.image} 
                        alt={product.title}
                        fill 
                        className="object-cover group-hover:brightness-105 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </motion.div>
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`bg-gradient-to-r ${product.color} text-white border-0 shadow-md`}>
                        {product.category}
                      </Badge>
                    </div>
                    
                    {/* Ezzy Rolls watermark */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <div className="text-xs font-bold text-primary">EZZY ROLLS</div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Title */}
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground">Key Features:</div>
                      <div className="space-y-1">
                        {product.features.map((feature, idx) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-2 pt-2">
                      <motion.div 
                        className="flex-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
                          <Link href="/products">View All</Link>
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button asChild size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white hover:border-primary">
                          <a href="tel:+919930775152">Call Now</a>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* View All Products CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-lg">
                <Link href="/products">
                  🔍 Explore Complete Product Range
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyUsRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: baseDuration }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Ezzy?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Concept to Creation -- Etching Made Simple
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUsFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * (isMobile ? 0.06 : 0.1), duration: baseDuration }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 h-full border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 group bg-white hover:bg-gray-50/50">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-transform duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="px-6 py-3 text-accent border-accent/30 mb-6">
              🏆 TRUSTED BY INDUSTRY LEADERS
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              <span className="text-premium">CLIENT SUCCESS</span>
              <br />
              <span className="text-secondary">STORIES</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "Ezzy's Glass Etching Stickers are perfect for our designing team",
                author: "Hussain. R",
                company: "Raj Glass",
                rating: 5
              },
              {
                quote: "Great quality, timely delivery",
                author: "Santosh Kumar", 
                company: "Crystal Glass",
                rating: 5
              },
              {
                quote: "Friendly staff, great quality",
                author: "Krishna",
                company: "Glass World",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="card-premium p-8 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <IconStar key={i} size={20} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <blockquote className="text-foreground font-medium mb-6 italic leading-relaxed relative z-10">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="relative z-10">
                    <div className="font-bold text-primary">{testimonial.author}</div>
                    <div className="text-sm text-accent font-semibold">{testimonial.company}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Brand Section */}
      <section className="section-luxury py-20 text-white relative overflow-hidden">
  {/* Background Layer */}
  <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/90 to-secondary opacity-95" />
  <div className="absolute inset-0">
    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/30 to-transparent rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl animate-pulse" />
  </div>

  <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
    {/* Badge */}
    <Badge variant="outline" className="px-6 py-3 border-accent text-accent mb-8">
      🌟 PREMIUM MANUFACTURING BRAND
    </Badge>

    {/* Logo */}
    <div className="relative flex justify-center mb-8">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-80 h-80 bg-radial from-accent/40 via-primary/30 to-transparent rounded-full blur-3xl"
      />
      <Image
        src="/images/ezzy_roll.png"
        alt="Ezzy Roll Product"
        width={350}
        height={350}
        className="relative z-10 drop-shadow-[0_0_40px_rgba(255,0,0,0.6)]"
        priority
      />
    </div>

    {/* Description */}
    <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
      The flagship brand that has redefined glass etching standards across India. 
      Engineered with precision, crafted with excellence, and trusted by industry giants 
      for mission-critical applications.
    </p>

    {/* Stats Row */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
      {[
        { value: "Recognized Brand", label: "Strong Industry Presence" },
        { value: "10,000+", label: "Rolls Manufactured Per Month" },
        { value: "28", label: "States Served" },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05 }}
          className="relative p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg text-center"
        >
          {/* Glow Effect */}
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-transparent rounded-2xl blur-2xl"
          />
          <div className="relative z-10">
            <div className="text-2xl font-extrabold text-accent mb-2">{item.value}</div>
            <div className="text-white/80 font-medium">{item.label}</div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* CTA Button */}
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        asChild
        size="lg"
        className="mx-auto md:mx-0 px-6 py-3 text-sm md:px-12 md:py-6 md:text-xl font-bold rounded-2xl shadow-lg bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-300"
      >
        <Link href="/contact">🚀 PARTNER WITH INDUSTRY LEADERS</Link>
      </Button>
    </motion.div>
  </div>
</section>



    </div>
  );
}
