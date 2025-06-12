"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

    console.log("SESSION STATUS", status);
  console.log("SESSION DATA", session);

  useEffect(() => {
    if (status === "loading") return; // don't redirect while still loading
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome {session?.user?.name}</h1>
    </div>
  );
}
