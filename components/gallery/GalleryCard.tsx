"use client";
import Image from "next/image";
import type { Project } from "@/data/projects";

export default function GalleryCard({
  project,
  onOpen,
  priority = false,
}: {
  project: Project;
  onOpen: () => void;
  priority?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="View"
      aria-label={`Open ${project.title}`}
      className="group relative block w-full overflow-hidden bg-white/5 text-left"
    >
      <Image
        src={project.src}
        alt={project.title}
        width={project.width}
        height={project.height}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
      />
      <div className="pointer-events-none absolute inset-0 flex items-end justify-between bg-linear-to-t from-black/75 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div>
          <p className="text-sm font-medium">{project.title}</p>
          <p className="text-xs text-paper/60">
            {project.category} — {project.year}
          </p>
        </div>
        <span className="text-xl text-accent">↗</span>
      </div>
    </button>
  );
}
