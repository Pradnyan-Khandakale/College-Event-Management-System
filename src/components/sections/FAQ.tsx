"use client";

import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const faqItems = [
  {
    id: "faq-1",
    trigger: "How are certificates generated?",
    content: "Certificates are dynamically compiled using our serverless vector rendering engine. You upload a template, connect your registration spreadsheet or registration list, map custom text variables (such as {{Participant Name}} or {{Rank}}), and our engine outputs high-resolution PDFs automatically upon event completion.",
  },
  {
    id: "faq-2",
    trigger: "Can we use our own templates?",
    content: "Yes. You can import SVG, PNG, or JPEG graphics directly into our layout designer. Alternatively, you can link your Canva account to import draft designs, add placeholder fields, and publish them as active event layouts.",
  },
  {
    id: "faq-3",
    trigger: "Which payment gateways are supported?",
    content: "We provide native integrations with Razorpay, UPI, and major credit cards. You can configure UPI payments to let attendees scan and pay via PhonePe, GooglePay, or Paytm, ensuring immediate checkout validation and auto-routing to your group's bank account.",
  },
  {
    id: "faq-4",
    trigger: "Can we manage hackathons?",
    content: "Yes, EventOS features full team registration support. Registrants can form squads, send invite links to colleagues, split ticket bills, and manage their project submission files from a unified participant portal.",
  },
  {
    id: "faq-5",
    trigger: "Do participants get QR tickets?",
    content: "Yes. When sign-up completes, a mobile-optimised ticket containing a unique QR code is sent to the student. Organizers scan these QR codes at the gate using the EventOS web-app interface to log real-time attendance.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 relative overflow-hidden px-6 bg-muted/10 dark:bg-slate-950/20">
      {/* Background glow decoration */}
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] rounded-full glow-bg-cyan opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-10 w-[500px] h-[500px] rounded-full glow-bg-purple opacity-15 pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/10 dark:border-cyan-500/20 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-6 select-none">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-sm sm:text-base">
            Everything you need to know about setting up tickets, handling transactions, and certificate distributions.
          </p>
        </div>

        {/* Accordion Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion items={faqItems} />
        </motion.div>
      </div>
    </section>
  );
}
