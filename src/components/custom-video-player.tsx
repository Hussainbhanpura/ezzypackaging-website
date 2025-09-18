"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const YouTube = dynamic(() => import("react-youtube"), { ssr: false });

interface CustomVideoPlayerProps {
  videoSrc: string;
  posterImage?: string; // only useful if using self-hosted
  title?: string;
}

type YTPlayer = {
  playVideo?: () => void;
  pauseVideo?: () => void;
  mute?: () => void;
  unMute?: () => void;
  getPlayerState?: () => number;
};

export function CustomVideoPlayer({ videoSrc, posterImage, title }: CustomVideoPlayerProps) {
  const playerRef = useRef<YTPlayer | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.6 });

  const safePlay = () => {
    try {
      playerRef.current?.playVideo?.();
    } catch {}
  };

  const safePause = () => {
    try {
      playerRef.current?.pauseVideo?.();
    } catch {}
  };

  const attemptAutoplay = useCallback(() => {
    if (!playerRef.current) return;
    try {
      playerRef.current.unMute?.();
      setIsMuted(false);
    } catch {}
    safePlay();
    setTimeout(() => {
      try {
        const state = playerRef.current?.getPlayerState?.();
        if (state !== 1) {
          playerRef.current?.mute?.();
          setIsMuted(true);
          safePlay();
        }
      } catch {}
    }, 600);
  }, []);

  const handleReady = (event: { target: YTPlayer }) => {
    playerRef.current = event.target;
    try {
      // Default unmuted per requirement
      event.target.unMute?.();
      setIsMuted(false);
    } catch {}
    if (inView) {
      attemptAutoplay();
    }
  };

  useEffect(() => {
    if (!playerRef.current) return;
    if (inView) {
      attemptAutoplay();
    } else {
      safePause();
    }
  }, [inView, attemptAutoplay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-transparent">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-xl"
        >
          <div ref={inViewRef} className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[500px] overflow-hidden">
            <YouTube
              videoId={videoSrc}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  playsinline: 1,
                  autoplay: 1,
                  controls: 0,
                },
              }}
              iframeClassName="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
              onReady={handleReady}
            />
            {/* Mobile overlay: intercept taps to avoid YouTube redirects; only show mute toggle */}
            <div className="absolute inset-0 md:hidden z-10 pointer-events-auto">
              <button
                type="button"
                onClick={() => {
                  if (!playerRef.current) return;
                  if (isMuted) {
                    try { playerRef.current?.unMute?.(); } catch {}
                    setIsMuted(false);
                  } else {
                    try { playerRef.current?.mute?.(); } catch {}
                    setIsMuted(true);
                  }
                }}
                className="absolute bottom-3 right-3 px-3 py-1.5 text-xs font-bold rounded-full bg-white/90 text-black shadow"
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-center"
        >
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
        </motion.div>
      )}
    </motion.div>
  );
}
