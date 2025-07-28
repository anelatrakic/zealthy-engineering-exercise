import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            // If the user already exists, verify password
            if (existingUser.password === password) {
                return NextResponse.json({
                    success: true,
                    user: existingUser,
                    isExisting: true,
                });
            } else {
                return NextResponse.json(
                    { error: "Invalid credentials" },
                    { status: 401 }
                );
            }
        } else {
            // Otherwise, persist to database
            const user = await prisma.user.create({
                data: {
                    email,
                    password,
                    onboardingStep: 1,
                },
            });
            return NextResponse.json({
                success: true,
                user,
                isExisting: false,
            });
        }
    } catch (error) {
        return NextResponse.json(
            { error: "Error processing authentication" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const user = await prisma.user.update({
            where: { email: body.email },
            data: {
                aboutMe: body.aboutMe,
                street: body.street,
                city: body.city,
                state: body.state,
                zip: body.zip,
                dateOfBirth: body.dateOfBirth,
                onboardingStep: body.onboardingStep,
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: "Error updating user" },
            { status: 500 }
        );
    }
}
