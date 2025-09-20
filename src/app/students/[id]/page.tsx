"use client";

import StudentDetail from "@/app/components/StudentDetail";
import Link from "next/link";


type Props = {
  params: {
    id: string;
  };
};


export default function StudentDetailPage({ params }: Props) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              รายละเอียดนักเรียน
            </h1>
            <nav>
              <Link
                href="/students"
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-md hover:shadow-lg font-medium"
              >
                ← กลับไปรายชื่อ
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        <StudentDetail id={id} />
      </main>
    </div>
  );
}
