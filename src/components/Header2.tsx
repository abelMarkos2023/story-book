'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import '@/app/globals.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  const getInitial = (text: string | null | undefined) => {
    if (!text) return '?';
    return text.charAt(0).toUpperCase();
  };

  const randomColor = () => {
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(()=>{
      console.log(session?.user)

  },[session])
  return (
    <header className="bg-black text-white shadow-lg fixed top-0 left-16 md:left-64 right-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-md md:text-xl xl:text-3xl font-extrabold tracking-wide relative inline-block animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-purple-500 drop-shadow-lg">
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

            {!session ? (
              <>
                <li>
                  <Link className="hover:text-yellow-400 glitch" href="/auth/login">Login</Link>
                </li>
                <li>
                  <Link className="hover:text-yellow-400 glitch" href="/auth/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                {session.user?.role === 'admin' ? (
                  <li>
                    <Link className="hover:text-yellow-400 glitch" href="/dashboard">Dashboard</Link>
                  </li>
                ) : null}
                <li className="flex items-center gap-2">
                 
                    <div
                      style={{ backgroundColor: randomColor() }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    >
                      {getInitial(session.user?.name || session.user?.email)}
                    </div>
                  
                  <span className="text-yellow-400 glitch">
                    {session.user?.name || session.user?.email}
                  </span>
                </li>
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="hover:text-yellow-400 glitch"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
