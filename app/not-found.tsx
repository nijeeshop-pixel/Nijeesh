import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-svh place-items-center px-6 text-center">
      <div>
        <p className="font-serif text-[30vw] leading-none text-accent md:text-[16vw]">404</p>
        <Link href="/" className="label hover:text-accent">← Back home</Link>
      </div>
    </section>
  );
}
