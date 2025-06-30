import { NextRequest, NextResponse } from "next/server";

type User = { username: string; password: string };

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const users = JSON.parse(process.env.LOGIN_USERS || "[]");
  const found = (users as User[]).find((u) => u.username === username && u.password === password);
  if (found) {
    // Set a simple cookie for session (not secure, but fine for this use case)
    const res = NextResponse.json({ success: true });
    res.cookies.set("auth", username, { httpOnly: false, path: "/" });
    return res;
  }
  return NextResponse.json({ success: false });
} 