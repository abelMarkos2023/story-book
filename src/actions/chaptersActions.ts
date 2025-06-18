
'use server';

import { connectToDatabase } from '@/app/lib/mongodb';
import Chapter from '@/models/Chapter';
import { revalidatePath } from 'next/cache';

// Type for lean() output (plain JS object with ObjectIds and Dates)


export async function deleteChapter(id: string) {
  await connectToDatabase();
  try {
    await Chapter.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error('deleteChapter error:', error);
    return { success: false, error: 'Failed to delete chapter' };
  }
}


export async function updateChapter(chapterId: string, data: { title: string; content: string; }) {
  try {
    await connectToDatabase();

    await Chapter.findByIdAndUpdate(chapterId, {
      title: data.title,
      content: data.content,
    });

    // Optional: revalidate cache paths for dashboard list or chapter detail
    revalidatePath('/dashboard/chapters');

    return { success: true };
  } catch (error) {
    console.error('Failed to update chapter:', error);
    return { success: false, message: 'Something went wrong' };
  }
}
