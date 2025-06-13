import { connectToDatabase } from "@/app/lib/mongodb";
import Chapter from "@/models/Chapter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  try {
    const chapter = await Chapter.findById(params.id).populate('book');
    return NextResponse.json(chapter);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
  }
}
