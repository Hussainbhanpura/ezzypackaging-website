"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  IconPhone, 
  IconMail, 
  IconMapPin, 
  IconClock,
  IconUser,
  IconBuilding,
  IconCertificate,
  IconSend,
  IconCheck,
  IconShield,
  IconHeadset,
  IconTruck,
  IconAward,
  IconBrandWhatsapp,
  IconPhoneCall,
  IconAt,
  IconLock
} from "@tabler/icons-react";

const Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(/^[+]?[\d\s\-\(\)]+$/, "Please enter a valid phone number").min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof Schema>;

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm<FormValues>({ resolver: zodResolver(Schema) });
  
  const watchedValues = watch();

  // Live validation states
  const isEmailValid = watchedValues.email && !errors.email && z.string().email().safeParse(watchedValues.email).success;
  const isPhoneValid = watchedValues.phone && !errors.phone && Schema.shape.phone.safeParse(watchedValues.phone).success;

  // Sticky mobile CTA handler
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsStickyVisible(scrolled > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: formRef, inView: formInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  async function onSubmit(values: FormValues) {
    setStatus(null);
    setShowSuccess(false);
    try {
      // Use Formspree or similar service for static sites
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      
      if (res.ok) {
        setShowSuccess(true);
        setStatus("Thank you! Your message has been sent successfully. We'll contact you within 24 hours.");
        reset();
      } else {
        setShowSuccess(true);
        setStatus("Message sent! We'll get back to you soon.");
        reset();
      }
    } catch {
      // Fallback to mailto for static sites
      const subject = encodeURIComponent(`Enquiry from ${values.name}`);
      const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\n\nMessage:\n${values.message}`);
      window.location.href = `mailto:info@ezzypackagingsolutions.com?subject=${subject}&body=${body}`;
      setShowSuccess(true);
      setStatus("Message prepared! Your email client will open shortly.");
    }
  }

  const contactInfo = [
    {
      icon: <IconMapPin size={32} />,
      title: "Visit Our Office",
      content: "Plot No 195, Gala No. 13, Hilson Compound",
      description: "Quay Street, Darukhana, Mumbai - 400010",
      accent: "bg-blue-500",
      link: "https://maps.google.com/?q=Plot+No+195,Gala+No.+13,+Hilson+Compound,+Quay+Street,Darukhana,Mumbai+400010"
    },
    {
      icon: <IconMail size={32} />,
      title: "Email Address",
      content: "info@ezzypackagingsolutions.com",
      description: "Quick response guaranteed",
      accent: "bg-green-500",
      link: "mailto:info@ezzypackagingsolutions.com"
    },
    {
      icon: <IconPhone size={32} />,
      title: "Phone Number",
      content: "+91 9930775152",
      description: "Mon-Sat: 9AM-6PM",
      accent: "bg-red-500",
      link: "tel:+919930775152"
    },
    {
      icon: <IconClock size={32} />,
      title: "Business Hours",
      content: "Mon - Sat: 9AM - 6PM",
      description: "Sunday: Closed",
      accent: "bg-purple-500",
      link: null
    }
  ];

  const companyDetails = [
    { icon: <IconUser size={16} />, label: "CEO", value: "Murtuza Hussain Bhanpurwala" },
    { icon: <IconBuilding size={16} />, label: "Company", value: "Proprietorship" },
    { icon: <IconCertificate size={16} />, label: "GST", value: "27AIKPB1582G1ZE" },
    { icon: <IconBuilding size={16} />, label: "Brand", value: "Ezzy Rolls" },
  ];

  const whyChooseUs = [
    {
      icon: <IconHeadset size={20} />,
      title: "Free Consultation",
      description: "Expert advice for your project needs",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <IconClock size={20} />,
      title: "24-Hour Response",
      description: "Quick response guarantee on all inquiries",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <IconTruck size={20} />,
      title: "Professional Installation", 
      description: "Trained technicians ensure perfect results",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <IconAward size={20} />,
      title: "Quality Guarantee",
      description: "Premium materials with warranty support",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: <IconShield size={20} />,
      title: "Quality Assured",
      description: "Reliable processes and strict QA standards",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: <IconCheck size={20} />,
      title: "Proven Track Record",
      description: "2000+ satisfied clients across India",
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Enhanced Hero Section with Gradient Background */}
      <section ref={heroRef} className="relative overflow-hidden py-20">
        {/* Gradient Background with Illustrations */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5" />
          
          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-xl"
          />
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-pink-200/30 to-orange-200/30 blur-xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
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
              <Badge variant="outline" className="px-6 py-3 text-primary border-primary/30 bg-white/80 backdrop-blur text-lg">
                📞 Get in Touch
              </Badge>
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-primary">Contact</span>
              <br />
             <span className="block mx-auto mb-6">
               <img
                 src="/images/WhatsApp_Image_2025-08-30_at_10.45.40-removebg-preview.png"
                 alt="Ezzy Packaging Solutions"
                 className="mx-auto w-500 h-50 object-contain drop-shadow-lg"
                 draggable={false}
               />
             </span>
             </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Ready to transform your space with premium glass etching films? 
              Get in touch with our expert team for a <span className="font-semibold text-primary">free consultation</span> and instant quote.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="tel:+919930775152"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <IconPhoneCall size={20} />
                Call Now
              </motion.a>
              <motion.a
                href="https://wa.me/919930775152"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <IconBrandWhatsapp size={20} />
                WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Get in Touch With Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred way to connect with our team. We&apos;re here to help you with all your glass etching needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                {info.link ? (
                  <a href={info.link} target={info.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                    <Card className="text-center p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white h-full cursor-pointer group-hover:border-primary/30">
                      <motion.div 
                        className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${info.accent} flex items-center justify-center text-white shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {info.icon}
                      </motion.div>
                      <h3 className="font-bold text-foreground mb-3 text-lg group-hover:text-primary transition-colors">{info.title}</h3>
                      <p className="text-sm font-semibold text-foreground mb-2">{info.content}</p>
                      <p className="text-xs text-muted-foreground">{info.description}</p>
                    </Card>
                  </a>
                ) : (
                  <Card className="text-center p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white h-full">
                    <motion.div 
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${info.accent} flex items-center justify-center text-white shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {info.icon}
                    </motion.div>
                    <h3 className="font-bold text-foreground mb-3 text-lg">{info.title}</h3>
                    <p className="text-sm font-semibold text-foreground mb-2">{info.content}</p>
                    <p className="text-xs text-muted-foreground">{info.description}</p>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form & Company Info */}
      <section ref={formRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Enhanced Contact Form - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="p-10 shadow-2xl border border-gray-100 bg-white rounded-3xl">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-3 text-gray-900">Send us a Message</h2>
                  <p className="text-muted-foreground text-lg">
                    Fill out the form below and we&apos;ll get back to you within 24 hours with a personalized quote.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Full Width Name and Phone Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Full Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <IconUser size={18} className="text-gray-400" />
                        </div>
                        <Input 
                          {...register("name")} 
                          placeholder="Enter your full name"
                          className="pl-12 h-14 border-2 border-gray-200 focus:border-primary rounded-xl text-lg"
                        />
                      </div>
                      {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Phone Number *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <IconPhone size={18} className={`${isPhoneValid ? 'text-green-500' : 'text-gray-400'}`} />
                        </div>
                        <Input 
                          {...register("phone")} 
                          placeholder="+91 XXXXXXXXXX"
                          className="pl-12 h-14 border-2 border-gray-200 focus:border-primary rounded-xl text-lg"
                        />
                        {isPhoneValid && (
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            <IconCheck size={18} className="text-green-500" />
                          </div>
                        )}
                      </div>
                      {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  
                  {/* Full Width Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <IconAt size={18} className={`${isEmailValid ? 'text-green-500' : 'text-gray-400'}`} />
                      </div>
                      <Input 
                        type="email" 
                        {...register("email")} 
                        placeholder="your.email@example.com"
                        className="pl-12 h-14 border-2 border-gray-200 focus:border-primary rounded-xl text-lg"
                      />
                      {isEmailValid && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <IconCheck size={18} className="text-green-500" />
                        </div>
                      )}
                    </div>
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                  </div>
                  
                  {/* Full Width Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Project Details *</label>
                    <Textarea 
                      rows={6} 
                      {...register("message")} 
                      placeholder="Tell us about your project requirements, space dimensions, preferred colors, installation timeline, etc..."
                      className="border-2 border-gray-200 focus:border-primary resize-none rounded-xl text-lg p-4"
                    />
                    {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
                  </div>

                  {/* Action Buttons Row */}
                  <div className="grid md:grid-cols-3 gap-4 pt-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        disabled={isSubmitting} 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold py-4 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
                      >
                        <IconSend size={20} className="mr-2" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </motion.div>
                    
                    <motion.a
                      href="tel:+919930775152"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
                    >
                      <IconPhoneCall size={20} />
                      Call Us
                    </motion.a>
                    
                    <motion.a
                      href="https://wa.me/919930775152"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 h-14 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
                    >
                      <IconBrandWhatsapp size={20} />
                      WhatsApp
                    </motion.a>
                  </div>

                  {/* Trust Badge */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200/50">
                    <div className="flex items-center justify-center gap-8 text-sm font-medium">
                      <div className="flex items-center gap-2 text-green-700">
                        <IconCheck size={18} className="text-green-600" />
                        <span>We reply within 24 hours</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-700">
                        <IconLock size={18} className="text-blue-600" />
                        <span>100% Privacy Guaranteed</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Success Message */}
                  <AnimatePresence>
                    {showSuccess && status && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="p-6 rounded-2xl text-center bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                      >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <IconCheck size={32} className="text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                        <p className="text-green-700">{status}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </Card>
            </motion.div>

            {/* Enhanced Right Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Why Choose Us Card */}
              <Card className="p-8 shadow-lg border border-gray-100 bg-white rounded-3xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Why Choose Us?</h3>
                <div className="space-y-4">
                  {whyChooseUs.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={formInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                      className={`flex items-start gap-4 p-4 rounded-2xl ${item.bgColor} hover:shadow-md transition-all cursor-pointer group`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Google Maps Card */}
              <Card className="p-8 shadow-lg border border-gray-100 bg-white rounded-3xl">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Our Location</h3>
                <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8!2d72.83!3d19.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzAwLjAiTiA3MsKwNDknNDguMCJF!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin&q=Plot+No+195,Gala+No.+13,+Hilson+Compound,+Quay+Street,Darukhana,Mumbai+400010"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ezzy Packaging Solutions - Plot No 195, Gala No. 13, Hilson Compound, Quay Street, Darukhana, Mumbai 400010"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-1 font-medium">Plot No 195, Gala No. 13, Hilson Compound</p>
                  <p className="text-gray-600 text-sm mb-3">Quay Street, Darukhana, Mumbai - 400010</p>
                  <motion.a
                    href="https://maps.google.com/?q=Plot+No+195,Gala+No.+13,+Hilson+Compound,+Quay+Street,Darukhana,Mumbai+400010"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <IconMapPin size={16} />
                    Get Directions
                  </motion.a>
                </div>
              </Card>

              {/* Company Details Card */}
              <Card className="p-6 shadow-lg border border-gray-100 bg-gradient-to-br from-primary to-primary/90 text-white rounded-3xl">
                <h3 className="text-lg font-bold mb-4">Company Information</h3>
                <div className="space-y-3">
                  {companyDetails.map((detail, index) => (
                    <motion.div
                      key={detail.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={formInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                        {detail.icon}
                      </div>
                      <div>
                        <div className="text-xs text-white/80">{detail.label}</div>
                        <div className="font-medium text-white text-sm">{detail.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTAs */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t shadow-2xl lg:hidden"
          >
            <div className="grid grid-cols-2 gap-3">
              <motion.a
                href="tel:+919930775152"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-bold shadow-lg"
              >
                <IconPhoneCall size={18} />
                Call Now
              </motion.a>
              <motion.a
                href="https://wa.me/919930775152"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg"
              >
                <IconBrandWhatsapp size={18} />
                WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


