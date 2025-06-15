import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Chapter from '@/models/Chapter';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  await connectToDatabase();

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, bookId, content } = await request.json();

  // Validate
  if (!title || !bookId || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const newChapter = await Chapter.create({
      title,
      book: new mongoose.Types.ObjectId(bookId),
      content,
      createdBy: new mongoose.Types.ObjectId(session.user.id),
    });

    return NextResponse.json(newChapter, { status: 201 });
  } catch (error) {
    console.error('Chapter creation failed:', error);
    return NextResponse.json({ error: 'Failed to create chapter' }, { status: 500 });
  }
}
