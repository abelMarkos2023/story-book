"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";


export default function RegisterPage() {
  const [positions, setPositions] = useState<{ top: number; left: number }[]>(
    []
  );
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [emojiBursts, setEmojiBursts] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const triggerEmojiBurst = () => {
    const burst = Array.from({ length: 12 }).map(() => ({
      id: Math.random(),
      emoji: ["✨", "🎉", "💥", "⚡️", "🌸", "🔥"][
        Math.floor(Math.random() * 6)
      ],
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
    }));
    setEmojiBursts(burst);

    // Clean up burst after animation
    setTimeout(() => {
      setEmojiBursts([]);
    }, 1000);
  };

  // Generate sparkle positions on mount
  useEffect(() => {
    const newPositions = Array.from({ length: 18 }).map(() => ({
      top: Math.random() * window.innerHeight,
      left: Math.random() * window.innerWidth,
    }));
    setPositions(newPositions);
  }, []);

  // Update form state on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form to API
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Registration failed.");
      setError(data.message);
      setLoading(false);
      return;
    }

    toast.success("Account created! 🎉 Redirecting...");
    setLoading(false);
    router.push("/auth/login");
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Something went wrong.");
    setError("Something went wrong.");
    setLoading(false);
  }
};


  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center overflow-hidden p-4">
      {/* Background Image */}
      <motion.img
        src="/manga_hero.jpeg"
        alt="Manga Hero"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.07, scale: 1 }}
        transition={{ duration: 3 }}
        className="absolute w-[600px] bottom-0 left-0 pointer-events-none select-none"
      />

      {/* Sparkles */}
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 300 }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [-200, 600],
          }}
          transition={{
            repeat: Infinity,
            duration: 12 + Math.random() * 8,
            delay: i * 0.5,
          }}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            top: pos.top,
            left: pos.left,
            opacity: 0.05,
          }}
        />
      ))}

      {/* Floating Titles */}

      <div className="absolute top-16 left-5 flex items-center space-x-2 pointer-events-none select-none z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.2, 0.4, 0], y: [0, -20, 20, -10, 0] }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white opacity-10"
        >
          📖 The Obnoxious Twins
        </motion.div>

        {/* Floating Emoji Trail */}
        {["✨", "⚡️", "🎉", "💥", "🌸"].map((emoji, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [-10, -50, -10],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + Math.random() * 2,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
            className="text-xl sm:text-3xl opacity-30"
          >
            {emoji}
          </motion.div>
        ))}
      </div>
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0.2, 0.4, 0], y: [0, -20, 20, -10, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        className="absolute text-6xl tmd:text-8xl font-extrabold text-white top-16 left-5 opacity-10 pointer-events-none select-none"
      >
        📖 The Obnoxious Twins
      </motion.div> */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0.15, 0.3, 0], y: [0, 30, -30, 20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute text-6xl font-bold text-white bottom-24 right-5 opacity-10 pointer-events-none select-none"
      >
        Manga World ✨
      </motion.div>

      {/* Register Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 w-full max-w-lg shadow-2xl space-y-6 z-10"
      >
        <h1 className="text-4xl font-bold text-center text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text flex items-center justify-center gap-2">
          <Sparkles size={32} /> Join the Twins
        </h1>

        <div className="space-y-4">
          <div className="flex items-center border border-white/10 bg-white/5 rounded-xl p-3">
            <User className="text-purple-400 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="bg-transparent focus:outline-none text-white w-full placeholder-gray-400"
            />
          </div>

          <div className="flex items-center border border-white/10 bg-white/5 rounded-xl p-3">
            <Mail className="text-purple-400 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent focus:outline-none text-white w-full placeholder-gray-400"
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
            />
          </div>
        </div>

        {error && (
          <div className="text-red-400 text-center font-medium">{error}</div>
        )}

        <button
          onClick={(e) => {
            handleSubmit(e);
            triggerEmojiBurst()

          }}
          disabled={loading}
          className={`w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
              <span> {"✨ Creating Account..."} </span>
            </div>
          ) : (
            "Register"
          )}
        </button>
      </motion.form>
      {/* Emoji Burst */}
      {emojiBursts.map((burst) => (
        <motion.div
          key={burst.id}
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: 2,
            x: burst.x,
            y: burst.y,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute text-3xl select-none pointer-events-none"
          style={{ top: "50%", left: "50%" }}
        >
          {burst.emoji}
        </motion.div>
      ))}
    </div>
  );
}
