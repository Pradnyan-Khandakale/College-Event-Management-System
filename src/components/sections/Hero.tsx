"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, ShieldCheck, CreditCard, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-bg-purple opacity-70 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-bg-blue opacity-70 pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full glow-bg-cyan opacity-40 pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="grid-bg" />

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/10 dark:border-purple-500/20 bg-purple-500/5 text-purple-600 dark:text-purple-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md relative z-10"
      >
        <Sparkles className="w-4 h-4 text-purple-500 dark:text-purple-400 animate-pulse" />
        <span>The All-in-One College Event Engine</span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-center tracking-tight max-w-5xl leading-[1.1] text-foreground relative z-10"
      >
        Run College Events <br />
        <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-400 dark:via-indigo-300 dark:to-cyan-400 bg-clip-text text-transparent glow-text-purple">
          Without the Chaos
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-base sm:text-xl text-muted-foreground text-center max-w-3xl mt-6 leading-relaxed relative z-10"
      >
        Create event websites, collect registrations & payments, automate certificates, and manage participants — all from one platform.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto relative z-10"
      >
        <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
          Create Your Event <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
          <Play className="w-4 h-4 text-cyan-600 dark:text-cyan-400 fill-cyan-500/10" /> Watch Demo
        </Button>
      </motion.div>

      {/* Mockup Dashboard and Stats container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative mt-20 w-full max-w-5xl z-10"
      >
        {/* Main Dashboard Panel */}
        <div className="relative rounded-2xl border border-border bg-card/75 p-4 sm:p-6 backdrop-blur-2xl shadow-xl dark:shadow-2xl overflow-hidden">
          {/* Header Controls */}
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-muted-foreground/60 ml-4 font-mono select-none">https://eventos.club/dashboard/hackathon-2026</span>
            </div>
            <div className="px-3 py-1 rounded-md bg-muted border border-border text-[10px] text-muted-foreground font-mono">
              LIVE OPERATION
            </div>
          </div>

          {/* Inner Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[300px] sm:h-[450px]">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col gap-3 border-r border-border pr-4">
              <div className="h-8 rounded-lg bg-muted w-full" />
              <div className="h-6 rounded-lg bg-muted/50 w-[85%]" />
              <div className="h-6 rounded-lg bg-muted/50 w-[70%]" />
              <div className="h-6 rounded-lg bg-muted/50 w-[90%]" />
              <div className="h-6 rounded-lg bg-muted/50 w-[65%]" />
              <div className="mt-auto h-20 rounded-lg bg-gradient-to-br from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10 border border-purple-500/10 dark:border-purple-500/20 p-2.5 text-[10px] text-purple-650 dark:text-purple-400">
                <div className="font-semibold mb-1">PRO PLAN ENABLED</div>
                UPI + Card Gateways active. Custom certificate mapping ready.
              </div>
            </div>

            {/* Dashboard Workspace */}
            <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Registrations</div>
                  <div className="text-lg sm:text-2xl font-bold text-foreground mt-1">1,482</div>
                  <div className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-1">↑ 12% today</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Payment Vol</div>
                  <div className="text-lg sm:text-2xl font-bold text-foreground mt-1">₹2,96,400</div>
                  <div className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-1">100% Success</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Checked-In</div>
                  <div className="text-lg sm:text-2xl font-bold text-foreground mt-1">87%</div>
                  <div className="text-[9px] text-blue-600 dark:text-blue-400 mt-1">via Live QR</div>
                </div>
              </div>

              {/* Chart Placeholder Area */}
              <div className="flex-1 rounded-xl bg-muted/20 border border-border p-4 flex flex-col relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-foreground/90">Registration Velocity (Hourly)</span>
                  <div className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-purple-650 dark:bg-purple-500 animate-ping" />
                    <span className="text-[10px] text-purple-650 dark:text-purple-400 font-mono">LIVE CHART</span>
                  </div>
                </div>
                {/* SVG mock graph */}
                <div className="flex-1 w-full flex items-end">
                  <svg className="w-full h-full min-h-[140px]" viewBox="0 0 400 150">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,120 Q50,70 100,90 T200,40 T300,60 T400,20 L400,150 L0,150 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M0,120 Q50,70 100,90 T200,40 T300,60 T400,20"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3"
                    />
                    {/* Floating highlight */}
                    <circle cx="200" cy="40" r="5" fill="#a855f7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating KPI Stat Cards */}
        
        {/* Stat 1: 12,000+ Certificates */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -left-6 md:-left-16 glass-card p-4 rounded-2xl flex items-center gap-3 max-w-[220px]"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100/70 dark:bg-purple-500/20 border border-purple-200/50 dark:border-purple-500/30 flex items-center justify-center text-purple-650 dark:text-purple-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Certificates Automated</div>
            <div className="text-lg font-bold text-foreground tracking-tight">12,000+ Sent</div>
          </div>
        </motion.div>

        {/* Stat 2: ₹10L+ Payments Processed */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 -right-6 md:-right-12 glass-card p-4 rounded-2xl flex items-center gap-3 max-w-[230px]"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100/70 dark:bg-emerald-500/20 border border-emerald-200/50 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Total Payments</div>
            <div className="text-lg font-bold text-foreground tracking-tight">₹10L+ Collected</div>
          </div>
        </motion.div>

        {/* Stat 3: 500+ College Events */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -bottom-6 -left-4 md:-left-10 glass-card p-4 rounded-2xl flex items-center gap-3 max-w-[210px]"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-100/70 dark:bg-cyan-500/20 border border-cyan-200/50 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Trusted By</div>
            <div className="text-lg font-bold text-foreground tracking-tight">500+ Events</div>
          </div>
        </motion.div>

        {/* Stat 4: 95% Faster Ops */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="absolute -bottom-10 right-4 md:-right-6 glass-card p-4 rounded-2xl flex items-center gap-3 max-w-[210px]"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100/70 dark:bg-amber-500/20 border border-amber-200/50 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Operations Speed</div>
            <div className="text-lg font-bold text-foreground tracking-tight">95% Faster</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
