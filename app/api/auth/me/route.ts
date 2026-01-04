import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { users } from "../_store";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function GET(req: Request) {
    try {
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

        // Verify JWT
        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: string,
            email: string
        }

        // Find user
        const user = users.find(u => u.id === decoded.userId);

        if (!user) {
            const res = NextResponse.json(
                { error: "User not found!" },
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

        return NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
        });
    } catch (err) {
        const res = NextResponse.json(
            { error: "Invalid or expired token!" },
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