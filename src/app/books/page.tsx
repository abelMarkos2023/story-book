
// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Navbar from '@/components/Navbar';
// import Image from 'next/image';
// import { motion } from 'framer-motion';

// type Book = {
//   _id: string;
//   title: string;
//   description?: string;
//   coverImage?: string;
//   author?: string;
// };

// export default function BooksPage() {
//   const [books, setBooks] = useState<Book[]>([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       const res = await fetch('/api/books');
//       const data = await res.json();
//       setBooks(data);
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden">
//       <Navbar />

//       {/* Starfield Background */}
//       <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:22px_22px] pointer-events-none animate-fade-in z-0" />

//       {/* Floating Emojis */}
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 0.15, y: 0 }}
//         transition={{ duration: 3 }}
//         className="absolute top-10 left-8 text-5xl animate-float"
//       >
//         📖
//       </motion.div>
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 0.15, y: 0 }}
//         transition={{ duration: 3 }}
//         className="absolute bottom-10 right-8 text-5xl animate-float-reverse"
//       >
//         ⚔️
//       </motion.div>

//       <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 mb-14 text-center glitch-text tracking-widest"
//         >
//           📚 Explore the Collection
//         </motion.h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//           {books.map((book, idx) => (
//             <motion.div
//               key={book._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.05, duration: 0.5 }}
//               className="group relative bg-white/5 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.03] transition duration-300"
//             >
//               <div className="overflow-hidden h-64 relative">
//                 <Image
//                   src={book.coverImage || '/placeholder.png'}
//                   alt={book.title}
//                   height={960}
//                   width={960}
//                   className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
//                 />

//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/10 to-black/50 opacity-0 group-hover:opacity-25 transition duration-300"></div>
//               </div>

//               <div className="p-5 flex flex-col h-44">
//                 <h2 className="text-2xl font-bold text-gray-100 group-hover:text-yellow-400 transition duration-300">
//                   {book.title}
//                 </h2>

//                 <p className="text-gray-400 mt-2 line-clamp-3 flex-1">
//                   {book.description || 'No description available.'}
//                 </p>

//                 {book.author && (
//                   <p className="text-sm text-gray-500 mt-3">By {book.author}</p>
//                 )}

//                 {/* Read More Button */}
//                 <Link
//                   href={`/books/${book._id}`}
//                   className="mt-4 inline-block text-sm font-semibold text-gray-900 bg-yellow-400 hover:bg-yellow-500 px-3 py-1.5 rounded-lg animate-pulse-on-hover self-start"
//                 >
//                   📖 View Book
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {books.length === 0 && (
//           <p className="text-center text-gray-400 mt-20 text-lg">No books found yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 overflow-hidden">
      <Navbar />

      {/* Starfield Parallax Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 animate-stars z-0" />

      {/* Floating Emojis */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute text-6xl top-10 left-8 opacity-30"
      >
        📖
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="absolute text-6xl bottom-20 right-10 opacity-30"
      >
        ⚔️
      </motion.div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 tracking-widest drop-shadow-xl"
        >
          📚 The Ultimate Manga Vault
        </motion.h1>
        <p className="mt-5 text-lg text-gray-400 max-w-3xl mx-auto animate-glow">
          Manga-inspired stories crafted for the wild at heart. Read, comment, and join the adventure.
        </p>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 relative z-10">
        {books.map((book, idx) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.03] transition-all duration-300"
          >
            {/* Book Cover */}
            <div className="overflow-hidden h-64 relative">
              <Image
                src={book.coverImage || '/placeholder.png'}
                alt={book.title}
                height={960}
                width={960}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 opacity-0 group-hover:opacity-30 transition duration-500"></div>
            </div>

            <div className="p-5 flex flex-col h-44">
              <h2 className="text-2xl font-bold text-gray-100 group-hover:text-yellow-400 transition duration-300">
                {book.title}
              </h2>

              <p className="text-gray-400 mt-2 line-clamp-3 flex-1">
                {book.description || 'No description available.'}
              </p>

              {book.author && (
                <p className="text-sm text-gray-500 mt-3">By {book.author}</p>
              )}

              {/* Read More Button */}
              <Link
                href={`/books/${book._id}`}
                className="mt-4 inline-block text-sm font-semibold text-gray-900 bg-yellow-400 hover:bg-yellow-500 px-3 py-1.5 rounded-lg animate-pulse-on-hover self-start"
              >
                📖 View Book
              </Link>
            </div>

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent group-hover:border-yellow-400 transition duration-500"></div>
          </motion.div>
        ))}
      </div>

      {books.length === 0 && (
        <p className="text-center text-gray-500 mt-20 text-lg">No books found yet.</p>
      )}
    </div>
  );
}
