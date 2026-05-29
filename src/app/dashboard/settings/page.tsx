"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Settings, Shield, Globe, Landmark, Mail, Save, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [stripeConnected, setStripeConnected] = useState(true);
  const [subdomain, setSubdomain] = useState("stanford");
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-4xl"
    >
      <div>
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
          Platform Setup
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure domains, bind payment gateways, customize college branding, and set security values.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* College Profile */}
        <Card hoverEffect={false} className="p-6 bg-white/70 dark:bg-slate-900 border-black/5 dark:border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
            <Settings className="w-4.5 h-4.5 text-purple-500" /> College Organization Profile
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-foreground">Organization Name</label>
              <input
                type="text"
                defaultValue="Stanford University"
                className="w-full h-11 px-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-foreground">Primary Contact Email</label>
              <input
                type="email"
                defaultValue="events@stanford.edu"
                className="w-full h-11 px-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
          </div>
        </Card>

        {/* Custom Branding Domain */}
        <Card hoverEffect={false} className="p-6 bg-white/70 dark:bg-slate-900 border-black/5 dark:border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4.5 h-4.5 text-purple-500" /> Subdomain & Domain Setup
          </h3>

          <div className="space-y-4 text-xs font-semibold">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-foreground">EventOS Hosted Subdomain</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  className="w-1/2 h-11 px-4 rounded-l-xl border-y border-l border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-xs text-foreground text-right focus:outline-none focus:ring-1 focus:ring-purple-500"
                  required
                />
                <span className="h-11 px-4 rounded-r-xl border border-black/5 dark:border-white/10 bg-slate-100 dark:bg-slate-800 text-muted-foreground flex items-center justify-center font-mono">
                  .eventos.club
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium block mt-1">
                Your portal will load landing pages on: <code className="text-purple-600 dark:text-purple-400 font-mono">https://{subdomain || "yoursub"}.eventos.club</code>
              </span>
            </div>
          </div>
        </Card>

        {/* Stripe Gateway Integration */}
        <Card hoverEffect={false} className="p-6 bg-white/70 dark:bg-slate-900 border-black/5 dark:border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Landmark className="w-4.5 h-4.5 text-purple-500" /> Payment Settlements (Stripe Express)
            </h3>
            <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Verified
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-950/40 border border-black/5 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <h4 className="font-bold text-foreground">Stripe Merchant Account Link</h4>
                <p className="text-[10px] text-muted-foreground">Connected to Stanford Events Bank ending in *9840</p>
              </div>
              <button
                type="button"
                onClick={() => setStripeConnected(!stripeConnected)}
                className="px-4.5 py-2.5 rounded-full border border-black/10 dark:border-white/15 bg-white dark:bg-slate-900 hover:bg-slate-50 text-[10px] font-bold text-foreground cursor-pointer transition-colors shadow-sm"
              >
                {stripeConnected ? "Disconnect Account" : "Connect Stripe Gateway"}
              </button>
            </div>
          </div>
        </Card>

        {/* Save button and alerts */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {success && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1 animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5" /> Settings updated successfully
              </span>
            )}
          </div>

          <Button
            variant="primary"
            size="sm"
            type="submit"
            className="flex items-center gap-1.5 shadow-md px-6"
          >
            <Save className="w-4 h-4" /> Save Configuration
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
