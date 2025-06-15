'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ChapterEditor from '@/components/Editor';
import Book from '@/types/Book';

export default function AddChapterPage() {
  const [title, setTitle] = useState('');
  const [bookId, setBookId] = useState('');
  const [content, setContent] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('/api/dashboard/booksList');

      const data = await res.json();
      console.log(data);
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const handleSubmit = async () => {
    await fetch('/api/chapters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, bookId, content }),
    });
    // redirect or show success message here
  };

  return (
    <div className="p-6 text-white">
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
        {books.length > 0 && books.map((book: Book) => (
          <option key={book._id} value={book._id}>{book.title}</option>
        ))}
      </select>

      <ChapterEditor content={content} onChange={setContent} />

      <Button onClick={handleSubmit} className="mt-4 bg-yellow-500">Save Chapter</Button>
    </div>
  );
}
