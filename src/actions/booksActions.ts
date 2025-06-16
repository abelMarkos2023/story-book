'use server';

import { connectToDatabase } from '@/app/lib/mongodb';
import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import cloudinary from '@/app/lib/cloudinary';
import { extractPublicId } from '@/app/lib/extractPublicId';
import { revalidatePath } from 'next/cache';

export async function deleteBook( id:string) {
  try {
    await connectToDatabase();

    const book = await Book.findById(id);
    if (!book) {
      return { message: 'Book not found' };
    }

    // 1️⃣ Delete cover image if it exists
    if (book.coverImage) {
      const publicId = extractPublicId(book.coverImage);
      await cloudinary.uploader.destroy(publicId);
    }

    // 2️⃣ Delete all chapters associated with the book
    await Chapter.deleteMany({ book: book._id });

    // 3️⃣ Delete the book itself
    await Book.findByIdAndDelete(book._id);

    // 4️⃣ Revalidate the books dashboard page
    revalidatePath('/dashboard/books');

    return { message: 'Book and associated chapters deleted',success:true };
  } catch (error) {
    console.error('Failed to delete book:', error);
    return { message: 'Failed to delete book',success:false };
  }
}
