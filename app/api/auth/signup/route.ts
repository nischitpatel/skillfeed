import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// temporary in memory user store
const users: any[] = [];

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, email, password } = body;

        if(!name || !email || !password) {
            return NextResponse.json(
                {error: "All fields are required!"},
                {status: 400}
            );
        }

        if(password.length < 6) {
            return NextResponse.json(
                {error: "Password must be greater than 6 characters!"},
                {status: 400}
            );
        }

        const existingUser = users.find(user => user.email === email);
        if(existingUser) {
            return NextResponse.json(
                {error: "User already exist!"},
                {status: 409}
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = {
            id: crypto.randomUUID(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        };

        users.push(user);

        // Create token
        const token = jwt.sign(
            {userId: user.id, email: user.email},
            JWT_SECRET,
            {expiresIn: "7d"}
        );

        // Set cookie
        const response = NextResponse.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
        });

        response.cookies.set("auth_token", token, {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
        })

        return response;

    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong!" },
            { status: 500 }
        );
    }
}