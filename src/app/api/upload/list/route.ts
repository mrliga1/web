import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const getAuthToken = (request: Request) => {
  const authHeader = request.headers.get("authorization") || "";
  return authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
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

  const valid = await verifyFirebaseToken(idToken);
  if (!valid) {
    return NextResponse.json({ error: "Invalid or expired authentication token" }, { status: 401 });
  }

  return null;
};

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    return NextResponse.json([]);
  }

  const files = await fs.promises.readdir(uploadDir);
  const list = files
    .filter((file) => !file.startsWith("."))
    .map((file) => ({
      name: file,
      path: `/uploads/${file}`,
      url: `/uploads/${file}`,
    }));

  return NextResponse.json(list);
}
