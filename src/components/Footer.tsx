import { Instagram, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-brand-bg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          {/* Logo & Info */}
          <div className="flex flex-col">
            <span className="serif text-3xl tracking-tighter text-brand-text mb-4">
              PROD<span className="italic">YOUS</span>
            </span>
            <p className="text-[10px] uppercase tracking-[0.4em] text-brand-text/30">
              © 2026 Youssef Tayibi — All Rights Reserved
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col md:flex-row gap-10">
            <a 
              href="https://instagram.com/prodyous.ma" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="p-2 border border-white/10 group-hover:border-brand-gold transition-colors">
                <Instagram className="w-4 h-4 group-hover:text-brand-gold transition-colors" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brand-text group-hover:text-brand-gold transition-colors">Instagram</span>
            </a>
            
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="p-2 border border-white/10 group-hover:border-brand-gold transition-colors">
                <ArrowUpRight className="w-4 h-4 group-hover:text-brand-gold transition-colors" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brand-text group-hover:text-brand-gold transition-colors">Threads</span>
            </a>
          </div>
        </div>
        
        {/* Secondary Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-10">
            <a href="#" className="text-[9px] uppercase tracking-[0.3em] text-brand-text/30 hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="text-[9px] uppercase tracking-[0.3em] text-brand-text/30 hover:text-brand-gold transition-colors">Terms of Service</a>
          </div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-brand-text/30 italic">
            Based in Rabat, Morocco.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
