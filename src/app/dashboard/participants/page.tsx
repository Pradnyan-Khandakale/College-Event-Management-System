"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Search, UserCheck, Users, Filter, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ParticipantsPage() {
  const [query, setQuery] = useState("");

  const participants = [
    { name: "Rahul Verma", email: "rahul.v@bits.edu", college: "BITS Pilani", event: "Coding Contest", date: "May 29, 2026", status: "Active" },
    { name: "Priya Sharma", email: "priya.s@stanford.edu", college: "Stanford University", event: "TechFest 2025", date: "May 28, 2026", status: "Active" },
    { name: "Aman Sen", email: "aman.sen@iitb.ac.in", college: "IIT Bombay", event: "AI Hackathon 2025", date: "May 28, 2026", status: "Active" },
    { name: "Sneha Reddy", email: "sneha.r@vit.edu", college: "VIT Vellore", event: "AI Hackathon 2025", date: "May 27, 2026", status: "Active" },
    { name: "Vikram Malhotra", email: "v.malhotra@mit.edu", college: "MIT", event: "AI Hackathon 2025", date: "May 26, 2026", status: "Active" },
    { name: "Aditi Rao", email: "aditi.r@du.ac.in", college: "Delhi University", event: "Coding Contest", date: "May 25, 2026", status: "Active" },
    { name: "Kabir Mehta", email: "kmehta@rvce.edu.in", college: "RVCE Bangalore", event: "TechFest 2025", date: "May 25, 2026", status: "Active" }
  ];

  const filtered = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.college.toLowerCase().includes(query.toLowerCase()) ||
      p.event.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
            EventOS Registry
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            View and manage all participant ticket allocations and registration logs.
          </p>
        </div>

        <button className="inline-flex items-center justify-center font-medium rounded-full bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 hover:border-slate-400 dark:hover:border-slate-500 text-slate-800 dark:text-slate-200 px-4.5 py-2.5 text-xs cursor-pointer shadow-sm">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card hoverEffect={false} className="p-4 flex items-center gap-4 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Total Registered</span>
            <p className="text-lg font-black text-foreground">8,432</p>
          </div>
        </Card>
        <Card hoverEffect={false} className="p-4 flex items-center gap-4 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Checked In</span>
            <p className="text-lg font-black text-foreground">4,892</p>
          </div>
        </Card>
        <Card hoverEffect={false} className="p-4 flex items-center gap-4 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Opt-In Rate</span>
            <p className="text-lg font-black text-foreground">94.8%</p>
          </div>
        </Card>
      </div>

      {/* Registry Table */}
      <Card hoverEffect={false} className="p-0 border-black/5 dark:border-white/10 overflow-hidden bg-white/70 dark:bg-white/5">
        <div className="p-4 border-b border-black/5 dark:border-white/10 flex items-center gap-3 bg-black/[0.01] dark:bg-white/[0.01]">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, college, registered campaign..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-0 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-muted-foreground font-bold uppercase tracking-wider">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">College</th>
                <th className="p-4">Registered Event</th>
                <th className="p-4">Date Added</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 font-medium text-foreground">
              {filtered.map((p, idx) => (
                <tr key={idx} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                  <td className="p-4 font-bold">{p.name}</td>
                  <td className="p-4 text-muted-foreground font-sans">{p.email}</td>
                  <td className="p-4 text-muted-foreground">{p.college}</td>
                  <td className="p-4">{p.event}</td>
                  <td className="p-4 text-muted-foreground font-sans">{p.date}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
