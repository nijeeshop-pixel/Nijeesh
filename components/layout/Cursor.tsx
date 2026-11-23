"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Accent follower dot; grows and shows a label over elements with data-cursor="Label".
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 500, damping: 40, mass: 0.5 });
  const y = useSpring(my, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(el?.dataset.cursor ?? null);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center rounded-full bg-accent text-[11px] font-medium uppercase tracking-wider text-ink"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: label ? 84 : 10, height: label ? 84 : 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {label && <span>{label}</span>}
    </motion.div>
  );
}
