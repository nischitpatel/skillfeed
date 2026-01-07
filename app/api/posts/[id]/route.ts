import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

type Params = {
  params: {
    id: string;
  };
};

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// GET /api/posts/[id]
export async function GET(req: Request, {params}: { params: { id: string } }) {
  try {
    const param = await params;
    // console.log(param.id);

    // Fetch post from database
    const post = await prisma.post.findUnique({
      where: { id: param.id },
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

    // console.log(post);

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Optional: DELETE /api/posts/[id] (if you want delete functionality)
export async function DELETE(req: Request, { params }: Params) {
  try {
    const param = await params;
    const cookie = req.headers
      .get("cookie")
      ?.split("; ")
      .find(c => c.startsWith("auth_token="));

    if (!cookie) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const token = cookie.split("=")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };

    const post = await prisma.post.findUnique({
      where: { id: params.id },
      select: { authorId: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // AUTHORIZATION CHECK
    if (post.authorId !== decoded.userId) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    await prisma.post.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete post error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
