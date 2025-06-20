// 'use client';

// import ChapterTable from '@/components/ChapterTable';
// import { useState } from 'react';
// import { getChapters } from '@/actions/chaptersActions';

// type Chapter = {
//   _id: string;
//   title: string;
//   book: string;
//   content: string;
//   createdBy: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type ChaptersPageProps = {
//   initialChapters: Chapter[];
//   initialTotalPages: number;
// };

// export default function ChaptersPage({ initialChapters, initialTotalPages }: ChaptersPageProps) {
//   const [chapters, setChapters] = useState(initialChapters);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(initialTotalPages);

//   const fetchChapters = async (page: number) => {
//     const res = await fetch(`/api/chapters?page=${page}`);
//     setChapters(res.chapters);
//     setTotalPages(res.totalPages);
//   };

//   return (
//     <section className="p-6 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-200">Chapters</h1>
//         <a href="/dashboard/chapters/new" className="btn-primary">Add Chapter</a>
//       </div>

//       <ChapterTable 
//         chapters={chapters}
//         refresh={() => fetchChapters(currentPage)}
//       />

//       <div className="mt-6 flex justify-center">
//         <button
//           onClick={() => {
//             const prev = Math.max(currentPage - 1, 1);
//             setCurrentPage(prev);
//             fetchChapters(prev);
//           }}
//           className="btn-secondary mr-2"
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className="text-gray-300">Page {currentPage} of {totalPages}</span>
//         <button
//           onClick={() => {
//             const next = Math.min(currentPage + 1, totalPages);
//             setCurrentPage(next);
//             fetchChapters(next);
//           }}
//           className="btn-secondary ml-2"
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </section>
//   );
// }

'use client';

import ChapterTable from '@/components/ChapterTable';
import Book from '@/types/Book';
import { useEffect, useState } from 'react';

type Chapter = {
  _id: string;
  title: string;
  book: Book;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export default function ChaptersPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchChapters = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/chapters/all-chapters?page=${page}&limit=5`);
      const data = await res.json();

      setChapters(data.chapters);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error('Failed to fetch chapters:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters(1);
  }, []);

  return (
    <section className="sm:p-6 p-1 max-w-7xl mx-0 sm:mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-200">Chapters</h1>
        <a href="/dashboard/chapters/new" className="btn-primary">Add Chapter</a>
      </div>

      {loading || !chapters ? (
   <div className="w-full flex items-center justify-center h-20">
      <div className="animate-spin inline-block w-20 h-20 border-[8px] border-current border-t-transparent text-indigo-500 rounded-full" role="status" aria-label="loading"></div>
   </div>

      ) : (
        <ChapterTable 
          chapters={chapters}
          refresh={() => fetchChapters(currentPage)}
        />
      )}

      {/* <div className="mt-6 flex justify-center items-center gap-4">
        <button
          onClick={() => fetchChapters(Math.max(currentPage - 1, 1))}
          className="btn-secondary"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-gray-300">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => fetchChapters(Math.min(currentPage + 1, totalPages))}
          className="btn-secondary"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div> */}
      <div className="mt-6 flex justify-center items-center gap-1 sm:gap-4">
  <button
    onClick={() => {
      const prev = Math.max(currentPage - 1, 1);
      setCurrentPage(prev);
      fetchChapters(prev);
    }}
    className={`px-1 sm:px-4 py-2 rounded-lg border border-gray-600 text-gray-200 hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  <span className="text-gray-400">
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => {
      const next = Math.min(currentPage + 1, totalPages);
      setCurrentPage(next);
      fetchChapters(next);
    }}
    className={`px-1 sm:px-4 py-2 rounded-lg border border-gray-600 text-gray-200 hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>
    </section>
  );
}
