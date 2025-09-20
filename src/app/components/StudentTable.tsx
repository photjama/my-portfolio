"use client";

import { getStudents, type Student } from "@/app/lib/store";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function StudentTable() {
  const [sortBy, setSortBy] = useState<"gpa" | "name">("gpa");
  const [sortAsc, setSortAsc] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);

  // โหลดนักเรียนจาก localStorage ทุกครั้งที่หน้าโหลด
  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "gpa") {
      return sortAsc ? a.gpa - b.gpa : b.gpa - a.gpa;
    } else {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4 text-white bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 rounded-t-xl text-center">
          รายชื่อนักเรียน
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 p-4 justify-center">
          <button
            onClick={() => {
              setSortBy("gpa");
              setSortAsc(!sortAsc);
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
          >
            เรียงตาม GPA {sortBy === "gpa" ? (sortAsc ? "↑" : "↓") : ""}
          </button>
          <button
            onClick={() => {
              setSortBy("name");
              setSortAsc(!sortAsc);
            }}
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all shadow-md hover:shadow-lg font-medium"
          >
            เรียงตามชื่อ {sortBy === "name" ? (sortAsc ? "↑" : "↓") : ""}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-center">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  ชื่อ
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  โรงเรียน
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  GPA
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  ดูเพิ่มเติม
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedStudents.map((s, index) => (
                <tr
                  key={s.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-colors duration-200`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {s.firstName} {s.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {s.school}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {s.gpa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/students/${s.id}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                    >
                      รายละเอียด →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {students.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">📝</div>
            <p className="text-xl text-gray-500">ไม่มีข้อมูลนักเรียน</p>
            <p className="text-gray-400 mt-2">เพิ่มนักเรียนใหม่เพื่อดูรายชื่อ</p>
          </div>
        )}
      </div>
    </div>
  );
}
