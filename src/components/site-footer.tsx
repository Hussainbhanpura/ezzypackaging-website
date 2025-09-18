"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  IconMapPin, 
  IconPhone, 
  IconMail, 
  IconCertificate,
  IconTruck,
  IconShield,
  IconAward,
  IconBuilding
} from "@tabler/icons-react";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-primary to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div>
                <Image
                src="/images/WhatsApp_Image_2025-08-30_at_10.45.40-removebg-preview.png"
                alt="Ezzy Roll Product"
                width={500}
                height={450}
                className="mx-auto"
                priority
              />
                </div>
              </div>
              
              <p className="text-white/90 text-lg leading-relaxed mb-6 max-w-md">
                India&#39;s premier glass etching film manufacturer, setting industry standards with 
                cutting-edge technology and uncompromising quality since 2013.
              </p>
              
              {/* Certifications */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-white/80">
                  <IconAward size={16} className="text-accent" />
                  <span className="text-sm font-semibold">Industry Leader</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <IconShield size={16} className="text-accent" />
                  <span className="text-sm font-semibold">Quality Assured</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <IconTruck size={16} className="text-accent" />
                  <span className="text-sm font-semibold">Pan-India Delivery</span>
                </div>
              </div>
              
              <div className="text-white/70 text-sm">
                <div className="font-semibold text-accent mb-1">GST Registration</div>
                <div className="font-mono">27AIKPB1582G1ZE</div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h3 className="text-xl font-bold text-white mb-6 tracking-wide">CONTACT INFO</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <IconMapPin size={20} className="text-accent mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold">Corporate Headquarters</div>
                    <div className="text-white/80 text-sm">Plot No 195, Gala No. 13, Hilson Compound</div>
                    <div className="text-white/80 text-sm">Quay Street, Darukhana, Mumbai - 400010</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <IconPhone size={20} className="text-accent flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold">Enterprise Hotline</div>
                    <a href="tel:+919930775152" className="text-accent font-bold hover:text-white transition-colors">
                      +91 9930775152
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <IconMail size={20} className="text-accent flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold">Business Enquiries</div>
                    <a href="mailto:info@ezzypackagingsolutions.com" className="text-accent font-bold hover:text-white transition-colors">
                      info@ezzypackagingsolutions.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <IconBuilding size={20} className="text-accent mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold">Leadership</div>
                    <div className="text-white/80 text-sm">Murtuza Hussain Bhanpurwala</div>
                    <div className="text-accent text-sm font-semibold">CEO & Founder</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-xl font-bold text-white mb-6 tracking-wide">QUICK ACCESS</h3>
              <div className="space-y-3">
                {[
                  { href: "/products", label: "Premium Products", desc: "Glass Film Range" },
                  { href: "/services", label: "Enterprise Services", desc: "B2B Solutions" },
                  { href: "/about", label: "Company Profile", desc: "Our Story" },
                  { href: "/contact", label: "Get Quote", desc: "Business Enquiry" },
                ].map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="block group hover:bg-white/5 rounded-lg p-2 transition-colors"
                  >
                    <div className="text-white font-semibold group-hover:text-accent transition-colors">
                      {link.label}
                    </div>
                    <div className="text-white/70 text-sm">{link.desc}</div>
                  </Link>
                ))}
              </div>
              
              {/* Premium Brand */}
              <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-accent font-black text-lg tracking-wide mb-1">EZZY ROLLS</div>
                <div className="text-white/80 text-sm">Premium Manufacturing Brand</div>
                <div className="text-accent text-xs font-semibold mt-1">TRUSTED BY 2000+ CLIENTS</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-white/80 text-sm text-center md:text-left">
                <div className="font-semibold">
                  © {new Date().getFullYear()} Ezzy Packaging Solutions. All rights reserved.
                </div>
                <div className="text-white/60 text-xs mt-1">
                  India&#39;s Premier Glass Etching Film Manufacturer • Serving 28 States
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-white/60 text-xs">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span>Quality Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


