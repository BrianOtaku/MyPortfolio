import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { signInUser } from "../lib/authApi";

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const res = await signInUser({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    window.location.href = "/home";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-[10px] text-white mb-2">EMAIL:</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="PLAYER@EXAMPLE.COM"
              className="w-full bg-black border-4 border-white pl-10 pr-4 py-3 text-[10px] text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-[10px] text-white mb-2">PASSWORD:</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-black border-4 border-white pl-10 pr-12 py-3 text-[10px] text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-colors"
            >
              {showPassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`
                  w-5 h-5 border-2 transition-all
                  ${
                    formData.rememberMe
                      ? "bg-cyan-400 border-cyan-400"
                      : "bg-black border-white group-hover:border-cyan-400"
                  }
                `}
              ></div>
            </div>
            <span className="text-[8px] text-white/80">REMEMBER ME</span>
          </label>
        </div>

        {/* Submit Button */}
        {error && (
          <div className="text-red-400 text-[10px] text-center border border-red-400 py-2">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full border-4 border-white bg-black py-4 text-xs text-white hover:bg-cyan-400 hover:border-cyan-400 hover:text-black transition-all duration-200 flex items-center justify-center gap-3 group"
          disabled={loading}
        >
          {loading ? "LOGGING IN..." : "START GAME"}

          {!loading && (
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          )}
        </button>
      </form>
    </div>
  );
}
