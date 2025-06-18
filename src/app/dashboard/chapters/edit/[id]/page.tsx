// app/dashboard/chapters/[id]/edit/page.tsx

import { getChapterById } from '@/services/chapterServices';
import EditChapterPage from '@/components/EditChapterPage';

export default async function EditChapterRoute({ params }: { params: Promise<{ id: string }> }) {

  const {id} = await params;
  const chapter = await getChapterById(id);

  if (!chapter) {
    return <p className="text-gray-300">Chapter not found</p>;
  }

  return <EditChapterPage chapter={chapter} />;
}
