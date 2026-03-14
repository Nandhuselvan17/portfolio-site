"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function SectionWrapper({ id, title, children }: SectionWrapperProps) {
  return (
    <section id={id} className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-8 text-3xl font-semibold tracking-tight md:text-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

