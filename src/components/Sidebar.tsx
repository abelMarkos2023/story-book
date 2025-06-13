
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  LogOut, Book, FileText, Users, MessageSquare, LayoutDashboard, ArrowLeft
} from 'lucide-react';

export default function Sidebar({ open, onClose }: { open: boolean, onClose: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { href: '/dashboard/books', label: 'Books', icon: <Book size={20} /> },
    { href: '/dashboard/chapters', label: 'Chapters', icon: <FileText size={20} /> },
    { href: '/dashboard/users', label: 'Users', icon: <Users size={20} /> },
    { href: '/dashboard/comments', label: 'Comments', icon: <MessageSquare size={20} /> },
  ];

  return (
    <aside
      className={`
        bg-gray-900 text-white h-full flex flex-col
        transition-all duration-300 ease-in-out
        ${open ? 'w-32' : 'w-0'}
        md:w-64
        overflow-hidden
        z-50
      `}
    >
      {/* Close button mobile */}
      <div className="flex items-center justify-start p-4 md:hidden">
        <button onClick={onClose} className="text-white hover:text-yellow-400">
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="text-2xl font-bold px-6 py-3 border-b border-gray-700 hidden md:block">
        Admin Panel
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 ${
              pathname === link.href ? 'bg-gray-800' : ''
            }`}
          >
            {link.icon}
            <span className="hidden md:inline">{link.label}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="flex items-center gap-3 p-4 border-t border-gray-700 hover:bg-gray-800"
      >
        <LogOut size={20} />
        <span className="hidden md:inline">Logout</span>
      </button>
    </aside>
  );
}
