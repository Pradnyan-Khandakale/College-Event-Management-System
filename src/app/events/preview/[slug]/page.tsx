"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RenderLandingPage, WebsiteConfig } from "@/components/dashboard/WebsiteBuilder";
import { Event } from "@/components/dashboard/EventContext";
import { AlertCircle, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

function getDefaultWebsiteConfig(event: any, slug: string): WebsiteConfig {
  return {
    template: (event?.theme?.toLowerCase().includes("fest") ? "fest" : event?.theme?.toLowerCase().includes("contest") ? "minimal" : "hackathon") as "hackathon" | "fest" | "workshop" | "startup" | "minimal",
    tagline: "Build Next-Gen Applications",
    shortDescription: event?.description || "",
    longDescription: event?.description || "",
    aboutCompetition: "Create a functional prototype.",
    rules: "1. Plagiarism is strictly prohibited.",
    eligibility: "Open to all enrolled college students.",
    importantDates: [
      { label: "Event Date", date: event?.date || "" }
    ],
    venue: event?.websiteConfig?.venue || "Main Campus Auditorium",
    isOnline: false,
    contactEmail: "contact@college.edu",
    contactPhone: "+91 98765 43210",
    socialLinks: { twitter: "https://twitter.com", github: "https://github.com" },
    registrationType: event?.registrationType || "free",
    entryFee: event?.price || 0,
    currency: "INR",
    discountCode: false,
    capacityType: "limited",
    capacity: event?.capacity || 100,
    isTeam: event?.isTeam || false,
    minTeamSize: 2,
    maxTeamSize: 5,
    sections: [
      { id: "hero", name: "Hero Main Header", enabled: true },
      { id: "about", name: "About Details", enabled: true },
      { id: "why", name: "Why Participate", enabled: true },
      { id: "prizes", name: "Prizes & Pool", enabled: true },
      { id: "timeline", name: "Important Dates", enabled: true },
      { id: "sponsors", name: "Sponsor Logos", enabled: true }
    ],
    prizes: {
      first: "₹50,000",
      second: "₹25,000",
      third: "₹10,000",
      special: "Goodies & Swag for Top 50"
    },
    primaryColor: "#a855f7",
    secondaryColor: "#4f46e5",
    accentColor: "#3b82f6",
    font: "inter",
    logoText: event?.name?.toUpperCase().slice(0, 10) || "EVENTOS",
    sponsorLogos: ["Google", "Stripe", "Devfolio"],
    speakers: [],
    judges: [],
    metaTitle: event?.name || "Event",
    metaDescription: event?.description || "",
    slug: slug,
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
    announcementText: "🚀 Registrations open! Complete registration today.",
    whyParticipate: [
      { id: "benefit-1", title: "Build Real Projects", desc: "Gain hands-on experience building working prototypes.", icon: "zap" },
      { id: "benefit-2", title: "Network with Experts", desc: "Connect with mentors, judges, and developers.", icon: "users" },
      { id: "benefit-3", title: "Win Cash Prizes", desc: "Cash awards and swags pool for top teams.", icon: "trophy" }
    ],
    timeline: [
      { id: "time-1", date: event?.date || "", time: "09:00 AM", title: "Event Starts", desc: "Official launch and briefing." }
    ],
    sponsors: [
      { id: "spon-1", name: "Google Cloud", category: "Title Sponsor", logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=google&radius=20&backgroundColor=6366f1" }
    ],
    faqs: [
      { id: "faq-1", question: "Who is eligible to participate?", answer: "All currently enrolled university students with valid student IDs can sign up." }
    ]
  };
}

export default function PreviewEventWebsite() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let foundEvent: any = null;

    // 1. Check draft
    const stored = localStorage.getItem("eventos_wizard_draft");
    if (stored) {
      try {
        const draft = JSON.parse(stored);
        if (draft) {
          const draftSlug = draft.websiteConfig?.slug || draft.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          if (draftSlug === slug) {
            foundEvent = draft;
          }
        }
      } catch (err) {
        console.error("Error reading draft from localStorage", err);
      }
    }

    // 2. Fallback: If not found in draft, check published events list
    if (!foundEvent) {
      const storedEvents = localStorage.getItem("eventos_events");
      if (storedEvents) {
        try {
          const eventsList = JSON.parse(storedEvents);
          const found = eventsList.find((e: any) => {
            const eventSlug = e.websiteConfig?.slug || e.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return eventSlug === slug;
          });
          if (found) {
            foundEvent = found;
          }
        } catch (err) {
          console.error("Error reading events from localStorage", err);
        }
      }
    }

    setEvent(foundEvent);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Loading Preview...</span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 text-center select-none text-white">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">🔍 Preview Draft Not Found</h1>
        <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">
          No active wizard draft or published event matches <code className="text-purple-400 font-mono">{`/events/preview/${slug}`}</code>. Please start the Create Event wizard.
        </p>
        <div className="mt-8">
          <Button variant="outline" className="text-white border-white/10 hover:bg-white/5 cursor-pointer text-xs" onClick={() => router.push("/dashboard/events")}>
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const defaultWebsiteConfig = getDefaultWebsiteConfig(event, slug);
  const websiteConfig: WebsiteConfig = {
    ...defaultWebsiteConfig,
    ...(event.websiteConfig || {}),
    socialLinks: {
      ...defaultWebsiteConfig.socialLinks,
      ...(event.websiteConfig?.socialLinks || {})
    },
    prizes: {
      ...defaultWebsiteConfig.prizes,
      ...(event.websiteConfig?.prizes || {})
    },
    whyParticipate: event.websiteConfig?.whyParticipate || defaultWebsiteConfig.whyParticipate,
    timeline: event.websiteConfig?.timeline || defaultWebsiteConfig.timeline,
    sponsors: event.websiteConfig?.sponsors || defaultWebsiteConfig.sponsors,
    faqs: event.websiteConfig?.faqs || defaultWebsiteConfig.faqs,
    speakers: event.websiteConfig?.speakers || defaultWebsiteConfig.speakers,
    judges: event.websiteConfig?.judges || defaultWebsiteConfig.judges,
  };

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Floating Preview Banner */}
      <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-650 text-white px-4 py-2.5 rounded-full font-black text-[9px] uppercase tracking-widest shadow-2xl flex items-center gap-2 border border-white/15 backdrop-blur-md select-none animate-bounce">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-450 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>Unsaved Live Preview</span>
      </div>

      <RenderLandingPage 
        config={websiteConfig} 
        eventName={event.name} 
        eventDate={event.date} 
      />
    </div>
  );
}
