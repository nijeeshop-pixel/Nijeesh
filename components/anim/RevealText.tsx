"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Word-by-word mask reveal on scroll (GSAP ScrollTrigger)
export default function RevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".rw",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
          <span className="rw inline-block">{w}&nbsp;</span>
        </span>
      ))}
    </div>
  );
}
