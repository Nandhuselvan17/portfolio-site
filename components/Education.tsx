"use client";

import { profile } from "@/data/profile";
import { SECTION_IDS } from "@/lib/sections";
import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";

export function Education() {
  return (
    <SectionWrapper id={SECTION_IDS.education} title="Education">
      <div className="grid gap-6 md:grid-cols-2">
        {profile.education.map((edu, index) => (
          <motion.div
            key={edu.title}
            className="rounded-2xl border border-gray-800 bg-accent/60 p-5 shadow-md backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.08 }}
          >
            <h3 className="text-lg font-semibold text-primary">{edu.title}</h3>
            {edu.institution && (
              <p className="text-sm text-gray-200">{edu.institution}</p>
            )}
            {edu.period && (
              <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">
                {edu.period}
              </p>
            )}
            {edu.details.length > 0 && (
              <ul className="mt-3 list-disc space-y-1 text-sm text-gray-300">
                {edu.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

