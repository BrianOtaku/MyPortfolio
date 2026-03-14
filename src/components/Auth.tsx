import { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { AuthProviders } from "./AuthProviders";

export function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center p-4">
      {/* Animated grid background */}
      <div className="retro-grid pointer-events-none" />

      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 scanlines" />

      {/* Auth Container */}
      <div className="relative w-full max-w-md">
        <div className="border-4 border-cyan-400 bg-black p-8 relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block border-4 border-white p-4 bg-black mb-4 relative">
              <div className="absolute -top-2 -left-2 w-3 h-3 bg-white"></div>
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-white"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white"></div>
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-white"></div>
              <h1 className="text-xl md:text-2xl text-cyan-400">
                PLAYER {isSignUp ? "CREATE" : "LOGIN"}
              </h1>
            </div>
            <p className="text-[10px] text-white/60 leading-loose">
              {isSignUp ? "CREATE YOUR ACCOUNT" : "ENTER YOUR CREDENTIALS"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-0 mb-6 border-4 border-white">
            <button
              onClick={() => setIsSignUp(false)}
              className={`
                flex-1 text-[10px] py-3 transition-all
                ${
                  !isSignUp
                    ? "bg-cyan-400 text-black"
                    : "bg-black text-white hover:bg-zinc-900"
                }
              `}
            >
              SIGN IN
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`
                flex-1 text-[10px] py-3 transition-all
                ${
                  isSignUp
                    ? "bg-cyan-400 text-black"
                    : "bg-black text-white hover:bg-zinc-900"
                }
              `}
            >
              SIGN UP
            </button>
          </div>

          {/* Form */}
          {isSignUp ? <SignUp /> : <SignIn />}

          {/* Providers */}
          <AuthProviders />

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-400"></div>
        </div>
      </div>
    </div>
  );
}
