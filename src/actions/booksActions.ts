'use server';

import { connectToDatabase } from '@/app/lib/mongodb';
import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import cloudinary from '@/app/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';
import { auth } from '@/app/lib/auth';


interface FormState {
  error: string | null;
  success?: boolean;
  redirectTo?: string;
}

async function uploadImage(file: File): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error('No valid file provided');
  }
  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    throw new Error('File size exceeds 10MB');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: 'book-covers' }, (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(new Error(`Image upload failed: ${error.message || 'Unknown error'}`));
        } else if (result && result.secure_url) {
          resolve(result.secure_url);
        } else {
          reject(new Error('No secure URL returned'));
        }
      })
      .end(buffer);
  });
}

async function deleteImage(imageUrl: string | undefined): Promise<void> {
  if (!imageUrl) return;

  try {
    const publicId = imageUrl
      .split('/')
      .slice(-2)
      .join('/')
      .split('.')[0]; // e.g., "book-covers/sample"
    await cloudinary.uploader.destroy(publicId);
    console.log('Deleted old image:', publicId); // Debug log
  } catch (error) {
    console.error('Failed to delete old image:', error); // Log but don't throw
  }
}

export async function updateBook(_state: FormState, formData: FormData): Promise<FormState> {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return { error: 'Unauthorized' };
  }

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;
  const coverImage = formData.get('coverImage') as File | null;

  // Validate inputs
  if (!id || !mongoose.isValidObjectId(id)) {
    return { error: 'Invalid book ID' };
  }
  if (!title) {
    return { error: 'Title is required' };
  }
  if (!['draft', 'published'].includes(status)) {
    return { error: 'Invalid status' };
  }

  try {
    await connectToDatabase();
    const book = await Book.findById(id);
    if (!book) {
      return { error: 'Book not found' };
    }

    // Upload image if provided
    // let imageUrl = book.coverImage;
    // if (coverImage && coverImage.size > 0) {
    //   imageUrl = await uploadImage(coverImage);
    //   console.log('New image URL:', imageUrl); // Debug log
    // }
     let imageUrl = book.coverImage;

    if (coverImage instanceof File && coverImage.size > 0) {
      // Delete old image before uploading new one
      await deleteImage(imageUrl);
      imageUrl = await uploadImage(coverImage);
      console.log('New image URL:', imageUrl); // Debug log
    } else {
      console.log('No valid cover image provided:', coverImage); // Debug log
    }

    // Update book
    book.title = title;
    book.description = description || undefined;
    book.status = status as 'draft' | 'published';
    book.coverImage = imageUrl || undefined;
    await book.save();

    console.log('Book updated:', book); // Debug log

    // Revalidate cache
    revalidatePath('/dashboard/books');
    revalidatePath('/books');
    revalidatePath(`/books/${id}`);

    // Return state with redirect instruction
    return { error: null, success: true, redirectTo: `/books/${id}` };
  } catch (error) {
    console.error('Error updating book:', error);
    return { error: error instanceof Error ? error.message : 'Failed to update book' };
  }
}

export async function deleteBook( id:string) {
  try {
    await connectToDatabase();

    const book = await Book.findById(id);
    if (!book) {
      return { message: 'Book not found' };
    }

    // 1️⃣ Delete cover image if it exists
    if (book.coverImage) {
      await deleteImage(book.coverImage);
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

interface FormState {
  error: string | null;
}

// export async function updateBook(_state: FormState, formData: FormData): Promise<FormState> {
//   const session = await auth();
//   if (!session || session.user.role !== 'admin') {
//     return { error: 'Unauthorized' };
//   }

//   const id = formData.get('id') as string;
//   const title = formData.get('title') as string;
//   const author = formData.get('author') as string;
//   const description = formData.get('description') as string;
//   const imageUrl = formData.get('imageUrl') as string;

//   // Validate inputs
//   if (!id || !mongoose.isValidObjectId(id)) {
//     return { error: 'Invalid book ID' };
//   }
//   if (!title || !author) {
//     return { error: 'Title and author are required' };
//   }

//   try {
//     await connectToDatabase();
//     const book = await Book.findById(id);
//     if (!book) {
//       return { error: 'Book not found' };
//     }

//     // Update book
//     book.title = title;
//     book.author = author;
//     book.description = description || undefined;
//     book.imageUrl = imageUrl || undefined;
//     await book.save();

//     // Revalidate cache
//     revalidatePath('/dashboard/books');
//     revalidatePath('/books');
//     revalidatePath(`/books/${id}`);

//     // Redirect on success
//     redirect('/dashboard/books');
//   } catch (error) {
//     console.error('Error updating book:', error);
//     return { error: error instanceof Error ? error.message : 'Failed to update book' };
//   }
// }

// export async function updateBook(formData: FormData) {
//   const session = await auth();
//   if (!session || session.user.role !== 'admin') {
//     throw new Error('Unauthorized');
//   }

//   const id = formData.get('id') as string;
//   const title = formData.get('title') as string;
//   const author = formData.get('author') as string;
//   const description = formData.get('description') as string;
//   const imageUrl = formData.get('imageUrl') as string;

//   // Validate inputs
//   if (!id || !mongoose.isValidObjectId(id)) {
//     throw new Error('Invalid book ID');
//   }
//   if (!title || !author) {
//     throw new Error('Title and author are required');
//   }

//   try {
//     await connectToDatabase();
//     const book = await Book.findById(id);
//     if (!book) {
//       throw new Error('Book not found');
//     }

//     // Update book
//     book.title = title;
//     book.author = author;
//     book.description = description || undefined;
//     book.imageUrl = imageUrl || undefined;
//     await book.save();

//     // Revalidate cache for book-related pages
//     revalidatePath('/dashboard/books');
//     revalidatePath('/books');
//     revalidatePath(`/books/${id}`);

//     // Redirect to books dashboard
//     redirect('/dashboard/books');
//   } catch (error) {
//     console.error('Error updating book:', error);
//     throw new Error(error instanceof Error ? error.message : 'Failed to update book');
//   }
// }