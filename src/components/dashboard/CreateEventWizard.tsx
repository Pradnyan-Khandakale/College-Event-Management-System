"use client";

import React, { useState } from "react";
import { useEvents } from "./EventContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  X,
  Sparkles,
  Calendar as CalendarIcon,
  Users,
  Award,
  Globe,
  Settings,
  ChevronRight,
  ChevronLeft,
  Check,
  CheckCircle2,
  DollarSign,
  Palette
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreateEventWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEP_TITLES = [
  "Basic Details",
  "Registration",
  "Landing Page",
  "Certificates",
  "Review & Publish"
];

const GRADIENT_OPTIONS = [
  {
    name: "Neon Dusk",
    value: "linear-gradient(135deg, #a855f7 0%, #4f46e5 50%, #3b82f6 100%)",
    colors: "bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"
  },
  {
    name: "Emerald Rise",
    value: "linear-gradient(135deg, #10b981 0%, #0d9488 50%, #06b6d4 100%)",
    colors: "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
  },
  {
    name: "Cyberpunk Glow",
    value: "linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #8b5cf6 100%)",
    colors: "bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500"
  },
  {
    name: "Velvet Gold",
    value: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
    colors: "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"
  }
];

const THEME_OPTIONS = ["Neon Dusk Theme", "Minimalist Light", "Retro Cyber", "Corporate Slate"];
const CERT_TEMPLATES = [
  "Professional Gold Accent",
  "Modern Technical Blue",
  "Minimal Classic Monochrome",
  "Abstract Artsy Wave"
];

export default function CreateEventWizard({ isOpen, onClose }: CreateEventWizardProps) {
  const { addEvent } = useEvents();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [bannerGradient, setBannerGradient] = useState(GRADIENT_OPTIONS[0].value);
  const [registrationType, setRegistrationType] = useState<"free" | "paid">("free");
  const [price, setPrice] = useState(0);
  const [capacity, setCapacity] = useState(100);
  const [isTeam, setIsTeam] = useState(false);
  const [theme, setTheme] = useState(THEME_OPTIONS[0]);
  const [certTemplate, setCertTemplate] = useState(CERT_TEMPLATES[0]);
  
  const [isPublished, setIsPublished] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final Submit
      addEvent({
        name: name || "Untitled College Event",
        description: description || "Join us for an exciting new event!",
        date: date || new Date().toISOString().split("T")[0],
        bannerGradient,
        registrationType,
        price: registrationType === "free" ? 0 : price,
        capacity,
        isTeam,
        theme,
        certTemplate,
        status: "published" // Default to published on save
      });
      setIsPublished(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetAndClose = () => {
    setCurrentStep(1);
    setName("");
    setDescription("");
    setDate("");
    setBannerGradient(GRADIENT_OPTIONS[0].value);
    setRegistrationType("free");
    setPrice(0);
    setCapacity(100);
    setIsTeam(false);
    setTheme(THEME_OPTIONS[0]);
    setCertTemplate(CERT_TEMPLATES[0]);
    setIsPublished(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={resetAndClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
      />

      {/* Wizard Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.01]">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-500" /> Create New Event
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Launch your college event in minutes
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {!isPublished && (
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-black/5 dark:border-white/10">
            <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground mb-2">
              <span>Step {currentStep} of 5: {STEP_TITLES[currentStep - 1]}</span>
              <span>{Math.round(((currentStep - 1) / 4) * 100)}% Complete</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${(currentStep / 5) * 100}%` }}
                className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin">
          <AnimatePresence mode="wait">
            {isPublished ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-foreground">Event Published Successfully!</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Your event <strong className="text-foreground font-semibold">"{name || "Untitled Event"}"</strong> is now live. Students can register and complete payments immediately.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 max-w-md mx-auto space-y-2 text-left">
                  <span className="text-[10px] font-bold text-muted-foreground block uppercase tracking-wider">Live Event URL</span>
                  <div className="flex items-center justify-between gap-3 bg-white dark:bg-slate-950 px-3 py-2.5 rounded-xl border border-black/5 dark:border-white/10">
                    <span className="text-xs font-mono text-purple-600 dark:text-purple-400 select-all truncate">
                      https://eventos.club/e/{name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                    </span>
                    <button 
                      onClick={() => navigator.clipboard.writeText(`https://eventos.club/e/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`)}
                      className="text-[10px] font-bold text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
                    >
                      Copy URL
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="primary" onClick={resetAndClose}>
                    Go to Workspace
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Step 1: Basic Details */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-foreground">Event Name</label>
                      <input
                        type="text"
                        placeholder="e.g. AI Hackathon 2025"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white dark:focus:bg-slate-950 transition-all"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-foreground">Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white dark:focus:bg-slate-950 transition-all"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-foreground">Description</label>
                      <textarea
                        placeholder="Provide details about registration rules, timing, venue, prizes..."
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white dark:focus:bg-slate-950 transition-all resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-foreground">Select Banner Background</label>
                      <div className="grid grid-cols-2 gap-3">
                        {GRADIENT_OPTIONS.map((opt) => (
                          <button
                            key={opt.name}
                            type="button"
                            onClick={() => setBannerGradient(opt.value)}
                            className={`p-3 rounded-2xl border-2 text-left flex flex-col justify-between h-24 transition-all relative overflow-hidden group cursor-pointer ${
                              bannerGradient === opt.value
                                ? "border-purple-600 shadow-md scale-[1.01]"
                                : "border-black/5 dark:border-white/10 hover:border-slate-400"
                            }`}
                          >
                            {/* Graphic background */}
                            <div
                              style={{ background: opt.value }}
                              className="absolute inset-0 opacity-80 group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/10" />

                            <span className="relative z-10 text-xs font-bold text-white shadow-sm mt-auto">
                              {opt.name}
                            </span>
                            {bannerGradient === opt.value && (
                              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center z-10 shadow-md">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Registration */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setRegistrationType("free")}
                        className={`py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          registrationType === "free"
                            ? "bg-white dark:bg-slate-950 text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Free Registration
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegistrationType("paid")}
                        className={`py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          registrationType === "paid"
                            ? "bg-white dark:bg-slate-950 text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Paid Registration
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {registrationType === "paid" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex flex-col gap-1.5"
                        >
                          <label className="text-xs font-bold text-foreground">Ticket Price (INR)</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                              ₹
                            </span>
                            <input
                              type="number"
                              placeholder="500"
                              value={price || ""}
                              onChange={(e) => setPrice(Number(e.target.value))}
                              className="w-full h-11 pl-8 pr-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white dark:focus:bg-slate-950 transition-all"
                              required
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-foreground">Capacity (Seats)</label>
                        <input
                          type="number"
                          placeholder="100"
                          value={capacity || ""}
                          onChange={(e) => setCapacity(Number(e.target.value))}
                          className="w-full h-11 px-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white dark:focus:bg-slate-950 transition-all"
                        />
                      </div>

                      <div className="flex flex-col justify-end">
                        <label className="flex items-center gap-2.5 p-3.5 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors h-11">
                          <input
                            type="checkbox"
                            checked={isTeam}
                            onChange={(e) => setIsTeam(e.target.checked)}
                            className="rounded text-purple-600 focus:ring-purple-500 h-4.5 w-4.5 accent-purple-600"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-foreground">Team Registration</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Landing Page */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block">
                      Choose Brand Identity Theme
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {THEME_OPTIONS.map((themeOpt) => (
                        <button
                          key={themeOpt}
                          type="button"
                          onClick={() => setTheme(themeOpt)}
                          className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                            theme === themeOpt
                              ? "border-purple-600 bg-purple-500/[0.02] dark:bg-purple-500/[0.04]"
                              : "border-black/5 dark:border-white/10 hover:border-slate-400"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Palette className="w-5 h-5 text-muted-foreground" />
                            <span className="text-xs font-semibold text-foreground">{themeOpt}</span>
                          </div>
                          {theme === themeOpt && (
                            <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Preview Area */}
                    <div className="border border-black/5 dark:border-white/10 rounded-2xl p-4 bg-black/[0.01] dark:bg-white/[0.01] space-y-2">
                      <span className="text-[10px] font-bold text-muted-foreground block">
                        Identity Layout Preview
                      </span>
                      <div className="h-28 rounded-xl bg-white dark:bg-slate-950 border border-black/5 dark:border-white/10 overflow-hidden flex flex-col p-3 shadow-inner">
                        {/* Mock Landing Banner Preview */}
                        <div
                          style={{ background: bannerGradient }}
                          className="h-10 rounded-lg flex items-center justify-center relative shadow-sm"
                        >
                          <div className="absolute inset-0 bg-black/10" />
                          <span className="relative z-10 text-[9px] font-black text-white uppercase tracking-wider">
                            {name || "Event Title"}
                          </span>
                        </div>
                        <div className="flex-1 flex justify-between items-center mt-2.5 px-1">
                          <div className="space-y-1">
                            <div className="h-2.5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
                            <div className="h-2 w-32 bg-slate-100 dark:bg-slate-900 rounded-md" />
                          </div>
                          <div className="h-6 w-16 rounded-full bg-purple-600/10 border border-purple-500/25 flex items-center justify-center">
                            <span className="text-[8px] font-bold text-purple-600 dark:text-purple-400">
                              {registrationType === "free" ? "Free" : `₹${price}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Certificates */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block">
                      Automate Certificate Generation
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {CERT_TEMPLATES.map((tmpl) => (
                        <button
                          key={tmpl}
                          type="button"
                          onClick={() => setCertTemplate(tmpl)}
                          className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            certTemplate === tmpl
                              ? "border-purple-600 bg-purple-500/[0.01] dark:bg-purple-500/[0.02] shadow-sm"
                              : "border-black/5 dark:border-white/10 hover:border-slate-400"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Award className="w-4 h-4 text-purple-500" />
                            <span className="text-xs font-medium text-foreground">{tmpl}</span>
                          </div>
                          {certTemplate === tmpl && (
                            <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-tr from-purple-500/5 to-indigo-500/5 border border-purple-500/10 dark:border-purple-500/20 text-center">
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        🎉 <strong className="text-foreground font-semibold">Certificate USP:</strong> After participants check in via Attendance Tracker or complete the event, EventOS will automatically overlay participant names, generate verification QR codes, and email PDFs.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 5: Review & Publish */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block">
                      Review Event Summary
                    </span>

                    <Card hoverEffect={false} className="divide-y divide-black/5 dark:divide-white/5 p-0 overflow-hidden bg-black/[0.01] dark:bg-white/[0.01] border-black/5 dark:border-white/10">
                      <div className="p-4 flex items-center gap-4">
                        <div
                          style={{ background: bannerGradient }}
                          className="w-16 h-12 rounded-lg shrink-0 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-black/10" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-foreground">{name || "Untitled Event"}</h4>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                            <CalendarIcon className="w-3 h-3" /> {date || "No date selected"}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                        <div>
                          <span className="text-[10px] text-muted-foreground block">Capacity limit</span>
                          <span className="font-semibold text-foreground">{capacity} Seats</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground block">Registration Type</span>
                          <span className="font-semibold text-foreground capitalize flex items-center gap-0.5">
                            {registrationType === "free" ? (
                              "Free"
                            ) : (
                              <>
                                Paid (₹{price})
                              </>
                            )}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground block">Team Registration</span>
                          <span className="font-semibold text-foreground">
                            {isTeam ? "Enabled" : "Disabled"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground block">Branding Theme</span>
                          <span className="font-semibold text-foreground">{theme}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[10px] text-muted-foreground block">Certificate template</span>
                          <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                            <Award className="w-3.5 h-3.5 text-yellow-500" /> {certTemplate}
                          </span>
                        </div>
                      </div>
                    </Card>

                    <div className="p-4 rounded-xl border border-black/5 dark:border-white/10 flex items-center gap-3">
                      <Globe className="w-5 h-5 text-purple-500 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-foreground block">Subdomain Routing</span>
                        <p className="text-[10px] text-muted-foreground truncate">
                          Once published, visitors can access registration at: <br />
                          <code className="text-purple-600 dark:text-purple-400 font-mono">
                            https://eventos.club/e/{name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "url"}
                          </code>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {!isPublished && (
          <div className="p-6 border-t border-black/5 dark:border-white/10 flex justify-between bg-black/[0.01] dark:bg-white/[0.01]">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-1 px-4.5"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
              className="flex items-center gap-1 px-4.5"
              disabled={currentStep === 1 && !name}
            >
              {currentStep === 5 ? "Publish Event" : "Continue"}
              {currentStep !== 5 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
