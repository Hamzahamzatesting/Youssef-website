import { motion } from 'motion/react';

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: 'Midnight in Rabat',
      category: 'Street Photography',
      image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=800',
      isLarge: true
    },
    {
      id: 2,
      title: 'Echoes of Atlas',
      category: 'Film Trailer',
      image: 'https://images.unsplash.com/photo-1533470192478-9997acc4337d?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 3,
      title: 'Editorial Noir',
      category: 'Fashion Photography',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 4,
      title: 'The Director',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1510168015902-6019a793a830?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 5,
      title: 'Sunset Solitude',
      category: 'Portrait',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
    },
  ];

  return (
    <section id="work" className="py-32 bg-brand-bg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-6 block">Gallery</span>
            <h2 className="text-4xl md:text-6xl serif">Selected <span className="italic">Works</span></h2>
          </div>
          <button className="text-[10px] uppercase tracking-[0.3em] text-brand-gold border-b border-brand-gold pb-2 hover:opacity-70 transition-opacity">
            View All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Asymmetric Masonry Grid */}
          <div className="lg:col-span-1 lg:row-span-2">
            <ProjectCard project={projects[0]} isTall={true} />
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <ProjectCard project={projects[1]} />
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <ProjectCard project={projects[2]} />
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <ProjectCard project={projects[3]} />
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <ProjectCard project={projects[4]} />
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, isTall }: { project: any, isTall?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className={`group relative overflow-hidden border-thin bg-white/5 cursor-pointer w-full h-full`}
  >
    <img 
      src={project.image} 
      alt={project.title} 
      className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
      referrerPolicy="no-referrer"
    />
    
    {/* Overlay */}
    <div className="absolute inset-0 bg-brand-bg/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm">
      <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        {project.category}
      </span>
      <h3 className="text-2xl serif text-brand-text translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
        {project.title}
      </h3>
      <div className="mt-8 w-12 h-[1px] bg-brand-gold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150"></div>
    </div>
  </motion.div>
);

export default Portfolio;
