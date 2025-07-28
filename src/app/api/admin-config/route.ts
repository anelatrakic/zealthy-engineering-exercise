import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const all = await prisma.adminConfig.findMany();
        return NextResponse.json(all);
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json(
            { error: "Failed to fetch config" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const updates: Array<{
            id: string;
            component: string;
            stepNumber: number;
        }> = await request.json();

        // Process each entry
        await Promise.all(
            updates.map(async (u) => {
                if (u.id) {
                    return prisma.adminConfig.update({
                        where: { id: u.id },
                        data: { stepNumber: u.stepNumber },
                    });
                } else {
                    const existing = await prisma.adminConfig.findFirst({
                        where: { component: u.component },
                    });
                    // Update if exists, otherwise create new
                    if (existing) {
                        return prisma.adminConfig.update({
                            where: { id: existing.id },
                            data: { stepNumber: u.stepNumber },
                        });
                    } else {
                        return prisma.adminConfig.create({
                            data: {
                                component: u.component,
                                stepNumber: u.stepNumber,
                            },
                        });
                    }
                }
            })
        );
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update config" },
            { status: 500 }
        );
    }
}
