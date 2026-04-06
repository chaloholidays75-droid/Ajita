import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80"
          alt="Luxury International Travel"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A2F]/80 via-[#0A1A2F]/70 to-[#0A1A2F]/90"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] tracking-wider text-sm">
              AJITA INTERNATIONAL
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight">
            Connecting You <br />
            <span className="font-semibold bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent">
              to the World
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-3xl mx-auto leading-relaxed">
            Global travel, international experiences, and beyond.
          </p>

          <motion.button
            onClick={() => scrollToSection('services')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A1A2F] rounded-full shadow-2xl shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition-all duration-300"
          >
            Explore Our Services
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <ChevronDown className="text-white/60 w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
