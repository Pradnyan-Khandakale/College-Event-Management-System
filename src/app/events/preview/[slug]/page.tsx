"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RenderLandingPage, WebsiteConfig } from "@/components/dashboard/WebsiteBuilder";
import { Event } from "@/components/dashboard/EventContext";
import { AlertCircle, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PreviewEventWebsite() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("eventos_wizard_draft");
    if (stored) {
      try {
        const draft = JSON.parse(stored);
        if (draft) {
          setEvent(draft);
        }
      } catch (err) {
        console.error("Error reading draft from localStorage", err);
      }
    }
    
    // Fallback: If no draft is active under wizard, check the published events list as fallback
    if (!stored) {
      const storedEvents = localStorage.getItem("eventos_events");
      if (storedEvents) {
        try {
          const eventsList = JSON.parse(storedEvents);
          const found = eventsList.find((e: any) => 
            e.websiteConfig?.slug === slug || 
            e.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
          );
          if (found) {
            setEvent(found);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
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
          No active wizard draft or published event matches <code className="text-purple-400 font-mono">/preview/{slug}</code>. Please start the Create Event wizard.
        </p>
        <div className="mt-8">
          <Button variant="outline" className="text-white border-white/10 hover:bg-white/5 cursor-pointer text-xs" onClick={() => router.push("/dashboard/events")}>
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const websiteConfig: WebsiteConfig = event.websiteConfig;

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
