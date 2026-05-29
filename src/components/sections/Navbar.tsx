"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Certificates", href: "#certificates" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.2)] dark:shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-black text-base">E</span>
            </div>
            <span className="text-foreground font-bold text-xl tracking-tight">
              Event<span className="bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">OS</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA & Theme toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-full bg-muted dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center text-foreground hover:bg-accent dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-500 fill-amber-500/10" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500 fill-indigo-500/10" />
              )}
            </button>

            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Book Demo
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="primary" size="sm">
                Start Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu & Toggle wrapper */}
          <div className="md:hidden flex items-center gap-3">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-full bg-muted dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center text-foreground cursor-pointer"
              aria-label="Toggle Theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-500 fill-amber-500/10" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500 fill-indigo-500/10" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-background/95 backdrop-blur-xl border-b border-border py-8 px-6 md:hidden flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-lg font-medium py-2 border-b border-border"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <Link href="/dashboard" className="w-full">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Demo
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full">
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Free
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
