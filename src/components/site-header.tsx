"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export function SiteHeader() {
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <header className="border-b border-gray-200/50 sticky top-0 z-50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm overflow-x-hidden">
      <div className="container mx-auto px-3 sm:px-4 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-56 h-16 sm:w-80 sm:h-20 shrink-0">
              <Image 
                src="/images/WhatsApp_Image_2025-08-30_at_10.45.40-removebg-preview.png" 
                alt="Ezzy Logo" 
                fill 
                className="object-contain"
                sizes="(max-width: 640px) 224px, 320px"
              />
            </div>
            {/* <span className="font-black text-xl tracking-tight">
              <span className="text-primary">EZZY</span>
              <span className="text-secondary ml-1">PACKAGING</span>
              <span className="text-secondary ml-1">SOLUTIONS</span>
            </span> */}
          </Link>
          <nav className="hidden md:block">
            <div className="flex items-center gap-2">
              <Link href="/" className="px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium rounded-md">
                Home
              </Link>
              <Link href="/products" className="px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium rounded-md">
                Products
              </Link>
              <Link href="/services" className="px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium rounded-md">
                Services
              </Link>
              <Link href="/about" className="px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium rounded-md">
                About
              </Link>
              <Link href="/contact" className="px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium rounded-md">
                Contact
              </Link>
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:block">
            <Button asChild className="btn-premium px-6 py-3 font-bold">
              <Link href="/contact" className="inline-flex items-center gap-2">
                <Phone size={18}/>
                CALL US FOR ENQUIRY
              </Link>
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden ml-1">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[60vw] max-w-xs" aria-label="Mobile navigation menu">
              <SheetTitle className="sr-only">Mobile navigation menu</SheetTitle>
              <motion.nav
                className="grid gap-7 mt-20"
                role="navigation"
                aria-label="Primary"
                initial="hidden"
                animate="show"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <Link href="/" className="px-5 py-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-bold text-2xl">Home</Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href="/products" className="px-5 py-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-bold text-2xl">Products</Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href="/services" className="px-5 py-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-bold text-2xl">Services</Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href="/about" className="px-5 py-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-bold text-2xl">About</Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href="/contact" className="px-5 py-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-bold text-2xl">Contact</Link>
                </motion.div>
              </motion.nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


