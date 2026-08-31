'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import {
  Navbar,
  HeroSection,
  BrandStats,
  About,
  Services,
  TripPlannerWizard,
  Process,
  FAQ,
  Gallery,
  Contact,
  Footer,
  CustomCursor,
  AmbientGoldenDust,
  WhatsAppButton,
} from '@/components/website';

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
        <TripPlannerWizard />
        <Process />
        <FAQ />
        <Gallery />
        <Contact />
      </main>

      {/* Floating Concierge WhatsApp Widget */}
      <WhatsAppButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}
