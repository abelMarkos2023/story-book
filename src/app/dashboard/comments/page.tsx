'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Comment = {
  _id: string;
  content: string;
  user: { name: string };
  chapter?: { title: string };
  book?: { title: string };
  createdAt: string;
};

type CommentResponse = {
  comments: Comment[];
  currentPage: number;
  totalPages: number;
  totalComments: number;
};

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error('Invalid date string:', dateString);
    return 'Invalid date';
  }

  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;
  const intervals: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
    [4.34524, 'week'],
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'year'],
  ];

  let duration = diff;
  let unit: Intl.RelativeTimeFormatUnit = 'second';

  for (const [threshold, timeUnit] of intervals) {
    if (duration < threshold) {
      unit = timeUnit;
      break;
    }
    duration /= threshold;
  }

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  return rtf.format(-Math.round(duration), unit);
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchComments = async (page = 1) => {
    setLoading(true);
    const res = await fetch(`/api/dashboard/comments?page=${page}&limit=10`);
    const data: CommentResponse = await res.json();
    setComments(data.comments);
    setCurrentPage(data.currentPage);
    console.log(data)
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    setDeletingId(id);
    await fetch(`/api/dashboard/comments/${id}`, { method: 'DELETE' });
    await fetchComments(currentPage);
    setDeletingId(null);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    fetchComments(newPage);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-3 text-gray-200">
      <h1 className="text-3xl font-bold mb-6">📝 All Comments</h1>
      <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-800">
        {/* Big Screens */}
        <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full border-collapse  min-w-[767px]">
          <thead className="bg-gray-900 text-sm text-gray-400">
            <tr>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Comment</th>
              <th className="p-2">Chapter / Book</th>
              <th className="p-2">Posted</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr
                key={comment._id}
                className="border-t border-gray-800 hover:bg-gray-800"
              >
                <td className="p-2 flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      backgroundColor: getRandomColor(comment.user.name),
                    }}
                  >
                    {comment.user.name.charAt(0).toUpperCase()}
                  </div>
                  {comment.user.name}
                </td>
                <td className="p-2 text-gray-300 max-w-sm truncate">
                  {comment.content}
                </td>
                <td className="p-2 text-center">
                  {comment.chapter?.title + '—' + comment.book?.title }
                </td>
                <td className="p-2 text-sm text-gray-400">
                  {timeAgo(comment.createdAt)}
                </td>
                <td className="p-2 text-center">
                  <Button
                    size="sm"
                    onClick={() => handleDelete(comment._id)}
                    disabled={deletingId === comment._id}
                    className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    {deletingId === comment._id ? 'Deleting…' : 'Delete'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {comments.length === 0 && (
          <p className="p-4 text-gray-500 text-center">No comments found.</p>
        )}
      </div>

    
     </div>

     {/* Card list for mobile */}
<div className="lg:hidden space-y-4">
  {comments.map((comment) => (
    <div
      key={comment._id}
      className="border border-gray-800 rounded-lg p-4 bg-gray-900"
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{
            backgroundColor: getRandomColor(comment.user.name),
          }}
        >
          {comment.user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-gray-200 font-medium">{comment.user.name}</span>
      </div>
      <p className="text-gray-300 text-sm mb-2">{comment.content}</p>
      <p className="text-gray-400 text-xs">
        {comment.chapter?.title || comment.book?.title || '—'}
      </p>
      <p className="text-gray-500 text-xs">{timeAgo(comment.createdAt)}</p>
      <Button
        size="sm"
        onClick={() => handleDelete(comment._id)}
        disabled={deletingId === comment._id}
        className="mt-3 bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
      >
        <Trash2 size={16} />
        {deletingId === comment._id ? 'Deleting…' : 'Delete'}
      </Button>
    </div>
  ))}

  {comments.length === 0 && (
    <p className="text-gray-500 text-center">No comments found.</p>
  )}
</div>

        {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          Previous
        </Button>
        <span className="text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function getRandomColor(seed: string) {
  const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
  const index = seed.charCodeAt(0) % colors.length;
  return colors[index];
}

