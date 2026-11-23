"use client";
import { useEffect } from "react";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "@/lib/gsap";

// Runs on every route change: fade-in + scroll reset (or jump to #hash).
export default function Template({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    if (hash) {
      const t = setTimeout(() => lenis.scrollTo(hash, { offset: -80 }), 350);
      return () => clearTimeout(t);
    }
    lenis.scrollTo(0, { immediate: true });
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(t);
  }, [lenis]);

  // opacity only — a transform here would break position:fixed children (lightbox)
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      {children}
    </motion.main>
  );
}
