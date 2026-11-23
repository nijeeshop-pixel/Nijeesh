"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/anim/Reveal";
import { site } from "@/data/site";

const statement =
  "I build images of places that don't exist yet — and the AI workflows that let teams create them faster, at scale, without losing the craft.";

const stats = [
  { value: `${site.experience}+`, label: "Years experience" },
  { value: "3D × AI", label: "Hybrid pipelines" },
  { value: "∞", label: "Variations, one workflow" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  // words light up as you scroll (scrubbed)
  useGSAP(
    () => {
      gsap.fromTo(
        ".aw",
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".about-text", start: "top 80%", end: "bottom 50%", scrub: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="about" className="mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-48">
      <SectionLabel index="01">About</SectionLabel>
      <p className="about-text max-w-6xl text-4xl leading-[1.1] tracking-tight md:text-6xl">
        {statement.split(" ").map((w, i) => (
          <span key={i} className="aw">
            {w}{" "}
          </span>
        ))}
      </p>

      <div className="mt-24 grid gap-10 border-t border-paper/10 pt-10 md:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <p className="font-serif text-6xl text-accent md:text-7xl">{s.value}</p>
            <p className="label mt-2">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
