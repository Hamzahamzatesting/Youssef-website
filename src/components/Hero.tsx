import { motion } from 'motion/react';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6 h-full lg:grid lg:grid-cols-2 lg:gap-20 flex flex-col justify-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-8 py-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4 block">
              Director & Photographer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight serif"
          >
            Helping creatives <br /> 
            <span className="italic text-brand-gold whitespace-nowrap">stand out.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-brand-text/60 max-w-md text-lg leading-relaxed font-light"
          >
            Youssef Tayibi is a Rabat-based film director and photographer specializing in dark cinematic aesthetics and editorial storytelling for modern brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a 
              href="#work" 
              className="bg-brand-gold text-brand-bg px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-text transition-colors duration-300"
            >
              View Portfolio
            </a>
            <a 
              href="#contact" 
              className="border border-white/20 text-brand-text px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-brand-bg transition-all duration-300"
            >
              Start Project
            </a>
          </motion.div>
        </div>

        {/* Right - Asymmetric Grid */}
        <div className="relative h-[350px] md:h-[500px] lg:h-[700px] mt-12 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-12 grid-rows-12 h-full gap-4"
          >
            {/* Box 1 - Editorial */}
            <div className="col-span-12 row-span-7 lg:col-span-8 lg:row-span-8 overflow-hidden border-thin group relative">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" 
                alt="Editorial Photography" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale-[30%] brightness-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-bg/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Box 2 - Portrait */}
            <div className="hidden lg:block lg:col-span-4 lg:row-span-6 overflow-hidden border-thin group relative">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600" 
                alt="Portrait Session" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale-[50%] brightness-50"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Box 3 - Film */}
            <div className="col-span-8 row-span-5 lg:col-span-6 lg:row-start-9 lg:row-span-4 overflow-hidden border-thin group relative">
              <img 
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600" 
                alt="Film Production" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale-[20%] brightness-75"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Geometric Accent */}
            <div className="col-span-4 row-span-5 lg:col-span-4 lg:row-start-7 lg:row-span-6 border-l border-t border-brand-gold/30 bg-brand-gold/5 flex items-center justify-center">
               <span className="serif text-5xl lg:text-7xl opacity-10 text-brand-gold italic">01</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
