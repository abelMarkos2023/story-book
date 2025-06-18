// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { updateChapter } from '@/actions/chaptersActions'; // your server action
// import { ArrowLeft, Save } from 'lucide-react';
// import Chapter from '@/types/Chapter';

// export default function EditChapterPage({ chapter }: { chapter: Chapter }) {
//   const [title, setTitle] = useState(chapter.title);
//   const [content, setContent] = useState(chapter.content);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       await updateChapter(chapter._id, { title, content });
//       router.push('/dashboard/chapters');
//     } catch (error) {
//       console.error(error);
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section className="max-w-3xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-200">Edit Chapter</h1>
//         <a
//           href="/dashboard/chapters"
//           className="btn-secondary flex items-center gap-2"
//         >
//           <ArrowLeft className="w-4 h-4" /> Back
//         </a>
//       </div>

//       <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
//         <div>
//           <label className="text-gray-300 text-sm mb-1 block">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="input"
//             required
//           />
//         </div>

//         <div>
//           <label className="text-gray-300 text-sm mb-1 block">Content</label>
//           <textarea
//             rows={6}
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="input"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="btn-primary flex items-center gap-2 disabled:bg-indigo-400"
//         >
//           {isSubmitting ? (
//             <span className="flex items-center gap-2">
//               <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//               Saving...
//             </span>
//           ) : (
//             <>
//               <Save className="w-4 h-4" /> Save Changes
//             </>
//           )}
//         </button>
//       </form>
//     </section>
//   );
// }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChapterEditor from '@/components/Editor';
import { updateChapter } from '@/actions/chaptersActions';
import { Button } from '@/components/ui/button';

type EditChapterPageProps = {
  chapter: {
    _id: string;
    title: string;
    content: string;
  };
};

export default function EditChapterPage({ chapter }: EditChapterPageProps) {
  const router = useRouter();
  const [title, setTitle] = useState(chapter.title);
  const [content, setContent] = useState(chapter.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const res = await updateChapter(chapter._id, { title, content });

    if (res.success) {
      router.push('/dashboard/chapters');
    } else {
      setError(res.message || 'Something went wrong.');
    }

    setIsSubmitting(false);
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-200 mb-4">Edit Chapter</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="text-gray-300 block mb-1">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 block mb-1">Content</label>
          <ChapterEditor content={content} onChange={setContent} />
        </div>

        {error && <p className="text-red-400">{error}</p>}

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting} className='cursor-pointer hover:bg-indigo-600'>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
                Saving...
              </span>
            ) : 'Save Changes'}
          </Button>
          <Button variant="secondary" type="button" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </section>
  );
}
