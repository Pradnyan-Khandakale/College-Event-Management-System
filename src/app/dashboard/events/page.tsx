"use client";

import React, { useState } from "react";
import { useEvents, Event } from "@/components/dashboard/EventContext";
import CreateEventWizard from "@/components/dashboard/CreateEventWizard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Award,
  CreditCard,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Copy,
  FolderOpen,
  Edit,
  ExternalLink,
  ChevronRight,
  Eye,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventsManagementPage() {
  const { events, deleteEvent, duplicateEvent, publishEvent } = useEvents();
  const [activeFilter, setActiveFilter] = useState<"all" | "draft" | "published" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Filters logic
  const filteredEvents = events.filter((evt) => {
    const matchesFilter = activeFilter === "all" || evt.status === activeFilter;
    const matchesSearch =
      evt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterTabs = [
    { label: "All Events", value: "all" as const },
    { label: "Published", value: "published" as const },
    { label: "Drafts", value: "draft" as const },
    { label: "Completed", value: "completed" as const }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
            Event Management
          </h2>
          <p className="text-xs text-muted-foreground font-medium">
            Create, duplicate, delete, and control your college campaign landing pages.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsWizardOpen(true)}
          className="flex items-center gap-1.5 self-start sm:self-auto shadow-[0_4px_15px_rgba(124,58,237,0.25)]"
        >
          <Plus className="w-4.5 h-4.5 stroke-[2.5]" /> Create Event
        </Button>
      </div>

      {/* Control Panel: Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/40 dark:bg-slate-900/40 p-4 rounded-2xl border border-black/5 dark:border-white/10 backdrop-blur-md">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === tab.value
                  ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border border-purple-500/10 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-black/[0.01] dark:hover:bg-white/[0.01] border border-transparent"
              }`}
            >
              {tab.label}
              {activeFilter === tab.value && (
                <span className="ml-1.5 text-[10px] font-extrabold bg-purple-500/10 px-1.5 py-0.5 rounded-full">
                  {filteredEvents.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:max-w-xs shrink-0">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-950 transition-all"
          />
        </div>
      </div>

      {/* Grid List or Empty State */}
      <AnimatePresence mode="wait">
        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-5"
          >
            {/* Illustration Icon */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-500/10 to-indigo-500/5 border border-purple-500/15 flex items-center justify-center shadow-inner relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <FolderOpen className="w-10 h-10 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
            </div>

            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-base font-bold text-foreground">Create your first event</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                There are no events matching your criteria. Get started by launching a brand new website registrations portal.
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsWizardOpen(true)}
              className="flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4.5 h-4.5 stroke-[2.5]" /> Create Event
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((evt) => (
              <motion.div
                key={evt.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <Card
                  glowColor={evt.status === "published" ? "purple" : "none"}
                  className="flex flex-col p-0 overflow-hidden h-full group bg-white/70 dark:bg-white/5 border-black/5 dark:border-white/10 shadow-sm"
                >
                  {/* Banner Gradient Header */}
                  <div
                    style={{ background: evt.bannerGradient }}
                    className="h-36 w-full relative flex flex-col justify-between p-4"
                  >
                    {/* Dark shade overlay */}
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-all duration-300" />
                    
                    {/* Status Badge */}
                    <span
                      className={`relative z-10 self-start text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border shadow-sm ${
                        evt.status === "published"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : evt.status === "completed"
                          ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {evt.status}
                    </span>

                    {/* Gradient Fade overlay */}
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                    <div className="relative z-10 text-white">
                      <h4 className="font-bold text-sm tracking-tight text-white leading-tight">
                        {evt.name}
                      </h4>
                      <span className="text-[10px] opacity-90 font-medium block mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {evt.date}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-black/5 dark:border-white/5">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-purple-500" /> Registrations
                        </span>
                        <p className="text-sm font-black text-foreground">
                          {evt.registrations} <span className="text-xs text-muted-foreground font-normal">/ {evt.capacity}</span>
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5 text-emerald-500" /> Revenue
                        </span>
                        <p className="text-sm font-black text-foreground">
                          ₹{evt.revenue.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    {/* Actions tray */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex gap-1.5">
                        <button
                          title="View Live Page"
                          onClick={() => window.open(evt.eventUrl || "#", "_blank")}
                          className="w-8 h-8 rounded-lg border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Duplicate Event"
                          onClick={() => duplicateEvent(evt.id)}
                          className="w-8 h-8 rounded-lg border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {evt.status === "draft" && (
                          <button
                            title="Publish Event"
                            onClick={() => publishEvent(evt.id)}
                            className="w-8 h-8 rounded-lg border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/5 transition-colors flex items-center justify-center cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <button
                        title="Delete Event"
                        onClick={() => deleteEvent(evt.id)}
                        className="w-8 h-8 rounded-lg border border-transparent hover:border-rose-500/10 hover:bg-rose-500/5 text-rose-500 transition-all flex items-center justify-center cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CREATE EVENT FLOW MODAL */}
      <CreateEventWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </div>
  );
}
