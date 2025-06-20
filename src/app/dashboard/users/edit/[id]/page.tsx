'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      setName(data.name);
      setEmail(data.email);
      setRole(data.role);
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role }),
      });
      if (res.ok) {
        router.push('/dashboard/users');
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-100">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 text-gray-400 hover:text-yellow-400 transition"
      >
        <ArrowLeft size={22} /> Back to Users
      </button>

      <h1 className="text-3xl font-bold mb-6">Edit User</h1>

      <div className="space-y-5">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 mt-4"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
