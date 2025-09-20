"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function uploadFiles(formData: FormData) {
  const uploadsDir = join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const files = formData.getAll("files") as File[];
  const paths: string[] = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = file.name.split(".").pop();
    const filename = `${uuidv4()}.${extension}`;
    const filepath = join(uploadsDir, filename);
    await writeFile(filepath, buffer);
    paths.push(`/uploads/${filename}`);
  }

  return paths;
}