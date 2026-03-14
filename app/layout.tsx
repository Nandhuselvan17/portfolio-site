import "./globals.css";
import type { ReactNode } from "react";
import { AIChatWidget } from "@/components/AIChatWidget";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { VoiceOverButton } from "@/components/VoiceOverButton";

export const metadata = {
  title: "Murugan Muthu Selvan P | iOS & Flutter Developer",
  description:
    "Premium portfolio of Murugan Muthu Selvan P, iOS & Flutter Mobile Application Developer."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-white">
        <div className="fixed inset-0 -z-10">
          <ParticlesBackground />
        </div>
        <main className="relative z-10">{children}</main>
        <VoiceOverButton />
        <AIChatWidget />
      </body>
    </html>
  );
}

