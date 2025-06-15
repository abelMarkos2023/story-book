'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

type Book = {
  _id: string;
  title: string;
  description?: string;
  coverImage?: string;
  author?: string;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('/api/books');
      const data = await res.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-extrabold text-white mb-12 text-center tracking-tight">
          📚 Explore the Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {books.map((book) => (
            <Link
              href={`/books/${book._id}`}
              key={book._id}
              className="group relative bg-white/5 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition duration-300"
            >
              <div className="overflow-hidden h-56">
                <Image
                   height={96}
                   width={96}
                  src={book.coverImage || '/placeholder.png'}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition duration-300">
                  {book.title}
                </h2>

                <p className="text-gray-400 mt-2 line-clamp-3">
                  {book.description || 'No description available.'}
                </p>

                {book.author && (
                  <p className="text-sm text-gray-500 mt-4">By {book.author}</p>
                )}
              </div>

              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-gray-900/10 to-black/50 opacity-0 group-hover:opacity-20 transition duration-300"></div>
            </Link>
          ))}
        </div>

        {books.length === 0 && (
          <p className="text-center text-gray-400 mt-20 text-lg">No books found yet.</p>
        )}
      </div>
    </div>
  );
}
