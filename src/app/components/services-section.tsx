import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Plane, Sparkles, Briefcase, Globe, Users } from 'lucide-react';

const services = [
  {
    icon: Plane,
    title: 'International Travel Solutions',
    description: 'Comprehensive travel planning and booking services for global destinations with 24/7 support.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Sparkles,
    title: 'Luxury & Leisure Experiences',
    description: 'Curated high-end travel experiences, exclusive destinations, and premium accommodations.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Briefcase,
    title: 'Business & Corporate Travel',
    description: 'Tailored corporate travel management with cost efficiency and seamless coordination.',
    color: 'from-[#0A1A2F] to-[#1a3654]'
  },
  {
    icon: Globe,
    title: 'Global Support Services',
    description: 'Visa assistance, documentation, travel insurance, and multilingual customer support.',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: Users,
    title: 'Customized International Programs',
    description: 'Curated travel packages designed around your unique preferences and requirements.',
    color: 'from-[#D4AF37] to-[#B8941F]'
  }
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] tracking-wider text-sm mb-4 block">OUR SERVICES</span>
          <h2 className="text-4xl md:text-5xl text-[#0A1A2F] mb-6 font-light">
            Global Solutions for <br />
            <span className="font-semibold">Every Journey</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From leisure to business, we offer comprehensive international services tailored to your needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl text-[#0A1A2F] mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
