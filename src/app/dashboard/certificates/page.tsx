"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Award, Layers, Sparkles, Sliders, Play, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CertificatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("Professional Gold");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const startGen = () => {
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsGenerating(false), 800);
          return 100;
        }
        return p + 10;
      });
    }, 150);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
          Automation USP
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Map data variables, test templates, and dispatch thousands of authenticated certificates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Setup Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card hoverEffect={false} className="p-6 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4.5 h-4.5 text-purple-500" /> Template Parameters mapping
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-foreground">Select Campaign Link</label>
                <select className="w-full h-11 px-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500">
                  <option>AI Hackathon 2025</option>
                  <option>TechFest 2025</option>
                  <option>Coding Contest</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-foreground">Active template</label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option>Professional Gold Accent</option>
                  <option>Modern Technical Blue</option>
                  <option>Minimal Classic Monochrome</option>
                </select>
              </div>
            </div>

            {/* Field mapping table */}
            <div className="space-y-3 pt-3">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                Variable mappings (CSV Headers)
              </span>

              <div className="border border-black/5 dark:border-white/10 rounded-xl overflow-hidden text-xs">
                <div className="grid grid-cols-3 p-3 bg-black/[0.01] dark:bg-white/[0.01] font-bold text-muted-foreground border-b border-black/5 dark:border-white/10">
                  <div>Variable Tag</div>
                  <div>Mapped CSV Column</div>
                  <div>Fallback Value</div>
                </div>
                <div className="divide-y divide-black/5 dark:divide-white/5 font-medium text-foreground">
                  {[
                    { tag: "{{Name}}", col: "Student Name", fallback: "Participant" },
                    { tag: "{{College}}", col: "College Name", fallback: "Stanford University" },
                    { tag: "{{Rank}}", col: "Contest Rank", fallback: "Successful Completion" }
                  ].map((field, idx) => (
                    <div key={idx} className="grid grid-cols-3 p-3 hover:bg-black/[0.005] dark:hover:bg-white/[0.005]">
                      <div className="font-mono text-purple-600 dark:text-purple-400">{field.tag}</div>
                      <div>{field.col}</div>
                      <div className="text-muted-foreground">{field.fallback}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="text-[10px] text-muted-foreground max-w-sm">
                Clicking generate will test credentials checkins status and overlay names.
              </div>
              <button
                onClick={startGen}
                disabled={isGenerating}
                className="inline-flex items-center justify-center font-bold rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2.5 text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? `Processing ${progress}%` : <><Play className="w-3.5 h-3.5 mr-1.5" /> Start Test Dispatch</>}
              </button>
            </div>
          </Card>
        </div>

        {/* Right Side: Visual Preview Certificate Frame */}
        <div className="space-y-6">
          <Card hoverEffect={true} className="p-6 relative overflow-hidden bg-white/70 dark:bg-slate-900 border-purple-500/20 dark:border-purple-500/30 flex flex-col justify-between aspect-[4/3] shadow-xl">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent pointer-events-none" />

            {/* Simulated certificate card */}
            <div className="border border-yellow-500/20 dark:border-yellow-500/40 rounded-xl p-4 bg-yellow-500/[0.005] flex-1 flex flex-col justify-between relative shadow-inner">
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-yellow-500/50" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-yellow-500/50" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-yellow-500/50" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-yellow-500/50" />

              <div className="text-center space-y-1">
                <span className="text-[7px] font-bold text-yellow-600 tracking-widest block uppercase">
                  Certificate of Achievement
                </span>
                <span className="text-[5px] text-muted-foreground block">
                  this is proudly presented to
                </span>
              </div>

              <div className="text-center py-2">
                <p className="text-sm font-black text-foreground italic border-b border-slate-200 dark:border-slate-800 pb-1 max-w-[150px] mx-auto">
                  John Doe
                </p>
                <p className="text-[5px] text-muted-foreground mt-1">
                  for outstanding participation in the AI Hackathon 2025
                </p>
              </div>

              <div className="flex items-center justify-between px-2 text-[5px] text-muted-foreground">
                <div className="text-center">
                  <div className="h-4 w-12 border-b border-slate-200 dark:border-slate-800" />
                  <span className="mt-0.5 block">Signature</span>
                </div>
                {/* Simulated QR Code */}
                <div className="w-8 h-8 bg-slate-900 border border-slate-800 rounded flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0.5 bg-white flex flex-wrap gap-0.5 p-0.5">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 ${
                          (i * 7) % 3 === 0 ? "bg-slate-950" : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="h-4 w-12 border-b border-slate-200 dark:border-slate-800" />
                  <span className="mt-0.5 block">Date</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-3 pt-3 border-t border-black/5 dark:border-white/5">
              <span className="text-[9px] text-muted-foreground font-semibold">
                Live Renderer Engine: Canvas 2D
              </span>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
