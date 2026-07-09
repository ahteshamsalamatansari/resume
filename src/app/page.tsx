import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';
import Preloader from '@/components/Preloader';
import Nav from '@/components/Nav';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import CaseStudies from '@/components/sections/CaseStudies';
import Experience from '@/components/sections/Experience';
import Writing from '@/components/sections/Writing';
import Finale from '@/components/sections/Finale';

export default function HomePage() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <CaseStudies />
        <Experience />
        <Writing />
        <Finale />
      </main>
    </SmoothScroll>
  );
}
