"use client";

import AssetList from "@/src/components/AssetList";
import { Contact } from "@/src/components/Contact";
import { Hero } from "@/src/components/Hero";
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
      className={`space-y-32 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
    >
      <Hero />
      {/* ABOUT */}
      <section className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-gray-600 leading-relaxed">
          I create stylized pixel art assets for indie games and build modern
          web applications using Next.js and Tailwind CSS. Passionate about
          clean design, smooth UI and game-ready visuals.
        </p>
      </section>

      {/* SKILLS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Skills & Tools</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-gray-700">
            <div>Pixel Art</div>
            <div>Animation</div>
            <div>Next.js</div>
            <div>Tailwind CSS</div>
            <div>React</div>
            <div>MongoDB</div>
            <div>Cloudinary</div>
            <div>UI/UX Design</div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Pixel Asset Store</h3>
            <p className="text-gray-600 text-sm">
              A platform to share and distribute free pixel art assets.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">RPG Tileset Pack</h3>
            <p className="text-gray-600 text-sm">
              A top-down medieval pixel art environment pack.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">UI Pixel Kit</h3>
            <p className="text-gray-600 text-sm">
              Pixel-perfect UI icons for indie games.
            </p>
          </div>
        </div>
      </section>

      {/* FREE ASSETS */}
      <section id="assets" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Free Assets</h2>
          <AssetList />
        </div>
      </section>
      <Contact />
    </main>
  );
}
