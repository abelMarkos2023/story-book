import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Book from "@/models/Book";
import Chapter from "@/models/Chapter";
import User from "@/models/User";
import Comment from "@/models/Comment";

export async function GET() {
  await connectToDatabase();

  const booksCount = await Book.countDocuments();
  const chaptersCount = await Chapter.countDocuments();
  const usersCount = await User.countDocuments();
  const commentsCount = await Comment.countDocuments();

  return NextResponse.json({
    books: booksCount,
    chapters: chaptersCount,
    users: usersCount,
    comments: commentsCount,
  });
}
