import HeroSection from '../components/home/HeroSection'
import ServicesSection from '../components/home/ServicesSection'
import FormationsSection from '../components/home/FormationsSection'
import AboutSection from '../components/home/AboutSection'
import StatsSection from '../components/home/StatsSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import ContactSection from '../components/home/ContactSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FormationsSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  )
}
