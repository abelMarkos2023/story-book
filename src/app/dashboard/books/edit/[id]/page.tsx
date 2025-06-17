import { connectToDatabase } from '@/app/lib/mongodb';
import { auth } from '@/app/lib/auth';
import Book from '@/models/Book';
import { redirect } from 'next/navigation';
import EditBookForm from '@/components/EditBook';

export default async function EditBookPage({ params }: { params: Promise<{id:string}> }) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    redirect('/auth/login');
  }

  const {id} = await params;
  await connectToDatabase();
  const book = await Book.findById(id);

  if (!book) {
    redirect('/dashboard/books');
  }

  return (
    <div className="container sm:mx-auto p-3 sm:p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Edit Book</h1>
      <EditBookForm
        book={{
          _id: book._id.toString(),
          title: book.title,
          description: book.description || '',
          coverImage: book.coverImage || '',
          status: book.status,
        }}
      />
    </div>
  );
}