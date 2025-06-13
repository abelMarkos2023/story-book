import { connectToDatabase } from "@/app/lib/mongodb";
import Chapter from "@/models/Chapter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  try {
    const chapters = await Chapter.find({ book: params.id }).sort({ createdAt: 1 });
    return NextResponse.json(chapters);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
  }
}
