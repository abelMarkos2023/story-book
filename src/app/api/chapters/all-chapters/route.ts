
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Chapter from '@/models/Chapter';
import Book from '@/models/Book';
// import { auth } from '@/app/lib/auth'; // From your NextAuth.js setup

console.log(Book)
// export async function GET() {
//   // Authenticate user (optional, based on your requirements)
//   // const session = await auth();
//   // if (!session) {
//   //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   // }

//   await connectToDatabase();
//   try {
//     console.log('Fetching chapters with populated book field...');
//     const chapters = await Chapter.find().populate('book').sort({ createdAt: -1 });
//     console.log('Chapters fetched:', chapters.length);
//     return NextResponse.json(chapters);
//   } catch (error) {
//     console.error('Error fetching chapters:', error);
//     return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
//   }
// }



export async function GET(req: NextRequest) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');

  const skip = (page - 1) * limit;

  try {
    console.log(`Fetching chapters page ${page} with limit ${limit}...`);

    const totalChapters = await Chapter.countDocuments();
    const totalPages = Math.ceil(totalChapters / limit);

    const chapters = await Chapter.find()
      .populate('book')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();  // Always lean for JSON serialization

    console.log(`Fetched ${chapters.length} chapters`);

    return NextResponse.json({
      chapters,
      currentPage: page,
      totalPages,
      totalChapters
    });

  } catch (error) {
    console.error('Error fetching chapters:', error);
    return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
  }
}
