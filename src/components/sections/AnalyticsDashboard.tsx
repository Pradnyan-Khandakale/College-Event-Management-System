"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, DollarSign, QrCode, Award, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type MetricType = "registrations" | "payments" | "attendance" | "certificates";

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState<MetricType>("registrations");

  const tabs = [
    {
      id: "registrations" as MetricType,
      label: "Registrations",
      icon: Users,
      val: "2,450",
      change: "+34% this week",
      color: "purple",
    },
    {
      id: "payments" as MetricType,
      label: "Payments",
      icon: DollarSign,
      val: "₹4,90,000",
      change: "100% success rate",
      color: "emerald",
    },
    {
      id: "attendance" as MetricType,
      label: "Attendance",
      icon: QrCode,
      val: "92.4%",
      change: "2,263 QR scanned",
      color: "blue",
    },
    {
      id: "certificates" as MetricType,
      label: "Certificates",
      icon: Award,
      val: "2,263",
      change: "100% dispatch rate",
      color: "cyan",
    },
  ];

  // SVG Chart Mock Data
  const charts: Record<MetricType, React.ReactNode> = {
    registrations: (
      <svg className="w-full h-full text-purple-500" viewBox="0 0 500 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d="M0,180 Q50,140 100,160 T200,90 T300,70 T400,30 T500,10 L500,200 L0,200 Z" fill="url(#purpleGrad)" />
        <path d="M0,180 Q50,140 100,160 T200,90 T300,70 T400,30 T500,10" fill="none" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
        <circle cx="400" cy="30" r="6" fill="#a855f7" />
        <line x1="400" y1="30" x2="400" y2="200" stroke="rgba(168, 85, 247, 0.15)" strokeDasharray="4 4" />
      </svg>
    ),
    payments: (
      <svg className="w-full h-full text-emerald-500" viewBox="0 0 500 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d="M0,170 Q50,130 100,100 T200,110 T300,50 T400,60 T500,20 L500,200 L0,200 Z" fill="url(#emeraldGrad)" />
        <path d="M0,170 Q50,130 100,100 T200,110 T300,50 T400,60 T500,20" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
        <circle cx="300" cy="50" r="6" fill="#10b981" />
        <line x1="300" y1="50" x2="300" y2="200" stroke="rgba(16, 185, 129, 0.15)" strokeDasharray="4 4" />
      </svg>
    ),
    attendance: (
      <svg className="w-full h-full text-blue-500" viewBox="0 0 500 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d="M0,190 Q50,180 100,130 T200,120 T300,80 T400,40 T500,15 L500,200 L0,200 Z" fill="url(#blueGrad)" />
        <path d="M0,190 Q50,180 100,130 T200,120 T300,80 T400,40 T500,15" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
        <circle cx="500" cy="15" r="6" fill="#3b82f6" />
      </svg>
    ),
    certificates: (
      <svg className="w-full h-full text-cyan-500" viewBox="0 0 500 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d="M0,195 Q50,190 100,180 T200,140 T300,100 T400,60 T500,30 L500,200 L0,200 Z" fill="url(#cyanGrad)" />
        <path d="M0,195 Q50,190 100,180 T200,140 T300,100 T400,60 T500,30" fill="none" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
        <circle cx="500" cy="30" r="6" fill="#06b6d4" />
      </svg>
    ),
  };

  return (
    <section className="py-24 relative overflow-hidden px-6">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] glow-bg-blue opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/10 dark:border-purple-500/20 bg-purple-500/5 text-purple-600 dark:text-purple-300 text-xs font-semibold mb-6 select-none">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Interactive Live Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Supercharge Your Insights
          </h2>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            Track entry logs, volume trends, success checkouts, and credential sharing stats on a centralized panel.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left panel selectors */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-card border-purple-500/30 dark:border-purple-500/40 shadow-sm dark:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                      : "bg-muted/15 border-border hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isActive
                          ? "bg-purple-100 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <TabIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        {tab.label}
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                        {tab.val}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        isActive
                          ? "bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300"
                          : "bg-muted border border-border text-muted-foreground"
                      }`}
                    >
                      {tab.change}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right panel Graph Visual */}
          <div className="lg:col-span-8">
            <div className="h-full rounded-2xl border border-border bg-card/75 p-6 backdrop-blur-xl flex flex-col justify-between shadow-2xl dark:shadow-none min-h-[350px]">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    {tabs.find((t) => t.id === activeTab)?.label} Analysis
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Real-time data flow for the current active semester</p>
                </div>
                <div className="flex items-center gap-1 bg-muted border border-border px-2.5 py-1 rounded-md text-[10px] text-muted-foreground font-mono">
                  Live Sync <ArrowUpRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>

              {/* Dynamic SVG chart panel */}
              <div className="flex-1 w-full bg-muted/20 rounded-xl border border-border p-4 flex items-end relative overflow-hidden my-4 min-h-[200px]">
                <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-5" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-end"
                  >
                    {charts[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-center text-[10px] text-muted-foreground font-mono">
                <span>08:00 AM</span>
                <span>12:00 PM</span>
                <span>04:00 PM</span>
                <span>08:00 PM</span>
                <span>12:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
