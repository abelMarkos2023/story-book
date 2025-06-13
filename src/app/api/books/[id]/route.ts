import { connectToDatabase } from "@/app/lib/mongodb";
import Book from "@/models/Book";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  try {
    const book = await Book.findById(params.id);
    return NextResponse.json(book);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
}
