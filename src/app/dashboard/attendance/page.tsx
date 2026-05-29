"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { CheckSquare, Scan, Users, Calendar, ArrowRight, UserCheck, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AttendancePage() {
  const [selectedEvent, setSelectedEvent] = useState("AI Hackathon 2025");
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "success">("idle");
  const [scannedUser, setScannedUser] = useState("");

  const checkins = [
    { name: "Vikram Malhotra", email: "v.malhotra@mit.edu", time: "10:15 AM", method: "QR Code Scan" },
    { name: "Rahul Verma", email: "rahul.v@bits.edu", time: "10:04 AM", method: "Manual Entry" },
    { name: "Aman Sen", email: "aman.sen@iitb.ac.in", time: "09:58 AM", method: "QR Code Scan" },
    { name: "Sneha Reddy", email: "sneha.r@vit.edu", time: "09:42 AM", method: "QR Code Scan" }
  ];

  const handleScan = () => {
    setScanStatus("scanning");
    setTimeout(() => {
      setScanStatus("success");
      setScannedUser("Rahul Dev (BITS-2026-894)");
    }, 1500);
  };

  const resetScan = () => {
    setScanStatus("idle");
    setScannedUser("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
          Check-in desk
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Scan student ticket QR codes using camera or trigger manual name approvals during event checkins.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Scanner & Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card hoverEffect={false} className="p-6 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 dark:border-white/5 pb-4">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Scan className="w-4.5 h-4.5 text-purple-500" /> Ticket Scan Simulator
              </h3>
              
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="h-10 px-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option>AI Hackathon 2025</option>
                <option>TechFest 2025</option>
                <option>Coding Contest</option>
              </select>
            </div>

            {/* Scan Simulation Screen */}
            <div className="h-64 rounded-2xl bg-slate-950 dark:bg-slate-900 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group shadow-inner">
              
              {/* Scan grid effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_15px] pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {scanStatus === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-4 relative z-10"
                  >
                    <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center mx-auto text-slate-500 group-hover:border-purple-500 transition-colors">
                      <Scan className="w-8 h-8" />
                    </div>
                    <button
                      onClick={handleScan}
                      className="inline-flex items-center justify-center font-bold rounded-full bg-white text-slate-950 hover:bg-slate-100 px-5 py-2.5 text-xs transition-colors cursor-pointer shadow-md"
                    >
                      Turn On Camera Scan
                    </button>
                  </motion.div>
                )}

                {scanStatus === "scanning" && (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-3 relative z-10"
                  >
                    {/* Glowing Scan laser line */}
                    <motion.div
                      animate={{ y: [-60, 60] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] z-20"
                    />
                    
                    <div className="w-20 h-20 border-2 border-cyan-500 rounded-xl relative mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                      <Scan className="w-8 h-8 text-cyan-400 animate-pulse" />
                    </div>
                    <span className="text-[10px] text-cyan-400 font-mono tracking-widest block uppercase animate-pulse">
                      Analyzing digital token...
                    </span>
                  </motion.div>
                )}

                {scanStatus === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-4 relative z-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <UserCheck className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest block">
                        Verify Checked-In
                      </span>
                      <p className="text-xs font-semibold text-white">{scannedUser}</p>
                    </div>
                    <button
                      onClick={resetScan}
                      className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Scan Next Ticket
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </Card>
        </div>

        {/* Right Side: Check-in Logs */}
        <div className="space-y-6">
          <Card hoverEffect={false} className="p-6 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10 flex flex-col h-full space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Recent Check-ins
            </h3>
            
            <div className="flex-1 space-y-3.5 overflow-y-auto max-h-[300px] pr-1">
              {checkins.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.005] dark:bg-white/[0.005] flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-bold text-foreground">{item.name}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{item.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-foreground font-mono block">{item.time}</span>
                    <span className="text-[9px] text-purple-600 dark:text-purple-400 font-bold mt-0.5 block">{item.method}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Total present count: 489/600</span>
              <span className="font-bold text-purple-600">81.5% Checked</span>
            </div>
          </Card>
        </div>

      </div>
    </motion.div>
  );
}
