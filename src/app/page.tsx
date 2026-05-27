"use client";

import React from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Features from "@/components/sections/Features";
import CertificateAutomation from "@/components/sections/CertificateAutomation";
import HowItWorks from "@/components/sections/HowItWorks";
import AnalyticsDashboard from "@/components/sections/AnalyticsDashboard";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050716] overflow-x-hidden text-slate-100 selection:bg-purple-500/30 selection:text-white">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Sticky Navigation */}
      <Navbar />

      {/* Hero Header */}
      <Hero />

      {/* Trusted By / Social Proof */}
      <Trust />

      {/* Modular Feature Grid */}
      <Features />

      {/* Certificate Automation Showcase (Main USP) */}
      <CertificateAutomation />

      {/* Step by Step Timeline */}
      <HowItWorks />

      {/* Interactive Analytics Preview */}
      <AnalyticsDashboard />

      {/* Client Testimonials */}
      <Testimonials />

      {/* Pricing Tables */}
      <Pricing />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Centered Final Call-to-Action */}
      <FinalCTA />

      {/* Footer Sitemap */}
      <Footer />
    </div>
  );
}
