"use client";

import React, { useState, useEffect } from "react";
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
  Palette,
  QrCode,
  Share2,
  Copy,
  ExternalLink,
  FileText,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Clock,
  Building,
  CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import WebsiteBuilder, { WebsiteConfig } from "./WebsiteBuilder";

type CreateEventWizardProps = 
  | { isPage: true; isOpen?: boolean; onClose?: never }
  | { isPage?: false; isOpen?: boolean; onClose: () => void };

const STEP_TITLES = [
  "Event Details",
  "Registration Settings",
  "Website Builder",
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

export default function CreateEventWizard(props: CreateEventWizardProps) {
  const router = useRouter();
  const { addEvent, events } = useEvents();
  const [currentStep, setCurrentStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  
  const isPage = props.isPage ?? false;
  const isOpen = props.isOpen ?? true;
  
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
  const [slug, setSlug] = useState("");
  
  const [isPublished, setIsPublished] = useState(false);
  const [isPersisted, setIsPersisted] = useState(false);
  const [isPersisting, setIsPersisting] = useState(false);

  // Autosave and Recovery State
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const [saveIndicatorText, setSaveIndicatorText] = useState("");
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);

  const [websiteConfig, setWebsiteConfig] = useState<WebsiteConfig>({
    template: "hackathon",
    tagline: "Build Next-Gen AI Applications",
    shortDescription: "A fast-paced collaborative development hackathon to test creativity and system designs.",
    longDescription: "Join us for 48 hours of intense hacking, mentoring, workshops, and networking. Teams will compete for top cash prizes and certified badges.",
    aboutCompetition: "Create a functional prototype addressing web3, AI, or SaaS fields.",
    rules: "1. Plagiarism is strictly prohibited.\n2. Team sizes must be within limits.\n3. Demos must be functional.",
    eligibility: "Open to all enrolled college students.",
    importantDates: [
      { label: "Registrations Close", date: "2025-06-10" },
      { label: "Hackathon Launch", date: "2025-06-15" }
    ],
    venue: "Main Campus Auditorium",
    isOnline: false,
    contactEmail: "hack@college.edu",
    contactPhone: "+91 98765 43210",
    socialLinks: { twitter: "https://twitter.com", github: "https://github.com" },
    registrationType: "free",
    entryFee: 0,
    currency: "INR",
    discountCode: false,
    capacityType: "unlimited",
    capacity: 100,
    isTeam: false,
    minTeamSize: 2,
    maxTeamSize: 5,
    sections: [
      { id: "hero", name: "Hero Main Header", enabled: true },
      { id: "about", name: "About Details", enabled: true },
      { id: "why", name: "Why Participate", enabled: true },
      { id: "prizes", name: "Prizes & Pool", enabled: true },
      { id: "timeline", name: "Important Dates", enabled: true },
      { id: "speakers", name: "Speakers Grid", enabled: true },
      { id: "sponsors", name: "Sponsor Logos", enabled: true },
      { id: "faq", name: "Frequently Asked Questions", enabled: true }
    ],
    prizes: {
      first: "₹50,000",
      second: "₹25,000",
      third: "₹10,000",
      special: "Goodies & Swag for Top 50",
      bestFemale: "₹5,000 Special",
      bestInnovation: "₹7,500 Special"
    },
    primaryColor: "#a855f7",
    secondaryColor: "#4f46e5",
    accentColor: "#3b82f6",
    font: "inter",
    logoText: "EVENTOS",
    sponsorLogos: ["Google", "Stripe", "Devfolio"],
    speakers: [],
    judges: [],
    metaTitle: "",
    metaDescription: "",
    slug: "ai-hackathon-2025",
    enableCountdown: true,
    enableQrReg: true,
    enableWhatsappShare: true,
    enableEmailCollection: true,
    enableReferral: false,
    enableAmbassador: false,
    enableWaitlist: false,
    enableAttendanceTracking: true,
    enableCertVerification: true,
    enableLeaderboard: false,
    enableAnnouncements: true,
    announcementText: "🚀 Registrations closing in 3 days! Complete payment today.",
    
    whyParticipate: [
      { id: "benefit-1", title: "Build Real Projects", desc: "Gain hands-on experience building working prototypes.", icon: "zap" },
      { id: "benefit-2", title: "Network with Experts", desc: "Connect with mentors, judges, and developers.", icon: "users" },
      { id: "benefit-3", title: "Win Cash Prizes", desc: "Cash awards and swags pool for top teams.", icon: "trophy" },
      { id: "benefit-4", title: "Get Verified Certificates", desc: "Automated credentials with college stamps.", icon: "award" }
    ],
    timeline: [
      { id: "time-1", date: "2025-06-01", time: "09:00 AM", title: "Registration Opens", desc: "Early bird registrations open for verified college teams." },
      { id: "time-2", date: "2025-06-10", time: "11:59 PM", title: "Submission Deadline", desc: "Register team details and project abstract idea decks." },
      { id: "time-3", date: "2025-06-12", time: "05:00 PM", title: "Shortlisting Announcement", desc: "Review committee lists select top 50 teams." },
      { id: "time-4", date: "2025-06-15", time: "09:00 AM", title: "Final Round Hackathon", desc: "48-hour development sprints start." }
    ],
    sponsors: [
      { id: "spon-1", name: "Google Cloud", category: "Title Sponsor", logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=google&radius=20&backgroundColor=6366f1" },
      { id: "spon-2", name: "Stripe Developer", category: "Powered By", logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=stripe&radius=20&backgroundColor=6366f1" },
      { id: "spon-3", name: "Devfolio Network", category: "Community Partner", logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=devfolio&radius=20&backgroundColor=6366f1" }
    ],
    faqs: [
      { id: "faq-1", question: "Who is eligible to participate?", answer: "All currently enrolled university students with valid student IDs can sign up." },
      { id: "faq-2", question: "Is there a registration fee?", answer: "No, early bird registrations are free for verified students." },
      { id: "faq-3", question: "What is the team size limit?", answer: "Teams can be between 2 to 5 members. Solo entries are not allowed." }
    ]
  });

  // Client Mount Check
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("eventos_wizard_draft");
    if (stored) {
      setShowRestorePrompt(true);
    }
  }, []);

  // Simulate Server Persistence delay
  useEffect(() => {
    if (isPublished && !isPersisted && !isPersisting) {
      setIsPersisting(true);
      const timer = setTimeout(() => {
        setIsPersisted(true);
        setIsPersisting(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPublished, isPersisted, isPersisting]);

  // Autosave triggers
  useEffect(() => {
    if (!mounted || !name) return;

    const timer = setTimeout(() => {
      setSaveStatus("saving");
      const draftData = {
        name,
        description,
        date,
        bannerGradient,
        registrationType,
        price,
        capacity,
        isTeam,
        theme,
        certTemplate,
        slug,
        websiteConfig: { ...websiteConfig, slug }
      };
      localStorage.setItem("eventos_wizard_draft", JSON.stringify(draftData));
      setLastSaved(Date.now());
      setSaveStatus("saved");
    }, 1000);

    return () => clearTimeout(timer);
  }, [name, description, date, bannerGradient, registrationType, price, capacity, isTeam, theme, certTemplate, slug, websiteConfig, mounted]);

  // Dynamic Save Indicator Text
  useEffect(() => {
    if (saveStatus === "saving") {
      setSaveIndicatorText("● Saving...");
    } else if (saveStatus === "saved" && lastSaved) {
      setSaveIndicatorText(`✓ Saved just now`);
      
      const interval = setInterval(() => {
        const diffSeconds = Math.round((Date.now() - lastSaved) / 1000);
        if (diffSeconds < 60) {
          setSaveIndicatorText(`✓ Saved ${diffSeconds}s ago`);
        } else {
          setSaveIndicatorText(`✓ Saved ${Math.round(diffSeconds / 60)}m ago`);
        }
      }, 5000);

      return () => clearInterval(interval);
    } else {
      setSaveIndicatorText("");
    }
  }, [saveStatus, lastSaved]);

  const restoreDraft = () => {
    const stored = localStorage.getItem("eventos_wizard_draft");
    if (stored) {
      try {
        const draft = JSON.parse(stored);
        setName(draft.name || "");
        setDescription(draft.description || "");
        setDate(draft.date || "");
        setBannerGradient(draft.bannerGradient || GRADIENT_OPTIONS[0].value);
        setRegistrationType(draft.registrationType || "free");
        setPrice(draft.price || 0);
        setCapacity(draft.capacity || 100);
        setIsTeam(draft.isTeam || false);
        setTheme(draft.theme || THEME_OPTIONS[0]);
        setCertTemplate(draft.certTemplate || CERT_TEMPLATES[0]);
        setSlug(draft.slug || "");
        if (draft.websiteConfig) {
          setWebsiteConfig(draft.websiteConfig);
        }
      } catch (e) {
        console.error(e);
      }
    }
    setShowRestorePrompt(false);
  };

  if (!isOpen) return null;

  // Auto slug generation on name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setWebsiteConfig((prev) => ({
        ...prev,
        metaTitle: `${name || "Untitled Event"} | EventOS`,
        metaDescription: description || "Join us for an exciting college event!",
        shortDescription: description || prev.shortDescription,
        logoText: name ? name.toUpperCase().slice(0, 10) : prev.logoText,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || prev.slug
      }));
    } else if (currentStep === 2) {
      setWebsiteConfig((prev) => ({
        ...prev,
        registrationType,
        entryFee: price,
        capacity,
        isTeam
      }));
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final Publish Action
      addEvent({
        name: name || "Untitled College Event",
        description: description || "Join us for an exciting new event!",
        date: date || new Date().toISOString().split("T")[0],
        bannerGradient,
        registrationType,
        price: registrationType === "free" ? 0 : price,
        capacity,
        isTeam,
        theme: websiteConfig.template,
        certTemplate,
        status: "published",
        websiteConfig: { ...websiteConfig, slug }
      });
      
      // Clear wizard autosave draft
      localStorage.removeItem("eventos_wizard_draft");
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
    setSlug("");
    setIsPublished(false);
    setIsPersisted(false);
    setIsPersisting(false);
    
    if (props.isPage) {
      router.push("/dashboard/events");
    } else {
      props.onClose();
    }
  };

  // Pre-launch checklist validation criteria
  const checkNameValid = name.trim().length > 0;
  const checkDateValid = date.trim().length > 0;
  const checkRegValid = registrationType === "free" || (registrationType === "paid" && price > 0);
  const checkSlugValid = slug.trim().length > 0 && !events.some(e => e.websiteConfig?.slug === slug);
  const checkWebsiteValid = websiteConfig.sections.some(s => s.enabled);
  const isReadyToPublish = checkNameValid && checkDateValid && checkRegValid && checkSlugValid && checkWebsiteValid;

  const contentArea = (
    <>
      {showRestorePrompt && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-between text-xs mb-4">
          <div className="flex items-center gap-2 text-foreground">
            <Sparkles className="w-4 h-4 text-purple-500 shrink-0 animate-pulse" />
            <span>We found an unsaved draft from your last session. Would you like to restore it?</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={restoreDraft}
              className="px-3 py-1.5 bg-purple-650 hover:bg-purple-600 text-white font-bold rounded-lg cursor-pointer transition-colors"
            >
              Restore Draft
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("eventos_wizard_draft");
                setShowRestorePrompt(false);
              }}
              className="px-3 py-1.5 border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg text-muted-foreground font-bold cursor-pointer transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isPublished ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-6 space-y-8 max-w-4xl mx-auto"
          >
            {/* Header Success Section */}
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight text-foreground">🎉 Event Published Successfully!</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Your website and registration portal are live. Ready to accept attendees and capture payouts.
                </p>
              </div>
            </div>

            {/* Event URL and Quick Controls */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
              {/* Left URL box */}
              <div className="md:col-span-3 space-y-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                      {isPersisted ? "Live Website Link" : "Local Draft Link"}
                    </span>
                    {isPersisted ? (
                      <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Active</span>
                    ) : isPersisting ? (
                      <span className="text-[9px] font-bold text-purple-650 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Persisting...
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">Local Preview</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 rounded-xl border border-black/5 dark:border-white/10 min-w-0">
                    <Globe className="w-4 h-4 text-purple-500 shrink-0" />
                    <span className="text-xs font-mono text-foreground select-all truncate flex-1">
                      {isPersisted && mounted ? `${window.location.origin}/events/${slug}` : `eventos.club/events/${slug} (Unsaved)`}
                    </span>
                    <button 
                      disabled={!isPersisted}
                      onClick={() => {
                        const url = `${window.location.origin}/events/${slug}`;
                        navigator.clipboard.writeText(url);
                        alert("URL copied to clipboard!");
                      }}
                      className={`text-[10px] font-black shrink-0 ${
                        isPersisted ? "text-purple-600 dark:text-purple-400 hover:underline cursor-pointer" : "text-muted-foreground opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Copy Link
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className={`flex-1 text-xs gap-1.5 h-10 ${!isPersisted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      disabled={!isPersisted}
                      onClick={() => {
                        if (!isPersisted) return;
                        const url = `/events/${slug}`;
                        window.open(url, "_blank");
                      }}
                    >
                      <ExternalLink className="w-4 h-4" /> Open Website
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`flex-1 text-xs gap-1.5 h-10 ${!isPersisted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      disabled={!isPersisted}
                      onClick={() => {
                        if (!isPersisted) return;
                        const url = `/events/preview/${slug}`;
                        window.open(url, "_blank");
                      }}
                    >
                      <Share2 className="w-4 h-4 text-purple-500" /> Preview Mode
                    </Button>
                  </div>
                </div>

                {/* Sharing actions */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 space-y-3 shadow-sm">
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block">Broadcast & Share Campaign</span>
                  <div className="grid grid-cols-3 gap-2">
                    <a
                      href={isPersisted ? `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out our college event ${name}! Register here: ${mounted ? window.location.origin : 'https://eventos.club'}/events/${slug}`)}` : "#"}
                      onClick={(e) => { if (!isPersisted) e.preventDefault(); }}
                      target={isPersisted ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`h-10 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-1.5 text-xs font-bold text-foreground transition-all ${
                        !isPersisted ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                      }`}
                    >
                      WhatsApp
                    </a>
                    <a
                      href={isPersisted ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${mounted ? window.location.origin : 'https://eventos.club'}/events/${slug}`)}` : "#"}
                      onClick={(e) => { if (!isPersisted) e.preventDefault(); }}
                      target={isPersisted ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`h-10 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-1.5 text-xs font-bold text-foreground transition-all ${
                        !isPersisted ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                      }`}
                    >
                      LinkedIn
                    </a>
                    <a
                      href={isPersisted ? `https://x.com/intent/tweet?url=${encodeURIComponent(`${mounted ? window.location.origin : 'https://eventos.club'}/events/${slug}`)}&text=${encodeURIComponent(`Register for ${name} now!`)}` : "#"}
                      onClick={(e) => { if (!isPersisted) e.preventDefault(); }}
                      target={isPersisted ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`h-10 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-1.5 text-xs font-bold text-foreground transition-all ${
                        !isPersisted ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                      }`}
                    >
                      Twitter / X
                    </a>
                  </div>
                </div>
              </div>

              {/* Right actions and QR */}
              <div className="md:col-span-2 space-y-4">
                {/* QR Mockup */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 flex flex-col items-center text-center space-y-3 shadow-sm">
                  <div className="w-28 h-28 bg-slate-100 dark:bg-slate-950 rounded-xl border border-black/5 dark:border-white/15 flex items-center justify-center shadow-inner relative overflow-hidden p-2">
                    <QrCode className="w-24 h-24 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-foreground block">Event QR Code</span>
                    <span className="text-[9px] text-muted-foreground leading-none">Print on campus poster invites</span>
                  </div>
                </div>

                {/* Dashboard Next Actions */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 space-y-2.5 shadow-sm text-left">
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-1">Quick Workspace Links</span>
                  {[
                    { label: "Manage Participants", path: "/dashboard/participants" },
                    { label: "Configure Certificates", path: "/dashboard/certificates" },
                    { label: "Run Email Broadcasts", path: "/dashboard/email-campaigns" },
                    { label: "View Registrations Analytics", path: "/dashboard/analytics" }
                  ].map((act, i) => (
                    <button
                      key={i}
                      onClick={() => router.push(act.path)}
                      className="w-full h-8 px-3 rounded-lg border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[11px] font-bold text-foreground flex items-center justify-between cursor-pointer transition-colors"
                    >
                      {act.label} <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/5 dark:border-white/10 flex justify-center">
              <Button variant="primary" size="lg" className="w-48 cursor-pointer shadow-lg" onClick={resetAndClose}>
                Back to Dashboard
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Step 1: Event Details */}
            {currentStep === 1 && (
              <div className="space-y-5 max-w-2xl mx-auto">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground">Event Name</label>
                  <input
                    type="text"
                    placeholder="e.g. AI Hackathon 2025"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full h-11 px-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white dark:focus:bg-slate-950 transition-all font-medium"
                    required
                  />
                </div>

                {/* Slug editor inline */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground">Custom URL Slug</label>
                  <div className="flex items-center">
                    <span className="h-11 px-3.5 rounded-l-xl border-y border-l border-black/5 dark:border-white/10 bg-slate-100 dark:bg-slate-800 text-muted-foreground flex items-center justify-center text-xs font-mono select-none">
                      eventos.club/events/
                    </span>
                    <input
                      type="text"
                      placeholder="ai-hackathon-2025"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                      className="flex-1 h-11 px-4 rounded-r-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white dark:focus:bg-slate-950 transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground">This is the public SEO URL of your published event site.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-foreground">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white dark:focus:bg-slate-950 transition-all font-medium"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-foreground">Venue / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Main Auditorium / Online"
                      value={websiteConfig.venue}
                      onChange={(e) => setWebsiteConfig({ ...websiteConfig, venue: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white dark:focus:bg-slate-950 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground">Description</label>
                  <textarea
                    placeholder="Provide details about registration rules, timing, venue, prizes..."
                    rows={4}
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
                        <div
                          style={{ background: opt.value }}
                          className="absolute inset-0 opacity-85 group-hover:scale-105 transition-transform duration-300"
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
              <div className="space-y-5 max-w-2xl mx-auto">
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
                          className="w-full h-11 pl-8 pr-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white dark:focus:bg-slate-950 transition-all font-medium"
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
                      className="w-full h-11 px-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white dark:focus:bg-slate-950 transition-all font-medium"
                    />
                  </div>

                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-2.5 p-3.5 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors h-11">
                      <input
                        type="checkbox"
                        checked={isTeam}
                        onChange={(e) => setIsTeam(e.target.checked)}
                        className="rounded text-purple-600 focus:ring-purple-500 h-4.5 w-4.5 accent-purple-600 cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-foreground">Team Registration</span>
                      </div>
                    </label>
                  </div>
                </div>

                <AnimatePresence>
                  {isTeam && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-2 gap-4 border-t border-black/5 pt-4"
                    >
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-foreground">Min Team Size</label>
                        <input
                          type="number"
                          value={websiteConfig.minTeamSize}
                          onChange={(e) => setWebsiteConfig({ ...websiteConfig, minTeamSize: Number(e.target.value) })}
                          className="w-full h-11 px-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] text-sm text-foreground focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-foreground">Max Team Size</label>
                        <input
                          type="number"
                          value={websiteConfig.maxTeamSize}
                          onChange={(e) => setWebsiteConfig({ ...websiteConfig, maxTeamSize: Number(e.target.value) })}
                          className="w-full h-11 px-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.01] text-sm text-foreground focus:outline-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Step 3: Website Builder */}
            {currentStep === 3 && (
              <WebsiteBuilder
                config={websiteConfig}
                onChange={setWebsiteConfig}
                eventName={name}
                eventDate={date}
              />
            )}

            {/* Step 4: Review & Publish Dashboard */}
            {currentStep === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start max-w-6xl mx-auto">
                
                {/* Left Side: Launch Checks, Previews, checklist */}
                <div className="lg:col-span-2 space-y-4">
                  
                  {/* Validation Checklist */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 space-y-3.5 shadow-sm">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block">Pre-launch Checklist</span>
                    
                    <div className="space-y-2 text-xs font-semibold text-foreground">
                      {[
                        { label: "Event Name configured", valid: checkNameValid },
                        { label: "Event Date set", valid: checkDateValid },
                        { label: "Valid ticket price/type", valid: checkRegValid },
                        { label: "Slug available and unique", valid: checkSlugValid, warn: "Slug is already in use by another event!" },
                        { label: "Landing website sections enabled", valid: checkWebsiteValid }
                      ].map((item, i) => (
                        <div key={i} className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            {item.valid ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                            )}
                            <span className={item.valid ? "text-foreground" : "text-muted-foreground"}>
                              {item.label}
                            </span>
                          </div>
                          {!item.valid && item.warn && (
                            <p className="pl-6 text-[9px] text-amber-600 dark:text-amber-400 font-bold">{item.warn}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className={`p-3 rounded-xl border text-[11px] leading-relaxed font-bold flex items-center gap-2 ${
                      isReadyToPublish 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
                    }`}>
                      {isReadyToPublish ? (
                        <>
                          <Check className="w-4 h-4" /> Ready to publish live website!
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4" /> Resolve outstanding checklist items above to enable publishing.
                        </>
                      )}
                    </div>
                  </div>

                  {/* Previews and URL controls */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 space-y-3 shadow-sm">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block">URL & Social Settings</span>
                    
                    <div className="space-y-1 text-xs">
                      <span className="text-[10px] text-muted-foreground font-bold block">Production Slug URL</span>
                      <code className="block bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg text-[10px] font-mono text-purple-600 dark:text-purple-400 border border-black/5 dark:border-white/10 truncate select-all">
                        eventos.club/events/{slug || "url"}
                      </code>
                    </div>

                    <div className="flex gap-2 pt-1 text-xs font-bold text-foreground">
                      <button
                        onClick={() => window.open(`/events/preview/${slug}`, "_blank")}
                        className="flex-1 h-9 rounded-lg border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Fullscreen Preview
                      </button>
                    </div>

                    <div className="space-y-1 pt-1.5 border-t border-black/5">
                      <span className="text-[10px] font-black text-foreground block">Publish Settings</span>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground font-bold">
                        <label className="flex items-center gap-1.5">
                          <input type="checkbox" defaultChecked className="accent-purple-600 rounded" />
                          <span>Index Website</span>
                        </label>
                        <label className="flex items-center gap-1.5">
                          <input type="checkbox" defaultChecked className="accent-purple-600 rounded" />
                          <span>SEO Metadata</span>
                        </label>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Side: Detailed Launch Parameters Summary Dashboard */}
                <div className="lg:col-span-3 space-y-4">
                  
                  {/* Event Overview Section */}
                  <Card hoverEffect={false} className="p-5 bg-white dark:bg-slate-900 border-black/5 dark:border-white/10 space-y-4 shadow-sm text-left">
                    <div className="flex items-center gap-4 border-b border-black/5 pb-3">
                      <div
                        style={{ background: bannerGradient }}
                        className="w-16 h-12 rounded-lg shrink-0 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-black/10" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-black text-foreground truncate">{name || "Untitled Event"}</h4>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <CalendarIcon className="w-3.5 h-3.5 text-purple-500" /> {date || "No date selected"}
                        </p>
                      </div>
                    </div>

                    {/* Meta grids */}
                    <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-xs">
                      <div>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Registration Pricing</span>
                        <span className="font-extrabold text-foreground capitalize mt-0.5 block">
                          {registrationType === "free" ? "Free Registration" : `Paid (₹${price})`}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Seats & Capacity</span>
                        <span className="font-extrabold text-foreground mt-0.5 block">{capacity} Seats Limit</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Registration Type</span>
                        <span className="font-extrabold text-foreground mt-0.5 block">
                          {isTeam ? `Teams (${websiteConfig.minTeamSize}-${websiteConfig.maxTeamSize} Pax)` : "Solo Entry"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Theme Template</span>
                        <span className="font-extrabold text-foreground mt-0.5 block capitalize">{websiteConfig.template} style</span>
                      </div>
                      <div className="col-span-2 border-t border-black/5 pt-3">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Prizes Details</span>
                        <div className="grid grid-cols-3 gap-2 mt-1 text-[10px] font-bold text-foreground">
                          <span className="bg-slate-50 dark:bg-slate-800 p-1.5 rounded border border-black/5 text-center truncate">🥇 {websiteConfig.prizes.first || "—"}</span>
                          <span className="bg-slate-50 dark:bg-slate-800 p-1.5 rounded border border-black/5 text-center truncate">🥈 {websiteConfig.prizes.second || "—"}</span>
                          <span className="bg-slate-50 dark:bg-slate-800 p-1.5 rounded border border-black/5 text-center truncate">🥉 {websiteConfig.prizes.third || "—"}</span>
                        </div>
                      </div>
                      <div className="col-span-2 border-t border-black/5 pt-3">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Timeline Checklist</span>
                        <div className="mt-1 space-y-1.5">
                          {websiteConfig.timeline.map((timelineItem, idx) => (
                            <div key={timelineItem.id} className="flex justify-between items-center text-[10px] font-medium text-foreground">
                              <span>• {timelineItem.title}</span>
                              <span className="text-muted-foreground font-mono font-bold text-[9px]">{timelineItem.date} {timelineItem.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-2 border-t border-black/5 pt-3 flex justify-between text-[10px] text-muted-foreground font-bold">
                        <span>FAQs: {websiteConfig.faqs.length} configured</span>
                        <span>Sponsors: {websiteConfig.sponsors.length} categories</span>
                      </div>
                    </div>
                  </Card>

                </div>

              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  const stepsIndicators = !isPublished && (
    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-black/5 dark:border-white/10 select-none">
      <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground mb-2">
        <span className="flex items-center gap-1.5">
          Step {currentStep} of 4: <strong className="text-foreground">{STEP_TITLES[currentStep - 1]}</strong>
        </span>
        <div className="flex items-center gap-3">
          {saveIndicatorText && (
            <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold mr-1">
              {saveIndicatorText}
            </span>
          )}
          <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
        </div>
      </div>
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStep / 4) * 100}%` }}
          className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500"
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );

  const wizardFooter = !isPublished && (
    <div className="p-6 border-t border-black/5 dark:border-white/10 flex justify-between bg-black/[0.01] dark:bg-white/[0.01] select-none">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={currentStep === 1}
        className="flex items-center gap-1 px-4.5 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </Button>

      <Button
        variant="primary"
        onClick={handleNext}
        className="flex items-center gap-1 px-4.5 cursor-pointer"
        disabled={(currentStep === 1 && !name) || (currentStep === 4 && !isReadyToPublish)}
      >
        {currentStep === 4 ? "Publish Event" : "Continue"}
        {currentStep !== 4 && <ChevronRight className="w-4 h-4" />}
      </Button>
    </div>
  );

  if (isPage) {
    return (
      <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 shadow-xl rounded-3xl overflow-hidden min-h-[85vh]">
          {/* Header */}
          <div className="p-6 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.01] select-none">
            <div>
              <h3 className="text-base font-black text-foreground flex items-center gap-1.5">
                <Sparkles className="w-4.5 h-4.5 text-purple-500" /> Event Creator Suite
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Configure event registration, build landing page, and publish instantly.
              </p>
            </div>
            <button
              onClick={resetAndClose}
              className="w-8 h-8 rounded-full border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Indicators */}
          {stepsIndicators}

          {/* Body */}
          <div className="flex-1 p-6 overflow-y-auto">
            {contentArea}
          </div>

          {/* Footer */}
          {wizardFooter}
        </div>
      </div>
    );
  }

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
        className={`relative w-full bg-white dark:bg-slate-900 rounded-3xl border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] transition-all duration-300 ${
          currentStep === 3 ? "max-w-6xl h-[88vh]" : "max-w-2xl"
        }`}
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

        {/* Indicators */}
        {stepsIndicators}

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {contentArea}
        </div>

        {/* Footer */}
        {wizardFooter}
      </motion.div>
    </div>
  );
}
