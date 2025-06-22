import { connectToDatabase } from "@/app/lib/mongodb";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectToDatabase();
    const { id } = await params;
    await Comment.findByIdAndDelete(id);
    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });

}