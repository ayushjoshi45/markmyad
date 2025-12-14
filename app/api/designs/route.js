import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Design from "../../../models/Design";

/**
 * 🔐 Helper: get user from JWT
 */
function getUserFromRequest(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  return jwt.verify(token, process.env.JWT_SECRET);
}

/**
 * ✅ SAVE A NEW DESIGN
 * POST /api/designs
 */
export async function POST(req) {
  try {
    await connectDB();

    const user = getUserFromRequest(req);
    const { shoeId, colors, material } = await req.json();

    if (!shoeId || !colors || !material) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const design = await Design.create({
      userId: user.id,
      shoeId,
      colors,
      material,
    });

    return NextResponse.json(
      {
        message: "Design saved successfully",
        design,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

/**
 * 📦 GET ALL DESIGNS FOR LOGGED-IN USER
 * GET /api/designs
 */
export async function GET(req) {
  try {
    await connectDB();

    const user = getUserFromRequest(req);

    const designs = await Design.find({
      userId: user.id,
    }).sort({ createdAt: -1 });

    return NextResponse.json({ designs });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
