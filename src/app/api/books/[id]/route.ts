import { connectToDatabase } from "@/app/lib/mongodb";
import Book from "@/models/Book";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();

  const { id } = await params;
  try {
    const book = await Book.findById(id);
    return NextResponse.json(book);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
}
