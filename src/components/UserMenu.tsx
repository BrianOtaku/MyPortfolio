"use client";

import { useState, useEffect, useRef } from "react";
import { signOutUser } from "../lib/authApi";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="fixed bottom-5 right-5 z-50">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full flex items-center justify-center p-2 border-3 border-white bg-black text-white hover:border-cyan-400 hover:text-cyan-400 transition-all"
      >
        <User className="w-4 h-4" />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute flex flex-col items-end space-y-2 bottom-0 right-12 transition-all duration-200 ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}
      >
        <button
          onClick={() =>
            !session ? (window.location.href = "/auth") : signOutUser()
          }
          className="bg-black whitespace-nowrap sm:w-auto border-3 p-2 border-cyan-400 text-xs text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-200"
        >
          {!session ? "SIGN IN" : "SIGN OUT"}
        </button>

        {session?.user.role === "admin" && (
          <button
            onClick={() => (window.location.href = "/asset")}
            className="bg-black whitespace-nowrap sm:w-auto border-3 p-2 border-cyan-400 text-xs text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-200"
          >
            UPLOAD ASSET
          </button>
        )}
      </div>
    </div>
  );
}
