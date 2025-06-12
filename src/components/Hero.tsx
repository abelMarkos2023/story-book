'use client';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white text-center py-24 px-6 overflow-hidden">
      {/* Watermark Kanji / Obnoxious Twins */}
      <h2 className="absolute text-[140px] md:text-[200px] font-black text-white opacity-5 -rotate-12 top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none">
        双子
      </h2>

      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-pulse">
        Welcome to <span className="text-yellow-400">The Obnoxious Twins</span> ⚡
      </h1>

      <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
        Manga-inspired stories crafted for the wild at heart. Read, comment, and join the adventure.
      </p>

      <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full text-xl transition duration-300 shadow-lg animate-bounce">
        📖 Start Reading
      </button>
    </section>
  );
}
