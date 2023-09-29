import { NextResponse } from "next/server";
import { Prisma } from "@/Db/prismaFile";

export async function GET() {
    const categories = await Prisma.category.findMany();
    return NextResponse.json(categories)
}