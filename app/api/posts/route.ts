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
