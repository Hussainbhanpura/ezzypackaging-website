"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { IconAward, IconSparkles, IconPhone, IconArrowRight, IconShieldCheck, IconUsers, IconCalendar, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

// Animated counter component - defined outside to prevent re-creation
const AnimatedCounter = ({ 
  end, 
  duration = 2, 
  suffix = "", 
  isInView 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string;
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    // Only animate once when coming into view
    if (isInView && !hasAnimated) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          setHasAnimated(true);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, hasAnimated, end, duration]);
  
  return <span>{count}{suffix}</span>;
};

export function Hero() {
  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  
  const productSlides = [
    {
      image: "/images/pink_roll.jpeg",
      title: "Surface Protection Film",
      subtitle: "Premium Pink Series",
      features: ["Anti-Scratch", "Easy Removal", "No Residue"],
      badge: "MOST POPULAR"
    },
    {
      image: "/images/green_roll.jpeg",
      title: "Glass Etching Film",
      subtitle: "Designer Green Collection",
      features: ["Privacy Solution", "Decorative", "UV Protection"],
      badge: "BESTSELLER"
    },
    {
      image: "/images/white_roll.jpeg",
      title: "Premium Clear Film",
      subtitle: "Crystal Clear Protection",
      features: ["100% Clarity", "Long Lasting", "Professional Grade"],
      badge: "PREMIUM"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[80vh] lg:min-h-[90vh] flex items-center lg:pt-2">
      {/* Enhanced gradient background with stronger overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/90 to-secondary">
        {/* Stronger dark overlay for maximum text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_50%,transparent_75%)] bg-[length:40px_40px]" />
        </div>
      </div>
      
      {/* Subtle animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content with enhanced contrast */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6 }}
            > 
              {/* Main Title */}
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="text-white">India&#39;s Trusted</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-accent bg-clip-text text-transparent">Glass Etching Sticker</span>
                <br />
                <span className="text-white">Manufacturer</span>
              </motion.h1>
              
              {/* Subtitle with highlighted differentiator */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed max-w-xl"
              >
                Premium glass etching films and glass protection films. 
                <span className="font-bold text-white"> 12+ years of excellence</span> serving leading glass designers pan India with unmatched quality.
              </motion.p>
              
              {/* Differentiated CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
              >
                {/* Primary CTA - Bright and prominent */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button asChild size="lg" className="bg-gradient-to-r from-yellow-400 to-accent hover:from-yellow-500 hover:to-accent/90 text-black px-6 sm:px-8 lg:px-10 py-4 sm:py-6 lg:py-7 text-sm sm:text-base font-black rounded-xl shadow-2xl hover:shadow-3xl transition-all group">
                    <Link href="/products" className="flex items-center gap-2">
                      <IconSparkles size={22} />
                      EXPLORE PRODUCTS
                      <IconArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
                
                {/* Secondary CTA - Outline style for hierarchy */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button asChild size="lg" variant="outline" className="border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white px-6 sm:px-8 lg:px-10 py-4 sm:py-6 lg:py-7 text-sm sm:text-base font-bold rounded-xl transition-all">
                    <a href="tel:+919930775152" className="flex items-center gap-2">
                      <IconPhone size={20} />
                      <span>+91 9930775152</span>
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Animated Trust Indicators */}
              <motion.div
                ref={statsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: statsInView ? 1 : 0, y: statsInView ? 0 : 20 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6"
              >
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <IconShieldCheck size={24} className="text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">
                      <AnimatedCounter end={100} suffix="%" isInView={statsInView} />
                    </div>
                    <div className="text-xs text-white/90 font-medium">Quality Assured</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <IconUsers size={24} className="text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">
                      <AnimatedCounter end={2000} suffix="+" isInView={statsInView} />
                    </div>
                    <div className="text-xs text-white/90 font-medium">Happy Clients</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <IconCalendar size={24} className="text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">
                      <AnimatedCounter end={12} suffix="+" isInView={statsInView} />
                    </div>
                    <div className="text-xs text-white/90 font-medium">Years Experience</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Right Visual - Clean Product Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main Product Showcase - Cleaner with more spacing */}
                <div className="relative h-[500px] w-full">
                  {/* Product Carousel */}
                  <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
                    {productSlides.map((slide, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ 
                          opacity: currentSlide === index ? 1 : 0,
                          x: currentSlide === index ? 0 : -100,
                          scale: currentSlide === index ? 1 : 0.9
                        }}
                        transition={{ duration: 0.5 }}
                        className={`absolute inset-0 ${currentSlide === index ? 'z-10' : 'z-0'}`}
                      >
                        {/* Product Image */}
                        <div className="relative h-3/5">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                            priority={index === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          
                          {/* Badge */}
                          <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full">
                            {slide.badge}
                          </div>
                        </div>
                        
                        {/* Product Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 className="text-2xl font-bold text-white mb-2">{slide.title}</h3>
                          <p className="text-white/80 mb-4">{slide.subtitle}</p>
                          
                          {/* Features */}
                          <div className="flex gap-3">
                            {slide.features.map((feature, idx) => (
                              <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs text-white font-medium">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Carousel Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                      {productSlides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentSlide === index 
                              ? 'w-8 bg-yellow-400' 
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + productSlides.length) % productSlides.length)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      <IconChevronLeft size={20} className="text-white" />
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % productSlides.length)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      <IconChevronRight size={20} className="text-white" />
                    </button>
                  </div>
                  
                  {/* Floating Stats Card - Positioned lower to avoid overlap */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-xl p-5 shadow-2xl z-30"
                  >
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-2xl font-black text-primary">50+</div>
                        <div className="text-xs text-gray-600">Products</div>
                      </div>
                      <div className="border-x border-gray-200 px-6">
                        <div className="text-2xl font-black text-primary">28</div>
                        <div className="text-xs text-gray-600">States</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-primary">24hr</div>
                        <div className="text-xs text-gray-600">Delivery</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Decorative elements - more subtle */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-xl blur-2xl"
                />
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-28 -right-6 w-16 h-16 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}