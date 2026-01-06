import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: {
    id: string;
  };
};

// GET /api/posts/[id]
export async function GET(req: Request, {params}: { params: { id: string } }) {
  try {
    const param = await params;
    console.log(param.id);

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
    const postId = params.id;

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
