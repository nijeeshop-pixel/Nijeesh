"use client";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/anim/RevealText";
import Magnetic from "@/components/ui/Magnetic";
import GalleryCard from "@/components/gallery/GalleryCard";
import Lightbox from "@/components/gallery/Lightbox";
import { featured, projects } from "@/data/projects";

export default function SelectedWork() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".work-item");
      gsap.set(items, { autoAlpha: 0, y: 60 });
      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="work" className="mx-auto max-w-[1600px] px-6 py-24 md:px-10">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel index="02">Selected work</SectionLabel>
          <RevealText text="Recent renders" className="text-5xl font-medium tracking-tight md:text-8xl" />
        </div>
        <p className="label">({featured.length} / {projects.length})</p>
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {featured.map((p, i) => (
          <div key={p.id} className="work-item mb-4 break-inside-avoid">
            <GalleryCard project={p} onOpen={() => setIndex(i)} priority={i < 3} />
          </div>
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <Magnetic>
          <Link
            href="/work"
            className="group inline-flex items-center gap-4 rounded-full border border-paper/20 px-10 py-5 text-lg transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink"
          >
            View all work
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Magnetic>
      </div>

      <Lightbox items={featured} index={index} onClose={close} onIndex={setIndex} />
    </section>
  );
}
