"use client";
import { motion } from "framer-motion";
import { ServicesHero } from "@/components/services-hero";
import { AnimatedServiceCard } from "@/components/animated-service-card";
import { SEO } from "@/components/SEO";
import { 
  IconRuler2, 
  IconPalette, 
  IconBuilding, 
  IconShield, 
  IconRefresh,
  IconTools,
  IconCertificate,
  IconMapPin,
  IconHeartHandshake,
  IconHandClick,
  IconPencil,
  IconTool,
  IconSettings,
  IconShieldCheck,
  IconPhone,
  IconMail,
  IconBrandWhatsapp,
  IconBrandFacebook,
  IconBrandLinkedin
} from "@tabler/icons-react";

export default function ServicesPage() {
  const services = [
    {
      title: "Glass Etching",
      description: "Premium frosted and acid-wash effects for partitions, cabins, facades, and interiors—clean, elegant, and brand-ready.",
      features: [
        "True frosted / acid-wash finish",
        "Custom logos and patterns",
        "Privacy without blocking light",
        "Clean, professional edges"
      ],
      image: "https://images.unsplash.com/photo-1529335764857-3f1164d1cb24?q=80&w=1600&auto=format&fit=crop",
      icon: <IconTool size={24} />,
      badge: "Most Requested"
    },
    {
      title: "Glass Protection",
      description: "Surface protection films that shield glass during transport, fabrication, and site work—easy to apply, residue-free to remove.",
      features: [
        "Scratch and dust protection",
        "UV-stable adhesive",
        "Easy peel removal",
        "No residue"
      ],
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
      icon: <IconShield size={24} />,
    },
    {
      title: "Mirror Backing",
      description: "Milky-white backing film to protect mirrors from shattering and moisture—strong bond with a clean, professional look.",
      features: [
        "80 Micron milky-white PVC",
        "Industrial-grade adhesive",
        "Non-transferable finish",
        "Long-term durability"
      ],
      image: "/images/white_roll.jpeg",
      icon: <IconCertificate size={24} />,
    },
    {
      title: "Floor Protection",
      description: "Heavy-duty floor guarding during construction and renovation—fast to lay, tough against abrasion and spills.",
      features: [
        "Tear and impact resistant",
        "Anti-slip surface",
        "Water and paint resistant",
        "Quick roll-out install"
      ],
      image: "https://images.unsplash.com/photo-1582581936383-0f2b5e88eb84?q=80&w=1600&auto=format&fit=crop",
      icon: <IconTools size={24} />,
    },
    {
      title: "Furniture Protection",
      description: "Protective wraps for furniture and finished surfaces during movement and onsite work—safe adhesive, no damage.",
      features: [
        "Surface-safe adhesive",
        "Residue-free removal",
        "Dust and moisture barrier",
        "Multiple widths available"
      ],
      image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop",
      icon: <IconShield size={24} />,
    },
    {
      title: "Sand Blasting",
      description: "Custom masking and stencils for glass sand-blasting—crisp designs, consistent depth, and clean removal.",
      features: [
        "High abrasion resistance",
        "Clean cut edges",
        "Custom die-cut patterns",
        "Residue-free removal"
      ],
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476e?q=80&w=1600&auto=format&fit=crop",
      icon: <IconRuler2 size={24} />,
    },
    {
      title: "Acid Work Film",
      description: "Specialized etching sticker for acid work on glass—virgin ultra-clear PVC with platinum-coated paper for flawless release.",
      features: [
        "Virgin ultra-clear PVC",
        "Platinum-coated release paper",
        "Industry-best adhesive",
        "Non-transferable finish"
      ],
      image: "/images/white_roll.jpeg",
      icon: <IconShieldCheck size={24} />,
      badge: "Pro Grade"
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Surface Protection Films | Scratch & Dust Resistant Films India"
        description="Multi-purpose surface protection films for glass, steel, aluminum & laminates. Trusted by fabricators nationwide. Contact Ezzy Packaging Solutions for bulk orders."
      />
      <ServicesHero />
      
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                Our Expertise
              </span>
            </motion.div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Comprehensive Glass Etching Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From initial consultation to final installation, we provide end-to-end solutions 
              that exceed expectations and deliver lasting results.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedServiceCard
                key={service.title}
                {...service}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                <IconCertificate size={24} />
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">Quality Assured</div>
                <div className="text-lg font-semibold text-foreground">Guranteed Length</div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
                <IconMapPin size={24} />
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">Made in India</div>
                <div className="text-sm text-muted-foreground">Local Expertise</div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <IconHeartHandshake size={24} />
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">24/7 Support</div>
                <div className="text-sm text-muted-foreground">Dedicated Team</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">How We Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A refined, transparent process designed for speed, quality, and peace of mind.</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />
            <div className="grid md:grid-cols-4 gap-6 relative">
              {[{
                title: "Consult",
                desc: "Free site visit & quote",
                icon: <IconHandClick size={22} />
              },{
                title: "Design",
                desc: "Custom patterns & branding",
                icon: <IconPencil size={22} />
              },{
                title: "Install",
                desc: "Expert technicians, clean finish",
                icon: <IconTool size={22} />
              },{
                title: "Support",
                desc: "Maintenance & replacement",
                icon: <IconSettings size={22} />
              }].map((step, idx) => (
                <div key={step.title} className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                    {step.icon}
                  </div>
                  <div className="text-lg font-semibold">{step.title}</div>
                  <div className="text-sm text-muted-foreground">{step.desc}</div>
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-primary/20 border border-primary/30 -translate-y-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with frosted bg */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/30 backdrop-blur-xl p-10 text-center shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            <h2 className="relative text-3xl lg:text-4xl font-bold mb-3">Ready to Transform Your Space?</h2>
            <p className="relative text-muted-foreground mb-6 max-w-2xl mx-auto">Get a free consultation with our experts and discover the right solution for your project.</p>
            <div className="relative inline-flex">
              <a href="/contact" className="px-8 py-4 rounded-full text-white font-semibold shadow-2xl bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all">Get Free Quote</a>
            </div>
            <div className="relative mt-3 text-xs text-muted-foreground">Trusted by 500+ architects & businesses</div>
          </div>
        </div>
      </section>

      {/* Footer (page-local) */}
      <footer className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><IconPhone size={20} /></div>
              <a href="tel:+919930775152" className="font-semibold">+91 9930775152</a>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><IconMail size={20} /></div>
              <a href="mailto:info@ezzypackagingsolutions.com" className="font-semibold">info@ezzypackagingsolutions.com</a>
            </div>
            <div className="flex items-center justify-start md:justify-end gap-3">
              <a href="https://wa.me/919930775152" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center"><IconBrandWhatsapp size={20} /></a>
              <a href="https://www.indiamart.com/ezzypackagingsolutions/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center overflow-hidden">
                <img src="https://www.indiamart.com/favicon.ico" alt="IndiaMART" className="w-5 h-5 object-contain" />
              </a>
            </div>
          </div>
        </div>
        
      </footer>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Get started with a free consultation and quote. Our experts are ready to bring your vision to life.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 hover:text-primary transition-colors"
              >
                Get Free Quote
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


