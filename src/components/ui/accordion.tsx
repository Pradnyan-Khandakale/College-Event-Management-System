"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface AccordionItem {
  id: string;
  trigger: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={twMerge("space-y-4", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={twMerge(
              "glass-card-no-hover rounded-2xl overflow-hidden border transition-all duration-300",
              isOpen 
                ? "border-purple-500/30 dark:border-purple-500/20 bg-purple-500/5 dark:bg-slate-950/70" 
                : "border-border bg-card/40 dark:bg-slate-950/40"
            )}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-6 text-left font-medium text-foreground/90 hover:text-foreground transition-colors cursor-pointer"
            >
              <span className="text-base sm:text-lg">{item.trigger}</span>
              <ChevronDown
                className={twMerge(
                  "w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ml-4",
                  isOpen && "transform rotate-180 text-purple-600 dark:text-purple-400"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-6 pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
