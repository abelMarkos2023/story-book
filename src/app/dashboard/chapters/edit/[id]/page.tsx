// app/dashboard/chapters/[id]/edit/page.tsx

import { getChapterById } from '@/services/chapterServices';
import EditChapterPage from '@/components/EditChapterPage';

export default async function EditChapterRoute({ params }: { params: { id: string } }) {
  const chapter = await getChapterById(params.id);

  if (!chapter) {
    return <p className="text-gray-300">Chapter not found</p>;
  }

  return <EditChapterPage chapter={chapter} />;
}
