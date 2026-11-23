"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/anim/RevealText";
import { skills } from "@/data/skills";

const SkillsPlayground = dynamic(() => import("@/components/three/SkillsPlayground"), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center text-sm text-paper/40">Loading playground…</div>,
});

export default function Skills() {
  const [selected, setSelected] = useState(skills[0].name);
  const [shake, setShake] = useState(0);
  const [reset, setReset] = useState(0);
  const [visible, setVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const current = skills.find((s) => s.name === selected) ?? skills[0];

  // only mount the 3D scene when it's near the viewport
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills" className="mx-auto max-w-[1600px] px-6 py-32 md:px-10">
      <SectionLabel index="03">Skills — playground</SectionLabel>
      <div className="grid gap-10 lg:grid-cols-12">
        {/* info panel */}
        <div className="lg:col-span-4">
          <RevealText text="Drag. Throw. Stack." className="text-5xl font-medium tracking-tight md:text-7xl" />
          <p className="mt-6 max-w-sm text-paper/60">
            Every block is a tool in my kit. Grab one to learn more — or shake the table and build your own stack.
          </p>

          <div className="mt-10 min-h-[200px] border-t border-paper/10 pt-8" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <p className="label">{current.group}</p>
                <h3 className="mt-2 font-serif text-5xl text-accent">{current.name}</h3>
                <p className="mt-4 text-paper/70">{current.description}</p>
                <div className="mt-6 h-px w-full bg-paper/10">
                  <motion.div
                    className="h-px bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${current.level}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3D canvas */}
        <div
          ref={boxRef}
          className="relative h-[60vh] min-h-[420px] touch-pan-y overflow-hidden rounded-2xl border border-paper/10 md:h-[72vh] md:touch-none lg:col-span-8"
        >
          {visible && (
            <SkillsPlayground skills={skills} selected={selected} onSelect={setSelected} shake={shake} reset={reset} />
          )}
          <div className="absolute right-4 top-4 flex gap-2">
            <button type="button" onClick={() => setShake((v) => v + 1)}
              className="rounded-full bg-accent px-4 py-2 text-xs font-medium uppercase tracking-widest text-ink transition-transform hover:scale-105">
              Shake
            </button>
            <button type="button" onClick={() => setReset((v) => v + 1)}
              className="rounded-full border border-paper/20 bg-ink/60 px-4 py-2 text-xs uppercase tracking-widest backdrop-blur transition-colors hover:border-paper">
              Reset
            </button>
          </div>
          <p className="label pointer-events-none absolute bottom-4 left-4">Click &amp; drag the blocks</p>
        </div>
      </div>

      {/* accessible list fallback */}
      <ul className="mt-10 flex flex-wrap gap-2">
        {skills.map((s) => (
          <li key={s.name}>
            <button
              type="button"
              onClick={() => setSelected(s.name)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                s.name === selected ? "border-accent bg-accent text-ink" : "border-paper/15 hover:border-paper/50"
              }`}
            >
              {s.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
