import { NextResponse } from "next/server";
import { ratelimit } from "@/lib/rate-limit";

type RequestBody = {
  question: string;
  postContent: string;
};

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";

    const {success} = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }

    const body: RequestBody = await req.json();
    const { question, postContent } = body;

    if (!question || !postContent) {
      return NextResponse.json(
        { error: "Question and post content are required." },
        { status: 400 }
      );
    }

    // -----------------------
    // TEMP: Mock response
    // -----------------------
    const mockAnswer = `Based on the post content: "${postContent.slice(
      0,
      50
    )}...", the answer to your question "${question}" is: Lorem ipsum explanation.`;

    return NextResponse.json({ answer: mockAnswer });
  } catch (err) {
    console.error("QA API error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
