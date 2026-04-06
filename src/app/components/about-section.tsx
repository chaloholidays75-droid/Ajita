import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function AboutSection() {
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
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#D4AF37] tracking-wider text-sm mb-4 block">ABOUT US</span>
              <h2 className="text-4xl md:text-5xl text-[#0A1A2F] mb-6 font-light">
                A Global Brand for <br />
                <span className="font-semibold">International Excellence</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Ajita International is a premium global services company dedicated to transforming the way individuals and businesses experience international mobility. We are not just a travel agency—we are your gateway to a world of seamless connections, extraordinary experiences, and personalized solutions.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                With a presence spanning multiple continents, we deliver world-class services that blend innovation, reliability, and a commitment to excellence. Our mission is to empower you to explore, connect, and succeed on a global stage.
              </p>
            </motion.div>

            {/* Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="border-l-4 border-[#D4AF37] pl-6">
                <h3 className="text-[#0A1A2F] mb-2">Our Mission</h3>
                <p className="text-gray-600 text-sm">
                  To deliver seamless international travel solutions and efficient booking operations that consistently exceed customer expectations and strengthen global partnerships.
                </p>
              </div>
              <div className="border-l-4 border-[#0A1A2F] pl-6">
                <h3 className="text-[#0A1A2F] mb-2">Our Vision</h3>
                <p className="text-gray-600 text-sm">
                  To expand our global footprint by delivering exceptional travel experiences and operational excellence that drive lasting customer satisfaction and sustainable growth.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1759850426415-8888ea55b07b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBidXNpbmVzcyUyMHNreWxpbmUlMjBjaXR5JTIwbmlnaHR8ZW58MXx8fHwxNzcxOTE3MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Global Business"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F]/40 to-transparent"></div>
            
            {/* Floating Stats */}
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4">
              {[
                { value: `${countryCount}+`, label: 'Countries' },
                { value: '10K+', label: 'Clients' },
                { value: '15+', label: 'Years' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-semibold text-[#0A1A2F]">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


