"use client";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  IconTarget, 
  IconHeart, 
  IconShield, 
  IconTrendingUp,
  IconAward,
  IconUsers,
  IconCalendar,
  IconMapPin
} from "@tabler/icons-react";

export default function AboutPage() {
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: storyRef, inView: storyInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: valuesRef, inView: valuesInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const companyStats = [
    { icon: <IconCalendar size={20} />, label: "Founded", value: "2013", desc: "Over a decade of excellence" },
    { icon: <IconMapPin size={20} />, label: "Location", value: "Darukhana, Mumbai", desc: "Maharashtra - 400010" },
    { icon: <IconUsers size={20} />, label: "Team Size", value: "10+", desc: "Skilled professionals" },
    { icon: <IconAward size={20} />, label: "GST Reg", value: "Certified", desc: "27AIKPB1582G1ZE" },
  ];

  const coreValues = [
    {
      icon: <IconTarget size={24} />,
      title: "Quality First",
      description: "We never compromise on quality. Every product undergoes rigorous testing to ensure it meets our high standards."
    },
    {
      icon: <IconHeart size={24} />,
      title: "Customer Centricity",
      description: "Our customers are at the heart of everything we do. We build lasting relationships through exceptional service."
    },
    {
      icon: <IconTrendingUp size={24} />,
      title: "Continuous Innovation",
      description: "We constantly experiment with new materials, techniques, and processes to deliver better solutions."
    },
    {
      icon: <IconShield size={24} />,
      title: "Integrity & Trust",
      description: "Transparency in our dealings and reliability in our commitments have earned us our reputation."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="About Ezzy Packaging Solutions | Leading Film Manufacturer in India"
        description="Learn about Ezzy Packaging Solutions, a trusted manufacturer of glass etching films, mirror backing films & protective films since 2014. Quality-driven, Pan-India supply."
      />
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.03, 0.06, 0.03]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary blur-3xl"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <Badge variant="outline" className="px-4 py-2 text-primary border-primary/30">
                About Ezzy Packaging Solutions
              </Badge>
            </motion.div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-primary">Premium Glass Etching Films</span>
              <br />
              <span className="text-foreground">Since 2013</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              
            </p>

            {/* Company Stats */}
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              {companyStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center p-4 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {stat.icon}
                    </div>
                    <div className="font-semibold text-primary">{stat.value}</div>
                    <div className="text-sm font-medium text-foreground">{stat.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.desc}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground">Building trust through quality and innovation</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Founded with Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Established in 2013, Ezzy Packaging Solutions began with a simple vision: to provide 
                    high-quality glass films that combine functionality with aesthetic appeal. We started 
                    as a small team in Mumbai with big dreams and unwavering commitment to quality.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">8 Years of Innovation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Over the years, we have experimented with different PVC films, adhesives, and 
                    cost-effective production techniques. This continuous innovation has allowed us 
                    to offer our clients better quality products at affordable prices.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Trusted Partner</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Today, we are trusted by some of the best-known dealers in the glass etching industry. 
                    We may not claim to be the biggest, but we are proud to be one of the most reliable 
                    names in the business.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">Ezzy Rolls</div>
                    <div className="text-lg text-muted-foreground mb-4">Our Manufacturing Brand</div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      Our PVC boasts of greater clarity, softer feel, and smooth operations for designers. 
                      We use standard adhesive which gives better tack and long-lasting qualities.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">500+</div>
                        <div className="text-xs text-muted-foreground">Happy Clients</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">100%</div>
                        <div className="text-xs text-muted-foreground">Quality Tested</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={valuesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and define our relationships with customers and partners.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 h-full border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {value.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who trust Ezzy Packaging Solutions 
              for their glass film needs. Let&#39;s create something amazing together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Link href="/services">View Services</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


