// 'use client';

// import ChapterTable from '@/components/ChapterTable';
// import { useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation';
// import { getChapters } from '@/actions/chaptersActions'; // you’d create this

// export default function ChaptersPage() {
//   const [chapters, setChapters] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchChapters = async (page: number) => {
//     const res = await getChapters(page);
//     setChapters(res.chapters);
//     setTotalPages(res.totalPages);
//   };

//   useEffect(() => {
//     fetchChapters(currentPage);
//   }, [currentPage]);

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
//           onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//           className="btn-secondary mr-2"
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className="text-gray-300">Page {currentPage} of {totalPages}</span>
//         <button
//           onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//           className="btn-secondary ml-2"
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </section>
//   );
// }


// import ChaptersPage from '@/components/ChapterPage';
// import { getChapters } from '@/actions/chaptersActions';

// export default async function ChaptersDashboard() {
//   const { chapters, totalPages } = await getChapters(1);

//   return (
//     <ChaptersPage 
//       initialChapters={chapters} 
//       initialTotalPages={totalPages}
//     />
//   );
// }
import ChaptersPage from '@/components/ChapterPage';
import { auth } from '@/app/lib/auth';

export default async function ChaptersDashboard() {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return <div className="text-red-400">Unauthorized</div>;
  }


  return (
    <ChaptersPage 
      
    />
  );
}