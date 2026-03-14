"use client";

import { motion } from "framer-motion";

const PARTICLE_COUNT = 40;

export function ParticlesBackground() {
  const particles = Array.from({ length: PARTICLE_COUNT });

  return (
    <div className="pointer-events-none h-full w-full bg-gradient-to-b from-black via-background to-black">
      {particles.map((_, index) => {
        const delay = Math.random() * 5;
        const duration = 10 + Math.random() * 10;
        const left = Math.random() * 100;
        const size = 2 + Math.random() * 4;

        return (
          <motion.span
            key={index}
            className="absolute rounded-full bg-primary/40 blur-[1px]"
            style={{
              left: `${left}%`,
              width: size,
              height: size
            }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "-10%", opacity: [0, 1, 0] }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
}

