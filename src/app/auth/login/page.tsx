"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock } from "lucide-react";




export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleGoogleSignIn = async () => {
  await signIn("google", { callbackUrl: "/dashboard" });
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };



  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center overflow-hidden p-4">
      {/* Background Art */}
      <motion.img
        src="/manga_hero.jpeg"
        alt="Manga Hero"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 3 }}
        className="absolute w-[600px] bottom-0 left-0 pointer-events-none select-none"
      />

      {/* Floating Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.2, 0.3, 0.2, 0],
          y: [0, -20, 20, -10, 0],
        }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        className="absolute text-8xl font-extrabold text-white top-16 left-5 opacity-10 pointer-events-none select-none"
      >
        📖 Obnoxious Twins ✨
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 w-full max-w-sm shadow-2xl space-y-6 z-10"
      >
        <h1 className="text-4xl font-bold text-center text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text flex items-center justify-center gap-2">
          <Sparkles size={32} /> Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border border-white/10 bg-white/5 rounded-xl p-3">
            <Mail className="text-purple-400 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent focus:outline-none text-white w-full placeholder-gray-400"
              required
            />
          </div>

          <div className="flex items-center border border-white/10 bg-white/5 rounded-xl p-3">
            <Lock className="text-purple-400 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent focus:outline-none text-white w-full placeholder-gray-400"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

     <button
  onClick={handleGoogleSignIn}
  className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-yellow-400 to-red-500 hover:from-red-500 hover:to-yellow-400 text-white font-bold py-3 rounded-xl shadow-lg transition"
>
  <svg
    className="w-5 h-5"
    viewBox="0 0 533.5 544.3"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.3H272.1v95h146.9c-6.3 34-25.2 62.7-53.6 81.9v68.1h86.7c50.7-46.7 81.4-115.5 81.4-194.7z"
      fill="#4285F4"
    />
    <path
      d="M272.1 544.3c72.8 0 133.9-24.1 178.5-65.3l-86.7-68.1c-24 16.1-54.8 25.7-91.8 25.7-70.6 0-130.5-47.7-151.9-111.8H29.5v70.2c44.7 88 136.4 149.3 242.6 149.3z"
      fill="#34A853"
    />
    <path
      d="M120.2 324.8c-10.5-31.1-10.5-64.7 0-95.8V158.8H29.5c-35.7 70.7-35.7 154.9 0 225.6l90.7-70.2z"
      fill="#FBBC04"
    />
    <path
      d="M272.1 107.2c39.6 0 75.2 13.6 103.3 40.2l77.5-77.5C406 24.1 344.9 0 272.1 0 165.9 0 74.2 61.3 29.5 149.3l90.7 70.2c21.4-64.1 81.3-111.8 151.9-111.8z"
      fill="#EA4335"
    />
  </svg>
  Sign in with Google
</button>


      </motion.div>
    </div>
  );
}
