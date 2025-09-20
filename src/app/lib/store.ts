// lib/store.ts
export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  talent: string;
  reason: string;
  faculty: string;
  university: string;
  image?: string;
  activities?: string[];
  awards?: string[];
  works?: string[];
};

// ใช้ตัวแปรใน memory เท่านั้น
let students: Student[] = [];

export function getStudents(): Student[] {
  return students;
}

export function addStudent(student: Student) {
  students.push(student);
}

export function getStudentById(id: string) {
  return students.find((s) => s.id === id);
}

export function clearStudents() {
  students = [];
}
