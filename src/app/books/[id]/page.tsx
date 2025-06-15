'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
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

      {/* Background Cover Blur */}
      {book.coverImage && (
        <div
          className="fixed inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${book.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(50px)',
          }}
        />
      )}

      <div className="relative max-w-5xl mx-auto px-6 py-16 z-10">
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <span className="text-xs text-gray-500">Status: {book.status}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gray-950 p-8 rounded-3xl shadow-2xl border border-gray-800"
        >
          {book.coverImage && (
            <Image
              width={500}
              height={500}
              src={book.coverImage}
              alt="Cover"
              className="w-full h-72 object-cover rounded-xl mb-8 shadow-lg border border-gray-800"
            />
          )}

          <h1 className="text-5xl font-extrabold text-yellow-400 mb-6 tracking-tight drop-shadow">
            {book.title}
          </h1>

          {book.description && (
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">{book.description}</p>
          )}

          <h2 className="text-3xl font-bold text-gray-200 mb-6">📚 Chapters</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {chapters.map((chapter: Chapter, idx) => (
              <motion.div
                key={chapter._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group p-5 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 transition-all duration-300 shadow-lg border border-gray-800 hover:border-yellow-400"
              >
                <Link
                  href={`/chapter/${chapter._id}`}
                  className="text-2xl font-semibold text-blue-400 group-hover:text-yellow-300 transition"
                >
                  📖 {chapter.title}
                </Link>
                <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                  <span>Chapter {idx + 1}</span>
                  <span>{estimateReadingTime(chapter.content)} min read</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

function estimateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const textLength = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(textLength / wordsPerMinute));
}
