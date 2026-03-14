import { NextRequest, NextResponse } from "next/server";
import { profile } from "@/data/profile";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

function buildLocalAnswer(questionRaw: string): string {
  const q = questionRaw.toLowerCase();

  if (q.includes("who are you") || q.includes("about you") || q.includes("introduce")) {
    return `I am ${profile.name}, an ${profile.title}. I have more than 3 years of experience building iOS and Flutter mobile applications, focusing on clean UI, performance, and modern mobile technologies.`;
  }

  if (q.includes("name")) {
    return `My name is ${profile.name}.`;
  }

  if (q.includes("study") || q.includes("education") || q.includes("college") || q.includes("bca")) {
    return `I completed a Bachelor of Computer Applications (BCA) at Erode Arts and Science College from 2019 to 2022 with 80% marks, and I also studied Higher Secondary with Computer Science.`;
  }

  if (q.includes("technology") || q.includes("tech stack") || q.includes("skills")) {
    return `I work mainly with Swift, SwiftUI, UIKit, Flutter, and Dart for mobile development, plus REST APIs, JSON, Alamofire, Firebase, Auth0, PSPDFKit, SDWebImage, Core Data, MapKit, Google Maps, Network Reachability, Local Authentication, GitHub, and Bitbucket.`;
  }

  if (q.includes("project")) {
    const p = profile.projects[0];
    return `One of my highlighted projects is ${p.name}: ${p.description} It includes features like ${p.features.join(", ")}. I have also worked on multiple production iOS and Flutter apps such as Radio Mango, Caribou Coffee, YellaToys, B-Fab, and WACPro.`;
  }

  if (q.includes("experience") || q.includes("work") || q.includes("company")) {
    return `I am currently working at Webandcrafts as a Junior iOS / Flutter Developer since March 2023, focusing on app development, UI improvements, API integrations, and performance. Previously I worked at Venpep Solutions (2022–2023) building iOS and Flutter applications and improving usability and stability.`;
  }

  if (q.includes("phone") || q.includes("mobile") || q.includes("number") || q.includes("contact")) {
    return `You can contact me by phone at ${profile.contact.phone} or by email at ${profile.contact.email}. My LinkedIn is ${profile.contact.linkedin}.`;
  }

  if (q.includes("resume") || q.includes("cv")) {
    return `You can view my full resume using the “View Resume” button on the site, which opens a PDF with my detailed experience, skills, and education.`;
  }

  return `I can answer questions about my skills, experience, projects, education, and contact details. For example, you can ask “What technologies do you use?”, “Where do you work?”, or “What is your phone number?”.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { messages?: IncomingMessage[] };
    const incomingMessages = body.messages ?? [];
    const lastUser = [...incomingMessages].reverse().find((m) => m.role === "user");

    const question = lastUser?.content ?? "";
    const answer = buildLocalAnswer(question);

    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json(
      { answer: "I had trouble reading your question. Please try asking again." },
      { status: 200 }
    );
  }
}

