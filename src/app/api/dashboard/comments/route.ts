import { connectToDatabase } from "@/app/lib/mongodb";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
  await connectToDatabase();

  // Get query params for page & limit, with defaults
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") as string) || 1;
  const limit = parseInt(searchParams.get("limit") as string) || 10;

  const skip = (page - 1) * limit;

  // Get total count for pagination metadata
  const totalComments = await Comment.countDocuments();

  // Fetch paginated comments with sorting and population
  const comments = await Comment.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("user", "name")
    .populate("chapter", "title")
    .populate("book", "title");

  // Return paginated response
  return NextResponse.json({
    currentPage: page,
    totalPages: Math.ceil(totalComments / limit),
    totalComments,
    comments,
  });
}
