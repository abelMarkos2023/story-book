import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Book from '@/models/Book';

export async function POST(request: NextRequest) {
  await connectToDatabase();

  try {
    const { title, description, coverImage, author,createdBy } = await request.json();

    console.log(title,description,coverImage,author,createdBy)

    if (!title || !coverImage || !author) {
      return NextResponse.json({ error: 'Title, cover image, and author are required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
      return NextResponse.json({ error: 'Invalid author ID' }, { status: 400 });
    }

    console.log('author' ,author)
    const newBook = await Book.create({
      title,
      description,
      coverImage,
      createdBy:new mongoose.Types.ObjectId(createdBy),
      author
    //   createdBy: new mongoose.Types.ObjectId(author),
    });

    return NextResponse.json(newBook);
  } catch (err) {
    console.error('Book creation failed:', err);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}
