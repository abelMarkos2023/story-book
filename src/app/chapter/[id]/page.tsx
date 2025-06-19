
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { ArrowLeft, BookOpenText } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Navbar from '@/components/Navbar';
// import Chapter from '@/types/Chapter';


// type NeighborChapter = { _id: string; title: string } | null;
// export default function ChapterPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [chapter, setChapter] = useState<Chapter | null>(null);
//   const [neighbors, setNeighbors] = useState<{ previous: NeighborChapter; next: NeighborChapter }>({
//     previous: null,
//     next: null,
//   });

//   useEffect(() => {
//     const fetchChapter = async () => {
//       const res = await fetch(`/api/chapters/${id}`);
//       const data = await res.json();
    
//      setChapter(data);

      
//     };
//      const fetchNeighbors = async () => {
//       const res = await fetch(`/api/chapters/${id}/neighbor`);
//       const data = await res.json();

//       if(data.success){
//       setNeighbors(data);

//       }
//     };
//     fetchChapter();
//     fetchNeighbors();
//   }, [id]);

//   if (!chapter) return (
//     <div className="flex flex-col items-center justify-center h-screen text-gray-400">
//       <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
//       <p className="mt-4 text-lg">Loading chapter…</p>
//     </div>
//   );

//   return (
//     <>
     
//       <Navbar />
//       <div className="fixed inset-0 -z-10 opacity-20 bg-cover bg-center blur-xl"
//         style={{ backgroundImage: `url('/manga-backdrop.jpg')` }}
//       />
//       <div className="h-[calc(100vh-80px)] overflow-y-auto pt-4">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="max-w-5xl mx-auto px-6 py-12 text-gray-200"
//         >
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 mb-6 text-gray-400 hover:text-yellow-400 transition"
//           >
//             <ArrowLeft size={22} />
//             Back to Book
//           </button>

//           <div className="flex items-center gap-3 mb-3 text-gray-500">
//             <BookOpenText size={20} />
//             <span className="text-sm">{formatDate(chapter.createdAt)}</span>
//           </div>

//           <h1 className="text-4xl font-extrabold text-yellow-400 mb-6">{chapter.title}</h1>

//           <article className="prose prose-invert prose-p:mb-6 prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 max-w-none text-lg leading-relaxed tracking-wide text-gray-300">
//             <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
//           </article>

//           {/* Chapter Nav Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             className="flex justify-between mt-20"
//           >
//            <button
//             disabled={!neighbors.previous}
//             onClick={() => neighbors.previous && router.push(`/chapter/${neighbors.previous._id}`)}
//             className={`px-4 py-3 rounded-xl  ${
//               neighbors.previous
//                 ? 'cursor-pointer bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800'
//                 : 'bg-gray-700 opacity-50 cursor-not-allowed'
//             } transition text-gray-300 shadow-lg`}
//           >
//             ← Previous Chapter
//           </button>

//           <button
//             disabled={!neighbors.next}
//             onClick={() => neighbors.next && router.push(`/chapter/${neighbors.next._id}`)}
//             className={`px-4 py-3 rounded-xl ${
//               neighbors.next
//                 ? ' cursor-pointer bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800'
//                 : 'bg-gray-700 opacity-50 cursor-not-allowed'
//             } transition text-gray-300 shadow-lg`}
//           >
//             Next Chapter →
//           </button>
//           </motion.div>
//         </motion.div>
//       </div>
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

type NeighborChapter = { _id: string; title: string } | null;

export default function ChapterPage() {
  const { id } = useParams();
  const router = useRouter();

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [neighbors, setNeighbors] = useState<{ previous: NeighborChapter; next: NeighborChapter }>({
    previous: null,
    next: null,
  });

  useEffect(() => {
    const fetchChapter = async () => {
      const res = await fetch(`/api/chapters/${id}`);
      const data = await res.json();
      setChapter(data);
    };

    const fetchNeighbors = async () => {
      const res = await fetch(`/api/chapters/${id}/neighbor`);
      const data = await res.json();

      if (data.success) {
        setNeighbors(data);
      }
    };

    fetchChapter();
    fetchNeighbors();
  }, [id]);

  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && neighbors.previous) {
      router.push(`/chapter/${neighbors.previous._id}`);
    } else if (e.key === 'ArrowRight' && neighbors.next) {
      router.push(`/chapter/${neighbors.next._id}`);
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [neighbors, router]);

useEffect(() => {
  if (chapter) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}, [chapter]);

  if (!chapter)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-400">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading chapter…</p>
      </div>
    );

  return (
    <>
      <Navbar />

      <div
        className="fixed inset-0 -z-10 opacity-20 bg-cover bg-center blur-xl"
        style={{ backgroundImage: `url('/manga-backdrop.jpg')` }}
      />

      {/* Fixed-height container with scrollable content */}
      <div className="h-[calc(100vh-80px)] flex flex-col overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 overflow-y-auto px-6 py-12 text-gray-200"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-6 text-gray-400 hover:text-yellow-400 transition"
          >
            <ArrowLeft size={22} />
            Back to Book
          </button>

          <div className="flex items-center gap-3 mb-3 text-gray-500">
            <BookOpenText size={20} />
            <span className="text-sm">{formatDate(chapter.createdAt)}</span>
          </div>

          <h1 className="text-4xl font-extrabold text-yellow-400 mb-6">{chapter.title}</h1>

          <article className="prose prose-invert prose-p:mb-6 prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 max-w-none text-lg leading-relaxed tracking-wide text-gray-300">
            <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
          </article>
        </motion.div>

        {/* Sticky Footer Chapter Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-between px-6 py-4 border-t border-gray-800 bg-gray-900"
        >
          <button
            disabled={!neighbors.previous}
            onClick={() => neighbors.previous && router.push(`/chapter/${neighbors.previous._id}`)}
            className={`px-4 py-3 rounded-xl ${
              neighbors.previous
                ? 'cursor-pointer bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800'
                : 'bg-gray-700 opacity-50 cursor-not-allowed'
            } transition text-gray-300 shadow-lg`}
          >
            ← Previous Chapter
          </button>

          <button
            disabled={!neighbors.next}
            onClick={() => neighbors.next && router.push(`/chapter/${neighbors.next._id}`)}
            className={`px-4 py-3 rounded-xl ${
              neighbors.next
                ? 'cursor-pointer bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800'
                : 'bg-gray-700 opacity-50 cursor-not-allowed'
            } transition text-gray-300 shadow-lg`}
          >
            Next Chapter →
          </button>
        </motion.div>
      </div>
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
