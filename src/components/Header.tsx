'use client';

import Link from 'next/link';
import { useState } from 'react';
import '@/app/globals.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-3xl font-extrabold tracking-wide relative inline-block animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-purple-500 drop-shadow-lg">
          <span className="inline-block animate-float">⚔️</span>
          <span className="glitch ml-1 mr-1">The Obnoxious Twins</span>
          <span className="inline-block animate-float">🔥</span>
        </h1>

        <nav>
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          <ul
            className={`md:flex gap-6 text-lg ${
              menuOpen ? 'block mt-4' : 'hidden md:block'
            }`}
          >
            <li>
              <Link className="hover:text-yellow-400 glitch" href="/">Home</Link>
            </li>
            <li>
              <Link className="hover:text-yellow-400 glitch" href="/auth/login">Login</Link>
            </li>
            <li>
              <Link className="hover:text-yellow-400 glitch" href="/auth/register">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
