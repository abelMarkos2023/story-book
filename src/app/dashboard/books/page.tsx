// 'use client';

// import { useEffect, useState, useTransition } from 'react';
// import { deleteBook } from '@/actions/booksActions';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Trash2, Pencil } from 'lucide-react';
// import { motion } from 'framer-motion';

// type Book = {
//   _id: string;
//   title: string;
//   description?: string;
//   coverImage?: string;
//   author?: string;
//   status: string;
//   createdAt: string;
// };

// export default function BooksDashboardPage() {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [isPending, startTransition] = useTransition();

//   useEffect(() => {
//     const fetchBooks = async () => {
//       const res = await fetch('/api/books');
//       const data = await res.json();
//       setBooks(data);
//     };

//     fetchBooks();
//   }, []);

//   const handleDelete = (id: string) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this book?');
//     if (!confirmDelete) return;

//     startTransition(async () => {
//       await deleteBook(id);
//       setBooks((prev) => prev.filter((b) => b._id !== id));
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-10">
//           <h1 className="text-4xl font-extrabold tracking-tight">📚 Manage Books</h1>
//           <Link
//             href="/dashboard/books/new"
//             className="px-5 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
//           >
//             + New Book
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {books.map((book) => (
//             <motion.div
//               key={book._id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//               className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg"
//             >
//               {book.coverImage && (
//                 <Image
//                   src={book.coverImage}
//                   alt={book.title}
//                   width={400}
//                   height={400}
//                   className="w-full h-56 object-cover"
//                 />
//               )}

//               <div className="p-5 flex flex-col justify-between h-48">
//                 <div>
//                   <h2 className="text-xl font-bold text-yellow-400 mb-2">{book.title}</h2>
//                   <p className="text-sm text-gray-400 line-clamp-3">{book.description}</p>
//                 </div>

//                 <div className="flex justify-between items-center mt-4">
//                   <div className="text-xs text-gray-500">{new Date(book.createdAt).toLocaleDateString()}</div>
//                   <div className="flex gap-3">
//                     <Link
//                       href={`/dashboard/books/edit/${book._id}`}
//                       className="p-2 rounded-lg bg-gray-700 hover:bg-blue-500 transition"
//                     >
//                       <Pencil size={18} />
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(book._id)}
//                       disabled={isPending}
//                       className="p-2 rounded-lg bg-gray-700 hover:bg-red-500 transition"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {books.length === 0 && (
//           <p className="text-center text-gray-400 text-lg mt-20">No books found yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteBook } from "@/actions/booksActions";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

type Book = {
  _id: string;
  title: string;
  coverImage?: string;
};

export default function BooksDashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const handleDelete = async (bookId: string) => {
       const confirmDelete = window.confirm('Are you sure you want to delete this book?');
        if (!confirmDelete) return;
       setDeletingId(bookId);
  try {
    const res = await deleteBook(bookId); // this is your server action
    if (!res.success) {
      throw new Error('Failed to delete book');
    }
    // Refresh list after deletion (if applicable)
   // router.refresh(); // if you're using next/navigation
       setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));

  } catch (error) {
    console.error('Delete failed:', error);
    alert('Something went wrong while deleting.');
  } finally {
    setDeletingId(null); // Reset spinner state no matter what
  }
};

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400">
        📚 Manage Books
      </h1>

      {books.length === 0 ? (
        <p className="text-gray-400">No books found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow hover:scale-[1.02] transition"
            >
              <Image
                src={book.coverImage || "/placeholder.png"}
                alt={book.title}
                width={600}
                height={800}
                className="w-full h-56 object-cover"
              />

              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-gray-100">
                  {book.title}
                </h2>

                <div className="flex gap-3">
                  <Link
                    href={`/dashboard/books/edit/${book._id}`}
                    className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-sm text-white transition flex items-center gap-1 cursor-pointer"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(book._id)}
                    className={`px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-sm text-white transition flex items-center gap-1 cursor-pointer ${
                      deletingId === book._id
                        ? "cursor-not-allowed opacity-70"
                        : ""
                    }`}
                    disabled={deletingId === book._id}
                  >
                    {deletingId === book._id ? (
                      <Spinner />
                    ) : (
                      <>
                        <Trash2 size={16} />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
