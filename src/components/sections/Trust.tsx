"use client";

import React from "react";
import { motion } from "framer-motion";

const brands = [
  { name: "IIT Bombay", logo: "IIT BOMBAY" },
  { name: "BITS Pilani", logo: "BITS PILANI" },
  { name: "Delhi University", logo: "DELHI UNIV" },
  { name: "NIT Trichy", logo: "NIT TRICHY" },
  { name: "SRM University", logo: "SRM UNIV" },
  { name: "VIT Vellore", logo: "VIT VELLORE" },
];

export default function Trust() {
  return (
    <section className="py-12 border-y border-border bg-muted/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8 select-none">
          Trusted by student clubs, hackathons, and college festivals
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center opacity-75">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center justify-center"
            >
              <span className="text-sm sm:text-base font-bold tracking-widest text-muted-foreground/75 hover:text-foreground transition-colors duration-300 select-none font-mono">
                {brand.logo}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
