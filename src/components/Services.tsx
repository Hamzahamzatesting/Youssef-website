import { motion } from 'motion/react';
import { Film, Camera, Users, Heart, Building2, Briefcase } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: '01',
      title: 'Film Direction',
      desc: 'Cinematic storytelling for music videos, commercials, and short narratives.',
      icon: <Film className="w-5 h-5 text-brand-gold" />
    },
    {
      id: '02',
      title: 'Portrait Photography',
      desc: 'Editorial-grade portraits that capture personality with dramatic lighting.',
      icon: <Camera className="w-5 h-5 text-brand-gold" />
    },
    {
      id: '03',
      title: 'Corporate Events',
      desc: 'High-end coverage for summits, launches, and professional gatherings.',
      icon: <Building2 className="w-5 h-5 text-brand-gold" />
    },
    {
      id: '04',
      title: 'Wedding Films',
      desc: 'Timeless cinematic wedding stories preserved in high definition.',
      icon: <Heart className="w-5 h-5 text-brand-gold" />
    },
    {
      id: '05',
      title: 'Content Creation',
      desc: 'Short-form visual content optimized for social media brand presence.',
      icon: <Briefcase className="w-5 h-5 text-brand-gold" />
    },
    {
      id: '06',
      title: 'Real Estate & Product',
      desc: 'Precision visuals for architectural projects and luxury product lines.',
      icon: <Users className="w-5 h-5 text-brand-gold" />
    },
  ];

  return (
    <section id="services" className="py-32 bg-brand-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-24">
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-6 block">Expertise</span>
          <h2 className="text-4xl md:text-6xl serif leading-tight">
            Specialized in <span className="italic">Visual storytelling</span> across every medium.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 border-thin hover:border-brand-gold/40 transition-all duration-500 bg-white/[0.02] flex flex-col items-start"
            >
              <div className="flex items-center justify-between w-full mb-8">
                <span className="text-xs serif italic text-brand-gold opacity-50">{service.id}</span>
                <div className="p-3 bg-brand-bg border border-white/5 group-hover:border-brand-gold/30 transition-colors duration-500">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl serif mb-4 group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-brand-text/50 text-sm leading-relaxed font-light">
                {service.desc}
              </p>
              <div className="mt-8 pt-8 border-t border-white/5 w-full flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[10px] uppercase tracking-widest text-brand-gold">Inquiry</span>
                <div className="w-8 h-[1px] bg-brand-gold"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
