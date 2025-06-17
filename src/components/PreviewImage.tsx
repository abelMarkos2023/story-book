'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface PreviewImageProps {
  file: File | null;
  defaultImage: string | undefined;
}

export default function PreviewImage({ file, defaultImage }: PreviewImageProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(defaultImage);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url); // Cleanup
    } else {
      setPreviewUrl(defaultImage);
    }
  }, [file, defaultImage]);

  if (!previewUrl) {
    return <p className="mt-2 text-sm text-gray-400">No image selected</p>;
  }

  return (
    <div className="mt-2">
      <Image
        src={previewUrl}
        alt="Book cover preview"
        width={128}
        height={128}
        className="object-cover rounded"
      />
    </div>
  );
}