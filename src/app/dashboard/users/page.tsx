'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
// import Link from 'next/link';
import User from '@/types/User';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user.role !== 'admin') {
      router.push('/dashboard'); // redirect non-admins
      return;
    }

    const fetchUsers = async () => {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user?')) return;
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    setUsers(users.filter((u:User) => u._id !== id));
  };

  return (
    // <div className="p-6 text-gray-200">
    //   <div className="flex justify-between mb-6">
    //     <h1 className="text-3xl font-bold">Users</h1>
    //     <Link href="/dashboard/users/new" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white flex items-center gap-2">
    //       <UserPlus size={18} /> Add User
    //     </Link>
    //   </div>

    //   <div className="overflow-x-auto">
    //     <table className="w-full min-w-[600px] text-left border-collapse bg-gray-800 rounded-lg">
    //       <thead className="text-gray-400 text-sm">
    //         <tr>
    //           <th className="p-3">Name</th>
    //           <th className="p-3">Email</th>
    //           <th className="p-3">Role</th>
    //           <th className="p-3">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {users.map((user: User) => (
    //           <tr key={user._id} className="border-t border-gray-700 hover:bg-gray-700">
    //             <td className="p-3">{user.name}</td>
    //             <td className="p-3">{user.email}</td>
    //             <td className="p-3 capitalize">{user.role}</td>
    //             <td className="p-3 flex gap-2">
    //               <Link
    //                 href={`/dashboard/users/edit/${user._id}`}
    //                 className="px-3 py-1.5 text-sm bg-indigo-600 rounded hover:bg-indigo-700 flex items-center gap-1"
    //               >
    //                 <Pencil size={14} /> Edit
    //               </Link>
    //               <button
    //                 onClick={() => handleDelete(user._id)}
    //                 className="px-3 py-1.5 text-sm bg-red-600 rounded hover:bg-red-700 flex items-center gap-1"
    //               >
    //                 <Trash2 size={14} /> Delete
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>

    <div className=" w-full ">
         <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-bold">Users</h1>
             
        </div>
        <div className="overflow-x-auto hidden md:block">
  <table className="w-full table-fixed border-collapse bg-gray-800 rounded-lg">
    <thead className="text-gray-400 text-md">
      <tr>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Email</th>
        <th className="p-3 text-left">Role</th>
        <th className="p-3 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user: User) => (
        <tr key={user._id} className="border-t border-gray-700 hover:bg-gray-700">
          <td className="p-3 text-gray-200">{user.name}</td>
          <td className="p-3 text-gray-400 text-sm">{user.email}</td>
          <td className="p-3 text-gray-400 text-center">{user.role}</td>
          <td className="p-3 flex gap-2">
            {/* Buttons here */}
             <div className="flex gap-2">
          <button
            onClick={() => router.push(`/dashboard/users/edit/${user._id}`)}
            className="cursor-pointer px-3 py-1.5 text-sm bg-indigo-600 rounded hover:bg-indigo-700 flex items-center gap-1"
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={() => handleDelete(user._id)}
            className="cursor-pointer px-3 py-1.5 text-sm bg-red-600 rounded hover:bg-red-700 flex items-center gap-1"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

     

  {/* Mobile Card View */}
  <div className="md:hidden flex flex-col gap-4">
    {users.map((user: User) => (
      <div key={user._id} className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-yellow-400">{user.name}</h2>
          <span className="text-sm bg-gray-700 text-gray-300 px-2 py-0.5 rounded">{user.role}</span>
        </div>
        <p className="text-gray-400 mb-2">{user.email}</p>
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/dashboard/users/edit/${user._id}`)}
            className="px-3 py-1.5 text-sm bg-indigo-600 rounded hover:bg-indigo-700 flex items-center gap-1"
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={() => handleDelete(user._id)}
            className="px-3 py-1.5 text-sm bg-red-600 rounded hover:bg-red-700 flex items-center gap-1"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

