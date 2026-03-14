import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { registerUser, signInUser } from "../lib/authApi";

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const res = await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    const result = await signInUser({
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      setError(
        "Registration successful but auto-login failed. Please try logging in manually.",
      );
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
        {/* Username */}
        <div>
          <label className="block text-[10px] text-white mb-2">
            PLAYERNAME:
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ENTER PLAYERNAME"
              className="w-full bg-black border-4 border-white pl-10 pr-4 py-3 text-[10px] text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

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
              autoComplete="new-password"
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

        {/* Confirm Password */}
        <div>
          <label className="block text-[10px] text-white mb-2">
            CONFIRM PASSWORD:
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-black border-4 border-white pl-10 pr-12 py-3 text-[10px] text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-colors"
            >
              {showConfirmPassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="border-2 border-white/30 p-4 bg-zinc-900">
          <p className="text-[8px] text-white/60 leading-loose text-center">
            BY CREATING AN ACCOUNT, YOU AGREE TO OUR TERMS OF SERVICE AND
            PRIVACY POLICY.
          </p>
        </div>

        {/* Submit Button */}
        {error && (
          <div className="text-red-400 text-[10px] text-center border border-red-400 py-2">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full border-4 border-white bg-black py-4 text-xs text-white hover:bg-cyan-400 hover:border-cyan-400 hover:text-black transition-all duration-200 flex items-center justify-center gap-3 group"
        >
          {loading ? "CREATING..." : "CREATE ACCOUNT"}

          {!loading && (
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          )}
        </button>
      </form>
    </div>
  );
}
