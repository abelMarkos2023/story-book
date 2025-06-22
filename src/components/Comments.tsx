

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Comment from '@/types/Comment';
import { stringToHslColor } from '@/lib/utils';


export function timeAgo(dateString: string): string {
  // Validate input
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error('Invalid date string:', dateString);
    return 'Invalid date';
  }

  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // seconds

  // Define intervals for time units
  const intervals: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, 'second'], // seconds
    [60, 'minute'], // minutes
    [24, 'hour'],   // hours
    [7, 'day'],     // days
    [4.34524, 'week'], // weeks (~30.42 days/month)
    [12, 'month'],  // months
    [Number.POSITIVE_INFINITY, 'year'], // years
  ];

  let duration = diff;
  let unit: Intl.RelativeTimeFormatUnit = 'second';

  // Find appropriate time unit
  for (const [threshold, timeUnit] of intervals) {
    if (duration < threshold) {
      unit = timeUnit;
      break;
    }
    duration /= threshold;
  }

  // Use Math.round for more natural output (e.g., 59.9s -> 1min)
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  return rtf.format(-Math.round(duration), unit);
}

export default function CommentSection({ chapterId }: { chapterId: string }) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const fetchComments = async (pageNum = 1) => {
    const res = await fetch(`/api/comments?chapter=${chapterId}&page=${pageNum}&limit=${limit}`);
    const data = await res.json();
    if (pageNum === 1) {
      setComments(data.comments);
    } else {
      setComments((prev) => [...prev, ...data.comments]);
    }
    setTotal(data.total);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
        try {
            setSubmitting(true);
      await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chapterId, content }),
    });

    setContent('');
    fetchComments(1); // reload from first page

        } catch (error) {
            console.log(error)
        }finally{
            setSubmitting(false);
        }
   
};

  useEffect(() => {
    fetchComments(1);
  }, [chapterId]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchComments(nextPage);
  };

  const hasMore = comments.length < total;

  return (
    <div className="mt-12 max-w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-300">💬 Comments</h2>

      {session ? (
        <form onSubmit={handleSubmit} className="flex max-w-full gap-1 sm:gap-2 mb-6">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="sm:flex-1 px-1 sm:px-4 py-2 rounded bg-gray-800 text-white focus:ring-2 ring-yellow-400"
          />
          <button
            type="submit"
            className="px-1 sm:px-4 py-2 rounded bg-yellow-500 text-black font-semibold hover:bg-yellow-600"
          >
             {submitting ? (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          'Comment'
        )}
          </button>
        </form>
      ) : (
        <p className="text-gray-400">You must be signed in to comment.</p>
      )}

      <div className="space-y-4">
        {comments.map((comment:Comment) => (
          <div key={comment._id} className="p-3 bg-gray-800 rounded-lg text-gray-300 flex items-start gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold"
              style={{
                backgroundColor: stringToHslColor(
                  comment.user?.name || "User",
                  50,
                  60
                ),
              }}
            >
              {comment.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-medium">{comment.user?.name || 'Anonymous'}</p>
              <p className="text-sm text-gray-400">{timeAgo(comment.createdAt)}</p>
              <p className="mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={handleLoadMore}
          className="mt-6 w-full cursor-pointer py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
        >
          Load More Comments
        </button>
      )}
    </div>
  );
}
