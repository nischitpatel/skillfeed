import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function GET() {
    try {
        // Read cookie safely
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Verify JWT
        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: string;
            email: string;
        };

        // Fetch user from DB
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
                createdAt: true,
            },
        });

        if (!user) {
            const res = NextResponse.json(
                { error: "User not found" },
                { status: 401 }
            );
            res.cookies.set("auth_token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 0, // Delete cookie
            });
            return res;
        }

        return NextResponse.json({ user });

    } catch (err) {
        const res = NextResponse.json(
            { error: "Invalid or expired token" },
            { status: 401 }
        );
        res.cookies.set("auth_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0, // Delete cookie
        });
        return res;
    }
}
