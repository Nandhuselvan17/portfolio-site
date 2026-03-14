"use client";

import { profile } from "@/data/profile";
import { SECTION_IDS } from "@/lib/sections";
import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";

export function Skills() {
  const entries = Object.entries(profile.skills);

  return (
    <SectionWrapper id={SECTION_IDS.skills} title="Skills">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map(([category, skills], index) => (
          <motion.div
            key={category}
            className="rounded-2xl border border-gray-800 bg-accent/60 p-5 shadow-md backdrop-blur"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{
              y: -6,
              boxShadow: "0 0 25px rgba(255,212,0,0.4)",
              borderColor: "rgba(255,212,0,0.8)"
            }}
          >
            <h3 className="mb-2 text-lg font-semibold text-primary">
              {category}
            </h3>
            <ul className="space-y-1 text-sm text-gray-200">
              {skills.map((skill) => (
                <li key={skill}>• {skill}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

