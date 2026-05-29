"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Event {
  id: string;
  name: string;
  description: string;
  status: "draft" | "published" | "completed";
  date: string;
  registrations: number;
  revenue: number;
  bannerGradient: string;
  capacity: number;
  registrationType: "free" | "paid";
  price: number;
  theme: string;
  certTemplate: string;
  isTeam: boolean;
  eventUrl?: string;
}

interface EventContextType {
  events: Event[];
  addEvent: (eventData: Omit<Event, "id" | "registrations" | "revenue">) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  duplicateEvent: (id: string) => void;
  publishEvent: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const PRE_SEEDED_EVENTS: Event[] = [
  {
    id: "evt-1",
    name: "AI Hackathon 2025",
    description: "Design and build next-generation AI agents, LLM applications, and automation systems to solve real-world problems.",
    status: "published",
    date: "2025-06-15",
    registrations: 548,
    revenue: 54800,
    bannerGradient: "linear-gradient(135deg, #a855f7 0%, #4f46e5 50%, #3b82f6 100%)",
    capacity: 600,
    registrationType: "paid",
    price: 100,
    theme: "Neon Dusk",
    certTemplate: "Professional Gold Accent",
    isTeam: true,
    eventUrl: "https://eventos.club/e/ai-hackathon-2025"
  },
  {
    id: "evt-2",
    name: "TechFest 2025",
    description: "The annual science and engineering festival featuring robotics, design showcases, web dev battlegrounds, and paper presentations.",
    status: "draft",
    date: "2025-10-20",
    registrations: 0,
    revenue: 0,
    bannerGradient: "linear-gradient(135deg, #10b981 0%, #0d9488 50%, #06b6d4 100%)",
    capacity: 1500,
    registrationType: "free",
    price: 0,
    theme: "Emerald Rise",
    certTemplate: "Modern Technical Blue",
    isTeam: true,
    eventUrl: "https://eventos.club/e/techfest-2025"
  },
  {
    id: "evt-3",
    name: "Coding Contest",
    description: "A fast-paced algorithmic programming contest for solo developers to test their speed, syntax logic, and optimization skills.",
    status: "completed",
    date: "2025-05-10",
    registrations: 320,
    revenue: 0,
    bannerGradient: "linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #8b5cf6 100%)",
    capacity: 500,
    registrationType: "free",
    price: 0,
    theme: "Cyberpunk Glow",
    certTemplate: "Minimal Classic Monochrome",
    isTeam: false,
    eventUrl: "https://eventos.club/e/coding-contest-2025"
  }
];

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);

  // Load from localStorage if present
  useEffect(() => {
    const stored = localStorage.getItem("eventos_events");
    if (stored) {
      try {
        setEvents(JSON.parse(stored));
      } catch (e) {
        setEvents(PRE_SEEDED_EVENTS);
      }
    } else {
      setEvents(PRE_SEEDED_EVENTS);
      localStorage.setItem("eventos_events", JSON.stringify(PRE_SEEDED_EVENTS));
    }
  }, []);

  const saveEvents = (newEvents: Event[]) => {
    setEvents(newEvents);
    localStorage.setItem("eventos_events", JSON.stringify(newEvents));
  };

  const addEvent = (eventData: Omit<Event, "id" | "registrations" | "revenue">) => {
    const newId = `evt-${Date.now()}`;
    const newEvent: Event = {
      ...eventData,
      id: newId,
      registrations: 0,
      revenue: 0,
      eventUrl: `https://eventos.club/e/${eventData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    };
    saveEvents([newEvent, ...events]);
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    const updated = events.map((evt) => (evt.id === id ? { ...evt, ...updates } : evt));
    saveEvents(updated);
  };

  const deleteEvent = (id: string) => {
    const filtered = events.filter((evt) => evt.id !== id);
    saveEvents(filtered);
  };

  const duplicateEvent = (id: string) => {
    const target = events.find((evt) => evt.id === id);
    if (!target) return;

    const copy: Event = {
      ...target,
      id: `evt-${Date.now()}`,
      name: `${target.name} (Copy)`,
      status: "draft",
      registrations: 0,
      revenue: 0,
      eventUrl: `https://eventos.club/e/${target.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-copy`
    };
    saveEvents([copy, ...events]);
  };

  const publishEvent = (id: string) => {
    const updated = events.map((evt) =>
      evt.id === id ? { ...evt, status: "published" as const } : evt
    );
    saveEvents(updated);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        duplicateEvent,
        publishEvent
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
}
