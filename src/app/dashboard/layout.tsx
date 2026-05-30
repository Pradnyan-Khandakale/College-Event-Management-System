"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { EventProvider } from "@/components/dashboard/EventContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const isCreateRoute = pathname === "/dashboard/events/create";

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (isCreateRoute) {
    return (
      <EventProvider>
        <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 flex selection:bg-purple-500/10 dark:selection:bg-purple-500/30 selection:text-foreground">
          {/* Noise and background ambient glow elements */}
          <div className="noise-overlay" />
          <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] ambient-glow" />
          <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] ambient-glow" />

          <main className="flex-1 min-w-0 min-h-screen relative z-10 flex flex-col">
            {children}
          </main>
        </div>
      </EventProvider>
    );
  }

  return (
    <EventProvider>
      <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 flex selection:bg-purple-500/10 dark:selection:bg-purple-500/30 selection:text-foreground">
        {/* Noise and background ambient glow elements */}
        <div className="noise-overlay" />
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] ambient-glow" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] ambient-glow" />

        {/* Desktop Sidebar */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Mobile Drawer (Sidebar inside drawer) */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-950 border-r border-black/5 dark:border-white/10 z-50 md:hidden flex flex-col h-full shadow-2xl"
              >
                {/* Header of Drawer */}
                <div className="h-16 px-6 flex items-center justify-between border-b border-black/5 dark:border-white/10">
                  <Link href="/dashboard" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-black text-sm">E</span>
                    </div>
                    <span className="text-foreground">
                      Event<span className="bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">OS</span>
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="w-7 h-7 rounded-lg border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Sidebar component inside drawer (forced to not collapsed) */}
                <div className="flex-1 flex flex-col overflow-y-auto">
                  {/* Custom navigation wrapper for inside drawer */}
                  <Sidebar
                    isCollapsed={false}
                    setIsCollapsed={() => {}}
                    onNavigate={() => setIsMobileOpen(false)}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Content Wrapper */}
        <div
          className={`flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300 ${
            isCollapsed ? "md:pl-[76px]" : "md:pl-[264px]"
          }`}
        >
          {/* Top Navbar */}
          <Navbar onMenuToggle={() => setIsMobileOpen(true)} />

          {/* Main Dashboard Space */}
          <main className="flex-1 p-6 md:p-8 relative z-10">
            {children}
          </main>
        </div>
      </div>
    </EventProvider>
  );
}
