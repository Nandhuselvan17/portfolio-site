"use client";

import { motion } from "framer-motion";

const stats = [
  { number: "3+", label: "Years Experience" },
  { number: "5+", label: "Live App Store Apps" },
  { number: "50k+", label: "Users Reached" },
];

export function DeveloperStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.15,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="rounded-xl border border-yellow-500/30 bg-[#111] p-4 text-center"
        >
          <h3 className="text-2xl font-bold text-yellow-400">
            {stat.number}
          </h3>
          <p className="mt-1 text-xs text-gray-400">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
