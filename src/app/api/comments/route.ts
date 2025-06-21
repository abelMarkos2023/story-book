import { NextResponse } from 'next/server';
import {connectToDatabase} from '@/app/lib/mongodb';
import Comment from '@/models/Comment';
import { auth } from '@/app/lib/auth';

export async function POST(req: Request) {
  await connectToDatabase();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { chapterId, content } = await req.json();
  if (!content) return NextResponse.json({ error: 'Empty comment' }, { status: 400 });

  const newComment = await Comment.create({
    user: session.user.id,
    chapter: chapterId,
    content,
  });

  return NextResponse.json(newComment);
}

// export async function GET(req: Request) {
//   await connectToDatabase();
//   const { searchParams } = new URL(req.url);
//   const chapterId = searchParams.get('chapter');

//   if (!chapterId) return NextResponse.json({ error: 'Missing chapterId' }, { status: 400 });

//   const comments = await Comment.find({ chapter: chapterId })
//     .populate('user', 'name image')
//     .sort({ createdAt: -1 });

//   return NextResponse.json(comments);
// }

export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const chapterId = searchParams.get('chapter');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '5', 10);

  if (!chapterId) return NextResponse.json({ error: 'Missing chapterId' }, { status: 400 });

  const skip = (page - 1) * limit;

  const comments = await Comment.find({ chapter: chapterId })
    .populate('user', 'name image')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Comment.countDocuments({ chapter: chapterId });

  return NextResponse.json({ comments, total });
}

