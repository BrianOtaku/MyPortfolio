import { Mail, Github, Facebook } from "lucide-react";
import { FaItchIo } from "react-icons/fa";
import { Footer } from "./Footer";

export function Contact() {
  return (
    <section
      id="contact"
      className="bg-black border-t-4 border-cyan-400 relative"
    >
      {/* Grid background */}
      <div className="pixel-grid pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="border-4 border-cyan-400 p-4 inline-block mb-6 relative">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-white"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white"></div>
              <h3 className="text-sm text-white">BRIAN OTAKU</h3>
            </div>
            <p className="text-[8px] text-white/60 leading-loose mb-4">
              WEB DEVELOPER & PIXEL ARTIST CRAFTING IMMERSIVE DIGITAL
              EXPERIENCES
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs text-cyan-400 mb-6">&gt; QUICK LINKS</h4>
            <ul className="space-y-3">
              {[
                { label: "HOME", href: "#" },
                { label: "ABOUT", href: "#about" },
                { label: "SKILLS", href: "#skills" },
                { label: "ASSET PACKS", href: "#assets" },
                { label: "PROJECTS", href: "#projects" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[10px] text-white hover:text-cyan-400 transition-colors inline-flex items-center group"
                  >
                    <span className="text-cyan-400 mr-2">&gt;</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs text-cyan-400 mb-6">&gt; CONNECT</h4>
            <div className="space-y-4 mb-6">
              <a
                href="mailto:tambao.pixel@gmail.com"
                className="text-[9px] text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                TAMBAO.PIXEL@GMAIL.COM
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                {
                  icon: Github,
                  label: "GitHub",
                  url: "https://github.com/BrianOtaku",
                  external: true,
                },
                {
                  icon: Facebook,
                  label: "Facebook",
                  url: "https://www.facebook.com/bao.nguyentam.585/",
                  external: true,
                },
                {
                  icon: FaItchIo,
                  label: "ItchIo",
                  url: "https://tam-bao-pixel-artist.itch.io/",
                  external: true,
                },
                {
                  icon: Mail,
                  label: "Mail",
                  url: "mailto:tambao.pixel@gmail.com",
                  external: false,
                },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url || "#"}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    className="border-2 border-white p-2 hover:border-cyan-400 hover:bg-cyan-400 transition-all group"
                    aria-label={social.label}
                  >
                    <Icon
                      className="w-5 h-5 text-white group-hover:text-black transition-colors"
                      strokeWidth={3}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
}
