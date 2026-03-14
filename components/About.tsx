"use client";

import { profile } from "@/data/profile";
import { SECTION_IDS } from "@/lib/sections";
import { SectionWrapper } from "@/components/SectionWrapper";
import { DeveloperStats } from "@/components/DeveloperStats";
import { motion } from "framer-motion";

export function About() {
  return (
    <SectionWrapper id={SECTION_IDS.about} title="About Me">
      <div className="grid gap-8 md:grid-cols-[1.2fr_minmax(0,_1fr)]">
        <div className="space-y-4 text-sm text-gray-300 md:text-base">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hidden h-full rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-accent to-black/60 p-4 shadow-glow-primary/40 md:block"
        >
          <DeveloperStats />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

