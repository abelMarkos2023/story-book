// src/components/SafeImage.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function SafeImage({ src, alt, className }: SafeImageProps) {
  const [error, setError] = useState(false);
  const defaultImage = 'https://res.cloudinary.com/dgaox9jia/image/upload/v1749854304/book-covers/icz21fua7arnkwitstqs.png';

  if (error || !src) {
    return (
      <Image
        src={defaultImage}
        alt={alt}
        height={480}
        width={480}
        className={className}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={128}
      height={128}
      className={className}
      onError={() => setError(true)}
    />
  );
}