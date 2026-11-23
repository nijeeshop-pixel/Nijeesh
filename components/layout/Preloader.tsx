"use client";
import { useEffect, useState } from "react";
import { animate, AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { site } from "@/data/site";

// Counter preloader — shown once per browser session.
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    const finish = () => {
      window.__siteLoaded = true;
      window.dispatchEvent(new Event("site:loaded"));
    };
    if (sessionStorage.getItem("preloaded")) {
      setShow(false);
      finish();
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        sessionStorage.setItem("preloaded", "1");
        setTimeout(() => {
          setShow(false);
          finish();
        }, 250);
      },
    });
    return () => controls.stop();
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (show) lenis.stop();
    else lenis.start();
  }, [show, lenis]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-ink p-6 md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between">
            <span className="label">{site.name}</span>
            <span className="label hidden md:block">{site.role}</span>
          </div>
          <div>
            <div className="font-serif text-[28vw] leading-none text-accent md:text-[18vw]">
              {count}
              <span className="text-paper">%</span>
            </div>
            <div className="mt-4 h-px w-full bg-white/10">
              <div className="h-px bg-accent" style={{ width: `${count}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
