// app/components/UserProfile.tsx
"use client";

import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Please sign in.</div>;

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>
      <p>User ID: {session?.user?.id}</p>
      <p>Role: {session?.user?.role}</p>
    </div>
  );
}