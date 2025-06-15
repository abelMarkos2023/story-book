import { connectToDatabase } from "@/app/lib/mongodb";
import Chapter from "@/models/Chapter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: {params:Promise<{ id: string }>} ) {
  await connectToDatabase();

  const {id} = await params;
  try {
    const chapter = await Chapter.findById(id).populate('book');
    return NextResponse.json(chapter);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
  }
}
