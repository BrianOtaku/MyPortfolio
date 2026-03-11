export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-black border-b-4 border-cyan-400 relative overflow-hidden flex items-center justify-center"
    >
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Animated background grid */}
        <div className="retro-grid pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Pixel border decoration */}
          <div className="flex justify-center">
            <div className="border-4 border-cyan-400 p-8 bg-black/80 relative">
              {/* Corner pixels */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-white"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white"></div>

              <h1 className="text-white space-y-4">
                <div className="text-sm text-cyan-400 mb-6">
                  &gt; PORTFOLIO.EXE &lt;
                </div>
                <div className="text-4xl md:text-6xl leading-tight mb-4 floating-animation">
                  <span className="text-white">BRIAN OTAKU</span>
                </div>
              </h1>
            </div>
          </div>

          <p className="text-xs md:text-sm text-white/80 leading-loose max-w-2xl mx-auto px-4">
            WEB DEVELOPER • WEB DESIGNER • PIXEL ARTIST
          </p>

          {/* Call to action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <a
              href="#assets"
              className="w-full sm:w-auto border-4 border-cyan-400 bg-cyan-400 px-8 py-4 text-xs text-black hover:bg-black hover:text-cyan-400 transition-all duration-200"
            >
              VIEW WORK
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto border-4 border-white bg-black px-8 py-4 text-xs text-white hover:bg-white hover:text-black transition-all duration-200"
            >
              CONTACT ME
            </a>
          </div>
        </div>
      </div>

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)",
        }}
      />
    </section>
  );
}
