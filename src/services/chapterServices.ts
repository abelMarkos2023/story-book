// lib/chapterService.ts
import Chapter from '@/models/Chapter';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function getChapterById(id: string) {
  await connectToDatabase();
  const chapter = await Chapter.findById(id).populate('book');
  return JSON.parse(JSON.stringify(chapter));  // clean for client props
}
