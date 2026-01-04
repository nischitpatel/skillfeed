// import { NextResponse } from "next/server";

// const posts: any[] = [
//   { "id": "1", "username": "AliceDev", "skill": "JavaScript", "content": "Mastering `Array.reduce()` is the key to cleaner data transformations.", "createdAt": "2025-12-27T17:17:33.926Z" },
//   { "id": "2", "username": "BobPython", "skill": "Python", "content": "Use `pathlib` instead of `os.path` for more readable file system operations.", "createdAt": "2025-12-26T17:17:33.926Z" },
//   { "id": "3", "username": "NextGenCoder", "skill": "Next.js", "content": "Next.js 15 Server Actions make handling form state incredibly seamless.", "createdAt": "2025-12-25T17:17:33.926Z" },
//   { "id": "4", "username": "DesignQueen", "skill": "UI/UX", "content": "Consistency is key. Always define a 4pt or 8pt grid system for spacing.", "createdAt": "2025-12-24T17:17:33.926Z" },
//   { "id": "5", "username": "NeuralNet", "skill": "AI Basics", "content": "LLMs aren't databases; they are reasoning engines. Think 'RAG' for data retrieval.", "createdAt": "2025-12-23T17:17:33.926Z" },
//   { "id": "6", "username": "CharlieJS", "skill": "JavaScript", "content": "Optional chaining `?.` prevents so many 'undefined' crashes. Use it!", "createdAt": "2025-12-22T17:17:33.926Z" },
//   { "id": "7", "username": "DataWhiz", "skill": "Python", "content": "Enumerate is better than range(len(x)). \n\n```python\nfor i, val in enumerate(list):\n```", "createdAt": "2025-12-21T17:17:33.926Z" },
//   { "id": "8", "username": "VercelPro", "skill": "Next.js", "content": "Optimize your LCP by using the Next/Image component with the 'priority' prop.", "createdAt": "2025-12-20T17:17:33.926Z" },
//   { "id": "9", "username": "PixelPerfect", "skill": "UI/UX", "content": "Dark mode shouldn't just be pure black. Use deep grays for better depth.", "createdAt": "2025-12-19T17:17:33.926Z" },
//   { "id": "10", "username": "PromptMaster", "skill": "AI Basics", "content": "Zero-shot prompting vs Few-shot: Providing examples significantly boosts accuracy.", "createdAt": "2025-12-18T17:17:33.926Z" },
// ]; // TEMP (replace with DB)

// export async function POST(req: Request) {
//   const body = await req.json();

//   const post = {
//     id: crypto.randomUUID(),
//     username: "user_1",
//     skill: body.selectedSkill,
//     type: body.postType,
//     content: body.content,
//     createdAt: new Date(),
//   };

//   console.log(post);

//   posts.unshift(post);

//   return NextResponse.json(post);
// }

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);

//   const skill = searchParams.get("skill");
//   const cursor = searchParams.get("cursor"); // ISO string
//   const limit = Number(searchParams.get("limit") ?? 5);

//   let data = posts;

//   // Filter by skill
//   if (skill) {
//     data = data.filter(p => p.skill === skill);
//   }

//   // Sort newest → oldest
//   data = data.sort(
//     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//   );

//   // Cursor filtering
//   if (cursor) {
//     data = data.filter(
//       p => new Date(p.createdAt).getTime() < new Date(cursor).getTime()
//     );
//   }

//   const page = data.slice(0, limit);

//   const nextCursor =
//     page.length > 0 ? page[page.length - 1].createdAt : null;

//   return NextResponse.json({
//     posts: page,
//     nextCursor,
//   });
// }


import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

/* ===========================
   CREATE POST (AUTH REQUIRED)
   =========================== */
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
    };

    const body = await req.json();
    const { selectedSkill, postType, content } = body;

    if (!selectedSkill || !postType || !content) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        skill: selectedSkill,
        type: postType,
        content,
        authorId: decoded.userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });

  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

/* ===========================
        GET POSTS (FEED)
   =========================== */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const skill = searchParams.get("skill");
    const cursor = searchParams.get("cursor"); // ISO string
    const limit = Number(searchParams.get("limit") ?? 5);

    const posts = await prisma.post.findMany({
      where: {
        ...(skill ? { skill } : {}),
        ...(cursor
          ? {
            createdAt: {
              lt: new Date(cursor),
            },
          }
          : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const nextCursor =
      posts.length > 0
        ? posts[posts.length - 1].createdAt.toISOString()
        : null;

    return NextResponse.json({
      posts,
      nextCursor,
    });

  } catch (error) {
    console.error("Fetch posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
