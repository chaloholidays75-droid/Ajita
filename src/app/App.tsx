import { Navigation } from './components/navigation';
import { HeroSection } from './components/hero-section';
import { AboutSection } from './components/about-section';
import { ServicesSection } from './components/services-section';
import { WhyChooseSection } from './components/why-choose-section';
import { GlobalPresenceSection } from './components/global-presence-section';
// import { TestimonialsSection } from './components/testimonials-section';
import { ContactSection } from './components/contact-section';
import { Footer } from './components/footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />
      <GlobalPresenceSection />
      {/* <TestimonialsSection /> */}
      <ContactSection />
      <Footer />
    </div>
  );
}
