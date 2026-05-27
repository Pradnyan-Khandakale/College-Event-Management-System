"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ShieldCheck, Sparkles, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    period: "forever",
    desc: "Perfect for student societies and single-day club meets.",
    features: [
      "Custom single-page website builder",
      "Up to 150 registrations/event",
      "Basic ticket form customizer",
      "UPI & QR payment integration",
      "150 automated certificates",
      "Standard CSV participant export",
    ],
    recommended: false,
    btnText: "Get Started Free",
    glow: "none",
  },
  {
    name: "Pro",
    price: "₹1,999",
    period: "per month",
    desc: "Built for massive college fests, multi-track hackathons, and symposiums.",
    features: [
      "Everything in Starter",
      "Unlimited registrations & events",
      "Team & group signups supported",
      "Dynamic field certificate mapping",
      "Verified QR code security checks",
      "LinkedIn certificate sharing",
      "Bulk email queue updates",
      "Custom domain integration",
    ],
    recommended: true,
    btnText: "Go Pro Now",
    glow: "purple",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    desc: "Ideal for entire universities looking to standardize event flows.",
    features: [
      "Everything in Pro",
      "Dedicated university portal admin",
      "Multi-department access logs",
      "0% platform transaction surcharge",
      "Whitelabel email sender (SMTP)",
      "SLA guarantee & active phone support",
      "Dedicated integration manager",
    ],
    recommended: false,
    btnText: "Contact Sales",
    glow: "none",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden px-6">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-bg-purple opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pricing Options</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Transparent, Student-Friendly Plans
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            From casual club workshops to national level festivals, find the license package that fits your event.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="h-full"
            >
              <Card
                hoverEffect={!plan.recommended}
                className={`flex flex-col justify-between h-full p-8 relative rounded-3xl ${
                  plan.recommended
                    ? "bg-slate-950/90 border-purple-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.2)]"
                    : "bg-slate-950/40 border-white/5"
                }`}
              >
                {/* Popularity Badge */}
                {plan.recommended && (
                  <span className="absolute -top-4 right-6 px-3.5 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md flex items-center gap-1.5 border border-purple-500/30">
                    <Sparkles className="w-3 h-3 text-yellow-300 animate-spin" /> MOST POPULAR
                  </span>
                )}

                <div>
                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed h-10">
                    {plan.desc}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline mt-6 mb-8">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-slate-500 text-xs sm:text-sm font-medium ml-2 font-mono">
                        / {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 border-t border-white/5 pt-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-slate-300 text-xs sm:text-sm">
                        <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <div className="mt-8 pt-4">
                  <Button
                    variant={plan.recommended ? "primary" : "outline"}
                    className="w-full justify-center"
                  >
                    {plan.btnText}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
