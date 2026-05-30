"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Layout,
  FileText,
  Sliders,
  DollarSign,
  Palette,
  Layers,
  Award,
  Users,
  Globe,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Monitor,
  Smartphone,
  Eye,
  Calendar,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  HelpCircle,
  Clock,
  QrCode,
  Share2,
  Trophy,
  ArrowRight,
  RefreshCw,
  ZoomIn,
  Maximize2,
  Grid,
  Menu,
  ChevronRight,
  GripVertical
} from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";

export interface BenefitItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  time: string;
  title: string;
  desc: string;
}

export interface SponsorItem {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
  category: "Title Sponsor" | "Powered By" | "Community Partner" | "Media Partner";
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface WebsiteConfig {
  template: "hackathon" | "fest" | "workshop" | "startup" | "minimal";
  tagline: string;
  shortDescription: string;
  longDescription: string;
  aboutCompetition: string;
  rules: string;
  eligibility: string;
  importantDates: { label: string; date: string }[];
  venue: string;
  isOnline: boolean;
  contactEmail: string;
  contactPhone: string;
  socialLinks: { twitter?: string; linkedin?: string; github?: string; instagram?: string };
  registrationType: "free" | "paid";
  entryFee: number;
  currency: string;
  discountCode: boolean;
  capacityType: "unlimited" | "limited";
  capacity: number;
  isTeam: boolean;
  minTeamSize: number;
  maxTeamSize: number;
  sections: { id: string; name: string; enabled: boolean }[];
  prizes: {
    first: string;
    second: string;
    third: string;
    special?: string;
    bestFemale?: string;
    bestInnovation?: string;
  };
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: "inter" | "outfit" | "space-grotesk" | "playfair-display";
  logoText: string;
  sponsorLogos: string[];
  speakers: { name: string; role: string; organization: string; linkedin?: string; photo: string }[];
  judges: { name: string; role: string; organization: string; linkedin?: string; photo: string }[];
  metaTitle: string;
  metaDescription: string;
  slug: string;
  enableCountdown: boolean;
  enableQrReg: boolean;
  enableWhatsappShare: boolean;
  enableEmailCollection: boolean;
  enableReferral: boolean;
  enableAmbassador: boolean;
  enableWaitlist: boolean;
  enableAttendanceTracking: boolean;
  enableCertVerification: boolean;
  enableLeaderboard: boolean;
  enableAnnouncements: boolean;
  announcementText: string;

  // NEW EDITABLE SECTIONS FIELDS
  whyParticipate: BenefitItem[];
  timeline: TimelineItem[];
  sponsors: SponsorItem[];
  faqs: FAQItem[];
}

export type TabId = "templates" | "info" | "registration" | "branding" | "sections" | "why" | "prizes" | "timeline" | "sponsors" | "faq" | "speakers" | "seo" | "advanced";

interface WebsiteBuilderProps {
  config: WebsiteConfig;
  onChange: (config: WebsiteConfig) => void;
  eventName: string;
  eventDate: string;
}

const TEMPLATE_INFO = [
  {
    id: "hackathon" as const,
    name: "Modern Hackathon",
    desc: "Dark futuristic layout with gradient accents and tech-oriented cards.",
    bestFor: "Hackathons, Coding Events, CTFs",
    styleDesc: "Dark / Neon Glow / Futuristic"
  },
  {
    id: "fest" as const,
    name: "College Fest",
    desc: "Bright, energetic template using colorful gradients and rounded graphics.",
    bestFor: "Cultural Annual Fests, Arts, Sports",
    styleDesc: "Colorful / Vibrant / Artsy"
  },
  {
    id: "workshop" as const,
    name: "Workshop / Seminar",
    desc: "Clean professional grid layout emphasizing training agendas and schedules.",
    bestFor: "Bootcamps, Lectures, Tech Training",
    styleDesc: "Clean / Neutral Grid / Professional"
  },
  {
    id: "startup" as const,
    name: "Startup Challenge",
    desc: "Premium dark/gold theme with classic typography for pitch contests.",
    bestFor: "Pitch Decks, Business Battles",
    styleDesc: "Luxury Corporate / Dark / Gold"
  },
  {
    id: "minimal" as const,
    name: "Minimal Conference",
    desc: "Apple-inspired white layout emphasizing typography and spacious paddings.",
    bestFor: "Meetups, Academic Conferences",
    styleDesc: "Apple Minimalist / Spacious"
  }
];

const FONTS_INFO = {
  "inter": "font-sans",
  "outfit": "font-sans tracking-wide",
  "space-grotesk": "font-mono font-medium",
  "playfair-display": "font-serif"
};

export default function WebsiteBuilder({ config, onChange, eventName, eventDate }: WebsiteBuilderProps) {
  const [activeTab, setActiveTab] = useState<TabId>("templates");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [zoomLevel, setZoomLevel] = useState<50 | 75 | 100>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [resizableWidth, setResizableWidth] = useState<"full" | "tablet" | "mobile">("full");

  // Local state for benefit adder
  const [newBenefitTitle, setNewBenefitTitle] = useState("");
  const [newBenefitDesc, setNewBenefitDesc] = useState("");
  const [newBenefitIcon, setNewBenefitIcon] = useState("zap");

  // Local state for timeline adder
  const [newTimeDate, setNewTimeDate] = useState("");
  const [newTimeTime, setNewTimeTime] = useState("");
  const [newTimeTitle, setNewTimeTitle] = useState("");
  const [newTimeDesc, setNewTimeDesc] = useState("");

  // Local state for sponsor adder
  const [newSponName, setNewSponName] = useState("");
  const [newSponSite, setNewSponSite] = useState("");
  const [newSponCat, setNewSponCat] = useState<SponsorItem["category"]>("Title Sponsor");

  // Local state for FAQ adder
  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");

  // Local state for speaker inputs
  const [newSpeakerName, setNewSpeakerName] = useState("");
  const [newSpeakerRole, setNewSpeakerRole] = useState("");
  const [newSpeakerOrg, setNewSpeakerOrg] = useState("");

  const updateConfig = (updates: Partial<WebsiteConfig>) => {
    onChange({ ...config, ...updates });
  };

  // Drag Reordering section list update
  const handleReorder = (newSections: { id: string; name: string; enabled: boolean }[]) => {
    updateConfig({ sections: newSections });
  };

  const toggleSection = (id: string) => {
    const updated = config.sections.map(sec => 
      sec.id === id ? { ...sec, enabled: !sec.enabled } : sec
    );
    updateConfig({ sections: updated });
  };

  // Why Participate Benefits CRUD
  const addBenefit = () => {
    if (!newBenefitTitle) return;
    const newBenefit: BenefitItem = {
      id: `benefit-${Date.now()}`,
      title: newBenefitTitle,
      desc: newBenefitDesc,
      icon: newBenefitIcon
    };
    updateConfig({ whyParticipate: [...config.whyParticipate, newBenefit] });
    setNewBenefitTitle("");
    setNewBenefitDesc("");
  };

  const removeBenefit = (id: string) => {
    updateConfig({ whyParticipate: config.whyParticipate.filter(b => b.id !== id) });
  };

  // Timeline CRUD
  const addTimelineItem = () => {
    if (!newTimeTitle || !newTimeDate) return;
    const newItem: TimelineItem = {
      id: `time-${Date.now()}`,
      date: newTimeDate,
      time: newTimeTime || "All Day",
      title: newTimeTitle,
      desc: newTimeDesc
    };
    updateConfig({ timeline: [...config.timeline, newItem] });
    setNewTimeTitle("");
    setNewTimeDate("");
    setNewTimeTime("");
    setNewTimeDesc("");
  };

  const removeTimelineItem = (id: string) => {
    updateConfig({ timeline: config.timeline.filter(t => t.id !== id) });
  };

  // Sponsors CRUD
  const addSponsorItem = () => {
    if (!newSponName) return;
    const seed = newSponName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const newItem: SponsorItem = {
      id: `spon-${Date.now()}`,
      name: newSponName,
      logoUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&radius=20&backgroundColor=6366f1&textColor=ffffff`,
      website: newSponSite,
      category: newSponCat
    };
    updateConfig({ sponsors: [...config.sponsors, newItem] });
    setNewSponName("");
    setNewSponSite("");
  };

  const removeSponsorItem = (id: string) => {
    updateConfig({ sponsors: config.sponsors.filter(s => s.id !== id) });
  };

  // FAQ CRUD
  const addFaqItem = () => {
    if (!newFaqQ || !newFaqA) return;
    const newItem: FAQItem = {
      id: `faq-${Date.now()}`,
      question: newFaqQ,
      answer: newFaqA
    };
    updateConfig({ faqs: [...config.faqs, newItem] });
    setNewFaqQ("");
    setNewFaqA("");
  };

  const removeFaqItem = (id: string) => {
    updateConfig({ faqs: config.faqs.filter(f => f.id !== id) });
  };

  // Simulate publish preview link
  const handlePublishPreview = () => {
    const draftData = {
      name: eventName || "Draft Event",
      description: config.longDescription || "",
      date: eventDate || "",
      bannerGradient: "linear-gradient(135deg, #a855f7 0%, #4f46e5 50%, #3b82f6 100%)",
      registrationType: config.registrationType,
      price: config.entryFee,
      capacity: config.capacity,
      isTeam: config.isTeam,
      theme: config.template,
      certTemplate: "Professional Gold Accent",
      slug: config.slug,
      websiteConfig: config
    };
    localStorage.setItem("eventos_wizard_draft", JSON.stringify(draftData));
    window.open(`/events/preview/${config.slug || "draft-event"}`, "_blank");
  };

  const previewFrameContent = (
    <div key={refreshKey} className="w-full h-full">
      {previewMode === "desktop" ? (
        /* DESKTOP BROWSER FRAME MOCKUP (Behaves exactly like a real website) */
        <div className="w-full h-[650px] bg-white dark:bg-slate-900 border border-black/15 dark:border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
          {/* Browser Header Bar */}
          <div className="bg-slate-100 dark:bg-slate-950 border-b border-black/5 dark:border-white/10 px-4 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5 w-1/4">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="w-2/4 max-w-md bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-lg py-1 px-4 text-[10px] text-muted-foreground truncate font-sans text-center shadow-inner relative flex items-center justify-center">
              eventos.club/events/preview/{config.slug || "untitled-campaign"}
            </div>
            <div className="w-1/4 flex justify-end">
              <div className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
          
          {/* Scrollable Website Canvas */}
          <div className="flex-1 overflow-y-auto scroll-smooth" style={{ height: "calc(100% - 37px)" }}>
            <RenderLandingPage config={config} eventName={eventName} eventDate={eventDate} isMobile={false} />
          </div>
        </div>
      ) : (
        /* MOBILE IPHONE MOCKUP FRAME (Scrollable website within iPhone frame) */
        <div className="w-[300px] h-[650px] bg-slate-950 rounded-[44px] p-3.5 border-[8px] border-slate-900 dark:border-slate-800 shadow-2xl flex flex-col relative overflow-hidden mx-auto shrink-0">
          
          {/* Dynamic Island / Notch */}
          <div className="absolute top-2 inset-x-0 h-6 flex justify-center items-center z-30 pointer-events-none">
            <div className="w-24 h-4 bg-slate-950 rounded-full border border-slate-900 shadow-lg flex items-center justify-end px-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900 animate-pulse" />
            </div>
          </div>

          {/* Phone Screen Canvas */}
          <div className="flex-1 rounded-[32px] bg-white dark:bg-slate-900 overflow-hidden flex flex-col relative shadow-inner">
            
            {/* Status Bar */}
            <div className="h-7 px-5 pt-1.5 flex justify-between items-center text-[8px] font-bold text-muted-foreground bg-black/[0.02] dark:bg-white/[0.02] shrink-0 z-20 select-none">
              <span>9:41 AM</span>
              <div className="flex items-center gap-1 font-mono">
                <span>5G</span>
                <div className="w-3.5 h-2 bg-slate-400 dark:bg-slate-600 rounded-sm" />
              </div>
            </div>

            {/* Scrollable Internal Website */}
            <div className="flex-1 overflow-y-auto scroll-smooth" style={{ height: "calc(100% - 28px)" }}>
              <RenderLandingPage config={config} eventName={eventName} eventDate={eventDate} isMobile={true} />
            </div>
          </div>

        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 select-none relative">
      
      {/* LEFT PANEL: CONFIGURATION FORMS SIDEBAR */}
      <div className="w-full lg:w-[440px] flex flex-col border border-black/5 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl overflow-hidden shrink-0 h-full max-h-[76vh]">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] overflow-x-auto scrollbar-none text-xs font-bold whitespace-nowrap">
          {([
            { id: "templates", label: "Templates", icon: Layout },
            { id: "info", label: "Info", icon: FileText },
            { id: "registration", label: "Tickets", icon: DollarSign },
            { id: "branding", label: "Branding", icon: Palette },
            { id: "sections", label: "Layouts", icon: Layers },
            { id: "why", label: "Why Join", icon: Award },
            { id: "prizes", label: "Prizes", icon: Trophy },
            { id: "timeline", label: "Timeline", icon: Calendar },
            { id: "sponsors", label: "Sponsors", icon: Grid },
            { id: "faq", label: "FAQ Accordion", icon: HelpCircle },
            { id: "speakers", label: "Speakers", icon: Users },
            { id: "seo", label: "SEO Settings", icon: Globe },
            { id: "advanced", label: "Advanced", icon: Sliders }
          ] as { id: TabId; label: string; icon: any }[]).map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "border-purple-600 text-purple-600 dark:text-purple-400 bg-purple-500/[0.02]"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic tab contents */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin text-xs">
          
          {/* TAB: TEMPLATES */}
          {activeTab === "templates" && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground">Select Landing Page Theme</h4>
                <p className="text-[10px] text-muted-foreground">Select the baseline visual design template of your site.</p>
              </div>

              <div className="space-y-3">
                {TEMPLATE_INFO.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => updateConfig({ template: tpl.id })}
                    className={`w-full p-4 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                      config.template === tpl.id
                        ? "border-purple-600 bg-purple-500/[0.02] dark:bg-purple-500/[0.05]"
                        : "border-black/5 dark:border-white/10 hover:border-slate-400"
                    }`}
                  >
                    <div className="space-y-1 pr-4">
                      <span className="font-bold text-foreground block">{tpl.name}</span>
                      <p className="text-[10px] text-muted-foreground leading-normal">{tpl.desc}</p>
                      <span className="text-[9px] font-bold text-purple-500 block pt-1">Best For: {tpl.bestFor}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      config.template === tpl.id ? "bg-purple-600 border-purple-600 text-white" : "border-black/15"
                    }`}>
                      {config.template === tpl.id && "✓"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB: INFO */}
          {activeTab === "info" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-foreground">Short Tagline</label>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) => updateConfig({ tagline: e.target.value })}
                  placeholder="e.g. Build Next-Gen AI Applications"
                  className="h-10 px-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-foreground">Short Description</label>
                <textarea
                  value={config.shortDescription}
                  onChange={(e) => updateConfig({ shortDescription: e.target.value })}
                  rows={2}
                  className="px-3 py-2 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-foreground">Long Description</label>
                <textarea
                  value={config.longDescription}
                  onChange={(e) => updateConfig({ longDescription: e.target.value })}
                  rows={3}
                  className="px-3 py-2 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-foreground">Venue</label>
                  <input
                    type="text"
                    value={config.venue}
                    onChange={(e) => updateConfig({ venue: e.target.value })}
                    className="h-10 px-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01]"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] h-10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.isOnline}
                      onChange={(e) => updateConfig({ isOnline: e.target.checked })}
                      className="accent-purple-600 rounded"
                    />
                    <span className="font-bold text-foreground">Online Event</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TICKETS REGISTRATION */}
          {activeTab === "registration" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5">
                <button
                  type="button"
                  onClick={() => updateConfig({ registrationType: "free" })}
                  className={`py-2 rounded-lg font-bold cursor-pointer ${
                    config.registrationType === "free" ? "bg-white dark:bg-slate-900 text-purple-600" : "text-muted-foreground"
                  }`}
                >
                  Free Ticket
                </button>
                <button
                  type="button"
                  onClick={() => updateConfig({ registrationType: "paid" })}
                  className={`py-2 rounded-lg font-bold cursor-pointer ${
                    config.registrationType === "paid" ? "bg-white dark:bg-slate-900 text-purple-600" : "text-muted-foreground"
                  }`}
                >
                  Paid Ticket
                </button>
              </div>

              {config.registrationType === "paid" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-foreground">Entry Fee</label>
                    <input
                      type="number"
                      value={config.entryFee}
                      onChange={(e) => updateConfig({ entryFee: Number(e.target.value) })}
                      className="h-10 px-3 rounded-xl border border-black/5 bg-black/[0.01]"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-2 p-2.5 rounded-xl border border-black/5 bg-black/[0.01] h-10 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.discountCode}
                        onChange={(e) => updateConfig({ discountCode: e.target.checked })}
                        className="accent-purple-600 rounded"
                      />
                      <span className="font-bold text-foreground">Discounts Code</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-black/5">
                <div>
                  <span className="font-bold text-foreground block">Team Signups</span>
                  <span className="text-[10px] text-muted-foreground">Is team registration enabled?</span>
                </div>
                <input
                  type="checkbox"
                  checked={config.isTeam}
                  onChange={(e) => updateConfig({ isTeam: e.target.checked })}
                  className="accent-purple-600 h-4 w-4 rounded cursor-pointer"
                />
              </div>

              {config.isTeam && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-foreground">Min Size</label>
                    <input
                      type="number"
                      value={config.minTeamSize}
                      onChange={(e) => updateConfig({ minTeamSize: Number(e.target.value) })}
                      className="h-9 px-3 rounded-xl border border-black/5 bg-black/[0.01]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-foreground">Max Size</label>
                    <input
                      type="number"
                      value={config.maxTeamSize}
                      onChange={(e) => updateConfig({ maxTeamSize: Number(e.target.value) })}
                      className="h-9 px-3 rounded-xl border border-black/5 bg-black/[0.01]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: BRANDING */}
          {activeTab === "branding" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-foreground">Branding Logo Text</label>
                <input
                  type="text"
                  value={config.logoText}
                  onChange={(e) => updateConfig({ logoText: e.target.value })}
                  className="h-10 px-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] text-foreground"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-foreground text-[9px] text-center uppercase">Primary</label>
                  <input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                    className="w-full h-8 rounded-lg cursor-pointer p-0.5"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-foreground text-[9px] text-center uppercase">Secondary</label>
                  <input
                    type="color"
                    value={config.secondaryColor}
                    onChange={(e) => updateConfig({ secondaryColor: e.target.value })}
                    className="w-full h-8 rounded-lg cursor-pointer p-0.5"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-foreground text-[9px] text-center uppercase">Accent</label>
                  <input
                    type="color"
                    value={config.accentColor}
                    onChange={(e) => updateConfig({ accentColor: e.target.value })}
                    className="w-full h-8 rounded-lg cursor-pointer p-0.5"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-foreground">Typography Font</label>
                <select
                  value={config.font}
                  onChange={(e) => updateConfig({ font: e.target.value as WebsiteConfig["font"] })}
                  className="h-10 px-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] text-foreground"
                >
                  <option value="inter">Inter (Sans)</option>
                  <option value="outfit">Outfit (Geometric)</option>
                  <option value="space-grotesk">Space Grotesk (Tech)</option>
                  <option value="playfair-display">Playfair Display (Serif)</option>
                </select>
              </div>
            </div>
          )}

          {/* TAB: SECTIONS REORDERING (Drag & Drop via Reorder.Group) */}
          {activeTab === "sections" && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground">Landing Page Sections Layout</h4>
                <p className="text-[10px] text-muted-foreground">Drag to reorder sections. Toggle checkbox to show/hide on live preview.</p>
              </div>

              {/* Framer Motion Reorder component */}
              <Reorder.Group
                axis="y"
                values={config.sections}
                onReorder={handleReorder}
                className="space-y-2"
              >
                {config.sections.map((sec) => (
                  <Reorder.Item
                    key={sec.id}
                    value={sec}
                    className={`flex items-center justify-between p-3 rounded-xl border bg-white dark:bg-slate-900 transition-all select-none ${
                      sec.enabled ? "border-purple-500/20 shadow-sm" : "border-black/5 opacity-55"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={sec.enabled}
                        onChange={() => toggleSection(sec.id)}
                        className="accent-purple-600 h-4 w-4 rounded cursor-pointer shrink-0"
                      />
                      <span className="font-bold text-foreground">{sec.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
                      <GripVertical className="w-4 h-4 shrink-0" />
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          )}

          {/* TAB: WHY PARTICIPATE */}
          {activeTab === "why" && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground">Why Participate (Benefit Cards)</h4>
                <p className="text-[10px] text-muted-foreground">Add value cards showcasing perks of this event campaign.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-black/5 bg-black/[0.005] dark:bg-white/[0.005] space-y-2.5">
                <input
                  type="text"
                  placeholder="Benefit Title (e.g. Win Cash Prizes)"
                  value={newBenefitTitle}
                  onChange={(e) => setNewBenefitTitle(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                />
                <input
                  type="text"
                  placeholder="Short Description (e.g. Grab awards for top 3)"
                  value={newBenefitDesc}
                  onChange={(e) => setNewBenefitDesc(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                />
                <div className="flex gap-2">
                  <select
                    value={newBenefitIcon}
                    onChange={(e) => setNewBenefitIcon(e.target.value)}
                    className="flex-1 h-9 px-2 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                  >
                    <option value="zap">⚡ Zap Glow Icon</option>
                    <option value="users">👥 Group Users Icon</option>
                    <option value="trophy">🏆 Trophy Prize Icon</option>
                    <option value="award">📜 Certification Award</option>
                    <option value="sparkles">✨ Sparkles Magic</option>
                  </select>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={addBenefit}
                    className="h-9 rounded-lg"
                  >
                    Add Card
                  </Button>
                </div>
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {config.whyParticipate.map((b) => (
                  <div key={b.id} className="flex justify-between items-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-black/5">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-500 font-bold">★</span>
                      <div>
                        <h5 className="font-bold text-foreground leading-none">{b.title}</h5>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{b.desc}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBenefit(b.id)}
                      className="text-rose-500 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PRIZES */}
          {activeTab === "prizes" && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground">Edit Rewards & Pools</h4>
                <p className="text-[10px] text-muted-foreground">Configure custom cash prizes for different winner benchmarks.</p>
              </div>

              <div className="space-y-3">
                {([
                  { key: "first", label: "🥇 1st Place Prize" },
                  { key: "second", label: "🥈 2nd Place Prize" },
                  { key: "third", label: "🥉 3rd Place Prize" },
                  { key: "bestFemale", label: "👩 Best Female Team Reward" },
                  { key: "bestInnovation", label: "💡 Best Innovation Award" },
                  { key: "special", label: "🎗️ Special Mentions Swags" }
                ] as { key: keyof WebsiteConfig["prizes"]; label: string }[]).map((item) => (
                  <div key={item.key} className="flex flex-col gap-1">
                    <label className="font-bold text-foreground">{item.label}</label>
                    <input
                      type="text"
                      value={config.prizes[item.key] || ""}
                      onChange={(e) => updateConfig({ prizes: { ...config.prizes, [item.key]: e.target.value } })}
                      className="h-10 px-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TIMELINE */}
          {activeTab === "timeline" && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground">Event Timeline Milestones</h4>
                <p className="text-[10px] text-muted-foreground">Add chronological steps of your event schedule.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-black/5 bg-black/[0.005] dark:bg-white/[0.005] space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={newTimeDate}
                    onChange={(e) => setNewTimeDate(e.target.value)}
                    className="h-9 px-2 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                  />
                  <input
                    type="text"
                    placeholder="Time (e.g. 09:00 AM)"
                    value={newTimeTime}
                    onChange={(e) => setNewTimeTime(e.target.value)}
                    className="h-9 px-3 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Milestone Title (e.g. Registrations Close)"
                  value={newTimeTitle}
                  onChange={(e) => setNewTimeTitle(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                />
                <input
                  type="text"
                  placeholder="Short Description"
                  value={newTimeDesc}
                  onChange={(e) => setNewTimeDesc(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                />
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={addTimelineItem}
                  className="w-full h-9 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Milestone Checkpoint
                </Button>
              </div>

              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {config.timeline.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-black/5">
                    <div>
                      <h5 className="font-bold text-foreground leading-none">{item.title}</h5>
                      <span className="text-[8px] text-purple-600 dark:text-purple-400 font-semibold block mt-0.5">{item.date} • {item.time}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTimelineItem(item.id)}
                      className="text-rose-500 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SPONSORS */}
          {activeTab === "sponsors" && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground">Sponsors & Partners Wall</h4>
                <p className="text-[10px] text-muted-foreground">Manage organization logos and associate placement categories.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-black/5 bg-black/[0.005] dark:bg-white/[0.005] space-y-2.5">
                <input
                  type="text"
                  placeholder="Sponsor / Partner Name"
                  value={newSponName}
                  onChange={(e) => setNewSponName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                />
                <input
                  type="text"
                  placeholder="Website Link (Optional)"
                  value={newSponSite}
                  onChange={(e) => setNewSponSite(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                />
                <div className="flex gap-2">
                  <select
                    value={newSponCat}
                    onChange={(e) => setNewSponCat(e.target.value as SponsorItem["category"])}
                    className="flex-1 h-9 px-2 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                  >
                    <option value="Title Sponsor">🥇 Title Sponsor</option>
                    <option value="Powered By">🥈 Powered By</option>
                    <option value="Community Partner">🤝 Community Partner</option>
                    <option value="Media Partner">📺 Media Partner</option>
                  </select>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={addSponsorItem}
                    className="h-9 rounded-lg"
                  >
                    Add Logo
                  </Button>
                </div>
              </div>

              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {config.sponsors.map((spon) => (
                  <div key={spon.id} className="flex justify-between items-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-black/5">
                    <div className="flex items-center gap-2">
                      <img src={spon.logoUrl} alt={spon.name} className="w-8 h-8 rounded bg-slate-100 p-0.5" />
                      <div>
                        <h5 className="font-bold text-foreground leading-none">{spon.name}</h5>
                        <span className="text-[8px] text-muted-foreground mt-0.5 block">{spon.category}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSponsorItem(spon.id)}
                      className="text-rose-500 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FAQ */}
          {activeTab === "faq" && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground">Frequently Asked Questions Accordion</h4>
                <p className="text-[10px] text-muted-foreground">Add custom Q&As to display as interactive dropdown cards.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-black/5 bg-black/[0.005] dark:bg-white/[0.005] space-y-2.5">
                <input
                  type="text"
                  placeholder="Question (e.g. Is there a cash prize?)"
                  value={newFaqQ}
                  onChange={(e) => setNewFaqQ(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                />
                <textarea
                  rows={2}
                  placeholder="Answer Details"
                  value={newFaqA}
                  onChange={(e) => setNewFaqA(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-black/5 bg-white dark:bg-slate-950 resize-none"
                />
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={addFaqItem}
                  className="w-full h-9 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add FAQ Entry
                </Button>
              </div>

              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {config.faqs.map((f) => (
                  <div key={f.id} className="flex justify-between items-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-black/5">
                    <div className="min-w-0 flex-1 pr-3">
                      <h5 className="font-bold text-foreground truncate leading-none">{f.question}</h5>
                      <p className="text-[9px] text-muted-foreground mt-0.5 truncate">{f.answer}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFaqItem(f.id)}
                      className="text-rose-500 hover:text-rose-600 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SPEAKERS */}
          {activeTab === "speakers" && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground">Speakers Registry</h4>
                <p className="text-[10px] text-muted-foreground">Manage profile pictures, roles, and socials of campaign mentors.</p>
              </div>

              <div className="p-3 rounded-xl border border-black/5 bg-black/[0.005] space-y-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newSpeakerName}
                  onChange={(e) => setNewSpeakerName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                />
                <input
                  type="text"
                  placeholder="Role / Title"
                  value={newSpeakerRole}
                  onChange={(e) => setNewSpeakerRole(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                />
                <input
                  type="text"
                  placeholder="Organization"
                  value={newSpeakerOrg}
                  onChange={(e) => setNewSpeakerOrg(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-black/5 bg-white dark:bg-slate-950"
                />
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  className="w-full h-9 rounded-lg"
                  onClick={() => {
                    if (newSpeakerName.trim()) {
                      const photo = `https://api.dicebear.com/7.x/adventurer/svg?seed=${newSpeakerName.toLowerCase().replace(/ /g, "-")}`;
                      updateConfig({
                        speakers: [
                          ...config.speakers,
                          { name: newSpeakerName, role: newSpeakerRole || "Speaker", organization: newSpeakerOrg || "University", photo }
                        ]
                      });
                      setNewSpeakerName("");
                      setNewSpeakerRole("");
                      setNewSpeakerOrg("");
                    }
                  }}
                >
                  Add Speaker Card
                </Button>
              </div>

              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {config.speakers.map((spk, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-black/5">
                    <div className="flex items-center gap-2">
                      <img src={spk.photo} alt={spk.name} className="w-8 h-8 rounded-full bg-slate-100" />
                      <div>
                        <h5 className="font-bold text-foreground leading-none">{spk.name}</h5>
                        <span className="text-[9px] text-muted-foreground mt-0.5 block">{spk.role} at {spk.organization}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateConfig({ speakers: config.speakers.filter((_, i) => i !== idx) })}
                      className="text-rose-500 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SEO */}
          {activeTab === "seo" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-foreground">Meta Title</label>
                <input
                  type="text"
                  value={config.metaTitle}
                  onChange={(e) => updateConfig({ metaTitle: e.target.value })}
                  className="h-10 px-3 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-foreground">Meta Description</label>
                <textarea
                  value={config.metaDescription}
                  onChange={(e) => updateConfig({ metaDescription: e.target.value })}
                  rows={2}
                  className="px-3 py-2 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-foreground">URL Slug Path</label>
                <div className="flex items-center">
                  <span className="h-10 px-3 rounded-l-xl border-y border-l border-black/5 bg-slate-100 dark:bg-slate-800 text-muted-foreground flex items-center justify-center font-mono">
                    eventos.club/e/
                  </span>
                  <input
                    type="text"
                    value={config.slug}
                    onChange={(e) => updateConfig({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                    className="flex-1 h-10 px-3 rounded-r-xl border border-black/5 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: ADVANCED FEATURES */}
          {activeTab === "advanced" && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground">Advanced Site Integrations</h4>
                <p className="text-[10px] text-muted-foreground">Select widgets to display on your landing page.</p>
              </div>

              <div className="space-y-2">
                {([
                  { id: "enableCountdown", label: "Countdown Timer", desc: "Show ticks to event opening" },
                  { id: "enableQrReg", label: "QR Pass Ticket allocation", desc: "Attach scanner verifications" },
                  { id: "enableWhatsappShare", label: "WhatsApp Share link", desc: "Enable quick group invites" },
                  { id: "enableEmailCollection", label: "Email Newsletter Signup", desc: "Build subscriber registry" },
                  { id: "enableLeaderboard", label: "Registrants Leaderboard", desc: "Rank campus referral promoter tables" },
                  { id: "enableAnnouncements", label: "Announcements Alert Banner", desc: "Marquee notification ticker bar" }
                ] as const).map((item) => (
                  <label key={item.id} className="flex items-start gap-3 p-2.5 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.005] cursor-pointer hover:bg-black/[0.015]">
                    <input
                      type="checkbox"
                      checked={config[item.id]}
                      onChange={(e) => updateConfig({ [item.id]: e.target.checked })}
                      className="accent-purple-600 rounded mt-0.5 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-foreground block leading-tight">{item.label}</span>
                      <span className="text-[9px] text-muted-foreground leading-normal">{item.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              {config.enableAnnouncements && (
                <div className="flex flex-col gap-1 pt-2">
                  <label className="font-bold text-foreground">Banner Text</label>
                  <input
                    type="text"
                    value={config.announcementText}
                    onChange={(e) => updateConfig({ announcementText: e.target.value })}
                    placeholder="e.g. Registrations closing soon!"
                    className="h-9 px-3 rounded-xl border border-black/5 bg-black/[0.01]"
                  />
                </div>
              )}
            </div>
          )}

        </div>

        {/* Saved Draft notice */}
        <div className="p-4 border-t border-black/5 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 flex justify-between items-center text-xs shrink-0">
          <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Auto-saved draft
          </span>
          <button
            type="button"
            className="text-purple-600 dark:text-purple-400 font-bold hover:underline cursor-pointer"
            onClick={() => alert("Draft details saved to local storage!")}
          >
            Save Draft
          </button>
        </div>

      </div>

      {/* RIGHT PANEL: DYNAMIC VIEWPORT PREVIEW CANVAS */}
      <div className="flex-1 flex flex-col h-full max-h-[76vh]">
        
        {/* Viewport Control Header Bar */}
        <div className="flex flex-wrap gap-3 items-center justify-between bg-white/40 dark:bg-slate-950/40 p-2.5 rounded-xl border border-black/5 dark:border-white/10 mb-4 shrink-0 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-purple-500" /> Web Previewer
            </span>
            
            {/* Viewport resizing presets */}
            <div className="hidden sm:flex border-l border-black/5 dark:border-white/10 pl-2.5 gap-1 select-none">
              <button
                onClick={() => setResizableWidth("full")}
                className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${
                  resizableWidth === "full" ? "bg-slate-200 dark:bg-slate-800 text-foreground" : "text-muted-foreground"
                }`}
              >
                Laptop (Full)
              </button>
              <button
                onClick={() => setResizableWidth("tablet")}
                className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${
                  resizableWidth === "tablet" ? "bg-slate-200 dark:bg-slate-800 text-foreground" : "text-muted-foreground"
                }`}
              >
                Tablet (768px)
              </button>
              <button
                onClick={() => setResizableWidth("mobile")}
                className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${
                  resizableWidth === "mobile" ? "bg-slate-200 dark:bg-slate-800 text-foreground" : "text-muted-foreground"
                }`}
              >
                Phone (375px)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom dropdown selector */}
            <div className="flex items-center gap-1 border-r border-black/5 dark:border-white/10 pr-2.5 select-none">
              <span className="text-[10px] text-muted-foreground">Zoom:</span>
              {([50, 75, 100] as const).map((z) => (
                <button
                  key={z}
                  onClick={() => setZoomLevel(z)}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer ${
                    zoomLevel === z ? "bg-purple-600 text-white" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
                  }`}
                >
                  {z}%
                </button>
              ))}
            </div>

            {/* Simulated Action buttons */}
            <button
              onClick={() => setRefreshKey(prev => prev + 1)}
              title="Reload preview"
              className="p-1.5 rounded-lg border border-black/5 dark:border-white/10 hover:bg-black/5 text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsFullscreen(true)}
              title="Fullscreen modal"
              className="p-1.5 rounded-lg border border-black/5 dark:border-white/10 hover:bg-black/5 text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handlePublishPreview}
              className="px-3 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold cursor-pointer shadow flex items-center gap-1"
            >
              <Globe className="w-3 h-3" /> Live Link
            </button>
          </div>
        </div>

        {/* Preview Frame Wrapper Canvas with resizable boundaries */}
        <div className="flex-1 flex justify-center items-center bg-slate-100/60 dark:bg-slate-950/40 border border-black/5 dark:border-white/10 rounded-2xl p-4 overflow-hidden relative min-h-[480px]">
          
          <div
            className="transition-all duration-300 flex items-center justify-center"
            style={{
              width: resizableWidth === "full" ? "100%" : resizableWidth === "tablet" ? "768px" : "375px",
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "center center"
            }}
          >
            {previewFrameContent}
          </div>

        </div>

      </div>

      {/* FULLSCREEN PREVIEW OVERLAY DIALOG */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white select-none">
            {/* Header control */}
            <div className="h-14 px-6 border-b border-white/10 flex items-center justify-between bg-slate-900 shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight flex items-center gap-1">
                  <Eye className="w-4.5 h-4.5 text-purple-400" /> Fullscreen Live Preview
                </span>
                <span className="text-[10px] text-muted-foreground">| https://eventos.club/events/preview/{config.slug || "untitled-campaign"}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex border border-white/15 rounded-lg p-0.5 text-xs bg-slate-950">
                  <button
                    onClick={() => setPreviewMode("desktop")}
                    className={`px-3 py-1 rounded-md font-semibold cursor-pointer ${
                      previewMode === "desktop" ? "bg-white text-slate-950" : "text-slate-400"
                    }`}
                  >
                    Desktop View
                  </button>
                  <button
                    onClick={() => setPreviewMode("mobile")}
                    className={`px-3 py-1 rounded-md font-semibold cursor-pointer ${
                      previewMode === "mobile" ? "bg-white text-slate-950" : "text-slate-400"
                    }`}
                  >
                    Mobile View
                  </button>
                </div>
                
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 font-bold text-xs cursor-pointer text-white"
                >
                  Exit Preview
                </button>
              </div>
            </div>

            {/* Fullscreen view inner area */}
            <div className="flex-1 bg-slate-900 p-8 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full max-w-6xl flex justify-center items-center">
                {previewFrameContent}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

/* ====================================================
   DYNAMIC RENDER LANDING PAGE COMPONENT
   ==================================================== */
export function RenderLandingPage({ config, eventName, eventDate, isMobile = false }: { config: WebsiteConfig; eventName: string; eventDate: string; isMobile?: boolean }) {
  const isDark = config.template === "hackathon" || config.template === "startup";
  const headingFont = FONTS_INFO[config.font] || "font-sans";

  // Pre-configured style themes
  const themeStyles = {
    hackathon: {
      bg: "bg-slate-950 text-slate-100",
      card: "bg-slate-900/80 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.05)]",
      textGradient: "bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent",
      accentText: "text-purple-400",
      badge: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
      btn: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]"
    },
    fest: {
      bg: "bg-gradient-to-br from-amber-50/50 via-rose-50/30 to-purple-50/50 dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-200",
      card: "bg-white/80 dark:bg-white/5 border border-pink-500/10 dark:border-pink-500/20 shadow-md",
      textGradient: "bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 bg-clip-text text-transparent",
      accentText: "text-rose-500",
      badge: "bg-rose-500/10 text-rose-500 border border-rose-500/20",
      btn: "bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white shadow-md"
    },
    workshop: {
      bg: "bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200",
      card: "bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 shadow-sm",
      textGradient: "bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent",
      accentText: "text-blue-600 dark:text-blue-400",
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
      btn: "bg-blue-600 hover:bg-blue-500 text-white"
    },
    startup: {
      bg: "bg-neutral-950 text-neutral-100",
      card: "bg-neutral-900 border border-amber-500/20 shadow-inner",
      textGradient: "bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent",
      accentText: "text-amber-400",
      badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      btn: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold"
    },
    minimal: {
      bg: "bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100",
      card: "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
      textGradient: "text-slate-900 dark:text-white",
      accentText: "text-slate-800 dark:text-white",
      badge: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700",
      btn: "bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-medium"
    }
  };

  const activeTheme = themeStyles[config.template] || themeStyles.hackathon;

  return (
    <div className={`text-[10px] w-full min-h-full pb-12 flex flex-col font-sans select-none ${activeTheme.bg}`}>
      
      {/* Announcements Bar */}
      {config.enableAnnouncements && (
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-1 px-4 text-center text-[7px] font-bold tracking-wide flex items-center justify-center gap-1 shrink-0">
          <Sparkles className="w-2.5 h-2.5 animate-spin" /> {config.announcementText || "Registrations are now open! Complete payment today."}
        </div>
      )}

      {/* Navbar Layout (Framer website style) */}
      <header className="px-5 py-3.5 flex justify-between items-center border-b border-black/[0.04] dark:border-white/[0.04] backdrop-blur-md sticky top-0 bg-white/10 dark:bg-black/10 z-10">
        <span className={`font-black text-xs tracking-tight ${headingFont} ${activeTheme.accentText}`}>
          {config.logoText || eventName || "EVENT-OS"}
        </span>

        {isMobile ? (
          /* Mobile: Logo + Menu Icon on right (No CTA overlap) */
          <button type="button" className="text-muted-foreground hover:text-foreground">
            <Menu className="w-4.5 h-4.5" />
          </button>
        ) : (
          /* Desktop: standard nav buttons + CTA */
          <div className="flex items-center gap-4">
            <nav className="flex gap-3 text-[8.5px] font-bold text-muted-foreground pl-4">
              <span>Overview</span>
              <span>Timeline</span>
              <span>Speakers</span>
              <span>FAQ</span>
            </nav>
            <button className={`px-3.5 py-1.5 rounded-full text-[8px] font-bold transition-all ${activeTheme.btn}`}>
              Register Now
            </button>
          </div>
        )}
      </header>

      {/* Dynamic Sections Sequence */}
      <div className="space-y-10 flex-1">
        {config.sections.filter(s => s.enabled).map((sec) => {
          
          /* HERO SECTION */
          if (sec.id === "hero") {
            return (
              <section key="hero" className="px-5 py-10 text-center space-y-5 relative">
                {/* Radial Glow details */}
                <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none" />

                <div className="space-y-2.5 relative z-10">
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${activeTheme.badge}`}>
                      📅 {eventDate || "June 15, 2026"}
                    </span>
                    {config.isTeam && (
                      <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${activeTheme.badge}`}>
                        👥 Team Size: {config.minTeamSize}-{config.maxTeamSize} Members
                      </span>
                    )}
                  </div>
                  
                  <h1 className={`text-xl md:text-2xl font-extrabold tracking-tight ${headingFont} ${activeTheme.textGradient} leading-tight max-w-lg mx-auto`}>
                    {eventName || "Untitled College Event"}
                  </h1>
                  <p className="text-[9px] text-muted-foreground max-w-sm mx-auto leading-normal">
                    {config.tagline || "Manage your college events with beautiful automations."}
                  </p>
                </div>

                {/* Mobile CTA: Register CTA button shifts below hero details */}
                <div className="flex flex-col items-center justify-center gap-2.5 relative z-10 pt-2">
                  <button className={`w-40 py-2 rounded-full font-bold shadow-md text-[9px] ${activeTheme.btn}`}>
                    Register Now • {config.registrationType === "free" ? "Free Entry" : `₹${config.entryFee}`}
                  </button>
                  <span className="text-[7.5px] text-muted-foreground block">
                    {config.capacityType === "limited" ? `⚠️ Limit: Only ${config.capacity} tickets remaining!` : "✓ Seats available for registration"}
                  </span>
                </div>

                {/* Countdown Timers */}
                {config.enableCountdown && (
                  <div className="py-2 flex items-center justify-center gap-2 relative z-10 select-none">
                    {[
                      { val: "14", unit: "Days" },
                      { val: "08", unit: "Hours" },
                      { val: "45", unit: "Mins" }
                    ].map((time, i) => (
                      <div key={i} className={`px-2.5 py-1.5 rounded-lg text-center ${activeTheme.card} min-w-[42px]`}>
                        <span className="font-mono font-bold text-xs block text-foreground leading-none">{time.val}</span>
                        <span className="text-[6px] text-muted-foreground uppercase mt-0.5 block">{time.unit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          }

          /* ABOUT EVENT SECTION */
          if (sec.id === "about") {
            return (
              <section key="about" className="px-5 space-y-2">
                <span className={`text-[7.5px] font-bold uppercase tracking-wider block ${activeTheme.accentText}`}>About The Event</span>
                <Card hoverEffect={false} className={`p-4 ${activeTheme.card} space-y-2 leading-relaxed`}>
                  <p className="font-bold text-foreground text-[9px] leading-normal">{config.shortDescription || "Join this amazing development workshop with Stanford chapter."}</p>
                  <p className="text-[8px] text-muted-foreground">{config.longDescription || "This is a college registration portal where students get access to dynamic certifications, payments, and timeline lists."}</p>
                </Card>
              </section>
            );
          }

          /* WHY PARTICIPATE SECTION */
          if (sec.id === "why") {
            return (
              <section key="why" className="px-5 space-y-3">
                <span className={`text-[7.5px] font-bold uppercase tracking-wider block ${activeTheme.accentText}`}>Why Participate</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {config.whyParticipate.map((b) => (
                    <Card key={b.id} hoverEffect={false} className={`p-3.5 ${activeTheme.card} space-y-1.5 flex flex-col justify-between`}>
                      <div className="w-7 h-7 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-500 shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-[9.5px] leading-tight">{b.title}</h4>
                        <p className="text-[7.5px] text-muted-foreground leading-normal mt-0.5">{b.desc}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            );
          }

          /* PRIZES SECTION */
          if (sec.id === "prizes") {
            return (
              <section key="prizes" className="px-5 space-y-3">
                <span className={`text-[7.5px] font-bold uppercase tracking-wider block ${activeTheme.accentText}`}>Prizes & Rewards Pool</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`p-4 rounded-2xl flex flex-col justify-between ${activeTheme.card} border-yellow-500/35 relative overflow-hidden h-28`}>
                    <div className="absolute top-0 right-0 w-10 h-10 bg-yellow-500/10 rounded-bl-full" />
                    <span className="text-[18px] block">🥇</span>
                    <div>
                      <span className="text-[7px] text-muted-foreground font-bold uppercase tracking-wider block">First Prize Winner</span>
                      <span className="font-black text-foreground text-xs block mt-0.5">{config.prizes.first || "₹50,000 Payout"}</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-2xl flex flex-col justify-between ${activeTheme.card} border-slate-300/35 h-28`}>
                    <span className="text-[18px] block">🥈</span>
                    <div>
                      <span className="text-[7px] text-muted-foreground font-bold uppercase tracking-wider block">Second Prize Winner</span>
                      <span className="font-black text-foreground text-xs block mt-0.5">{config.prizes.second || "₹25,000 Payout"}</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-2xl flex flex-col justify-between ${activeTheme.card} border-amber-600/35 h-28`}>
                    <span className="text-[18px] block">🥉</span>
                    <div>
                      <span className="text-[7px] text-muted-foreground font-bold uppercase tracking-wider block">Third Prize Winner</span>
                      <span className="font-black text-foreground text-xs block mt-0.5">{config.prizes.third || "₹10,000 Payout"}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Special Category Awards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {config.prizes.bestFemale && (
                    <Card hoverEffect={false} className={`p-3 ${activeTheme.card} flex items-center justify-between`}>
                      <span className="font-bold text-foreground">👩 Best Female Team</span>
                      <span className="font-black text-purple-600 dark:text-purple-400">{config.prizes.bestFemale}</span>
                    </Card>
                  )}
                  {config.prizes.bestInnovation && (
                    <Card hoverEffect={false} className={`p-3 ${activeTheme.card} flex items-center justify-between`}>
                      <span className="font-bold text-foreground">💡 Best Innovation Award</span>
                      <span className="font-black text-purple-600 dark:text-purple-400">{config.prizes.bestInnovation}</span>
                    </Card>
                  )}
                </div>

                {config.prizes.special && (
                  <p className="text-[7.5px] text-muted-foreground text-center italic mt-1 font-medium">
                    ✨ Swags & Extras: {config.prizes.special}
                  </p>
                )}
              </section>
            );
          }

          /* EVENT TIMELINE SECTION */
          if (sec.id === "timeline") {
            return (
              <section key="timeline" className="px-5 space-y-3">
                <span className={`text-[7.5px] font-bold uppercase tracking-wider block ${activeTheme.accentText}`}>Milestone Timeline</span>
                
                <Card hoverEffect={false} className={`p-5 ${activeTheme.card}`}>
                  <div className="space-y-5">
                    {config.timeline.map((item, i) => (
                      <div key={item.id} className="flex gap-4 relative">
                        {i !== config.timeline.length - 1 && (
                          <div className="absolute left-1.5 top-5.5 bottom-[-24px] w-0.5 bg-black/5 dark:bg-white/10" />
                        )}
                        <div className="w-3.5 h-3.5 rounded-full border border-purple-500 flex items-center justify-center bg-white dark:bg-slate-950 z-10 shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center gap-2">
                            <span className="font-black text-foreground text-[9px] block leading-none">{item.title}</span>
                            <span className="text-[7px] text-purple-500 font-bold shrink-0">{item.date} • {item.time}</span>
                          </div>
                          <p className="text-[8px] text-muted-foreground leading-normal mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>
            );
          }

          /* SPONSORS SECTION */
          if (sec.id === "sponsors") {
            return (
              <section key="sponsors" className="px-5 space-y-3 text-center">
                <span className={`text-[7.5px] font-bold uppercase tracking-wider block ${activeTheme.accentText}`}>Sponsors & Partners</span>
                
                <div className="p-5 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] space-y-4">
                  {/* Title Sponsors Category */}
                  <div className="space-y-2">
                    <span className="text-[6.5px] font-extrabold text-muted-foreground uppercase tracking-widest block">Title Sponsors</span>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      {config.sponsors.filter(s => s.category === "Title Sponsor").map(spon => (
                        <div key={spon.id} className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-black/5 px-3 py-1.5 rounded-lg shadow-sm">
                          <img src={spon.logoUrl} alt={spon.name} className="w-5 h-5 object-contain" />
                          <span className="font-bold text-foreground text-[8px]">{spon.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Powered By Category */}
                  <div className="space-y-2">
                    <span className="text-[6.5px] font-extrabold text-muted-foreground uppercase tracking-widest block">Powered By</span>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {config.sponsors.filter(s => s.category === "Powered By").map(spon => (
                        <div key={spon.id} className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-black/5 px-2.5 py-1 rounded-lg">
                          <img src={spon.logoUrl} alt={spon.name} className="w-4 h-4" />
                          <span className="font-semibold text-foreground text-[7.5px]">{spon.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Other category logos row */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1 border-t border-black/5">
                    {config.sponsors.filter(s => s.category !== "Title Sponsor" && s.category !== "Powered By").map(spon => (
                      <span key={spon.id} className="text-[7.5px] font-extrabold text-muted-foreground hover:text-foreground hover:underline transition-colors uppercase tracking-wider font-mono">
                        {spon.name}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          /* FAQ ACCORDION SECTION */
          if (sec.id === "faq") {
            return (
              <section key="faq" className="px-5 space-y-3">
                <span className={`text-[7.5px] font-bold uppercase tracking-wider block ${activeTheme.accentText}`}>Frequently Asked Questions</span>
                
                <div className="space-y-2">
                  {config.faqs.map((faq) => (
                    <Card key={faq.id} hoverEffect={false} className={`p-4.5 ${activeTheme.card} space-y-1.5`}>
                      <span className="font-extrabold text-foreground text-[9px] block leading-snug">Q: {faq.question}</span>
                      <p className="text-[8px] text-muted-foreground leading-relaxed">A: {faq.answer}</p>
                    </Card>
                  ))}
                </div>
              </section>
            );
          }

          /* SPEAKERS SECTION */
          if (sec.id === "speakers") {
            return (
              <section key="speakers" className="px-5 space-y-3">
                <span className={`text-[7.5px] font-bold uppercase tracking-wider block ${activeTheme.accentText}`}>Guest Speakers & Judges</span>
                
                <div className="grid grid-cols-2 gap-3">
                  {config.speakers.map((spk, idx) => (
                    <Card key={idx} hoverEffect={false} className={`p-3 ${activeTheme.card} flex flex-col items-center text-center space-y-2`}>
                      <img src={spk.photo} alt={spk.name} className="w-12 h-12 rounded-full bg-slate-100 shrink-0 border-2 border-purple-500/20" />
                      <div>
                        <span className="font-bold text-foreground text-[9px] block truncate max-w-[110px]">{spk.name}</span>
                        <span className="text-[7.5px] text-muted-foreground block truncate max-w-[110px] mt-0.5">{spk.role}</span>
                        <span className="text-[7px] text-purple-600 dark:text-purple-400 font-bold block truncate max-w-[110px]">{spk.organization}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>

      {/* Website Footer */}
      <footer className="mt-8 border-t border-black/[0.04] dark:border-white/[0.04] py-4 text-center text-muted-foreground text-[7px] space-y-0.5 shrink-0">
        <p>© 2026 {config.logoText || eventName || "EVENT-OS"}. All Rights Reserved.</p>
        <p className="font-bold tracking-wide">Powered by EventOS Platform Suite</p>
      </footer>

    </div>
  );
}
