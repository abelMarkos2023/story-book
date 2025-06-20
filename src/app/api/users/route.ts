import { NextResponse } from 'next/server';
import {connectToDatabase} from '@/app/lib/mongodb';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

export async function GET() {

    const session = await getServerSession(authOptions);
     if (!session || session.user.role !== 'admin') {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
     }
  await connectToDatabase();
  const users = await User.find();
  return NextResponse.json(users);
}
