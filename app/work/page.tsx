import type { Metadata } from "next";
import WorkGallery from "@/components/gallery/WorkGallery";
import Contact from "@/components/sections/Contact";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `All Work — ${site.name}`,
  description: `Complete gallery of architectural visualisation and AI work by ${site.name}.`,
};

export default function WorkPage() {
  return (
    <>
      <WorkGallery projects={projects} />
      <Contact />
    </>
  );
}
