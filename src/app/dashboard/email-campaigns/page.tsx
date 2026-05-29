"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Mail, Send, Sparkles, Megaphone, CheckCircle2, Layout, Clock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function EmailCampaignsPage() {
  const [showCompose, setShowCompose] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const campaigns = [
    { name: "Reminders: Hackathon Registration Closing", status: "Sent", recipients: "1,248 students", openRate: "78.4%", clickRate: "34.1%", date: "May 28, 2026" },
    { name: "Tickets: AI Workshop QR Codes", status: "Sent", recipients: "548 students", openRate: "94.2%", clickRate: "89.0%", date: "May 25, 2026" },
    { name: "Inviation: TechFest Launch Speakers Panel", status: "Draft", recipients: "8,432 students", openRate: "--", clickRate: "--", date: "Saved May 24" }
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setShowCompose(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
            Communications Desk
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Broadcast updates, send payment reminders, and deliver PDF ticket credentials to student inboxes.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowCompose(true)}
          className="flex items-center gap-1.5 shadow-md"
        >
          <Send className="w-4 h-4" /> Compose Broadcast
        </Button>
      </div>

      {/* Campaign Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card hoverEffect={false} className="p-4 flex items-center gap-4 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Emails Dispatched</span>
            <p className="text-lg font-black text-foreground">14,248</p>
          </div>
        </Card>
        <Card hoverEffect={false} className="p-4 flex items-center gap-4 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Avg Open Rate</span>
            <p className="text-lg font-black text-foreground">86.3%</p>
          </div>
        </Card>
        <Card hoverEffect={false} className="p-4 flex items-center gap-4 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Avg Click Rate</span>
            <p className="text-lg font-black text-foreground">61.5%</p>
          </div>
        </Card>
      </div>

      {/* Broadcast History */}
      <Card hoverEffect={false} className="p-0 border-black/5 dark:border-white/10 overflow-hidden bg-white/70 dark:bg-white/5">
        <div className="p-4 border-b border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01]">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
            Broadcast History
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-muted-foreground font-bold uppercase tracking-wider">
                <th className="p-4">Campaign Name</th>
                <th className="p-4">Target Group</th>
                <th className="p-4">Recipients</th>
                <th className="p-4">Open Rate</th>
                <th className="p-4">Click Rate</th>
                <th className="p-4">Delivery Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 font-medium text-foreground">
              {campaigns.map((c, idx) => (
                <tr key={idx} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                  <td className="p-4">
                    <div className="font-bold flex items-center gap-1.5">
                      {c.name}
                      {c.status === "Draft" && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] bg-slate-500/10 text-slate-500 border border-slate-500/20 uppercase font-extrabold tracking-wider">
                          {c.status}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">Registered Students</td>
                  <td className="p-4 text-muted-foreground font-sans">{c.recipients}</td>
                  <td className="p-4 font-mono font-bold">{c.openRate}</td>
                  <td className="p-4 font-mono font-bold text-purple-600 dark:text-purple-400">{c.clickRate}</td>
                  <td className="p-4 text-muted-foreground font-sans">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* COMPOSE BROADCAST MODAL */}
      <AnimatePresence>
        {showCompose && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCompose(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 shadow-2xl rounded-3xl p-6 z-10 space-y-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5 text-purple-500" /> Compose Email Broadcast
                </h3>
                <button
                  onClick={() => setShowCompose(false)}
                  className="w-7 h-7 rounded-full border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSend} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-foreground">Select Event Campaign</label>
                    <select className="w-full h-10 px-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500">
                      <option>AI Hackathon 2025</option>
                      <option>TechFest 2025</option>
                      <option>Coding Contest</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-foreground">Target Audience Segment</label>
                    <select className="w-full h-10 px-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500">
                      <option>All Registered (Free & Paid)</option>
                      <option>Paid Ticket Holders Only</option>
                      <option>Checked-In Attendance Only</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-foreground">Subject Line</label>
                  <input
                    type="text"
                    placeholder="e.g. Action Required: Fill team member details for Hackathon"
                    className="w-full h-10 px-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-foreground">Message Body</label>
                  <textarea
                    rows={6}
                    placeholder="Write your email body here. Use variable tags like {{Name}} to personalize names."
                    className="w-full px-4 py-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" size="sm" type="button" onClick={() => setShowCompose(false)}>
                    Save Draft
                  </Button>
                  <Button variant="primary" size="sm" type="submit" disabled={isSending}>
                    {isSending ? "Sending Broadcast..." : <><Send className="w-3.5 h-3.5 mr-1" /> Send Now</>}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
