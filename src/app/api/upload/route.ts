import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const uploadDir = path.join(process.cwd(), "public", "uploads");
const allowedExtensions = [".jpg", ".png", ".webp"];

const safeUploadPath = (relativePath: string) => {
  const normalized = path.normalize(relativePath).replace(/^\//, "");
  return path.join(uploadDir, normalized);
};

const getAuthToken = (request: Request) => {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  return token;
};

const verifyFirebaseToken = async (idToken: string) => {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error("Firebase API key is not configured");
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    }
  );

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return Array.isArray(data.users) && data.users.length > 0;
};

const requireAuth = async (request: Request) => {
  const idToken = getAuthToken(request);
  if (!idToken) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  let valid = false;
  try {
    valid = await verifyFirebaseToken(idToken);
  } catch {
    return NextResponse.json({ error: "Unable to verify authentication" }, { status: 500 });
  }

  if (!valid) {
    return NextResponse.json({ error: "Invalid or expired authentication token" }, { status: 401 });
  }

  return null;
};

const isValidImageFile = (filename: string) => {
  const ext = path.extname(filename).toLowerCase();
  return allowedExtensions.includes(ext);
};

export async function POST(request: Request) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (!isValidImageFile(file.name)) {
    return NextResponse.json(
      { error: "Invalid file type. Only .jpg, .png, .webp are allowed." },
      { status: 400 }
    );
  }

  const safeFilename = `${Date.now()}_${path.basename(file.name).replace(/\s+/g, "_")}`;
  await fs.promises.mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = safeUploadPath(safeFilename);

  if (!filePath.startsWith(uploadDir)) {
    return NextResponse.json({ error: "Invalid upload path" }, { status: 400 });
  }

  await fs.promises.writeFile(filePath, buffer);
  return NextResponse.json({ path: `/uploads/${safeFilename}` });
}

export async function DELETE(request: Request) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  const { path: filePath } = await request.json();
  if (!filePath || typeof filePath !== "string") {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

  const targetPath = safeUploadPath(filePath.replace(/^\/uploads\//, ""));
  if (!targetPath.startsWith(uploadDir)) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

  try {
    await fs.promises.unlink(targetPath);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete file" }, { status: 500 });
  }
}
