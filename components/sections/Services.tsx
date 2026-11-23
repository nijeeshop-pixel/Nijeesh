"use client";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/anim/RevealText";
import Reveal from "@/components/anim/Reveal";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1600px] px-6 py-32 md:px-10">
      <SectionLabel index="04">Services</SectionLabel>
      <RevealText text="What I do" className="mb-16 text-5xl font-medium tracking-tight md:text-8xl" />
      <div className="border-t border-paper/10">
        {services.map((s, i) => (
          <Reveal key={s.title}>
            <div className="group grid gap-4 border-b border-paper/10 py-10 transition-colors duration-500 hover:bg-paper/[0.03] md:grid-cols-12 md:items-center">
              <span className="font-serif text-2xl text-paper/40 transition-colors group-hover:text-accent md:col-span-1">
                0{i + 1}
              </span>
              <h3 className="text-3xl tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:col-span-6 md:text-5xl">
                {s.title}
              </h3>
              <p className="text-paper/60 md:col-span-5">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
