"use client";
import { useLenis } from "lenis/react";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/anim/RevealText";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/data/site";

export default function Contact() {
  const lenis = useLenis();

  return (
    <section id="contact" className="mx-auto max-w-[1600px] px-6 pb-10 pt-32 md:px-10">
      <SectionLabel index="05">Contact</SectionLabel>
      <RevealText
        text="Let's build something remarkable."
        className="font-serif text-[14vw] leading-[0.9] md:text-[8vw]"
      />

      <a
        href={`mailto:${site.email}`}
        data-cursor="Email"
        className="group mt-12 inline-flex items-center gap-4 text-2xl transition-colors hover:text-accent md:text-4xl"
      >
        {site.email}
        <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
      </a>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <Magnetic>
          <a
            href={site.cv}
            download
            className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-medium text-ink transition-transform hover:scale-105"
          >
            Download CV ↓
          </a>
        </Magnetic>
        <ul className="flex flex-wrap gap-6 text-sm">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="text-paper/60 transition-colors hover:text-accent">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="mt-32 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-6 text-sm text-paper/50">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>{site.location}</p>
        <button type="button" onClick={() => lenis?.scrollTo(0)} className="transition-colors hover:text-accent">
          Back to top ↑
        </button>
      </footer>
    </section>
  );
}
