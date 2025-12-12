import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

  const user = verifyToken(token);
  if (!user) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  return NextResponse.json({ user });
}
