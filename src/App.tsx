import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <Portfolio />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
