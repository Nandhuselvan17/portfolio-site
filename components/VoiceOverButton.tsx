"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { SECTION_IDS } from "@/lib/sections";
import { profile } from "@/data/profile";

const getSkillsText = () => {
  const entries = Object.entries(profile.skills) as unknown as [string, string[]][];
  return entries
    .map(([category, skills]) => `${category}: ${skills.join(", ")}`)
    .join(". ");
};

const SECTION_CONTENT: Record<string, string> = {
  [SECTION_IDS.hero]: `Hi, I'm Murugan Pugal. ${profile.title}. ${profile.tagline}`,
  [SECTION_IDS.about]: profile.about.join(" "),
  [SECTION_IDS.skills]: getSkillsText(),
  [SECTION_IDS.experience]: profile.experience
    .map((exp) => `${exp.role} at ${exp.company} from ${exp.period}. ${exp.responsibilities.join(". ")}`)
    .join(" "),
  [SECTION_IDS.education]: profile.education
    .filter((e) => e.institution)
    .map((e) => `${e.title} at ${e.institution} from ${e.period}`)
    .join(". "),
  [SECTION_IDS.projects]: profile.projects
    .map((p) => `${p.name}: ${p.description}. Features: ${p.features.join(", ")}`)
    .join(" "),
  [SECTION_IDS.contact]: `Contact me at ${profile.contact.phone} or email at ${profile.contact.email}`
};

export function VoiceOverButton() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const currentSectionRef = useRef<string>("");
  const isInitializedRef = useRef(false);

  const speak = useCallback((text: string) => {
    try {
      const synth = window.speechSynthesis;
      if (!synth) {
        alert("Speech synthesis not supported in this browser");
        return;
      }
      
      synth.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      const voices = synth.getVoices();
      const danielVoice = voices.find(v => v.name.includes("Daniel"));
      
      if (danielVoice) {
        utterance.voice = danielVoice;
      } else if (voices.length > 0) {
        utterance.voice = voices[0];
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        console.error("Speech error:", e);
        setIsSpeaking(false);
      };
      
      synth.speak(utterance);
    } catch (err) {
      console.error("Speech error:", err);
      alert("Error using speech synthesis");
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsListening(false);
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            const sectionId = entry.target.id;
            if (sectionId && SECTION_CONTENT[sectionId] && sectionId !== currentSectionRef.current) {
              currentSectionRef.current = sectionId;
              if (isListening) {
                speak(SECTION_CONTENT[sectionId]);
              }
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(SECTION_IDS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      stopSpeaking();
    };
  }, [isListening, speak, stopSpeaking]);

  const toggleVoiceOver = useCallback(() => {
    console.log("Voice Over clicked", { isSpeaking, isListening });
    console.log("Speech synthesis available:", !!window.speechSynthesis);
    console.log("Available voices:", window.speechSynthesis?.getVoices()?.length);
    
    if (isSpeaking || isListening) {
      stopSpeaking();
    } else {
      setIsListening(true);
      currentSectionRef.current = SECTION_IDS.hero;
      speak(SECTION_CONTENT[SECTION_IDS.hero]);
    }
  }, [isSpeaking, isListening, speak, stopSpeaking]);

  return (
    <motion.button
      className={`fixed bottom-5 right-4 z-30 rounded-full border px-4 py-2 text-xs font-semibold shadow-glow-primary md:right-6 ${
        isSpeaking || isListening
          ? "border-red-500 bg-red-500/90 text-white"
          : "border-primary bg-primary/90 text-black"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleVoiceOver}
    >
      {isSpeaking ? "Stop Voice" : isListening ? "Listening..." : "Voice Over"}
    </motion.button>
  );
}
