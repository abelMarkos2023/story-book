
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { ArrowLeft, BookOpenText } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Navbar from '@/components/Navbar';
// import Chapter from '@/types/Chapter';

// export default function ChapterPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [chapter, setChapter] = useState<Chapter|null>(null);

//   useEffect(() => {
//     const fetchChapter = async () => {
//       const res = await fetch(`/api/chapters/${id}`);
//       const data = await res.json();
//       setChapter(data);
//     };

//     fetchChapter();
//   }, [id]);

//   if (!chapter)
//     return (
//       <div className="text-center text-gray-400 mt-20 text-lg">Loading chapter…</div>
//     );

//   return (
//     <>
//       <Navbar />
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-4xl bg-gray-700 mx-auto px-6 py-12"
//       >
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 mb-6 text-gray-400 hover:text-yellow-400 transition"
//         >
//           <ArrowLeft size={20} />
//           Back
//         </button>

//         <div className="flex items-center gap-3 mb-2 text-gray-500">
//           <BookOpenText size={20} />
//           <span className="text-sm">{formatDate(chapter.createdAt)}</span>
//         </div>

//         <h1 className="text-4xl font-extrabold text-yellow-400 mb-8 leading-tight">
//           {chapter.title}
//         </h1>

//         <article className="prose prose-invert prose-p:mb-5 prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6 text-gray-300 max-w-none leading-relaxed text-lg">
//           <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
//         </article>

//         <div className="flex justify-between mt-14">
//           <button className="px-2 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition text-gray-300">
//             ← Previous Chapter
//           </button>
//           <button className="px-2 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition text-gray-300">
//             Next Chapter →
//           </button>
//         </div>
//       </motion.div>
//     </>
//   );
// }

// function formatDate(dateString: string) {
//   const options: Intl.DateTimeFormatOptions = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// }


'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpenText } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Chapter from '@/types/Chapter';

export default function ChapterPage() {
  const { id } = useParams();
  const router = useRouter();
  const [chapter, setChapter] = useState<Chapter | null>(null);

  useEffect(() => {
    const fetchChapter = async () => {
      const res = await fetch(`/api/chapters/${id}`);
      const data = await res.json();
      setChapter(data);
    };

    fetchChapter();
  }, [id]);

  if (!chapter)
    return (
      <div className="text-center text-gray-400 mt-20 text-lg">Loading chapter…</div>
    );

  return (
    <>
      <Navbar />

      {/* Blurred Manga Cover Backdrop */}
      <div
        className="fixed inset-0 -z-10 opacity-25"
        style={{
          backgroundImage: `url('/manga-backdrop.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(60px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto px-6 py-16 text-gray-200"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-8 text-gray-400 hover:text-yellow-400 transition"
        >
          <ArrowLeft size={22} />
          Back to Book
        </button>

        {/* Chapter Meta */}
        <div className="flex items-center gap-3 mb-4 text-gray-500">
          <BookOpenText size={20} />
          <span className="text-sm">{formatDate(chapter.createdAt)}</span>
        </div>

        {/* Chapter Title */}
        <h1 className="text-5xl font-extrabold text-yellow-400 mb-8 drop-shadow-lg leading-tight">
          {chapter.title}
        </h1>

        {/* Chapter Content */}
        <article className="prose prose-invert prose-p:mb-6 prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 max-w-none text-lg leading-loose tracking-wide text-gray-300">
          <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
        </article>

        {/* Chapter Nav Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-between mt-20"
        >
          <button className="px-4 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition text-gray-300 shadow-lg">
            ← Previous Chapter
          </button>
          <button className="px-4 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition text-gray-300 shadow-lg">
            Next Chapter →
          </button>
        </motion.div>
      </motion.div>
    </>
  );
}

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
