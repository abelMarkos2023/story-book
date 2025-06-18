
// 'use client';

// import Chapter from '@/types/Chapter';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { BookOpen } from 'lucide-react';

// export default function Chapters() {
//   const [chapters, setChapters] = useState<Chapter[] | null>(null);

//   useEffect(() => {
//     const fetchChapters = async () => {
//       const res = await fetch('/api/chapters/all-chapters');
//       const data = await res.json();
//       setChapters(data);
//     };

//     fetchChapters();
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-14">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-4xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-center mb-12 drop-shadow"
//       >
//         📖 Latest Chapters
//       </motion.h1>

//       {chapters === null || chapters.length === 0 ? (
//         <p className="text-gray-400 text-center text-lg">Loading chapters…</p>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2">
//           {chapters.map((chapter, idx) => (
//             <motion.div
//               key={chapter._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.05, duration: 0.5 }}
//               className="group p-5 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl hover:shadow-yellow-400/20 transition-all duration-300"
//             >
//               <Link
//                 href={`/chapter/${chapter._id}`}
//                 className="block text-2xl font-bold text-yellow-300 group-hover:text-yellow-400 transition"
//               >
//                 {chapter.title}
//               </Link>

//               <p className="mt-2 text-sm text-gray-400 flex items-center gap-2">
//                 <BookOpen size={16} className="text-pink-500" />
//                 From:
//                 <Link
//                   href={`/books/${chapter.book._id}`}
//                   className="ml-1 text-blue-400 hover:underline"
//                 >
//                   {chapter.book?.title}
//                 </Link>
//               </p>

//               <div className="mt-4 flex justify-end">
//                 <Link
//                   href={`/chapter/${chapter._id}`}
//                   className="px-3 py-1.5 rounded-lg bg-yellow-400 text-gray-900 font-semibold text-sm hover:bg-yellow-500 transition"
//                 >
//                   Read Chapter →
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import Chapter from '@/types/Chapter';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function Chapters() {
  const [chapters, setChapters] = useState<Chapter[] | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      const res = await fetch('/api/chapters/all-chapters');
      const data = await res.json();
      setChapters(data.chapters);
    };

    fetchChapters();
  }, []);

  return (
    <div className="relative max-w-5xl mx-auto px-6 py-14 overflow-hidden">
      {/* Starfield */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none animate-fade-in" />

      {/* Floating Emojis */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 3 }}
        className="absolute top-6 left-8 text-4xl animate-float"
      >
        ⚔️
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 3 }}
        className="absolute bottom-8 right-6 text-4xl animate-float-reverse"
      >
        🔥
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold tracking-widest relative text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-center mb-12 glitch-text"
      >
        📖 Latest Chapters
      </motion.h1>

      {chapters === null || chapters.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">Loading chapters…</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 z-10 relative">
          {chapters.map((chapter, idx) => (
            <motion.div
              key={chapter._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="group p-5 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl hover:shadow-yellow-400/20 transition-all duration-300"
            >
              <Link
                href={`/chapter/${chapter._id}`}
                className="block text-2xl font-bold text-yellow-300 group-hover:text-yellow-400 transition"
              >
                {chapter.title}
              </Link>

              <p className="mt-2 text-sm text-gray-400 flex items-center gap-2">
                <BookOpen size={16} className="text-pink-500" />
                From:
                <Link
                  href={`/books/${chapter.book._id}`}
                  className="ml-1 text-blue-400 hover:underline"
                >
                  {chapter.book?.title}
                </Link>
              </p>

              <div className="mt-4 flex justify-end">
                <Link
                  href={`/chapter/${chapter._id}`}
                  className="px-3 py-1.5 rounded-lg bg-yellow-400 text-gray-900 font-semibold text-sm hover:bg-yellow-500 transition animate-pulse-on-hover"
                >
                  Read Chapter →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
