import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Book from "@/models/Book";

export async function GET(){
    await connectToDatabase()
    const books = await Book.find({});
    return NextResponse.json(books);
}