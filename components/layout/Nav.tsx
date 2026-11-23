"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/data/site";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis(({ scroll }) => setScrolled(scroll > 40));

  const go = (id: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      lenis?.scrollTo(`#${id}`, { offset: -80 });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-ink/70 backdrop-blur-md" : ""
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
          <Link href="/" className="text-lg font-semibold tracking-tight" aria-label="Home">
            {site.short}
            <span className="text-accent">.</span>
          </Link>

          <ul className="hidden items-center gap-8 text-sm md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/#${l.id}`}
                  onClick={go(l.id)}
                  className="relative text-paper/70 transition-colors hover:text-paper after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={site.cv}
              download
              className="hidden rounded-full border border-paper/20 px-4 py-2 text-xs uppercase tracking-widest transition-colors hover:border-accent hover:bg-accent hover:text-ink md:inline-block"
            >
              Resume
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span className={`h-px w-6 bg-paper transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-6 bg-paper transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-12 md:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                <Link href={`/#${l.id}`} onClick={go(l.id)} className="block py-2 font-serif text-5xl">
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <a href={site.cv} download className="mt-8 text-accent">
              Download resume ↓
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
