
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function CreateBook() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const {data:session} = useSession()
  const router = useRouter();

      console.log('session user',session?.user);
  if(!session?.user){
    router.push('/auth/login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const author = session?.user?.name
    const createdBy = session?.user?.id

    console.log(author,createdBy,title,description,coverImage)


    try {
      let imageUrl = '';

      if (coverImage) {
        const formData = new FormData();
        formData.append('file', coverImage);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
      }

      console.log(title, description, coverImage, imageUrl);
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          coverImage: imageUrl,
          author,
          createdBy
        }),
      });

      const data = await res.json();

      // redirect to new book page
    
         router.push(`/dashboard/books/${data._id}`);

      
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg p-4 bg-gray-900 text-white rounded-lg space-y-4 mt-20">
      <h2 className="text-2xl font-bold">Add New Book</h2>
      
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded bg-gray-800"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 rounded bg-gray-800"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
        className="w-full p-2 rounded bg-gray-800"
      />

      <button
        type="submit"
        className={`flex items-center justify-center gap-2 ${
          uploading ? 'bg-yellow-400' : 'bg-yellow-500 hover:bg-yellow-600'
        } text-black font-bold py-2 px-4 rounded w-full`}
        disabled={uploading}
      >
        {uploading && (
          <svg
            className="animate-spin h-5 w-5 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        )}
        {uploading ? 'Creating...' : 'Create Book'}
      </button>
    </form>
  );
}
