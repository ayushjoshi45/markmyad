import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
// import Design from "../../../models/Design";
import Design from "../../../models/Design"

export async function POST(req) {
  try {
    await connectDB();

    // 🔐 Read token
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 📦 Read body
    const { shoeId, colors, material } = await req.json();

    if (!shoeId || !colors || !material) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 💾 Save design
    const design = await Design.create({
      userId: decoded.id,
      shoeId,
      colors,
      material,
    });

    return NextResponse.json({
      message: "Design saved successfully",
      design,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
