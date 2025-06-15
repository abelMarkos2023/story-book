// import { connectToDatabase } from "@/app/lib/mongodb";
// import Chapter from "@/models/Chapter";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   await connectToDatabase();
//   const { id } = await params; // Await params to resolve the id
//   try {
//     const chapters = await Chapter.find({ book: id }).sort({ createdAt: 1 });
//     return NextResponse.json(chapters);
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from 'next/server';
// import { connectToDatabase } from '@/app/lib/mongodb';
// import { auth } from '@/app/lib/auth';
// import Chapter from '@/models/Chapter';
// import Book from '@/models/Book'; // Import to avoid schema registration error
// import mongoose from 'mongoose';

// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   // Check authentication
//   const session = await auth();
//   console.log(Book)
//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   // Optional: Restrict to admins
//   // if (session.user.role !== 'admin') {
//   //   return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
//   // }

//   await connectToDatabase();
//     const { id } = params; // No await needed

//   try {

//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
//     }

//     const chapters = await Chapter.find({ book: id }).sort({ createdAt: 1 });
//     return NextResponse.json(chapters);
//   } catch (error: unknown) {
//     console.error('Error fetching chapters for book', id, ':', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json({ error: `Failed to fetch chapters: ${errorMessage}` }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import { auth } from '@/app/lib/auth';
import Chapter from '@/models/Chapter';
import Book from '@/models/Book';
import mongoose from 'mongoose';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

  console.log(Book)
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();

  try {

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
    }

    const chapters = await Chapter.find({ book: id }).sort({ createdAt: 1 });
    return NextResponse.json(chapters);
  } catch (error: unknown) {
    console.error('Error fetching chapters for book:', { id, error });
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Failed to fetch chapters: ${errorMessage}` }, { status: 500 });
  }
}