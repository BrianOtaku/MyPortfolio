"use client";

import { useState } from "react";
import { signOutUser } from "../lib/authApi";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  if (!session) {
    return null; // Không hiển thị menu nếu chưa đăng nhập
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full flex items-center justify-center p-2 border-3 border-white bg-black text-white hover:border-cyan-400 hover:text-cyan-400 transition-all"
      >
        <User className="w-5 h-5" />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute bottom-0 right-15 transition-all duration-200 ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}
      >
        <button
          onClick={() => signOutUser()}
          className="whitespace-nowrap sm:w-auto border-4 border-cyan-400 bg-cyan-400 p-2 text-xs text-black hover:bg-black hover:text-cyan-400 transition-all duration-200"
        >
          SIGN OUT
        </button>
      </div>
    </div>
  );
}
