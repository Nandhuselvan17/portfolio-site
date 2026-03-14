"use client";

import { profile } from "@/data/profile";
import { SECTION_IDS } from "@/lib/sections";
import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";

export function ExperienceTimeline() {
  return (
    <SectionWrapper id={SECTION_IDS.experience} title="Experience">
      <div className="relative pl-6">
        <div className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px bg-gray-800" />
        <div className="space-y-10">
          {profile.experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              className="relative rounded-2xl border border-gray-800 bg-accent/60 p-5 shadow-md backdrop-blur"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="absolute -left-[31px] top-5 h-3 w-3 rounded-full border-2 border-primary bg-background shadow-glow-primary" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-primary">
                  {exp.company}
                </h3>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  {exp.period}
                </p>
              </div>
              <p className="mt-1 text-sm font-medium text-gray-100">
                {exp.role}
              </p>
              <div className="mt-3 space-y-2 text-sm text-gray-300">
                <div>
                  <p className="mb-1 font-semibold text-gray-200">
                    Responsibilities
                  </p>
                  <ul className="ml-4 list-disc space-y-1">
                    {exp.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

