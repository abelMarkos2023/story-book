'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Chapters() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const res = await fetch('/api/chapters/all-chapters');
      const data = await res.json();
      console.log('data', data);
      setChapters(data);
    };

    fetchChapters();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Latest Chapters</h1>

      <ul className="space-y-4">
        {chapters.length === 0 ? <p>Loading...</p> : chapters.map((chapter: any) => (
          <li key={chapter._id} className="p-4 bg-gray-900 rounded-lg shadow hover:bg-gray-800 transition">
            <Link href={`/chapter/${chapter._id}`} className="text-lg font-semibold text-blue-400 hover:underline">
              {chapter.title}
            </Link>
            <p className="text-sm text-gray-400">From: 
              <Link href={`/books/${chapter.book._id}`} className="ml-1 text-yellow-400 hover:underline">
                {chapter.book.title}
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
