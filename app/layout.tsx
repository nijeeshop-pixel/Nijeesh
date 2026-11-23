import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Preloader from "@/components/layout/Preloader";
import Cursor from "@/components/layout/Cursor";
import Nav from "@/components/layout/Nav";
import { site } from "@/data/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-display",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.intro,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <body className="bg-ink font-sans text-paper antialiased">
        <SmoothScroll>
          <Preloader />
          <Cursor />
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
