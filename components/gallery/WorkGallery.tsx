"use client";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { motion } from "motion/react";
import GalleryCard from "./GalleryCard";
import Lightbox from "./Lightbox";
import RevealText from "@/components/anim/RevealText";
import { categories, type Category, type Project } from "@/data/projects";
import { ScrollTrigger } from "@/lib/gsap";

type Filter = "All" | Category;
const filters: Filter[] = ["All", ...categories];

export default function WorkGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);

  const items = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects]
  );

  return (
    <section className="mx-auto max-w-[1600px] px-6 pb-24 pt-36 md:px-10">
      <Link href="/#work" className="label transition-colors hover:text-accent">
        ← Back home
      </Link>
      <div className="mb-12 mt-8 flex flex-wrap items-end justify-between gap-6">
        <RevealText text="All work" className="text-6xl font-medium tracking-tight md:text-9xl" />
        <p className="label">({items.length})</p>
      </div>

      {/* filters */}
      <div className="mb-12 flex flex-wrap gap-2" role="tablist">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => {
              setFilter(f);
              setTimeout(() => ScrollTrigger.refresh(), 100);
            }}
            className="relative rounded-full px-5 py-2 text-sm"
          >
            {filter === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className={`relative ${filter === f ? "text-ink" : "text-paper/60 hover:text-paper"}`}>{f}</span>
          </button>
        ))}
      </div>

      <div key={filter} className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((p, i) => (
          <motion.div
            key={p.id}
            className="mb-4 break-inside-avoid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: Math.min(i, 12) * 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            <GalleryCard project={p} onOpen={() => setIndex(i)} priority={i < 3} />
          </motion.div>
        ))}
      </div>

      <Lightbox items={items} index={index} onClose={close} onIndex={setIndex} />
    </section>
  );
}
