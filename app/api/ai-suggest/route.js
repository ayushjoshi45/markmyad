import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt, shoeName } = await req.json();

    if (!prompt || !shoeName) {
      return NextResponse.json(
        { error: "prompt and shoeName are required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a sneaker fashion expert.

Sneaker model: ${shoeName}

User request:
${prompt}

Give a short, friendly suggestion in plain text.
Do NOT use JSON.
Do NOT write code.
Explain color and material ideas.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return NextResponse.json(
        { error: "Gemini API error", details: data },
        { status: 500 }
      );
    }

    const suggestion =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No suggestion generated.";

    return NextResponse.json({ suggestion });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
