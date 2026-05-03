import { lazy, Suspense } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Stats from './components/Stats';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Heavy components — split into separate chunks, loaded only when needed
const Portfolio = lazy(() => import('./components/Portfolio'));
const Location  = lazy(() => import('./components/Location'));

export default function App() {
  return (
    <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <Suspense fallback={null}>
        <Portfolio />
      </Suspense>
      <Services />
      <About />
      <Suspense fallback={null}>
        <Location />
      </Suspense>
      <Contact />
      <Footer />
    </main>
  );
}
