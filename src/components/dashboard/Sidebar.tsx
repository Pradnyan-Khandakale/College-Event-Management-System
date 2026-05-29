"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Award,
  CheckSquare,
  CreditCard,
  BarChart3,
  Mail,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onNavigate?: () => void; // Used to close mobile drawer when clicked
}

export default function Sidebar({ isCollapsed, setIsCollapsed, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Events", href: "/dashboard/events", icon: Calendar },
    { name: "Participants", href: "/dashboard/participants", icon: Users, badge: "8.4k" },
    { name: "Certificates", href: "/dashboard/certificates", icon: Award, badge: "New" },
    { name: "Attendance", href: "/dashboard/attendance", icon: CheckSquare },
    { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Email Campaigns", href: "/dashboard/email-campaigns", icon: Mail },
    { name: "Settings", href: "/dashboard/settings", icon: Settings }
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 264 }}
      transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
      className="hidden md:flex flex-col h-screen fixed left-0 top-0 border-r border-black/5 dark:border-white/10 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl z-30 select-none overflow-hidden"
    >
      {/* Sidebar Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-black/5 dark:border-white/10">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight pl-2"
          onClick={onNavigate}
        >
          <div className="w-8 h-8 shrink-0 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <span className="text-white font-black text-sm">E</span>
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-foreground flex items-center gap-1.5"
            >
              Event<span className="bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">OS</span>
            </motion.span>
          )}
        </Link>

        {/* Collapse Button */}
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="w-7 h-7 rounded-lg border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="mx-auto w-7 h-7 rounded-lg border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-6 px-3 overflow-y-auto space-y-1.5 scrollbar-thin">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={twMerge(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative cursor-pointer",
                isActive
                  ? "text-purple-600 dark:text-purple-400 bg-purple-500/5 border border-purple-500/10 dark:border-purple-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-black/[0.02] dark:hover:bg-white/[0.02] border border-transparent"
              )}
            >
              {/* Icon Container with subtle active indicator */}
              <div className="relative flex items-center justify-center">
                <Icon className={twMerge("w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-105", isActive ? "text-purple-500" : "text-muted-foreground group-hover:text-foreground")} />
                {isActive && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-4 rounded-r-md bg-purple-600 dark:bg-purple-400" />
                )}
              </div>

              {/* Text label */}
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 truncate"
                >
                  {item.name}
                </motion.span>
              )}

              {/* Tooltip on collapsed state */}
              {isCollapsed && (
                <div className="absolute left-16 px-2.5 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none shadow-xl z-50">
                  {item.name}
                </div>
              )}

              {/* Optional Badge */}
              {!isCollapsed && item.badge && (
                <span className={twMerge(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide",
                  item.badge === "New" 
                    ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20" 
                    : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Profile Section */}
      <div className="p-4 border-t border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] flex flex-col gap-2">
        <div className={twMerge("flex items-center gap-3", isCollapsed ? "justify-center" : "")}>
          {/* Profile Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm border-2 border-white dark:border-slate-900 shadow-[0_0_15px_rgba(99,102,241,0.2)] shrink-0">
            JD
          </div>

          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 min-w-0"
            >
              <h4 className="text-xs font-semibold text-foreground truncate flex items-center gap-1">
                John Doe <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              </h4>
              <p className="text-[10px] text-muted-foreground truncate">Stanford University</p>
            </motion.div>
          )}
        </div>

        {!isCollapsed ? (
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 mt-1 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/10 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </Link>
        ) : (
          <Link
            href="/"
            className="flex items-center justify-center w-9 h-9 mx-auto rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer group relative"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <div className="absolute left-16 px-2.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none shadow-xl z-50">
              Logout
            </div>
          </Link>
        )}
      </div>
    </motion.aside>
  );
}
