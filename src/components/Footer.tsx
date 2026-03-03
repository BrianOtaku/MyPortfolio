import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Divider */}
      <div className="border-t-2 border-white/20 mb-8"></div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-['Press_Start_2P'] text-[8px] text-white/60 flex items-center gap-2">
          <span>© {currentYear} ALL RIGHTS RESERVED</span>
        </p>
        <p className="font-['Press_Start_2P'] text-[8px] text-white/60 flex items-center gap-2">
          MADE WITH{" "}
          <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />{" "}
          BY BRIAN OTAKU
        </p>
      </div>

      {/* Pixel decoration */}
      <div className="mt-8 flex justify-center gap-1">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-cyan-400 pixel" />
        ))}
      </div>
    </footer>
  );
}
