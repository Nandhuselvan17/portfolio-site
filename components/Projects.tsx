"use client";

import { profile } from "@/data/profile";
import { SECTION_IDS } from "@/lib/sections";
import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";

const allProjects = [
  { name: "Radio Mango", description: "SwiftUI maintenance project", tags: ["SwiftUI", "Maintenance"] },
  { name: "Caribou Coffee", description: "SwiftUI enhancements", tags: ["SwiftUI", "Enhancements"] },
  { name: "YellaToys", description: "iOS application", tags: ["Swift"] },
  { name: "YellaMomz", description: "Swift UIKit shopping app", tags: ["UIKit", "Shopping"] },
  { name: "B-Fab", description: "Flutter application", tags: ["Flutter"] },
  { name: "WACPro", description: "Ongoing Flutter development", tags: ["Flutter", "Ongoing"] },
  { name: "BoardVision", description: "iOS application", tags: ["iOS", "Swift"] },
  { name: "SS Bikes Application", description: "Flutter application", tags: ["Flutter"] },
  { name: "Jumbo Application", description: "Flutter application", tags: ["Flutter"] },
];

export function Projects() {
  return (
    <SectionWrapper id={SECTION_IDS.projects} title="Projects">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((project, index) => (
          <motion.div
            key={project.name}
            className="rounded-2xl border border-gray-800 bg-accent/60 p-4 shadow-md backdrop-blur"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
              y: -4,
              scale: 1.02,
              boxShadow: "0 0 20px rgba(255,212,0,0.4)",
              borderColor: "rgba(255,212,0,0.8)"
            }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <h3 className="text-base font-semibold text-primary">{project.name}</h3>
            <p className="mt-1 text-xs text-gray-300">{project.description}</p>
            {project.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-700 bg-black/40 px-2 py-0.5 text-[10px] text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
