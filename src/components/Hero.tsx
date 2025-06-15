'use client';

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white text-center py-24 px-6 overflow-hidden">
      {/* Watermark Kanji / Obnoxious Twins */}
      <h2 className="absolute text-[140px] md:text-[200px] font-black text-white opacity-5 -rotate-12 top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none">
        双子
      </h2>

      <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4 animate-pulse">
        Hello and Welcome to the world of ⚡ <span className="text-yellow-400"> Obnoxious Twins</span> ⚡
      </h1>

      <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
       For the reckless dreamers and fierce souls. Read epic manga-inspired adventures and shape the journey with your voice
      </p>

      <Link href='/books' className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full text-xl transition duration-300 shadow-lg animate-bounce">
        📖 Start Reading
      </Link>
    </section>
  );
}
