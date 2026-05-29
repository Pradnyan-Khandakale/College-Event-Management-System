"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  Sparkles,
  LogOut,
  User,
  Settings,
  X,
  CheckCircle2,
  Calendar,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format Page Title
  const getPageTitle = () => {
    if (!pathname) return "Overview";
    if (pathname.endsWith("/events")) return "Events Management";
    if (pathname.includes("/events/")) return "Event Details";
    if (pathname.includes("/participants")) return "Participants Directory";
    if (pathname.includes("/certificates")) return "Certificate Center";
    if (pathname.includes("/attendance")) return "Attendance Tracker";
    if (pathname.includes("/payments")) return "Payments Ledger";
    if (pathname.includes("/analytics")) return "System Analytics";
    if (pathname.includes("/email-campaigns")) return "Email Broadcasts";
    if (pathname.includes("/settings")) return "Account Settings";
    return "EventOS Workspace";
  };

  const notifications = [
    {
      id: 1,
      title: "Rahul registered for AI Hackathon 2025",
      time: "2 minutes ago",
      icon: User,
      iconColor: "text-purple-500 bg-purple-500/10",
      unread: true
    },
    {
      id: 2,
      title: "Payment of ₹54,800 settled to bank",
      time: "1 hour ago",
      icon: DollarSign,
      iconColor: "text-emerald-500 bg-emerald-500/10",
      unread: true
    },
    {
      id: 3,
      title: "Certificate automation completed for TechFest",
      time: "1 day ago",
      icon: CheckCircle2,
      iconColor: "text-cyan-500 bg-cyan-500/10",
      unread: false
    },
    {
      id: 4,
      title: "New draft campaign 'Reminders' saved",
      time: "2 days ago",
      icon: Calendar,
      iconColor: "text-amber-500 bg-amber-500/10",
      unread: false
    }
  ];

  return (
    <nav className="sticky top-0 right-0 left-0 z-20 h-16 glass-nav flex items-center px-4 md:px-8 justify-between select-none">
      {/* Mobile Menu Trigger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden w-9 h-9 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center text-foreground cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <h1 className="text-base md:text-lg font-bold tracking-tight text-foreground bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          {getPageTitle()}
        </h1>
      </div>

      {/* Global Search Bar */}
      <div className="hidden lg:flex items-center relative w-full max-w-sm mx-8">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
        <input
          type="text"
          placeholder="Search events, registrations, tickets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-9 pl-9 pr-12 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-0.5 border border-black/10 dark:border-white/15 px-1.5 py-0.5 rounded-md bg-white dark:bg-slate-950/80 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <span className="text-[10px] font-medium font-sans text-muted-foreground">⌘</span>
          <span className="text-[10px] font-medium font-sans text-muted-foreground">K</span>
        </div>
      </div>

      {/* Action Tray */}
      <div className="flex items-center gap-3.5">
        {/* Notifications Popover */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center text-foreground cursor-pointer transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-20px)] rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.01]">
                  <span className="text-xs font-bold text-foreground">Notifications</span>
                  <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                    2 Unread
                  </span>
                </div>
                <div className="max-h-[300px] overflow-y-auto divide-y divide-black/5 dark:divide-white/5">
                  {notifications.map((item) => {
                    const NotificationIcon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 flex items-start gap-3 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors ${
                          item.unread ? "bg-purple-500/[0.02]" : ""
                        }`}
                      >
                        <div className={`p-2 rounded-lg shrink-0 ${item.iconColor}`}>
                          <NotificationIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium text-foreground leading-relaxed">
                            {item.title}
                          </p>
                          <span className="text-[10px] text-muted-foreground mt-1 block">
                            {item.time}
                          </span>
                        </div>
                        {item.unread && (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 self-center" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="p-2 border-t border-black/5 dark:border-white/10 text-center bg-black/[0.01] dark:bg-white/[0.01]">
                  <button className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 hover:underline py-1 w-full cursor-pointer">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle Trigger */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-9 h-9 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center text-foreground cursor-pointer transition-colors"
          aria-label="Toggle Theme"
        >
          {mounted && theme === "dark" ? (
            <Sun className="w-4.5 h-4.5 text-amber-500 fill-amber-500/10" />
          ) : (
            <Moon className="w-4.5 h-4.5 text-indigo-500 fill-indigo-500/10" />
          )}
        </button>

        {/* User Account Action Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-1.5 p-1 pr-2 rounded-full border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
              JD
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-52 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl py-1.5 overflow-hidden z-50"
              >
                <div className="px-4 py-2 border-b border-black/5 dark:border-white/10">
                  <p className="text-xs font-bold text-foreground">John Doe</p>
                  <p className="text-[10px] text-muted-foreground truncate">john.doe@stanford.edu</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-foreground hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-foreground hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    <span>Settings</span>
                  </Link>
                </div>
                <div className="border-t border-black/5 dark:border-white/10 pt-1 mt-1">
                  <Link
                    href="/"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-rose-500 hover:bg-rose-500/5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
