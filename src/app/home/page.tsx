"use client";

import { About } from "@/src/components/About";
import { Assets } from "@/src/components/Assets";
import { Contact } from "@/src/components/Contact";
import { Hero } from "@/src/components/Hero";
import { Skills } from "@/src/components/Skills";
import { Projects } from "@/src/components/Projects";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // delay 1 frame để đảm bảo transition chạy
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  return (
    <main
      className={` ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
    >
      <Hero />
      <About />
      <Skills />
      <Assets />
      <Projects />
      <Contact />
    </main>
  );
}
