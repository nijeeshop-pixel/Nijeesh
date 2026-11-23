import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SelectedWork from "@/components/sections/SelectedWork";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SelectedWork />
      <Skills />
      <Services />
      <Contact />
    </>
  );
}
