"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { 
  Globe, 
  FileText, 
  CreditCard, 
  QrCode, 
  Award, 
  Mail, 
  Users, 
  BarChart3, 
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const features = [
  {
    icon: Globe,
    title: "Event Website Builder",
    description: "Launch a custom-branded event website in seconds. No coding required, optimized for conversions.",
    color: "purple",
    visual: (
      <div className="relative w-full h-32 rounded-xl bg-background/85 border border-border overflow-hidden flex flex-col p-2">
        <div className="flex gap-1.5 border-b border-border pb-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-red-500/60" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <span className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex gap-2">
          <div className="w-1/3 rounded-md bg-purple-500/10 border border-purple-500/20 flex flex-col gap-1 p-1">
            <span className="w-full h-1 bg-purple-500/20 dark:bg-white/20 rounded" />
            <span className="w-2/3 h-1 bg-purple-500/10 dark:bg-white/10 rounded" />
          </div>
          <div className="flex-1 rounded-md bg-muted/30 p-1 flex flex-col gap-1.5 justify-center items-center">
            <span className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse" />
            <span className="w-12 h-1 bg-muted/70 rounded" />
          </div>
        </div>
      </div>
    )
  },
  {
    icon: FileText,
    title: "Smart Registration Forms",
    description: "Supports conditional logic, custom questions, ticket levels, waiver signing, and file uploads.",
    color: "blue",
    visual: (
      <div className="w-full h-32 rounded-xl bg-background/85 border border-border p-3 flex flex-col gap-2 justify-center">
        <div className="h-6 rounded bg-muted/40 border border-border flex items-center px-2 justify-between">
          <span className="text-[9px] text-muted-foreground font-medium">Full Name</span>
          <span className="text-[8px] text-purple-650 dark:text-purple-400 font-mono">Required</span>
        </div>
        <div className="h-6 rounded bg-muted/40 border border-border flex items-center px-2 justify-between">
          <span className="text-[9px] text-muted-foreground font-medium">Select Track</span>
          <span className="text-[8px] text-muted-foreground">▼</span>
        </div>
        <div className="h-6 rounded bg-purple-500/25 border border-purple-500/30 flex items-center justify-center">
          <span className="text-[9px] text-purple-700 dark:text-purple-300 font-bold">Register Now</span>
        </div>
      </div>
    )
  },
  {
    icon: CreditCard,
    title: "Razorpay & UPI Payments",
    description: "Accept instant payments via GooglePay, PhonePe, Paytm, Cards, or netbanking with auto-routing.",
    color: "cyan",
    visual: (
      <div className="w-full h-32 rounded-xl bg-background/85 border border-border p-3 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-muted-foreground font-medium">Razorpay Secured</span>
          <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-white">✓</span>
        </div>
        <div className="flex gap-2 items-center justify-center my-1 bg-muted/40 border border-border p-1 rounded">
          <div className="w-8 h-8 bg-slate-200 dark:bg-foreground rounded flex items-center justify-center text-slate-900 dark:text-background font-bold text-xs font-mono">UPI</div>
          <div className="text-left">
            <div className="text-[10px] text-foreground font-bold">Scan to Pay</div>
            <div className="text-[8px] text-muted-foreground">Instant validation</div>
          </div>
        </div>
        <div className="text-[8px] text-muted-foreground text-center font-mono">Tx ID: pay_Lkp87aX1</div>
      </div>
    )
  },
  {
    icon: QrCode,
    title: "QR Attendance Tracking",
    description: "Scan QR tickets at the venue entry. Works offline. Instantly updates the attendance list.",
    color: "cyan",
    visual: (
      <div className="w-full h-32 rounded-xl bg-background/85 border border-border p-3 flex items-center justify-center gap-3">
        <div className="p-1.5 bg-muted dark:bg-foreground rounded-lg border border-border">
          <QrCode className="w-14 h-14 text-slate-900 dark:text-background" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">SCAN SUCCESS</span>
          <span className="text-[9px] text-foreground font-bold">John Doe</span>
          <span className="text-[8px] text-muted-foreground">Ticket #HACK-9812</span>
        </div>
      </div>
    )
  },
  {
    icon: Award,
    title: "Automated Certificates",
    description: "Design templates and map columns. Generate and send thousands of PDFs dynamically on completion.",
    color: "purple",
    visual: (
      <div className="relative w-full h-32 rounded-xl bg-background/85 border border-border p-3 flex items-center justify-center">
        {/* Certificate Mock */}
        <div className="w-[85%] h-[80%] border-4 border-double border-yellow-600/30 bg-card border-border rounded p-2 flex flex-col items-center justify-between text-center">
          <div className="text-[8px] text-yellow-600 dark:text-yellow-500 tracking-widest font-serif font-bold">CERTIFICATE</div>
          <div className="text-[6px] text-muted-foreground font-mono">THIS IS PROUDLY PRESENTED TO</div>
          <div className="text-[9px] text-foreground font-serif font-bold border-b border-border pb-0.5 px-2">[Participant Name]</div>
          <div className="text-[5px] text-muted-foreground">[Event Name] Organizer</div>
        </div>
      </div>
    )
  },
  {
    icon: LinkedinIcon,
    title: "LinkedIn Sharing",
    description: "Participants can share verified credentials directly to their LinkedIn profiles with a single tap.",
    color: "blue",
    visual: (
      <div className="w-full h-32 rounded-xl bg-background/85 border border-border p-3 flex flex-col justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 bg-[#0A66C2] rounded flex items-center justify-center text-white text-[10px] font-bold">in</div>
          <span className="text-[10px] text-foreground font-semibold">Share Certificate</span>
        </div>
        <div className="bg-muted/40 border border-border rounded p-2 text-[8px] text-foreground/90">
          "Excited to share that I've successfully completed HackFest 2026!..."
        </div>
        <div className="h-5 rounded bg-[#0A66C2] text-white flex items-center justify-center text-[9px] font-bold cursor-pointer">
          Post to Feed
        </div>
      </div>
    )
  },
  {
    icon: Mail,
    title: "Bulk Email Distribution",
    description: "Send automated updates, reminders, QR tickets, and certificate notifications with verified delivery.",
    color: "purple",
    visual: (
      <div className="w-full h-32 rounded-xl bg-background/85 border border-border p-3 flex flex-col justify-center gap-1">
        <div className="flex justify-between items-center text-[8px] text-muted-foreground font-medium">
          <span>Mail Queue</span>
          <span className="text-purple-650 dark:text-purple-400 font-bold">98% Sent</span>
        </div>
        <div className="h-6 rounded bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between px-2 text-foreground">
          <span className="text-[8px]">ticket_sent_raghav.pdf</span>
          <span className="text-[7px] text-emerald-600 dark:text-emerald-400 font-mono">Delivered</span>
        </div>
        <div className="h-6 rounded bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between px-2 text-foreground">
          <span className="text-[8px]">ticket_sent_priya.pdf</span>
          <span className="text-[7px] text-emerald-600 dark:text-emerald-400 font-mono">Delivered</span>
        </div>
      </div>
    )
  },
  {
    icon: Users,
    title: "Team Registration",
    description: "Manage group signups. Allow leaders to invite members, share payment bills, and manage details.",
    color: "blue",
    visual: (
      <div className="w-full h-32 rounded-xl bg-background/85 border border-border p-3 flex flex-col justify-center gap-2">
        <span className="text-[9px] text-muted-foreground">Team: Bit Lords (3/4)</span>
        <div className="flex gap-2 items-center">
          <div className="flex -space-x-2">
            <span className="w-6 h-6 rounded-full bg-purple-500 border border-background flex items-center justify-center text-[8px] font-bold text-white">PK</span>
            <span className="w-6 h-6 rounded-full bg-blue-500 border border-background flex items-center justify-center text-[8px] font-bold text-white">RS</span>
            <span className="w-6 h-6 rounded-full bg-cyan-500 border border-background flex items-center justify-center text-[8px] font-bold text-white">AM</span>
          </div>
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-muted border border-border text-foreground font-medium select-none">+ Invite Member</span>
        </div>
      </div>
    )
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time tracking of sign-ups, payment splits, check-in percentages, and marketing UTM codes.",
    color: "cyan",
    visual: (
      <div className="w-full h-32 rounded-xl bg-background/85 border border-border p-3 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-muted-foreground">Conversion Rate</span>
          <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">14.8%</span>
        </div>
        <div className="flex gap-1 items-end h-12">
          <div className="w-1/6 bg-cyan-500/10 dark:bg-cyan-500/20 h-[30%] rounded-t" />
          <div className="w-1/6 bg-cyan-500/30 dark:bg-cyan-500/40 h-[45%] rounded-t" />
          <div className="w-1/6 bg-cyan-500/50 dark:bg-cyan-500/60 h-[60%] rounded-t" />
          <div className="w-1/6 bg-cyan-500/70 dark:bg-cyan-500/80 h-[85%] rounded-t" />
          <div className="w-1/6 bg-cyan-600 dark:bg-cyan-500 h-[100%] rounded-t animate-pulse" />
        </div>
      </div>
    )
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden px-6">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full glow-bg-purple opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full glow-bg-blue opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title Headings */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Built Specifically for High-Velocity Events
          </h2>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            Stop stitching five tools together. Manage the entire lifecycle of student gatherings, tech hackathons, and cultural fests.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              >
                <Card glowColor={feature.color as any} className="flex flex-col h-full group">
                  {/* Card Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    feature.color === "purple" ? "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110" :
                    feature.color === "blue" ? "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110" :
                    "bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Text Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed mb-6 flex-1">
                    {feature.description}
                  </p>

                  {/* Render Visual Preview */}
                  {feature.visual}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
