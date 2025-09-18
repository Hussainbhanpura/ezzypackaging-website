"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import YouTube from "react-youtube";

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
  description?: string;
}

export function YouTubeVideo({ videoId, title, description }: YouTubeVideoProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      showinfo: 0,
      modestbranding: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-white to-gray-100 p-1">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-xl"
        >
          <YouTube 
            videoId={videoId} 
            opts={opts}
            className="w-full"
            iframeClassName="w-full rounded-xl"
          />
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary opacity-20" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-primary opacity-30" />
      </div>
      
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-center"
        >
          <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
