'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/Hero/HeroSection';
import BrandStats from '@/components/BrandStats';
import About from '@/components/About';
import Services from '@/components/Services';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import AmbientGoldenDust from '@/components/ui/AmbientGoldenDust';

export default function Home() {
  // Initialize cinematic smooth scrolling
  useSmoothScroll();

  return (
    <div className="relative min-h-screen bg-navy-900 text-cream selection:bg-gold-500/30 selection:text-gold-200">
      {/* Luxury Interactive Gold Cursor */}
      <CustomCursor />

      {/* Global Ambient Golden Embers & Floating Dust Canvas */}
      <AmbientGoldenDust />

      {/* Glassmorphic Sticky Header */}
      <Navbar />

      {/* Page Sections */}
      <main className="relative z-10">
        <HeroSection />
        <BrandStats />
        <About />
        <Services />
        <Process />
        <FAQ />
        <Gallery />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
