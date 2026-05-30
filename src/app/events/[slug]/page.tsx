"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RenderLandingPage, WebsiteConfig } from "@/components/dashboard/WebsiteBuilder";
import { Event } from "@/components/dashboard/EventContext";
import { EyeOff, Globe, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublishedEventWebsite() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("eventos_events");
    if (stored) {
      try {
        const eventsList: Event[] = JSON.parse(stored);
        const found = eventsList.find((e: Event) => 
          e.websiteConfig?.slug === slug || 
          e.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
        );
        if (found) {
          setEvent(found);
        }
      } catch (err) {
        console.error("Error reading events from localStorage", err);
      }
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Loading Website...</span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 text-center select-none text-white">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">🔍 Website Not Found</h1>
        <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">
          The event website slug <code className="text-purple-400 font-mono">/events/{slug}</code> does not exist or has not been published yet.
        </p>
        <div className="mt-8 flex gap-3">
          <Button variant="outline" className="text-white border-white/10 hover:bg-white/5 cursor-pointer text-xs" onClick={() => router.push("/dashboard/events")}>
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Generate fallback landing config if not present
  const websiteConfig: WebsiteConfig = event.websiteConfig || {
    template: (event.theme?.toLowerCase().includes("fest") ? "fest" : event.theme?.toLowerCase().includes("contest") ? "minimal" : "hackathon") as any,
    tagline: "Build Next-Gen Applications",
    shortDescription: event.description,
    longDescription: event.description,
    aboutCompetition: "Create a functional prototype.",
    rules: "1. Plagiarism is strictly prohibited.",
    eligibility: "Open to all enrolled college students.",
    importantDates: [
      { label: "Event Date", date: event.date }
    ],
    venue: "Main Campus Auditorium",
    isOnline: false,
    contactEmail: "contact@college.edu",
    contactPhone: "+91 98765 43210",
    socialLinks: { twitter: "https://twitter.com", github: "https://github.com" },
    registrationType: event.registrationType,
    entryFee: event.price,
    currency: "INR",
    discountCode: false,
    capacityType: "limited",
    capacity: event.capacity,
    isTeam: event.isTeam,
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
    logoText: event.name.toUpperCase().slice(0, 10),
    sponsorLogos: ["Google", "Stripe", "Devfolio"],
    speakers: [],
    judges: [],
    metaTitle: event.name,
    metaDescription: event.description,
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
      { id: "time-1", date: event.date, time: "09:00 AM", title: "Event Starts", desc: "Official launch and briefing." }
    ],
    sponsors: [
      { id: "spon-1", name: "Google Cloud", category: "Title Sponsor", logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=google&radius=20&backgroundColor=6366f1" }
    ],
    faqs: [
      { id: "faq-1", question: "Who is eligible to participate?", answer: "All currently enrolled university students with valid student IDs can sign up." }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <RenderLandingPage 
        config={websiteConfig} 
        eventName={event.name} 
        eventDate={event.date} 
      />
    </div>
  );
}
