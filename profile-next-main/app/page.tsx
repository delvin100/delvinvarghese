import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Projects from "@/components/home/projects";
import Experience from "@/components/home/experience";
import Lab from "@/components/home/lab";
import Contact from "@/components/home/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Lab />
        <Contact />
      </main>
    </>
  );
}