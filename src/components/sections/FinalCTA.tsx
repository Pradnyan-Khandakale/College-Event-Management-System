"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  // Generate random particles coords on mount to avoid SSR hydration mismatches
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; delay: number; duration: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 6,
    }));
    setParticles(generated);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden px-6">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full glow-bg-purple opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Glow CTA Card container */}
        <div className="glass-card-no-hover relative rounded-3xl p-8 sm:p-16 text-center overflow-hidden">
          {/* Grid background overlay */}
          <div className="dot-bg opacity-40 dark:opacity-30" />

          {/* Floating animated particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-1 h-1 rounded-full bg-cyan-600/20 dark:bg-cyan-400/40"
              style={{
                left: p.left,
                top: p.top,
              }}
              animate={{
                y: [0, -120, 0],
                opacity: [0.2, 0.9, 0.2],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Star badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/10 dark:border-purple-500/20 bg-purple-500/5 text-purple-650 dark:text-purple-300 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md relative z-10 select-none"
          >
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Ready to upgrade your workflow?</span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-3xl mx-auto leading-[1.1] relative z-10">
            Launch Your Next <br />
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-400 dark:via-indigo-300 dark:to-cyan-400 bg-clip-text text-transparent">
              College Event in Minutes
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mt-6 leading-relaxed relative z-10">
            Join hundreds of departments, campus clubs, and hackathon teams using EventOS to collect payments and automate credential checkouts.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 w-full sm:w-auto relative z-10">
            <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
              Start Free <ArrowRight className="w-4.5 h-4.5" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <Calendar className="w-4.5 h-4.5 text-cyan-600 dark:text-cyan-400" /> Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
