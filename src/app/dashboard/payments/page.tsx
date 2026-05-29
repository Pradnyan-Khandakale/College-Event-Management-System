"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { CreditCard, DollarSign, ArrowUpRight, ShieldCheck, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentsPage() {
  const [query, setQuery] = useState("");

  const transactions = [
    { id: "TXN-89403", name: "Aman Sen", email: "aman.sen@iitb.ac.in", event: "AI Hackathon 2025", amount: "₹100.00", date: "May 29, 2026", status: "Succeeded" },
    { id: "TXN-89402", name: "Sneha Reddy", email: "sneha.r@vit.edu", event: "AI Hackathon 2025", amount: "₹100.00", date: "May 28, 2026", status: "Succeeded" },
    { id: "TXN-89401", name: "Rohit Jain", email: "rohit.j@du.ac.in", event: "AI Hackathon 2025", amount: "₹100.00", date: "May 27, 2026", status: "Succeeded" },
    { id: "TXN-89400", name: "Vikram Malhotra", email: "v.malhotra@mit.edu", event: "AI Hackathon 2025", amount: "₹100.00", date: "May 26, 2026", status: "Pending" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
          Stripe gateway integration
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Inspect registrations charges logs, net payouts, and platform fee margins.
        </p>
      </div>

      {/* Stats Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card hoverEffect={false} className="p-4 flex items-center gap-4 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Gross Volume</span>
            <p className="text-lg font-black text-foreground">₹54,800.00</p>
          </div>
        </Card>
        <Card hoverEffect={false} className="p-4 flex items-center gap-4 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Next Settlement</span>
            <p className="text-lg font-black text-foreground">₹54,800.00</p>
          </div>
        </Card>
        <Card hoverEffect={false} className="p-4 flex items-center gap-4 bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Platform Charge</span>
            <p className="text-lg font-black text-foreground">2.0%</p>
          </div>
        </Card>
      </div>

      {/* Ledger Table */}
      <Card hoverEffect={false} className="p-0 border-black/5 dark:border-white/10 overflow-hidden bg-white/70 dark:bg-white/5">
        <div className="p-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.01]">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
            Transaction Ledger
          </h3>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Stripe Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-muted-foreground font-bold uppercase tracking-wider">
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Event Campaign</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Settlement Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 font-medium text-foreground">
              {transactions.map((txn, idx) => (
                <tr key={idx} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                  <td className="p-4 font-mono text-purple-600 dark:text-purple-400 font-semibold">{txn.id}</td>
                  <td className="p-4">
                    <div className="font-bold">{txn.name}</div>
                    <div className="text-[10px] text-muted-foreground font-sans mt-0.5">{txn.email}</div>
                  </td>
                  <td className="p-4">{txn.event}</td>
                  <td className="p-4 font-bold">{txn.amount}</td>
                  <td className="p-4 text-muted-foreground font-sans">{txn.date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                      txn.status === "Succeeded"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                    }`}>
                      {txn.status}
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
