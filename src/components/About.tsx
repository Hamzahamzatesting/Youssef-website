import { motion } from 'motion/react';

const About = () => {
  return (
    <section id="about" className="py-32 bg-brand-bg">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden border-thin grayscale brightness-75">
              <img 
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800" 
                alt="Youssef Tayibi" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Float Badge */}
            <div className="absolute -bottom-8 -right-8 bg-brand-gold p-8 text-brand-bg shadow-2xl">
               <span className="serif italic text-4xl block mb-2 leading-none">Prodyous</span>
               <span className="text-[10px] uppercase tracking-widest font-bold opacity-80">@prodyous.ma</span>
            </div>
          </motion.div>

          {/* Right - Copy */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-6 block">Our Story</span>
              <h2 className="text-4xl md:text-6xl serif leading-tight">
                Crafting <span className="italic">cinematic narratives</span> in the heart of Morocco.
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 text-brand-text/60 font-light text-lg leading-relaxed max-w-xl"
            >
              <p>
                Based in Rabat, Youssef Tayibi founded Prodyous Studio with a singular vision: to bring cinematic precision to every frame. With over 5 years of experience across film and photography, we blend editorial luxury with authentic storytelling.
              </p>
              <p>
                Our work is characterized by dramatic lighting, moody atmospheres, and a commitment to helping brands and individuals stand out in an increasingly noisy visual landscape. Every project is an opportunity to redefine boundaries.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-8 grid grid-cols-2 gap-12"
            >
              <div>
                <span className="text-3xl serif block mb-2 italic">Rabat</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold">Main Studio</span>
              </div>
              <div>
                <span className="text-3xl serif block mb-2 italic">Global</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold">Availability</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
