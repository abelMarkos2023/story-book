'use client';

import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

type ChapterContentProps = {
  content: string;
};

export default function ChapterContent({ content }: ChapterContentProps) {
  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    // sanitize HTML content before rendering
    const clean = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });
    setSanitizedContent(clean);
  }, [content]);

  return (
    <div
      className="prose prose-invert max-w-none text-gray-200 prose-img:rounded-xl prose-img:shadow-lg"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
