import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

const regions = [
  { name: 'North America', count: '12 Countries' },
  { name: 'Europe', count: '18 Countries' },
  { name: 'Asia Pacific', count: '15 Countries' },
  { name: 'Middle East', count: '8 Countries' }
];

export function GlobalPresenceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [countryCount, setCountryCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const target = 75;
    const timer = window.setInterval(() => {
      current += 3;
      if (current >= target) {
        setCountryCount(target);
        window.clearInterval(timer);
        return;
      }
      setCountryCount(current);
    }, 20);

    return () => window.clearInterval(timer);
  }, [isInView]);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] tracking-wider text-sm mb-4 block">GLOBAL PRESENCE</span>
          <h2 className="text-4xl md:text-5xl text-[#0A1A2F] mb-6 font-light">
            Serving Clients <br />
            <span className="font-semibold">Across the Globe</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our international network ensures seamless service delivery wherever you are.
          </p>
        </motion.div>

        {/* World Map Background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-12"
        >
          <div className="h-[500px] bg-gradient-to-br from-[#0A1A2F] to-[#1a3654] relative">
            <img 
              src="https://images.unsplash.com/photo-1570106413982-7f2897b8d0c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcCUyMGdsb2JhbCUyMG5ldHdvcmslMjBjb25uZWN0aW9ufGVufDF8fHx8MTc3MTg5OTc5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Global Network"
              className="w-full h-full object-cover opacity-30"
            />
            
            {/* Animated Dots */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={isInView ? { 
                  scale: [0, 1.2, 1],
                  opacity: [0, 1, 1]
                } : { scale: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="absolute w-4 h-4 bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/50"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`
                }}
              >
                <motion.div
                  animate={{ scale: [1, 2, 2], opacity: [1, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#D4AF37] rounded-full"
                />
              </motion.div>
            ))}

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-6xl md:text-8xl font-light text-white/90 mb-4"
                >
                  {countryCount}+
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-xl text-[#D4AF37]"
                >
                  Countries Worldwide
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Regional Breakdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center"
            >
              <MapPin className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h3 className="text-lg text-[#0A1A2F] mb-1">{region.name}</h3>
              <p className="text-gray-600 text-sm">{region.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


