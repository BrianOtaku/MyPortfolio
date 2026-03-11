import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const webProjects = [
  {
    id: 1,
    title: "NEWS WEB",
    category: "FRONTEND",
    image:
      "https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?w=1080&fit=crop",
    description: "A Simple News Web",
    githubUrl: "https://github.com/BrianOtaku/FrontEndTinTuc",
  },
  {
    id: 2,
    title: "SALE WEB",
    category: "FRONTEND",
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1080&fit=crop",
    description: "A Laptop Sale Platform",
    githubUrl: "https://github.com/BrianOtaku/SaleWebFrontEnd",
  },
  {
    id: 3,
    title: "PROJECTS MANAGEMENT WEB",
    category: "FULL STACK",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1080&fit=crop",
    description: "A Project Management Web Application",
    githubUrl: "https://github.com/BrianOtaku/Projects-Management",
    externalUrl: "https://projects-management-six.vercel.app/signin",
  },
  {
    id: 4,
    title: "PIX SURVIVAL GAME",
    category: "PIXEL ARTIST",
    image:
      "https://i.pinimg.com/736x/43/e1/94/43e1949e924d6cb8e0a2aa816c598662.jpg?w=1080&fit=crop",
    description: "2D TopDown Survival Game Pixel Art",
    githubUrl: "https://github.com/NguyenQuocKhanh555/2D_Survival_Game.git",
    externalUrl: "https://raycrop.itch.io/pix-survival",
  },
  {
    id: 5,
    title: "VERDANT FARM GAME",
    category: "PIXEL ARTIST",
    image:
      "https://i.pinimg.com/736x/ae/0f/82/ae0f825c1779c928316d33d3bf32690c.jpg?w=1080&fit=crop",
    description: "2D TopDown Game Pixel Art",
    githubUrl: "https://github.com/NguyenQuocKhanh555/2D_Top_Down_Game.git",
    externalUrl: "https://raycrop.itch.io/verdant-farm",
  },
];

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const projects = webProjects;

  return (
    <section id="projects" className="bg-black py-20 relative">
      {/* Animated grid background */}
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
              &gt; PROJECTS &lt;
            </h2>
          </div>
          <p className="text-xs text-white/60 max-w-2xl mx-auto leading-loose">
            FULL-STACK • FRONTEND APPLICATIONS • 2D PIXEL GAMES
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card Container */}
              <div className="border-4 border-white bg-black overflow-hidden relative group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-200">
                {/* Corner pixels */}
                <div className="absolute top-0 left-0 w-3 h-3 bg-white z-20"></div>
                <div className="absolute top-0 right-0 w-3 h-3 bg-white z-20"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-white z-20"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-white z-20"></div>

                {/* Image */}
                <div className="aspect-square overflow-hidden relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ imageRendering: "auto" }}
                  />

                  {/* Overlay */}
                  <div
                    className={`
                    absolute inset-0 bg-black transition-opacity duration-300
                    ${hoveredId === project.id ? "opacity-80" : "opacity-0"}
                  `}
                  >
                    <div className="flex items-center justify-center h-full gap-4">
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-white p-3 bg-black hover:bg-white transition-colors group/btn"
                      >
                        <ExternalLink className="w-6 h-6 text-white group-hover/btn:text-black transition-colors" />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="border-2 border-white p-3 bg-black hover:bg-white transition-colors group/btn"
                      >
                        <Github className="w-6 h-6 text-white group-hover/btn:text-black transition-colors" />
                      </a>
                    </div>
                  </div>

                  {/* Scanlines effect on hover */}
                  {hoveredId === project.id && (
                    <div className="absolute inset-0 pointer-events-none opacity-20 scanlines" />
                  )}
                </div>

                {/* Info */}
                <div className="p-4 bg-black border-t-4 border-white">
                  <h3 className="text-sm text-white mb-2">{project.title}</h3>
                  <p className="text-[8px] text-white/60 leading-loose">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 scanlines" />
    </section>
  );
}
