import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Manifest from '../components/Manifest';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import About from '../components/About';
import Thinking from '../components/Thinking';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Marquee />
      <Manifest />
      <div className="hr-divider" />
      <Projects />
      <div className="hr-divider" />
      <Skills />
      <div className="hr-divider" />
      <About />
      <hr className="hr-divider" />
      <Thinking />
      <Contact />
      <Footer />
    </PageTransition>
  );
}
