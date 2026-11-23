"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Fade + rise when scrolled into view
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current, {
        autoAlpha: 0,
        y: 50,
        duration: 1.1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
