"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, CalendarPlus, ShieldAlert, BadgeCent } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    icon: CalendarPlus,
    title: "Create Your Event",
    desc: "Set up details, customize your landing page theme, and design registration logic in under 5 minutes.",
    glow: "purple"
  },
  {
    num: "02",
    icon: BadgeCent,
    title: "Collect Signups & UPI",
    desc: "Deploy smart forms that support team registrations. Receive student payments directly with automated routing.",
    glow: "blue"
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Auto-Send Certificates",
    desc: "Map fields to your template. Our automated email system fires off verified PDF credentials as participants finish.",
    glow: "cyan"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden px-6">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full glow-bg-blue opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            From Draft to Dispatched in 3 Steps
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            No technical degrees required. Manage ticketing, scan codes, and verify achievements on an intuitive admin deck.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Connecting gradient line (Desktop only) */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-20 z-0" />

          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative z-10"
              >
                <Card glowColor={step.glow as any} className="flex flex-col items-center text-center p-8 bg-slate-950/70 border border-white/5 h-full">
                  {/* Step Number Bubble */}
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-950 border border-white/10 rounded-full text-xs font-mono font-bold tracking-widest text-purple-400 select-none">
                    STEP {step.num}
                  </span>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mt-2 transition-all duration-300 ${
                    step.glow === "purple" ? "bg-purple-500/10 text-purple-400" :
                    step.glow === "blue" ? "bg-blue-500/10 text-blue-400" :
                    "bg-cyan-500/10 text-cyan-400"
                  }`}>
                    <StepIcon className="w-6 h-6 animate-pulse" />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
