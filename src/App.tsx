import { lazy, Suspense, useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Stats from './components/Stats';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

// Heavy components — split into separate chunks, loaded only when needed
const Portfolio = lazy(() => import('./components/Portfolio'));
const Location  = lazy(() => import('./components/Location'));

export default function App() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar onStartProject={() => setFormOpen(true)} />
      <Hero   onStartProject={() => setFormOpen(true)} />
      <Marquee />
      <Stats />
      <Suspense fallback={null}>
        <Portfolio />
      </Suspense>
      <Services />
      <Testimonials />
      <About />
      <Suspense fallback={null}>
        <Location />
      </Suspense>
      <Contact />
      <Footer />
      <ProjectModal open={formOpen} onClose={() => setFormOpen(false)} />
    </main>
  );
}
