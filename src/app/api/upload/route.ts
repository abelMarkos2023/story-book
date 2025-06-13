import cloudinary from "@/app/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadedImage = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'book-covers' }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    return NextResponse.json(uploadedImage);
  } catch (err) {
    console.error('Upload failed', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
