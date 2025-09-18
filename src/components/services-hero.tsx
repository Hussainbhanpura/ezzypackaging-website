"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { 
  IconBriefcase,
  IconMoodSmile,
  IconClockHour4
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function ServicesHero() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const StatCard = ({ icon, to, label }: { icon: React.ReactNode; to: number; label: string }) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      if (!inView) return;
      let raf: number;
      const start = performance.now();
      const duration = 1200;
      const animate = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setValue(Math.floor(p * to));
        if (p < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(raf);
    }, [inView, to]);
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-sm flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="text-xl font-bold text-foreground">{value}{to >= 100 ? "+" : ""}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </motion.div>
    );
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/globe.svg')] opacity-[0.02] bg-center bg-no-repeat" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block"
            >
              <span className="px-4 py-2 bg-white/30 backdrop-blur text-primary rounded-full text-sm font-medium border border-white/60">
                Professional Services
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-primary">Glass Etching</span>
              <br />
              <span className="text-foreground">Solutions</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              From concept to installation, we deliver premium glass etching solutions that transform spaces with elegance and functionality.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-2 max-w-xl"
            >
              <StatCard icon={<IconBriefcase size={20} />} to={500} label="Projects" />
              <StatCard icon={<IconMoodSmile size={20} />} to={98} label="Satisfaction" />
              <StatCard icon={<IconClockHour4 size={20} />} to={24} label="Turnaround (h)" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-2"
            >
              <Button asChild size="lg" className="rounded-full shadow-lg bg-gradient-to-r from-primary to-primary/90">
                <a href="/contact">Get Free Consultation</a>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-white/20 backdrop-blur-xl flex items-center justify-center"
              >
                <div className="text-center p-8">
                  <div className="text-4xl font-bold text-primary mb-2">Services</div>
                  <div className="text-lg text-muted-foreground">Professional Solutions</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              </motion.div>
              
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-lg">✨</span>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold">🎯</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
