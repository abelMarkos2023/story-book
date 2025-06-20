import { NextResponse } from 'next/server';
import {connectToDatabase} from '@/app/lib/mongodb';
import User from '@/models/User';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();

  const { id } = await params;
  try {
    const user = await User.findById(id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  const data = await request.json();

  const { id } = await params;

  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();

  const { id } = await params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
