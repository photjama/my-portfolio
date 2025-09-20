"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addStudent, type Student } from "@/app/lib/store";
import { v4 as uuidv4 } from "uuid";
import { uploadFiles } from "../actions";

export default function PortfolioForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    school: "",
    gpa: "",
    talent: "",
    reason: "",
    faculty: "",
    university: "",
  });
  const [studentImage, setStudentImage] = useState<File | null>(null);
  const [activitiesFiles, setActivitiesFiles] = useState<File[]>([]);
  const [awardsFiles, setAwardsFiles] = useState<File[]>([]);
  const [worksFiles, setWorksFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (files: File[]) => void
  ) => {
    const files = Array.from(e.target.files || []);
    setter(files);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "กรุณากรอกชื่อ";
    if (!form.lastName.trim()) newErrors.lastName = "กรุณากรอกนามสกุล";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) newErrors.phone = "เบอร์โทรต้องเป็น 10 หลัก";
    const gpaNum = parseFloat(form.gpa);
    if (!form.gpa || isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) newErrors.gpa = "GPA ต้องอยู่ระหว่าง 0-4.0";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const studentData: Student = {
        id: uuidv4(),
        ...form,
        gpa: parseFloat(form.gpa),
        image: undefined,
        activities: [],
        awards: [],
        works: [],
      };

      // Upload student image
      if (studentImage) {
        const formData = new FormData();
        formData.append("files", studentImage);
        const paths = await uploadFiles(formData);
        if (paths.length > 0) studentData.image = paths[0] as string;
      }

      // Upload activities
      if (activitiesFiles.length > 0) {
        const formData = new FormData();
        activitiesFiles.forEach((file) => formData.append("files", file));
        const paths = await uploadFiles(formData);
        studentData.activities = paths as string[];
      }

      // Upload awards
      if (awardsFiles.length > 0) {
        const formData = new FormData();
        awardsFiles.forEach((file) => formData.append("files", file));
        const paths = await uploadFiles(formData);
        studentData.awards = paths as string[];
      }

      // Upload works
      if (worksFiles.length > 0) {
        const formData = new FormData();
        worksFiles.forEach((file) => formData.append("files", file));
        const paths = await uploadFiles(formData);
        studentData.works = paths as string[];
      }

      addStudent(studentData as Student);
      alert("บันทึก Portfolio สำเร็จ!");
      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        school: "",
        gpa: "",
        talent: "",
        reason: "",
        faculty: "",
        university: "",
      });
      setStudentImage(null);
      setActivitiesFiles([]);
      setAwardsFiles([]);
      setWorksFiles([]);
      setErrors({});
      router.push("/students");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      alert("เกิดข้อผิดพลาดในการอัปโหลด: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-8"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Portfolio Form TCAS69
        </h2>
        <p className="text-gray-600">กรอกข้อมูลเพื่อสมัคร TCAS69</p>
      </div>

      {/* Personal Information Section */}
      <div className="border border-gray-200 rounded-xl p-6 bg-blue-50">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          👤 ข้อมูลส่วนตัว
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อ *
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.firstName ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                ⚠️ {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              นามสกุล *
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.lastName ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                ⚠️ {errors.lastName}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ที่อยู่
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              เบอร์โทรศัพท์ *
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.phone ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                ⚠️ {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              โรงเรียน
            </label>
            <input
              type="text"
              name="school"
              value={form.school}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GPA *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              name="gpa"
              value={form.gpa}
              onChange={handleChange}
              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.gpa ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.gpa && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                ⚠️ {errors.gpa}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Education and Interests Section */}
      <div className="border border-gray-200 rounded-xl p-6 bg-indigo-50">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          🎓 การศึกษาและความสนใจ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ความสามารถพิเศษ
            </label>
            <input
              type="text"
              name="talent"
              value={form.talent}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              เหตุผลในการสมัคร
            </label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              สาขาที่เลือก
            </label>
            <input
              type="text"
              name="faculty"
              value={form.faculty}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              มหาวิทยาลัย
            </label>
            <input
              type="text"
              name="university"
              value={form.university}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* File Uploads Section */}
      <div className="border border-gray-200 rounded-xl p-6 bg-green-50">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          📁 อัปโหลดไฟล์
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รูปภาพนักเรียน (เลือก 1 รูป)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setStudentImage(e.target.files ? e.target.files[0] || null : null)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {studentImage && (
              <p className="text-sm text-green-600 mt-1">เลือกไฟล์: {studentImage.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รูปภาพกิจกรรม (เลือกหลายรูป)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, setActivitiesFiles)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {activitiesFiles.length > 0 && (
              <p className="text-sm text-green-600">เลือก {activitiesFiles.length} รูปกิจกรรม</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รูปภาพรางวัล (เลือกหลายรูป)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, setAwardsFiles)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {awardsFiles.length > 0 && (
              <p className="text-sm text-green-600">เลือก {awardsFiles.length} รูปรางวัล</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รูปภาพผลงาน (เลือกหลายรูป)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, setWorksFiles)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {worksFiles.length > 0 && (
              <p className="text-sm text-green-600">เลือก {worksFiles.length} รูปผลงาน</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
      >
        {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
      </button>
    </form>
  );
}
