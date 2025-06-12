// app/admin/page.tsx
import { auth } from "@/app/lib/auth";

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return <div>Access denied. Admins only.</div>;
  }
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session.user.name} (Admin)</p>
    </div>
  );
}