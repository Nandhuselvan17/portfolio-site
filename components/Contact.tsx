"use client";

import { profile } from "@/data/profile";
import { SECTION_IDS } from "@/lib/sections";
import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { useState } from "react";

export function Contact() {
  return (
    <SectionWrapper id={SECTION_IDS.contact} title="Contact">
      <div className="grid gap-6 md:grid-cols-[2fr_minmax(0,_1fr)]">
        <div className="grid gap-4 sm:grid-cols-2">
          <ContactCard label="Phone" value={profile.contact.phone}>
            <a
              href={profile.contact.phoneHref}
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              Call now
            </a>
          </ContactCard>
          <ContactCard label="Email" value={profile.contact.email}>
            <a
              href={`mailto:${profile.contact.email}`}
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              Send email
            </a>
          </ContactCard>
          <ContactCard label="LinkedIn" value="View profile">
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              Open LinkedIn
            </a>
          </ContactCard>
        </div>
        <MobileDropPhone />
      </div>
    </SectionWrapper>
  );
}

interface ContactCardProps {
  label: string;
  value: string;
  children?: React.ReactNode;
}

function ContactCard({ label, value, children }: ContactCardProps) {
  return (
    <motion.div
      className="flex flex-col justify-between rounded-2xl border border-gray-800 bg-accent/60 p-4 shadow-md backdrop-blur"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, borderColor: "rgba(255,212,0,0.8)" }}
    >
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-400">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium text-gray-100">{value}</p>
      </div>
      {children && <div className="mt-3">{children}</div>}
    </motion.div>
  );
}

function MobileDropPhone() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 flex flex-col items-start md:mt-0">
      <p className="mb-2 text-sm font-medium text-gray-300">
        Quick mobile contact
      </p>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-primary bg-primary/10 px-5 py-2 text-sm font-semibold text-primary shadow-glow-primary transition"
      >
        {open ? "Hide contact options" : "Contact on Mobile"}
      </motion.button>
      <motion.div
        className="mt-3 flex flex-col gap-2 overflow-hidden"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      >
        <a
          href={profile.contact.phoneHref}
          className="rounded-full border border-gray-700 bg-accent/80 px-4 py-2 text-xs font-medium text-gray-100 hover:border-primary hover:text-primary"
        >
          Call {profile.contact.phone}
        </a>
        <a
          href={`mailto:${profile.contact.email}`}
          className="rounded-full border border-gray-700 bg-accent/80 px-4 py-2 text-xs font-medium text-gray-100 hover:border-primary hover:text-primary"
        >
          Email {profile.contact.email}
        </a>
      </motion.div>
    </div>
  );
}

