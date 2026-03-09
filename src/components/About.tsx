export function About() {
  return (
    <section className="bg-zinc-900 py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block border-4 border-cyan-400 p-6 bg-black mb-8 relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-white"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-white"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white"></div>
            <h2 className="text-1xl md:text-5xl text-white">
              &gt; ABOUT ME &lt;
            </h2>
          </div>
        </div>

        <div className="gap-12 max-w-6xl mx-auto">
          {/* Bio */}
          <div className="space-y-8">
            <div className="border-4 border-white bg-black p-8 relative">
              <div className="absolute top-0 left-0 w-3 h-3 bg-cyan-400"></div>
              <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400"></div>

              <div className="space-y-6">
                <div>
                  <div className="text-xs text-cyan-400 mb-4">
                    &gt; SYSTEM.INIT()
                  </div>
                  <p className="text-[10px] text-white/80 leading-loose">
                    HELLO WORLD! I&apos;M A WEB DESIGNER, DEVELOPER, AND PIXEL
                    ARTIST WITH A BACKGROUND IN INFORMATION TECHNOLOGY. I ENJOY
                    CREATING CLEAN, MODERN INTERFACES, TURNING DESIGN IDEAS INTO
                    RESPONSIVE WEBSITES, AND CREATING PIXEL GAME ASSETS.
                  </p>
                </div>

                <div className="border-t-2 border-white/20 pt-6">
                  <div className="text-xs text-cyan-400 mb-4">
                    &gt; MISSION.LOG()
                  </div>
                  <p className="text-[10px] text-white/80 leading-loose">
                    I ENJOY CREATING CLEAN UI, EXPERIMENTING WITH GAME-STYLE
                    INTERFACES, AND TURNING IDEAS INTO VISUAL WEB EXPERIENCES.
                    PIXEL ART AND CREATIVE DESIGN ARE A BIG PART OF MY
                    INSPIRATION.
                  </p>
                </div>

                <div className="border-t-2 border-white/20 pt-6">
                  <div className="text-xs text-cyan-400 mb-4">
                    &gt; INTERESTS.ARRAY()
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "WEB DESIGN",
                      "UI/UX",
                      "FRONTEND",
                      "PIXEL ART",
                      "GAME ASSETS",
                    ].map((interest, i) => (
                      <div
                        key={i}
                        className="border-2 border-white px-3 py-2 text-[8px] text-white hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all cursor-pointer"
                      >
                        {interest}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t-2 border-white/20 pt-6">
                  <button className="w-full sm:w-auto border-4 border-cyan-400 bg-cyan-400 px-8 py-4 text-xs text-black hover:bg-black hover:text-cyan-400 transition-all duration-200">
                    DOWNLOAD CV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-5 scanlines" />
    </section>
  );
}
