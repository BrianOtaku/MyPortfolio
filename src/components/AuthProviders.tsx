import { signIn } from "next-auth/react";
import { Github } from "lucide-react";

export function AuthProviders() {
  return (
    <>
      {/* Social Login */}
      <div className="mt-8">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-white/20"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-black px-4 text-[8px] text-white/40">
              OR CONTINUE WITH
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() =>
              signIn("github", {
                callbackUrl: "/home",
              })
            }
            className="flex items-center justify-center gap-2 leading-loose border-4 border-white bg-black py-3 text-[10px] text-white hover:bg-white hover:text-black transition-all"
          >
            <Github className="w-5 h-5" />
            <span>GITHUB</span>
          </button>

          <button
            type="button"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/home",
              })
            }
            className="flex items-center justify-center gap-2 leading-loose border-4 border-white bg-black py-3 text-[10px] text-white hover:bg-white hover:text-black transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.73 1.22 9.23 3.6l6.9-6.9C35.73 2.13 30.2 0 24 0 14.63 0 6.53 5.48 2.56 13.44l8.04 6.24C12.5 13.6 17.8 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.1 24.5c0-1.6-.14-3.13-.4-4.6H24v9h12.4c-.53 2.87-2.13 5.3-4.53 6.94l7.03 5.46C43.95 37.4 46.1 31.5 46.1 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.6 28.3A14.5 14.5 0 0 1 9.5 24c0-1.5.27-2.94.75-4.3l-8.04-6.24A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.56l8.04-6.26z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.2 0 11.4-2.05 15.2-5.6l-7.03-5.46c-1.95 1.32-4.45 2.1-8.17 2.1-6.2 0-11.5-4.1-13.4-9.7l-8.04 6.26C6.53 42.52 14.63 48 24 48z"
              />
            </svg>
            <span>GOOGLE</span>
          </button>
        </div>
      </div>
    </>
  );
}
