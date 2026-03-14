"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { SECTION_IDS } from "@/lib/sections";
import { useState } from "react";
import { ResumeModal } from "@/components/ResumeModal";

export function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById(SECTION_IDS.contact);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const openChat = () => {
    const event = new CustomEvent("open-ai-chat");
    window.dispatchEvent(event);
  };

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative flex min-h-screen items-center justify-center px-4"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 py-24 md:flex-row">
        <motion.div
          className="flex-1 flex justify-center md:justify-start"
          layout
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <motion.div 
              className="relative h-72 w-56 overflow-hidden rounded-3xl bg-black md:h-[420px] md:w-[260px]"
              layout
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
            <img
              src="/profile.png?ver=3"
              alt={profile.name}
              className="h-full w-full object-cover"
              width={260}
              height={420}
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="flex-[1.4] space-y-6 text-center md:text-left"
          layout
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
            Mobile Application Developer
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="text-lg font-medium text-primary md:text-xl">
            {profile.title}
          </p>
          <p className="max-w-xl text-sm text-gray-300 md:text-base md:mx-0 mx-auto">
            {profile.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setResumeOpen(true)}
              className="rounded-full border border-primary bg-accent/60 px-6 py-2 text-sm font-medium shadow-glow-primary transition hover:bg-primary hover:text-black"
            >
              View Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={openChat}
              className="rounded-full border border-primary/60 bg-transparent px-6 py-2 text-sm font-medium text-primary shadow-glow-primary/60 transition hover:bg-primary hover:text-black"
            >
              Ask About Me (AI Chat)
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToContact}
              className="rounded-full border border-gray-700 bg-accent/60 px-6 py-2 text-sm font-medium text-gray-100 transition hover:border-primary hover:text-primary"
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>
      </div>
      <ResumeModal open={resumeOpen} onOpenChange={setResumeOpen} />
    </section>
  );
}

