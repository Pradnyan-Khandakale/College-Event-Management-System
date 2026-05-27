"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Quote, MessageSquare, Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "We reduced certificate distribution work from 3 days to 10 minutes. The Razorpay split routing solved our accounts settlement speed block in one go.",
    name: "Aarav Sharma",
    role: "Technical Convener",
    org: "IIT Bombay Techfest",
    initials: "AS",
    color: "from-purple-500 to-indigo-500",
  },
  {
    quote: "EventOS handled all 4,000 registrations for our national hackathon. QR checking took less than 2 seconds per student. Absolutely seamless.",
    name: "Riya Sen",
    role: "Lead Organizer",
    org: "BITS Pilani APOGEE",
    initials: "RS",
    color: "from-blue-500 to-cyan-500",
  },
  {
    quote: "The LinkedIn sharing credential pipeline is a genius viral loop. Our fest saw a 40% uptick in registrations as students shared their certificates.",
    name: "Karan Patel",
    role: "Cultural Secretary",
    org: "NIT Trichy Pragyan",
    initials: "KP",
    color: "from-cyan-500 to-emerald-500",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden px-6 bg-slate-950/20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-bg-purple opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs font-semibold mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Loved by Student Organizers
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            See how major college hackathons, technical societies, and cultural festivals save hundreds of hours of administrative friction.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <Card className="flex flex-col justify-between h-full p-8 bg-slate-950/60 border border-white/5 relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 pointer-events-none" />
                
                {/* Five Stars */}
                <div className="flex gap-1 mb-6 text-yellow-500/80">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500/85 text-transparent" />
                  ))}
                </div>

                <blockquote className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium mb-8">
                  "{t.quote}"
                </blockquote>

                {/* Profile Details */}
                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                  {/* Colored initial badge */}
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${t.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    {t.initials}
                  </div>
                  <div>
                    <cite className="not-italic text-sm sm:text-base font-bold text-white block">
                      {t.name}
                    </cite>
                    <span className="text-[11px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider block mt-0.5">
                      {t.role}, <span className="text-slate-400 font-semibold">{t.org}</span>
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
