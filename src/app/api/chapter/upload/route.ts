import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/app/lib/cloudinary';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get('file') as File;
  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadedImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: 'chapter-images' }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
      .end(buffer);
  });

  return NextResponse.json(uploadedImage);
}
