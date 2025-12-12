import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const userExists = await User.findOne({ email });
  if (userExists)
    return NextResponse.json({ error: "Email already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashedPassword });
  const token = createToken(user);

  return NextResponse.json({ msg: "Signup success", token });
}
