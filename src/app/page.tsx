// Loading page
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // tăng progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // khi đạt 100 → fade bằng DOM → redirect
  useEffect(() => {
    if (progress === 100 && containerRef.current) {
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transition = "opacity 500ms";

      const timer = setTimeout(() => {
        router.replace("/home");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [progress, router]);

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center h-screen bg-black text-white`}
    >
      <div className="text-center">
        <p className="mb-6 text-sm">LOADING... {progress}%</p>

        <div className="flex gap-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 border border-cyan-400 ${
                i < progress / 5 ? "bg-cyan-400" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
