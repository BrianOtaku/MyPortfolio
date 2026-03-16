export function About() {
  return (
    <section id="about" className="bg-zinc-900 py-24 relative overflow-hidden">
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
                <div className="border-t-2 border-white/20 pt-6">
                  <div className="text-xs text-cyan-400 mb-4">
                    &gt; SYSTEM.INIT()
                  </div>

                  <p className="text-[10px] text-white/80 leading-loose">
                    &gt; USER:{" "}
                    <span className="text-white font-semibold">
                      NGUYEN TAM BAO
                    </span>{" "}
                    <br />
                    &gt; ROLE:{" "}
                    <span className="text-cyan-300">
                      WEB DESIGNER / DEVELOPER / PIXEL ARTIST
                    </span>{" "}
                    <br />
                    &gt; BACKGROUND: INFORMATION TECHNOLOGY <br />
                    &gt; STATUS: BUILDING CREATIVE WEB EXPERIENCES, 2D PIXEL
                    GAME ASSETS...
                  </p>
                </div>

                <div className="border-t-2 border-white/20 pt-6">
                  <div className="text-xs text-cyan-400 mb-4">
                    &gt; MISSION.LOG()
                  </div>

                  <p className="text-[10px] text-white/80 leading-loose">
                    &gt; CREATE{" "}
                    <span className="text-white">CLEAN AND MODERN UI</span>{" "}
                    <br />
                    &gt; TURN IDEAS INTO{" "}
                    <span className="text-white">RESPONSIVE WEBSITES</span>{" "}
                    <br />
                    &gt; EXPERIMENT WITH{" "}
                    <span className="text-cyan-300">
                      GAME-STYLE INTERFACES
                    </span>{" "}
                    <br />
                    &gt; DESIGN{" "}
                    <span className="text-cyan-300">PIXEL GAME ASSETS</span>
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
                  <button
                    onClick={() => window.open("/pdf/Nguyen_Tam_Bao - CV.pdf")}
                    className="w-full sm:w-auto border-4 border-cyan-400 bg-cyan-400 px-8 py-4 text-xs text-black hover:bg-black hover:text-cyan-400 transition-all duration-200"
                  >
                    VIEW CV
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
