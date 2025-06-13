// import { connectToDatabase } from "@/app/lib/mongodb";
// import Book from '@/models/Book';
// import Chapter from "@/models/Chapter";
// import { NextResponse } from "next/server";

// export async function GET() {
//   await connectToDatabase();
//   try {
//     const chapters = await Chapter.find().populate('book').sort({ createdAt: -1 });
//     return NextResponse.json(chapters);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
//   }
// }
// src/app/api/chapters/all-chapters/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Chapter from '@/models/Chapter';
import Book from '@/models/Book';
import { auth } from '@/app/lib/auth'; // From your NextAuth.js setup

export async function GET() {
  // Authenticate user (optional, based on your requirements)
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  try {
    console.log('Fetching chapters with populated book field...');
    const chapters = await Chapter.find().populate('book').sort({ createdAt: -1 });
    console.log('Chapters fetched:', chapters.length);
    return NextResponse.json(chapters);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
  }
}