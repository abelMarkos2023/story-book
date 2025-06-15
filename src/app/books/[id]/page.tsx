'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
// import ChapterContent from '@/components/ChapterContent';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/Hero';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Book from '@/types/Book';
import Chapter from '@/types/Chapter';
import Image from 'next/image';

export default function BookPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookRes = await fetch(`/api/books/${id}`);
      const bookData = await bookRes.json();
      setBook(bookData);

      const chaptersRes = await fetch(`/api/books/${id}/chapters`);
      const chaptersData = await chaptersRes.json();

      // sort ascending by createdAt
      const sortedChapters = chaptersData.sort(
        (a: Chapter, b: Chapter) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      setChapters(sortedChapters);
    };

    fetchData();
  }, [id]);

  if (!book) return <p className="text-center text-gray-400 mt-10">Loading...</p>;

  return (
    <>
      <Navbar />
      <HeroSection />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-300 hover:text-yellow-400"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <span className="text-xs text-gray-500">Status: {book.status}</span>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          {/* Book Cover */}
          {book.coverImage && (
            <Image
              width={500}
              height={500}
              src={book.coverImage}
              alt="Cover"
              className="w-full h-64 object-cover rounded-lg mb-6 shadow-md border border-gray-800"
            />
          )}

          <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">{book.title}</h1>

          {book.description && (
            <p className="text-gray-400 mb-6 leading-relaxed">{book.description}</p>
          )}

          <h2 className="text-2xl font-bold text-gray-200 mb-4">📖 Chapters</h2>

          <div className="grid gap-4">
            {chapters.map((chapter: Chapter, idx) => (
              <motion.div
                key={chapter._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 shadow-md border border-gray-700"
              >
                <Link
                  href={`/chapter/${chapter._id}`}
                  className="text-xl font-semibold text-blue-400 group-hover:text-yellow-400 transition"
                >
                  📖 {chapter.title}
                </Link>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <span>Chapter {idx + 1}</span>
                  <span>{estimateReadingTime(chapter.content)} min read</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Simple reading time estimator based on words per minute
function estimateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const textLength = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(textLength / wordsPerMinute));
}
