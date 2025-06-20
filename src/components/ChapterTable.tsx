'use client';

import { useTransition } from 'react';
import { deleteChapter } from '@/actions/chaptersActions';
import { useSession } from 'next-auth/react';
import Chapter from '@/types/Chapter';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ChapterTable({ chapters, refresh }: { chapters: Chapter[]; refresh: () => void }) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this chapter?')) return;

    const res = await deleteChapter(id);
    if (res.success) {
      startTransition(() => refresh());
    } else {
      alert(res.error);
    }
  };

  return (
//     <table className="w-full overflow-scroll p-2 border-collapse bg-gray-800 rounded-lg">
//       <thead>
//         <tr className="text-gray-400 text-sm">
//           <th className="p-3 text-left">Title</th>
//           <th className="p-3">Book</th>
//           <th className="p-3">Created</th>
//           {isAdmin && <th className="p-3">Actions</th>}
//         </tr>
//       </thead>
//       <tbody>
//         {chapters.map((chapter:Chapter) => (
//           <tr key={chapter._id} className="border-t border-gray-700 p-2 hover:bg-gray-700">
//             <td className="p-3 text-gray-200">{chapter.title}</td>
//             <td className="p-3 text-gray-400">{chapter.book.title}</td>
//             <td className="p-3 text-gray-500">{new Date(chapter.createdAt).toLocaleString('en-GB', {
//           year: 'numeric',
//           month: 'short',
//           day: '2-digit',
//           hour: '2-digit',
//           minute: '2-digit',
//         })}</td>
//             {isAdmin && (
        
//             <td className="py-2 flex gap-2">
//   {/* Edit Button */}
//   <Link
//     href={`/dashboard/chapters/edit/${chapter._id}/`}
//     className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 transform hover:scale-105"
//   >
//     <Pencil className="w-4 h-4" />
//     Edit
//   </Link>

//   {/* Delete Button */}
//   <button
//     onClick={() => handleDelete(chapter._id)}
//     className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition duration-200 transform hover:scale-105"
//   >
//     <Trash2 className="w-4 h-4" />
//     {isPending ? 'Deleting...' : 'Delete'}
//   </button>
// </td>
//             )}
//           </tr>
//         ))}
//       </tbody>
//     </table>

<div className="w-full overflow-x-scroll rounded-lg">
  <table className="w-full md:min-w-[600px] border-collapse bg-gray-800 rounded-lg overflow-x-scroll">
    <thead>
      <tr className="text-gray-400 text-sm">
        <th className="p-3 text-sm sm:text-base text-left">Title</th>
        <th className="p-3 text-sm sm:text-base">Book</th>
        <th className="p-3 text-sm sm:text-base">Created</th>
        {isAdmin && <th className="p-3">Actions</th>}
      </tr>
    </thead>
    <tbody>
      {chapters.map((chapter: Chapter) => (
        <tr key={chapter._id} className="border-t border-gray-700 hover:bg-gray-700">
          <td className="p-1 sm:p-3 text-sm sm:text-base text-gray-200">{chapter.title}</td>
          <td className="p-1 sm:p-3 text-sm sm:text-base text-gray-400">{chapter.book.title}</td>
          <td className="p-1 sm:p-3 text-sm sm:text-base text-gray-500">
            {new Date(chapter.createdAt).toLocaleString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </td>
          {isAdmin && (
            <td className="p-1 sm:p-3 flex flex-wrap gap-2">
              <Link
                href={`/dashboard/chapters/edit/${chapter._id}/`}
                className="inline-flex items-center gap-1 sm;gap-2 px-1 sm:px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 transform hover:scale-105"
              >
                <Pencil className="w-2 sm:w-4 h-4" />
                Edit
              </Link>

              <button
                onClick={() => handleDelete(chapter._id)}
                className="inline-flex items-center gap-1 sm:gap-2 px-1 sm:px-3 py-1.5 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition duration-200 transform hover:scale-105"
              >
                <Trash2 className="w-4 h-4" />
                {isPending ? 'Deleting...' : 'Delete'}
              </button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}
