"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLoaded } from "@/lib/useLoaded";
import LottiePlayer from "@/components/ui/LottiePlayer";
import { site } from "@/data/site";
import pulse from "@/lottie/pulse.json";
import scroll from "@/lottie/scroll.json";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const loaded = useLoaded();

  useGSAP(
    () => {
      gsap.set(".hero-line", { yPercent: 110 });
      gsap.set(".hero-fade", { autoAlpha: 0, y: 20 });
      if (!loaded) return;

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(".hero-line", { yPercent: 0, duration: 1.3, stagger: 0.12 })
        .to(".hero-fade", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=0.8");

      // parallax out on scroll
      gsap.to(".hero-content", {
        yPercent: -15,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: ref, dependencies: [loaded] }
  );

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-10 pt-32 md:px-10">
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-transparent" />

      <div className="hero-content relative z-10 mx-auto w-full max-w-[1600px]">
        <div className="hero-fade label mb-8 flex items-center gap-2">
          <LottiePlayer data={pulse} className="h-6 w-6" />
          Available for projects
        </div>

        <h1 className="text-[15vw] font-medium leading-[0.88] tracking-[-0.045em] md:text-[10vw]">
          <span className="block overflow-hidden"><span className="hero-line block">Spaces</span></span>
          <span className="block overflow-hidden">
            <span className="hero-line block">
              <em className="font-serif font-normal text-accent">imagined</em> in
            </span>
          </span>
          <span className="block overflow-hidden"><span className="hero-line block">light &amp; AI.</span></span>
        </h1>

        <div className="mt-10 grid items-end gap-6 md:grid-cols-12">
          <p className="hero-fade max-w-xl text-lg text-paper/70 md:col-span-6">
            <span className="text-paper">{site.name}</span> — {site.role}. {site.experience}+ years turning
            architecture into images, and images into scalable AI workflows.
          </p>
          <div className="hero-fade flex items-center gap-3 md:col-span-3 md:col-start-10 md:justify-end">
            <LottiePlayer data={scroll} className="h-12 w-8" />
            <span className="label">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
