"use client";

import React, { useState } from "react";
import { useEvents, Event } from "@/components/dashboard/EventContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Award,
  CheckSquare,
  CreditCard,
  BarChart3,
  Mail,
  Plus,
  Upload,
  X,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  Activity,
  ChevronRight,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Eye,
  Edit,
  ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function OverviewPage() {
  const { events, deleteEvent, duplicateEvent, publishEvent } = useEvents();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importStatus, setImportStatus] = useState<"idle" | "success">("idle");
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  // Stagger Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  // Mock Registrations
  const recentRegistrations = [
    {
      id: 1,
      name: "Aman Sen",
      college: "IIT Bombay",
      event: "AI Hackathon 2025",
      payment: "Paid",
      paymentStatus: "success",
      attendance: "Present",
      attendanceStatus: "present"
    },
    {
      id: 2,
      name: "Priya Sharma",
      college: "Stanford University",
      event: "TechFest 2025",
      payment: "Free",
      paymentStatus: "free",
      attendance: "Pending",
      attendanceStatus: "pending"
    },
    {
      id: 3,
      name: "Rahul Verma",
      college: "BITS Pilani",
      event: "Coding Contest",
      payment: "Free",
      paymentStatus: "free",
      attendance: "Present",
      attendanceStatus: "present"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      college: "Vellore Institute of Tech",
      event: "AI Hackathon 2025",
      payment: "Paid",
      paymentStatus: "success",
      attendance: "Absent",
      attendanceStatus: "absent"
    },
    {
      id: 5,
      name: "Vikram Malhotra",
      college: "MIT",
      event: "AI Hackathon 2025",
      payment: "Pending",
      paymentStatus: "pending",
      attendance: "Pending",
      attendanceStatus: "pending"
    }
  ];

  // Quick Action Grid Items
  const quickActions = [
    {
      name: "Create Event",
      icon: Plus,
      color: "from-purple-500 to-indigo-500",
      description: "Launch new event & site",
      href: "/dashboard/events/create"
    },
    {
      name: "Generate Certificates",
      icon: Award,
      color: "from-amber-400 to-amber-600",
      description: "Map details & email PDFs",
      href: "/dashboard/certificates"
    },
    {
      name: "Export Participants",
      icon: FileSpreadsheet,
      color: "from-emerald-400 to-teal-600",
      description: "Get clean registrations sheets",
      onClick: () => setShowImportModal(true)
    },
    {
      name: "Mark Attendance",
      icon: CheckSquare,
      color: "from-blue-500 to-indigo-600",
      description: "Track walkins & entries",
      href: "/dashboard/attendance"
    },
    {
      name: "Send Email Campaign",
      icon: Mail,
      color: "from-rose-500 to-pink-600",
      description: "Broadcast reminders or tickets",
      href: "/dashboard/email-campaigns"
    },
    {
      name: "View Analytics",
      icon: BarChart3,
      color: "from-cyan-500 to-teal-500",
      description: "Inspect registration metrics",
      href: "/dashboard/analytics"
    }
  ];

  // Upcoming timeline details
  const timelineEvents = [
    { time: "Tomorrow, 10:00 AM", title: "AI Workshop", desc: "Introductory session on prompt engineering", badge: "Live Soon" },
    { time: "May 28, 2026", title: "Hackathon Opening Ceremony", desc: "Keynotes & problem statement releases", badge: "Milestone" },
    { time: "June 3, 2026", title: "TechFest Launch Keynote", desc: "Main stage robotics show & developer arena", badge: "Mega Event" }
  ];

  // Activity feed items
  const activityFeed = [
    { text: "Rahul Verma registered for Coding Contest", time: "5 mins ago", icon: UserCheck, color: "text-purple-600 bg-purple-500/10" },
    { text: "Certificate sent to Priya Sharma (99.2% success rate)", time: "1 hour ago", icon: Award, color: "text-amber-500 bg-amber-500/10" },
    { text: "Payment of ₹100 received from Aman Sen", time: "3 hours ago", icon: CreditCard, color: "text-emerald-500 bg-emerald-500/10" },
    { text: "Attendance marked for Vikram Malhotra at AI Workshop", time: "6 hours ago", icon: CheckSquare, color: "text-blue-500 bg-blue-500/10" },
    { text: "AI Hackathon 2025 event published live", time: "Yesterday", icon: Sparkles, color: "text-cyan-500 bg-cyan-500/10" }
  ];

  const triggerImportFile = () => {
    setImportStatus("idle");
    setShowImportModal(true);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImportStatus("success");
    setTimeout(() => {
      setShowImportModal(false);
      setImportStatus("idle");
    }, 1500);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12"
    >
      {/* Header Banner */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 dark:bg-slate-900/40 p-6 md:p-8 rounded-3xl border border-black/5 dark:border-white/10 backdrop-blur-md relative overflow-hidden"
      >
        {/* Glow backgrounds */}
        <div className="absolute right-0 top-0 w-32 h-32 glow-bg-purple opacity-40 pointer-events-none" />

        <div className="space-y-1 relative z-10">
          <h2 className="text-xl md:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            Welcome Back 👋
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground font-medium">
            Manage your college events, automate certificates, and review registrations in real time.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 relative z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={triggerImportFile}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" /> Import Participants
          </Button>

          <Link
            href="/dashboard/events/create"
            className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer select-none bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white border border-purple-500/20 dark:border-purple-500/30 px-4 py-2 text-xs flex items-center gap-1.5 shadow-[0_4px_15px_rgba(124,58,237,0.25)] hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500"
          >
            <Plus className="w-4.5 h-4.5 stroke-[2.5]" /> Create Event
          </Link>
        </div>
      </motion.div>

      {/* Grid: Main Dashboard Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT & CENTER COLUMNS (Span 2) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SECTION 1: ACTIVE EVENTS */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" /> Active Events
              </h3>
              <Link
                href="/dashboard/events"
                className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                Manage all ({events.length}) <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {events.slice(0, 2).map((evt) => (
                <Card
                  key={evt.id}
                  glowColor={evt.status === "published" ? "purple" : "none"}
                  className="flex flex-col p-0 overflow-hidden h-full group bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10"
                >
                  {/* Banner Graphic Header */}
                  <div
                    style={{ background: evt.bannerGradient }}
                    className="h-32 w-full relative flex flex-col justify-between p-4"
                  >
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-all duration-300" />
                    
                    {/* Status Badge */}
                    <span
                      className={`relative z-10 self-start text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border shadow-sm ${
                        evt.status === "published"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : evt.status === "completed"
                          ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {evt.status}
                    </span>

                    {/* Meta Gradient Glow */}
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

                    <div className="relative z-10 text-white">
                      <h4 className="font-bold text-sm tracking-tight text-white leading-tight">
                        {evt.name}
                      </h4>
                      <span className="text-[10px] opacity-90 font-medium block mt-0.5">
                        {evt.date}
                      </span>
                    </div>
                  </div>

                  {/* Body Statistics */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                          Registrations
                        </span>
                        <p className="text-base font-black text-foreground">
                          {evt.registrations} <span className="text-xs text-muted-foreground font-normal">/ {evt.capacity}</span>
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                          Revenue
                        </span>
                        <p className="text-base font-black text-foreground">
                          ₹{evt.revenue.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    {/* Actions tray */}
                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                      <button
                        title="View Live Page"
                        onClick={() => window.open(evt.eventUrl || "#", "_blank")}
                        className="p-2.5 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        title="Edit Details"
                        className="p-2.5 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <Link
                        href="/dashboard/participants"
                        title="Participants"
                        className="p-2.5 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <Users className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/dashboard/certificates"
                        title="Certificates"
                        className="p-2.5 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <Award className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* SECTION 2: QUICK ACTIONS */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-500" /> Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                const isHovered = hoveredAction === action.name;
                
                const cardContent = (
                  <Card
                    hoverEffect={true}
                    onMouseEnter={() => setHoveredAction(action.name)}
                    onMouseLeave={() => setHoveredAction(null)}
                    className="p-5 flex flex-col justify-between h-32 relative overflow-hidden group cursor-pointer border-black/5 dark:border-white/10"
                  >
                    {/* Glowing highlight */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${action.color} opacity-[0.03] group-hover:opacity-[0.08] blur-xl transition-opacity duration-300`} />
                    
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${action.color} flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-4.5 h-4.5 stroke-[2.2]" />
                    </div>

                    <div className="space-y-0.5 relative z-10">
                      <h4 className="text-xs font-bold text-foreground flex items-center gap-1">
                        {action.name}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-purple-500" />
                      </h4>
                      <p className="text-[10px] text-muted-foreground line-clamp-1 leading-snug">
                        {action.description}
                      </p>
                    </div>
                  </Card>
                );

                if (action.href) {
                  return (
                    <Link key={action.name} href={action.href}>
                      {cardContent}
                    </Link>
                  );
                }

                return (
                  <div key={action.name} onClick={action.onClick}>
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* SECTION 3: RECENT REGISTRATIONS */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-purple-500" /> Recent Registrations
              </h3>
              <Link
                href="/dashboard/participants"
                className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                View directory <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01]">
                    <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider">College</th>
                    <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider">Event</th>
                    <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider">Payment</th>
                    <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider">Attendance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {recentRegistrations.map((reg) => (
                    <tr
                      key={reg.id}
                      className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors"
                    >
                      <td className="p-4 font-semibold text-foreground">{reg.name}</td>
                      <td className="p-4 text-muted-foreground">{reg.college}</td>
                      <td className="p-4 font-medium text-foreground">{reg.event}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            reg.paymentStatus === "success"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : reg.paymentStatus === "free"
                              ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {reg.payment}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            reg.attendanceStatus === "present"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : reg.attendanceStatus === "absent"
                              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {reg.attendance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN (Span 1) */}
        <div className="space-y-8">
          
          {/* SECTION 4: CERTIFICATE CENTER (USP Card) */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-500" /> Certificate Center
            </h3>
            
            <Card
              hoverEffect={true}
              glowColor="purple"
              className="p-6 relative overflow-hidden bg-gradient-to-tr from-white via-white/80 to-purple-500/5 dark:from-slate-900 dark:via-slate-900 dark:to-purple-500/10 border-purple-500/20 dark:border-purple-500/30 shadow-xl"
            >
              {/* Decorative Glow */}
              <div className="absolute -top-12 -right-12 w-28 h-28 glow-bg-purple opacity-60 rounded-full" />
              
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500 shrink-0 animate-pulse">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Certificate USP Automation</h4>
                  <p className="text-[10px] text-muted-foreground">Self-mailing verification sheets</p>
                </div>
              </div>

              {/* Stat Pillars */}
              <div className="grid grid-cols-3 gap-3 text-center mb-6">
                <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 rounded-xl p-2.5">
                  <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Generated</span>
                  <p className="text-sm font-black text-foreground mt-0.5">12.4k</p>
                </div>
                <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 rounded-xl p-2.5">
                  <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Emailed</span>
                  <p className="text-sm font-black text-foreground mt-0.5">12.1k</p>
                </div>
                <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 rounded-xl p-2.5">
                  <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Delivery</span>
                  <p className="text-sm font-black text-purple-600 dark:text-purple-400 mt-0.5">99.2%</p>
                </div>
              </div>

              {/* Workflow Step visualization */}
              <div className="space-y-3 mb-6 relative">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                  Workflow Execution
                </span>
                
                <div className="space-y-3">
                  {[
                    { label: "1. Upload Template", desc: "PDF coordinates map", active: true },
                    { label: "2. Map Fields", desc: "Bind variable tags like {{Name}}", active: true },
                    { label: "3. Generate PDF", desc: "Add secure verification QR", active: true },
                    { label: "4. Send via Email", desc: "Deliver instantly to inbox", active: true }
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 relative">
                      {idx !== 3 && (
                        <div className="absolute left-2.5 top-6 bottom-[-16px] w-0.5 bg-purple-500/20" />
                      )}
                      <div className="w-5.5 h-5.5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm">
                        ✓
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold text-foreground block leading-tight">{step.label}</span>
                        <span className="text-[10px] text-muted-foreground">{step.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Certificate Preview Card */}
              <div className="rounded-2xl border border-dashed border-purple-500/30 bg-purple-500/[0.01] p-3 text-center flex flex-col justify-center items-center h-28 relative group/cert overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-cyan-500/5 opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300" />
                
                <Award className="w-6 h-6 text-purple-500 mb-1 group-hover/cert:rotate-12 transition-transform" />
                <span className="text-[10px] font-bold text-foreground">Interactive Certificate Preview</span>
                <span className="text-[9px] text-muted-foreground max-w-[200px] mt-0.5">
                  Hover to load customizable vector variables templates
                </span>
              </div>
            </Card>
          </motion.div>

          {/* SECTION 5: UPCOMING EVENTS (Timeline Layout) */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" /> Upcoming Events
            </h3>

            <Card hoverEffect={false} className="p-5 border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5">
              <div className="space-y-5">
                {timelineEvents.map((timeline, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    {idx !== timelineEvents.length - 1 && (
                      <div className="absolute left-2.5 top-6 bottom-[-20px] w-0.5 bg-black/5 dark:bg-white/10" />
                    )}
                    
                    <div className="relative">
                      <div className="w-5 h-5 rounded-full border-2 border-purple-500 bg-white dark:bg-slate-950 flex items-center justify-center shrink-0 z-10 relative">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400">
                          {timeline.time}
                        </span>
                        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-muted-foreground uppercase tracking-wide shrink-0">
                          {timeline.badge}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-foreground">{timeline.title}</h4>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        {timeline.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* SECTION 6: ACTIVITY FEED */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-500" /> Activity Feed
            </h3>

            <div className="space-y-3">
              {activityFeed.map((activity, idx) => {
                const ActivityIcon = activity.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors"
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${activity.color}`}>
                      <ActivityIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-foreground truncate">
                        {activity.text}
                      </p>
                      <span className="text-[9px] text-muted-foreground block mt-0.5">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

      </div>

      {/* Create Event Wizard removed in favor of dedicated route */}

      {/* IMPORT PARTICIPANTS MOCK MODAL */}
      <AnimatePresence>
        {showImportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowImportModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 shadow-2xl rounded-3xl p-6 z-10 space-y-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-500" /> Import Participants List
                </h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="w-7 h-7 rounded-full border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {importStatus === "success" ? (
                <div className="text-center py-6 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground">Import Completed Successfully!</h4>
                  <p className="text-[10px] text-muted-foreground">
                    Loaded 124 participants. Mapping headers to active database fields.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleImportSubmit} className="space-y-4">
                  <div className="border-2 border-dashed border-black/10 dark:border-white/15 rounded-2xl p-6 text-center hover:border-purple-500 transition-colors cursor-pointer bg-black/[0.005] dark:bg-white/[0.005] group">
                    <FileSpreadsheet className="w-10 h-10 text-muted-foreground mx-auto mb-2 group-hover:text-purple-500 group-hover:scale-105 transition-all" />
                    <span className="text-xs font-semibold text-foreground block">
                      Click to upload spreadsheet
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">
                      CSV, XLS, or XLSX files up to 10MB
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-foreground">Target Event Destination</label>
                    <select className="w-full h-10 px-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500">
                      {events.map((evt) => (
                        <option key={evt.id} value={evt.id}>
                          {evt.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm" type="button" onClick={() => setShowImportModal(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" type="submit">
                      Start Mapping
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
