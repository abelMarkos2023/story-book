'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { BookOpen, FileText, Users, MessageSquare } from 'lucide-react';
import CountUp from "@/components/CountUp";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    books: 0,
    chapters: 0,
    users: 0,
    comments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/dashboard/stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  const cardClasses = "bg-gray-900 border border-gray-800 shadow-xl rounded-xl p-4 transition transform hover:-translate-y-1 hover:shadow-2xl hover:border-blue-600 duration-300";

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">
<div className="flex items center justify-between">
          <h1 className="text-3xl font-bold mb-8 mt-8">📊 Dashboard Overview</h1>
          <span className="text-xl">{session?.user?.name}</span>
</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className={cardClasses}>
            <CardHeader className="flex items-center gap-3">
              <BookOpen className="text-blue-400" size={28} />
              <CardTitle className="text-gray-300 text-lg">Books</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-blue-400">
                <CountUp end={stats.books} />
              </p>
              <p className="text-gray-500 mt-1 text-sm">Total Books</p>
            </CardContent>
          </Card>

          <Card className={cardClasses}>
            <CardHeader className="flex items-center gap-3">
              <FileText className="text-purple-400" size={28} />
              <CardTitle className="text-gray-300 text-lg">Chapters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-purple-400">
                <CountUp end={stats.chapters} />
              </p>
              <p className="text-gray-500 mt-1 text-sm">Total Chapters</p>
            </CardContent>
          </Card>

          <Card className={cardClasses}>
            <CardHeader className="flex items-center gap-3">
              <Users className="text-green-400" size={28} />
              <CardTitle className="text-gray-300 text-lg">Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-green-400">
                <CountUp end={stats.users} />
              </p>
              <p className="text-gray-500 mt-1 text-sm">Registered Users</p>
            </CardContent>
          </Card>

          <Card className={cardClasses}>
            <CardHeader className="flex items-center gap-3">
              <MessageSquare className="text-pink-400" size={28} />
              <CardTitle className="text-gray-300 text-lg">Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-pink-400">
                <CountUp end={stats.comments} />
              </p>
              <p className="text-gray-500 mt-1 text-sm">User Comments</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => router.push('/dashboard/create-book')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            📖 Create New Book
          </Button>
          <Button
            onClick={() => router.push('/dashboard/add-chapter')}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            📚 Add Chapter
          </Button>
        </div>
      </main>
    </div>
  );
}


// 'use client';

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import { useSession } from "next-auth/react";
// import { motion } from "framer-motion";
// import CountUp from "@/components/CountUp";
// import { BookOpen, FileText, Users, MessageSquare } from "lucide-react";

// export default function DashboardPage() {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [stats, setStats] = useState({
//     books: 0,
//     chapters: 0,
//     users: 0,
//     comments: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await fetch('/api/dashboard/stats');
//         const data = await res.json();
//         setStats(data);
//       } catch (error) {
//         console.error('Failed to fetch stats:', error);
//       }
//     };

//     fetchStats();
//   }, []);

//   const cardData = [
//     { label: "Books", value: stats.books, color: "text-blue-400", icon: BookOpen, progress: 60 },
//     { label: "Chapters", value: stats.chapters, color: "text-purple-400", icon: FileText, progress: 75 },
//     { label: "Users", value: stats.users, color: "text-green-400", icon: Users, progress: 90 },
//     { label: "Comments", value: stats.comments, color: "text-pink-400", icon: MessageSquare, progress: 45 },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-950 text-gray-100">
//       <Navbar />

//       <main className="max-w-7xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-8 my-8">📊 Dashboard Overview</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {cardData.map((card, i) => (
//             <motion.div
//               key={card.label}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.15, duration: 0.5 }}
//             >
//               <Card className="bg-gray-900 border-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300">
//                 <CardHeader className="flex flex-row items-center justify-between pb-2">
//                   <CardTitle className="text-gray-300 text-lg">{card.label}</CardTitle>
//                   <card.icon size={24} className={card.color} />
//                 </CardHeader>
//                 <CardContent>
//                   <p className={`text-4xl font-bold ${card.color}`}>
//                     <CountUp end={card.value} duration={1.5} />
//                   </p>
//                   {/* Progress bar */}
//                   <div className="w-full h-2 mt-4 bg-gray-800 rounded">
//                     <div
//                       className="h-2 rounded"
//                       style={{
//                         width: `${card.progress}%`,
//                         backgroundColor: card.color.replace('text-', '')
//                       }}
//                     />
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">{card.progress}% of goal</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         <div className="flex flex-wrap gap-4">
//           <Button onClick={() => router.push('/dashboard/create-book')} className="bg-blue-600 hover:bg-blue-700 text-white">
//             📖 Create New Book
//           </Button>
//           <Button onClick={() => router.push('/dashboard/add-chapter')} className="bg-purple-600 hover:bg-purple-700 text-white">
//             📚 Add Chapter
//           </Button>
//         </div>
//       </main>
//     </div>
//   );
// }
