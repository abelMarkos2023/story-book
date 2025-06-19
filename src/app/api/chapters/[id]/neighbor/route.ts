import { NextResponse } from 'next/server';
import {connectToDatabase} from '@/app/lib/mongodb';
import Chapter from '@/models/Chapter';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();

  const {id} = await params;

  const currentChapter = await Chapter.findById(id);
  if (!currentChapter) {
    return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
  }

  const previous = await Chapter.findOne({ createdAt: { $lt: currentChapter.createdAt } })
    .sort({ createdAt: -1 })
    .select('_id title');

  const next = await Chapter.findOne({ createdAt: { $gt: currentChapter.createdAt } })
    .sort({ createdAt: 1 })
    .select('_id title');

  return NextResponse.json({success:true, previous, next });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: 'Failed to fetch neighbors' }, { status: 500 });
  }
}
