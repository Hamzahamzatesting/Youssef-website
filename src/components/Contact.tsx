import { motion } from 'motion/react';
import { Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-40 bg-brand-bg relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] serif italic text-white/[0.02] -z-0 whitespace-nowrap pointer-events-none">
        Get In Touch
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-6 block">Ready to Collaborate?</span>
            <h2 className="text-5xl md:text-7xl serif leading-tight">
              Let's create something <span className="italic">extraordinary.</span>
            </h2>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-widest text-brand-text/40 ml-4">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Youssef Tayibi" 
                  className="w-full bg-white/[0.03] border border-white/5 px-6 py-4 outline-none focus:border-brand-gold/50 transition-colors duration-300 font-light italic"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-widest text-brand-text/40 ml-4">Email Address</label>
                <input 
                  type="email" 
                  placeholder="youssef@studio.ma" 
                  className="w-full bg-white/[0.03] border border-white/5 px-6 py-4 outline-none focus:border-brand-gold/50 transition-colors duration-300 font-light italic"
                />
              </div>
            </div>
            
            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-widest text-brand-text/40 ml-4">Your Message</label>
              <textarea 
                rows={6}
                placeholder="Tell us about your project or vision..." 
                className="w-full bg-white/[0.03] border border-white/5 px-6 py-6 outline-none focus:border-brand-gold/50 transition-colors duration-300 font-light italic resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full md:w-auto bg-brand-gold text-brand-bg px-16 py-6 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-text hover:text-brand-bg transition-all duration-500 flex items-center justify-center gap-4 group"
            >
              Send Vision Request
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
