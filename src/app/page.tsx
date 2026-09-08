import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';
import Preloader from '@/components/Preloader';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import CaseStudies from '@/components/sections/CaseStudies';
import Experience from '@/components/sections/Experience';
import Writing from '@/components/sections/Writing';
import Faq from '@/components/sections/Faq';
import Finale from '@/components/sections/Finale';
import {
  graph,
  profilePageSchema,
  faqSchema,
  itemListSchema,
  allProjectItems,
  allCaseStudyItems,
} from '@/lib/schema';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          profilePageSchema(),
          faqSchema(),
          itemListSchema('Selected work', allProjectItems),
          itemListSchema('Case studies', allCaseStudyItems)
        )}
      />
      <SmoothScroll>
        <Preloader />
        <Cursor />
        <Nav />
        <main id="main" className="relative">
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Projects />
          <CaseStudies />
          <Experience />
          <Writing />
          <Faq />
          <Finale />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
