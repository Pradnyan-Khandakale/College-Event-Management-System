"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer select-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-[0_4px_20px_rgba(124,58,237,0.2)] dark:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 border border-purple-500/20 dark:border-purple-500/30",
    secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-850 dark:hover:bg-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)]",
    outline: "border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50/80 dark:hover:bg-slate-900/60 backdrop-blur-sm",
    ghost: "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
