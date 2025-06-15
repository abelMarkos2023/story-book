// src/types/next-auth.d.ts
// import { DefaultSession } from 'next-auth';
// import type { User, AdapterUser } from 'next-auth';
import { DefaultSession, User, AdapterUser } from 'next-auth'; // eslint-disable-line @typescript-eslint/no-unused-vars
declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // MongoDB ObjectId as string
      role: 'admin' | 'user';
    } & DefaultSession['user'];
  }

  interface User {
    id?: string;
    role?: 'admin' | 'user';
  }

  interface AdapterUser {
    id?: string;
    _id?: string; // MongoDB ObjectId
    role?: 'admin' | 'user';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: 'admin' | 'user';
  }
}