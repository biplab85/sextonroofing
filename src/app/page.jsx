import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import ServiceCards from '@/components/home/ServiceCards';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import VideoSection from '@/components/home/VideoSection';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import GalleryPreview from '@/components/home/GalleryPreview';
import HighlightedProjects from '@/components/home/HighlightedProjects';
import ServiceArea from '@/components/home/ServiceArea';
import FAQ from '@/components/home/FAQ';
import ContactSection from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServiceCards />
      <WhyChooseUs />
      <VideoSection />
      <HighlightedProjects />
      <Testimonials />
      <HowItWorks />
      <GalleryPreview />
      <ServiceArea />
      <FAQ />
      <ContactSection />
    </>
  );
}
