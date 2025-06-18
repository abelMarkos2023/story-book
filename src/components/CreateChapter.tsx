'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ChapterEditor from '@/components/Editor';
import Book from '@/types/Book';

export default function AddChapterPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [bookId, setBookId] = useState('');
  const [content, setContent] = useState('');
  const [books, setBooks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('/api/dashboard/booksList');
      const data = await res.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const handleSubmit = async () => {
    if (!title || !bookId || !content) {
      setError('Please fill all fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, bookId, content }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create chapter.');
      }

      router.push('/dashboard/chapters');
    } catch (err:unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 text-white max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Add New Chapter</h1>

      <input
        type="text"
        placeholder="Chapter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 mb-4"
      />

      <select
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 mb-4"
      >
        <option value="">Select Book</option>
        {books.map((book: Book) => (
          <option key={book._id} value={book._id}>{book.title}</option>
        ))}
      </select>

      <ChapterEditor content={content} onChange={setContent} />

      {error && <p className="text-red-400 mt-2">{error}</p>}

      <Button onClick={handleSubmit} disabled={isSubmitting} className="mt-4 bg-yellow-500 cursor-pointer">
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            Saving...
          </span>
        ) : 'Save Chapter'}
      </Button>
    </div>
  );
}
