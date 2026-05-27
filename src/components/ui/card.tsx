"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "purple" | "blue" | "cyan" | "none";
  hoverEffect?: boolean;
}

export function Card({
  children,
  className,
  glowColor = "none",
  hoverEffect = true,
  ...props
}: CardProps) {
  const glowClasses = {
    none: "",
    purple: "hover:shadow-[0_20px_40px_rgba(15,23,42,0.06),0_0_25px_rgba(168,85,247,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(168,85,247,0.15)] hover:border-purple-500/20 dark:hover:border-purple-500/30",
    blue: "hover:shadow-[0_20px_40px_rgba(15,23,42,0.06),0_0_25px_rgba(59,130,246,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(59,130,246,0.15)] hover:border-blue-500/20 dark:hover:border-blue-500/30",
    cyan: "hover:shadow-[0_20px_40px_rgba(15,23,42,0.06),0_0_25px_rgba(6,182,212,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(6,182,212,0.15)] hover:border-cyan-500/20 dark:hover:border-cyan-500/30",
  };

  return (
    <div
      className={twMerge(
        hoverEffect ? "glass-card" : "glass-card-no-hover",
        glowColor !== "none" && glowClasses[glowColor],
        "rounded-2xl p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
