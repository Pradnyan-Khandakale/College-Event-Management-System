"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, ArrowUpRight, Search, Zap, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
          Performance Analytics
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Inspect visitor ratios, campaign conversions, and check-in success parameters.
        </p>
      </div>

      {/* Analytics stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <Card hoverEffect={false} className="p-4 flex items-center gap-4 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Page Visitors</span>
            <p className="text-lg font-black text-foreground">34,892</p>
          </div>
        </Card>
        <Card hoverEffect={false} className="p-4 flex items-center gap-4 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Conversions</span>
            <p className="text-lg font-black text-foreground">24.1%</p>
          </div>
        </Card>
        <Card hoverEffect={false} className="p-4 flex items-center gap-4 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Ticket Orders</span>
            <p className="text-lg font-black text-foreground">868</p>
          </div>
        </Card>
        <Card hoverEffect={false} className="p-4 flex items-center gap-4 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Avg Scan Time</span>
            <p className="text-lg font-black text-foreground">2.4s</p>
          </div>
        </Card>
      </div>

      {/* Conversion Funnel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card hoverEffect={false} className="p-6 bg-white/70 dark:bg-slate-900 border-black/5 dark:border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-500" /> Conversion Funnel Analysis
          </h3>
          
          <div className="space-y-4.5 pt-2">
            {[
              { stage: "Event Website Views", count: "34,892", pct: "100%", color: "bg-purple-500" },
              { stage: "Registration Clicks", count: "12,482", pct: "35.7%", color: "bg-indigo-500" },
              { stage: "Details Completed", count: "9,102", pct: "26.0%", color: "bg-blue-500" },
              { stage: "Payment Confirmed (Free/Paid)", count: "8,432", pct: "24.1%", color: "bg-emerald-500" }
            ].map((step, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-foreground">{step.stage}</span>
                  <div className="flex gap-2 text-muted-foreground">
                    <span className="font-bold text-foreground">{step.count}</span>
                    <span>({step.pct})</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${step.color}`} style={{ width: step.pct }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card hoverEffect={false} className="p-6 bg-white/70 dark:bg-slate-900 border-black/5 dark:border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-purple-500" /> Acquisition Channels
          </h3>
          
          <div className="divide-y divide-black/5 dark:divide-white/5 text-xs font-medium">
            {[
              { source: "College WhatsApp Groups", shares: "4,890 shares", visits: "18,432", conversion: "32.4%" },
              { source: "College Instagram Bio Link", shares: "892 clicks", visits: "9,102", conversion: "18.6%" },
              { source: "Direct Subdomain QR Codes", shares: "1,200 scans", visits: "5,432", conversion: "15.2%" },
              { source: "Email Invitations Campaigns", shares: "12,102 sent", visits: "1,926", conversion: "48.9%" }
            ].map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between hover:bg-black/[0.005] dark:hover:bg-white/[0.005]">
                <div>
                  <h4 className="font-bold text-foreground">{item.source}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.shares}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-foreground block">{item.visits} visits</span>
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold mt-0.5 block">{item.conversion} conv. rate</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
