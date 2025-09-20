// components/StudentDetail.tsx
"use client";

import { getStudentById } from "@/app/lib/store";
import Image from "next/image";

export default function StudentDetail({ id }: { id: string }) {
  const student = getStudentById(id);
  if (!student) return <p className="text-center py-12 text-gray-500">ไม่พบข้อมูลนักเรียน</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl space-y-8">
      {/* ชื่อและรูปนักเรียน */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex-shrink-0">
          {student.image ? (
            <Image
              src={student.image}
              alt={`${student.firstName} ${student.lastName}`}
              width={240}
              height={240}
              className="w-60 h-60 object-cover rounded-xl shadow-md"
            />
          ) : (
            <div className="w-60 h-60 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {student.firstName} {student.lastName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ข้อมูลพื้นฐาน */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">ข้อมูลพื้นฐาน</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">ที่อยู่:</span> {student.address || "-"}</p>
                <p><span className="font-medium">เบอร์โทร:</span> {student.phone || "-"}</p>
                <p><span className="font-medium">โรงเรียน:</span> {student.school || "-"}</p>
                <p>
                  <span className="font-medium">GPA:</span>{" "}
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {student.gpa}
                  </span>
                </p>
              </div>
            </div>

            {/* การศึกษาและความสนใจ */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">การศึกษาและความสนใจ</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">สาขา:</span> {student.faculty || "-"}</p>
                <p><span className="font-medium">มหาวิทยาลัย:</span> {student.university || "-"}</p>
                <p><span className="font-medium">ความสามารถพิเศษ:</span> {student.talent || "-"}</p>
                <p className="whitespace-pre-wrap"><span className="font-medium">เหตุผล:</span> {student.reason || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* กิจกรรม */}
      {student.activities && student.activities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">กิจกรรม</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {student.activities.map((act, i) => (
              <Image
                key={i}
                src={act}
                alt={`Activity ${i + 1}`}
                width={150}
                height={150}
                className="w-full h-32 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
              />
            ))}
          </div>
        </div>
      )}

      {/* รางวัล */}
      {student.awards && student.awards.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">รางวัล</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {student.awards.map((award, i) => (
              <Image
                key={i}
                src={award}
                alt={`Award ${i + 1}`}
                width={150}
                height={150}
                className="w-full h-32 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
              />
            ))}
          </div>
        </div>
      )}

      {/* ผลงาน */}
      {student.works && student.works.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">ผลงาน</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {student.works.map((work, i) => (
              <Image
                key={i}
                src={work}
                alt={`Work ${i + 1}`}
                width={150}
                height={150}
                className="w-full h-32 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
