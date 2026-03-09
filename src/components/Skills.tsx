import { useState } from "react";
import { Code, Palette, Server, Database, Wrench } from "lucide-react";

const skillCategories = [
  {
    name: "FRONTEND",
    icon: Code,
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "TAILWIND", level: 85 },
      { name: "TYPESCRIPT", level: 70 },
      { name: "REACT", level: 75 },
      { name: "NEXT.JS", level: 70 },
    ],
  },
  {
    name: "DESIGN",
    icon: Palette,
    skills: [
      { name: "FIGMA", level: 50 },
      { name: "UI/UX", level: 80 },
      { name: "PIXEL ART", level: 95 },
      { name: "GAME ASSETS", level: 90 },
    ],
  },
  {
    name: "BACKEND",
    icon: Server,
    skills: [
      { name: "NODE.JS", level: 65 },
      { name: "REST API", level: 70 },
      { name: "PRISMA", level: 60 },
    ],
  },
  {
    name: "DATABASE",
    icon: Database,
    skills: [
      { name: "MONGODB", level: 70 },
      { name: "POSTGRESQL", level: 65 },
    ],
  },
  {
    name: "TOOLS",
    icon: Wrench,
    skills: [
      { name: "GIT", level: 75 },
      { name: "VSCODE", level: 90 },
      { name: "ASEPRITE", level: 95 },
      { name: "FIGMA", level: 50 },
    ],
  },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="bg-black py-24 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="retro-grid pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block border-4 border-cyan-400 p-6 bg-black mb-8 relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-white"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-white"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white"></div>
            <h2 className="text-1xl md:text-5xl text-white">
              &gt; SKILLS &lt;
            </h2>
          </div>
          <p className="text-xs text-white/60 leading-loose max-w-2xl mx-auto">
            SKILL LEVELS • ABILITIES • TECH STACK
          </p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-4 mb-12 justify-center">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`
                  border-4 px-6 py-4 text-[10px] transition-all duration-200 flex items-center gap-3
                  ${
                    activeCategory === index
                      ? "bg-cyan-400 text-black border-cyan-400"
                      : "bg-black text-white border-white hover:border-cyan-400"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 ${activeCategory === index ? "text-black" : "text-cyan-400"}`}
                  strokeWidth={3}
                />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Skills Display */}
        <div className="max-w-4xl mx-auto">
          <div className="border-4 border-white bg-black p-8 md:p-12 relative">
            <div className="absolute top-0 left-0 w-3 h-3 bg-cyan-400"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400"></div>

            <div className="space-y-8">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div key={index} className="space-y-3">
                  {/* Skill Name and Level */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white">{skill.name}</span>
                    <span className="text-xs text-cyan-400">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="border-4 border-white bg-zinc-900 h-8 relative overflow-hidden">
                    {/* Progress Fill */}
                    <div
                      className="h-full bg-cyan-400 relative transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        animation: "fillBar 1s ease-out",
                      }}
                    >
                      {/* Pixel pattern overlay */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `
                            linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%),
                            linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%),
                            linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.1) 75%),
                            linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.1) 75%)
                          `,
                          backgroundSize: "4px 4px",
                          backgroundPosition: "0 0, 0 2px, 2px -2px, -2px 0px",
                        }}
                      />

                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </div>

                    {/* Grid overlay on empty space */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: "8px 8px",
                      }}
                    />
                  </div>

                  {/* Pixel decoration below bar */}
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-full h-1 ${i < Math.floor(skill.level / 10) ? "bg-cyan-400" : "bg-zinc-800"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Category Stats */}
            <div className="mt-12 pt-8 border-t-2 border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl text-cyan-400 mb-2">
                    {skillCategories[activeCategory].skills.length}
                  </div>
                  <div className="text-[8px] text-white/60">SKILLS</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-cyan-400 mb-2">
                    {Math.round(
                      skillCategories[activeCategory].skills.reduce(
                        (sum, s) => sum + s.level,
                        0,
                      ) / skillCategories[activeCategory].skills.length,
                    )}
                    %
                  </div>
                  <div className="text-[8px] text-white/60">AVG LEVEL</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-cyan-400 mb-2">
                    {Math.max(
                      ...skillCategories[activeCategory].skills.map(
                        (s) => s.level,
                      ),
                    )}
                    %
                  </div>
                  <div className="text-[8px] text-white/60">HIGHEST</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-cyan-400 mb-2">2+</div>
                  <div className="text-[8px] text-white/60">YEARS LEARNING</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-[8px] text-white/40 leading-loose">
            LEVELING UP • LEARNING NEW SKILLS • BUILDING EXPERIENCES
          </p>
        </div>
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-5 scanlines"></div>
    </section>
  );
}
