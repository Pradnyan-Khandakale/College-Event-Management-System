"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Award, 
  Upload, 
  Database, 
  Send, 
  QrCode, 
  Sparkles, 
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

const workflowSteps = [
  {
    icon: Upload,
    title: "Upload Template",
    desc: "Import any SVG, PNG, or connect directly to your Canva draft design.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Database,
    title: "Map CSV Fields",
    desc: "Connect your registration table. Map {Name}, {Role}, or {Position}.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Award,
    title: "Generate PDFs",
    desc: "High-resolution vector PDF generator formats names instantly.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Send,
    title: "Verify & Dispatch",
    desc: "Every certificate gets a unique verification QR code and is sent via mail.",
    color: "from-cyan-500 to-emerald-500",
  },
];

export default function CertificateAutomation() {
  return (
    <section id="certificates" className="py-24 relative overflow-hidden px-6 bg-slate-950/40">
      {/* Background blobs */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full glow-bg-purple opacity-30 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full glow-bg-cyan opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Descriptions and Timeline */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-6 w-fit">
              <Award className="w-3.5 h-3.5" />
              <span>Industry-Leading Certificate Engine</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
              Generate & Send <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                Thousands of Certificates
              </span>{" "}
              Automatically
            </h2>
            
            <p className="text-slate-400 mt-6 text-base sm:text-lg leading-relaxed">
              No more manual editing in Photoshop or Canva. Map attendee spreadsheets to your custom templates, generate tamper-proof PDFs, and email them out in minutes.
            </p>

            {/* Workflow Timeline */}
            <div className="mt-10 space-y-6">
              {workflowSteps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <motion.div 
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center text-white shrink-0 mt-0.5 shadow-lg`}>
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        {step.title}
                        {idx === 3 && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.2 rounded-full border border-emerald-500/30">TAMPER-PROOF</span>}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side: High Fidelity Visual Mockup */}
          <div className="lg:col-span-7 relative flex justify-center items-center mt-8 lg:mt-0">
            {/* Template Editor Mockup */}
            <div className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 sm:p-6 backdrop-blur-xl shadow-2xl relative">
              {/* Toolbar */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Certificate Template Studio
                </span>
                <div className="flex gap-2">
                  <button className="px-2.5 py-1 text-[10px] bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-slate-300 font-medium transition-colors cursor-pointer">
                    Canva Import
                  </button>
                  <button className="px-2.5 py-1 text-[10px] bg-purple-600 hover:bg-purple-500 rounded-md text-white font-medium shadow-md transition-colors cursor-pointer">
                    Publish Template
                  </button>
                </div>
              </div>

              {/* Main canvas space */}
              <div className="relative rounded-xl border border-dashed border-white/10 bg-slate-900/60 p-4 min-h-[260px] sm:min-h-[350px] flex items-center justify-center overflow-hidden">
                {/* Certificate Sheet Graphic */}
                <div className="w-full max-w-[420px] aspect-[1.414/1] bg-slate-950 border-4 border-double border-yellow-600/30 rounded-lg p-3 sm:p-5 relative flex flex-col justify-between items-center text-center shadow-lg">
                  {/* Outer border glow */}
                  <div className="absolute inset-0 border border-yellow-600/10 pointer-events-none rounded" />
                  
                  {/* Decorative corners */}
                  <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-yellow-600/30" />
                  <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-yellow-600/30" />
                  <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-yellow-600/30" />
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-yellow-600/30" />

                  {/* Content */}
                  <div className="text-[10px] tracking-[0.2em] font-serif text-yellow-500 font-bold uppercase">
                    Certificate of Excellence
                  </div>

                  <div className="flex flex-col items-center gap-1.5 my-2">
                    <span className="text-[6px] text-slate-500 font-mono tracking-widest">THIS IS GRANTED TO</span>
                    
                    {/* Variable Highlight */}
                    <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-md text-[11px] sm:text-xs text-purple-300 font-bold font-mono tracking-wide relative group animate-pulse">
                      {"{{"} Participant Name {"}}"}
                      <div className="absolute -top-3 -right-2 bg-purple-600 text-[6px] text-white px-1.5 py-0.2 rounded font-sans tracking-normal font-medium">Text Field</div>
                    </div>

                    <span className="text-[6px] text-slate-500 font-mono tracking-wider max-w-[200px] mt-1">
                      for securing podium place at HackFest 2026 organized by IIT Event Cell.
                    </span>
                  </div>

                  {/* Footer of certificate with QR */}
                  <div className="w-full flex justify-between items-end mt-1 px-2">
                    {/* Signature */}
                    <div className="flex flex-col items-start">
                      <span className="font-serif italic text-[8px] text-white">Pradnyan K.</span>
                      <span className="w-12 border-t border-white/20 my-0.5" />
                      <span className="text-[5px] text-slate-500 uppercase tracking-widest font-mono">Organizing Chair</span>
                    </div>

                    {/* QR Code stamps */}
                    <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded">
                      <QrCode className="w-5 h-5 text-white" />
                      <div className="text-left font-mono">
                        <div className="text-[5px] text-emerald-400 font-bold">VERIFIED SECURE</div>
                        <div className="text-[4px] text-slate-500">ID: EV-879-AP</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating overlay certificate sent card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 glass-card p-3 rounded-xl border border-emerald-500/30 shadow-xl max-w-[170px]"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-[9px] text-slate-400">Sent to Priya S.</div>
                      <div className="text-[10px] font-bold text-white">priya@nit.edu</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating canvas properties tool */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 glass-card p-3 rounded-xl border border-purple-500/30 shadow-xl"
                >
                  <div className="flex flex-col gap-1 text-[9px]">
                    <span className="text-slate-400 font-medium">Font Family:</span>
                    <span className="text-white font-bold font-serif">Playfair Display</span>
                    <span className="text-slate-400 mt-1">Status:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Auto-Generated
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
