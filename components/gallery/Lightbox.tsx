"use client";
import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import type { Project } from "@/data/projects";

export default function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: Project[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const lenis = useLenis();
  const open = index !== null && items.length > 0;
  const current = open ? items[index] : null;

  const next = () => index !== null && onIndex((index + 1) % items.length);
  const prev = () => index !== null && onIndex((index - 1 + items.length) % items.length);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, lenis]);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[75vh] w-[92vw] md:w-[80vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={current.src} alt={current.title} fill sizes="90vw" className="object-contain" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6 text-sm md:p-10">
            <div>
              <p>{current.title}</p>
              <p className="text-paper/50">{current.category}</p>
            </div>
            <p className="text-paper/50">
              {String(index! + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
          </div>

          <button type="button" aria-label="Close" onClick={onClose}
            className="absolute right-6 top-6 text-3xl leading-none transition-colors hover:text-accent md:right-10">×</button>
          <button type="button" aria-label="Previous" onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-4 text-2xl transition-colors hover:text-accent md:left-6">←</button>
          <button type="button" aria-label="Next" onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-4 text-2xl transition-colors hover:text-accent md:right-6">→</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
