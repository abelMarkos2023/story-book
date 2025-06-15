
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { ArrowRight } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex flex-col flex-1 bg-gray-950 text-white transition-all duration-300">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-gray-900 p-4 border-b border-gray-800 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:text-yellow-400"
          >
            <ArrowRight size={24} />
          </button>
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
