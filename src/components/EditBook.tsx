

'use client';

import PreviewImage from '@/components/PreviewImage';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateBook } from '@/actions/booksActions';
import Book from '@/types/Book';

export default function EditBookForm({ book }:{book:Book}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    if (imageFile && imageFile?.size > 10 * 1024 * 1024) {
      setFileError('Image file size exceeds 10MB');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await updateBook({error:''},formData);

      if (res.success && res.redirectTo) {
        router.push(res.redirectTo);
      } else {
        setError(res.error || 'Failed to update book');
      }
    } catch (err) {
        console.log(err)
      setError('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  
<form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-gray-900 p-3 sm:p-8 rounded-2xl shadow-2xl space-y-6">
  {/* Error Messages */}
  {error && <div className="p-3 bg-red-500/10 text-red-300 rounded-md text-sm">{error}</div>}
  {fileError && <div className="p-3 bg-red-500/10 text-red-300 rounded-md text-sm">{fileError}</div>}

  <input type="hidden" name="id" value={book._id} />

  {/* Title */}
  <div>
    <label htmlFor="title" className="block text-sm font-semibold text-gray-300 mb-1">Title</label>
    <input
      type="text"
      id="title"
      name="title"
      defaultValue={book.title}
      required
      className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700"
    />
  </div>

  {/* Description */}
  <div>
    <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-1">Description</label>
    <textarea
      id="description"
      name="description"
      defaultValue={book.description}
      rows={4}
      className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700"
    />
  </div>

  {/* Status */}
  <div>
    <label htmlFor="status" className="block text-sm font-semibold text-gray-300 mb-1">Status</label>
    <select
      id="status"
      name="status"
      defaultValue={book.status}
      className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700"
    >
      <option value="draft">Draft</option>
      <option value="published">Published</option>
    </select>
  </div>

  {/* Cover Image */}
  <div>
    <label htmlFor="coverImage" className="block text-sm font-semibold text-gray-300 mb-2">Cover Image</label>
    <input
      type="file"
      id="coverImage"
      name="coverImage"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
        if (file && file.size > 10 * 1024 * 1024) {
          setFileError('Image file size exceeds 10MB');
        } else {
          setFileError(null);
        }
      }}
      className="block w-full text-sm text-gray-400
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-600 file:text-white
        hover:file:bg-indigo-700"
    />
    <div className="mt-4">
      <PreviewImage file={imageFile} defaultImage={book.coverImage} />
    </div>
  </div>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-4 border-t border-gray-700">
    <a href="/dashboard/books" className="text-center text-sm text-gray-400 hover:text-indigo-400 transition">← Cancel</a>
    <button
      type="submit"
      disabled={isSubmitting || !!fileError}
      className="flex justify-center items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Saving...
        </>
      ) : (
        'Save Changes'
      )}
    </button>
  </div>
</form>


  );
}
// 