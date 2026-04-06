import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Shield, Network, Heart, Zap } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Trust & Reliability',
    description: 'Years of proven excellence with thousands of satisfied clients worldwide.'
  },
  {
    icon: Network,
    title: 'Global Network',
    description: 'Strategic partnerships and presence across 75+ countries for seamless service.'
  },
  {
    icon: Heart,
    title: 'Personalized Experience',
    description: 'Tailored solutions that understand and adapt to your unique requirements.'
  },
  {
    icon: Zap,
    title: 'Seamless Coordination',
    description: 'End-to-end support with real-time assistance and dedicated account management.'
  }
];

export function WhyChooseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 bg-[#0A1A2F] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] tracking-wider text-sm mb-4 block">WHY CHOOSE US</span>
          <h2 className="text-4xl md:text-5xl mb-6 font-light">
            Excellence in <br />
            <span className="font-semibold">Every Detail</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We go beyond expectations to deliver world-class international services.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D4AF37]/20"
                >
                  <Icon className="w-10 h-10 text-[#0A1A2F]" />
                </motion.div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


